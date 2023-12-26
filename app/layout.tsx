import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] });
const customClassName = `${inter.className} bg-[#1d1c1c]`;

export const metadata: Metadata = {
  title: 'POTA.AI',
  description: 'All Tools in One Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
  <link rel="icon" href="/logo.svg" sizes="any" />
      <html lang="en">
        <body className={customClassName}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
