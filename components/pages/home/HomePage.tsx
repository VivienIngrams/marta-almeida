import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import HomeImageBox from '@/components/shared/HomeImageBox'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data }: HomePageProps) {
  const { title, overview, homeImage, links } = data ?? {}

  return (
    <div
      className="
        mt-16 md:mt-0
        flex flex-col items-center justify-center
        md:w-auto
        min-h-[70vh]
        md:h-[calc(100vh-80px)]
        ]
      "
    >
      <div className="w-full h-full flex flex-col md:flex-1 justify-center">
        {/* Home image */}
        {homeImage && (
          <HomeImageBox
            image={homeImage}
            alt={`Home image`}
            classesWrapper="w-full h-full min-h-[300px] md:flex-1"
          />
        )}
        {/* Overview text below the image */}
        {overview?.text && (
          <div className="mt-2 text-xl 2xl:text-2xl text-black text-right max-w-[80%] ml-auto">
            <CustomPortableText value={overview.text} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
