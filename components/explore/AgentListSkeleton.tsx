import { Skeleton } from '@/components/ui/skeleton'

export function AgentListSkeleton() {
  return (
    <div className="my-4 flex w-full flex-col gap-8">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm">
          {/* Avatar */}
          <Skeleton className="flex size-14 rounded-full" />
          {/* Title */}
          <Skeleton className="h-6 w-1/3" />
          {/* Description */}
          <Skeleton className="mb-4 h-5 w-3/4" />
          {/* Tags */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm">
          {/* Avatar */}
          <Skeleton className="flex size-14 rounded-full" />
          {/* Title */}
          <Skeleton className="h-6 w-1/3" />
          {/* Description */}
          <Skeleton className="mb-4 h-5 w-3/4" />
          {/* Tags */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm">
          {/* Avatar */}
          <Skeleton className="flex size-14 rounded-full" />
          {/* Title */}
          <Skeleton className="h-6 w-1/3" />
          {/* Description */}
          <Skeleton className="mb-4 h-5 w-3/4" />
          {/* Tags */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  )
}
