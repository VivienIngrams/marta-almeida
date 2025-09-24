import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '@/sanity/lib/api'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image | undefined) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max').quality(90)
}





export function resolveHref(
  documentType?: string,
  slug?: string,
): string | undefined {
  switch (documentType) {
    case 'home':
      return '/'
   
    case 'project':
      return slug ? `/projects/${slug}` : undefined
    default:
      console.warn('Invalid document type:', documentType)
      return undefined
  }
}

// Add this to your utils file (sanity/lib/utils.ts)

export function getSafeTitle(
  titleObj: { pt?: string; en?: string } | string | undefined,
  language: 'pt' | 'en' = 'pt'
): string {
  // If it's already a string, return it
  if (typeof titleObj === 'string') {
    return titleObj
  }
  
  // If it's undefined or null
  if (!titleObj) {
    return 'Untitled'
  }
  
  // If it's an object, get the appropriate language
  if (typeof titleObj === 'object' && titleObj !== null) {
    return titleObj[language] || titleObj.pt || titleObj.en || 'Untitled'
  }
  
  // Fallback
  return 'Untitled'
}

// Update your existing getLang function to be more defensive
export function getLang(field: { pt?: any; en?: any } | undefined, lang: 'pt' | 'en') {
  if (!field || typeof field !== 'object') return ''
  return field[lang] || field.pt || field.en || ''
}