'use client'
import React, { useState, useEffect } from 'react'

import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { useBackgroundColor } from '@/components/providers/BgColorProvider'
import { HiUserGroup } from 'react-icons/hi'
import { SiBytedance, SiStudyverse } from 'react-icons/si'

const CATEGORIES = [
  { 
    key: 'producao', 
    label: { pt: 'Produção', en: 'Production' },
    icon: SiStudyverse
  },
  { 
    key: 'ensino', 
    label: { pt: 'Ensino', en: 'Teaching' },
    icon: HiUserGroup
  },
  { 
    key: 'outros', 
    label: { pt: 'Assistente Coreográfica', en: 'Choreographic Assistant' },
    icon: SiBytedance
  },
]

export default function ColaboracaoTabs({
  title,
  ensino,
  producao,
  outros,
  bgColor,
  language
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
      <div className="py-16 lg:pt-16">
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
          <h1 className="hidden lg:block text-center uppercase text-3xl xl:text-4xl 2xl:text-5xl font-light tracking-tight">
            {title}
          </h1>
        </div>
        {/* Tab Menu */}
        <div
          style={{
            backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
          }}
          className={`lg:pl-[20%] lg:pr-8 2xl:pr-24   bg-[rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})] lg:py-8`}
        >
          <div className={`${!hasClicked ? 'min-h-[80vh]' : 'pt-12 lg:pt-0'} flex flex-col lg:flex-row justify-center`}>
            <div className={`${!hasClicked ? 'flex flex-col md:flex-row items-center gap-6' : 'flex justify-around gap-4 lg:gap-8 py-6 px-4'}`}>
              {CATEGORIES.map((cat) => {
                const IconComponent = cat.icon
                return (
                  <button
                    key={cat.key}
                    className={` w-fit m-auto tracking-wider rounded-md font-light uppercase transition shadow-md shadow-black flex flex-col items-center gap-3
                      ${!hasClicked 
                        ? `p-6 lg:p-8 2xl:p-12 lg:text-xl 2xl:text-2xl shadow-lg shadow-black/30 mt-8 md:mt-20 xl:mt-32 mx-4 xl:mx-8 
                            hover:shadow-xl hover:shadow-black/40 
                           bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5
                           transform hover:scale-105 duration-300` 
                        : 'p-2 lg:p-3 text-xs lg:text-lg 2xl:text-xl sticky top-24'
                      }
                      ${
                        activeCategory === cat.key
                          ? 'underline underline-offset-1 lg:underline-offset-[3px] decoration-1 pb-3 lg:decoration-2 lg:text-xl 2xl:text-2xl font-normal scale-110'
                          : !hasClicked ? 'hover:scale-105' : 'hover:bg-gray-800/10'
                      }
                    `}
                    onClick={() => {
                      setActiveCategory(cat.key)
                      setHasClicked(true)
                    }}
                  >
                    {!hasClicked && (
                      <div className="text-4xl lg:text-5xl 2xl:text-6xl">
                        <IconComponent />
                      </div>
                    )}
                    {cat.label[language] || cat.label.pt}
                  </button>
                )
              })}
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
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}