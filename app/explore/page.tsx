'use client'

import { useEffect } from 'react'

import useSWR from 'swr'

import { Header } from '@/components/explore/Header'
import { Search } from '@/components/explore/Search'
import { TagList } from '@/components/explore/TagList'
import { AgentList } from '@/components/explore/AgentList'
import { AgentListSkeleton } from '@/components/explore/AgentListSkeleton'

import useExploreStore from '@/stores/useExploreStore'

import { type ExploreAgent } from '@prisma/client'

export default function ExplorePage() {
  const { data: exploreAgents, error } = useSWR<ExploreAgent[]>(
    '/api/explore-agent',
    (url: string) => fetch(url).then((res) => res.json()),
  )

  const filteredExploreAgents = useExploreStore(
    (state) => state.filteredExploreAgents,
  )
  const setExploreAgents = useExploreStore((state) => state.setExploreAgents)
  const selectedTag = useExploreStore((state) => state.selectedTag)
  const searchTerm = useExploreStore((state) => state.searchTerm)

  useEffect(() => {
    if (exploreAgents) setExploreAgents(exploreAgents)
  }, [setExploreAgents, exploreAgents])

  return (
    <>
      <Header />
      <Search />
      <TagList />
      {error ? (
        <p className="text-red-500">Error loading Explore Agents.</p>
      ) : !exploreAgents ? (
        <AgentListSkeleton />
      ) : (
        <>
          {!selectedTag && !searchTerm ? (
            <>
              <AgentList
                title="Recent Submits"
                agents={exploreAgents.slice(0, 3)}
              />
              <AgentList title="All Submits" agents={exploreAgents.slice(3)} />
            </>
          ) : (
            <AgentList title="All Results" agents={filteredExploreAgents} />
          )}
        </>
      )}
    </>
  )
}
