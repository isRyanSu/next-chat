import { type Metadata } from 'next'
import Image from 'next/image'

import { Header } from '@/components/global/Header'
import { Statement } from '@/components/global/Statement'

export const metadata: Metadata = {
  title: 'Sign In',
}

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1 flex-col">
      <Header />
      <section className="flex h-full">
        {/* 左侧表单 */}
        <div className="flex h-full w-1/2 flex-col bg-zinc-50 dark:bg-zinc-900">
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
          <Statement />
        </div>
        {/* 右侧插画 */}
        <div className="flex h-full w-1/2 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <Image
            src="/banners/Copy Writing.svg"
            alt="A illustration of copy writing"
            width={500}
            height={500}
            priority={true}
          />
        </div>
      </section>
    </main>
  )
}
