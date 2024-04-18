import { type Role } from '@/types/role'
import { type Message as AIMessage } from 'ai/react'
import { type Message as ChatMessage } from '@/types/message'

export default function transformer(messages: AIMessage[]): ChatMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role as Role,
    content: message.content,
    createdAt: message.createdAt as Date,
    chatAgentId: '',
  }))
}
