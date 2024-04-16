'use client'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import useExploreStore from '@/stores/useExploreStore'

export function Tag({ tag }: { tag: string }) {
  const selectedTag = useExploreStore((state) => state.selectedTag)
  const setSelectedTag = useExploreStore((state) => state.setSelectedTag)

  const isSelected = tag === selectedTag

  return (
    <Button
      variant="outline"
      className={cn(
        'flex h-7 min-w-12 items-center justify-center rounded-full px-3 py-1 text-sm font-normal capitalize transition-all duration-300',
        isSelected
          ? 'bg-zinc-900 text-zinc-100 hover:bg-zinc-900 hover:text-zinc-100'
          : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900',
      )}
      onClick={() => setSelectedTag(isSelected ? '' : tag)}
    >
      {tag}
    </Button>
  )
}
