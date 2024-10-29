import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { prisma } from '../prisma'
import { UserFields } from "../utils/user.utils.js";

dotenv.config({ path: 'src/.env' })
const JWT_SECRET = process.env.JWT_SECRET


export const protect = asyncHandler( async (req, res, next) => {

    if( !JWT_SECRET ) {
        throw Error( 'Don`t have jsonwebtoken!' )
    }

    let token

    if( req.headers.authorization?.startsWith('Bearer') ) {
        token = req.headers.authorization.split( ' ' )[1]
    }

    if( !token ) {
        res.status( 401 )
        throw new Error('Not authorized, I don`t have a token!')
    }

    const decoded = jwt.verify( token, JWT_SECRET ) as { userId: string }

    const userFound = await prisma.user.findUnique({
        where: {
            id: Number( decoded.userId ) 
        },
        select: UserFields
    })

    if ( userFound ) {
        (req as any).user = userFound;
        next()
    } else {
        res.status( 401 )
        throw new Error('Not authorized, token failed')
    }
} )