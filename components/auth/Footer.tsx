import Link from 'next/link'

interface FooterProps {
  type: 'login' | 'register' | 'forgot-password' | 'reset-password'
}

export default function Footer({ type }: FooterProps) {
  let title
  let link
  let text

  switch (type) {
    case 'login':
      title = "Don't have an account?"
      link = '/auth/register'
      text = 'Register now'
      break
    case 'register':
      title = 'Have an account?'
      link = '/auth/login'
      text = 'Log in now'
      break
    case 'forgot-password':
      title = 'Remember the password?'
      link = '/auth/login'
      text = 'Back to login'
      break
    case 'reset-password':
      title = 'Remember the password?'
      link = '/auth/login'
      text = 'Back to login'
      break
    default:
      break
  }

  return (
    <div className="mt-4 text-center text-sm text-zinc-500">
      {title}{' '}
      <Link
        href={link!}
        className="text-zinc-700 underline hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-500"
      >
        {text}
      </Link>
    </div>
  )
}
