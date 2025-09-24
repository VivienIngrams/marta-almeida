import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

interface ImageBoxProps {
  leftImage?: { asset?: any; lqip?: any }
  rightImage?: { asset?: any; lqip?: any }
  alt?: string
  width?: number
  height?: number
  sizes?: string
  classesWrapper?: string
  caption?: string | { pt?: string; en?: string }
  previewLeftImageUrl?: any
  previewRightImageUrl?: any
}

// Helper function to safely get caption text
const getSafeCaption = (caption: string | { pt?: string; en?: string } | undefined): string => {
  if (!caption) return ''
  if (typeof caption === 'string') return caption
  if (typeof caption === 'object' && caption !== null) {
    return caption.pt || caption.en || ''
  }
  return ''
}

export default function ImageBox({
  leftImage,
  rightImage,
  alt = 'Project image',
  width = 3500,
  height = 2000,
  sizes = '(min-width: 768px) 50vw, 100vw',
  classesWrapper,
  caption,
  previewLeftImageUrl = leftImage?.lqip,
  previewRightImageUrl = rightImage?.lqip,
}: ImageBoxProps) {
  const leftImageUrl =
    leftImage &&
    urlForImage(leftImage)?.url()

  const rightImageUrl =
    rightImage &&
    urlForImage(rightImage)?.url()

  const safeCaption = getSafeCaption(caption)

  return (
    <div className="py-4 lg:py-8">
      <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
        <div
          className={`w-full ${classesWrapper}`}
        >
          {leftImageUrl && (
            <Image
              alt={alt}
              className='rounded-[3px]'
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={width}
              height={height}
              sizes={sizes}
              src={leftImageUrl}
              placeholder="blur"
              blurDataURL={previewLeftImageUrl}
            />
          )}
        </div>
        <div
          className={`w-full ${classesWrapper}`}
        >
          {rightImageUrl && (
            <Image
              alt={alt}
              className='rounded-[3px]'
              style={{
                width: '100%',
                height: 'auto',
              }}
              width={width}
              height={height}
              sizes={sizes}
              src={rightImageUrl}
              placeholder="blur"
              blurDataURL={previewRightImageUrl}
            />
          )}
        </div>
      </div>
      {safeCaption && (
        <div className="text-sm lg:text-base text-center">{safeCaption}</div>
      )}
    </div>
  )
}