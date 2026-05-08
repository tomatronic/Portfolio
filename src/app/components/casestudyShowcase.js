'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Lock } from 'lucide-react'
import CardImageStack from './CardImageStack'
import PasswordGate from './PasswordGate'

// ─── Image stack params ───────────────────────────────────────────────────────

const STACK_PARAMS = {
  restSpread:    80,
  hoverSpread:  130,
  restRotation:   3,
  hoverRotation:  0,
  imageSize:     37,
  spring: {
    type:     'easing',
    duration: 0.38,
    ease:     [0.22, 1, 0.36, 1],
  },
}

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    href:  '/casestudy/Prompt',
    title: 'Natural Language Search & AI',
    tags:  ['Enterprise UX', 'AI Search'],
    body:  'Designed a plain-English search tool used by 1,000+ advertisers, allowing users to generate reports without needing technical knowledge.',
    bullets: [
      { text: 'Reduced report creation time by ', highlight: '90%' },
      { text: 'Estimated ', highlight: '$10M annual time savings' },
      { text: 'Removed reliance on specialist support teams' },
    ],
    images: [
      '/prompt_1.png',
      '/prompt_2.png',
      '/prompt_3.png',
    ],
  },
  {
    href:  '/casestudy/ACJ',
    title: 'Multi-Touch Attribution for Affiliate',
    tags:  ['Data Visualisation', 'Decision Tools'],
    body:  'Devised a system that shows how different marketing channels contribute to a sale across up to 15 interactions.',
    bullets: [
      { text: 'Helped users understand complex customer journeys' },
      { text: 'Enabled publishers to clearly demonstrate their impact' },
      { text: 'Became a ', highlight: 'key differentiator in client pitches' },
    ],
    images: [
      '/acj_1.png',
      '/acj_2.png',
      '/acj_3.png',
    ],
  },
  {
    href:  '/casestudy/Rakuten',
    title: 'Offer Management Dashboard',
    tags:  ['UX Optimisation', 'Workflow Design'],
    body:  'Overhauled a complex and underperforming internal tool used to manage affiliate offers.',
    bullets: [
      { text: 'Simplified navigation and reduced user confusion' },
      { text: 'Lowered support ticket volume post-launch' },
      { text: 'Freed up account managers\' time from fielding queries' },
    ],
    images: [
      '/offer_1.png',
      '/offer_2.png',
      '/offer_3.png',
    ],
  },
  {
    href:   '/casestudy/InfluencerCampaigns',
    title:  'Influencer Campaign Platform',
    tags:   ['End-to-End Product Design'],
    body:   'Designed and delivered a full campaign management platform from concept to launch.',
    bullets: [
      { text: 'Prototype ready in ', highlight: '5 days' , suffix: ' for early validation' },
      { text: 'Shipped to production in ', highlight: '5 months' },
      { text: 'Enabled teams to plan, track, and manage influencer campaigns in one place' },
    ],
    images: [
      '/influencer_1.png',
      '/influencer_2.png',
      '/influencer_3.png',
    ],
    locked: true,
  },
]


// ─── Card ─────────────────────────────────────────────────────────────────────

function CardInner({ card, isHovered }) {
  const images = useMemo(
    () => card.images.map((src, i) => (
      <Image key={i} src={src} alt="" width={120} height={120}
        className="aspect-square w-full object-cover" />
    )),
    [card.images]
  )

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2">
      <div className="relative h-64 overflow-visible md:order-last md:h-auto md:min-h-[380px]">
        <CardImageStack images={images} isHovered={isHovered} params={STACK_PARAMS} />
      </div>
      <div className="relative grid grid-cols-1 content-center gap-4 px-8 py-8 md:px-0 md:py-10 md:pl-10 md:pr-8">
        {card.tags && (
          <div className="flex flex-wrap gap-2 -mb-2">
            {card.tags.map(tag => (
              <span key={tag} className="rounded-full border border-[#C8BEB0] px-2.5 py-0.5 text-xs font-normal text-slate-500 dark:border-[#2A3A4A] dark:text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="text-2xl font-normal tracking-tight text-slate-950 dark:text-white md:text-3xl">
          {card.title}
        </h2>
        <p className="mb-0 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
          {card.body}
        </p>
        {card.bullets && (
          <ul className="space-y-1.5 text-base font-normal text-slate-600 dark:text-slate-400">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                <span>{typeof b === 'string' ? b : <>{b.text}<strong className="font-semibold">{b.highlight}</strong>{b.suffix ?? ''}</>}</span>
              </li>
            ))}
          </ul>
        )}
        <p className="mb-0 mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400">
          {card.locked ? (
            <>
              <Lock size={13} strokeWidth={2.5} />
              <span>Password on request</span>
            </>
          ) : (
            <>
              Read case study
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </p>
      </div>
    </div>
  )
}

function Card({ card }) {
  const [isHovered, setIsHovered] = useState(false)
  const [showGate, setShowGate] = useState(false)

  const sharedClass = "group relative block rounded-2xl border border-[#C8BEB0] transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:border-[#2A3A4A] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)]"

  if (card.locked) {
    return (
      <>
        <div
          className={sharedClass + ' cursor-pointer'}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setShowGate(true)}
        >
          <CardInner card={card} isHovered={isHovered} />
        </div>
        {showGate && <PasswordGate href={card.href} onClose={() => setShowGate(false)} />}
      </>
    )
  }

  return (
    <Link
      href={card.href}
      className={sharedClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardInner card={card} isHovered={isHovered} />
    </Link>
  )
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export default function CasestudyShowcase() {
  return (
    <div id="work" className="py-24">
      <div className="container mx-auto max-w-6xl px-4">

        <div className="mb-16">
          <h2 className="text-3xl font-normal tracking-tight text-slate-950 dark:text-white md:text-4xl">
            Selected case studies
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          {CARDS.map(card => <Card key={card.href} card={card} />)}
        </div>

      </div>
    </div>
  )
}
