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
  // Default to an empty object to allow previews on non-existent documents
  const { title, overview, homeImage, links } = data ?? {}

  return (
    <div className="h-full mt-12 md:mt-0 grid gap-5 max-h-screen">
      <div className="w-full p-0">
        {/* Home image */}
        {homeImage && (
          <HomeImageBox
            image={homeImage}
            alt={`Home image`}
            classesWrapper="w-full h-[60vw] max-h-[90vh] min-h-[300px]"
          />
        )}
        {/* Overview text below the image */}
        {overview?.text && (
          <div className="mt-2 text-xl   text-black text-right max-w-[80%] ml-auto">
            <CustomPortableText value={overview.text} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
