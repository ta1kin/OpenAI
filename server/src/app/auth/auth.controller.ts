import { Request, Response } from 'express'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'

import asyncHandler from 'express-async-handler'

import { prisma } from '../prisma'
import { redis } from '../redis'
import { InfoFields, ConfigFields, DataFields } from '../utils/user.utils'
import { sendVerifyToEmail } from '../services/service.mailer'
import { verifyToken } from '../middlewares/auth.middleware'

import tokenGenerator from './token-generator'


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
                Object.entries( DataFields ).map( ( [key, value] ) => [key, 'Не задано'] )
            )
        }

        const access_token = tokenGenerator.generateToken( user.id )
        const refresh_token = tokenGenerator.generateToken( user.id )

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

        const access_token = tokenGenerator.generateToken( user.id )
        const emailRespose = await sendVerifyToEmail( email, access_token )

        if( !emailRespose ) {
            res.status( 504 )
            throw new Error('The email has not been sent!')
        }

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

        const refresh_token = tokenGenerator.generateToken( userFound.id )

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

        access_token = tokenGenerator.generateToken( userFound.id )
        refresh_token = tokenGenerator.generateToken( userFound.id )

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

    rewritePass: asyncHandler( async ( req: Request, res: Response ) => {

        const { email } = req.body

        res.status( 202 ).json( { message: 'success' } )
    } )
}
