'use client'

import { useEffect } from 'react'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

interface BioClientProps {
  title?: string
  bio?: any
  bgColor: { r: number; g: number; b: number }
}

export default function ClientBio({ title, bio, bgColor }: BioClientProps) {
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
        {/* Biography */}
        <div className="lg:px-[15vw] ">
          {bio && (
            <div className="lg:py-12 text-base lg:text-lg 2xl:text-xl font-sans font-light text-gray-800 ">
              <CustomPortableText value={bio} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
