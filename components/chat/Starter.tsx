import Image from 'next/image'

import Theme from '@/components/global/Theme'

export function Starter() {
  return (
    <section className="flex h-full w-full flex-col bg-zinc-50 dark:bg-zinc-900">
      <header className="flex h-16 flex-none items-center border-b border-zinc-200 px-3  dark:border-zinc-800">
        <Theme />
      </header>
      <section className="flex flex-1 flex-col items-center justify-center">
        <Image
          src="/banners/Logo Design.svg"
          alt="A illustration of logo design"
          width={500}
          height={500}
          priority={true}
          className="flex size-[500px]"
        />
        <h1 className="mb-4 text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Choose Your Chat Agent and Start Now!
        </h1>
        <p className="mb-8 text-xl text-zinc-700 dark:text-zinc-100">
          Pioneering the new age of thinking and creating. Built for you, the
          Super Individual.
        </p>
      </section>
    </section>
  )
}
