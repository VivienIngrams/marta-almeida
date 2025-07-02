import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { loadCriacaoPage, loadProject } from '@/sanity/loader/loadQuery'

export default async function CriacaoPage() {
  // Fetch the Criação page data (with showcaseProjects)
  const criacao = await loadCriacaoPage()
  const showcaseProjects = criacao?.data?.showcaseProjects || []
  const title = criacao?.data?.title
  const overview = criacao?.data?.overview
console.log('CriacaoPage data:', title, overview)
  // Fetch initial data for each project
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
    <section className="space-y-12 md:px-6 py-10">
      <h1 className="text-4xl font-bold">{title}</h1>
      {overview?.text && (
        <div className="mt-2 text-lg md:text-xl 2xl:text-2xl text-right max-w-[80%] ml-auto cursor-pointer">
          <CustomPortableText value={overview.text} />
        </div>
      )}
      <div className=" gap-8">
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
