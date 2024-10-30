import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'

import { prisma } from '../prisma'
import { UserFields, InfoFields } from '../utils/user.utils'
import { sendVerifyToEmail } from '../services/auth.mailer'
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
            throw Error('The email or password is incorrect!')
        }

        const info = await prisma.info.findUnique({
            where: { 
                id: user.id
            },
            select: InfoFields
        })

        if( !info ) {
            res.status( 504 )
            throw Error( 'Db crashed!' )
        }

        const token = tokenGenerator.generateToken( user.id )

        res.status( 201 ).json( { 
            data: {
                id: user.id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                email: user.email,
                role: user.role,
                ...info
            }, 
            token, 
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
            throw Error( 'Пользователь с такой почтой уже существует!' )
        }

        const user = await prisma.user.create({
            data: {
                email,
                password: await hash( password )
            },
            select: UserFields
        })

        const info = await prisma.info.create({
            data: {
                userId: user.id,
                name: faker.person.fullName()
            },
            select: InfoFields
        })

        if( !user || !info ) {
            res.status( 504 )
            throw Error( 'Db crashed!' )
        }

        const token = tokenGenerator.generateToken( user.id )
        const emailRespose = await sendVerifyToEmail( email, token )

        if( !emailRespose ) {
            res.status( 504 )
            throw new Error('The email has not been sent!')
        }

        res.status( 200 ).json( { message: "success" } )
    } ),

    verifyEmail: asyncHandler( async (req: Request, res: Response) => {
        const token = String( req.query.token )
        
        const userFound = await verifyToken( token )

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

        const user = await prisma.user.findUnique({
            where: { 
                id: userFound.id
            },
            select: UserFields
        })

        const info = await prisma.info.findUnique({
            where: { 
                id: userFound.id
            },
            select: InfoFields
        })

        if( !user || !info ) {
            res.status( 504 )
            throw Error( 'Db crashed!' )
        }

        res.status( 201 ).json( { 
            data: { ...user, ...info }, 
            token,
            message: "success" 
        } )

    } )
}
