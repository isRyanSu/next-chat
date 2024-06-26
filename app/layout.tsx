import { type Metadata } from 'next'
import { Roboto_Mono } from 'next/font/google'

import Provider from '@/components/global/Provider'
import Sidebar from '@/components/global/Sidebar'

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
    <html lang="en" suppressHydrationWarning>
      <body className={`flex h-full w-full ${roboto_mono.variable}`}>
        <Provider>
          <Sidebar />
          {children}
        </Provider>
      </body>
    </html>
  )
}
