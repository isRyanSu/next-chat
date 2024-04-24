'use client'

import Image from 'next/image'

import Markdown from 'react-markdown'
import { Clock } from 'lucide-react'
import { formatDate } from 'date-fns'

import useChatStore from '@/stores/useChatStore'

import { type Message } from '@/types/message'

export function Message({ message }: { message: Message }) {
  const agent = useChatStore((state) => state.chatAgent)

  const { role, content, createdAt } = message

  if (role === 'system' || role === 'user') {
    return (
      <div className="flex w-full justify-end gap-4">
        <div className="group relative max-w-[560px] text-wrap rounded-lg bg-zinc-50 px-4 py-2 text-start dark:bg-zinc-800">
          <Markdown className="prose prose-zinc dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
            {content}
          </Markdown>
          <div className="absolute -bottom-6 right-2 hidden group-hover:block">
            <p className="flex items-center gap-1 text-nowrap text-xs text-zinc-500 opacity-75 dark:text-zinc-300">
              {formatDate(createdAt, 'MM-dd HH:mm:ss')}
              <Clock className="size-[14px]" />
            </p>
          </div>
        </div>
        <Image
          src="/emojis/exploding-head.webp"
          height={40}
          width={40}
          alt="A image of user"
          className="flex size-10 rounded-full"
        />
      </div>
    )
  }

  if (role === 'assistant') {
    return (
      <div className="flex w-full justify-start gap-4">
        <Image
          src={`/emojis/${agent.avatar ? agent.avatar : 'exploding-head'}.webp`}
          height={40}
          width={40}
          alt={`A ${agent.avatar ? agent.avatar : 'exploding-head'} image`}
          className="flex size-10"
        />
        <div className="group relative max-w-[560px] text-wrap rounded-lg bg-zinc-50 px-4 py-2 text-start dark:bg-zinc-800">
          <Markdown className="prose prose-zinc dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
            {content}
          </Markdown>
          <div className="absolute -bottom-6 left-2 hidden group-hover:block">
            <p className="flex items-center gap-1 text-nowrap text-xs text-zinc-500 opacity-75 dark:text-zinc-300">
              <Clock className="size-[14px]" />
              {formatDate(createdAt, 'MM-dd HH:mm:ss')}
            </p>
          </div>
        </div>
      </div>
    )
  }
}
