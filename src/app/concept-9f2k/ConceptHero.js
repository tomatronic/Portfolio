'use client'

import { DM_Sans } from 'next/font/google'
import { ArrowDown } from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'

// Scoped to this page only — the real site only loads weights up to 700.
// Loading 800/900 here doesn't add weight to any other route's bundle.
const dmSansBold = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['800', '900'],
})

// Grain cranked up: lower baseFrequency = coarser/chunkier grain (more like
// film/print grain than fine static), higher final alpha = more visible.
const GRAIN_LIGHT = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.04 0 0 0 0 0.02 0 0 0 0.10 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const GRAIN_DARK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0 0.75 0 0 0 0.12 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const NAV_HEIGHT = 96

export default function ConceptHero() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const bg = dark ? '#141414' : '#F5F0E8'
  const fg = dark ? '#F5F0E8' : '#141414'
  const muted = dark ? 'rgba(245,240,232,0.65)' : 'rgba(20,20,20,0.62)'

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
        style={{ background: dark ? 'rgba(245,240,232,0.12)' : 'rgba(20,20,20,0.08)', color: muted }}
      >
        Concept — bold type / grain / contrast exploration. Not linked anywhere.
      </div>

      {/* Grain layer — fixed, more pronounced than the live site's */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ backgroundImage: dark ? GRAIN_DARK : GRAIN_LIGHT }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pt-40">
        <h1
          className={`${dmSansBold.className} text-balance mb-10 max-w-[900px] text-6xl leading-[0.95] tracking-tight md:text-7xl lg:text-8xl`}
          style={{ color: fg }}
        >
          Making complex products{' '}
          <span style={{ color: '#B84010' }}>easy to use</span>, especially where decisions matter most.
        </h1>

        <p
          className="mb-12 max-w-[520px] text-lg leading-relaxed"
          style={{ color: muted }}
        >
          I&rsquo;m a Senior Product Designer specialising in data-heavy, high-stakes products, turning &ldquo;what am I looking at?&rdquo; into &ldquo;I know exactly what to do.&rdquo;
        </p>

        <a
          href="#"
          className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-6 py-3 text-base font-medium text-white transition-transform active:scale-[0.96] hover:bg-accent-800"
        >
          Explore case studies
          <ArrowDown size={16} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  )
}
