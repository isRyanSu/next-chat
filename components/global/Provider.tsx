'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

import { ClerkProvider } from '@clerk/nextjs'

function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <ClerkProvider
        appearance={{
          elements: {
            card: 'shadow-none bg-zinc-50 dark:bg-zinc-900',
            headerTitle: 'text-zinc-900 dark:text-zinc-100',
            headerSubtitle: 'text-zinc-700 dark:text-zinc-300',
            headerBackIcon: 'text-zinc-700 dark:text-zinc-300',
            headerBackLink:
              'text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-500',
            socialButtonsBlockButton:
              'text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900',
            dividerLine: 'bg-zinc-500',
            dividerText: 'text-zinc-500',
            formHeaderTitle: 'text-zinc-700 dark:text-zinc-300',
            formHeaderSubtitle: 'text-zinc-500',
            formFieldLabel: 'text-zinc-700 dark:text-zinc-300',
            formFieldInput:
              'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
            formFieldAction: 'text-zinc-700 dark:text-zinc-300',
            formFieldInputShowPasswordButton:
              'text-zinc-700 dark:text-zinc-300',
            formFieldInfoText: 'text-zinc-700 dark:text-zinc-300',
            formFieldSuccessText: 'text-zinc-700 dark:text-zinc-300',
            formButtonPrimary:
              'bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900',
            otpCodeField: 'text-zinc-900 dark:text-zinc-100',
            otpCodeFieldInput:
              'text-zinc-900 border-zinc-300 focus:border-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:focus:border-zinc-100',
            formResendCodeLink:
              'text-zinc-700 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-500',
            footerActionText: 'text-zinc-500',
            footerActionLink:
              'text-zinc-700 hover:text-zinc-500 dark:text-zinc-300 dark:hover:text-zinc-500',
            identityPreviewText: 'text-zinc-900 dark:text-zinc-100',
            alternativeMethodsBlockButton:
              'text-zinc-900 border border-zinc-300 dark:text-zinc-100 dark:border-zinc-700',
          },
          variables: {
            colorPrimary: '#18181b',
            colorDanger: '#ef4444',
            colorSuccess: '#22c55e',
            colorWarning: '#f97316',
            colorAlphaShade: '#18181b',
            colorTextOnPrimaryBackground: '#fafafa',
            colorTextSecondary: '#3f3f46',
            colorBackground: '#fafafa',
            colorInputText: '#18181b',
            colorInputBackground: '#f4f4f5',
          },
        }}
        localization={{
          signIn: {
            start: {
              title: 'Welcome back',
              subtitle: 'Sign in to your account',
              actionText: "Don't have an account?",
              actionLink: 'Sign up now',
            },
          },
          signUp: {
            start: {
              title: 'Get started',
              subtitle: 'Create a new account',
              actionText: 'Have an account?',
              actionLink: 'Sign in now',
            },
          },
        }}
      >
        {children}
      </ClerkProvider>
    </ThemeProvider>
  )
}
