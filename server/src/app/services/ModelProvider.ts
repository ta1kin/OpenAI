export interface ModelProvider {
	generate(
		prompt: string,
		options?: Record<string, unknown>
	): Promise<NodeJS.ReadableStream>
	calculateTokens(input: string): number
	getTokenCost(): number
}
