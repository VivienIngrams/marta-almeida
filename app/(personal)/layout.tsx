
import type React from "react"
import "@/styles/index.css"
import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import { draftMode } from "next/headers"
import { toPlainText } from "next-sanity"
import { Suspense } from "react"
import { Navbar } from "@/components/global/Navbar"
import { BackgroundColorProvider } from "@/components/providers/BgColorProvider"
import { urlForImage, urlForOpenGraphImage } from "@/sanity/lib/utils"
import { loadHomePage, loadSettings } from "@/sanity/loader/loadQuery"


const LiveVisualEditing = dynamic(() => import("@/sanity/loader/LiveVisualEditing"))

export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([loadSettings(), loadHomePage()])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  const favIcon = urlForImage(settings?.favIcon)?.height(512).width(512).fit("crop").url()
  const appleIcon = urlForImage(settings?.favIcon)?.height(180).width(180).fit("crop").url()

  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || "Personal website",
        }
      : undefined,
    description: homePage?.overview?.text ? toPlainText(homePage.overview.text) : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
    icons: {
      icon: favIcon ? [favIcon] : [],
      apple: appleIcon ? [appleIcon] : [],
    },
  }
}

export async function viewport(): Promise<Viewport> {
  const [{ data: settings }] = await Promise.all([loadSettings()])
  const rgbaBgColor = `${settings?.bgColor?.r || 255}, ${settings?.bgColor?.g || 255}, ${settings?.bgColor?.b || 255}`

  return {
    themeColor: `rgb(` + rgbaBgColor + `)`,
  }
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <BackgroundColorProvider>
      <div className="flex min-h-screen flex-col text-secondary">
        <Suspense>
          <Navbar />
        </Suspense>
        <div className="flex-grow">
          <Suspense>{children}</Suspense>
        </div>
      </div>
      {(await draftMode()).isEnabled && <LiveVisualEditing />}
    </BackgroundColorProvider>
  )
}
