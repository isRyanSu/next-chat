'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { MessageSquare, Compass, Settings2, User, LogOut } from 'lucide-react'

import { SignOutButton, SignedIn } from '@clerk/nextjs'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside className="flex h-full w-16 flex-col border-r">
      <div className="flex size-16 items-center justify-center border-b">
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
            variant={pathname === '/chat' ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname === '/chat' && 'text-zinc-900',
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
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push('/welcome')}>
              <Button
                variant="ghost"
                size="icon"
                className="size-11 text-zinc-500"
              >
                <LogOut className="size-6" />
              </Button>
            </SignOutButton>
          </SignedIn>
          <Button
            variant={pathname === '/user-profile' ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname === '/user-profile' && 'text-zinc-900',
            )}
            asChild
          >
            <Link href="/user-profile">
              <User className="size-6" />
            </Link>
          </Button>
          <Button
            variant={pathname === '/settings' ? 'secondary' : 'ghost'}
            size="icon"
            className={cn(
              'size-11 text-zinc-500',
              pathname === '/settings' && 'text-zinc-900',
            )}
            asChild
          >
            <Link href="/settings">
              <Settings2 className="size-6" />
            </Link>
          </Button>
        </nav>
      </div>
    </aside>
  )
}
