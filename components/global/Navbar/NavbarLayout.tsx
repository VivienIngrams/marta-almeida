import Image from 'next/image'
import Link from 'next/link'

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

  return (
    <div className="fixed top-0 left-0 h-screen w-56 flex flex-col justify-between items-startpx-4 p-6 z-50">
      <div className="w-full flex flex-col  mb-8">
        <Link
          href={`/`}
          className="mb-6 text-2xl font-bold hover:text-secondary"
        >
          {title}
        </Link>
      </div>
      <div className="flex flex-col gap-3 h-full w-full">
        <Link href="/interpretacao">Interpretação</Link>
        <Link href="/criacao">Criação</Link>
        <Link href="/colaboracao">Colaboração</Link>
      </div>
    </div>
  )
}
