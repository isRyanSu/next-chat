'use server'

import { AuthError } from 'next-auth'
import { z } from 'zod'

import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/utils/token'
import { sendVerificationEmail } from '@/utils/email'

export async function login(values: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(values)

  // 如果表单验证失败
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedFields.data

  // 获取用户（通过邮箱查询）
  const existingUser = await getUserByEmail(email)

  // 如果用户不存在/用户邮箱不存在/用户密码未设置
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Invalid credentials!' }
  }

  // 如果邮箱未验证
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email,
    )

    // 发送验证邮件
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return { success: 'Verification email sent!' }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })

    return { success: 'Successed!' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
