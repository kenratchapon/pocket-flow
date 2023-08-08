import './globals.css'
import type { Metadata } from 'next'
import { Kanit } from 'next/font/google'

const font = Kanit({
  subsets: ['thai'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Pocket Flow',
  description: 'Money management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
