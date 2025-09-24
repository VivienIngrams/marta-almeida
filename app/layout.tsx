import './globals.css'

import { Oswald } from 'next/font/google'
import { LanguageProvider } from '../components/context/LanguageProvider'
import { loadSettings } from '@/sanity/loader/loadQuery'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get custom colors for bg and text from Sanity settings page, fallback to white and black if not set
  const [{ data: settings }] = await Promise.all([loadSettings()])

  return (
    <html
      lang="en"
      // Assign custom color css variables for Tailwind to use as Tailwind variables
      className={`bg-primary ${oswald.className}`}
    >
      <LanguageProvider>
        <body>{children}</body>
      </LanguageProvider>
    </html>
  )
}
