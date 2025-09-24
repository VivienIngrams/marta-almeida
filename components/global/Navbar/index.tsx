import dynamic from 'next/dynamic'
import { draftMode, cookies } from 'next/headers'


import {
  getHomePageTitle,
 
  loadSettings,
} from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  const initial = await loadSettings()
  const title = await getHomePageTitle()


  const cookieStore = cookies()
  const language = cookieStore.get('language')?.value || 'pt'
 
  const draft = await draftMode();
  if (draft.isEnabled) {
    return (
      <NavbarPreview
        initial={initial}
        title={title.data}
       language={language}
      />
    )
  }

  return (
    <NavbarLayout
      data={initial.data}
      title={title.data}
     language={language}
    />
  )
}
