import { Resend } from 'resend'

import VerificationEmail from '@/components/emails/VerificationEmail'
import ResetPasswordEmail from '@/components/emails/ResetPasswordEmail'

const resend = new Resend(process.env.RESEND_API_KEY)

// 发送验证邮件
export async function sendVerificationEmail(email: string, token: string) {
  const link = `http://localhost:3000/auth/verify?token=${token}`

  await resend.emails.send({
    from: 'NextChat Support <nextchat@isryansu.me>',
    to: email,
    subject: 'Verify your email',
    react: VerificationEmail({ link }),
  })
}

// 发送重置密码邮件
export async function sendResetPasswordEmail(email: string, token: string) {
  const link = `http://localhost:3000/auth/reset-password?token=${token}`

  await resend.emails.send({
    from: 'NextChat Support <nextchat@isryansu.me>',
    to: email,
    subject: 'Reset your password',
    react: ResetPasswordEmail({ email, link }),
  })
}
