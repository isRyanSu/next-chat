'use server'

import { v4 as uuidv4 } from 'uuid'

import { type ExploreAgent } from '@prisma/client'

import { prisma } from '@/lib/prisma'
import { currentUser } from '@/lib/auth'

export async function addChatAgentFromExploreAgent(
  exploreAgent: ExploreAgent,
): Promise<{ success?: string; error?: string }> {
  try {
    const user = await currentUser()

    if (!user) return { error: "Oops! I didn't find you!" }

    const { identifier, avatar, title, tags, description, systemRole } =
      exploreAgent

    const existingChatAgent = await prisma.chatAgent.findFirst({
      where: { identifier, userId: user.id },
    })

    if (existingChatAgent) {
      return {
        error: `Agent "${title}" already exists!`,
      }
    }

    await prisma.$transaction(async (prisma) => {
      const newChatAgent = await prisma.chatAgent.create({
        data: {
          id: uuidv4(),
          identifier,
          avatar,
          title,
          description,
          tags,
          systemRole,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: user.id,
        },
      })

      const newMessage = await prisma.message.create({
        data: {
          id: uuidv4(),
          role: 'system',
          content: newChatAgent.systemRole,
          createdAt: new Date(),
          chatAgentId: newChatAgent.id,
        },
      })
    })

    return { success: `Agent "${title}" added successfully!` }
  } catch (error) {
    return { error: 'Internal Server Error!' }
  }
}
