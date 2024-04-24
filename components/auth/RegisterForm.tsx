'use client'

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

import { RegisterSchema } from '@/schemas'

import { register } from '@/actions/register'

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    startTransition(() => {
      register(values).then((data) => {
        if (data.success) toast.success(data.success)
        if (data.error) toast.error(data.error)
      })
    })
  }

  useEffect(
    function () {
      if (form.formState.errors.password) {
        toast.error(form.formState.errors.password.message)
      }
      if (form.formState.errors.email) {
        toast.error(form.formState.errors.email.message)
      }
      if (form.formState.errors.name) {
        toast.error(form.formState.errors.name.message)
      }
    },
    [form.formState.errors],
  )

  return (
    <div className="mx-auto flex w-96 flex-col gap-5">
      <Header type="register" />
      <OAuth />
      <Separator />
      <div className="flex flex-col gap-4">
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-700 dark:text-zinc-300">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ryan Su"
                        className="bg-zinc-100 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 dark:bg-zinc-800"
                        disabled={isPending}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
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
                  <FormLabel className="text-zinc-700 dark:text-zinc-300">
                    Password
                  </FormLabel>
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
            <Button
              type="submit"
              className="w-full focus-visible:ring-offset-0"
            >
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              <span>Register</span>
            </Button>
          </form>
        </Form>
        <Footer type="register" />
      </div>
    </div>
  )
}
