import Image from 'next/image'
import Link from 'next/link'

import { HeaderLinks } from '@/components/shared/HeaderLinks'
import { resolveHref, urlForLogo } from '@/sanity/lib/utils'
import type { LinkItem, PageItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
  title: string | null
  logo: any | null
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const title = props.title ?? ''

  const menuItems = data?.menuItems ?? {}
  const menuPages = menuItems?.page || ([] as PageItem[])
  const menuLinks = menuItems?.link || ([] as LinkItem[])

  const customLogo = props?.logo
  const logoImageUrl = customLogo && urlForLogo(customLogo)?.url()

  return (
    <div className="fixed top-0 left-0 h-screen w-56 flex flex-col justify-between items-startpx-4 py-6 z-50">
      <div className="w-full flex flex-col items-center mb-8">
        {customLogo ? (
          <Link
            href={`/`}
            className="mb-6"
          >
            <div className="flex h-12 w-full justify-center">
              <Image
                alt={title}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: 'auto', height: 'auto', maxHeight: 48 }}
                src={logoImageUrl}
              />
            </div>
          </Link>
        ) : (
          <Link
            href={`/`}
            className="mb-6 text-2xl font-bold hover:text-secondary"
          >
            {title}
          </Link>
        )}
      </div>
      <div className="flex flex-col gap-3 w-full">
        {menuPages &&
          menuPages.map((menuItem, key) => {
            const href = resolveHref(menuItem?._type, menuItem?.slug)
            if (!href) {
              return null
            }
            return (
              <HeaderLinks
                key={key}
                href={href}
                title={menuItem.title}
        
              />
            )
          })}

        {menuLinks &&
          menuLinks.map((menuItem, key) => {
            return (
              <Link
                key={key}
                target="_blank"
                className="w-full text-left text-lg px-3 py-2 text-secondary border-secondary border rounded hover:text-primary hover:bg-secondary md:text-xl"
                href={menuItem.url!}
              >
                ↗ {menuItem.title}
              </Link>
            )
          })}
      </div>
    </div>
  )
}
