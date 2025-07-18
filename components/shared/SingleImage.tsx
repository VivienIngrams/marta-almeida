import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

interface ImageBoxProps {
  image?: { asset?: any; lqip?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  caption?: string
  previewImageUrl?: any
}

export default function ImageBox({
  image,
  alt = 'Cover image',
  width = 2500,
  height = 1000,
  size = '(min-width: 640px) 60vw, 80vw',
  classesWrapper,
  caption,
  previewImageUrl = image?.lqip,
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url()

  return (
   <div className="mt-5 lg:mt-10">
  <div
    className={`h-full w-full max-w-screen mx-auto overflow-hidden rounded-[3px] bg-black/50 ${classesWrapper}`}
  >
    {imageUrl && (
      <Image
        alt={alt}
        sizes={size}
        style={{
          width: '100%',
          height: 'auto',
        }}
        width={width}
        height={height}
        src={imageUrl}
        // placeholder="blur"
        // blurDataURL={previewImageUrl}
      />
    )}
  </div>
  {caption && (
    <div className="mt-2 lg:mt-4 text-lg lg:text-2xl text-center">{caption}</div>
  )}
</div>

  )
}
