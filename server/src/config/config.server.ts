import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })


export const PORT: number     = Number( process.env.PORT )     || 3000
export const HOST: string     = String( process.env.HOST )     || '127.0.0.1'
export const NODE_ENV: string = String( process.env.NODE_ENV ) || 'development'
export const isDev = NODE_ENV === 'development'