export type MessageRole = 'system' | 'user' | 'assistant'

export type Message = {
  id: string
  role: MessageRole
  content: string
  createdAt: Date
  chatAgentId: string
}
