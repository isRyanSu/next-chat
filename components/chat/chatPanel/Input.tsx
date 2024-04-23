'use client'

import { useState } from 'react'

import { type ChatRequestOptions } from 'ai'
import {
  Brain,
  Image as Img,
  Thermometer,
  Eraser,
  Loader2,
  Mic,
  Blocks,
  CornerDownLeft,
  Command,
} from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import useChatStore from '@/stores/useChatStore'

import { cn } from '@/lib/utils'

import { type Model } from '@/types/model'

export function Input({
  input,
  setInput,
  handleInputChange,
  handleSubmit,
  isLoading,
}: {
  input: string
  setInput: React.Dispatch<React.SetStateAction<string>>
  handleInputChange: (e: any) => void
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions,
  ) => void
  isLoading: boolean
}) {
  const [open, setopen] = useState(false)
  const model = useChatStore((state) => state.model)
  const temperature = useChatStore((state) => state.temperature)
  const setModel = useChatStore((state) => state.setModel)
  const setTemperature = useChatStore((state) => state.setTemperature)

  return (
    <form
      className=" absolute bottom-0 flex h-56 w-full flex-none flex-col gap-2 border-t border-zinc-200 bg-zinc-100 px-2 pt-2 dark:border-zinc-800 dark:bg-zinc-950"
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) handleSubmit(e)
      }}
    >
      <Textarea
        value={input}
        placeholder="Type your message here..."
        className="flex-1 resize-none overflow-y-scroll bg-zinc-100 p-4 scrollbar-hide focus-visible:ring-0 focus-visible:ring-offset-0"
        onChange={handleInputChange}
      />
      <div className="mb-2 flex h-12 shrink-0 items-center justify-between">
        <div className="flex h-10 items-center gap-1 text-zinc-700">
          <Select
            value={model}
            onOpenChange={(open) => {
              setopen(open)
            }}
            onValueChange={(value) => setModel(value as Model)}
            defaultValue="gpt-3.5-turbo"
          >
            <SelectTrigger
              className={cn(
                'group flex size-10 items-center justify-start gap-[10px] truncate border-0 bg-transparent px-[10px] transition-all duration-300 ease-in-out hover:w-40 hover:bg-zinc-100 hover:text-zinc-900 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                open && 'w-40',
              )}
            >
              <Brain className="size-5 flex-none dark:text-zinc-300" />
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="button" variant="ghost" size="icon">
            <Img className="size-5 dark:text-zinc-300" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="group flex size-10 items-center justify-start gap-[10px] truncate border-0 bg-transparent px-[10px] transition-all duration-300 ease-in-out hover:w-56 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Thermometer className="size-5 flex-none dark:text-zinc-300" />
            <Slider
              defaultValue={[1]}
              min={0}
              max={2}
              step={0.1}
              disabled={isLoading}
              className="w-36 flex-none"
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p>{temperature}</p>
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Mic className="size-5 dark:text-zinc-300" />
          </Button>
          <Button type="button" variant="ghost" size="icon">
            <Blocks className="size-5 dark:text-zinc-300" />
          </Button>
          <Separator
            orientation="vertical"
            className="h-1/2 text-zinc-200 dark:text-zinc-700"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setInput('')}
          >
            <Eraser className="size-5 dark:text-zinc-300" />
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-row items-center gap-1 text-xs text-zinc-500">
            <CornerDownLeft className="size-3" /> Send /
            <Command className="size-3" />
            <CornerDownLeft className="size-3" />
            New Line
          </div>
          <Button
            type="submit"
            variant="default"
            className="h-10 bg-zinc-900 px-8 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </div>
      </div>
    </form>
  )
}
