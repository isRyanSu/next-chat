'use server'

import { z } from 'zod'

import { ForgotPasswordSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { generateResetPasswordToken } from '@/utils/token'
import { sendResetPasswordEmail } from '@/utils/email'

export async function forgotPassword(
  values: z.infer<typeof ForgotPasswordSchema>,
) {
  const validatedFields = ForgotPasswordSchema.safeParse(values)

  // 如果表单验证失败
  if (!validatedFields.success) {
    return { error: 'Invalid email!' }
  }

  const { email } = validatedFields.data

  // 获取用户（通过邮箱查询）
  const existingUser = await getUserByEmail(email)

  // 如果用户不存在
  if (!existingUser) {
    return { error: 'Email not found!' }
  }

  // 生成重置密码验证码
  const resetPasswordToken = await generateResetPasswordToken(email)

  // 发送重置密码邮件
  await sendResetPasswordEmail(
    resetPasswordToken.email,
    resetPasswordToken.token,
  )

  return { success: 'Reset email sent!' }
}
