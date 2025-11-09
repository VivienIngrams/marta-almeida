'use client'

import { useState } from 'react'
import { ProjectPreviewCriacao } from '@/components/pages/project/ProjectPreview'

interface Project {
  slug: string
  initial: any
  bgColor?: { r: number; g: number; b: number }
}

export default function ClientCriacaoPage({
  title,
  projects,
  language,
}: {
  title: string
  projects: Project[]
  language: string
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  // Sort projects so that the active project comes first
  const sortedProjects = activeSlug
    ? [
        ...projects.filter((p) => p.slug === activeSlug),
        ...projects.filter((p) => p.slug !== activeSlug),
      ]
    : projects

  return (
    <section>
      <div className="lg:pl-[20%] pb-16 pt-28 lg:pt-16 min-h-screen">
        <div className="px-4 lg:pr-8 2xl:pr-24 mb-8">
          <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl font-light tracking-tight">
            {title}
          </h1>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: activeSlug
              ? '1fr'
              : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1600px',
            margin: '0 auto',
            padding: '0 1rem',
            transition: 'grid-template-columns 0.5s ease',
          }}
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
    </section>
  )
}
