import { loadColaboracaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'
import ColaboracaoTabs from './tabs'

export default async function ColaboracaoPage() {
  const pageData = await loadColaboracaoPage()
  if (!pageData?.data) return notFound()

    const showcaseProjectsEnsino = pageData.data.showcaseProjectsEnsino || []
  const showcaseProjectsProducao = pageData.data.showcaseProjectsProducao || []
  const showcaseProjectsOutros = pageData.data.showcaseProjectsOutros || []
  const title = pageData.data.title
  const overview = pageData.data.overview
  const bgColor = pageData.data.bgColor || { r: 255, g: 255, b: 255 }

  // Fetch initial data for each project in each category
  const ensinoWithInitial = await Promise.all(
    showcaseProjectsEnsino.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      return {
        slug: project.slug,
        initial,
        bgColor: initial?.data?.bgColor,
      }
    }),
  )
  const producaoWithInitial = await Promise.all(
    showcaseProjectsProducao.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      return {
        slug: project.slug,
        initial,
        bgColor: initial?.data?.bgColor,
      }
    }),
  )
  const outrosWithInitial = await Promise.all(
    showcaseProjectsOutros.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      return {
        slug: project.slug,
        initial,
        bgColor: initial?.data?.bgColor,
      }
    }),
  )

  return (
    <section className='min-h-screen'
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
      <ColaboracaoTabs
        title={title}
        overview={overview}
        ensino={ensinoWithInitial}
        producao={producaoWithInitial}
        outros={outrosWithInitial}
        bgColor={bgColor}
      />
    </section>
  )
}
