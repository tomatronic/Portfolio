'use client'

import { ArrowUpRight } from 'lucide-react'
import { TEXT, INK, FAINT, ICON_NAV, BUTTON_RADIUS, CONTAINER } from './tokens'
import CaseStudyCards from './CaseStudyCards'

// Both open in a new tab, so there's no `external` flag any more — it only
// existed to special-case the mailto link that's now gone.
const LINKS = [
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/thomas-spencer/' },
]

// Inline link inside body copy — underlined, stepped up to primary ink so it
// separates from the muted body around it.
function InlineLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${INK} font-normal underline decoration-[#292929]/30 underline-offset-2 transition-colors hover:decoration-[#292929] dark:decoration-[#F2F2F2]/30 dark:hover:decoration-[#F2F2F2]`}
    >
      {children}
    </a>
  )
}

export default function Hero() {
  return (
    <div>
      {/* No px-6 here — CanvasReveal's --canvas-gutter is the side spacing, and
          doubling up squeezes the content below its natural width on mobile. */}
      {/* Gaps were inverted: 128px above the intro vs 80px below it, so the
          section break was smaller than the nav gap and the two sections ran
          together. Now 96 above / 144 below — the break is the larger space. */}
      <div id="about" className={`${CONTAINER} relative mx-auto pb-36 pt-12 md:pt-16`}>
        <div className="max-w-[560px]">
          {/* Name and role are the same 24px and sit flush as one stacked block.
              Only colour separates them — the whole point of the scale. */}
          <h1 className={`${TEXT.title} ${INK} font-bold leading-[1.25] tracking-tight`}>
            Tom Spencer
          </h1>
          <p className={`${TEXT.title} ${FAINT} mb-8 font-normal leading-[1.25] tracking-tight`}>
            Senior Product Designer
          </p>

          {/* Sized and coloured on the <p> children directly: globals.css styles
              the `p` element itself, and an element rule beats anything inherited
              from this wrapper. Paragraph spacing is globals' own mb-4, so no
              space-y here — the two fought and cancelled out. */}
          {/* Written out in full rather than interpolated from TEXT/MUTED:
              Tailwind only emits classes it finds as complete literals in the
              source, so a runtime-assembled `[&>p]:${TEXT.base}` produces nothing. */}
          <div className="mb-10 [&>p:last-child]:mb-0 [&>p]:text-[14px] [&>p]:leading-relaxed [&>p]:text-[#5D5D5D] dark:[&>p]:text-[#B0B0B0]">
            <p>
              Thirteen years designing software, currently at{' '}.
              <InlineLink href="https://rakutenadvertising.com">
                Rakuten Advertising
              </InlineLink>{' '}
              I design enterprise tools used by advertisers, publishers, analysts, and
              account teams, working with large datasets, detailed reporting, and
              multi-step workflows.
            </p>
            <p>
              I design for outcomes: fewer support tickets, faster
              workflows, and happier, more decisive users.
            </p>
            <p>
              I&apos;m based in Brighton, UK and currently open to new roles — if
              you think we&apos;d be a match,{' '}
              {/* Weight change on hover shifts the text metrics, so the sentence
                  would reflow under the cursor. The invisible bold twin below
                  reserves the wider width up front and keeps it still. */}
              <a
                href="mailto:tom.m.spencer@gmail.com"
                className={`${INK} group relative inline-grid underline decoration-dashed decoration-[#292929]/40 underline-offset-4 transition-colors hover:decoration-[#292929] dark:decoration-[#F2F2F2]/40 dark:hover:decoration-[#F2F2F2]`}
              >
                <span aria-hidden="true" className="invisible col-start-1 row-start-1 font-medium">
                  please get in touch
                </span>
                <span className="col-start-1 row-start-1 group-hover:font-medium">
                  please get in touch
                </span>
              </a>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${TEXT.sm} ${BUTTON_RADIUS} inline-flex items-center gap-1.5 bg-[#292929]/[0.06] px-3.5 py-2 font-medium text-[#5D5D5D] transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96] dark:bg-white/10 dark:text-[#B0B0B0] dark:hover:bg-accent-600 dark:hover:text-white`}
              >
                {link.label}
                <ArrowUpRight size={ICON_NAV} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <CaseStudyCards />
    </div>
  )
}
