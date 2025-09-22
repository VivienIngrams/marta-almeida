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
}

export default function ProjectPreview(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<ProjectPayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <ProjectPage data={data!} moreProjects={data!} encodeDataAttribute={encodeDataAttribute} />
}
export function ProjectPreviewCriacao(props: Props) {
  const { params, initial } = props
  const { data, encodeDataAttribute } = useQuery<ProjectPayload | null>(
    projectBySlugQuery,
    params,
    { initial },
  )

  return <CriacaoProjectPage data={data!} moreProjects={data!} encodeDataAttribute={encodeDataAttribute} />
}
