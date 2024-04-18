import { type ChatAgent } from '@/types/agent'
import { type Model } from '@/types/model'

export type Chat = {
  chatAgents: ChatAgent[]
  filteredChatAgents: ChatAgent[]
  chatAgent: ChatAgent
  model: Model
  temperature: number
  searchTerm: string
  setChatAgents: (chatAgents: ChatAgent[]) => void
  setChatAgent: (chatAgent: ChatAgent) => void
  setModel: (model: Model) => void
  setTemperature: (temperature: number) => void
  setSearchTerm: (searchTerm: string) => void
  filter: () => void
}
