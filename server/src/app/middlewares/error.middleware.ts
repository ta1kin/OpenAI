import { Request, Response, NextFunction } from "express"
import { isDev } from '../../env/env.server'
import type { ICustomError } from '../../types/error.type'


export const notFound = ( req: Request, res: Response, next: NextFunction ) => {
    const err = new Error( `Not found - ${ req.originalUrl }` )
    res.status( 404 )
    next( err )
}

export const errorHandler = (err: ICustomError, _req: Request, res: Response, _next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    if (isDev && err.statusCode) {
        statusCode = err.statusCode;
    }

    const resJson = {
        message: err.message || "Internal Server Error",
        ...(isDev && { stack: err.stack }),
    };

    res.status(statusCode).json(resJson);
};
