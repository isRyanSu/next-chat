import Image from 'next/image'
import Link from 'next/link'

import { Rocket } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Starter() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <Image
        src="/banners/Logo Design.svg"
        alt="A illustration of logo design"
        width={500}
        height={500}
        priority={true}
        className="flex size-[500px]"
      />
      <h1 className="mb-4 text-5xl font-extrabold text-zinc-900 dark:text-zinc-100">
        NextChat Unlock the superpower of your brain
      </h1>
      <p className="mb-8 text-xl text-zinc-700 dark:text-zinc-300">
        Pioneering the new age of thinking and creating. Built for you, the
        Super Individual.
      </p>
      <div className="flex gap-4">
        <Button
          asChild
          variant="outline"
          className="h-12 bg-zinc-50 text-lg font-normal text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild className="h-12 text-lg font-normal text-zinc-100">
          <Link href="/sign-up">
            Start Now <Rocket className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
