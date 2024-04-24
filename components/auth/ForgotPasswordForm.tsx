'use client'

import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { z } from 'zod'
import { toast } from 'sonner'

import Header from '@/components/auth/Header'
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

import { ForgotPasswordSchema } from '@/schemas'

import { forgotPassword } from '@/actions/forgotPassword'

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
    startTransition(() => {
      forgotPassword(values).then((data) => {
        if (data.success) toast.success(data.success)
        if (data.error) toast.error(data.error)
      })
    })
  }

  useEffect(
    function () {
      if (form.formState.errors.email) {
        toast.error(form.formState.errors.email.message)
      }
    },
    [form.formState.errors],
  )

  return (
    <div className="mx-auto flex w-96 flex-col gap-5">
      <Header type="forgot-password" />
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
          <Button type="submit" className="w-full focus-visible:ring-offset-0">
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>Send Reset Email</span>
          </Button>
        </form>
      </Form>
      <Footer type="forgot-password" />
    </div>
  )
}
