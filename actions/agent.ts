'use server'

import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/lib/prisma'

import { auth } from '@clerk/nextjs'

import { type ExploreAgent } from '@prisma/client'

export async function addChatAgentFromExploreAgent(
  exploreAgent: ExploreAgent,
): Promise<{ success?: string; error?: string }> {
  try {
    const { userId } = auth()

    if (!userId) {
      return { error: 'Oops! User not found!' }
    }

    const { identifier, avatar, title, tags, description, systemRole } =
      exploreAgent

    const existingChatAgent = await prisma.chatAgent.findFirst({
      where: { identifier, userId },
    })

    if (existingChatAgent) {
      return {
        error: `Agent "${title}" already exists!`,
      }
    }

    await prisma.chatAgent.create({
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
        userId,
      },
    })

    return { success: `Agent "${title}" added successfully!` }
  } catch (error) {
    return { error: 'Internal Server Error!' }
  }
}
