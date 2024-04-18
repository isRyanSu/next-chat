import { type Metadata } from 'next'

import { AgentPanel } from '@/components/chat/agentPanel'

export const metadata: Metadata = {
  title: 'Chat',
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1">
      <AgentPanel />
      {children}
    </main>
  )
}
