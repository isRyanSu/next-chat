'use client'

import { useEffect } from 'react'

import useSWR from 'swr'

import { Header } from '@/components/chat/agentPanel/Header'
import { Search } from '@/components/chat/agentPanel/Search'
import { AgentList } from '@/components/chat/agentPanel/AgentList'
import { AgentListSkeleton } from '@/components/chat/agentPanel/AgentListSkeleton'

import useChatStore from '@/stores/useChatStore'

import { type ChatAgent } from '@/types/agent'

export function AgentPanel() {
  const setChatAgents = useChatStore((state) => state.setChatAgents)
  const filteredExploreAgents = useChatStore(
    (state) => state.filteredChatAgents,
  )
  const searchTerm = useChatStore((state) => state.searchTerm)
  const {
    data: chatAgents,
    isLoading,
    error,
    mutate,
  } = useSWR<ChatAgent[]>(`/api/chat-agent`, (url: string) =>
    fetch(url).then((res) => res.json()),
  )

  useEffect(
    function () {
      if (chatAgents) setChatAgents(chatAgents)
    },
    [setChatAgents, chatAgents],
  )

  return (
    <section className="flex h-full w-80 min-w-80 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <Header mutate={mutate} />
      <Search />
      {error ? (
        <p className="text-center text-red-500">Error loading Chat Agents.</p>
      ) : isLoading || !chatAgents ? (
        <AgentListSkeleton />
      ) : (
        <>
          {!searchTerm ? (
            <AgentList chatAgents={chatAgents} mutate={mutate} />
          ) : (
            <AgentList chatAgents={filteredExploreAgents} mutate={mutate} />
          )}
        </>
      )}
    </section>
  )
}
