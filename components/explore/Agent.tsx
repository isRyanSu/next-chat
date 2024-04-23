'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

import { type ExploreAgent } from '@prisma/client'

const AgentInfo = dynamic(() => import('@/components/explore/AgentInfo'), {
  ssr: false,
})

export default function Agent({ agent }: { agent: ExploreAgent }) {
  return (
    <Dialog>
      <DialogTrigger className="flex cursor-pointer flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {/* Avatar */}
        <div className="flex size-14 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={`/emojis/${agent.avatar}.webp`}
            height={44}
            width={44}
            alt={`Emoji of ${agent.avatar}`}
          />
        </div>
        {/* Title */}
        <h3 className="text-normal h-6 w-full truncate text-start font-medium text-zinc-900 dark:text-zinc-100">
          {agent.title}
        </h3>
        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-none text-pretty text-start text-sm font-normal text-zinc-700 dark:text-zinc-300">
          {agent.description}
        </p>
        {/* Tags */}
        <div className="flex flex-row flex-wrap gap-2">
          {agent.tags.map((tag) => (
            <Badge
              key={`${agent.identifier}-${tag}-${Math.random()}`}
              variant="outline"
              className="h-5 rounded border-none bg-zinc-100 px-2 text-xs font-light capitalize text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </DialogTrigger>
      <DialogContent>
        <AgentInfo agent={agent} />
      </DialogContent>
    </Dialog>
  )
}
