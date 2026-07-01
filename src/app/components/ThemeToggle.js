'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center gap-1 rounded-full p-1.5 transition-transform active:scale-[0.96]"
      style={{ background: isDark ? '#2A1810' : '#DDD6C8' }}
    >
      {/* Sun */}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full transition-[background-color,color,box-shadow] duration-200"
        style={!isDark
          ? { background: '#F2ECE2', color: '#C07818', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }
          : { color: 'rgba(160,185,210,0.45)' }
        }
      >
        <Sun size={16} strokeWidth={2} />
      </span>

      {/* Moon */}
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full transition-[background-color,color,box-shadow] duration-200"
        style={isDark
          ? { background: '#5C2010', color: '#EE9F68', boxShadow: '0 1px 3px rgba(0,0,0,0.30)' }
          : { color: '#A89E90' }
        }
      >
        <Moon size={16} strokeWidth={2} />
      </span>
    </button>
  )
}
