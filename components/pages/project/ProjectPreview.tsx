'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { projectBySlugQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { ProjectPayload } from '@/types'

import CriacaoProjectPage from './CriacaoProjectPage'
import ProjectPage from './ProjectPage'

type Props = {
  params: { slug: string }
  initial: QueryResponseInitial<ProjectPayload | null>
  language: string
}

export default function ProjectPreview(props: Props) {
  const { params, initial, language } = props
  const { data, encodeDataAttribute } = useQuery<ProjectPayload | null>(
    projectBySlugQuery,
    params,
    { initial, },
  )

  return <ProjectPage data={data!}  encodeDataAttribute={encodeDataAttribute} language={language} />
}
export function ProjectPreviewCriacao(props: Props) {
  const { params, initial, language } = props
  const { data, encodeDataAttribute } = useQuery<ProjectPayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <CriacaoProjectPage data={data!}  encodeDataAttribute={encodeDataAttribute} language={language} />
}
