import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'

import {
  getHomePageTitle,
 
  loadSettings,
} from '@/sanity/loader/loadQuery'

import NavbarLayout from './NavbarLayout'
const NavbarPreview = dynamic(() => import('./NavbarPreview'))

export async function Navbar() {
  const initial = await loadSettings()
  const title = await getHomePageTitle()


  const draft = await draftMode();
  if (draft.isEnabled) {
    return (
      <NavbarPreview
        initial={initial}
        title={title.data}
       
      />
    )
  }

  return (
    <NavbarLayout
      data={initial.data}
      title={title.data}
     
    />
  )
}
