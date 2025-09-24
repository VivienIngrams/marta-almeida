'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import HomeImageBox from '@/components/shared/HomeImageBox'
import type { HomePagePayload } from '@/types'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'
import { useEffect, useState } from 'react'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  language: string
}

export function HomePage({ data, language }: HomePageProps) {
  const { overview, homeImage, homeMobileImage, bgColor } = data ?? {}

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
  
  const overviewText =
    overview?.[language] || overview?.en || overview?.pt

  return (
    <section
     className='min-h-screen h-screen'
      style={{
        backgroundColor: bgColor
          ? `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
          : undefined,
      }}
    >
      <div className="pb-10  lg:px-6  lg:pr-8 py-10  px-4 lg:pl-80 2xl:pl-96">
      <div
        className="
        flex flex-col items-center justify-center
        lg:w-auto
        min-h-[90vh]
        lg:h-[calc(100vh-80px)]
        
      "
      >
        <Link href="/bio" className="w-full h-full flex flex-col lg:flex-1 justify-center">
          {/* Home image for desktop/tablet */}
            {homeImage && (
              <div className="hidden lg:block w-full h-full">
                <HomeImageBox
                  image={homeImage}
                  alt="Home image"
                  classesWrapper="w-full h-full min-h-[80vh] md:flex-1 cursor-pointer"
                />
              </div>
            )}
            {/* Home image for mobile */}
            {homeMobileImage && (
              <div className="block lg:hidden w-full h-full">
                <HomeImageBox
                  image={homeMobileImage}
                  alt="Home mobile image"
                  classesWrapper="w-full h-[60vh] cursor-pointer"
                />
              </div>
            )}
            {/* Overview text below the image */}
            {overviewText && (
              <div className="mt-2 text-base md:text-xl 2xl:text-2xl text-black text-right max-w-[80%] ml-auto cursor-pointer">
                <CustomPortableText value={overviewText} />
              </div>
            )}
          </Link>
        </div>
      </div>
      
    </section>
  )
}

export default HomePage
