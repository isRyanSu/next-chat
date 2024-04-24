import { auth } from '@/auth'

export async function currentUser() {
  const session = await auth()

  if (!session) return null

  const user = session.user

  return user
}
