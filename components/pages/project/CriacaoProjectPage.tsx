'use client'

import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'
import SingleImage from '@/components/shared/SingleImage'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { useState } from 'react'

import { Module } from '@/components/modules'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

import type { ProjectPayload } from '@/types'
import type { MoreProjectsPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  moreProjects: MoreProjectsPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function CriacaoProjectPage({
  data,
  moreProjects,
  encodeDataAttribute,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { year, overview, site, title, content, slug, coverImage, bgColor } =
    data ?? {}

  // Use the Sanity image builder with crop/hotspot support
  const imageUrl =
    coverImage &&
    urlForImage(coverImage)?.width(1200).height(500).fit('crop').url()

  const [showContent, setShowContent] = useState(false)

  // Compute background color style
  const bgStyle =
    bgColor &&
    bgColor.r !== undefined &&
    bgColor.g !== undefined &&
    bgColor.b !== undefined
      ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
      : {}

  return (
    <div
      className="lg:pl-[20%] lg:pr-8 2xl:pr-24"
      style={
        bgColor
          ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
          : {}
      }
    >
      <div className="-mt-2 md:py-6  px-4 lg:max-w-[70%] mx-auto ">
        <div className="flex flex-wrap justify-between flex-col lg:flex-row ">
          {coverImage && imageUrl && (
            <div className="mt-4 w-full">
              {/* Collapsed preview (keeps aspect ratio, cropped to max 25vh) */}
              {!showContent ? (
                <div className="w-full overflow-hidden rounded-[3px] max-h-[25vh]">
                  <Image
                    alt={title || 'Cover image'}
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
                    <SingleImage
                      image={coverImage}
                      classesWrapper="w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="w-full">
            {/* Title */}
            {title && (
              <div className="my-1  font-bold text-xl lg:text-2xl 2xl:text-3xl">
                {title}
              </div>
            )}
            {/* Year */}
            {year && (
              <div className="text-base lg:text-lg 2xl:text-xl">{year}</div>
            )}
          </div>
        </div>

        {/* Read more button and content */}
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
                Read more...
              </button>
            </div>
          )}
          {showContent && (
            <div className="py-4 font-light text-sm lg:text-base 2xl:text-lg lg:max-w-5xl mx-auto">
              {/* Overview */}
              {overview && (
                <div className="text-center">
                  <CustomPortableText value={overview} paragraphClasses="" />
                </div>
              )}
              {/* Display project content by type */}
              {content?.map((content, key) => (
                <Module key={key} content={content} paragraphClasses=" " />
              ))}
              {site && (
                <div className="mt-6 text-center">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-secondary"
                  >
                    {site.urltitle}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Previous and next project links */}
        {/* {projects && <MoreProjects previous={prevProject} next={nextProject} />} */}
      </div>
    </div>
  )
}

export default CriacaoProjectPage
