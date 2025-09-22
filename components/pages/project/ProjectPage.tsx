'use client'

import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import { useState } from 'react'

import { Module } from '@/components/modules'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import SingleImage from '@/components/shared/SingleImage'
import type { ProjectPayload } from '@/types'
import type { MoreProjectsPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  moreProjects: MoreProjectsPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function ProjectPage({
  data,
  moreProjects,
  encodeDataAttribute,
}: ProjectPageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { year, overview, site, title, content, slug, coverImage, bgColor } =
    data ?? {}

  // Get a list of showcased projects
  const { showcaseProjects = [] } = moreProjects ?? {}

  // Get previous and next project
  const projects = showcaseProjects
  const currentProjectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )
  const prevProject = projects[currentProjectIndex - 1] || null
  const nextProject = projects[currentProjectIndex + 1] || null

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
      <div className="py-6  px-4 lg:max-w-[50%] mx-auto ">
        <div className="flex flex-wrap justify-between flex-col lg:flex-row ">
          <div className="w-full lg:mx-16">
            {/* Year */}
            {year && (
              <div className="text-base lg:text-lg 2xl:text-xl">{year}</div>
            )}
            {/* Title */}
            {title && (
              <div className="my-1 lg:my-3  font-bold text-xl lg:text-2xl 2xl:text-3xl">
                {title}
              </div>
            )}
          </div>

          {/* Overview */}
          {overview && (
            <div className="w-full font-sans font-light text-gray-800 text-sm lg:text-base 2xl:text-lg lg:max-w-5xl ">
              <CustomPortableText value={overview} paragraphClasses="" />
            </div>
          )}
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
              Read more...
            </button>
          )}
          {showContent && (
            <div>
              {/* Display project content by type */}
              {content?.map((content, key) => (
                <Module
                  key={key}
                  content={content}
                  paragraphClasses=" font-light text-sm lg:text-base 2xl:text-lg"
                />
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

export default ProjectPage
