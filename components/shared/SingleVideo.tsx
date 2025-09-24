'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import ReactPlayer from 'react-player'

interface VideoBoxProps {
  videoLink?: any
  caption?: string | { pt?: string; en?: string }
}

// Helper function to safely get caption text
const getSafeCaption = (caption: string | { pt?: string; en?: string } | undefined): string => {
  if (!caption) return ''
  if (typeof caption === 'string') return caption
  if (typeof caption === 'object' && caption !== null) {
    return caption.pt || caption.en || ''
  }
  return ''
}

export default function VideoBox({ videoLink, caption }: VideoBoxProps) {
  const videoUrl = videoLink
  const [isClient, setIsClient] = useState(false)
  const safeCaption = getSafeCaption(caption)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="mt-5 lg:mt-10">
      <div
        className={`w-full overflow-hidden rounded-[3px] bg-gray-50 aspect-video`}
      >
        {isClient ? (
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            playing={true}
            muted={true}
            controls={true}
            loop={true}
          />
        ) : (
          ''
        )}
      </div>
      {safeCaption && (
        <div className="mt-2 lg:mt-4 text-lg lg:text-2xl">{safeCaption}</div>
      )}
    </div>
  )
}