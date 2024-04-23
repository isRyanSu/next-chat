'use client'

import useSWR from 'swr'
import { useChat } from 'ai/react'

import { Header } from '@/components/chat/chatPanel/Header'
import { Output } from '@/components/chat/chatPanel/Output'
import { Input } from '@/components/chat/chatPanel/Input'

import useChatStore from '@/stores/useChatStore'

import transformer from '@/utils/transformer'

export function ChatPanel() {
  const model = useChatStore((state) => state.model)
  const temperature = useChatStore((state) => state.temperature)
  const chatAgent = useChatStore((state) => state.chatAgent)
  const setChatAgent = useChatStore((state) => state.setChatAgent)
  const { mutate } = useSWR(
    `/api/chat-agent/${chatAgent.id}`,
    (url: string) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setChatAgent(data))
    },
  )
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: '/api/openai',
    body: {
      model,
      temperature,
      chatAgentId: chatAgent.id,
    },
    initialMessages: chatAgent.messages,
    onFinish: () => mutate(),
  })

  return (
    <section className="relative flex h-full flex-1 flex-col bg-zinc-100 dark:bg-zinc-950">
      <Header />
      <Output messages={transformer(messages)} />
      <Input
        input={input}
        setInput={setInput}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </section>
  )
}
