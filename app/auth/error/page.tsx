'use client'

import { Suspense } from 'react'

import Error from '@/components/auth/Error'

export default function ErrorPage() {
  return (
    <Suspense>
      <Error />
    </Suspense>
  )
}
