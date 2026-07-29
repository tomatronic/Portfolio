'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { TEXT, DARK_INK, DARK_MUTED, DARK_FAINT, ICON_CARD, CARD_RADIUS, CONTAINER } from './tokens'

// The weight-900 DM Sans that used to be loaded here is gone — with 24px as the
// largest size on the route there is nothing left for it to do, and dropping it
// removes a font weight the rest of the site never loads.

/**
 * Real side projects rather than filler — these are the things that actually
 * belong in a lab section.
 *
 * Give an entry an `image` and it renders a screenshot with a scrim; leave it
 * off and the tile falls back to its `tint` gradient as a placeholder. Job
 * Monitor is the only one with artwork so far.
 */
const EXPERIMENTS = [
  {
    title: 'Tarn',
    kind: 'iOS app',
    year: '2026',
    note: 'Peak-bagging for the UK fells — logging, maps, and a social feed.',
    ratio: '3 / 4',
    tint: 'linear-gradient(155deg, #1E3A5F 0%, #0B1B2E 100%)',
  },
  {
    title: 'Job Monitor',
    kind: 'Tooling',
    year: '2026',
    note: 'Scraping for new job opportunities based on keywords, then delivering jobs within a chrome extension, featuring a match rating against my own resume.',
    // 3/4 rather than 4/5 — the source is 868×1294 (0.67), so a taller tile
    // crops less of the extension UI.
    ratio: '3 / 4',
    image: '/job-monitor.png',
    tint: 'linear-gradient(160deg, #2A2440 0%, #0D0B16 100%)',
  },
  {
    title: 'Pulse',
    kind: 'SaaS',
    year: '2026',
    note: 'Affiliate performance monitoring with digest notifications.',
    ratio: '1 / 1',
    tint: 'linear-gradient(150deg, #3D2418 0%, #16100C 100%)',
  },
  {
    title: 'From My Window',
    kind: 'Live data toy',
    year: '2026',
    note: 'Pixel-art maritime viewer using real AIS ship positions that are truly visible from my office window.',
    // Native 1238×944. Matched exactly rather than forced to a stock ratio —
    // object-cover would otherwise crop the pixel art, and losing a ship or the
    // horizon line matters more here than a tidy number. Keep this in step if
    // the artwork is replaced again.
    ratio: '1238 / 944',
    image: '/mywindow.png',
    href: 'https://mywindow.tomspencer.design',
    tint: 'linear-gradient(160deg, #2B3A67 0%, #101828 55%, #3A2E4F 100%)',
  },
  {
    title: 'Hayku',
    kind: 'SaaS',
    year: '2025',
    note: 'Scheduling and booking for independent UK wellness practitioners.',
    ratio: '4 / 3',
    tint: 'linear-gradient(145deg, #1C3A34 0%, #0A1614 100%)',
  },
]

// Wraps a tile in a link only when it has somewhere to go. Keeps the non-linked
// tiles as plain markup rather than dead anchors.
function TileShell({ href, title, children }) {
  if (!href) return children
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      aria-label={`${title} — open project`}
      className="block rounded-[16px]"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

const tile = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function ExperimentsLab() {
  return (
    <section className="relative px-6 pb-32 pt-28 md:pt-36">
      <div className={`${CONTAINER} mx-auto`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <h2 className={`${TEXT.title} ${DARK_INK} mb-3 font-medium leading-[1.25] tracking-tight`}>
            Experiments &amp; Lab
          </h2>
          <p className={`${TEXT.base} ${DARK_MUTED} max-w-[52ch] leading-relaxed`}>
            Side projects, half baked ideas and AI exploration. The following
            projects demonstrate additional capabilities and are in varying states.
          </p>
        </motion.div>

        {/* Caps at 3 columns, not 4: five tiles across four left the third column
            ending early with dead space under it. Three flows 2/2/1. */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="columns-1 gap-4 sm:columns-2 lg:columns-3"
        >
          {EXPERIMENTS.map((item) => (
            <motion.article
              key={item.title}
              variants={tile}
              className="group mb-10 break-inside-avoid transition-transform duration-300 hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none"
            >
              {/* Only tiles with an `href` become links. The rest are static —
                  the arrow is decorative on those until they have somewhere to
                  go, so it's hidden from assistive tech there. */}
              <TileShell href={item.href} title={item.title}>
              <div
                className={`${CARD_RADIUS} relative w-full overflow-hidden ring-1 ring-white/10`}
                style={{ aspectRatio: item.ratio, background: item.tint }}
              >
                {item.image && (
                  <>
                    <Image
                      src={item.image}
                      alt={`${item.title} — screenshot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                    {/* Same two-layer scrim as the case study cards — needed here
                        because the screenshot is bright, unlike the gradient
                        placeholders which are dark enough on their own. */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: [
                          'linear-gradient(#29292900 0%, #2929291a 22%, #29292942 44%, #29292970 66%, #29292994 84%, #292929ad 100%) bottom / 100% 50% no-repeat',
                          'linear-gradient(#29292900 0%, #29292917 42%, #2929292e 76%, #29292938 100%) bottom / 100% 45% no-repeat',
                        ].join(', '),
                      }}
                      aria-hidden="true"
                    />
                  </>
                )}

                <div className="absolute inset-0 flex items-end justify-between gap-3 p-5">
                  <span className="block">
                    {/* Tiles still on a gradient placeholder say so, rather than
                        leaving an empty panel that reads as a loading failure. */}
                    {!item.image && (
                      <span className={`${TEXT.sm} mb-1 block font-medium text-[#F2F2F2]/55`}>
                        Coming soon…
                      </span>
                    )}
                    <span className={`${TEXT.title} ${DARK_INK} block font-medium leading-[1.25] tracking-tight`}>
                      {item.title}
                    </span>
                  </span>
                  {/* Arrow only where there's a link — on the placeholder tiles
                      it was promising an interaction that doesn't exist. */}
                  {item.href && (
                    <ArrowUpRight
                      size={ICON_CARD}
                      strokeWidth={1.75}
                      className="shrink-0 translate-y-0.5 text-[#F2F2F2]/70 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F2F2F2] motion-reduce:transition-none"
                    />
                  )}
                </div>
              </div>
              </TileShell>

              <div className="flex items-baseline justify-between gap-3 px-1 pt-3">
                <span className={`${TEXT.base} ${DARK_MUTED} font-medium`}>{item.kind}</span>
                <span className={`${TEXT.xs} ${DARK_FAINT} tabular-nums`}>{item.year}</span>
              </div>
              <p className={`${TEXT.sm} ${DARK_FAINT} px-1 pt-1 leading-relaxed`}>
                {item.note}
              </p>
            </motion.article>
          ))}
        </motion.div>

      </div>

    </section>
  )
}
