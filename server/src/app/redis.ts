import { Redis } from 'ioredis'
import { REDIS_HOST, REDIS_PORT } from '../env/env.server'

export const redis = new Redis({
	port: REDIS_PORT,
	host: REDIS_HOST,
})
