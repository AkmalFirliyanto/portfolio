import './globals.css'
import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import CursorLight from '@/components/CursorLight'

const inter = Inter({ subsets: ['latin'] })
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas-neue'
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
    <html lang="en" className={`dark ${bebasNeue.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" sizes="180x180" />
      </head>
      <body className={`${inter.className} bg-black text-white min-h-screen relative`}>
        <CursorLight />
        {children}
      </body>
    </html>
  )
}