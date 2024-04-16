import { create } from 'zustand'

import { type ExploreAgent } from '@prisma/client'

type ExploreState = {
  exploreAgents: ExploreAgent[]
  filteredExploreAgents: ExploreAgent[]
  selectedTag: string
  searchTerm: string
  setExploreAgents: (exploreAgents: ExploreAgent[]) => void
  setSelectedTag: (selectedTag: string) => void
  setSearchTerm: (searchTerm: string) => void
  filter: () => void
}

const initExploreState: ExploreState = {
  exploreAgents: [],
  filteredExploreAgents: [],
  selectedTag: '',
  searchTerm: '',
  setExploreAgents: () => {},
  setSelectedTag: () => {},
  setSearchTerm: () => {},
  filter: () => {},
}

const useExploreStore = create<ExploreState>()((set, get) => {
  const storeActions = {
    setExploreAgents: (exploreAgents: ExploreAgent[]) => {
      set({ exploreAgents })
      get().filter()
    },
    setSelectedTag: (selectedTag: string) => {
      set({ selectedTag })
      get().filter()
    },
    setSearchTerm: (searchTerm: string) => {
      set({ searchTerm })
      get().filter()
    },
    filter: () => {
      const { exploreAgents, selectedTag, searchTerm } = get()

      const filteredExploreAgents = exploreAgents.filter((agent) => {
        const searchMatchedAgents =
          // 匹配 Title
          agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // 匹配 Description
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // 匹配 Tags
          agent.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        const tagMatchedAgents = selectedTag
          ? agent.tags.some((tag) => tag === selectedTag)
          : true

        return searchMatchedAgents && tagMatchedAgents
      })

      set({ filteredExploreAgents })
    },
  }

  return {
    ...initExploreState,
    ...storeActions,
  }
})

export default useExploreStore
