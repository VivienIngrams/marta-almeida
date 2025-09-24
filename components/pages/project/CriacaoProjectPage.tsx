'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import SingleImage from '@/components/shared/SingleImage'
import { Module } from '@/components/modules'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import type { ProjectPayload, ProjectContent, BilingualBlock } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  language: string
}

export default function CriacaoProjectPage({
  data,
  encodeDataAttribute,
  language,
}: ProjectPageProps) {
  const [showContent, setShowContent] = useState(false)

  if (!data) return null
  const { year, overview, site, title, content, coverImage, bgColor } = data
  const lang = language || 'pt'
console.log(data)
  const imageUrl =
    coverImage &&
    urlForImage(coverImage)?.width(1200).height(500).fit('crop').url()

  const bgStyle =
    bgColor && bgColor.r !== undefined && bgColor.g !== undefined && bgColor.b !== undefined
      ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
      : {}

  return (
    <div className="lg:pl-[20%] lg:pr-8 2xl:pr-24" style={bgStyle}>
      <div className="-mt-2 md:py-6 px-4 lg:max-w-[70%] mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between flex-col lg:flex-row">
          {coverImage && imageUrl && (
            <div className="mt-4 w-full">
              {!showContent ? (
                <div className="w-full overflow-hidden rounded-[3px] max-h-[25vh]">
                  <Image
                    alt={title?.[lang] || 'Cover image'}
                    src={imageUrl}
                    width={1800}
                    height={700}
                    sizes="(min-width: 640px) 60vw, 80vw"
                    className="w-full h-auto object-contain"
                    style={
                      coverImage?.hotspot
                        ? {
                            objectPosition: `${coverImage.hotspot.x * 100}% ${coverImage.hotspot.y * 100}%`,
                          }
                        : undefined
                    }
                  />
                </div>
              ) : (
                <div className="mt-4 w-full">
                  <div className="relative w-full aspect-[16/9] lg:max-w-5xl mx-auto">
                    <SingleImage image={coverImage} classesWrapper="w-full h-full" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Title and Year */}
          <div className="w-full mt-4">
            {title?.[lang] && (
              <div className="my-1 font-bold text-xl lg:text-2xl 2xl:text-3xl">{title[lang]}</div>
            )}
            {year && <div className="text-base lg:text-lg 2xl:text-xl">{year}</div>}
          </div>
        </div>

        {/* Overview and Content */}
        <div className="font-sans">
          {!showContent && content && content.length > 0 && (
            <div className="text-right">
              <button
                className="mb-4 px-3 lg:px-6 py-1 lg:py-2 bg-black hover:bg-gray-700 rounded-[2px] text-sm lg:text-base lg:font-semibold transition"
                style={
                  bgColor &&
                  bgColor.r !== undefined &&
                  bgColor.g !== undefined &&
                  bgColor.b !== undefined
                    ? { color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
                    : {}
                }
                onClick={() => setShowContent(true)}
              >
                {lang === 'en' ? 'Read more...' : 'Ler mais...'}
              </button>
            </div>
          )}

          {showContent && (
            <div className="py-8 font-light text-sm lg:text-base 2xl:text-lg lg:max-w-5xl mx-auto">
              {/* Overview */}
              {overview?.[lang] && <CustomPortableText value={overview[lang] as any} />}

              {/* Content blocks */}
              {content?.map((block, index) => {
                // Handle TextBlock
                if (block._type === 'textBlock' && block.description) {
                  return (
                    <Module
                      key={block._key || index}
                      content={{
                        ...block,
                        description: block.description[lang] || [],
                      }}
                      paragraphClasses=""
                    />
                  )
                }

                // Handle Single Image or Two Images
                if (block._type === 'singleImage' || block._type === 'twoImages') {
                  return (
                    <Module
                      key={block._key || index}
                      content={{
                        ...block,
                        caption:
                          typeof block.caption === 'object'
                            ? block.caption[lang] || ''
                            : block.caption || '',
                      }}
                      paragraphClasses=""
                    />
                  )
                }

                // Handle Single Video or Two Videos
                if (block._type === 'singleVideo' || block._type === 'twoVideos') {
                  return (
                    <Module
                      key={block._key || index}
                      content={{
                        ...block,
                        caption:
                          typeof block.caption === 'object'
                            ? block.caption[lang] || ''
                            : block.caption || '',
                      }}
                      paragraphClasses=""
                    />
                  )
                }

                // Fallback
                return <Module key={block._key || index} content={block} paragraphClasses="" />
              })}

              {/* External site */}
              {site?.url && (
                <div className="mt-6 text-center">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-secondary"
                  >
                    {site.urltitle || site.url}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

