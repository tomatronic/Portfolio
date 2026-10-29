'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'
import CanvasReveal from './CanvasReveal'
import RunningCard from './RunningCard'
import TravelCard from './TravelCard'
import NextUpCard from './NextUpCard'
import {
  TEXT,
  INK,
  MUTED,
  FAINT,
  DARK_MUTED,
  CONTAINER,
} from './tokens'

/**
 * About — the October 2026 redesign (design handoff, 2026-10-29).
 *
 * Light sheet: intro, "How I help teams", testimonials. Everything below the
 * intro is indented to the intro's text column, which is deliberate. The sheet
 * is still a `CanvasReveal`, so it clips inward on scroll and reveals the dark
 * "Outside of work" band — running, travel and what's next.
 *
 * This page sets its own sizes (13, 20, 24, 32, 36px alongside the scale's
 * 14/15/16/27) because the approved design does. They are local to this page;
 * `tokens.js` is unchanged.
 *
 * The reference is light-only above the band. The dark variants here follow the
 * rest of the site: cards are `white/[0.04]` with a white/10 ring, ink steps up.
 */

const REVEAL_BG = '#050505'

// Accent for the icon tiles. Light is the design's #5B2BB5; on the navy sheet
// that is only ~2:1, so dark steps up to a lighter violet.
const ICON = 'text-[#5B2BB5] dark:text-[#B79CF0]'
const TILE = 'bg-[#5B2BB5]/[0.08] dark:bg-[#9B69F0]/[0.16]'

// A card with the design's 1px ring and no lift (testimonials). The "How I help"
// cards add `.vcard`, whose hover lives in globals.css.
const CARD =
  'rounded-[16px] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:bg-white/[0.04] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]'

const FOCUS = [
  'Simplifying dashboards and reporting tools',
  'Search that doesn’t need technical knowledge',
  'Making concepts like attribution clear and usable',
  'Reducing reliance on support teams',
]

const VALUE = [
  {
    title: 'Clarity first',
    body: 'Turning dense data into screens people can read at a glance and act on with confidence.',
    icon: (
      <g className="eye">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle className="pupil" cx="12" cy="12" r="3" />
      </g>
    ),
  },
  {
    title: 'Built for scale',
    body: 'Tools used every day by thousands of advertisers, publishers and account teams.',
    icon: (
      <>
        <path d="M3 21h18" />
        <path className="bar b1" d="M6 18v-5" />
        <path className="bar b2" d="M12 18V8" />
        <path className="bar b3" d="M18 18V4" />
      </>
    ),
  },
  {
    title: 'At home in complexity',
    body: 'Attribution, reporting, search and campaign management — technical domains made usable.',
    icon: (
      <>
        <path className="lay l1" d="M12 3 2 8l10 5 10-5-10-5Z" />
        <path className="lay l2" d="m2 12.5 10 5 10-5" />
        <path className="lay l3" d="m2 17 10 5 10-5" />
      </>
    ),
  },
  {
    title: 'Cross-functional',
    body: 'Working hand-in-hand with product, engineering and commercial teams to ship usable solutions.',
    icon: (
      <>
        <path className="link k1" d="M7.5 6h9" />
        <path className="link k2" d="m17.6 8.3-4.3 8.4" />
        <path className="link k3" d="m6.4 8.3 4.3 8.4" />
        <circle className="node" cx="5" cy="6" r="2.5" />
        <circle className="node" cx="19" cy="6" r="2.5" />
        <circle className="node" cx="12" cy="19" r="2.5" />
      </>
    ),
  },
]

const TESTIMONIALS = [
  {
    quote:
      "Tom hugely contributed to our project's on-time release — always available for questions, demos, and meetings when needed. His early involvement in design reviews meant issues were caught before QA, saving significant time. He also helped triage bug tickets, offering clear UX perspective on severity and priority right up to release day.",
    name: 'Ieva Anciukeviciute',
    role: 'Project Manager',
  },
  {
    quote:
      "I just wanted to acknowledge the work you've done taking the initiative to redesign a core feature for scalability, and coordinating across teams to leverage that into new capabilities. Keep up the great work!",
    name: 'Ben Curzon',
    // Was attributed to a "Senior Product Manager" — corrected July 2026.
    role: 'UX Design Manager',
  },
]

/**
 * The figure shown when Strava returns nothing — see `lib/strava.js`.
 *
 * A **floor**, not an estimate, and rendered as "500+ km ran in a typical
 * year" so it never states more than it can stand behind. It was 1,234 until
 * 2026-08-17, which was a made-up number sitting in the same typography as the
 * live one: a Strava outage produced a confident false claim, and an inflated
 * one, with nothing on the card to give it away.
 *
 * Set it low enough to survive a bad year without anyone watching it. Tom's
 * real trailing-365 figure was ~845km in August 2026, so 500 leaves room for
 * the mileage to fall by a third and still be true. Don't creep it up towards
 * whatever the live number happens to be — a floor set just under today's
 * figure is a precise number wearing a plus sign, and this fallback is
 * invisible until it fires, so nobody will notice when it goes stale.
 *
 * With no live data there is also no year grid: the card shows this floor alone
 * rather than inventing runs to draw.
 */
const FALLBACK_KM = 500

const H2 = `${TEXT.title} ${INK} mb-0 font-medium leading-[1.25] tracking-[-0.01em]`

export default function About({ running = null }) {
  const { theme } = useTheme()
  const dark = theme === 'dark'
  const prefersReducedMotion = useReducedMotion()
  const sheetBg = dark ? '#0F1623' : '#ffffff'

  const fade = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }
  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.07 } },
  }
  const inView = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, margin: '-60px' },
  }

  return (
    <div style={{ background: REVEAL_BG }}>
      {/* No px-6 in here: CanvasReveal's --canvas-gutter is the side spacing.
          Putting padding on the container instead measured 848px against home's
          896px and the two pages stopped lining up. */}
      <CanvasReveal style={{ background: sheetBg }}>
        <div className={`${CONTAINER} mx-auto`}>
          <Nav active="About" />
        </div>

        <div className={`${CONTAINER} mx-auto pb-28 pt-8`}>
          {/* ── Intro ───────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fade}
            className="mt-20 flex flex-wrap items-start gap-12"
          >
            <figure className="m-0 flex shrink-0 grow-0 basis-[200px] flex-col gap-3">
              <Image
                src="/bio.png"
                alt="Tom Spencer, standing outdoors"
                width={200}
                height={250}
                sizes="200px"
                priority
                className="block h-[250px] w-[200px] rounded-[16px] object-cover shadow-[0_0_0_1px_rgba(41,41,41,0.1)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                style={{ objectPosition: '60% 20%' }}
              />
              <figcaption className={`${TEXT.xs} ${MUTED} flex flex-col leading-[22px]`}>
                <span className={`${INK} font-medium`}>Tom Spencer</span>
                <span>Senior Product Designer</span>
                <span className={FAINT}>East Sussex, UK</span>
              </figcaption>
            </figure>

            <div
              className={`${TEXT.base} ${MUTED} flex min-w-0 flex-[999_1_420px] flex-col gap-4 leading-[26px] [&>p]:mb-0 [&>p]:max-w-[600px]`}
            >
              <h1
                className={`${INK} mb-4 text-[32px] font-medium leading-[1.25] tracking-[-0.015em] text-balance`}
              >
                I design complex software so it feels easy to use — especially where
                people rely on data to make fast, high-impact decisions.
              </h1>
              <p>
                For the past 8 years at Rakuten Advertising, I&apos;ve worked on
                large-scale internal platforms used by thousands of advertisers,
                publishers, and account teams. Built around large datasets, detailed
                reporting and multi-step workflows, these systems can easily become
                slow, confusing, or overly technical — adding friction exactly where
                users need to make vital decisions.
              </p>
              <blockquote
                className={`${INK} m-0 my-4 border-0 p-0 text-[24px] font-medium not-italic leading-8 tracking-[-0.01em]`}
              >
                “It&apos;s my role to remove that friction.”
              </blockquote>
              <p>
                I take tools that require expertise and redesign them so people can
                understand what they&apos;re seeing, find what they need quickly, and
                act with confidence. In practice, that means:
              </p>
              <div className="grid max-w-[600px] grid-cols-2 gap-2">
                {FOCUS.map((entry) => (
                  <p
                    key={entry}
                    className={`${TEXT.xs} ${INK} mb-0 rounded-[12px] bg-[#F6F6F6] px-3.5 py-3 leading-[22px] dark:bg-white/[0.06]`}
                  >
                    {entry}
                  </p>
                ))}
              </div>
              <p className="mt-2">
                If you&apos;re building for people who know exactly what they want
                (and won&apos;t tolerate anything that slows them down), that&apos;s
                where I thrive — and what I want to work on next.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href="mailto:tom.m.spencer@gmail.com"
                  className={`${TEXT.sm} inline-flex h-11 items-center rounded-full bg-[#292929] px-5 font-medium text-white transition-[background-color,transform] hover:bg-black active:scale-[0.96] dark:bg-[#F2F2F2] dark:text-[#292929] dark:hover:bg-white`}
                >
                  Get in touch
                </a>
                <a
                  href="/resume.pdf"
                  className={`${TEXT.sm} ${INK} inline-flex h-11 items-center rounded-full px-5 font-medium shadow-[inset_0_0_0_1px_rgba(41,41,41,0.16)] transition-[background-color,transform] hover:bg-[#292929]/[0.05] active:scale-[0.96] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)] dark:hover:bg-white/10`}
                >
                  Download résumé
                </a>
              </div>
            </div>
          </motion.div>

          {/* Everything below lines up with the intro's text column: a 200px
              spacer plus the 48px gap, which collapses when the intro wraps. */}
          <div className="flex flex-wrap gap-x-12">
            <div aria-hidden="true" className="shrink-0 grow-0 basis-[200px]" />
            <div className="min-w-0 flex-[999_1_420px]">
              {/* ── How I help teams ──────────────────────────────── */}
              <motion.div {...inView} variants={fade} className="mt-[120px]">
                <h2 className={H2}>How I help teams</h2>
                <motion.div
                  variants={stagger}
                  className="mt-7 grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}
                >
                  {VALUE.map((v) => (
                    <motion.div
                      key={v.title}
                      variants={fade}
                      className={`vcard ${CARD} flex flex-col gap-4 px-5 py-6`}
                    >
                      <div className={`${TILE} flex h-[52px] w-[52px] items-center justify-center rounded-[14px]`}>
                        <svg
                          className={`ic ${ICON}`}
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          {v.icon}
                        </svg>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <p className={`${TEXT.base} ${INK} mb-0 font-medium leading-6`}>{v.title}</p>
                        <p className={`${TEXT.sm} ${MUTED} mb-0 leading-[23px]`}>{v.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── Testimonials ──────────────────────────────────── */}
              <motion.div {...inView} variants={fade} className="mt-[120px]">
                <h2 className={H2}>What colleagues say</h2>
                <motion.div
                  variants={stagger}
                  className="mt-7 grid gap-3"
                  style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
                >
                  {TESTIMONIALS.map((t) => (
                    <motion.figure
                      key={t.name}
                      variants={fade}
                      className={`${CARD} m-0 flex flex-col justify-between gap-6 p-6`}
                    >
                      <blockquote
                        className={`${TEXT.base} m-0 border-0 p-0 not-italic leading-[26px] text-[#3A3A3A] dark:text-[#D4D4D4]`}
                      >
                        “{t.quote}”
                      </blockquote>
                      <figcaption className={`${TEXT.sm} flex flex-col leading-6`}>
                        <span className={`${INK} font-medium`}>{t.name}</span>
                        <span className={FAINT}>{t.role}</span>
                      </figcaption>
                    </motion.figure>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </CanvasReveal>

      {/* ── Outside of work — the dark band ───────────────────────────────
          Same ground, padding and ink as ExperimentsLab, so the two pages'
          second halves are the same thing. This is what the sheet above
          reveals as it clips. */}
      <section className="relative px-6 pb-32 pt-28 md:pt-36">
        <div className={`${CONTAINER} mx-auto`}>
          <motion.div {...inView} variants={fade}>
            <h2 className={`${H2} !text-[#F2F2F2]`}>Outside of work</h2>
            <div className="mt-5 flex max-w-[640px] flex-col gap-4">
              <p className={`${TEXT.base} ${DARK_MUTED} mb-0 leading-[26px]`}>
                I enjoy being outside. I find it helps me mentally unload, and it
                throws up all sorts of thoughts and ideas along the way.
              </p>
              <p className={`${TEXT.base} ${DARK_MUTED} mb-0 leading-[26px]`}>
                In particular I enjoy running, hiking and seeing the world —
                travelling to places and trying my hardest to experience the real
                culture of somewhere rather than the version put on for visitors.
              </p>
            </div>

            <RunningCard year={running?.year ?? null} fallbackKm={FALLBACK_KM} />

            <div
              className="mt-3 grid gap-3"
              style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))' }}
            >
              <TravelCard />
              <NextUpCard />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
