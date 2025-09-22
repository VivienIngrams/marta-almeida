'use client'

import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/utils'

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

  const imageUrl = coverImage && urlForImage(coverImage)?.url()
  const caption = coverImage?.caption

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
      className=""
      style={
        bgColor
          ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
          : {}
      }
    >
      <div className="-mt-2 md:py-6  px-4 lg:max-w-[50%] mx-auto ">
        <div className="flex flex-wrap justify-between flex-col lg:flex-row ">
          {coverImage && (
            <div className="mt-4 w-full">
              
                <div
                  className={`w-full max-w-screen mx-auto overflow-hidden rounded-[3px] max-h-[90vh]`}
                >
                  {imageUrl && (
                    <Image
                      alt={
                        typeof coverImage.caption === 'string'
                          ? coverImage.caption
                          : ''
                      }
                      sizes="(min-width: 640px) 60vw, 80vw"
                      width="1200"
                      height="500"
                      src={imageUrl}
                      className="w-full h-auto max-h-[25vh] object-cover"
                    />
                  )}
                </div>
                {typeof coverImage.caption === 'string' && (
                  <div className="text-sm lg:text-base text-center">
                    {coverImage.caption}
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
        <div className="font-sans text-right">
          {!showContent && content && content.length > 0 && (
            <button
              className="mb-4 px-3 lg:px-6 py-1 lg:py-2 bg-black hover:bg-gray-700 rounded-[2px] text-base lg:font-semibold transition"
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
          )}
          {showContent && (
            <div className=" font-light text-sm lg:text-base 2xl:text-lg lg:max-w-5xl mx-auto">
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
