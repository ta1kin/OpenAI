import { Request, Response, NextFunction } from 'express'
import { checkBalance, updateBalance } from '../services/BillingServises'
import asyncHandler from 'express-async-handler'

export default {
	getBalance: asyncHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const userId = req.body.user.id
				const balance = await checkBalance(userId)
				res.status(200).json({ balance })
			} catch (error) {
				next(error)
			}
		}
	),

	updateBalance: asyncHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const { userId, amount } = req.body
				await updateBalance(userId, amount)
				res.status(200).json({ message: 'Balance updated' })
			} catch (error) {
				next(error)
			}
		}
	),
}
