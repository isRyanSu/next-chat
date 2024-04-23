'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useTransition } from 'react'

import Markdown from 'react-markdown'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { addChatAgentFromExploreAgent } from '@/actions/agent'

import { type ExploreAgent } from '@prisma/client'

export default function AgentInfo({ agent }: { agent: ExploreAgent }) {
  return (
    <section className="flex flex-col items-center overflow-y-auto scrollbar-hide">
      <Info agent={agent} />
      <Separator className="w-[618px]" />
      <PromptsAndComments agent={agent} />
    </section>
  )
}

function Info({ agent }: { agent: ExploreAgent }) {
  const [isPending, startTransition] = useTransition()

  const { avatar, title, tags, description, homepage, author, createdAt } =
    agent

  function handleAddAgent() {
    startTransition(() => {
      addChatAgentFromExploreAgent(agent).then((data) => {
        if (data.success) toast.success(data.success)
        if (data.error) toast.error(data.error)
      })
    })
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      {/* Avatar */}
      <div className="flex size-28 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
        <Image
          src={`/emojis/${avatar}.webp`}
          height={80}
          width={80}
          alt={`Emoji of ${avatar}`}
        />
      </div>
      {/* Title */}
      <h1 className="text-center text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      {/* Tags */}
      <div className="flex flex-row flex-wrap justify-center gap-2">
        {tags.map((tag) => {
          return (
            <Badge
              key={`${tag}-${Math.random()}`}
              variant="outline"
              className="h-5 rounded border-none bg-zinc-100 px-2 text-xs font-light capitalize text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
            >
              {tag}
            </Badge>
          )
        })}
      </div>
      {/* Description */}
      <p className="flex-none text-pretty text-center text-sm font-normal text-zinc-700 dark:text-zinc-300">
        {description}
      </p>
      {/* Author */}
      <Link
        href={homepage}
        className="text-xs text-blue-500"
      >{`@${author}`}</Link>
      {/* Actions */}
      <Button
        variant="default"
        className="w-full py-1 text-sm font-normal"
        onClick={handleAddAgent}
      >
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Add Agent
      </Button>
      {/* Created At */}
      <p className="text-center text-xs text-zinc-500">{createdAt}</p>
    </div>
  )
}

function PromptsAndComments({ agent }: { agent: ExploreAgent }) {
  const { systemRole } = agent

  return (
    <Tabs defaultValue="prompts" className="p-4">
      <TabsList className="flex w-full gap-2 bg-transparent dark:bg-transparent">
        <TabsTrigger
          value="prompts"
          className="rounded-md border-b-2 border-transparent transition-all duration-300 hover:bg-zinc-100 data-[state=active]:rounded-b-none data-[state=active]:border-zinc-900 data-[state=active]:shadow-none data-[state=active]:hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:data-[state=active]:border-zinc-100 dark:data-[state=active]:hover:bg-zinc-900"
        >
          Prompts
        </TabsTrigger>
        <TabsTrigger
          value="comments"
          className="rounded-md border-b-2 border-transparent transition-all duration-300 hover:bg-zinc-100 data-[state=active]:rounded-b-none data-[state=active]:border-zinc-900 data-[state=active]:shadow-none data-[state=active]:hover:bg-zinc-100 dark:hover:bg-zinc-900 dark:data-[state=active]:border-zinc-100 dark:data-[state=active]:hover:bg-zinc-900"
        >
          Comments
        </TabsTrigger>
      </TabsList>
      {/* Prompts */}
      <TabsContent value="prompts">
        <Markdown className="prose prose-zinc w-[618px] dark:prose-invert prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg">
          {systemRole}
        </Markdown>
      </TabsContent>
      {/* Comments */}
      <TabsContent value="comments"></TabsContent>
    </Tabs>
  )
}
