'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import CursorLight from '@/components/CursorLight'

const inter = Inter({ subsets: ['latin'] })
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

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
        <style dangerouslySetInnerHTML={{ __html: `
          .gradient-text {
            font-family: ${bebasNeue.style.fontFamily};
          }
        `}} />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen relative`}>
        {children}
        <CursorLight />
      </body>
    </html>
  )
}
