'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutMeSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:gap-16">

          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl md:aspect-auto">
            <Image
              src="/bio.png"
              alt="Tom Spencer"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="mb-8 text-3xl font-normal leading-tight tracking-tight text-slate-950 dark:text-white md:text-4xl">
              What I actually do
            </h2>
            <div className="mb-10 space-y-4 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                I&apos;m a Senior UX Designer currently working at Rakuten Advertising, with 8+ years&apos; experience designing enterprise tools used by advertisers, analysts, and account teams. Here&apos;s what my work looks like on a day-to-day basis:
              </p>
              <ul className="space-y-2">
                {[
                  'Designing dashboards, search tools, and reporting systems that simplify large, complex datasets',
                  'Reducing time-to-decision for users working under pressure',
                  'Translating technical systems (e.g. attribution models, campaign tracking) into clear, usable interfaces',
                  'Running research and testing to validate ideas early and avoid costly mistakes',
                  'Working closely with product managers and developers to create usable solutions',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>
                My approach prioritises outcome, resulting in fewer support tickets, faster workflows, and happier, more decisive users.
              </p>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-600 dark:text-accent-400"
            >
              More about me
              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
