import asyncHandler from "express-async-handler"
import { Request, Response } from "express"


export default {
    getSettings: asyncHandler( async ( req: Request, res: Response ) => {
        res.status( 201 ).json( { message: 'settings' } )
    } ),
    updateSettings: asyncHandler( async ( req: Request, res: Response ) => {
        res.status( 200 ).json( { message: 'updated settings' } )
    } )
}