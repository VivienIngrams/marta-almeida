import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { cookies } from 'next/headers'

import HomePage from '@/components/pages/home/HomePage' 
import { loadHomePage } from '@/sanity/loader/loadQuery'

const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadHomePage()
 
  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'pt'

  const draft = await draftMode();
  if (draft.isEnabled) {
    return <HomePagePreview initial={initial} language={language} />
  }



  return <HomePage data={initial.data} language={language} />
}
