import Agent from '@/components/explore/Agent'

import { type ExploreAgent } from '@prisma/client'

export function AgentList({
  title,
  agents,
}: {
  title: string
  agents: ExploreAgent[]
}) {
  return (
    <div className="my-4 flex w-full flex-col gap-8">
      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      {agents.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {agents.map((agent) => (
            <Agent key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="text-red-500">Oops! No agents found.</div>
      )}
    </div>
  )
}
