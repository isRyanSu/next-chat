import { type Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

import { ClerkProvider } from '@clerk/nextjs'

import { Sidebar } from '@/components/global/Sidebar'

import '@/app/globals.css'

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  icons: {
    icon: '/logos/icon.png',
  },
  title: {
    default: 'NextChat',
    template: '%s · NextChat',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex h-full w-full ${roboto_mono.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              card: 'shadow-none',
            },
            variables: {
              colorPrimary: '#18181b',
              colorDanger: '#ef4444',
              colorSuccess: '#22c55e',
              colorWarning: '#f97316',
              colorAlphaShade: '#18181b',
              colorTextOnPrimaryBackground: '#f4f4f5',
              colorTextSecondary: '#3f3f46',
              colorBackground: '#ffffff',
              colorInputText: '#18181b',
              colorInputBackground: '#fafafa',
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
          <Sidebar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
