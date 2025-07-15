import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { loadInterpretacaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'
import Image from 'next/image'

export default async function InterpretacaoPage() {
  const pageData = await loadInterpretacaoPage()
  if (!pageData?.data) return notFound()
  const showcaseProjects = pageData.data.showcaseProjects || []
  const title = pageData.data.title
  const overview = pageData.data.overview
  const bgColor = pageData.data.bgColor || { r: 255, g: 255, b: 255 }
  const images = pageData.data.images || []
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

  return (
    <section>
      <div
        style={{
          backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        }}
        className="py-16  md:pt-24"
      >
        <div className="px-4 md:pr-8 2xl:pr-24 ">
          <h1 className="text-right  text-4xl md:text-6xl 2xl:text-8xl font-light tracking-tight">
            {title}
          </h1>
          {overview?.text && (
            <div className="my-4 text-right text-lg md:text-xl 2xl:text-2xl ml-auto md:max-w-[80%] cursor-pointer">
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
        {/* Carousel Images */}
        <div>
          {images &&
            images.map((image, index) => (
              <div key={index} className="my-4">
                {/* <Image
                  src={image.url}
                  alt={image.alt || `Image ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  className="w-full h-auto"
                /> */}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
