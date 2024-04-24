import { v4 as uuidv4 } from 'uuid'

import { prisma } from '@/lib/prisma'

import { getVerificationTokenByEmail } from '@/data/verificationToken'

// 生成验证码
export async function generateVerificationToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 600 * 1000)
  const existingVerificationToken = await getVerificationTokenByEmail(email)

  if (existingVerificationToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingVerificationToken.id,
      },
    })
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return verificationToken
}

// 生成重置密码的验证码
export async function generateResetPasswordToken(email: string) {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + 600 * 1000)
  const existingResetPasswordToken = await getVerificationTokenByEmail(email)

  if (existingResetPasswordToken) {
    await prisma.resetPasswordToken.delete({
      where: {
        id: existingResetPasswordToken.id,
      },
    })
  }

  const resetPasswordToken = await prisma.resetPasswordToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return resetPasswordToken
}
