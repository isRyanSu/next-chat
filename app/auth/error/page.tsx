'use client'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import Header from '@/components/global/Header'

export default function ErrorPage() {
  const error = useSearchParams().get('error') || 'error'

  return (
    <main className="flex h-full flex-1 flex-col">
      <Header />
      <section className="flex h-full flex-col items-center justify-center gap-8">
        <Image
          src="/logos/icon-anim.webp"
          alt="Logo of NextChat"
          width={64}
          height={64}
          priority={true}
          className="flex size-16"
          unoptimized
        />
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Oops! Something went wrong!
        </h1>
        <p className="animate-pulse text-xl italic text-zinc-700 dark:text-zinc-300">
          --- {error} ---
        </p>
      </section>
    </main>
  )
}
