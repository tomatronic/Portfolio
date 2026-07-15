'use client'

import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import CasestudyShowcase from './components/casestudyShowcase'
import AboutMeSection from './components/AboutMeSection'
import Testimonials from './components/Testimonials'
import { useTheme } from './components/ThemeProvider'

const NAV_HEIGHT = 96

const NOISE_LIGHT = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.12 0 0 0 0 0.07 0 0 0 0.04 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const NOISE_DARK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.25 0 0 0 0 0.18 0 0 0 0 0.10 0 0 0 0.05 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

// backgroundImage (not the background shorthand) — the shorthand resets
// background-clip when React re-applies it on theme change, leaving a solid block.
// padding-right + negative margin: the final glyph's terminal overshoots the text
// box and background-clip won't paint it, clipping the "e" in "use"
const GRADIENT_TEXT_LIGHT = {
  backgroundImage: 'linear-gradient(100deg, #E07840 0%, #B84010 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingRight: '0.08em',
  marginRight: '-0.08em',
}

// Lighter ramp in dark mode — #B84010 sinks into the navy background
const GRADIENT_TEXT_DARK = {
  backgroundImage: 'linear-gradient(100deg, #EE9F68 0%, #E07840 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  paddingRight: '0.08em',
  marginRight: '-0.08em',
}

export default function Home() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  return (
    <div className="relative" style={{ background: dark ? '#0F1623' : '#ffffff', minHeight: '100vh' }}>

      {/* Fractal noise texture — fixed so it stays put on scroll */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, backgroundImage: dark ? NOISE_DARK : NOISE_LIGHT }}
        aria-hidden="true"
      />

      {/* Page content sits above the fixed background layer */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{ marginTop: `-${NAV_HEIGHT}px`, paddingTop: `${NAV_HEIGHT}px` }}>
          <div className="container mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-10 text-center md:items-start md:py-16 md:text-left">

            {/* Headline */}
            <h1
              className="mb-8 w-full max-w-[800px] text-balance text-3xl font-medium tracking-tight md:text-left md:text-4xl"
              style={{ lineHeight: 1.05, color: dark ? '#ffffff' : '#020617' }}
            >
              Making complex products{' '}
              <span style={dark ? GRADIENT_TEXT_DARK : GRADIENT_TEXT_LIGHT}>easy to use</span>
              , especially where decisions matter most.
            </h1>

            {/* Sub-copy */}
            <p
              className="mb-10 w-full max-w-[640px] text-left text-base font-normal leading-relaxed"
              style={{ color: dark ? 'rgba(165,190,215,0.85)' : '#64748B' }}
            >
              I&rsquo;m a Senior Product Designer specialising in data-heavy, high-stakes products, turning &ldquo;what am I looking at?&rdquo; into &ldquo;I know exactly what to do.&rdquo;
            </p>

            {/* CTA */}
            <Link
              href="#work"
              onClick={e => {
                const el = document.getElementById('work')
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-normal text-white transition-[background-color,transform] hover:bg-accent-800 active:scale-[0.96] dark:bg-accent-400 dark:text-slate-950 dark:hover:bg-accent-300"
            >
              Explore case studies
              <ArrowDown size={15} strokeWidth={2.5} />
            </Link>

          </div>
        </section>

        {/* ── Case studies ──────────────────────────────────────────────────── */}
        <CasestudyShowcase />

        {/* ── About me ──────────────────────────────────────────────────────── */}
        <AboutMeSection />

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <Testimonials />


      </div>
    </div>
  )
}
