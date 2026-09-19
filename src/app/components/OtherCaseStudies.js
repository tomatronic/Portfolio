'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CardImageStack from './CardImageStack'
import { LISTED_CASE_STUDIES } from '../lib/caseStudies'

const COMPACT_PARAMS = {
  restSpread:    16,
  hoverSpread:   40,
  restRotation:   4,
  hoverRotation:  0,
  imageSize:     65,
  transition: {
    duration: 0.38,
    ease:     [0.22, 1, 0.36, 1],
  },
}

const CARDS = LISTED_CASE_STUDIES.map(({ href, title, stack }) => ({ href, title, images: stack }))

function CompactCard({ card }) {
  const [isHovered, setIsHovered] = useState(false)

  const images = useMemo(
    () => card.images.map((src, i) => (
      <Image key={i} src={src} alt="" width={120} height={120}
        className="aspect-square w-full object-cover" />
    )),
    [card.images]
  )

  return (
    <Link
      href={card.href}
      replace
      // Purple lift on hover, matching components/site/CaseStudyCards.js so the
      // cards behave the same wherever they appear. Blur and alpha are scaled
      // down from the home tiles: the same 44px/0.28 under a ~110px-tall row
      // reads as a glow rather than a lift.
      className="group relative flex w-full items-center gap-6 rounded-2xl border border-[#292929]/10 dark:border-white/10 px-5 py-8 transition-shadow duration-200 hover:shadow-[0_10px_32px_rgba(88,28,160,0.20)] dark:hover:shadow-[0_12px_36px_rgba(155,105,240,0.42)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* data-flush: this card renders inside a case study's PROSE wrapper, which
          gives headings a bottom margin. Here the title is a centred flex item,
          so that margin pushes it off the card's vertical centre. */}
      <h3
        data-flush
        className="flex-1 truncate text-base tracking-tight text-slate-950 dark:text-white"
      >
        {card.title}
      </h3>
      <div className="relative mr-6 h-16 w-28 shrink-0 overflow-visible">
        <CardImageStack images={images} isHovered={isHovered} params={COMPACT_PARAMS} />
      </div>
    </Link>
  )
}

export default function OtherCaseStudies({ currentHref }) {
  const others = CARDS.filter(c => c.href !== currentHref)
  return (
    <div className="pt-12">
      <h2 className="mb-4 text-xl tracking-tight">Other case studies</h2>
      <div className="flex flex-col gap-3">
        {others.map(card => (
          <CompactCard key={card.href} card={card} />
        ))}
      </div>
    </div>
  )
}
