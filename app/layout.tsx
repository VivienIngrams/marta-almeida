import './globals.css'

import { Oswald } from 'next/font/google'

import { loadSettings } from '@/sanity/loader/loadQuery'

const
  oswald = Oswald({
    subsets: ['latin'],
    weight: [ '200', '300', '400', '500', '700'],
  })  
  
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get custom colors for bg and text from Sanity settings page, fallback to white and black if not set
  const [{ data: settings }] = await Promise.all([
    loadSettings(),
  ])
  const rgbaBgColor = `${settings?.bgColor?.r || 255}, ${settings?.bgColor?.g || 255}, ${settings?.bgColor?.b || 255}`
  const rgbaTextColor = `${settings?.textColor?.r || 0}, ${settings?.textColor?.g || 0}, ${settings?.textColor?.b || 0}`

  return (
    <html
      lang="en"
      // Assign custom color css variables for Tailwind to use as Tailwind variables
      style={{ ['--color-primary' as any]: rgbaBgColor, ['--color-secondary' as any]: rgbaTextColor }}
      className={`bg-primary ${oswald.className}`}

    >
      <body>{children}</body>
    </html>
  )
}
