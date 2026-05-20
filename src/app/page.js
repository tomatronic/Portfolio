'use client'

import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import CasestudyShowcase from './components/casestudyShowcase'
import AboutMeSection from './components/AboutMeSection'
import Testimonials from './components/Testimonials'
import { useTheme } from './components/ThemeProvider'

const NAV_HEIGHT = 144

const NOISE_LIGHT = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18 0 0 0 0 0.12 0 0 0 0 0.07 0 0 0 0.04 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const NOISE_DARK = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.25 0 0 0 0 0.18 0 0 0 0 0.10 0 0 0 0.05 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const GRADIENT_TEXT = {
  background: 'linear-gradient(100deg, #E07840 0%, #B84010 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

const BLOBS_LIGHT = [
  'radial-gradient(70% 60% at 15% 10%, rgba(222, 144, 72, 0.16), transparent 55%)',
  'radial-gradient(60% 50% at 88% 22%, rgba(248, 238, 225, 0.60), transparent 55%)',
  'radial-gradient(80% 60% at 50% 95%, rgba(218, 185, 148, 0.20), transparent 60%)',
].join(', ')

const BLOBS_DARK = [
  'radial-gradient(70% 60% at 15% 10%, rgba(238, 159, 104, 0.09), transparent 55%)',
  'radial-gradient(60% 50% at 88% 22%, rgba(12, 24, 48, 0.55), transparent 55%)',
  'radial-gradient(80% 60% at 50% 95%, rgba(238, 159, 104, 0.07), transparent 60%)',
].join(', ')

export default function Home() {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    initial:     prefersReducedMotion ? {} : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition:  { duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    viewport:    { once: true, margin: '-80px' },
  }

  return (
    <div className="relative" style={{ background: dark ? '#0F1623' : '#EDE7DD', minHeight: '100vh' }}>

      {/* Fractal noise texture — fixed so it stays put on scroll */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, backgroundImage: dark ? NOISE_DARK : NOISE_LIGHT }}
        aria-hidden="true"
      />

      {/* Gradient blobs */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: 0, background: dark ? BLOBS_DARK : BLOBS_LIGHT }}
        aria-hidden="true"
      />

      {/* Page content sits above the fixed background layers */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section style={{ marginTop: `-${NAV_HEIGHT}px`, paddingTop: `${NAV_HEIGHT}px` }}>
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center md:py-28">

            {/* Pill */}
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 backdrop-blur-sm"
              style={{
                borderColor: dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                background:   dark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.50)',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent-600 dark:bg-accent-400" />
              <span
                className="text-[10px] font-bold tracking-[0.2em] uppercase"
                style={{ color: dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)' }}
              >
                Senior UX Designer @ Rakuten Advertising
              </span>
            </div>

            {/* Headline */}
            <h1
              className="mb-8 text-balance text-center text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl"
              style={{ lineHeight: 1.1, color: dark ? '#ffffff' : '#020617' }}
            >
              Making complex products{' '}
              <span style={GRADIENT_TEXT}>easy to use</span>
              , especially where decisions matter most.
            </h1>

            {/* Sub-copy */}
            <p
              className="mb-10 max-w-2xl text-center text-base font-normal leading-relaxed"
              style={{ color: dark ? 'rgba(160,185,210,0.70)' : '#64748B' }}
            >
              I specialise in turning data-heavy, high-stakes workflows into interfaces that are easy to understand and quick to act on. In practice, this means helping users move from &ldquo;what am I looking at?&rdquo; to &ldquo;I know exactly what to do next&rdquo; without training, friction, or guesswork.
            </p>

            {/* CTA */}
            <Link
              href="#work"
              onClick={e => {
                const el = document.getElementById('work')
                if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-normal text-white transition-colors hover:bg-accent-800 dark:bg-accent-400 dark:text-slate-950 dark:hover:bg-accent-300"
            >
              Explore case studies
              <ArrowDown size={15} strokeWidth={2.5} />
            </Link>

          </div>
        </section>

        {/* ── About me ──────────────────────────────────────────────────────── */}
        <motion.div {...fadeUp}><AboutMeSection /></motion.div>

        {/* ── Case studies ──────────────────────────────────────────────────── */}
        <motion.div {...fadeUp}><CasestudyShowcase /></motion.div>

        {/* ── Testimonials ──────────────────────────────────────────────────── */}
        <motion.div {...fadeUp}><Testimonials /></motion.div>

      </div>
    </div>
  )
}
