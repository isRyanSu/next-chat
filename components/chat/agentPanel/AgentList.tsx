'use client'

import { Agent } from '@/components/chat/agentPanel/Agent'

import sorter from '@/utils/sorter'

import { type ChatAgent } from '@/types/agent'

export function AgentList({
  chatAgents,
  mutate,
}: {
  chatAgents: ChatAgent[]
  mutate: () => {}
}) {
  return (
    <section className="flex-1 space-y-2 overflow-y-scroll px-3 pb-2 scrollbar-hide">
      {chatAgents.length === 0 ? (
        <p className="text-center text-red-500">
          Oops! You don&apos;t have any Chat Agent.
        </p>
      ) : (
        <>
          {sorter(chatAgents).map((chatAgent) => (
            <Agent key={chatAgent.id} chatAgent={chatAgent} mutate={mutate} />
          ))}
        </>
      )}
    </section>
  )
}
