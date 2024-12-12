import { Request, Response } from 'express';
import { OpenAIModelProvider } from '../services/OpenAIModelProvider';
import asyncHandler from 'express-async-handler';

export default {
  streamResponse: asyncHandler(async (req: Request, res: Response) => {
    const { model, prompt } = req.body;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');

    try {
      const provider = new OpenAIModelProvider(model);
      const stream = await provider.generate(prompt);

      stream.on('data', (chunk: Buffer) => {
        res.write(`data: ${chunk.toString()}\n\n`);
      });

      stream.on('end', () => res.end());
      stream.on('error', () => res.status(500).end());
    } catch (error) {
      res.status(500).end();
    }
  }),
};
