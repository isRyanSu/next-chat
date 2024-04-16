import Link from 'next/link'

export function Header() {
  return (
    <header className="flex h-16 flex-none items-center border-b px-3">
      <Link href="/welcome" className="text-2xl font-extrabold text-zinc-900">
        NextChat
      </Link>
    </header>
  )
}
