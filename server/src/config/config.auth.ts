import dotenv from 'dotenv'

import type { TokenVariant } from '../types/type.auth'

dotenv.config({ path: 'src/.env' })

const ACCESS_SECRET = process.env.ACCESS_SECRET
const REFRESH_SECRET = process.env.REFRESH_SECRET
const RESET_SECRET = process.env.ACCESS_SECRET

if ( !ACCESS_SECRET || !REFRESH_SECRET || !RESET_SECRET ) {
    throw new Error( 'Don`t have a secret!' )
}

export const ACCESS = 'access'
export const REFRESH = 'refresh'
export const RESET = 'reset'

export const tokenVariant: TokenVariant = {
    access: {
        secret: ACCESS_SECRET,
        time: '7d'
    },
    refresh: {
        secret: REFRESH_SECRET,
        time: '21d'
    },
    reset: {
        secret: RESET_SECRET,
        time: '10m'
    }
}