'use client'

import { useEffect, useState } from 'react'
import React from 'react'
import ReactPlayer from 'react-player'

interface VideoBoxProps {
  videoLink?: any
  caption?: string
}

export default function VideoBox({ videoLink, caption }: VideoBoxProps) {
  const videoUrl = videoLink
  const [isClient, setIsClient] = useState(false)
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
      {caption && (
        <div className="mt-2 lg:mt-4 text-lg lg:text-2xl">{caption}</div>
      )}
    </div>
  )
}
