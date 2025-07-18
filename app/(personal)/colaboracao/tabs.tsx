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
      <div className="pb-16 pt-28">
        <div className="lg:pl-96 xl:pl-[400px] 2xl:pl-[450px] px-4 lg:pr-8 2xl:pr-24 ">
          <h1 className="text-center text-3xl lg:text-5xl 2xl:text-7xl  font-light tracking-tight">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-4 text-center text-lg lg:text-xl 2xl:text-2xl  cursor-pointer">
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
        {/* Tab Menu */}
        <div className="lg:pl-96 xl:pl-[400px] 2xl:pl-[450px] lg:pr-8 2xl:pr-24  my-10">
        <div className="flex justify-center">
        <div className="flex flex-wrap justify-around  gap-4 lg:gap-8">
          {CATEGORIES.map((cat) => {
            return (
              <button
                key={cat.key}
                className={`p-2 lg:p-4 inline-block w-fit m-auto text-xs lg:text-lg 2xl:text-xl tracking-wider rounded-sm font-light uppercase transition border border-black
                  ${
                    activeCategory === cat.key
                      ? 'underline underline-offset-1 lg:underline-offset-2 decoration-1 lg:decoration-2 font-normal scale-110'
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
        </div>
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
