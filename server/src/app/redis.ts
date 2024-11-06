import Redis from 'ioredis'
import dotenv from 'dotenv'

dotenv.config({ path: 'src/.env' })
const REDIS_PORT = Number( process.env.REDIS_PORT ) || 6379
const REDIS_HOST = process.env.REDIS_HOST || 'localhost'

export const redis = new Redis({
    port: REDIS_PORT,
    host: REDIS_HOST,
})