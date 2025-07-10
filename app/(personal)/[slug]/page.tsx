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
      }
    }),
  )

  return (
    <section className=" space-y-12 ">
      <div className="md:px-6  md:pr-8 py-10 mt-16 md:my-12">
        <h1 className=" text-right uppercase text-3xl md:text-4xl 2xl:text-5xl font-extrabold tracking-tighter">
          {title}
        </h1>
        {overview?.text && (
          <div className="my-6 text-right text-lg md:text-xl 2xl:text-2xl  ml-auto max-w-[80%] cursor-pointer">
            <CustomPortableText value={overview.text} />
          </div>
        )}
      </div>
      <div className="gap-8">
        {projectsWithInitial.map((project) => (
          <ProjectPreview
            key={project.slug}
            params={{ slug: project.slug }}
            initial={project.initial}
          />
        ))}
      </div>
    </section>
  )
}
