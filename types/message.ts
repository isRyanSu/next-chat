import { type Role } from '@/types/role'

export type Message = {
  id: string
  role: Role
  content: string
  createdAt: Date
  chatAgentId: string
}
