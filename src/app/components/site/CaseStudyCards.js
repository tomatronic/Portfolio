'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { TEXT, INK, ICON_CARD, CARD_RADIUS, CONTAINER } from './tokens'

/**
 * Image-forward case study tiles: a tinted card with the screenshot filling it,
 * title and one-line descriptor overlaid on a scrim at the bottom, arrow top
 * right. Same idea as the Shopify Design card used as reference.
 *
 * These are now the live home page's work cards.
 * components/casestudyShowcase.js is the previous design and is no longer
 * imported anywhere.
 *
 * `tint` is the light ground the screenshot sits on, picked to sit near the
 * Rakuten purple in the shots rather than introducing an unrelated hue. It has
 * to stay light: the scrim darkens the bottom to charcoal, and the contrast
 * between a pale top and a dark base is what gives the card its shape.
 */

const CARDS = [
  {
    href: '/casestudy/Prompt',
    title: 'Natural Language Search & AI',
    descriptor: 'Plain-English reporting for 1,000+ advertisers',
    metrics: ['90% faster report creation', 'Est. $10M annual time savings'],
    image: { src: '/report-generated.png', position: 'top' },
    tint: '#E6E0F5',
  },
  {
    href: '/casestudy/InfluencerCampaigns',
    title: 'Influencer Campaign Platform',
    descriptor: 'Concept to production in five months',
    metrics: ['Prototype in 5 days', 'Shipped in 5 months'],
    image: { src: '/view-campaign.png', position: 'top' },
    tint: '#F5E1EA',
  },
  {
    href: '/casestudy/ACJ',
    title: 'Multi-Touch Attribution for Affiliate',
    descriptor: 'How every channel contributes across 15 interactions',
    metrics: ['Clarified complex journeys', 'Key differentiator in pitches'],
    image: { src: '/touchpoints.png', position: 'top' },
    tint: '#DEE5F7',
  },
]

function Card({ card, isFirst }) {
  return (
    <Link href={card.href} className="group block">
      <div
        // Purple-tinted lift on hover, picking up the card tints and the Rakuten
        // UI rather than the site's usual amber shadow. transition-shadow, not
        // transition-all — the repo bans the latter.
        //
        // 3:2 from `md` up, matching the reference. Two of the three screenshots
        // are full-page captures (0.26 and 0.54 natural ratio), so a wide card
        // cropped them to a thin strip of header; the taller card shows more of
        // each and leaves the scrim room to sit under the text.
        //
        // Below `md` the card has NO fixed ratio and grows with its content —
        // see the layout note on the text block for why.
        className={`${CARD_RADIUS} relative w-full overflow-hidden ring-1 ring-black/10 shadow-[0_2px_10px_rgba(88,28,160,0.08)] transition-shadow duration-300 group-hover:shadow-[0_14px_44px_rgba(88,28,160,0.28)] motion-reduce:transition-none md:aspect-[3/2] dark:ring-white/10 dark:shadow-[0_2px_12px_rgba(120,60,200,0.25)] dark:group-hover:shadow-[0_20px_60px_rgba(155,105,240,0.55)]`}
        style={{ background: card.tint }}
      >
        {/* From `md`: inset on three sides and bleeding off the bottom, so
            there's no bottom edge for the scrim to collide with. The tint is
            light, which is what lets a light-UI screenshot sit on it cleanly.

            Below `md`: an in-flow 4:3 window with the text beneath it, so it
            needs a bottom edge and a full radius. 4:3 rather than 3:2 because
            the card no longer has to reserve room for an overlay. */}
        <div className="relative mx-6 mt-6 aspect-[4/3] overflow-hidden rounded-[8px] shadow-[0_8px_32px_rgba(41,41,41,0.18)] md:absolute md:inset-x-8 md:top-8 md:bottom-0 md:mx-0 md:mt-0 md:aspect-auto md:rounded-b-none">
          <Image
            src={card.image.src}
            alt={`${card.title} — product screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 896px"
            priority={isFirst}
            className="object-cover object-top"
          />
        </div>

        {/* Two stacked washes, mirroring how the reference builds its card scrim
            with ::before and ::after — done here as two background layers on one
            element, which is equivalent and avoids a pseudo-element.
              · top layer  (50% tall): the stronger ramp, carries the text
              · base layer (45% tall): a soft wash starting higher up
            The offset heights are the point: the softer layer begins above where
            the stronger one does, so there's no visible line where darkening
            starts. Multiplied together they reach ~75% at the base while staying
            almost imperceptible through the upper half. Reference uses pure
            black; these use #292929 to stay on our palette. */}
        <div
          // `md` and up only — below that the text sits on the tint, not on the
          // screenshot, so there is nothing for a scrim to do.
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            background: [
              'linear-gradient(#29292900 0%, #2929291a 22%, #29292942 44%, #29292970 66%, #29292994 84%, #292929ad 100%) bottom / 100% 50% no-repeat',
              'linear-gradient(#29292900 0%, #29292917 42%, #2929292e 76%, #29292938 100%) bottom / 100% 45% no-repeat',
            ].join(', '),
          }}
          aria-hidden="true"
        />

        <ArrowUpRight
          size={ICON_CARD}
          strokeWidth={1.75}
          className="absolute bottom-6 right-6 text-[#292929]/40 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#292929] motion-reduce:transition-none md:bottom-7 md:right-7 md:text-white/50 md:group-hover:text-white"
        />

        {/* Two layouts, not one layout that shrinks.
            · below `md`: in flow, under the image, on the card's own tint
            · `md` and up: absolutely positioned over the scrim

            The overlay cannot survive small widths. The block is content-height
            and the card was a fixed 3:2, so at 375px the text ran 191–250px
            inside a 205px card: titles were clipped off the top edge by the
            card's own overflow-hidden, and up to 172px of white type sat above
            the scrim on a bare, pale screenshot. Measured 2026-08-15.

            pr-10 keeps the metrics row clear of the arrow when it wraps. */}
        <div className="px-6 pt-5 pb-6 pr-10 md:absolute md:inset-x-8 md:bottom-7 md:px-0 md:pt-0 md:pb-0 md:pr-10">
          {/* Ink below `md`, white above it. The tint is a fixed light value in
              both themes, so the small-screen ink is fixed too — a `dark:`
              variant here would put pale text on a pale card. Above `md` the
              text is brighter than the route's usual dark-mode ink because it
              sits on a translucent scrim over a light screenshot, not an opaque
              surface: #B0B0B0 dropped to ~2.3:1 once the scrim was lightened. */}
          <h3
            className={`${TEXT.title} mb-1 font-medium leading-[1.25] tracking-tight text-[#292929] md:text-white`}
          >
            {card.title}
          </h3>
          <p className={`${TEXT.base} mb-0 text-[#5D5D5D] md:text-white/90`}>{card.descriptor}</p>

          {/* Slash-separated rather than dotted, from `md` up. The separator is
              dimmed so it divides without competing with the metrics either
              side of it.

              Below `md` there is not room for both metrics on one line, and a
              wrapped row left the slash dangling at the end of the first line.
              So they stack and the separator goes away: on their own lines the
              metrics are already divided. */}
          <div className="flex flex-col items-start gap-y-1 pt-3 md:flex-row md:flex-wrap md:items-center md:gap-x-2">
            {card.metrics.map((m, i) => (
              <Fragment key={m}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className={`${TEXT.sm} hidden text-[#292929]/35 md:inline md:text-white/35`}
                  >
                    /
                  </span>
                )}
                <span className={`${TEXT.sm} font-medium text-[#292929] md:text-white`}>{m}</span>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function CaseStudyCards() {
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 } },
  }
  const item = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <div id="work" className={`${CONTAINER} relative mx-auto pb-32`}>
      <h2 className={`${TEXT.title} ${INK} mb-8 font-medium leading-[1.25] tracking-tight`}>
        Case studies
      </h2>
      <motion.div
        className="flex flex-col gap-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
      >
        {CARDS.map((card, i) => (
          <motion.div key={card.href} variants={item}>
            <Card card={card} isFirst={i === 0} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
