import Link from 'next/link'

export function Statement() {
  return (
    <footer className="flex h-16 items-center justify-center">
      <p className="text-center text-xs text-zinc-500">
        By continuing, you agree to NextChat&apos;s{' '}
        <Link
          href="#"
          className="underline hover:text-zinc-700 focus-visible:outline-none"
        >
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link
          href="#"
          className="underline hover:text-zinc-700 focus-visible:outline-none"
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
