import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import homeRouter from './app/home/home.router'
import authRouter from './app/auth/auth.router'
import settingsRouter from './app/settings/settings.router'
import dataRouter from './app/data/data.router'
import infoRouter from './app/info/info.router'

import { prisma } from './app/prisma'
import { redis } from './app/redis'
import { notFound, errorHandler } from './app/middlewares/error.middleware'


dotenv.config({ path: 'src/.env' })
const PORT: number     = Number( process.env.PORT )     || 3000
const HOST: string     = String( process.env.HOST )     || '127.0.0.1'
const NODE_ENV: string = String( process.env.NODE_ENV ) || 'development'
const isDev = NODE_ENV === 'development'


const start = async () => {
  const app = express()

  app.use( express.json() )
  app.use( cookieParser() )

  if( isDev ) app.use( morgan( 'dev' ) )
  if( isDev ) app.use( cors() )

  app.use( '/api', homeRouter )
  app.use( '/api/auth', authRouter )
  app.use( '/api', settingsRouter )
  app.use( '/api', dataRouter )
  app.use( '/api', infoRouter )

  app.use( notFound )
  app.use( errorHandler )


  app.listen( PORT, HOST, () => {
    console.log( `\n🚀 Сервер запущен по адресу: http://${ HOST }:${ PORT }/api\n` )
  } )
}

start()
  .then( async () => {
    await prisma.$disconnect()
  })
  .catch( async err => {
    console.debug( err )
    await prisma.$disconnect
    await redis.quit
    process.exit( 1 )
  })