import ClientInterpretacaoPage from './clientInterpretacao'
import { loadInterpretacaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function InterpretacaoPage() {
  const pageData = await loadInterpretacaoPage()
  if (!pageData?.data) return notFound()
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'pt'

  const showcaseProjects = pageData.data.showcaseProjects || []
  const title = pageData.data.title?.[language] || ''
  const overview =
    pageData.data.overview?.[language] || pageData.data.overview?.pt || []
  const images = pageData.data.images || []
  const rawBgColor = pageData.data.bgColor || { r: 255, g: 255, b: 255 }

  const bgColor =
    rawBgColor.r !== undefined &&
    rawBgColor.g !== undefined &&
    rawBgColor.b !== undefined
      ? {
          r: Number(rawBgColor.r),
          g: Number(rawBgColor.g),
          b: Number(rawBgColor.b),
        }
      : { r: 255, g: 255, b: 255 }

  const projectsWithInitial = await Promise.all(
    showcaseProjects.map(async (project: any) => {
      const initial = await loadProject(project.slug)
      let bgColor: { r: number; g: number; b: number } | undefined = undefined
      if (
        initial?.data?.bgColor &&
        typeof initial.data.bgColor.r !== 'undefined' &&
        typeof initial.data.bgColor.g !== 'undefined' &&
        typeof initial.data.bgColor.b !== 'undefined'
      ) {
        bgColor = {
          r: Number(initial.data.bgColor.r),
          g: Number(initial.data.bgColor.g),
          b: Number(initial.data.bgColor.b),
        }
      }
      return {
        slug: project.slug,
        initial,
        bgColor,
      }
    }),
  )

  return (
    <ClientInterpretacaoPage
      title={title}
      overview={overview}
      bgColor={bgColor}
      images={images}
      projects={projectsWithInitial}
      language={language}
    />
  )
}
