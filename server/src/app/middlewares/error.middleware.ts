import { Request, Response, NextFunction } from "express"
import { isDev } from '../../env/env.server'
import type { ICustomError } from '../../types/error.type'


export const notFound = ( req: Request, res: Response, next: NextFunction ) => {
    const err = new Error( `Not found - ${ req.originalUrl }` )
    res.status( 404 )
    next( err )
}

export const errorHandler = ( err: ICustomError, _req: Request, res: Response, _next: NextFunction ) => {
    let statusCode
    let resJson

    if( isDev ) {
        statusCode = err.statusCode
        resJson = {
            message: err.message,
            stack: err.stack
        }
    } else {
        statusCode = res.statusCode === 200 ? 500: res.statusCode
        resJson = {
            message: err.message,
        }
    }

    res
        .status( statusCode )
        .json( resJson )
}