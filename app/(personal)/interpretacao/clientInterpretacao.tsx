// components/pages/project/ClientInterpretacaoPage.tsx
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'

interface Project {
  slug: string
  initial: any
  bgColor?: { r: number; g: number; b: number }
}

interface BgColor {
  r: number
  g: number
  b: number
}

export default function ClientInterpretacaoPage({
  title,
  overview,
  bgColor,
  images,
  projects,
  language,
}: {
  title: string
  overview: any
  bgColor: BgColor
  images: any[]
  projects: Project[]
  language: string
}) {
  const { setBackgroundColor } = useBackgroundColor()

  useEffect(() => {
    const rgb = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
    setBackgroundColor(rgb)
  }, [bgColor, setBackgroundColor])

 
  return (
    <section>
      <div
        style={{
          backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        }}
        className="pb-16 pt-28 lg:pt-16 min-h-screen"
      >
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24">
          <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl font-light tracking-tight">
            {title}
          </h1>
        </div>

        <div>
          {projects.map((project) => (
            <ProjectPreview
              key={project.slug}
              params={{ slug: project.slug }}
              initial={project.initial}
              language={language}
            />
          ))}
        </div>

        {images && images.length > 0 && (
          <div className="w-full py-8 lg:pl-[25%]">
            <div className="px-4 lg:pr-8 lg:pl-0">
              <div className="overflow-x-auto thin-scrollbar">
                <div className="flex gap-4 lg:gap-6 pb-4 snap-x snap-mandatory">
                  {images.map((image, index) => {
                    const imageUrl = image.asset?.url
                    if (!imageUrl) return null

                    const aspectRatio =
                      image.asset?.metadata?.dimensions?.aspectRatio || 1.5

                    return (
                      <div key={index} className="flex-none snap-start">
                        <div
                          className="relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300"
                          style={{
                            width: `${400 * aspectRatio}px`,
                            height: '400px',
                          }}
                        >
                          <Image
                            src={imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            sizes='( min-width: 640px) 50vw, 80vw'
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {image.caption && image.caption[language] && (
                          <p className="mt-2 text-sm text-center text-gray-800 max-w-[24rem]">
                            {image.caption[language]}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
