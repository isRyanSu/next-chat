'use client'

import Link from 'next/link'

import { MessageSquarePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

import useChatStore from '@/stores/useChatStore'

export function Header({ mutate }: { mutate: () => {} }) {
  const setChatAgent = useChatStore((state) => state.setChatAgent)

  function handleAddDefaultChatAgent() {
    fetch('/api/chat-agent', { method: 'POST' })
      .then((res) => res.json())
      .then((defaultChatAgent) => setChatAgent(defaultChatAgent))
      .then(() => mutate())
  }

  return (
    <header className="flex h-16 items-center justify-between border-b px-3">
      <h1 className="text-2xl font-extrabold text-zinc-900">
        <Link href="/chat">NextChat</Link>
      </h1>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-zinc-500"
        onClick={handleAddDefaultChatAgent}
      >
        <MessageSquarePlus />
      </Button>
    </header>
  )
}
