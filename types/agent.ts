import { type Message } from '@/types/message'

export type ChatAgent = {
  id: string
  identifier: string
  avatar: string
  title: string
  description: string
  tags: string[]
  systemRole: string
  createdAt: Date
  updatedAt: Date
  userId: string
  messages: Message[]
}
