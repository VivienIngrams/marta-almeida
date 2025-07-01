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
  const { title, overview, homeImage, links,  } = data ?? {}
console.log('HomePage props ', data)
  return (
    <div className="h-full mt-4 grid gap-5 grid-cols-1 xl:grid-cols-2">
      <div className="w-full">

        {overview?.text && (
          <div className="mt-2 text-2xl md:text-3xl">
            <CustomPortableText value={overview.text} />
          </div>
        )}
        

        <div className="mt-10 flex flex-col">
          {/* Links */}
          {/* {links &&
            links.map((link, key) => {
              return (
                <div key={key} className="flex flex-wrap">
                  <Link
                    target="_blank"
                    className={`flex flex-wrap text-xl text-secondary underline md:text-2xl`}
                    href={link.url!}
                  >
                    {link.title}
                  </Link>
                </div>
              )
            })} */}
        </div>
      </div>

      <div className="w-full">
        {/* Home image */}
        {homeImage && (
          <HomeImageBox
            image={homeImage}
            alt={`Home image`}
            classesWrapper="relative"
          />
        )}
      </div>
    </div>
  )
}

export default HomePage
