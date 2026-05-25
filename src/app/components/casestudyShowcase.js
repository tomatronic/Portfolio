'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Lock } from 'lucide-react'
import PasswordGate from './PasswordGate'

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  {
    href:  '/casestudy/Prompt',
    title: 'Natural Language Search & AI',
    body:  'Designed a plain-English search tool used by 1,000+ advertisers, allowing users to generate reports without needing technical knowledge.',
    bullets: [
      { text: 'Reduced report creation time by ', highlight: '90%' },
      { text: 'Estimated ', highlight: '$10M annual time savings' },
      { text: 'Removed reliance on specialist support teams' },
    ],
    images: [{ src: '/report-generated.png', scale: 1.005 }, '/saved-reports.png'],
  },
  {
    href:   '/casestudy/InfluencerCampaigns',
    title:  'Influencer Campaign Platform',
    body:   'Designed and delivered a full campaign management platform from concept to launch.',
    bullets: [
      { text: 'Prototype ready in ', highlight: '5 days', suffix: ' for early validation' },
      { text: 'Shipped to production in ', highlight: '5 months' },
      { text: 'Enabled teams to plan, track, and manage influencer campaigns in one place' },
    ],
    images: ['/view-campaign.png', { src: '/influencer_2.png', position: 'bottom' }],
    locked: true,
  },
  {
    href:  '/casestudy/ACJ',
    title: 'Multi-Touch Attribution for Affiliate',
    body:  'Devised a system that shows how different marketing channels contribute to a sale across up to 15 interactions.',
    bullets: [
      { text: 'Helped users understand complex customer journeys' },
      { text: 'Enabled publishers to clearly demonstrate their impact' },
      { text: 'Became a ', highlight: 'key differentiator in client pitches' },
    ],
    images: ['/touchpoints.png', '/acj_2.png'],
  },
  {
    href:  '/casestudy/Rakuten',
    title: 'Offer Management Dashboard',
    body:  'Overhauled a complex and underperforming internal tool used to manage affiliate offers.',
    bullets: [
      { text: 'Simplified navigation and reduced user confusion' },
      { text: 'Lowered support ticket volume post-launch' },
      { text: 'Freed up account managers\' time from fielding queries' },
    ],
    images: ['/offer_2.png', '/offer_1.png'],
  },
]

// ─── Card inner ───────────────────────────────────────────────────────────────

function CardInner({ card }) {
  return (
    <div className="p-4 md:p-5">

      {/* Two images */}
      <div className="mb-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {card.images.map((img, i) => {
          const src = typeof img === 'string' ? img : img.src
          const position = typeof img === 'string' ? 'top' : (img.position ?? 'top')
          const scale = typeof img === 'string' ? 1 : (img.scale ?? 1)
          return (
            <div key={i} className="relative overflow-hidden rounded-xl bg-[#EDE7DD] ring-1 ring-[rgba(15,22,35,0.12)] dark:bg-slate-800/50 dark:ring-[rgba(255,255,255,0.12)]">
              <div className="aspect-[4/3]">
                <Image src={src} alt="" fill className="object-cover" style={{ objectPosition: position, transform: `scale(${scale})` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Text: title+body+CTA left, bullets right */}
      <div className="px-2 pb-2 pt-1 md:px-4 md:pb-4">

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <h2 className="mb-3 text-2xl font-normal tracking-tight text-slate-950 dark:text-white">
            {card.title}
          </h2>
          <p className="mb-5 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            {card.body}
          </p>
          <p className="mb-0 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400">
            {card.locked ? (
              <><Lock size={13} strokeWidth={2.5} /><span>Password on request</span></>
            ) : (
              <>Read case study<ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" /></>
            )}
          </p>
        </div>

        {card.bullets && (
          <ul className="space-y-2.5 text-base font-normal text-slate-600 dark:text-slate-400 md:pt-1">
            {card.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                <span>
                  {typeof b === 'string'
                    ? b
                    : <>{b.text}<strong className="font-semibold">{b.highlight}</strong>{b.suffix ?? ''}</>}
                </span>
              </li>
            ))}
          </ul>
        )}

        </div>
      </div>
    </div>
  )
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────

function Card({ card }) {
  const [showGate, setShowGate] = useState(false)

  const sharedClass = "group relative block rounded-2xl border border-[#C8BEB0] transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:border-[#2A3A4A] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)]"

  if (card.locked) {
    return (
      <>
        <div className={sharedClass + ' cursor-pointer'} onClick={() => setShowGate(true)}>
          <CardInner card={card} />
        </div>
        {showGate && <PasswordGate href={card.href} onClose={() => setShowGate(false)} />}
      </>
    )
  }

  return (
    <Link href={card.href} className={sharedClass}>
      <CardInner card={card} />
    </Link>
  )
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export default function CasestudyShowcase() {
  return (
    <div id="work" className="pb-24 pt-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-14">
          {CARDS.map(card => <Card key={card.href} card={card} />)}
        </div>
      </div>
    </div>
  )
}
