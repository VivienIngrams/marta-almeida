import { groq } from 'next-sanity'



export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    title,
    customLogo,
    overview,
    homeImage{
      _type,
      asset,
      "lqip": asset->metadata.lqip,
    },
    homeMobileImage{
      _type,
      asset,
      "lqip": asset->metadata.lqip,
    },
   bio,
  }
`

export const homePageTitleQuery = groq`
  *[_type == "home"][0].title
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    year,
    coverImage,
    description,
    bgColor {
      'r': rgb.r,
      'g': rgb.g,
      'b': rgb.b,
    },
    overview,
    site,
    "slug": slug.current,
    title,
    content[]{
      _type == 'singleImage' => {
        _type,
        _key,
        photo{
          _type,
          asset,
          "lqip": asset->metadata.lqip,
        },
        caption,
      },
      _type == 'twoImages' => {
        _type,
        _key,
        photoOne{
          _type,
          asset,
          "lqip": asset->metadata.lqip,
        },
        photoTwo{
          _type,
          asset,
          "lqip": asset->metadata.lqip,
        },
        caption,
      },
      _type == 'textBlock' => {
        _type,
        _key,
        description,
      },
      _type == 'singleVideo' => {
        _type,
        _key,
        videoLink,
        caption,
      },
      _type == 'twoVideos' => {
        _type,
        _key,
        videoOneLink,
        videoTwoLink,
        caption,
      },
    },
  }
`

export const projectPaths = groq`
  *[_type == "project" && slug.current != null].slug.current
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    "menuItems": {
      "page": menuItems[_type == 'reference']->{
        _type,
        "slug": slug.current,
        title,
        },
      "link": menuItems[_type == 'navLink'] {
        _type,
        title,
        url,
      },
    },
    ogImage,
    favIcon,
    bgColor {
      'r': rgb.r,
      'g': rgb.g,
      'b': rgb.b,
    },
    textColor {
      'r': rgb.r,
      'g': rgb.g,
      'b': rgb.b,
    },
    displayLastUpdated,
  }
`
export const allProjectsQuery = groq`
  *[_type == "project"] | order(year desc) {
    _id,
    year,
    coverImage,
    description,
    overview,
    site,
    "slug": slug.current,
    title,
  }
`
export const criacaoPageQuery = groq`
  *[_type == "criacao"][0]{
    _id,
    title,
    overview,
    showcaseProjects[]->{
      _id,  
      year,
      coverImage,
      description,
      overview,
      site,
      "slug": slug.current,
      title,
    },

  }`
  export const colaboracaoPageQuery = groq`
  *[_type == "colaboracao"][0]{
    _id,
    title,
    overview,
     bgColor {
      'r': rgb.r,
      'g': rgb.g,
      'b': rgb.b,
    },
    showcaseProjectsOutros[]->{
      _id,  
      year,
      coverImage,
      description,
      overview,
      site,
      "slug": slug.current,
      title,
    },
    showcaseProjectsEnsino[]->{
      _id,  
      year,
      coverImage,
      description,
      overview,
      site,
      "slug": slug.current,
      title,
    },
    showcaseProjectsProducao[]->{
      _id,  
      year,
      coverImage,
      description,
      overview,
      site,
      "slug": slug.current,
      title,
    },

  }`

  export const interpretacaoPageQuery = groq`
  *[_type == "interpretacao"][0]{
    _id,
    title,
    overview,
    bgColor {
      'r': rgb.r,
      'g': rgb.g,
      'b': rgb.b,
    },
    images[] {
  ...,
  caption,
  asset->{
    url,
    metadata {
      dimensions {
        aspectRatio
      }
    }
  }
},
    showcaseProjects[]->{
      _id,  
      year,
      coverImage,
      description,
      overview,
      site,
      "slug": slug.current,
      title,
    },
  }`

  export const moreProjectsQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**
"))] | order(year desc) {
    _id,
    year,
    coverImage,
    description,
    overview,
    site,
    "slug": slug.current,
    title,
  }[0...6]
`