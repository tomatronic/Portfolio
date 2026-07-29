'use client'

import { useEffect, useRef } from 'react'

/**
 * The scroll transition from marvinschwaibold.com: as the page sheet ("canvas")
 * scrolls up, it clips inward from both sides and grows a bottom radius,
 * revealing the dark section sitting behind it.
 *
 * Measured off the reference site rather than eyeballed — at a 900px viewport it
 * runs the inset 0 → 35px and the radius 0 → 40px, with the radius topping out at
 * ~40% of the way through. Both curves are a plain smoothstep. There is no scale
 * transform and nothing is sticky: the sheet scrolls away normally, only its
 * clip-path animates, which is why the effect stays cheap and never fights scroll.
 */

// How far each side pulls in at the end of the transition. The reference uses a
// flat 35px, which is subtle; this goes considerably further and scales with the
// viewport so the contraction reads the same at every width instead of being
// barely-there on desktop and chunky on mobile. Raise INSET_RATIO for more.
const INSET_RATIO = 0.07
const MIN_INSET = 22
const MAX_INSET = 128
const MAX_RADIUS = 48
const RADIUS_COMPLETES_AT = 0.4

const clamp = (n, min, max) => Math.min(Math.max(n, min), max)
const smoothstep = (p) => p * p * (3 - 2 * p)

// The widest the clip will ever pull in at this viewport. Doubles as the sheet's
// side gutter — without it the clip eats into the content at anything under
// ~1400px wide, since the inner container's own 24px padding is the only gutter
// there and the inset comfortably exceeds it.
const insetCeiling = (viewportWidth) =>
  clamp(viewportWidth * INSET_RATIO, MIN_INSET, MAX_INSET)

export default function CanvasReveal({ children, className = '', style }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = null

    const paint = () => {
      frame = null

      // Reduced motion keeps the section change but drops the scroll-linked
      // geometry — the dark section still arrives, it just doesn't animate.
      if (motionQuery.matches) {
        el.style.setProperty('--canvas-inset', '0px')
        el.style.setProperty('--canvas-radius', '0px')
        return
      }

      const vh = window.innerHeight
      const { bottom } = el.getBoundingClientRect()
      const runway = vh * 1.1

      const p = clamp((vh - bottom) / runway, 0, 1)
      const inset = insetCeiling(window.innerWidth) * smoothstep(p)
      const radius = MAX_RADIUS * smoothstep(clamp(p / RADIUS_COMPLETES_AT, 0, 1))

      el.style.setProperty('--canvas-inset', `${inset.toFixed(2)}px`)
      el.style.setProperty('--canvas-radius', `${radius.toFixed(2)}px`)
    }

    // Kept out of paint() so it only changes on resize — writing it every scroll
    // frame would re-run layout on the whole sheet.
    const measureGutter = () => {
      el.style.setProperty('--canvas-gutter', `${insetCeiling(window.innerWidth)}px`)
    }

    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(paint)
    }

    const onResize = () => {
      measureGutter()
      schedule()
    }

    measureGutter()
    paint()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize)
    motionQuery.addEventListener('change', paint)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
      motionQuery.removeEventListener('change', paint)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        '--canvas-inset': '0px',
        '--canvas-radius': '0px',
        '--canvas-gutter': '0px',
        paddingInline: 'var(--canvas-gutter)',
        borderRadius: '0 0 var(--canvas-radius) var(--canvas-radius)',
        clipPath:
          'inset(0 var(--canvas-inset) 0 var(--canvas-inset) round 0 0 var(--canvas-radius) var(--canvas-radius))',
        // A hairline along the top of the sheet's own edge, so the boundary reads
        // even in dark mode where the sheet and the reveal are both near-black.
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28)',
        backfaceVisibility: 'hidden',
        position: 'relative',
        zIndex: 1,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
