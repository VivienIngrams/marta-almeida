import { loadCriacaoPage, loadProject } from '@/sanity/loader/loadQuery'

import ProjectPreview from '@/components/pages/project/ProjectPreview'

export default async function InterpretacaoPage() {
  // Fetch the Criação page data (with showcaseProjects)
  const criacao = await loadCriacaoPage()
  const showcaseProjects = criacao?.data?.showcaseProjects || []

  // Fetch initial data for each project
  const projectsWithInitial = await Promise.all(
    showcaseProjects.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      return {
        slug: project.slug,
        initial,
      }
    })
  )

  return (
    <section className="space-y-12 px-6 py-10">
      <h1 className="text-4xl font-bold">Interpretação</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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