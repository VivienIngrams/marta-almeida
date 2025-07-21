
'use client'

import { useEffect, useState } from 'react'
import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'
interface Project {
  slug: string
  initial: any
  bgColor?: { r: number; g: number; b: number }
}

export default function ClientCriacaoPage({
  title,
  overview,
  projects,
}: {
  title: string
  overview: any
  projects: Project[]
}) {
  const [bgStyle, setBgStyle] = useState({})

  useEffect(() => {
    const firstBgColor = projects[0]?.bgColor
    if (
      firstBgColor &&
      firstBgColor.r !== undefined &&
      firstBgColor.g !== undefined &&
      firstBgColor.b !== undefined
    ) {
      setBgStyle({
        backgroundColor: `rgb(${firstBgColor.r}, ${firstBgColor.g}, ${firstBgColor.b})`,
      })
    }
  }, [projects])

    const { setBackgroundColor } = useBackgroundColor()

    useEffect(() => {
    if (
      projects.length > 0 &&
      projects[0].bgColor &&
      projects[0].bgColor.r !== undefined &&
      projects[0].bgColor.g !== undefined &&
      projects[0].bgColor.b !== undefined
    ) {
      const rgb = `rgb(${projects[0].bgColor.r}, ${projects[0].bgColor.g}, ${projects[0].bgColor.b})`
      setBackgroundColor(rgb)
    }   
    }, [projects, setBackgroundColor])

  return (
    <section>
      <div style={bgStyle} className="pb-16 pt-28 lg:pt-16">
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24">
          <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl font-light tracking-tight">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-4 text-center text-lg lg:text-xl 2xl:text-2xl cursor-pointer">
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
        <div>
          {projects.map((project) => (
            <ProjectPreview
              key={project.slug}
              params={{ slug: project.slug }}
              initial={project.initial}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
