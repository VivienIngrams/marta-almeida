"use client"
import type { EncodeDataAttributeCallback } from "@sanity/react-loader"

import { CustomPortableText } from "@/components/shared/CustomPortableText"
import HomeImageBox from "@/components/shared/HomeImageBox"
import type { HomePagePayload } from "@/types"

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data }: HomePageProps) {
  const { overview, homeMobileImage, bio } = data ?? {}
 


  return (
    <div className="min-h-screen px-4 py-16 lg:px-6 lg:py-8 lg:pl-72 xl:pl-80 2xl:pl-96">
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)] lg:gap-2">
        {/* Image Column - 45% width on desktop */}
        <div className="w-full lg:w-[45%] mb-8 lg:mb-0">
          {homeMobileImage && (
            <div className="h-[60vh] lg:h-[calc(100vh-4rem)]">
              <HomeImageBox
                image={homeMobileImage}
                alt="Home image"
                classesWrapper="w-full h-full cursor-pointer rounded-sm overflow-hidden shadow-lg"
              
              />
            </div>
          )}
        </div>

        {/* Bio Column - Remaining width */}
        <div className="flex-1 flex flex-col justify-center lg:pl-8">
          {bio?.text && (
            <div className="text-sm lg:text-base 2xl:text-lg font-light text-gray-800 leading-relaxed">
              <CustomPortableText value={bio.text} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
