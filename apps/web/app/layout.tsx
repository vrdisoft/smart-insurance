import type { Metadata } from 'next'

import '../styles/globals.css'
import { ClientLayout } from './clientLayout'

export const metadata: Metadata = {
  title: 'Smart Insurance',
  description: 'Smart Insurance',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
