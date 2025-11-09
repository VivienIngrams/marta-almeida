'use client'

import { useEffect, useState } from 'react'
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
}: {
  title: string
  projects: Project[]
  language: string
}) {
  const [bgStyle, setBgStyle] = useState({})
  const { setBackgroundColor } = useBackgroundColor()
  const [activeSlug, setActiveSlug] = useState<string | null>(null)

  useEffect(() => {
    const firstBgColor = projects[0]?.bgColor
    if (firstBgColor) {
      const rgb = `rgb(${firstBgColor.r}, ${firstBgColor.g}, ${firstBgColor.b})`
      setBgStyle({ backgroundColor: rgb })
      setBackgroundColor(rgb)
    }
  }, [projects, setBackgroundColor])

  return (
    <section>
      <div style={bgStyle} className=" lg:pl-[20%] pb-16 pt-28 lg:pt-16 min-h-screen">
        <div className=" px-4 lg:pr-8 2xl:pr-24 mb-8">
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
          {projects.map((project) => {
            const isExpanded = activeSlug === project.slug
            const isOtherExpanded = activeSlug && activeSlug !== project.slug

            return (
              <div
                key={project.slug}
                style={{
                  gridColumn: isExpanded ? '1 / -1' : 'auto',
                  opacity: isOtherExpanded ? 0.4 : 1,
                  transform: isOtherExpanded ? 'scale(0.95)' : 'scale(1)',
                  transition: 'all 0.5s ease',
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