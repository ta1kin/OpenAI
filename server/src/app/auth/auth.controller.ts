import { Request, Response } from 'express'
import { faker, ne } from '@faker-js/faker'
import { hash, verify } from 'argon2'

import asyncHandler from 'express-async-handler'
import dotenv from 'dotenv'

import { prisma } from '../prisma'
import { redis } from '../redis'
import { InfoFields, ConfigFields, DataFields } from '../utils/user.utils'
import { sendVerifyToEmail, sendRecoveryToEmail } from '../services/service.mailer'
import { verifyToken } from '../middlewares/auth.middleware'

import Generator from './auth.generator'

dotenv.config({ path: 'src/.env' })

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const RESET_SECRET = process.env.ACCESS_SECRET


export default {
    singIn: asyncHandler( async ( req: Request, res: Response ) => {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const isValidUserPassword = await verify( user?.password ? user.password : '', password )

        if( !user || !isValidUserPassword ) {
            res.status( 401 )
            throw new Error('The email or password is incorrect!')
        }

        const info = await prisma.info.findUnique({
            where: { 
                id: user.id
            },
            select: InfoFields
        })

        const config = await prisma.config.findUnique({
            where: {
                id: user.id
            },
            select: ConfigFields
        })

        if( !info || !config ) {
            res.status( 504 )
            throw new Error( 'Db crashed!' )
        }

        let data
        data = await prisma.data.findUnique({
            where: {
                id: user.id
            },
            select: DataFields
        })

        if ( !data ) {
            data = Object.fromEntries(
                Object.entries( DataFields ).map( ( [key, _value] ) => [key, 'Не задано'] )
            )
        }

        const access_token = Generator.generateToken( user.id )
        const refresh_token = Generator.generateToken( user.id )

        res.cookie('refresh', refresh_token, {
            maxAge: 30 * 24 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        res.setHeader('Authorization', `Bearer ${access_token}`)

        res.status( 201 ).json( { 
            data: {
                id: user.id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                email: user.email,
                role: user.role,
                ...info,
                ...config,
                ...data
            },
            message: "success" } )
    } ),

    singUp: asyncHandler( async ( req: Request, res: Response ) => {
        const { email, password } = req.body

        const isHaveUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if( isHaveUser ) {
            res.status( 409 )
            throw new Error( 'Пользователь с такой почтой уже существует!' )
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: await hash( password )
            }
        })

        const info = await prisma.info.create({
            data: {
                userId: user.id,
                name: faker.person.fullName()
            }
        })

        const config = await prisma.config.create({
            data: {
                userId: user.id
            }
        })

        if( !user || !info || !config ) {
            res.status( 504 )
            throw new Error( 'Db crashed!' )
        }

        const access_token = Generator.generateToken( user.id )
        const refresh_token = Generator.generateToken( user.id )
        const emailRespose = await sendVerifyToEmail( email, access_token )

        if( !emailRespose ) {
            const delUser = prisma.user.delete({
                where: {
                    id: user.id
                }
            })

            if( !delUser ) {
                throw new Error( 'Db crashed!' )
            }

            res.status( 504 )
            throw new Error('The email has not been sent!')
        }

        const redisResponse = await redis.set(
            `refresh_tokens:${ user.id }`,
            `${refresh_token}`,
            'EX',
            30 * 24 * 60 * 1000
        )

        if( !redisResponse ) {
            res.status( 504 )
            throw new Error( 'Redis crashed!' )
        }

        res.cookie('refresh', refresh_token, {
            maxAge: 30 * 24 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        res.setHeader('Authorization', `Bearer ${access_token}`)

        res.status( 200 ).json( { message: "success" } )
    } ),

    verifyEmail: asyncHandler( async (req: Request, res: Response) => {
        const access_token = String( req.query.access_token )
        
        const userFound = await verifyToken( access_token )

        if ( !userFound ) {
            res.status( 401 )
            throw new Error('Not authorized, token failed!')
        }

        await prisma.user.update({
            data: {
                isVerify: true
            },
            where: { 
                id: userFound.id
            }
        })

        res.status( 201 ).json( {
            message: "success" 
        } )
    } ),

    updateTokens: asyncHandler( async ( req: Request, res: Response ) => {
        let access_token
        let refresh_token = req.cookies.refresh

        const userFound = await verifyToken( refresh_token )

        if ( !userFound ) {
            res.status( 401 )
            throw new Error('Not authorized, token failed')
        }        

        let redisRefresh = await redis.get( `refresh_tokens:${ userFound.id }` )

        if( redisRefresh !== refresh_token ) {
            throw new Error( 'Incorrect refresh token!' )
        }

        access_token = Generator.generateToken( userFound.id )
        refresh_token = Generator.generateToken( userFound.id )

        const redisResponse = await redis.set(
            `refresh_tokens:${ userFound.id }`,
            `${refresh_token}`,
            'EX',
            30 * 24 * 60 * 1000
        )

        if( !redisResponse ) {
            res.status( 504 )
            throw new Error( 'Redis crashed!' )
        }

        res.cookie('refresh', refresh_token, {
            maxAge: 30 * 24 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        res.setHeader('Authorization', `Bearer ${access_token}`)

        res.status( 200 ).json( { message: 'success' } )
    } ),

    sendSecretCodeToEmail: asyncHandler( async ( req: Request, res: Response ) => {

        const { email } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if( !user ) {
            res.status( 400 )
            throw new Error( 'Don`t have a this email!' )
        }

        const secret_code = Generator.generateSecretCode()

        const emailRespose = await sendRecoveryToEmail( email, secret_code )

        if( !emailRespose ) {
            res.status( 504 )
            throw new Error('The email has not been sent!')
        }

        const redisResponse = await redis.set(
            `secret_code:${ user.id }`,
            `${secret_code}`,
            'EX',
            60*8
        )

        if( !redisResponse ) {
            res.status( 402 )
            throw new Error( 'Redis crashed!' )
        }

        res.status( 202 ).json( { message: 'success' } )
    } ),

    verifyCode: asyncHandler( async ( req: Request, res: Response ) => {
        const { email , secret_code } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if( !user ) {
            res.status( 402 )
            throw new Error( 'Incorrect Email!' )
        }

        const redisSecret = await redis.get( `secret_code:${ user.id }` )

        if( secret_code !== redisSecret ) {
            res.status( 404 )
            throw new Error( 'Incorrect code!' )
        }

        res.status( 201 ).json( { message: 'success' } )
    } ),

    rewritePass: asyncHandler( async ( req: Request, res: Response ) => {
        const { email, password } = req.body

        const user = await prisma.user.update({
            where: {
                email
            },
            data: {
                password
            }
        })

        if( !user ) {
            res.status( 404 )
            throw new Error( 'Db crashed!' )
        }

        res.status( 200 ).json( { message: 'success' } )
    } ),

    deleteUser: asyncHandler( async ( req: Request, res: Response ) => {
        const { email } = req.body

        const user = await prisma.user.delete({
            where: {
                email
            }
        })

        if( !user ) {
            res.status( 404 )
            throw new Error( 'Db crashed!' )
        }

        res.status( 200 ).json( { message: 'success' } )
    } )
}
