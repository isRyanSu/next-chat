import { type Metadata } from 'next'

import { Toaster } from 'sonner'

import { Header } from '@/components/global/Header'

export const metadata: Metadata = {
  title: 'Explore',
}

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1 flex-col bg-zinc-50 dark:bg-zinc-950">
      <Header />
      <div className="overflow-y-auto">
        <div className="mx-auto flex w-[1024px] flex-col pb-4">
          {children}
          <Toaster position="top-center" />
        </div>
      </div>
    </main>
  )
}
