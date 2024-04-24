'use server'

import { prisma } from '@/lib/prisma'
import { getUserByEmail } from '@/data/user'
import { getVerificationTokenByToken } from '@/data/verificationToken'

export async function verify(token: string) {
  // 获取数据库中的验证码（通过验证码查询）
  const existingToken = await getVerificationTokenByToken(token)

  // 如果验证码不存在
  if (!existingToken) {
    return { error: 'Token does not exist!' }
  }

  // 如果验证码已过期
  if (new Date(existingToken.expires) < new Date()) {
    return { error: 'Token has expired!' }
  }

  // 获取用户（通过邮箱查询）
  const existingUser = await getUserByEmail(existingToken.email)

  // 如果用户不存在
  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  // 更新用户邮箱验证状态
  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      email: existingToken.email,
      emailVerified: new Date(),
    },
  })

  // 删除验证码
  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Email verified!' }
}
