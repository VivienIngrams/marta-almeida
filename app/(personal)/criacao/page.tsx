import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { loadCriacaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'

export default async function CriacaoPage() {
  const pageData = await loadCriacaoPage()
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
      <div style={topBgStyle} className="py-16  lg:pt-24">
        <div className="px-4 lg:pr-8 2xl:pr-24 ">
                 <h1 className="text-right text-3xl lg:text-5xl 2xl:text-7xl  font-light tracking-tight">
                   {title}
                 </h1>
                 {overview?.text && (
                   <div className="my-4 text-right text-lg lg:text-xl 2xl:text-2xl ml-auto lg:max-w-[80%] cursor-pointer">
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
