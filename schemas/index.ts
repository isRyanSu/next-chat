import { z } from 'zod'

// 用户登录
export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is a required field.',
  }),
  password: z.string().min(1, {
    message: 'Password is a required field.',
  }),
})

// 用户注册
export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is a required field.',
  }),
  email: z.string().email({
    message: 'Email is a required field.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

// 忘记密码
export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is a required field.',
  }),
})

// 重置密码
export const ResetPasswordSchema = z.object({
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})
