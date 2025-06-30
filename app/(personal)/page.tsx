import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import HomePage from '@/components/pages/home/HomePage' 
import { loadHomePage } from '@/sanity/loader/loadQuery'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
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

  return <HomePage data={initial.data} />
}
