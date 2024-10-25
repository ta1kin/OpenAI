import { Request, Response } from "express"


export default {
    singIn: ( _req: Request, res: Response ) => {
        res.status( 200 ).json( 'User sing in system!' )
    },
    singUp: ( _req: Request, res: Response ) => {
        res.status( 201 ).json( 'User sing up system!' )
    }
}