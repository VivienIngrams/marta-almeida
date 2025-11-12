'use client'

import { useEffect } from 'react'
import Image from 'next/image'

import { useBackgroundColor } from '@/components/providers/BgColorProvider'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { urlForImage } from '@/sanity/lib/utils'

interface BioClientProps {
  title?: string
  image?: any
  bio?: any
  bgColor: { r: number; g: number; b: number }
}

export default function ClientBio({
  title,
  bio,
  bgColor,
  image,
}: BioClientProps) {
  const { setBackgroundColor } = useBackgroundColor()

  useEffect(() => {
    if (
      bgColor &&
      bgColor.r !== undefined &&
      bgColor.g !== undefined &&
      bgColor.b !== undefined
    ) {
      const rgb = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
      setBackgroundColor(rgb)
    }
  }, [bgColor, setBackgroundColor])

  const imageUrl = image ? urlForImage(image)?.fit('max').url() : undefined
  const aspectRatio = image?.asset?.metadata?.dimensions?.aspectRatio ?? 1 // width / height
  const objectPosition = image?.hotspot
    ? `${Number(image.hotspot.x) * 100}% ${Number(image.hotspot.y) * 100}%`
    : 'center'

  return (
    <section
      className="min-h-screen pb-16 pt-28 lg:pt-16"
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
      <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
        <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl font-light tracking-tight">
          {title}
        </h1>
        {/* Biography Section */}
        <div className="lg:px-[12vw]">
          {bio && (
            <div className="lg:py-12 text-base 2xl:text-lg font-sans font-light text-gray-800">
              <div className="relative">
                {/* Responsive aspect-ratio wrapper to preserve image proportions */}
                {imageUrl && (
                 <div
  className="float-left relative w-[120px] md:w-[220px] xl:w-[300px]"
  style={{ aspectRatio }} // use numeric aspect ratio from Sanity
>
  <Image
    src={imageUrl}
    alt={title || 'Biography image'}
    fill
    className="object-contain"
  />
</div>

                )}

                <CustomPortableText value={bio} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
