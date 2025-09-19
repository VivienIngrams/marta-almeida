import { notFound } from 'next/navigation'
import { loadBioPage } from '@/sanity/loader/loadQuery'
import { CustomPortableText } from '@/components/shared/CustomPortableText'

export default async function BioPage() {
  const pageData = await loadBioPage()
  if (!pageData?.data) return notFound()

  const title = pageData.data.title
  const bio = pageData.data.bio
  const bgColor = pageData.data.bgColor || { r: 255, g: 255, b: 255 }

  return (
    <section
      className="min-h-screen"
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
      <div className="pb-16 pt-28 lg:pt-16">
        <div className="lg:pl-[20%] px-4 lg:pr-8 2xl:pr-24 ">
          {/* Biography */}
          <div className='lg:mx-[7vw]'>
            {bio?.text && (
              <div className="py-20 text-base lg:text-lg 2xl:text-xl font-sans font-light text-gray-800 md:max-w-[80%] ">
                <CustomPortableText value={bio.text} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
