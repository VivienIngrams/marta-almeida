import type { PortableTextBlock } from '@portabletext/types'
import type { Image } from 'sanity'

export interface MenuItem {
  page?: {
    _type: string
    slug?: string
    title?: string
  }
  link?: {
    _type: string
    url?: string
    title?: string
  }
}

export interface PageItem {
  _type: string
  slug?: string
  title?: string
}

export interface LinkItem {
  _type: string
  url?: string
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
  year?: string
  _updatedAt?: string
}

// Page payloads

export interface HomePagePayload {
  overview?: any
  homeImage?: Image
  homeMobileImage?: Image
  title?: string
  customLogo?: Image
 bio?: any
}

export interface ProjectPayload {
  year?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  bgColor?: {
    r?: string
    g?: string
    b?: string
  }
  overview?: PortableTextBlock[]
  site?: {
    urltitle?: string
    url: string
  }
  slug: string
  tags?: string[]
  title?: string
  content?: Content[]
}

export interface Content {
  _type: string
  _key: string
  photo: object[]
  photoOne: object[]
  photoTwo: object[]
  textBlock: object[]
  videoLink: object[]
}

export interface SettingsPayload {
  ogImage?: Image
  favIcon?: Image
  title?: string
  bgColor: {
    r?: string
    g?: string
    b?: string
  }
  textColor: {
    r?: string
    g?: string
    b?: string
  }
  displayLastUpdated: boolean
}


export interface CriacaoPayload {
  title?: string
  overview?: { text?: PortableTextBlock[] } // overview is an object with a text array
  showcaseProjects?: ShowcaseProject[]
}

export interface MoreProjectsPayload {
  title?: string
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
}