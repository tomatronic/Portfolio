'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'
import ImageWall from './ImageWall'
import CanvasReveal from './CanvasReveal'
import {
  TEXT,
  INK,
  MUTED,
  FAINT,
  DARK_INK,
  DARK_MUTED,
  DARK_FAINT,
  CARD_RADIUS,
  CONTAINER,
} from './tokens'

/**
 * Concept-route About page — copy from Tom's copywriter (July 2026), on this
 * route's type system, so it can be edited without touching the live /about.
 *
 * Two sections are restored from git rather than newly invented:
 *  · "Where I add value" — five cards, removed from the live page in d09b1e0
 *    (June 2026). Card titles are the originals; bodies are the new copy.
 *  · Testimonials — the two quotes from components/Testimonials.js, which the
 *    About page carried until 912d870. Copied rather than imported, since that
 *    component is built on the previous type scale and is now unused.
 */

const REVEAL_BG = '#050505'

/**
 * The card treatment from `CaseStudyCards`, with a white ground where those have
 * a screenshot (Tom, 2026-09-25). What carries over is the chrome: the 16px
 * radius, the neutral ring, and the purple lift on hover — so the cards on this
 * page and the tiles on home read as the same component.
 *
 * The shadow is scaled down from the home tiles the way `OtherCaseStudies` does:
 * the home values (44px blur, 0.28 alpha) are tuned to a ~600px-tall card, and
 * under a ~120px one the same numbers read as a glow rather than a lift.
 *
 * Dark mode is `white/[0.04]`, not white — the home tiles stay a fixed light
 * tint in both themes because a screenshot needs a light mount, but a plain
 * white block on the navy sheet is just a hole. 0.04 is the nav pill's own dark
 * surface. The resting shadow is light-only: it exists to separate a white card
 * from the white sheet, and there is nothing to separate in dark.
 */
const CARD = [
  'rounded-[16px] ring-1 ring-black/10 bg-white',
  'shadow-[0_2px_10px_rgba(88,28,160,0.08)]',
  'transition-shadow duration-300 hover:shadow-[0_10px_32px_rgba(88,28,160,0.20)]',
  'motion-reduce:transition-none',
  'dark:bg-white/[0.04] dark:ring-white/10 dark:shadow-none dark:hover:shadow-[0_12px_36px_rgba(155,105,240,0.42)]',
].join(' ')

const PRACTICAL = [
  'Simplifying dashboards and reporting tools',
  'Designing search experiences that don’t require technical knowledge',
  'Making complex concepts (like marketing attribution) clear and usable',
  'Reducing reliance on support teams by improving usability',
]

// The "8+ years in enterprise UX" card was removed 2026-09-25 — Tom: it repeats
// what the lead copy already says in its first sentence.
const VALUE = [
  {
    title: 'Usability & clarity',
    body: 'Strong focus on usability, clarity, and fast, confident decision-making.',
  },
  {
    title: 'Designing at scale',
    body: 'Experience designing tools used at scale, by thousands of users.',
  },
  {
    title: 'Technical domains',
    body: 'Comfortable working in complex, technical domains.',
  },
  {
    title: 'Cross-functional',
    body: 'Collaborative across product, engineering, and commercial teams to ship usable solutions.',
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
 */
const FALLBACK_KM = 500

function RunningCard({ km, live }) {
  return (
    // flex-1 + justify-between: the card grows to take its share of the column,
    // and the figure sits at the foot of whatever height that turns out to be.
    //
    // Fixed DARK_* ink, no `dark:` variants: since 2026-09-25 this card lives on
    // the near-black band, which does not flip with the theme — the same reason
    // Footer and ExperimentsLab use these tokens.
    <div
      className={`${CARD_RADIUS} flex flex-1 flex-col justify-between border border-white/10 bg-white/[0.03] p-6 md:p-8`}
    >
      <p className={`${TEXT.xs} ${DARK_FAINT} mb-8 font-medium`}>Running</p>
      <div>
        <p
          className={`${TEXT.title} ${DARK_INK} mb-1 font-medium leading-none tracking-tight tabular-nums`}
        >
          {km.toLocaleString('en-GB')}
          {!live && '+'}
          <span className={`${TEXT.base} ${DARK_FAINT} ml-1.5 font-normal`}>km</span>
        </p>
        {/* The window softens with the figure. "the last 365 days" is a precise
            claim and only the live number can make it; the fallback is a floor,
            so it says what a floor can say. The pair also restores a visual
            tell that the fallback has fired — the "Powered by Strava" badge
            used to be that tell, and it was removed on 2026-08-05. */}
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-0`}>
          {live ? 'ran in the last 365 days' : 'ran in a typical year'}
        </p>
      </div>
    </div>
  )
}

export default function About({ running = null }) {
  // `running` is null whenever the Strava env vars are missing or the call
  // failed, so its presence is what tells the card whether it can make the
  // precise claim or has to fall back to the floor.
  const runningLive = running != null
  const runningKm = running?.km ?? FALLBACK_KM
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

      {/* The sheet is a CanvasReveal, exactly as on home (2026-09-25): About
          used to run white all the way into the footer, so the site's one
          signature move was missing and the dark footer arrived as a hard edge.
          Now the sheet clips inward on scroll and reveals the dark "Outside of
          work" band behind it — professional work on the light sheet, personal
          on the dark, which is the same split home makes between case studies
          and Experiments.

          No px-6 in here: CanvasReveal's --canvas-gutter is the side spacing.
          Putting padding on the container instead measured 848px against home's
          896px and the two pages stopped lining up. */}
      <CanvasReveal style={{ background: sheetBg }}>
        <div className={`${CONTAINER} mx-auto`}>
          <Nav active="About" />
        </div>

        <div className={`${CONTAINER} mx-auto pb-28 pt-8`}>
          {/* ── Lead ─────────────────────────────────────────────── */}
          <motion.div initial="hidden" animate="visible" variants={fade}>
            <h1
              className={`${TEXT.title} ${INK} mb-12 max-w-[46ch] text-balance font-medium leading-[1.35] tracking-tight`}
            >
              I design complex software so it feels easy to use — especially where
              people rely on data to make fast, high-impact decisions.
            </h1>
          </motion.div>

          {/* items-stretch + h-full on the figure: the copy column runs ~130px
              taller than a fixed 3/4 photo, which left an L-shaped void down the
              right of the lead. The photo now takes the row's full height. */}
          <div className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-[1fr_300px] md:gap-14">
            <motion.div
              {...inView}
              variants={fade}
              className="[&>p:last-child]:mb-0 [&>p]:mb-4 [&>p]:text-[16px] [&>p]:leading-relaxed [&>p]:text-[#5D5D5D] dark:[&>p]:text-[#B0B0B0]"
            >
              <p>
                For the past 8 years at Rakuten Advertising, I&apos;ve worked on
                large-scale internal platforms used by thousands of advertisers,
                publishers, and account teams. Since these systems are built around
                large datasets, detailed reporting, and multi-step workflows, they
                can easily become slow, confusing, or overly technical — adding
                friction where users need to make vital decisions.
              </p>
              <p className={`${INK} font-medium`}>It&apos;s my role to remove this friction.</p>
              <p>
                I take tools that require expertise and redesign them so users can
                understand what they&apos;re seeing, find the information they need
                quickly, and act with confidence — without any second-guessing.
              </p>
              <p>In practical terms, this includes:</p>

              <ul className="mb-4 space-y-2">
                {PRACTICAL.map((entry) => (
                  <li key={entry} className={`${TEXT.base} ${MUTED} flex items-start gap-2`}>
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                    <span>{entry}</span>
                  </li>
                ))}
              </ul>

              <p>
                If you&apos;re building products, services, or workflows for people
                who know exactly what they want (and won&apos;t tolerate anything
                that slows them down), that&apos;s the kind of project where I
                thrive — and what I want to work on next.
              </p>
            </motion.div>

            <motion.div
              {...inView}
              variants={fade}
              className={`${CARD_RADIUS} relative aspect-[3/4] w-full overflow-hidden ring-1 ring-[#292929]/10 md:aspect-auto md:h-full dark:ring-white/10`}
            >
              <Image
                src="/bio.png"
                alt="Tom Spencer"
                fill
                sizes="(max-width: 768px) 100vw, 300px"
                className="object-cover object-top"
                priority
              />
            </motion.div>
          </div>

          {/* ── Where I add value ────────────────────────────────── */}
          <motion.div {...inView} variants={fade} className="mt-24">
            <h2 className={`${TEXT.title} ${INK} mb-8 font-medium leading-[1.25] tracking-tight`}>
              Where I add value
            </h2>

            <motion.div
              variants={stagger}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {VALUE.map((entry, i, arr) => (
                <motion.div
                  key={entry.title}
                  variants={fade}
                  // WASH + OUTLINE, the fill every card on the case studies uses.
                  // These were outline-only with no ground, a treatment that
                  // appeared nowhere else on the site and was the main reason the
                  // page read as a different product (2026-09-25).
                  //
                  // An odd count has to break the two-column grid somewhere, and
                  // the FIRST card spanning reads as hierarchy where a full-width
                  // orphan at the foot reads as a mistake. At an even count —
                  // four, since the "8+ years" card went — nothing spans and the
                  // grid tiles cleanly, so this is conditional rather than fixed.
                  className={`${CARD} p-5 ${
                    i === 0 && arr.length % 2 !== 0 ? 'sm:col-span-2' : ''
                  }`}
                >
                  <p className={`${TEXT.base} ${INK} mb-1 font-medium`}>{entry.title}</p>
                  <p className={`${TEXT.sm} ${MUTED} mb-0 leading-relaxed`}>{entry.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Testimonials ─────────────────────────────────────── */}
          <motion.div {...inView} variants={fade} className="mt-24">
            <h2 className={`${TEXT.title} ${INK} mb-8 font-medium leading-[1.25] tracking-tight`}>
              What colleagues say
            </h2>

            <motion.div variants={stagger} className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {/* Grid rows stretch both cards to the taller one's height, so with
                  the shorter quote the attribution floated mid-card and the two
                  names sat on different lines. flex + mt-auto on the figcaption
                  pins both to the bottom edge, so they align across the pair. */}
              {TESTIMONIALS.map((t) => (
                <motion.figure
                  key={t.name}
                  variants={fade}
                  className={`${CARD} mb-0 flex h-full flex-col p-5`}
                >
                  <blockquote
                    className={`${TEXT.base} ${MUTED} mb-3 border-0 p-0 not-italic leading-relaxed`}
                  >
                    {t.quote}
                  </blockquote>
                  {/* Name steps up to primary ink, role stays tertiary — the
                      attribution is the point now that these are real people. */}
                  <figcaption className="mt-auto">
                    <span className={`${TEXT.sm} ${INK} block font-medium`}>{t.name}</span>
                    {/* FAINT again now the card is white — #737373 is 4.74:1 on
                        white. It was MUTED for as long as these sat on the purple
                        WASH, where FAINT measured 4.4:1 and failed AA. */}
                    <span className={`${TEXT.sm} ${FAINT} block`}>{t.role}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </CanvasReveal>

      {/* ── Outside of work — the dark band ───────────────────────────────
          Same ground, padding and ink as ExperimentsLab, so the two pages'
          second halves are the same thing. This is what the sheet above
          reveals as it clips. */}
      <section className="relative px-6 pb-32 pt-28 md:pt-36">
        <div className={`${CONTAINER} mx-auto`}>
          <motion.div {...inView} variants={fade}>
            <h2 className={`${TEXT.title} ${DARK_INK} mb-6 font-medium leading-[1.25] tracking-tight`}>
              Outside of work
            </h2>

            {/* Copy and stat stack left, photo wall right. The left column is a
                flex column so the running card can be pinned to the bottom with
                mt-auto and its baseline lines up with the foot of the wall. */}
            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
              <div className="flex flex-col gap-3">
                <div
                  className={`${CARD_RADIUS} flex-1 border border-white/10 bg-white/[0.03] p-6 md:p-8`}
                >
                  <p className={`${TEXT.base} ${DARK_MUTED} mb-4 leading-relaxed`}>
                    I enjoy being outside. I find it helps me mentally unload, and it
                    throws up all sorts of thoughts and ideas along the way.
                  </p>
                  <p className={`${TEXT.base} ${DARK_MUTED} mb-0 leading-relaxed`}>
                    In particular I enjoy running, hiking and seeing the world —
                    travelling to places and trying my hardest to experience the real
                    culture of somewhere rather than the version put on for visitors.
                  </p>
                </div>

                <RunningCard km={runningKm} live={runningLive} />
              </div>

              <ImageWall />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
