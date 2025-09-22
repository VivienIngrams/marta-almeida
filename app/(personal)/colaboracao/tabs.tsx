'use client'
import React, { useState, useEffect } from 'react'

import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'

const CATEGORIES = [
  { key: 'producao', label: 'Produção' },
  { key: 'ensino', label: 'Ensino' },
  { key: 'outros', label: 'Assistente Coreográfica' },
]

export default function ColaboracaoTabs({
  title,
  ensino,
  producao,
  outros,
  bgColor,
}: any) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [hasClicked, setHasClicked] = useState(false)

  const projectsToShow = React.useMemo(() => {
    if (activeCategory === 'ensino') return ensino
    if (activeCategory === 'producao') return producao
    if (activeCategory === 'outros') return outros
    return []
  }, [activeCategory, ensino, producao, outros])

  const { setBackgroundColor } = useBackgroundColor()

  useEffect(() => {
    if (
      bgColor &&
      bgColor.r !== undefined &&
      bgColor.g !== undefined &&
      bgColor.b !== undefined
    ) {
      const rgb = `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`
      setBackgroundColor(rgb)
    }
  }, [bgColor, setBackgroundColor])

  return (
    <section>
      <div className="pb-16 pt-28 lg:pt-16">
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
          <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl  font-light tracking-tight">
            {title}
          </h1>
        </div>
        {/* Tab Menu */}
        <div
          style={{
            backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
          }}
          className={`lg:pl-[20%] lg:pr-8 2xl:pr-24  sticky top-24 lg:top-0 bg-[rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})] pt-10`}
        >
          <div className="flex justify-center">
                <div className={`${!hasClicked ? 'flex flex-col md:flex-row items-center gap-6' : 'flex flex-wrap justify-around gap-4 lg:gap-8'}`}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  style={{
                    color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
                  }}
                  className={`inline-block  w-fit m-auto tracking-wider rounded-md font-light uppercase transition border border-black
                    ${!hasClicked ? 'p-4 lg:p-6 2xl:p-10  2xl:text-3xl bg-black/50 shadow-md shadow-black/70 mt-8 md:mt-20 mx-4 xl:mx-8 2xl:border-4' : 'p-2 lg:p-3 text-xs lg:text-lg 2xl:text-xl bg-black/60'}
                    ${
                      activeCategory === cat.key
                        ? 'underline underline-offset-1 lg:underline-offset-[3px] decoration-1 pb-3 lg:decoration-[3px] lg:text-xl 2xl:text-2xl font-normal scale-110'
                        : 'hover:bg-gray-800/70'
                    }
                  `}
                  onClick={() => {
                    setActiveCategory(cat.key)
                    setHasClicked(true)
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Projects by Category */}
        <div className="">
          {projectsToShow.map((project: any) => (
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
