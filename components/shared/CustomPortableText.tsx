import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      return <p className={`${paragraphClasses ?? ''} font-sans font-light`}>{children}</p>
    },

    h1: ({ children }) => (
      <h1 className="font-oswald text-2xl font-bold md:text-3xl lg:text-4xl my-4">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="font-oswald my-1 font-semibold text-xl lg:text-2xl 2xl:text-3xl">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="font-oswald my-1 font-normal text-lg lg:text-xl 2xl:text-2xl">
        {children}
      </h3>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <a
        className="underline transition hover:opacity-50"
        href={value?.href}
        rel="noreferrer noopener"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-base md:text-lg 2xl:text-xl">
        {children}
      </strong>
    ),
  },

  types: {
    image: ({ value }) => (
      <div className="my-6 space-y-2">
        <ImageBox
          image={value}
          alt={value.alt}
          classesWrapper="relative aspect-[16/9]"
        />
        {value?.caption && (
          <div className="font-sans text-sm text-gray-600">
            {value.caption}
          </div>
        )}
      </div>
    ),
  },
}


  return <PortableText components={components} value={value} />
}
