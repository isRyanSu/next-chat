'use client'

import { Skeleton } from '@/components/ui/skeleton'

export function AgentListSkeleton() {
  return (
    <section className="flex-1 space-y-2 overflow-y-scroll px-3 pb-2 scrollbar-hide">
      {Array.from({ length: 12 }, (_, index) => (
        <div
          key={index}
          className="flex h-[72px] w-full flex-row items-center justify-start gap-2 rounded-lg bg-zinc-50 py-3 pl-2 pr-4"
        >
          <Skeleton className="size-11 rounded-full" />
          <div className="flex w-44 flex-col items-start gap-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="relative flex flex-1 items-center justify-center">
            <Skeleton className="absolute right-0 h-[18.85px] w-[33.22px]" />
          </div>
        </div>
      ))}
    </section>
  )
}
