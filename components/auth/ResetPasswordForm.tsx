'use client'

import { useRouter, useSearchParams } from 'next/navigation'

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

import { ResetPasswordSchema } from '@/schemas'

import { resetPassword } from '@/actions/resetPassword'
import wait from '@/utils/wait'

export default function ResetPasswordForm() {
  const router = useRouter()
  const token = useSearchParams().get('token') as string
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof ResetPasswordSchema>) {
    startTransition(() => {
      resetPassword(values, token).then((data) => {
        if (data?.success) {
          toast.success(data.success)

          wait(2000).then(() => router.push('/auth/login'))
        }
        if (data?.error) toast.error(data.error)
      })
    })
  }

  useEffect(
    function () {
      if (form.formState.errors.password) {
        toast.error(form.formState.errors.password.message)
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
                    className="bg-zinc-100 focus-visible:ring-zinc-700 focus-visible:ring-offset-0 dark:bg-zinc-800"
                    placeholder="········"
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full focus-visible:ring-offset-0">
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            <span>Save New Password</span>
          </Button>
        </form>
      </Form>
      <Footer type="reset-password" />
    </div>
  )
}
