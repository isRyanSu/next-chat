import { type ChatAgent } from '@/types/agent'

export default function sorter(chatAgents: ChatAgent[]): ChatAgent[] {
  if (!Array.isArray(chatAgents)) return []

  return chatAgents.sort((a, b) => {
    return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
  })
}
