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
  width = 1800,
  height = 700,
  size = '(min-width: 640px) 60vw, 80vw',
  classesWrapper,
  caption,
  previewImageUrl = image?.lqip,
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url()

  return (
    <div className="mt-5 lg:mt-10">
  <div
    className={`w-full max-w-screen mx-auto overflow-hidden rounded-[3px] ${classesWrapper} max-h-[90vh]`}
  >
    {imageUrl && (
      <Image
        alt={alt}
        sizes={size}
        width={width}
        height={height}
        src={imageUrl}
        className="w-full h-auto max-h-[90vh] object-contain"
      />
    )}
  </div>
  {caption && (
    <div className="mt-2 lg:mt-4 text-lg lg:text-2xl text-center">
      {caption}
    </div>
  )}
</div>

  )
}
