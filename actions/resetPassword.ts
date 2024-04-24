'use server'

import { z } from 'zod'
import bcryptjs from 'bcryptjs'

import { ResetPasswordSchema } from '@/schemas'
import { prisma } from '@/lib/prisma'
import { getUserByEmail } from '@/data/user'
import { getResetPasswordTokenByToken } from '@/data/resetPasswordToken'

export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string,
) {
  // 如果没有验证码
  if (!token) {
    return { error: 'Missing token!' }
  }

  // 验证表单
  const validatedFields = ResetPasswordSchema.safeParse(values)

  // 如果表单验证失败
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { password } = validatedFields.data

  // 获取验证码（通过验证码查询）
  const existingToken = await getResetPasswordTokenByToken(token)

  // 如果不存在验证码
  if (!existingToken) {
    return { error: 'Invalid token!' }
  }

  // 如果验证码已经过期
  if (new Date(existingToken.expires) < new Date()) {
    return { error: 'Token has expired!' }
  }

  // 获取用户（通过邮箱查询）
  const existingUser = await getUserByEmail(existingToken.email)

  // 如果不存在用户
  if (!existingUser) {
    return { error: 'Email does not exist!' }
  }

  // 更新密码
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: await bcryptjs.hash(password, 10) },
  })

  // 删除重置密码验证码
  await prisma.resetPasswordToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Password successfully updated!' }
}
