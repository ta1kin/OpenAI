import { Request, Response } from 'express'

import ayncHandler from 'express-async-handler'


export default {
    hello: ayncHandler( 
        async ( _req: Request, res: Response ) => 
        {
            res.status( 200 ).send('Hello! It`s the server!')
        }
    ),

    home: ayncHandler( 
        async ( _req: Request, res: Response ) => 
        {
            res.status( 200 ).json({ message: 'success' })
        }
    )
}