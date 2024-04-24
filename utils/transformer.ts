import { type Message as AIMessage } from 'ai/react'

import { type MessageRole, type Message as ChatMessage } from '@/types/message'

export default function transformer(messages: AIMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as MessageRole,
    content: message.content,
    createdAt: message.createdAt as Date,
    chatAgentId: '',
  }))
}
