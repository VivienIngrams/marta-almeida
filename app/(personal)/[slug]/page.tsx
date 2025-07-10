import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import {
  loadCriacaoPage,
  loadColaboracaoPage,
  loadInterpretacaoPage,
  loadProject,
} from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'

const PAGE_LOADERS = {
  criacao: loadCriacaoPage,
  colaboracao: loadColaboracaoPage,
  interpretacao: loadInterpretacaoPage,
}

export default async function DynamicPersonalPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const loader = PAGE_LOADERS[slug]
  if (!loader) return notFound()
  const pageData = await loader()
  if (!pageData?.data) return notFound()
  const showcaseProjects = pageData.data.showcaseProjects || []
  const title = pageData.data.title
  const overview = pageData.data.overview

  const projectsWithInitial = await Promise.all(
    showcaseProjects.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      return {
        slug: project.slug,
        initial,
        bgColor: initial?.data?.bgColor,
      }
    }),
  )

  // Get the bgColor of the first project, if available
  const firstBgColor = projectsWithInitial[0]?.initial?.data?.bgColor
  const topBgStyle =
    firstBgColor && firstBgColor.r !== undefined && firstBgColor.g !== undefined && firstBgColor.b !== undefined
      ? { backgroundColor: `rgb(${firstBgColor.r}, ${firstBgColor.g}, ${firstBgColor.b})` }
      : {}

  return (
    <section>
      <div style={topBgStyle}>
        <div className="px-4 md:pr-8 2xl:pr-24 pt-16 md:pt-24">
          <h1 className="text-right uppercase text-4xl md:text-5xl 2xl:text-7xl font-normal tracking-tighter">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-6 text-right text-lg md:text-xl 2xl:text-2xl ml-auto md:max-w-[80%] cursor-pointer">
              <CustomPortableText value={overview.text} />
            </div>
          )}
        </div>
        <div>
          {projectsWithInitial.map((project) => (
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
