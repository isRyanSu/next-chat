interface HeaderProps {
  type: 'login' | 'register' | 'forgot-password' | 'reset-password'
}

export default function Header({ type }: HeaderProps) {
  let title
  let text

  switch (type) {
    case 'login':
      title = 'Welcome back'
      text = 'Log in to your account'
      break
    case 'register':
      title = 'Get started'
      text = 'Create a new account'
      break
    case 'forgot-password':
      title = 'Reset Your Password'
      text =
        "Type in your email and we'll send you a link to reset your password"
      break
    case 'reset-password':
      title = 'Reset Your Password'
      text =
        'Type in a new secure password and press save to update your password'
      break
    default:
      break
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        {title}
      </h1>
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  )
}
