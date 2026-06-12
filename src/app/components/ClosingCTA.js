import { Mail, Linkedin } from 'lucide-react'

export default function ClosingCTA() {
  return (
    <section className="pb-28 pt-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">

          <h2 className="mb-4 text-3xl font-normal leading-tight tracking-tight text-slate-950 dark:text-white md:text-4xl">
            Looking for a senior product designer?
          </h2>

          <p className="mb-10 max-w-xl text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
            I&apos;m currently open to new roles. If you&apos;re building complex, data-heavy products that need to feel simple, I&apos;d love to hear about it.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:tom.m.spencer@gmail.com?subject=Senior product designer role"
              className="inline-flex items-center gap-2 rounded-full bg-accent-600 px-5 py-2.5 text-sm font-normal text-white transition-colors hover:bg-accent-800 dark:bg-accent-400 dark:text-slate-950 dark:hover:bg-accent-300"
            >
              <Mail size={15} strokeWidth={2.5} />
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/thomas-spencer/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950/[0.07] px-5 py-2.5 text-sm font-normal text-slate-950 transition-colors hover:bg-accent-600 hover:text-white dark:bg-white/10 dark:text-slate-200 dark:hover:bg-accent-600 dark:hover:text-white"
            >
              <Linkedin size={15} strokeWidth={2} />
              Connect on LinkedIn
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
