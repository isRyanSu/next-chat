import Link from 'next/link'

import Theme from '@/components/global/Theme'

export function Header() {
  return (
    <header className="flex h-16 flex-none items-center border-b border-zinc-200 bg-zinc-50 px-3 dark:border-zinc-800 dark:bg-zinc-900">
      <Link
        href="/welcome"
        className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100"
      >
        NextChat
      </Link>
      <Theme />
    </header>
  )
}
