"use client"

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
    <div className="pb-16 pt-28 lg:pt-16">
      <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
        {/* Biography */}
        <div className='lg:mx-[7vw]'>
          {bio?.text && (
            <div className="lg:py-20 text-base lg:text-lg 2xl:text-xl font-sans font-light text-gray-800 md:max-w-[80%] ">
              <CustomPortableText value={bio.text} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
