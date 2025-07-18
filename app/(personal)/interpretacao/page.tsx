import ProjectPreview from '@/components/pages/project/ProjectPreview'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { loadInterpretacaoPage, loadProject } from '@/sanity/loader/loadQuery'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/utils'

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
        className="py-16 lg:pt-24"
      >
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

        {/* Responsive Horizontal Scroll Carousel */}
        {images && images.length > 0 && (
          <div className="w-full py-8 lg:pl-52 xl:pl-[250px] 2xl:pl-[300px]">
            <div className="px-4 lg:px-8 2xl:px-24">
              <div className="overflow-x-auto thin-scrollbar">
                {' '}
                <div className="flex gap-4 lg:gap-6 pb-4 snap-x snap-mandatory">
                  {images.map((image, index) => {
                    const imageUrl = image.asset?.url
                    if (!imageUrl) return null

                    const aspectRatio =
                      image.asset?.metadata?.dimensions?.aspectRatio || 1.5

                    return (
                      <div key={index} className="flex-none snap-start">
                        <div
                          className="relative overflow-hidden rounded shadow-lg hover:shadow-xl transition-shadow duration-300"
                          style={{
                            width: `${400 * aspectRatio}px`,
                            height: '400px',
                          }}
                        >
                          <Image
                            src={imageUrl}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        {image.caption && (
                          <p className="mt-2 text-sm text-center text-gray-800 max-w-[24rem]">
                            {image.caption}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
