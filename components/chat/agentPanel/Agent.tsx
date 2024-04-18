'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { EllipsisVertical, Trash } from 'lucide-react'
import { formatDate } from 'date-fns'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import useChatStore from '@/stores/useChatStore'

import { cn } from '@/lib/utils'

import { type ChatAgent } from '@/types/agent'

export function Agent({
  chatAgent,
  mutate,
}: {
  chatAgent: ChatAgent
  mutate: () => {}
}) {
  const router = useRouter()
  const [menu, setMenu] = useState<boolean>(false)
  const chatAgents = useChatStore((state) => state.chatAgents)
  const setChatAgent = useChatStore((state) => state.setChatAgent)
  const { id: chatAgentId, avatar, title, description, createdAt } = chatAgent
  const isCurrentAgent =
    chatAgentId === useChatStore((state) => state.chatAgent).id

  function handleSelectChatAgent() {
    setChatAgent(chatAgent)

    router.push(`/chat/${chatAgent.identifier}`)
  }

  function handleDeleteChatAgent() {
    fetch(`/api/chat-agent/${chatAgentId}`, { method: 'DELETE' })
      .then(() => mutate())
      .then(() => {
        if (isCurrentAgent) setChatAgent(chatAgents[0])
      })
  }

  return (
    <DropdownMenu open={menu} onOpenChange={setMenu}>
      <div
        key={chatAgentId}
        className={cn(
          'group flex h-fit w-full flex-row items-center justify-start gap-2 rounded-lg py-3 pl-2 pr-4 hover:bg-zinc-200',
          isCurrentAgent && 'bg-zinc-100',
        )}
        onClick={handleSelectChatAgent}
      >
        <div className="flex size-11 items-center justify-center">
          <Image
            src={`/emojis/${avatar}.webp`}
            height={36}
            width={36}
            alt={`Emoji of ${avatar}`}
          />
        </div>
        <div className="flex w-44 flex-col items-start gap-1 overflow-hidden">
          <h1 className="w-full truncate text-start text-base font-medium text-zinc-900">
            {title}
          </h1>
          <p className="w-full truncate text-start text-sm font-normal text-zinc-500">
            {description}
          </p>
        </div>
        <DropdownMenuTrigger className="group relative flex flex-1 items-center justify-center outline-none duration-300">
          <EllipsisVertical
            className={cn(
              'hidden size-8 rounded-lg p-2 hover:bg-zinc-300 group-hover:block',
              menu && 'block',
            )}
          />
          <p
            className={cn(
              'absolute right-0 text-xs text-zinc-500 opacity-75 group-hover:hidden',
              menu && 'hidden',
            )}
          >
            {formatDate(createdAt, 'HH:mm')}
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} align="start" alignOffset={5}>
          <DropdownMenuItem
            className="group flex flex-row items-center gap-2"
            onClick={handleDeleteChatAgent}
          >
            <Trash className="size-4 text-red-500" />
            <p className="text-red-500">Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  )
}
