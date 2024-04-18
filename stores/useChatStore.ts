import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { initChatState } from '@/stores/init/chat'

import { type Chat } from '@/types/chat'
import { type Model } from '@/types/model'
import { type ChatAgent } from '@/types/agent'

const useChatStore = create<Chat>()(
  persist(
    (set, get) => {
      const storeActions = {
        setChatAgents: (chatAgents: ChatAgent[]) => {
          set({ chatAgents })
        },
        setChatAgent: (chatAgent: ChatAgent) => {
          set({ chatAgent })
        },
        setModel: (model: Model) => {
          set({ model })
        },
        setTemperature: (temperature: number) => {
          set({ temperature })
        },
        setSearchTerm: (searchTerm: string) => {
          set({ searchTerm })
          get().filter()
        },
        filter: () => {
          const { chatAgents, searchTerm } = get()

          const filteredChatAgents = chatAgents.filter((agent) => {
            const searchMatchedAgents =
              // 匹配 Title
              agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              // 匹配 Description
              agent.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              // 匹配 Messages
              agent.messages.some((message) =>
                message.content
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
              )

            return searchMatchedAgents
          })
          set({ filteredChatAgents })
        },
      }

      return { ...initChatState, ...storeActions }
    },
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)

export default useChatStore
