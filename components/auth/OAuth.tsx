import { signIn } from 'next-auth/react'

import { FaGithub, FaGoogle } from 'react-icons/fa'

import { Button } from '@/components/ui/button'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export default function OAuth() {
  function handleOnClick(provider: 'google' | 'github') {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        onClick={() => handleOnClick('google')}
      >
        <FaGoogle className="mr-2 size-5" />
        Continue with Google
      </Button>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full bg-zinc-50 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        onClick={() => handleOnClick('github')}
      >
        <FaGithub className="mr-2 size-5" />
        Continue with GitHub
      </Button>
    </div>
  )
}
