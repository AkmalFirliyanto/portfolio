import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CursorLight from '@/components/CursorLight'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akmalfy',
  description: 'Portfolio Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen relative`}>
        <CursorLight />
        {children}
      </body>
    </html>
  )
}