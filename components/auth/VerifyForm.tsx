'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { CircleLoader } from 'react-spinners'

import { Button } from '@/components/ui/button'

import { verify } from '@/actions/verify'

export default function VerifyForm() {
  const [success, setSuccess] = useState<string | undefined>('')
  const [error, setError] = useState<string | undefined>('')
  const token = useSearchParams().get('token')

  const handleSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!')

      return
    }

    verify(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
      .catch(() => {
        setError('Something went wrong!')
      })
  }, [token])

  useEffect(
    function () {
      handleSubmit()
    },
    [handleSubmit],
  )

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8">
      {!success && !error && (
        <h1 className="animate-pulse text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          Verifying your email...
        </h1>
      )}
      {!success && !error && (
        <CircleLoader
          size={100}
          color="#71717a"
          speedMultiplier={0.8}
          className="animate-pulse"
        />
      )}
      {!success && !error && (
        <p className="text-xs text-zinc-700 dark:text-zinc-300">
          Please wait for a short while.
        </p>
      )}
      {success && (
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          {success}
        </h1>
      )}
      {error && (
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          {error}
        </h1>
      )}
      {(success || error) && (
        <Button variant="default" size="default" asChild>
          <Link href="/auth/login">Back to login</Link>
        </Button>
      )}
    </section>
  )
}
