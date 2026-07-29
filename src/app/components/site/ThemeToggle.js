'use client'

import { Sun, Moon } from 'lucide-react'
import { play } from 'cuelume'
import { useTheme } from '../ThemeProvider'
import { ICON_NAV, BUTTON_RADIUS } from './tokens'

/**
 * Theme toggle for the nav's right zone.
 *
 * Sized and ringed to match the avatar on the left (44px circle, same neutral
 * ring), so the two side zones balance the centred pill.
 *
 * Lives on the sheet rather than the dark footer, so unlike the old footer
 * version it needs light and dark treatments.
 */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  const handleClick = () => {
    toggle()
    // Sound must never block the theme change — autoplay policy, an
    // unsupported audio context or a muted device should all fail silently.
    try {
      play('toggle')
    } catch {
      /* no-op */
    }
  }

  return (
    <button
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`${BUTTON_RADIUS} inline-flex h-11 w-11 items-center justify-center text-[#5D5D5D] ring-1 ring-[#292929]/12 transition-[color,background-color,transform] duration-300 hover:bg-[#292929]/[0.04] hover:text-[#292929] active:scale-[0.96] motion-reduce:transition-none dark:text-[#B0B0B0] dark:ring-white/15 dark:hover:bg-white/[0.06] dark:hover:text-[#F2F2F2]`}
    >
      {isDark ? (
        <Sun size={ICON_NAV} strokeWidth={2} />
      ) : (
        <Moon size={ICON_NAV} strokeWidth={2} />
      )}
    </button>
  )
}
