import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  id: string
  name: string
  email: string
  emailVerified: Date
  password: string
  avatar: string

  createdAt: Date
  updatedAt: Date
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
  }
}
