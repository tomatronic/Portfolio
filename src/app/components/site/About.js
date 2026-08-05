'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '../ThemeProvider'
import Nav from './Nav'
import Footer from './Footer'
import ImageWall from './ImageWall'
import PoweredByStrava from './PoweredByStrava'
import {
  TEXT,
  INK,
  MUTED,
  FAINT,
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

const PRACTICAL = [
  'Simplifying dashboards and reporting tools',
  'Designing search experiences that don’t require technical knowledge',
  'Making complex concepts (like marketing attribution) clear and usable',
  'Reducing reliance on support teams by improving usability',
]

const VALUE = [
  {
    title: '8+ years in enterprise UX',
    body: 'Designing enterprise UX for data-heavy products, with experience across product design and user behaviour.',
  },
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
 * Placeholder distance, used only until the Strava credentials are set — see
 * `lib/strava.js`. Replace it with a real figure or wire Strava up before this
 * goes live; it is a made-up number, not Tom's.
 */
const FALLBACK_KM = 1234

function RunningCard({ km, live }) {
  return (
    // flex-1 + justify-between: the card grows to take its share of the column,
    // and the figure sits at the foot of whatever height that turns out to be.
    <div
      className={`${CARD_RADIUS} flex flex-1 flex-col justify-between border border-[#292929]/10 p-6 md:p-8 dark:border-white/10`}
    >
      <p className={`${TEXT.xs} ${FAINT} mb-8 font-medium`}>Running</p>
      <div>
        <p
          className={`${TEXT.title} ${INK} mb-1 font-medium leading-none tracking-tight tabular-nums`}
        >
          {km.toLocaleString('en-GB')}
          <span className={`${TEXT.base} ${FAINT} ml-1.5 font-normal`}>km</span>
        </p>
        <p className={`${TEXT.xs} ${FAINT} mb-0`}>ran in the last 365 days</p>
        {/* Only shown against a live figure — the fallback isn't Strava's data,
            so attributing it to them would be a false claim. Not a link: it
            used to point at Tom's athlete page, but Strava gates profiles
            behind a login wall, so signed-out visitors only got a prompt. */}
        {live && <PoweredByStrava className="mt-4 block h-3 w-auto text-black dark:text-white" />}
      </div>
    </div>
  )
}

export default function About({ running = null }) {
  const runningKm = running?.km ?? FALLBACK_KM
  const runningIsLive = Boolean(running)
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

      {/* px-6 sits outside the container, not on it — the same pattern as the
          lab section and footer. With the padding on the container itself the
          content measured 848px against home's 896px, so the two pages didn't
          line up. */}
      <div style={{ background: sheetBg }} className="px-6">
        <div className={`${CONTAINER} mx-auto`}>
          <Nav active="About" />
        </div>

        <div className={`${CONTAINER} mx-auto pb-28 pt-8`}>
          {/* ── Lead ─────────────────────────────────────────────── */}
          <motion.div initial="hidden" animate="visible" variants={fade}>
            <p className={`${TEXT.sm} ${FAINT} mb-3 font-medium`}>About</p>
            <h1
              className={`${TEXT.title} ${INK} mb-12 max-w-[46ch] text-balance font-medium leading-[1.35] tracking-tight`}
            >
              I design complex software so it feels easy to use — especially where
              people rely on data to make fast, high-impact decisions.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_300px] md:gap-14">
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
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
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
              className={`${CARD_RADIUS} relative aspect-[3/4] w-full overflow-hidden ring-1 ring-[#292929]/10 dark:ring-white/10`}
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
                  // Last card spans both columns when the count is odd, so the
                  // grid doesn't end on a ragged half-row.
                  className={`${CARD_RADIUS} border border-[#292929]/10 p-5 transition-shadow duration-300 hover:shadow-[0_8px_28px_rgba(41,41,41,0.08)] motion-reduce:transition-none dark:border-white/10 dark:hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)] ${
                    i === arr.length - 1 && arr.length % 2 !== 0 ? 'sm:col-span-2' : ''
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
                  className={`${CARD_RADIUS} mb-0 flex h-full flex-col border border-[#292929]/10 p-5 dark:border-white/10`}
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
                    <span className={`${TEXT.sm} ${FAINT} block`}>{t.role}</span>
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Outside of work ──────────────────────────────────── */}
          <motion.div {...inView} variants={fade} className="mt-24">
            <h2 className={`${TEXT.title} ${INK} mb-6 font-medium leading-[1.25] tracking-tight`}>
              Outside of work
            </h2>

            {/* Copy and stat stack left, photo wall right. The left column is a
                flex column so the running card can be pinned to the bottom with
                mt-auto and its baseline lines up with the foot of the wall. */}
            <div className="grid grid-cols-1 items-stretch gap-3 lg:grid-cols-2">
              <div className="flex flex-col gap-3">
                <div
                  className={`${CARD_RADIUS} flex-1 border border-[#292929]/10 p-6 md:p-8 dark:border-white/10`}
                >
                  <p
                    className={`${TEXT.base} mb-4 leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]`}
                  >
                    I enjoy being outside. I find it helps me mentally unload, and it
                    throws up all sorts of thoughts and ideas along the way.
                  </p>
                  <p
                    className={`${TEXT.base} mb-0 leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]`}
                  >
                    In particular I enjoy running, hiking and seeing the world —
                    travelling to places and trying my hardest to experience the real
                    culture of somewhere rather than the version put on for visitors.
                  </p>
                </div>

                <RunningCard km={runningKm} live={runningIsLive} />
              </div>

              <ImageWall />
            </div>
          </motion.div>

        </div>
      </div>

      <div style={{ background: REVEAL_BG }}>
        <Footer />
      </div>
    </div>
  )
}
