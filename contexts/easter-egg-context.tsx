"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface EasterEggContextValue {
  isActive: boolean
  toggle: () => void
}

const EasterEggContext = createContext<EasterEggContextValue>({
  isActive: false,
  toggle: () => {},
})

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add("punk")
    } else {
      document.documentElement.classList.remove("punk")
    }
  }, [isActive])

  return (
    <EasterEggContext.Provider value={{ isActive, toggle: () => setIsActive((v) => !v) }}>
      {children}
    </EasterEggContext.Provider>
  )
}

export function useEasterEgg() {
  return useContext(EasterEggContext)
}
