import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'


export interface BilingualString {
  pt?: string
  en?: string
}

export interface BilingualBlock {
  pt?: PortableTextBlock[]
  en?: PortableTextBlock[]
}


export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: BilingualBlock
  slug?: string
  tags?: string[]
  title?: BilingualString
  year?: string
  _updatedAt?: string
}

// Page payloads

export interface HomePagePayload {
  overview?: BilingualBlock
  homeImage?: Image
  homeMobileImage?: Image
  title?: string
 bgColor?: {
    r?: string
    g?: string  
    b?: string
  }
 
}

export interface BioPayload {
  title?: BilingualString
  bio?: BilingualBlock
  bgColor?: { 
    r?: string        
    g?: string
    b?: string
  }
}
export interface ProjectPayload {
  year?: string
  coverImage?: Image
    bgColor?: {
    r?: string
    g?: string
    b?: string
  }
  overview?: BilingualBlock
  site?: {
    urltitle?: string
    url: string
  }
  slug: string
  tags?: string[]
  title?: BilingualString
  content?: ProjectContent[]
}
export interface ProjectContentBase {
  _type: string
  _key: string
}

export interface TextBlockContent extends ProjectContentBase {
  _type: 'textBlock'
  description: BilingualBlock
}

export interface SingleImageContent extends ProjectContentBase {
  _type: 'singleImage'
  photo: Image
  caption: BilingualString
}

export interface TwoImagesContent extends ProjectContentBase {
  _type: 'twoImages'
  photoOne: Image
  photoTwo: Image
  caption: BilingualString
}

export interface SingleVideoContent extends ProjectContentBase {
  _type: 'singleVideo'
  videoLink: string
  caption: BilingualString
}

export interface TwoVideosContent extends ProjectContentBase {
  _type: 'twoVideos'
  videoOneLink: string
  videoTwoLink: string
  caption: BilingualString
}

export type ProjectContent =
  | TextBlockContent
  | SingleImageContent
  | TwoImagesContent
  | SingleVideoContent
  | TwoVideosContent


export interface SettingsPayload {
   favIcon?: Image
  
}


export interface CriacaoPayload {
  title?: BilingualString
  overview?: BilingualBlock
  showcaseProjects?: ShowcaseProject[]
}
export interface InterpretacaoPayload {
  title?: BilingualString
  overview?: BilingualBlock
  images?: CarouselImage[]
  bgColor?: {
    r?: number
    g?: number
    b?: number
  }
  showcaseProjects?: ShowcaseProject[]
}

export interface CarouselImage {
  _key?: string
  caption?: BilingualString
  asset?: {
    url: string
    metadata?: {
      dimensions?: {
        aspectRatio?: number
      }
    }
  }
}

export interface ColaboracaoPayload {
  title?: BilingualString
  bgColor?: {
    r?: string
    g?: string
    b?: string
  }
overview?: BilingualBlock
  showcaseProjectsEnsino?: ShowcaseProject[]
  showcaseProjectsProducao?: ShowcaseProject[]
  showcaseProjectsOutros?: ShowcaseProject[]
}

// export interface MoreProjectsPayload {
//   title?: string
//   overview?: PortableTextBlock[]
//   showcaseProjects?: ShowcaseProject[]
// }