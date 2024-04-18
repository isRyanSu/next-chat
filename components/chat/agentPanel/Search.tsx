'use client'

import { useEffect, useRef, useState } from 'react'

import { Search as Icon } from 'lucide-react'
import debounce from 'lodash/debounce'

import { Input } from '@/components/ui/input'

import useChatStore from '@/stores/useChatStore'

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const setSearchTerm = useChatStore((state) => state.setSearchTerm)

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
    <section className="p-3">
      <div className="relative flex items-center">
        <Icon className="absolute left-4 size-4 text-zinc-500" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search agents and conversations..."
          className="h-11 pl-10 text-sm text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={handleInputChange}
        />
      </div>
    </section>
  )
}
