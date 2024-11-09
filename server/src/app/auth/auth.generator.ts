import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })

const JWT_SECRET = process.env.JWT_SECRET
const RESET_SECRET = process.env.RESET_SECRET


export default {
    generateToken: ( userId: number ) => {

        if( !JWT_SECRET ) {
            throw Error( 'Don`t have a jwt secret key!' )
        }

        let token = jwt.sign(
            {
                userId: userId
            },
            JWT_SECRET,
            {
                expiresIn: '7d'
            }
        )

        return token
    },

    _generateToken: ( userId: number, secret: string, time: string ) => {

        if( !secret ) {
            throw Error( 'Don`t have a secret key!' )
        }

        let token = jwt.sign(
            {
                userId: userId
            },
            secret,
            {
                expiresIn: time
            }
        )

        return token
    },

    generateSecretCode: () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}
