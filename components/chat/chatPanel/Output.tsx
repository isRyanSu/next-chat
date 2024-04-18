'use client'

import { Message } from '@/components/chat/chatPanel/Message'

import { type Message as ChatMessage } from '@/types/message'

export function Output({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="mb-auto flex h-full grow flex-col-reverse gap-8 overflow-y-auto p-4 pb-64 scrollbar-hide">
      {messages.reverse().map((message) => {
        return <Message key={message.id} message={message} />
      })}
    </div>
  )
}
