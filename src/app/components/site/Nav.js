'use client'

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { play } from 'cuelume'
import ThemeToggle from './ThemeToggle'
import { TEXT, INK, BUTTON_RADIUS } from './tokens'

// Confetti burst, ported from the confetti-demo prototype. Particles spread
// evenly around a full circle with a little angular jitter, then fade and
// shrink outward. Accent-scale colours rather than the demo's red/yellow, so
// the burst stays on-palette.
const PARTICLE_COLOURS = ['#B84010', '#E07840', '#EE9F68']
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
 * Active state is the accent colour rather than the live nav's underline,
 * matching this route's hierarchy-by-colour rule.
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
        background: PARTICLE_COLOURS[i % PARTICLE_COLOURS.length],
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
    // Never let an audio failure block navigation — autoplay policy, an
    // unsupported context, or a muted device should all fail silently.
    try {
      play('success')
    } catch {
      /* no-op */
    }
  }, [burst])

  return (
    // From 420px up: three zones, so the pill stays centred on the container
    // axis regardless of how wide the side zones are — with justify-between it
    // would drift whenever left and right differ in width.
    //
    // Below 420px: two rows, pill underneath. At 360px the pill needed 193.1px
    // and the three-column grid could spare exactly 193, so it wrapped on a
    // rounding error and Resume dropped to a second line inside the pill — a
    // 150px-tall blob. Shaving gaps only moves that knife-edge; at 320px a 44px
    // avatar, three text items and a 44px toggle genuinely do not fit on one
    // line. A row of its own means the pill always has the full measure, and the
    // break is a deliberate layout rather than a flex accident.
    //
    // 420 rather than Tailwind's `sm`: the single row fits comfortably from
    // ~400px, and holding the stacked layout to 640px would strand it across
    // every large phone.
    <nav className="relative z-50 grid grid-cols-2 items-center gap-x-4 gap-y-5 py-8 min-[420px]:grid-cols-[1fr_auto_1fr] min-[420px]:gap-y-0">
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
            to colour shift is the hover feedback on its own. */}
        {/* z-10 puts the avatar above the particles so the burst appears to come
            out from behind it. Particles are appended after this span in the DOM,
            so without an explicit z-index they'd paint on top. */}
        <span className="relative z-10 block h-11 w-11 overflow-hidden rounded-full ring-1 ring-[#292929]/12 transition-transform duration-300 active:scale-[0.96] motion-reduce:transition-none dark:ring-white/15">
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

      {/* Spans both columns on its own row below 420px, then returns to the
          middle column of the three-column grid. flex-wrap stays as a last-resort
          valve so an overflow can never force a horizontal scroll, which this
          repo bans — but with a full row to itself it no longer fires. */}
      <div
        className={`${BUTTON_RADIUS} col-span-2 row-start-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 justify-self-center border border-[#292929]/12 bg-white px-7 py-3.5 dark:border-white/12 dark:bg-white/[0.04] min-[420px]:col-span-1 min-[420px]:col-start-2 min-[420px]:row-start-1`}
      >
        {ITEMS.map((item) => {
          const isActive = active === item.label
          // accent-600 on white is 5.56:1 and accent-300 on the navy sheet is
          // 8.31:1, so the active item clears AA in both themes.
          const tone = isActive
            ? 'text-accent-600 dark:text-accent-300'
            : `${INK} hover:text-accent-600 dark:hover:text-accent-300`

          const className = `${TEXT.base} ${tone} font-medium transition-colors`

          return item.external ? (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {item.label}
            </a>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={className}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Right zone — the theme toggle, moved here from the footer. Balances the
          avatar opposite it and keeps the grid's 1fr/auto/1fr symmetry, so the
          pill stays on the container's true centre. */}
      <div className="col-start-2 row-start-1 justify-self-end min-[420px]:col-start-3">
        <ThemeToggle />
      </div>
    </nav>
  )
}
