'use client'

import { ChevronDownIcon } from '@sanity/icons'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { useRef } from 'react'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import HomeImageBox from '@/components/shared/HomeImageBox'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data }: HomePageProps) {
  const { overview, homeImage, homeMobileImage, bio } = data ?? {}
  const bioRef = useRef<HTMLDivElement>(null)
  console.log('HomePage data:', homeMobileImage)
  const handleScrollToBio = () => {
    bioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="pb-10 md:pb-20 md:px-6  md:pr-8 py-10  px-4 md:pl-80 2xl:pl-96">
      <div
        className="
        flex flex-col items-center justify-center
        md:w-auto
        min-h-[80vh]
        md:h-[calc(100vh-80px)]
        ]
      "
      >
        <div className="w-full h-full flex flex-col md:flex-1 justify-center">
          {/* Home image for desktop/tablet */}
          {homeImage && (
            <div className="hidden lg:block w-full h-full">
              <HomeImageBox
                image={homeImage}
                alt="Home image"
                classesWrapper="w-full h-full min-h-[300px] md:flex-1 cursor-pointer"
                onClick={handleScrollToBio}
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
                onClick={handleScrollToBio}
              />
            </div>
          )}
          {/* Overview text below the image */}
          {overview?.text && (
            <div
              className="mt-2 text-lg md:text-xl 2xl:text-2xl text-black text-right max-w-[80%] ml-auto cursor-pointer"
              onClick={handleScrollToBio}
            >
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end ">
        <ChevronDownIcon
          className="-mt-2 w-5 h-5 md:w-10 md:h-10 hover:text-gray-700 transition-colors duration-200 cursor-pointer"
          onClick={handleScrollToBio}
        />
      </div>
      {/* Biography */}
      <div ref={bioRef}>
        {bio?.text && (
          <div className="py-20 text-base 2xl:text-lg font-sans font-light text-gray-800 md:max-w-[80%] ">
            <CustomPortableText value={bio.text} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
