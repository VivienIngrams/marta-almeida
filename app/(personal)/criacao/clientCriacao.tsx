'use client'

import { useState } from 'react'
import { useEffect } from 'react'

import { ProjectPreviewCriacao } from '@/components/pages/project/ProjectPreview'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'

interface Project {
  slug: string
  initial: any
  bgColor?: { r: number; g: number; b: number }
}

export default function ClientCriacaoPage({
  title,
  projects,
  language,
  bgColor,
}: {
  title: string
  projects: Project[]
  language: string
  bgColor?: { r: number; g: number; b: number }
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
const { setBackgroundColor } = useBackgroundColor()

useEffect(() => {
  if (bgColor) {
    const rgb = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
    setBackgroundColor(rgb)
  }
}, [bgColor, setBackgroundColor])

  // Sort projects so that the active project comes first
  const sortedProjects = activeSlug
    ? [
        ...projects.filter((p) => p.slug === activeSlug),
        ...projects.filter((p) => p.slug !== activeSlug),
      ]
    : projects

  return (
  
      <div className="lg:pl-[20%] lg:pr-8 xl:pr-12 2xl:pr-24  pb-16 pt-24 lg:pt-16 min-h-screen">
        <div className="px-4 mb-8 lg:mb-16 2xl:mb-32">
          <h1 className="hidden lg:block text-center uppercase text-4xl xl:text-5xl 2xl:text-6xl font-light tracking-tight">
            {title}
          </h1>
        </div>

        {/* Projects Grid */}
       <div
  className={` min-h-[90vh]
    grid gap-8 max-w-[1800px] mx-auto px-4
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
  `}
  style={
    activeSlug
      ? { gridTemplateColumns: '1fr', transition: 'grid-template-columns 0.5s ease' }
      : { transition: 'grid-template-columns 0.5s ease' }
  }
>

          {sortedProjects.map((project) => {
            const isExpanded = activeSlug === project.slug

            return (
              <div
                key={project.slug}
                style={{
                  gridColumn: isExpanded ? '1 / -1' : 'auto',
                  transform: 'scale(1)',
                  transition: 'all 0.5s ease',
                  opacity: 1, // all fully opaque
                }}
              >
                <ProjectPreviewCriacao
                  params={{ slug: project.slug }}
                  initial={project.initial}
                  language={language}
                  onToggle={(open) => setActiveSlug(open ? project.slug : null)}
                  isActive={isExpanded}
                />
              </div>
            )
          })}
        </div>
      </div>

  )
}
