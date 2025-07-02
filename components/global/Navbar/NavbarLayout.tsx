'use client'

import Link from 'next/link'
import { useState } from 'react'

import Footer from '@/components/global/Footer'
import { HeaderLinks } from '@/components/shared/HeaderLinks'
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const title = props.title ?? ''
  const customLogo = props?.logo
  const logoImageUrl = customLogo && urlForLogo(customLogo)?.url()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed bg-[#BEDBEA] md:top-0 md:left-0 md:h-screen md:w-80 xl:w-96 md:flex md:flex-col md:justify-between md:items-start p-4 md:px-12 z-50 ">
        <div className="w-full flex flex-col mt-24 2xl:mt-40">
          <Link
            href={`/`}
            className="mb-12 text-2xl md:text-4xl 2xl:text-5xl uppercase tracking-tighter font-extrabold hover:text-secondary"
          >
            {title}
          </Link>
        </div>
        <div className="flex flex-col gap-3 uppercase text-xl tracking-wider  font-light h-full w-full">
          <Link href="/interpretacao">Interpretação</Link>
          <Link href="/criacao">Criação</Link>
          <Link href="/colaboracao">Colaboração</Link>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden items-center backdrop-blur justify-between px-4 py-4 z-50 fixed top-0 left-0 right-0">
        <Link
          href="/"
          className="text-xl uppercase font-extrabold tracking-tighter hover:text-secondary"
        >
          {title}
        </Link>
        <button
          className="focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
              }
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed top-12 left-0 w-full backdrop-blur shadow-lg z-40">
          <div className="flex flex-col gap-4 p-4 uppercase text-base tracking-wider text-gray-700 font-light">
            <Link href="/interpretacao" onClick={() => setMobileOpen(false)}>
              Interpretação
            </Link>
            <Link href="/criacao" onClick={() => setMobileOpen(false)}>
              Criação
            </Link>
            <Link href="/colaboracao" onClick={() => setMobileOpen(false)}>
              Colaboração
            </Link>
          </div>
          <div className="">
            <Footer />
          </div>
        </div>
      )}
      <div className="block md:hidden backdrop-blur fixed bottom-0 left-0 right-0   z-50">
        <Footer />
      </div>
      <div className="hidden md:block fixed bottom-0 left-0 z-50">
            <Footer />
          </div>
    </>
  )
}
