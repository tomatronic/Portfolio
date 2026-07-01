'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

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
    image: { src: '/report-generated.png', position: 'top' },
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
    image: { src: '/view-campaign.png', position: 'top' },
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
    image: { src: '/touchpoints.png', position: 'top' },
  },
  {
    href:  '/casestudy/Rakuten',
    title: 'Offer Management Dashboard',
    body:  'Overhauled a complex and underperforming internal tool used to manage affiliate offers.',
    bullets: [
      { text: 'Simplified navigation and reduced user confusion' },
      { text: 'Lowered support ticket volume post-launch' },
      { text: "Freed up account managers' time from fielding queries" },
    ],
    image: { src: '/offer_2.png', position: 'top' },
  },
]

// ─── Card ─────────────────────────────────────────────────────────────────────

function Card({ card, isFirst }) {
  return (
    <Link
      href={card.href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#DDD4C8] transition-shadow duration-200 hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:bg-slate-900 dark:ring-[#2A3A4A] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)] md:flex-row"
    >
      {/* ── Image — padded, inset, rounded ─────────────────────── */}
      <div className="shrink-0 bg-white p-5 dark:bg-slate-800/50 md:w-[46%] md:p-8">
        <div
          className="relative w-full overflow-hidden rounded-xl shadow-[0_2px_16px_rgba(15,22,35,0.10)] ring-1 ring-black/10 dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)] dark:ring-white/10"
          style={{ aspectRatio: '4/3' }}
        >
          <Image
            src={card.image.src}
            alt={`${card.title} — product screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, 46vw"
            priority={isFirst}
            className="object-cover"
            style={{ objectPosition: card.image.position }}
          />
        </div>
      </div>

      {/* ── Text ───────────────────────────────────────────────── */}
      <div className="flex flex-col justify-center gap-5 p-8 md:w-[54%] md:p-10">

        <h2 className="text-balance text-2xl font-normal tracking-tight text-slate-950 dark:text-white md:text-3xl">
          {card.title}
        </h2>

        <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
          {card.body}
        </p>

        <ul className="space-y-2">
          {card.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm font-normal text-slate-600 dark:text-slate-400">
              <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
              <span>
                {typeof b === 'string'
                  ? b
                  : <>{b.text}<strong className="font-semibold text-slate-950 dark:text-white">{b.highlight}</strong>{b.suffix ?? ''}</>}
              </span>
            </li>
          ))}
        </ul>

        <p className="mb-0 inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400">
          Read case study
          <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </p>

      </div>
    </Link>
  )
}

// ─── Showcase ─────────────────────────────────────────────────────────────────

export default function CasestudyShowcase() {
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
    <div id="work" className="pb-24 pt-10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="rounded-4xl bg-[#C4B09A] p-4 dark:bg-[#0D1927] md:p-5">
          <motion.div
            className="flex flex-col gap-4"
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
      </div>
    </div>
  )
}
