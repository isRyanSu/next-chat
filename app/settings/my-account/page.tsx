import Image from 'next/image'

import { formatDate } from 'date-fns'
import {
  CalendarDays,
  Contact,
  Fingerprint,
  Lock,
  Mail,
  QrCode,
  SquareKanban,
} from 'lucide-react'

import Theme from '@/components/global/Theme'
import { Badge } from '@/components/ui/badge'

import { currentUser } from '@/lib/auth'

import { getUserById } from '@/data/user'

import { type UserInfo } from '@/types/user'

export default async function SettingsPage() {
  const user = await currentUser()

  if (!user) return null

  const userInfo: UserInfo = (await getUserById(user.id)) as UserInfo

  const { id, name, email, avatar, createdAt, updatedAt } = userInfo

  return (
    <section className="flex h-full flex-1 flex-col bg-zinc-100 dark:bg-zinc-950">
      <header className="flex h-16 flex-none items-center border-b border-zinc-200 bg-zinc-50 px-3 dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          My Account
        </h1>
        <Theme />
      </header>
      <div className="flex h-full w-full flex-row gap-3 p-3 pb-0">
        {/* LEFT BOX */}
        <div className="flex h-full w-3/5 flex-col items-center space-y-4 rounded-md bg-zinc-50 px-8 py-6 dark:bg-zinc-900">
          <div className="flex h-12 w-32 flex-row items-center justify-start gap-2 self-start rounded-full">
            <QrCode className="size-5" />
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
              Profile
            </h2>
          </div>
          {/* Avatar */}
          <div className="flex size-28 flex-none items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800">
            <Image
              src={avatar}
              height={80}
              width={80}
              alt={`Emoji of ${avatar}`}
            />
          </div>
          {/* Title */}
          <h1 className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {name}
          </h1>
          {/* ID */}
          <div className="flex h-14 w-full flex-row items-center justify-between rounded-xl border bg-zinc-100 p-3 px-6 shadow-sm hover:animate-pulse hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="flex flex-row items-center gap-4">
              <Fingerprint className="size-5" />
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                ID
              </span>
            </div>
            <p className="max-w-64 truncate text-right font-mono font-medium">
              {id}
            </p>
          </div>
          {/* Name */}
          <div className="flex h-14 w-full flex-row items-center justify-between rounded-xl border bg-zinc-100 p-3 px-6 shadow-sm hover:animate-pulse hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="flex flex-row items-center gap-4">
              <Contact className="size-5" />
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Name
              </span>
            </div>
            <p className="max-w-64 truncate text-right font-mono font-medium">
              {name}
            </p>
          </div>
          {/* Email */}
          <div className="flex h-14 w-full flex-row items-center justify-between rounded-xl border bg-zinc-100 p-3 px-6 shadow-sm hover:animate-pulse hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="flex flex-row items-center gap-4">
              <Mail className="size-5" />
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Email
              </span>
            </div>
            <p className="max-w-64 truncate text-right font-mono font-medium">
              {email}
            </p>
          </div>
          {/* TFA */}
          <div className="flex h-14 w-full flex-row items-center justify-between rounded-xl border bg-zinc-100 p-3 px-6 shadow-sm hover:animate-pulse hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="flex flex-row items-center gap-4">
              <Lock className="size-5" />
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Two Factor Authentication
              </span>
            </div>
            <Badge variant={true ? 'default' : 'destructive'}>
              {true ? 'ON' : 'OFF'}
            </Badge>
          </div>
          {/* Created At */}
          <div className="flex h-14 w-full flex-row items-center justify-between rounded-xl border bg-zinc-100 p-3 px-6 shadow-sm hover:animate-pulse hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800">
            <div className="flex flex-row items-center gap-4">
              <CalendarDays className="size-5" />
              <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                Created At
              </span>
            </div>
            <p className="max-w-64 truncate text-right font-mono font-medium">
              {formatDate(createdAt, 'MM-dd HH:mm:ss')}
            </p>
          </div>
        </div>
        {/* RIGHT BOX */}
        <div className="flex h-full w-2/5 flex-col items-center space-y-4 rounded-md bg-zinc-50 px-8 py-6 dark:bg-zinc-900">
          <div className="flex h-12 w-32 flex-row items-center justify-start gap-2 self-start rounded-full">
            <SquareKanban className="size-5" />
            <h2 className="text-2xl font-medium text-zinc-900 dark:text-zinc-100">
              Usage
            </h2>
          </div>
        </div>
      </div>
      <footer className="flex h-[68px] w-full flex-none flex-row items-center justify-center px-3">
        <div className="flex h-11 w-full items-center justify-center rounded-md bg-zinc-50 hover:animate-pulse dark:bg-zinc-900">
          <span className="text-xs italic text-zinc-500 opacity-75">
            --- Last Updated: {formatDate(updatedAt, 'MM-dd HH:mm:ss')} ---
          </span>
        </div>
      </footer>
    </section>
  )
}
