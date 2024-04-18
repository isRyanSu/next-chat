import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/lib/prisma'

const openai = new OpenAI({
  baseURL: process.env.OPENAI_PROXY_URL,
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { model, temperature, messages, chatAgentId } = await req.json()

    const response = await openai.chat.completions.create({
      model,
      temperature,
      messages,
      stream: true,
    })

    const stream = OpenAIStream(response, {
      onStart: async () => {
        await prisma.message.create({
          data: {
            id: uuidv4(),
            role: 'user',
            content: messages[messages.length - 1].content,
            createdAt: new Date(),
            chatAgentId,
          },
        })
      },
      onCompletion: async (completion: string) => {
        await prisma.message.create({
          data: {
            id: uuidv4(),
            role: 'assistant',
            content: completion,
            createdAt: new Date(),
            chatAgentId,
          },
        })
      },
    })

    return new StreamingTextResponse(stream)
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'
    console.error('Error processing chat request:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
