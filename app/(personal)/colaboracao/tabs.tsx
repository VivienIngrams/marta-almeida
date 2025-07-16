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

  return (
    <section>
      <div className="py-16 md:pt-24">
        <div className="px-4 md:pr-8 2xl:pr-24 ">
          <h1 className="text-right text-5xl md:text-6xl 2xl:text-8xl font-light tracking-tight">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-4 text-right text-lg md:text-xl 2xl:text-2xl ml-auto md:max-w-[80%] cursor-pointer">
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
        {/* Tab Menu */}
        <div className="md:px-96 xl:px-[400px] 2xl:px-[500px] flex flex-wrap  gap-4 md:gap-8 my-12">
          {CATEGORIES.map((cat) => {
            return (
              <button
                key={cat.key}
                className={`p-2 md:p-4 inline-block w-fit m-auto text-xs md:text-xl 2xl:text-2xl tracking-wider rounded-sm font-light uppercase transition border border-black
                  ${
                    activeCategory === cat.key
                      ? 'underline underline-offset-1 md:underline-offset-2 decoration-1 md:decoration-2 font-normal scale-110'
                      : 'hover:bg-gray-800/20'
                  }
                `}
                
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
        {/* Projects by Category */}
        <div>
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
