import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { AboutPage } from '@/components/pages/home/AboutPage'
import { studioUrl } from '@/sanity/lib/api'
import { loadHomePage } from '@/sanity/loader/loadQuery'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/AboutPagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadHomePage()

  const draft = await draftMode();
  if (draft.isEnabled) {
    return <HomePagePreview initial={initial} />
  }

  if (!initial.data) {
    return (
      <div className="text-center text-2xl">
     Marta 
      </div>
    )
  }

  return <AboutPage data={initial.data} />
}
