import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params: { chatAgentId } }: { params: { chatAgentId: string } },
) {
  try {
    const chatAgent = await prisma.chatAgent.findFirst({
      where: {
        id: chatAgentId,
      },
      include: {
        messages: true,
      },
    })

    if (!chatAgent) {
      return NextResponse.json(
        { error: 'No ChatAgent found!' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(chatAgent, {
      status: 200,
    })
  } catch (error) {
    console.error('Failed to fetch ChatAgent: ', error)

    return NextResponse.json(
      { error: 'Internal Server Error!' },
      {
        status: 500,
      },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { chatAgentId } }: { params: { chatAgentId: string } },
) {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.message.deleteMany({
        where: {
          chatAgentId,
        },
      })

      await prisma.chatAgent.delete({
        where: {
          id: chatAgentId,
        },
      })
    })

    return NextResponse.json({
      status: 200,
    })
  } catch (error) {
    console.error('Failed to delete ChatAgent: ', error)

    return NextResponse.json(
      { error: 'Internal Server Error!' },
      {
        status: 500,
      },
    )
  }
}
