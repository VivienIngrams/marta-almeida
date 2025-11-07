'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { Module } from '@/components/modules'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import { urlForImage } from '@/sanity/lib/utils'
import type { ProjectPayload } from '@/types'

export interface ProjectPageProps {
  data: ProjectPayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
  language: string
}

export default function CriacaoProjectPage({
  data,
  encodeDataAttribute,
  language,
  onToggle,
  isActive,
}: ProjectPageProps & {
  onToggle: (open: boolean) => void
  isActive: boolean
}) {
  const [showContent, setShowContent] = useState(isActive)
  
  useEffect(() => {
    setShowContent(isActive)
  }, [isActive])

  if (!data) return null

  const { year, overview, site, title, content, coverImage, bgColor } = data
  const lang = language || 'pt'
  const imageUrl =
    coverImage &&
    urlForImage(coverImage)?.width(1200).height(500).fit('crop').url()

  const bgStyle =
    bgColor && bgColor.r !== undefined
      ? { backgroundColor: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b})` }
      : {}
  const langTitle = typeof title?.[lang] === 'string' ? title[lang] : ''
  const langOverview = overview?.[lang] || []

  return (
    <div
      className="transition-all duration-500 rounded-lg overflow-hidden"
      style={bgStyle}
    >
      <div className={`px-4 py-6 ${showContent ? 'max-w-[90%] mx-auto' : 'max-w-[380px] mx-auto'}`}>
        {/* Cover image */}
        {coverImage && imageUrl && (
          <div className="mb-4 w-full overflow-hidden rounded-md">
            <Image
              alt={langTitle || 'Cover image'}
              src={imageUrl}
              width={1800}
              height={700}
              sizes="(min-width: 640px) 60vw, 80vw"
              className={`h-auto object-contain mx-auto transition-all duration-500 ${
                showContent ? 'w-full' : 'max-w-full'
              }`}
            />
          </div>
        )}

        {/* Title + Year */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-xl">{langTitle}</h2>
          {year && <span className="text-sm opacity-70">{year}</span>}
        </div>

        {/* Toggle button - collapsed state */}
        {!showContent && (
          <button
            onClick={() => onToggle(true)}
            className="text-sm font-semibold underline hover:opacity-70 transition-opacity"
          >
            {lang === 'en' ? 'Read more...' : 'Ler mais...'}
          </button>
        )}

        {/* Expanded content */}
        {showContent && (
          <div className="pt-4 space-y-4">
            {Array.isArray(langOverview) && langOverview.length > 0 && (
              <div className="prose max-w-none">
                <CustomPortableText value={langOverview} />
              </div>
            )}
            
            {content?.map((block, index) => (
              <Module
                key={block._key || index}
                content={block}
                paragraphClasses=""
              />
            ))}
            
            {site?.url && (
              <div className="mt-6 text-center">
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  {site.urltitle || site.url}
                </a>
              </div>
            )}
            
            <div className="text-right mt-6">
              <button
                onClick={() => onToggle(false)}
                className="px-4 py-2 border rounded-md hover:bg-black/5 transition-colors text-sm"
              >
                {lang === 'en' ? 'Close' : 'Fechar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}