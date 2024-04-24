import Link from 'next/link'

export default function Statement() {
  return (
    <footer className="flex h-16 items-center justify-center">
      <p className="text-center text-xs text-zinc-500">
        By continuing, you agree to NextChat&apos;s{' '}
        <Link
          href="#"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="#"
          className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Privacy
          <br />
          Policy
        </Link>
        , and to receive periodic emails with updates.
      </p>
    </footer>
  )
}
