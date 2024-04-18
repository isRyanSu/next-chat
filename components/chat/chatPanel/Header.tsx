'use client'

import Image from 'next/image'

import { SiOpenai } from 'react-icons/si'

import { Badge } from '@/components/ui/badge'

import useChatStore from '@/stores/useChatStore'

export function Header() {
  const model = useChatStore((state) => state.model)
  const { avatar, title, description } = useChatStore(
    (state) => state.chatAgent,
  )

  return (
    <header className="flex h-16 flex-none items-center gap-2 border-b px-4">
      <div className="flex-none">
        <Image
          src={
            avatar ? `/emojis/${avatar}.webp` : '/emojis/exploding-head.webp'
          }
          height={40}
          width={40}
          alt={`Emoji of ${avatar}`}
        />
      </div>
      <div className="flex w-full flex-col gap-1">
        <h1 className="flex items-center gap-2">
          <span className="text-sm font-semibold text-zinc-900">{title}</span>
          <Badge
            variant="secondary"
            className="rounded bg-zinc-100 p-1 text-xs font-normal leading-3 text-zinc-500"
          >
            <SiOpenai className="mr-1 size-3 text-zinc-500" />
            {model}
          </Badge>
        </h1>
        <p className="line-clamp-1 w-3/4 text-xs text-zinc-700">
          {description}
        </p>
      </div>
    </header>
  )
}
