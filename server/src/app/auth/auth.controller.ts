import { hash, verify } from 'argon2'
import { Request, Response } from 'express'

import asyncHandler from 'express-async-handler'

import {
	ACCESS,
	REFRESH,
	REFRESH_MS,
	RESET,
	RESET_MS,
} from '../../env/env.auth'
import { verifyToken } from '../middlewares/auth.middleware'
import { prisma } from '../prisma'
import { redis } from '../redis'
import {
	sendRecoveryToEmail,
	sendVerifyToEmail,
} from '../services/services.mailer'
import { UserFields } from '../utils/user.utils'

import Generator from './auth.generator'

import { 
	REDIS_ERROR,
	EMAIL_EXISTS
} from '../../env/env.error'
import type { SingUpDataType, User } from '../../types/auth.type.ts'

export default {
	singUp: asyncHandler(async (req: Request, res: Response) => {
		const data: SingUpDataType = req.body
		const email = data.email
		const password = data.password

		const isHaveUser = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (isHaveUser) {
			throw EMAIL_EXISTS
		}

		const userFound = await prisma.user.create({
			data: {
				email,
				password: await hash(password),
				balance: 200
			},
		})


		if (!userFound) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Registration error',
			})
			throw new Error('Db crashed!')
		}

		const access_token = Generator.generateToken(userFound.id, ACCESS)
		const refresh_token = Generator.generateToken(userFound.id, REFRESH)
		const emailRespose = await sendVerifyToEmail(email, access_token)

		if (!emailRespose) {
			await prisma.user.delete({
				where: {
					id: userFound.id,
				},
			})

			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Registration error!',
			})
			throw new Error('Mailer crashed!')
		}

		const redisResponse = await redis.set(
			`refresh_tokens:${userFound.id}`,
			`${refresh_token}`,
			'EX',
			REFRESH_MS
		)

		if (!redisResponse) {

			throw REDIS_ERROR
		}

		res.cookie('refresh', refresh_token, {
			maxAge: REFRESH_MS,
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})

		res.setHeader('Authorization', `Bearer ${access_token}`)

		res.status(200).json({
			accessToken: access_token,
			message: 'success',
		})
	}),

	verifyEmail: asyncHandler(async (req: Request, res: Response) => {
		const access_token = String(req.query.access_token)

		const userFound = await verifyToken(access_token, ACCESS)

		if (!userFound) {
			res.status(401).json({
				error: 'Access token don`t valid..',
				status: 'Verify email error!',
			})
			throw new Error('Not verify mail, token failed!')
		}

		await prisma.user.update({
			data: {
				isVerify: true,
			},
			where: {
				id: userFound.id,
			},
		})

		res.status(201).json({ message: 'success' })
	}),

	singIn: asyncHandler(async (req: Request, res: Response) => {
		const { email, password } = req.body

		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!userFound?.isVerify) {
			res.status(401).json({
				error: 'Email isn`t verify..',
				status: 'Verify email error!',
			})
			throw new Error('Not verify email!')
		}

		const isValidUserPassword = await verify(
			userFound?.password ? userFound.password : '',
			password
		)

		if (!userFound || !isValidUserPassword) {
			res.status(401).json({
				error: 'Email or password is incorrect..',
				status: 'Auth error!',
			})
			throw new Error('Email or password is incorrect!')
		}

		const access_token = Generator.generateToken(userFound.id, ACCESS)
		const refresh_token = Generator.generateToken(userFound.id, REFRESH)

		const redisResponse = await redis.set(
			`refresh_tokens:${userFound.id}`,
			`${refresh_token}`,
			'EX',
			REFRESH_MS
		)

		if (!redisResponse) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Registration error',
			})
			throw new Error('Redis crashed!')
		}

		res.cookie('refresh', refresh_token, {
			maxAge: REFRESH_MS,
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})

		res.setHeader('Authorization', `Bearer ${access_token}`)

		res.status(201).json({
			id: userFound.id,
			email: userFound.email,
			role: userFound.role,
			accessToken: access_token,
			message: 'success',
		})
	}),

	updateTokens: asyncHandler(async (req: Request, res: Response) => {
		let access_token
		let refresh_token = req.cookies.refresh

		const userFound = await verifyToken(refresh_token, REFRESH)

		if (!userFound) {
			res.status(401).json({
				error: 'Token failed.',
				status: 'Update tokens error!',
			})
			throw new Error('Not authorized, token failed!')
		}

		let redisRefresh = await redis.get(`refresh_tokens:${userFound.id}`)

		if (redisRefresh !== refresh_token) {
			throw new Error('Incorrect refresh token!')
		}

		access_token = Generator.generateToken(userFound.id, ACCESS)
		refresh_token = Generator.generateToken(userFound.id, REFRESH)

		const redisResponse = await redis.set(
			`refresh_tokens:${userFound.id}`,
			`${refresh_token}`,
			'EX',
			REFRESH_MS
		)

		if (!redisResponse) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Registration error',
			})
			throw new Error('Redis crashed!')
		}

		res.cookie('refresh', refresh_token, {
			maxAge: REFRESH_MS,
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
		})

		res.setHeader('Authorization', `Bearer ${access_token}`)

		res.status(200).json({
			accessToken: access_token,
			message: 'success',
		})
	}),

	deleteUser: asyncHandler(async (req: Request, res: Response) => {
		let access_token
		let userFound: User | null = null

		if (req.headers.authorization?.startsWith('Bearer')) {
			access_token = req.headers.authorization.split(' ')[1]
		}

		if (access_token) userFound = await verifyToken(access_token, ACCESS)

		const delRes = await prisma.user.delete({
			where: {
				id: userFound?.id,
			},
		})

		if (!delRes) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Delete user error',
			})
			throw new Error('Db crashed!')
		}

		res.status(200).json({ message: 'success' })
	}),

	sendSecretCodeToEmail: asyncHandler(async (req: Request, res: Response) => {
		const { email } = req.body

		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
			select: UserFields,
		})

		if (!userFound) {
			res.status(401).json({
				error: 'Email isn`t verify..',
				status: 'Verify email error!',
			})
			throw new Error('Not verify email!')
		}

		const secret_code = Generator.generateSecretCode()

		const emailRespose = await sendRecoveryToEmail(email, secret_code)

		if (!emailRespose) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'SendSecretCodeToEmail error!',
			})
			throw new Error('Mailer crashed!')
		}

		const redisResponse = await redis.set(
			`secret_code:${userFound.id}`,
			`${secret_code}`,
			'EX',
			RESET_MS
		)

		if (!redisResponse) {
			res.status(504).json({
				error: 'Server problems, try again later..',
				status: 'Registration error',
			})
			throw new Error('Redis crashed!')
		}

		res.status(202).json({ message: 'success' })
	}),

	verifyCode: asyncHandler(async (req: Request, res: Response) => {
		const { email, secret_code } = req.body

		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
			select: UserFields,
		})

		if (!userFound) {
			res.status(401).json({
				error: 'Email isn`t verify..',
				status: 'Verify email error!',
			})
			throw new Error('Not verify email!')
		}

		const redisSecret = await redis.get(`secret_code:${userFound.id}`)

		if (secret_code !== redisSecret) {
			res.status(404).json({
				error: 'Secret code isn`t verify..',
				status: 'Verify secret code error!',
			})
			throw new Error('Incorrect secret code!')
		}

		const reset_token = Generator.generateToken(userFound.id, RESET)

		res.setHeader('Authorization', `Bearer ${reset_token}`)

		res.status(201).json({ message: 'success' })
	}),

	rewritePass: asyncHandler(async (req: Request, res: Response) => {
		const { password } = req.body

		let reset_token
		let userFound: User | null = null

		if (req.headers.authorization?.startsWith('Bearer')) {
			reset_token = req.headers.authorization.split(' ')[1]
		}

		if (reset_token) userFound = await verifyToken(reset_token, RESET)

		if (!userFound) {
			res.status(403).json({
				error: 'Reset token is incorrect..',
				status: 'Rewrite password error!',
			})
			throw new Error('Incorrect reset token!')
		}

		const dbRes = await prisma.user.update({
			where: {
				id: userFound?.id,
			},
			data: {
				password,
			},
		})

		if (!dbRes) {
			res.status(500).json({
				error: 'Server problems, try again later..',
				status: 'Rewrite password error',
			})
			throw new Error('Db crashed!')
		}

		res.status(200).json({ message: 'success' })
	}),
}
