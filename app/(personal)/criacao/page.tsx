// app/criacao/page.tsx (or wherever your route file is)
import ClientCriacaoPage from './clientCriacao'
import { loadCriacaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'

export default async function CriacaoPage() {
  const pageData = await loadCriacaoPage()
  if (!pageData?.data) return notFound()

  const showcaseProjects = pageData.data.showcaseProjects || []
  const title = pageData.data.title || ''
 

  const projectsWithInitial = await Promise.all(
    showcaseProjects.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      const rawBgColor = initial?.data?.bgColor
      const bgColor =
        rawBgColor &&
        rawBgColor.r !== undefined &&
        rawBgColor.g !== undefined &&
        rawBgColor.b !== undefined
          ? {
              r: Number(rawBgColor.r),
              g: Number(rawBgColor.g),
              b: Number(rawBgColor.b),
            }
          : undefined
      return {
        slug: project.slug,
        initial,
        bgColor,
      }
    })
  )

  return (
    <ClientCriacaoPage
      title={title}
    
      projects={projectsWithInitial}
    />
  )
}
