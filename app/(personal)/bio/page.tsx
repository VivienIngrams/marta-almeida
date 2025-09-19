
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
    <section className='min-h-screen'
      style={{
        backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
      }}
    >
        {/* Biography */}
      <div >
        {bio?.text && (
          <div className="py-20 text-base 2xl:text-lg font-sans font-light text-gray-800 md:max-w-[80%] ">
            <CustomPortableText value={bio.text} />
          </div>
        )}
      </div>
  
    </section>
  )
}
