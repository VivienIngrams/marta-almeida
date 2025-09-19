'use client'

import {  useSettings } from '@/sanity/loader/useQuery'

import NavbarLayout from './NavbarLayout'

type Props = {
  initial: Parameters<typeof useSettings>[0]
  title: any

}

export default function NavbarPreview(props: Props) {
  const { data } = useSettings(props.initial)

  return <NavbarLayout data={data!} title={props?.title} />
}
