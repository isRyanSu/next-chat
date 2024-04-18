import { type Chat } from '@/types/chat'

export const initChatState: Chat = {
  chatAgents: [],
  filteredChatAgents: [],
  chatAgent: {
    id: '',
    identifier: '',
    avatar: 'exploding-head',
    title: 'Just Chat',
    description:
      'Activate the brain cluster and spark creative thinking. Your virtual agent is here to communicate with you about everything.',
    tags: [],
    systemRole: 'You are a helpful assistant.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: '',
    messages: [],
  },
  model: 'gpt-3.5-turbo',
  temperature: 1,
  searchTerm: '',
  setChatAgents: () => {},
  setChatAgent: () => {},
  setModel: () => {},
  setTemperature: () => {},
  setSearchTerm: () => {},
  filter: () => {},
}
