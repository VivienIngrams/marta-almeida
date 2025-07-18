"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface BackgroundColorContextType {
  backgroundColor: string
  setBackgroundColor: (color: string) => void
}

const BackgroundColorContext = createContext<BackgroundColorContextType>({
  backgroundColor: "rgb(255, 255, 255)",
  setBackgroundColor: () => {},
})

export function BackgroundColorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [backgroundColor, setBackgroundColor] = useState("rgb(255, 255, 255)")

  useEffect(() => {
    // Set CSS custom property when background color changes
    document.documentElement.style.setProperty("--page-bg-color", backgroundColor)
  }, [backgroundColor])

  return (
    <BackgroundColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
      {children}
    </BackgroundColorContext.Provider>
  )
}

export const useBackgroundColor = () => useContext(BackgroundColorContext)
