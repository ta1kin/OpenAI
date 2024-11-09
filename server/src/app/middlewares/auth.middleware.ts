import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'

import { prisma } from '../prisma'
import { UserFields } from '../utils/user.utils'


dotenv.config({ path: 'src/.env' })
const JWT_SECRET = process.env.JWT_SECRET

export const verifyToken = async ( token: string ) => {

    if( !JWT_SECRET ) {
        throw new Error( 'Don`t have jsonwebtoken!' )
    }

    const decoded = jwt.verify( token, JWT_SECRET ) as { userId: string }

    if( !decoded ) {
        throw new Error( 'Server Error!' )
    }

    const userFound = await prisma.user.findUnique({
        where: {
            id: Number( decoded.userId ) 
        },
        select: UserFields
    })

    return userFound
}

export const _verifyToken = async ( token: string, secret: string ) => {

    if( !secret ) {
        throw new Error( 'Don`t have jsonwebtoken!' )
    }

    const decoded = jwt.verify( token, secret ) as { userId: string }

    if( !decoded ) {
        throw new Error( 'Server Error!' )
    }

    const userFound = await prisma.user.findUnique({
        where: {
            id: Number( decoded.userId ) 
        },
        select: UserFields
    })

    return userFound
}

export const protect = asyncHandler( async (req: Request, res:Response, next: NextFunction) => {

    let token

    if( req.headers.authorization?.startsWith('Bearer') ) {
        token = req.headers.authorization.split( ' ' )[1]
    }

    if( !token ) {
        res.status( 401 )
        throw new Error('Not authorized, I don`t have a token!')
    }

    const userFound = await verifyToken( token )

    if ( userFound ) {
        (req as any).user = userFound;
        next()
    } else {
        res.status( 401 )
        throw new Error('Not authorized, token failed')
    }
} )