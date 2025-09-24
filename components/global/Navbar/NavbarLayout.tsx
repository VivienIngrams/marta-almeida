'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'


import Footer from '@/components/global/Footer'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'
import type { SettingsPayload } from '@/types'

import { useLanguage } from '../../context/LanguageProvider'
import LanguageSwitcher from '../../context/LanguageSwitcher'

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  language: string
}

const MENU_ITEMS = [
  {
    href: '/bio',
    label: { pt: 'Bio', en: 'About' },
  },
  {
    href: '/criacao',
    label: { pt: 'Criação', en: 'Creations' },
  },
  {
    href: '/interpretacao',
    label: { pt: 'Interpretação', en: 'Performing' },
  },
  {
    href: '/colaboracao',
    label: { pt: 'Colaboração', en: 'Collaborations' },
  },
]

export default function Navbar(props: NavbarProps) {
  const title = props.title ?? ''
  const language = props.language || 'pt'
  const pathname = usePathname()
  const { backgroundColor } = useBackgroundColor()

  return (
    <div style={{ backgroundColor }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[25%] lg:flex lg:flex-col lg:justify-between lg:items-start p-4 lg:px-12 z-50">
        <div className="w-full flex flex-col mt-32">
          <Link
            href={`/`}
            className="mb-12 text-xl lg:text-3xl 2xl:text-4xl uppercase tracking-tighter font-extrabold hover:text-secondary"
          >
            {title}
          </Link>
        </div>
        <div className="flex flex-col gap-4 uppercase text-lg tracking-wider font-light h-full w-full">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all duration-200 ${
                pathname === item.href ? 'underline underline-offset-4' : ''
              }`}
            >
              {item.label[language] || item.label.pt}
            </Link>
          ))}
        </div>
      </div>

      {/* LanguageSwitcher - Desktop (top right) */}
      <div className="hidden lg:block fixed top-2 right-2 z-[100]">
        <LanguageSwitcher />
      </div>

      {/* Mobile Navbar - Title and horizontal menu */}
      <div
        className="flex flex-col lg:hidden px-4 py-4 z-50 fixed top-0 left-0 right-0"
        style={{ backgroundColor }}
      >
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl uppercase font-extrabold tracking-tighter hover:text-secondary mb-2"
            style={{ minWidth: 'fit-content' }}
          >
            {title}
          </Link>
        </div>
        <nav className="w-full mt-2">
          <div className="flex gap-3 justify-between items-center uppercase text-base tracking-wider font-light">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 ${
                  pathname === item.href
                    ? 'underline underline-offset-4 font-bold text-lg tracking-tighter'
                    : ''
                }`}
              >
                {item.label[language] || item.label.pt}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Footer */}
      <div
        className="block lg:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ backgroundColor }}
      >
        {/* LanguageSwitcher - Mobile (bottom right) */}
        <div className=" fixed bottom-2 right-4 z-[100]">
          <LanguageSwitcher />
        </div>
        <Footer />
      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block fixed bottom-0 left-0 z-50">
        <Footer />
      </div>
    </div>
  )
}
