'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export default function AboutMeSection() {
  const prefersReducedMotion = useReducedMotion()

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 } },
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
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-6">

        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-[300px_1fr] md:gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
        >

          <motion.div variants={item} className="relative aspect-square w-full overflow-hidden rounded-2xl">
            <Image
              src="/meandcoffee.jpg"
              alt="Tom Spencer"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </motion.div>

          <motion.div variants={item} className="flex flex-col justify-center">
            <h2 className="mb-8 text-2xl font-normal leading-tight tracking-tight text-slate-950 dark:text-white md:text-3xl">
              A little about me
            </h2>
            <div className="mb-10 space-y-4 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              <p>
                I&apos;m a Senior Product Designer currently working at Rakuten Advertising, with 13+ years&apos; experience designing enterprise tools used by advertisers, analysts, and account teams.
              </p>
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
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
