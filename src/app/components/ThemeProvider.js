'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

const ThemeContext = createContext({ theme: 'light', toggle: () => {} })

// useLayoutEffect warns during SSR (no DOM to measure) — fall back to useEffect there.
// On the client this still runs before paint, so the mount-time theme correction below
// never becomes a visible flash the way a plain useEffect (post-paint) would.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Resolve before the browser paints: the layout.js head script already applied
  // the 'dark' class synchronously, so this only needs to sync React state to match —
  // doing it in a layout effect (not a regular effect) avoids a one-frame flash of
  // light-mode colors for dark-theme visitors on components that read theme via JS
  // (Home's hero, PageBackground, ThemeToggle) rather than Tailwind's dark: class.
  useIsomorphicLayoutEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = stored ?? (prefersDark ? 'dark' : 'light')
    setTheme(resolved)
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark', next === 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}
