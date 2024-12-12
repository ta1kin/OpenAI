import express from 'express'
import billingController from './billing.controller'
import { OpenAIModelProvider } from './model.controller'
import streamController from './stream.controller'

const router = express.Router()

router.post('/generate', async (req, res) => {
	const { model, prompt } = req.body

	const openAIProvider = new OpenAIModelProvider(model)

	try {
		const stream = await openAIProvider.generate(prompt)
		stream.pipe(res) // Передаем поток в ответ
	} catch (error) {
		res.status(500).json({ error: 'Ошибка генерации' })
	}
})

router.get('/balance', billingController.getBalance)
router.post('/balance/update', billingController.updateBalance)
router.post('/stream', streamController.streamResponse)

export default router
