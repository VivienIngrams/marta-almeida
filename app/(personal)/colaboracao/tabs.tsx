'use client'
import React, { useState } from 'react'
import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

const CATEGORIES = [
  { key: 'ensino', label: 'Ensino' },
  { key: 'producao', label: 'Produção' },
  { key: 'outros', label: 'Assistente Coreográfica' },
]

export default function ColaboracaoTabs({
  title,
  overview,
  ensino,
  producao,
  outros,
  bgColor,
}: any) {
  const [activeCategory, setActiveCategory] = useState('ensino')

  let projectsToShow = ensino
  if (activeCategory === 'producao') projectsToShow = producao
  if (activeCategory === 'outros') projectsToShow = outros
console.log('color' ,bgColor )
  return (
    <section>
      <div className="pb-16 pt-28 lg:pt-16">
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
          <h1 className="hidden lg:block text-center uppercase text-3xl lg:text-5xl 2xl:text-7xl  font-light tracking-tight">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-4 text-center text-lg lg:text-xl 2xl:text-2xl  cursor-pointer">
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
        {/* Tab Menu */}
        <div                 style={{ backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }}
 className={`lg:pl-[20%] lg:pr-8 2xl:pr-24 border-black border-b-2 lg:border-none sticky top-24 lg:top-0 bg-[rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})] pt-10`}>
        <div className="flex justify-center">
        <div className="flex flex-wrap justify-around  gap-4 lg:gap-8">
          {CATEGORIES.map((cat) => {
            return (
              <button
                key={cat.key}
                style={{ color: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }}
                className={`p-2 lg:p-3 inline-block bg-black w-fit m-auto text-xs lg:text-lg 2xl:text-xl tracking-wider rounded-sm font-light uppercase transition border border-black
                  ${
                    activeCategory === cat.key
                      ? 'underline underline-offset-1 lg:underline-offset-[3px] decoration-1 pb-3 lg:decoration-[3px] lg:text-xl 2xl:text-2xl font-normal scale-110'
                      : 'hover:bg-gray-800/70'
                  }
                `}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            )
          })}
          </div>
        </div>
        </div>
        {/* Projects by Category */}
        <div className='border-black border-2 lg:border-none'>
          {projectsToShow.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No projects in this category.
            </div>
          )}
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
