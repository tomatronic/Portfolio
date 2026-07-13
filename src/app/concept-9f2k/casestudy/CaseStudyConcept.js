'use client'

import Image from 'next/image'
import { DM_Sans } from 'next/font/google'
import { useTheme } from '../../components/ThemeProvider'

const dmSansBlack = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['900'],
})

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>")`

const NAV_HEIGHT = 96

export default function CaseStudyConcept() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const heroBg = dark ? '#0B0B1F' : '#818CF8'
  const heroFg = dark ? '#F5F0E8' : '#141414'
  const heroMuted = dark ? 'rgba(245,240,232,0.7)' : 'rgba(20,20,20,0.65)'
  const accent = dark ? '#818CF8' : '#4F46E5' // indigo standing in for the site's amber-600 accent throughout this concept

  return (
    <div>
      {/* Dev-only marker */}
      <div
        className="fixed bottom-4 right-4 z-50 rounded-full px-3 py-1.5 text-xs font-medium"
        style={{ background: dark ? 'rgba(245,240,232,0.14)' : 'rgba(20,20,20,0.08)', color: dark ? heroMuted : 'rgba(20,20,20,0.6)' }}
      >
        Concept — case study, partial mock only. Not linked anywhere.
      </div>

      {/* ── Bold hero block (color-block + huge caps, same language as the homepage concept) ── */}
      <div
        style={{
          background: heroBg,
          marginTop: `-${NAV_HEIGHT}px`,
          paddingTop: `${NAV_HEIGHT}px`,
        }}
        className="relative"
      >
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: GRAIN }} aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-16 md:pt-24">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: heroMuted }}
          >
            Rakuten Advertising &bull; Jan 2025 – Ongoing
          </p>
          <h1
            className={`${dmSansBlack.className} mb-3 uppercase leading-[0.85] tracking-[-0.04em] text-7xl md:text-8xl`}
            style={{ color: heroFg }}
          >
            Prompt
          </h1>
          <p
            className="mb-10 max-w-[520px] text-xl font-normal leading-snug"
            style={{ color: heroMuted }}
          >
            Natural Language Search &amp; AI
          </p>

          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/Prompt-hero.png"
              width={1600}
              height={927}
              alt="Natural language search interface for Rakuten Advertising custom reports"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* ── Calm body content — this is where a full-page color-block would fight readability across thousands of words, so it reverts to the site's real neutral system. Bold caps + accent color carry the identity through as landmarks instead. ── */}
      <div className="relative min-h-screen">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="rounded-b-4xl bg-zinc-50 p-8 pt-12 md:p-12 dark:bg-slate-900">

            <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
              <div className="md:col-span-4">
                <p>
                  Advertisers on Rakuten&apos;s platform create custom reports monthly — sometimes weekly — to track campaign performance across 170+ metrics. Building one manually meant 15–20 minutes of clicking through dropdowns and configuring data points. With 1,000+ active advertisers and dozens of account managers doing this regularly, the time loss was significant. It also landed on support when people couldn&apos;t figure out the interface.
                </p>
                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                  <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-semibold">Sole UX designer</span></p>
                  <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-semibold">UX/UI, User Research, Prototyping, User testing</span></p>
                </div>
              </div>
            </div>

            {/* Stat row — accent recolored to indigo for consistency with this concept */}
            <div className="mb-12 grid grid-cols-1 gap-8 rounded-2xl bg-[#EDE7DD] p-8 sm:grid-cols-3 md:p-10 dark:bg-slate-800/50">
              {[
                { stat: '90%', label: 'faster report creation, measured in Fullstory during beta' },
                { stat: '~$10M', label: 'annual time-saving potential at full adoption' },
                { stat: '1,000+', label: 'active advertisers with access from open beta' },
              ].map(({ stat, label }) => (
                <div key={stat}>
                  <p className="mb-1 text-4xl font-semibold tracking-tight" style={{ color: accent }}>{stat}</p>
                  <p className="mb-0 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
              <div className="col-span-4 mb-12">

                <h2
                  className={`${dmSansBlack.className} pt-10 uppercase tracking-[-0.02em]`}
                  style={{ color: accent, fontSize: '2rem' }}
                >
                  Challenge
                </h2>
                <p>
                  Natural language search features sound simple until you design one. The challenge wasn&apos;t just &ldquo;add a text box&rdquo;, it was building trust in automation while preserving user control in an area where data accuracy matters. Users want to make decisions based on these reports, meaning any search generated content needs to be verifiable and editable.
                  <br />
                  I needed to solve for:
                </p>
                <ul className="mb-8 space-y-2">
                  <li><b>Trust</b>: How will a user know that the search results accurately match the query, without expecting them to check against up to 170+ metrics?</li>
                  <li><b>Ambiguity</b>: How do we handle queries that are vague and could mean one of the many data points available?</li>
                  <li><b>Control vs. speed</b>: Power users want a quick way of performing time consuming tasks, new users want guidance, how can we offer both?</li>
                </ul>
                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                  <Image src="/Prompt-old2.png" width={1920} height={1142} alt="Original manual report builder showing the complex dropdown-based interface before natural language search" />
                </div>

                <p className="text-sm italic text-slate-500 dark:text-slate-500">
                  — concept cut short here; the same pattern (calm body, bold-caps indigo section headings as landmarks) would carry through Approach / Solution / Outcome.
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
