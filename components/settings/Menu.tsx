'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

import { Bot, Coffee, LogOut, Settings2, User } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default function Menu() {
  const pathname = usePathname()

  return (
    <section className="relative flex h-full w-80 min-w-80 max-w-80 flex-1 flex-col border-r border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
      <header className="flex h-16 flex-none items-center justify-between border-b border-zinc-200 px-3 dark:border-zinc-800">
        <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
          <Link href="/welcome">NextChat</Link>
        </h1>
      </header>
      <div className="flex h-full flex-col space-y-2 p-3">
        <Link
          href="/settings/common-settings"
          className={cn(
            'group flex h-14 w-full flex-row items-center justify-start gap-2 rounded-md px-3 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-700',
            pathname.includes('/settings/common-settings') &&
              'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
          )}
        >
          <Settings2
            className={cn(
              'size-5 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300',
              pathname.includes('/settings/common-settings') &&
                'text-zinc-900 dark:text-zinc-100',
            )}
          />
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Common Settings
          </span>
        </Link>
        <Link
          href="/settings/my-account"
          className={cn(
            'group flex h-14 w-full flex-row items-center justify-start gap-2 rounded-md px-3 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-700',
            pathname.includes('/settings/my-account') &&
              'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
          )}
        >
          <User
            className={cn(
              'size-5 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300',
              pathname.includes('/settings/my-account') &&
                'text-zinc-900 dark:text-zinc-100',
            )}
          />
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            My Account
          </span>
        </Link>
        <Link
          href="/settings/default-agent"
          className={cn(
            'group flex h-14 w-full flex-row items-center justify-start gap-2 rounded-md px-3 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-700',
            pathname.includes('/settings/default-agent') &&
              'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
          )}
        >
          <Bot
            className={cn(
              'size-5 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300',
              pathname.includes('/settings/default-agent') &&
                'text-zinc-900 dark:text-zinc-100',
            )}
          />
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Default Agent
          </span>
        </Link>
        <Link
          href="/settings/about-this-app"
          className={cn(
            'group flex h-14 w-full flex-row items-center justify-start gap-2 rounded-md px-3 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-700',
            pathname.includes('/settings/about-this-app') &&
              'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700',
          )}
        >
          <Coffee
            className={cn(
              'size-5 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300',
              pathname.includes('/settings/about-this-app') &&
                'text-zinc-900 dark:text-zinc-100',
            )}
          />
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            About This App
          </span>
        </Link>
      </div>
      <div className="absolute bottom-0 flex h-[68px] w-80 min-w-80 max-w-80 flex-none items-center justify-center px-3">
        <Button
          type="button"
          variant="default"
          size="default"
          className="h-11 w-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          onClick={() => signOut()}
        >
          <span>Logout</span>
          <LogOut className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  )
}
