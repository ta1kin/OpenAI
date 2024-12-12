const fetch = require('node-fetch')
import { Readable } from 'stream'
import { ModelProvider } from '../services/ModelProvider'

interface OpenAIResponse {
	choices: { text: string }[]
}

export class OpenAIModelProvider implements ModelProvider {
	private apiKey = process.env.OPENAI_API_KEY

	constructor(private modelName: string) {}

	async generate(prompt: string): Promise<NodeJS.ReadableStream> {
		const response = await fetch(
			'https://bothub.chat/api/v2/openai/v1/completions',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${this.apiKey}`,
				},
				body: JSON.stringify({ model: this.modelName, prompt }),
			}
		)

		const data = (await response.json()) as OpenAIResponse
		const resultText = data.choices[0].text

		// Преобразуем строку в поток
		const stream = Readable.from([resultText])
		return stream
	}

	calculateTokens(input: string): number {
		return input.split(/\s+/).length
	}

	getTokenCost(): number {
		return this.modelName === 'gpt-4' ? 0.2 : 0.1
	}
}

export default OpenAIModelProvider
