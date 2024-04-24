import { type Metadata } from 'next'

import Image from 'next/image'

import { Toaster } from 'sonner'

import Header from '@/components/global/Header'
import Statement from '@/components/auth/Statement'

export const metadata: Metadata = {
  title: 'Register',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1 flex-col">
      <Header />
      <section className="flex h-full bg-zinc-50 dark:bg-zinc-900">
        {/* 左侧表单 */}
        <div className="flex h-full w-1/2 flex-col">
          {/* 以一种优雅的方式提示用户成功/错误信息 */}
          <div className="relative">
            <Toaster className="absolute" position="top-center" />
          </div>
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
          <Statement />
        </div>
        {/* 右侧插画 */}
        <div className="flex h-full w-1/2 items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <Image
            src="/banners/Startup.svg"
            alt="A illustration of startup"
            width={500}
            height={500}
            priority={true}
          />
        </div>
      </section>
    </main>
  )
}
