import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'

import { prisma } from '../prisma'
import { UserFields, InfoFields } from '../utils/user.utils'
import { transporter, mailOptions } from './auth.mailer'
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

        if( user && isValidUserPassword ) {
            const data = {
                id: user.id,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                email: user.email,
                role: user.role
            }

            const token = tokenGenerator.generateToken( user.id )

            res.status( 200 ).json( { data, token } )
        } else {
            res.status( 401 )
            throw Error('Почта или пароль неверны!')
        }

        res.status( 200 ).json( 'User sing in system!' )
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

        const token = tokenGenerator.generateToken( user.id )
        const data = { ...user, ...info }

        console.log( transporter )

        const mailOpt = mailOptions( "tarasckinilya@yandex.ru", email, token )

        await transporter.sendMail( mailOpt )

        res.status( 201 ).json( { data, token } )
    } ),

    verifyEmail: asyncHandler( async (req: Request, res: Response) => {
        const token = req.query
        res.status( 200 ).json({ msg: "Почта подтверждена!" })
    } )
}
