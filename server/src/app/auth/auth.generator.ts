import jwt from  'jsonwebtoken'
import { tokenVariant } from '../../config/config.auth'


export default {

    generateToken: ( userId: number, type: string ) => {

        let token = jwt.sign(
            {
                userId: userId
            },
            tokenVariant[ type ].secret,
            {
                expiresIn: tokenVariant[ type ].time
            }
        )

        return token
    },

    generateSecretCode: () => {
        return Math.floor(100000 + Math.random() * 900000).toString()
    }
}
