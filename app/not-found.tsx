import Image from 'next/image'
import Link from 'next/link'

import Header from '@/components/global/Header'
import { Button } from '@/components/ui/button'

export default function NotFound() {
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
          Not Found
        </h1>
        <p className="animate-pulse text-xl italic text-zinc-700 dark:text-zinc-300">
          --- Could not find requested resource ---
        </p>
        <Button value="default" size="default" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </section>
    </main>
  )
}
