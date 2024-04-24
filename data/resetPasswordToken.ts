import { prisma } from '@/lib/prisma'

// 获取重置密码验证码（通过邮箱查询）
export async function getResetPasswordTokenByEmail(email: string) {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findFirst({
      where: {
        email,
      },
    })

    return resetPasswordToken
  } catch {
    return null
  }
}

// 获取重置密码验证码（通过验证码查询）
export async function getResetPasswordTokenByToken(token: string) {
  try {
    const resetPasswordToken = await prisma.resetPasswordToken.findUnique({
      where: {
        token,
      },
    })

    return resetPasswordToken
  } catch {
    return null
  }
}
