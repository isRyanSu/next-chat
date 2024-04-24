'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'sonner'

import Header from '@/components/auth/Header'
import OAuth from '@/components/auth/OAuth'
import Separator from '@/components/auth/Separator'
import Footer from '@/components/auth/Footer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

import { zodResolver } from '@hookform/resolvers/zod'

import { LoginSchema } from '@/schemas'

import { login } from '@/actions/login'

export default function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) toast.error(data.error)
      })
    })
  }

  useEffect(
    function () {
      if (urlError) {
        toast.error(urlError)
      }
      if (form.formState.errors.password) {
        toast.error(form.formState.errors.password.message)
      }
      if (form.formState.errors.email) {
        toast.error(form.formState.errors.email.message)
      }
    },
    [form.formState.errors, urlError],
  )

  return (
    <div className="mx-auto flex w-96 flex-col gap-5">
      <Header type="login" />
      <OAuth />
      <Separator />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-700 dark:text-zinc-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    className="bg-zinc-100 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 dark:bg-zinc-800"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="text-zinc-700 dark:text-zinc-300">
                    Password
                  </FormLabel>
                  <Link
                    href="/auth/forgot-password"
                    className="inline-block text-sm text-zinc-700 hover:text-zinc-500 focus-visible:underline focus-visible:outline-none dark:text-zinc-300 dark:hover:text-zinc-500"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="········"
                    className="bg-zinc-100 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 dark:bg-zinc-800"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full focus-visible:ring-offset-0">
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>Login</span>
          </Button>
        </form>
      </Form>
      <Footer type="login" />
    </div>
  )
}
