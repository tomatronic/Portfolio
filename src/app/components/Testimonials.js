'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TESTIMONIALS = [
  {
    quote: "Tom hugely contributed to our project's on-time release — always available for questions, demos, and meetings when needed. His early involvement in design reviews meant issues were caught before QA, saving significant time. He also helped triage bug tickets, offering clear UX perspective on severity and priority right up to release day.",
    name: 'Project Manager',
  },
  {
    quote: "I just wanted to acknowledge the work you've done taking the initiative to redesign a core feature for scalability, and coordinating across teams to leverage that into new capabilities. Keep up the great work!",
    name: 'Senior Product Manager',
  },
]

export default function Testimonials() {
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
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">

          {/* Left: heading + sub-copy */}
          <div className="flex flex-col justify-start md:pt-4">
            <h2 className="mb-4 tracking-tight">
              What colleagues say.
            </h2>
            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              Collaboration is at the heart of my work. I aim to bridge the gap between design, engineering, and business goals.
            </p>
          </div>

          {/* Right: stacked cards */}
          <motion.div
            className="flex flex-col gap-6 md:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={container}
          >
            {TESTIMONIALS.map(({ quote, name }) => (
              <motion.figure
                key={name}
                variants={item}
                className="rounded-3xl bg-[#E4DDD2] px-8 pb-8 pt-5 dark:bg-white/[0.02] md:px-10 md:pb-10 md:pt-6"
              >
                <blockquote className="mb-6 border-none p-0 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                  &ldquo;{quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm font-normal text-slate-600 dark:text-slate-400">
                  {name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
