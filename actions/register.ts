'use server'

import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/lib/prisma'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/utils/token'
import { sendVerificationEmail } from '@/utils/email'

export async function register(values: z.infer<typeof RegisterSchema>) {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = await bcryptjs.hash(password, 10)
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already in use!' }
  }

  await prisma.$transaction(async (prisma) => {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const newChatAgent = await prisma.chatAgent.create({
      data: {
        id: uuidv4(),
        identifier: 'default-agent',
        avatar: 'exploding-head',
        title: 'Just Chat',
        description:
          'Activate the brain cluster and spark creative thinking. Your virtual agent is here to communicate with you about everything.',
        tags: [],
        systemRole: 'You are a helpful assistant.',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: newUser.id,
      },
    })

    const newMessage = await prisma.message.create({
      data: {
        id: uuidv4(),
        role: 'system',
        content: newChatAgent.systemRole,
        createdAt: new Date(),
        chatAgentId: newChatAgent.id,
      },
    })
  })

  // 生成验证码
  const verificationToken = await generateVerificationToken(email)

  // 发送验证邮件
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  return { success: 'Verification email sent!' }
}
