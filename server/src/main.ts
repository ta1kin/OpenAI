import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'
import morgan from 'morgan'

import authRouter from './app/auth/auth.router'
import chanelRouter from './app/model/model.router'

import { HOST, PORT, POSTFIX, isDev } from './env/env.server'

import { errorHandler, notFound } from './app/middlewares/error.middleware'
import { prisma } from './app/prisma'
import { redis } from './app/redis'

const start = async () => {
	const app = express()

	app.use(express.static('./src/public/data'))
	app.use(express.json())
	app.use(cookieParser())
	app.use(helmet())

	if (isDev) app.use(morgan('dev'))
	if (isDev) app.use(cors())

	app.use(fileUpload())

	app.use(`/${POSTFIX}/auth`, authRouter)
	app.use(`/${POSTFIX}`, chanelRouter)

	app.use(notFound)
	app.use(errorHandler)

	app.listen(PORT, HOST, () => {
		console.log(
			`\n🚀 Сервер запущен по адресу: http://${HOST}:${PORT}/${POSTFIX}\n`
		)
	})
}

start()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async err => {
		console.debug(err)
		await prisma.$disconnect
		await redis.quit
		process.exit(1)
	})
