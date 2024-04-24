import { type Metadata } from 'next'

import Menu from '@/components/settings/Menu'

export const metadata: Metadata = {
  title: 'Settings',
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1">
      <Menu />
      {children}
    </main>
  )
}
