import { type Metadata } from 'next'

import Image from 'next/image'

import { Header } from '@/components/global/Header'
import { Statement } from '@/components/global/Statement'

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-full flex-1 flex-col">
      <Header />
      <section className="flex h-full">
        {/* 左侧表单 */}
        <div className="flex h-full w-1/2 flex-col">
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
          <Statement />
        </div>
        {/* 右侧插画 */}
        <div className="flex h-full w-1/2 items-center justify-center bg-zinc-100">
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
