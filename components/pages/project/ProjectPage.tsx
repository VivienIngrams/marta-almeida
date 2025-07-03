import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { Module } from '@/components/modules'
import { MoreProjects } from '@/components/pages/project/MoreProjects'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import ImageBox  from '@/components/shared/ImageBox'
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
  const { year, overview, site, title, content, slug, coverImage } = data ?? {}

  // Get a list of showcased projects
  const { showcaseProjects = [] } = moreProjects ?? {}

  // Get previous and next project
  const projects = showcaseProjects
  const currentProjectIndex = projects.findIndex(
    (project) => project.slug === slug,
  )
  const prevProject = projects[currentProjectIndex - 1] || null
  const nextProject = projects[currentProjectIndex + 1] || null

  return (
    <div>
      <div className="mb-10 md:mb-20 space-y-6">
        <div className="flex flex-wrap justify-between flex-col md:flex-row">
          <div className="w-full lg:w-3/4 mx-auto">
            {/* Title */}
            {title && <div className="my-6 text-2xl md:text-4xl 2xl:text-5xl">{title}</div>}
            {/* Year */}
            {year && <div className="md:mt-2 text-lg md:text-2xl 2xl:text-3xl">{year}</div>}
          </div>
          <div className="w-full font-sans font-light text-gray-800">
            {/* Overview */}
            {overview && (
              <div className="mt-4 text-lg md:text-xl 2xl:text-2xl">
                <CustomPortableText value={overview} paragraphClasses=''/>
              </div>
            )}
            {coverImage && (
              <div className="mt-4 w-full">
                <div className="relative w-full aspect-[16/9] max-w-5xl mx-auto">
                  <SingleImage
                    image={coverImage}
                    classesWrapper="w-full h-full"
                    
                  />
                </div>
              </div>             
            )}
           
            {/* Site */}
            {site && (
              <div className="mt-3">
                {site && (
                  <Link
                    target="_blank"
                    className="text-xl break-words md:text-2xl underline"
                    href={site.url}
                  >
                    {site.urltitle}
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>

        <div className=" font-sans">
          {/* Display project content by type */}
          {content?.map((content, key) => (
            <Module key={key} content={content} paragraphClasses=" font-light text-gray-800 text-lg md:text-2xl" />
          ))}
        </div>

        {/* Previous and next project links */}
        {projects && <MoreProjects previous={prevProject} next={nextProject} />}
      </div>
    </div>
  )
}

export default ProjectPage
