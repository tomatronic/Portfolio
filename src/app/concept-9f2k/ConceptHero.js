'use client'

import { DM_Sans } from 'next/font/google'
import { ArrowDown } from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'

// Scoped to this page only — the real site only loads weights up to 700.
// Loading 900 here doesn't add weight to any other route's bundle.
const dmSansBlack = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['900'],
})

// Neutral grain (grey speckle, not tinted) so it reads as texture on top of
// any background color rather than fighting the bold amber/ember blocks.
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const NAV_HEIGHT = 96

export default function ConceptHero() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  // Bold color-block direction, v3: swapped amber for a deep indigo/blue —
  // ties back to the real site's existing dark-mode navy (#0F1623) rather
  // than introducing a third unrelated hue. Tuned so the shared nav's
  // existing text color in each mode still passes contrast: light mode uses
  // a vivid indigo-400 with near-black text (6.76:1); dark mode uses a deep
  // near-black indigo with cream text (17:1).
  const bg = dark ? '#0B0B1F' : '#818CF8'
  const headline = dark ? '#F5F0E8' : '#141414'
  const muted = dark ? 'rgba(245,240,232,0.7)' : 'rgba(20,20,20,0.65)'
  const ctaBg = dark ? '#F5F0E8' : '#141414'
  const ctaFg = dark ? '#141414' : '#F5F0E8'

  return (
    <div
      style={{
        background: bg,
        minHeight: '100vh',
        marginTop: `-${NAV_HEIGHT}px`,
        paddingTop: `${NAV_HEIGHT}px`,
      }}
    >
      {/* Dev-only marker so this never gets mistaken for the live hero */}
      <div
        className="fixed bottom-4 right-4 z-50 rounded-full px-3 py-1.5 text-xs font-medium"
        style={{ background: 'rgba(245,240,232,0.14)', color: muted }}
      >
        Concept v2 — caps, weight 900, color-block. Not linked anywhere.
      </div>

      {/* Grain layer — fixed, neutral so it works on any bg color */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ backgroundImage: GRAIN }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-40">
        <h1
          className={`${dmSansBlack.className} mb-8 uppercase leading-[0.88] tracking-[-0.04em] text-7xl md:text-8xl lg:text-9xl`}
          style={{ color: headline }}
        >
          Sr. Product
          <br />
          Designer
        </h1>

        <p
          className="mb-12 max-w-[420px] text-lg font-normal leading-relaxed"
          style={{ color: muted }}
        >
          I make complex, data-heavy products easy to use.
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-transform active:scale-[0.96]"
          style={{ background: ctaBg, color: ctaFg }}
        >
          Explore case studies
          <ArrowDown size={16} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  )
}
