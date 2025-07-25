"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Footer from "@/components/global/Footer"
import { urlForLogo } from "@/sanity/lib/utils"
import type { SettingsPayload } from "@/types"
import { BackgroundColorProvider } from "@/components/providers/BgColorProvider"
import { useBackgroundColor } from "@/components/providers/BgColorProvider"

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
}

export default function Navbar(props: NavbarProps) {

  const title = props.title ?? ""
 
  
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
          <Link
            href="/interpretacao"
            className={`transition-all duration-200 ${
              pathname === "/interpretacao" ? "underline underline-offset-4" : ""
            }`}
          >
            Interpretação
          </Link>
          <Link
            href="/criacao"
            className={`transition-all duration-200 ${pathname === "/criacao" ? "underline underline-offset-4" : ""}`}
          >
            Criação
          </Link>
          <Link
            href="/colaboracao"
            className={`transition-all duration-200 ${
              pathname === "/colaboracao" ? "underline underline-offset-4" : ""
            }`}
          >
            Colaboração
          </Link>
        </div>
      </div>

      {/* Mobile Navbar - Title and horizontal menu */}
      <div
        className="flex flex-col lg:hidden px-4 py-4 z-50 fixed top-0 left-0 right-0"
style={{ backgroundColor }}      >
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl uppercase font-extrabold tracking-tighter hover:text-secondary mb-2"
            style={{ minWidth: "fit-content" }}
          >
            {title}
          </Link>
        </div>
        <nav className="w-full mt-2">
          <div className="flex gap-6 justify-between items-center uppercase text-base tracking-wider font-light">
            <Link
              href="/interpretacao"
              className={`transition-all duration-200 ${pathname === "/interpretacao" ? "underline underline-offset-4" : ""}`}
            >
              Interpretação
            </Link>
            <Link
              href="/criacao"
              className={`transition-all duration-200 ${pathname === "/criacao" ? "underline underline-offset-4" : ""}`}
            >
              Criação
            </Link>
            <Link
              href="/colaboracao"
              className={`transition-all duration-200 ${pathname === "/colaboracao" ? "underline underline-offset-4" : ""}`}
            >
              Colaboração
            </Link>
          </div>
        </nav>
      </div>

      {/* Mobile Footer */}
      <div
        className="block lg:hidden fixed bottom-0 left-0 right-0 z-50"
style={{ backgroundColor }}      >
        <Footer />
      </div>

      {/* Desktop Footer */}
      <div className="hidden lg:block fixed bottom-0 left-0 z-50">
        <Footer />
      </div>
    </div>
  )
}
