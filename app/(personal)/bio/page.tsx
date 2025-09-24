
import { notFound } from 'next/navigation'
import { loadBioPage } from '@/sanity/loader/loadQuery'
import ClientBio from './clientBio'
import { cookies } from 'next/headers'


export default async function BioPage() {
  const pageData = await loadBioPage()
  if (!pageData?.data) return notFound()
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'pt'


  const title = pageData.data.title?.[language] || ''
  const bio = pageData.data.bio?.[language] || pageData.data.bio?.pt || []

  let bgColor: { r: number; g: number; b: number } = { r: 255, g: 255, b: 255 };
  const rawBg = pageData.data.bgColor;
  if (
    rawBg &&
    typeof rawBg.r === 'number' &&
    typeof rawBg.g === 'number' &&
    typeof rawBg.b === 'number'
  ) {
    bgColor = { r: rawBg.r, g: rawBg.g, b: rawBg.b };
  }


    return (
      <section
        className="min-h-screen"
        style={{
          backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})`,
        }}
      >
        <ClientBio title={title} bio={bio} bgColor={bgColor} />
      </section>
    )
}
