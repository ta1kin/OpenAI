import jwt from  'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config({ path: 'src/.env' })
const JWT_SECRET = process.env.JWT_SECRET

export default {
    generateToken: ( userId: number ) => {

        if( !JWT_SECRET ) {
            throw Error( 'Не определён jsonwebtoken' )
        }

        let token = jwt.sign(
            {
                userId: userId
            },
            JWT_SECRET,
            {
                expiresIn: '10d'
            }
        )

        return token
    }
}
