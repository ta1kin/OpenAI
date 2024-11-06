import asyncHandler from "express-async-handler"
import { Request, Response } from "express"


export default {
    getData: asyncHandler( async ( req: Request, res: Response ) => {
        res.status( 200 ).json( { message: 'data' } )
    } )
}