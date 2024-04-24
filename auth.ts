import NextAuth from 'next-auth'

import authConfig from '@/auth.config'

import { prisma } from '@/lib/prisma'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { getUserById } from '@/data/user'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // 如果通过 OAuth 登陆
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id as string)

      // 如果邮箱未验证
      if (!existingUser?.emailVerified) {
        return false
      }

      return true
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
})
