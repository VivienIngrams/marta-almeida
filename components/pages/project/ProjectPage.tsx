'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { useState } from 'react'

import { Module } from '@/components/modules'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import SingleImage from '@/components/shared/SingleImage'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  language?: string
}

export function ProjectPage({
  data,
  encodeDataAttribute,
  language,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { year, overview, site, title, content, coverImage, bgColor } =
    data ?? {}

  const [showContent, setShowContent] = useState(false)

  // Use the language prop, fallback to 'pt'
  const lang = language || 'pt'

  // Compute background color style
  const bgStyle =
    bgColor &&
    bgColor.r !== undefined &&
    bgColor.g !== undefined &&
    bgColor.b !== undefined
      ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
      : {}

  return (
    <div className="" style={bgStyle}>
      <div className="py-6 px-4 lg:max-w-[50%] mx-auto ">
        <div className="flex flex-wrap justify-between flex-col lg:flex-row ">
          <div className="w-full lg:mx-16">
            {/* Year */}
            {year && (
              <div className="text-base lg:text-lg 2xl:text-xl">{year}</div>
            )}
            {/* Title (dynamic language) */}
            {title?.[lang] && (
              <div className="my-1 lg:my-3 font-bold text-xl lg:text-2xl 2xl:text-3xl">
                {title[lang]}
              </div>
            )}
          </div>

          {/* Overview (dynamic language) */}
          {overview?.[lang] && (
            <div className="w-full font-sans font-light text-gray-800 text-sm lg:text-base 2xl:text-lg lg:max-w-5xl ">
              <CustomPortableText value={overview[lang]} paragraphClasses="" />
            </div>
          )}

          {/* Cover Image */}
          {coverImage && (
            <div className="mt-4 w-full">
              <div className="relative w-full aspect-[16/9] lg:max-w-5xl mx-auto">
                <SingleImage
                  image={coverImage}
                  classesWrapper="w-full h-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Read more button and content */}
        <div className="font-sans">
          {!showContent && content && content.length > 0 && (
            <button
              className="mt-6 px-3 lg:px-6 py-1 lg:py-2 bg-black hover:bg-gray-700 rounded-[2px] text-base lg:font-semibold transition"
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
          )}
          {showContent && (
            <div>
              {/* Display project content by type */}
              {content?.map((block, key) => {
                // If block has a caption, pick correct language
                if (
                  typeof block === 'object' &&
                  block !== null &&
                  'caption' in block &&
                  typeof (block as any).caption === 'object' &&
                  (block as any).caption?.[lang]
                ) {
                  return (
                    <Module
                      key={key}
                      content={{
                        ...block,
                        caption: (block as any).caption[lang],
                      }}
                      paragraphClasses=" font-light text-sm lg:text-base 2xl:text-lg"
                    />
                  )
                }

                // If block is a textBlock, pick description.[lang]
                if (block._type === 'textBlock') {
                  return (
                    <Module
                      key={key}
                      content={{
                        ...block,
                        description: (block as any).description[lang],
                      }}
                      paragraphClasses=" font-light text-sm lg:text-base 2xl:text-lg"
                    />
                  )
                }

                // fallback
                return (
                  <Module
                    key={key}
                    content={block}
                    paragraphClasses=" font-light text-sm lg:text-base 2xl:text-lg"
                  />
                )
              })}

              {/* External site */}
              {site && site.url && (
                <div className="w-full lg:mx-16 mt-4">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base lg:text-lg 2xl:text-xl underline hover:text-gray-600"
                  >
                    {site.urltitle}
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

export default ProjectPage
