import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User Profile',
}

export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="flex h-full flex-1 flex-col">{children}</main>
}
