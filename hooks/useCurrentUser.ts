import { useSession } from 'next-auth/react'

export function useCurrentUser() {
  const session = useSession()

  if (!session || !session.data) return null

  const user = session.data.user

  return user
}
