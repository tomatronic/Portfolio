'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { playCue } from '../../lib/sound'
import ThemeToggle from './ThemeToggle'
import { TEXT, INK, MUTED, BUTTON_RADIUS } from './tokens'

// Confetti burst, ported from the confetti-demo prototype. Particles spread
// evenly around a full circle with a little angular jitter, then fade and
// shrink outward. Ink-scale colours, picked per theme at burst time — the site
// has no colour accent (amber was retired 2026-09-19), and a dark-grey burst
// would vanish on the navy sheet.
const PARTICLE_COLOURS = {
  light: ['#292929', '#5D5D5D', '#8A8A8A'],
  dark: ['#F2F2F2', '#B0B0B0', '#8A8A8A'],
}
const BURST_ON_CLICK = 10
const BURST_ON_HOVER = 5

/**
 * Concept-route nav: one bordered pill holding every item as plain text.
 *
 * No wordmark, no icon, and Resume gets no special treatment — it's a text item
 * like the rest, which is what lets the pill read as a single unbroken control.
 *
 * This is now the site's only nav — layout.js renders it via SiteChrome on
 * routes that don't render it themselves. components/navigation.js is the
 * previous design and no longer imported anywhere.
 *
 * Active state is primary ink against muted siblings, plus a 1px underline
 * that the other items grow in on hover.
 */

// Absolute paths, not bare hashes — the nav renders on both the concept home
// and the concept About page, so `#work` alone would dead-end on About.
//
// No "Home" item: the avatar is the home affordance, which is the convention
// and keeps the pill down to the three real destinations.
const ITEMS = [
  { label: 'Work', href: '/#work' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume.pdf', external: true },
]

export default function Nav({ active = 'Home' }) {
  const avatarRef = useRef(null)
  const reduceMotion = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      reduceMotion.current = mq.matches
    }
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const burst = useCallback((count) => {
    const host = avatarRef.current
    if (!host || reduceMotion.current) return

    const colours = PARTICLE_COLOURS[document.documentElement.classList.contains('dark') ? 'dark' : 'light']
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('i')
      Object.assign(particle.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        pointerEvents: 'none',
        background: colours[i % colours.length],
      })
      host.appendChild(particle)

      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.8
      const distance = 26 + Math.random() * 14
      const x = Math.cos(angle) * distance
      const y = Math.sin(angle) * distance

      particle.animate(
        [
          { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
          {
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(0.3)`,
            opacity: 0,
          },
        ],
        { duration: 450 + Math.random() * 250, easing: 'cubic-bezier(0.2, 0, 0, 1)' }
      ).onfinish = () => particle.remove()
    }
  }, [])

  const handleClick = useCallback(() => {
    burst(BURST_ON_CLICK)
    playCue('success')
  }, [burst])

  return (
    // From 480px up: three zones, so the pill stays centred on the container
    // axis regardless of how wide the side zones are — with justify-between it
    // would drift whenever left and right differ in width.
    //
    // Below 480px: two rows, pill underneath. Squeezed onto one row the pill
    // wrapped internally and Resume dropped to a second line — one control
    // becoming a two-line blob. A row of its own means it always has the full
    // measure, and the break is a deliberate layout rather than a flex accident.
    //
    // 480 is set by measurement, not by Tailwind's breakpoints. On the 16px type
    // scale the pill needs 259.3px, so one row needs 259.3 + 44 avatar + 44
    // toggle + 32 grid gaps + 48 page padding = 428px. The threshold sits above
    // that with headroom, and clear of 428/430 — both real iPhone widths, and a
    // bad place to put a boundary. Every phone stacks; tablets up get one row.
    //
    // This moves with the type scale: it was 420 when the base was 14px. If the
    // scale changes again, re-measure the pill rather than assuming.
    <nav className="relative z-50 grid grid-cols-2 items-center gap-x-4 gap-y-5 py-8 min-[480px]:grid-cols-[1fr_auto_1fr] min-[480px]:gap-y-0">
      {/* Particles mount here, not on the inner span — that one is
          overflow-hidden to clip the avatar into a circle, which would clip the
          burst too. `relative` gives them a positioning context. */}
      <Link
        ref={avatarRef}
        href="/"
        aria-label="Tom Spencer — home"
        aria-current={active === 'Home' ? 'page' : undefined}
        onPointerEnter={() => burst(BURST_ON_HOVER)}
        onClick={handleClick}
        className="group relative col-start-1 row-start-1 justify-self-start"
      >
        {/* Neutral ring only — no accent on hover or active state. The greyscale
            to colour shift and a small anticlockwise twist are the hover feedback.
            The rotation goes on this span rather than the image: the image carries
            its own scaleX(-1) inline, and a second transform on the same element
            would replace it and un-mirror the face. */}
        {/* z-10 puts the avatar above the particles so the burst appears to come
            out from behind it. Particles are appended after this span in the DOM,
            so without an explicit z-index they'd paint on top. */}
        <span className="relative z-10 block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#292929]/12 transition-transform duration-300 group-hover:-rotate-2 active:scale-[0.96] motion-reduce:transition-none dark:ring-white/15">
          {/* Mirrored so the face turns toward the page rather than away from
              it. Set inline, not via a Tailwind scale utility — neither
              `scale-x-[-1]` nor `-scale-x-100` emitted a rule in this project's
              build, so the class was present but did nothing.
              Greyscale at rest, full colour on hover. */}
          <Image
            src="/just_me.webp"
            alt=""
            fill
            sizes="44px"
            style={{ transform: 'scaleX(-1)' }}
            className="object-cover grayscale transition-[filter] duration-300 group-hover:grayscale-0 motion-reduce:transition-none"
          />
        </span>
      </Link>

      {/* Spans both columns on its own row below 480px, then returns to the
          middle column of the three-column grid. flex-wrap stays as a last-resort
          valve so an overflow can never force a horizontal scroll, which this
          repo bans — but with a full row to itself it no longer fires. */}
      {/* py-1.5, not py-3.5: the items below each claim a 44px-tall box, so the
          pill's own vertical padding came off to absorb them. 44 + 12 = 56px
          against the old 27 + 28 = 55, i.e. the pill keeps its height to within
          a pixel while every target inside it doubles. Horizontal padding and
          gap are untouched, so the 259.3px pill width the 480px threshold above
          is derived from still holds. */}
      <div
        className={`${BUTTON_RADIUS} col-span-2 row-start-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 justify-self-center border border-[#292929]/12 bg-white px-7 py-1.5 dark:border-white/12 dark:bg-white/[0.04] min-[480px]:col-span-1 min-[480px]:col-start-2 min-[480px]:row-start-1`}
      >
        {ITEMS.map((item) => {
          const isActive = active === item.label
          // Hierarchy by colour, from the ink scale: the active item is primary
          // ink, the others muted and stepping up to ink on hover. Nothing
          // here is amber any more. Same weight on both, so the pill's measured
          // 259.3px width (see the 480px note above) is untouched.
          const tone = isActive
            ? INK
            : `${MUTED} hover:text-[#292929] dark:hover:text-[#F2F2F2]`

          // min-h-11 is the whole fix for the 27px-tall targets the Aug 2026
          // review flagged (finding 08): the text box is 27px on the 16px scale,
          // which clears WCAG 2.5.8's 24px floor but sits well under the 44px
          // both platform guidance and this repo's own convention ask of nav.
          // inline-flex + items-center is what lets the label sit centred in the
          // taller box rather than at its top.
          //
          // Height only. Widths stay as the labels set them (Work is the
          // narrowest at 39px) — they are well clear of the 24px minimum, and
          // padding them out to 44 would widen the pill and invalidate the
          // measured 259.3px the breakpoint above depends on.
          //
          // `group` is for the underline on the label span below.
          const className = `${TEXT.base} ${tone} group inline-flex min-h-11 items-center font-medium transition-colors`

          // The hover cue, now that there is no accent colour to change to
          // (2026-09-19): a 1px rule under the label that grows from the left
          // on hover and is already there on the active item. It lives on a
          // span around the label, not the link — the link is a 44px-tall box
          // and a rule at its bottom edge would float 10px under the text. On
          // its own line box the rule sits 2px below the text's descender.
          // bg-current, so it takes whatever ink the label has at the time,
          // including mid-transition. The site's own ease; motion-reduce
          // snaps. It is a transform, not a width change, so the label never
          // reflows and the pill's measured width can't move.
          const label = (
            <span
              className={`relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100 motion-reduce:after:transition-none ${isActive ? 'after:scale-x-100' : ''}`}
            >
              {item.label}
            </span>
          )

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={className}
            >
              {label}
            </Link>
          )
        })}
      </div>

      {/* Right zone — the theme toggle, moved here from the footer. Balances the
          avatar opposite it and keeps the grid's 1fr/auto/1fr symmetry, so the
          pill stays on the container's true centre. */}
      <div className="col-start-2 row-start-1 justify-self-end min-[480px]:col-start-3">
        <ThemeToggle />
      </div>
    </nav>
  )
}
