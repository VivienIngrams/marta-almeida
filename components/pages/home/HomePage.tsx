import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { CustomPortableText } from '@/components/shared/CustomPortableText'
import HomeImageBox from '@/components/shared/HomeImageBox'
import type { HomePagePayload } from '@/types'
import { ChevronDownIcon } from '@sanity/icons'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data }: HomePageProps) {
  const { overview, homeImage, bio } = data ?? {}
  console.log('HomePage data:', bio)
  return (
    <div>
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
      <div className="flex items-center justify-end mt-8">
        <ChevronDownIcon className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors  duration-200" />
      </div>
      {/* Biography */}
      <div>
        {bio?.text && (
          <div className="mt-12 text-base  2xl:text-xl font-sans font-light text-gray-800 max-w-[80%] ">
            <CustomPortableText value={bio.text} />
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
