import { Request, Response } from "express"


export default {
    hello: ( _req: Request, res: Response ) => {
        res.status( 200 ).send( 'Hello Magic Net - backend!' )
    },
    testJson: ( _req: Request, res: Response ) => {
        res.status( 200 ).json( {
            id: 0,
            name: 'JSON',
            text: 'Проверка работы парсера!',
            items: [
                'png',
                'jpg',
                'jpeg',
                'ico',
                'gif'
            ]
        } )
    }
}