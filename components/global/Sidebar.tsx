'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { MessageSquare, Compass, Book, Settings2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-16 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex size-16 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
        <Image
          src="/logos/icon-anim.webp"
          height={40}
          width={40}
          alt="Logo of NextChat"
          unoptimized
        />
      </div>
      <div className="flex flex-1 flex-col justify-between py-3">
        <nav className="flex flex-col items-center gap-2">
          <Button
            variant={pathname.includes('/chat') ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname.includes('/chat') && 'text-zinc-900',
            )}
            asChild
          >
            <Link href="/chat">
              <MessageSquare className="size-6" />
            </Link>
          </Button>
          <Button
            variant={pathname === '/explore' ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname === '/explore' && 'text-zinc-900',
            )}
            asChild
          >
            <Link href="/explore">
              <Compass className="size-6" />
            </Link>
          </Button>
        </nav>
        <nav className="flex flex-col items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-11 text-zinc-500"
            asChild
          >
            <Link href="https://github.com/isRyanSu/next-chat">
              <Book className="size-6" />
            </Link>
          </Button>
          <Button
            variant={pathname.includes('/settings') ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname.includes('/settings') && 'text-zinc-900',
            )}
            asChild
          >
            <Link href="/settings/common-settings">
              <Settings2 className="size-6" />
            </Link>
          </Button>
        </nav>
      </div>
    </aside>
  )
}
