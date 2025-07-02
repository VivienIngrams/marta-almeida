import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

interface ImageBoxProps {
  image?: { asset?: any; lqip?: any }
  alt?: string
  width?: number
  height?: number
  size?: string
  classesWrapper?: string
  previewImageUrl?: any
  children?: React.ReactNode
  onClick?: () => void // <-- Add this line
}

export default function ImageBox({
  image,
  alt = 'Home image',
  width = 3500,
  height = 2000,
  size = '(min-width: 940px) 100vw, 100vw',
  classesWrapper,
  previewImageUrl = image?.lqip,
  children,
  onClick, // <-- Add this line
}: ImageBoxProps) {
  const imageUrl = image && urlForImage(image)?.url();

  return (
    <div
      className={`relative w-full h-full overflow-hidden rounded-none ${classesWrapper || ''}`}
      style={{ maxWidth: '100%' }}
      onClick={onClick} // <-- Add this line
    >
      {imageUrl && (
        <Image
          alt={alt}
          fill
          style={{
            objectFit: 'cover',
          }}
          sizes={size}
          src={imageUrl}
          placeholder="blur"
          blurDataURL={previewImageUrl}
        />
      )}
      {children}
    </div>
  );
}
