'use client'

import { useEffect, useRef, useState } from 'react'

import { Search as Icon } from 'lucide-react'
import debounce from 'lodash/debounce'

import { Input } from '@/components/ui/input'

import useExploreStore from '@/stores/useExploreStore'

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const setSearchTerm = useExploreStore((state) => state.setSearchTerm)

  const debouncedSetSearchTerm = debounce((term: string) => {
    setSearchTerm(term)
  }, 1000)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value.toLowerCase())
  }

  useEffect(() => {
    debouncedSetSearchTerm(inputValue)

    return () => debouncedSetSearchTerm.cancel()
  }, [inputValue, debouncedSetSearchTerm])

  return (
    <div className="relative my-4 flex w-full items-center">
      <Icon className="absolute left-3 size-4 text-zinc-500" />
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search agent name, description or keywords..."
        className="h-10 w-full rounded-md bg-zinc-50 pl-10 text-sm text-zinc-700 dark:text-zinc-300"
        onChange={handleInputChange}
      />
    </div>
  )
}
