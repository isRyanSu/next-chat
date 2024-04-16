import { type NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

import { type ExploreAgent } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const exploreAgents: ExploreAgent[] = await prisma.exploreAgent.findMany()

    if (exploreAgents.length === 0) {
      return NextResponse.json(
        { error: 'No ExploreAgent found!' },
        {
          status: 404,
        },
      )
    }

    return NextResponse.json(exploreAgents, {
      status: 200,
    })
  } catch (error) {
    console.error('Failed to fetch ExploreAgents: ', error)

    return NextResponse.json(
      { error: 'Internal Server Error!' },
      {
        status: 500,
      },
    )
  }
}
