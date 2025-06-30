import { client } from '@/sanity/lib/client'
import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial } from '@sanity/react-loader'

export default async function InterpretacaoPage() {
  const projects = await client.fetch(
    `*[_type == "project" && category == "interpretacao"] | order(year desc)`
  )

  // Fetch initial data for each project
  const projectsWithInitial = await Promise.all(
    projects.map(async (project: any) => {
      const initial: QueryResponseInitial<any> = await client.fetch(
        projectBySlugQuery,
        { slug: project.slug }
      )
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
