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
        // Two hairlines on the sheet's own edges. The first is the original top
        // one; the second is the bottom edge, added 2026-08-17 for review
        // finding 07 — the reveal reading as a seam rather than a reveal in dark
        // mode. The top hairline was already carrying that intent but sits on
        // the wrong edge: the boundary the reveal actually turns on is where the
        // sheet *ends*, which is the bottom.
        //
        // The finding offered lifting the sheet a step lighter as the other fix.
        // It was measured and rejected — colour cannot do this job here:
        //
        //     sheet vs reveal, light (#ffffff / #050505)   20.38:1
        //     sheet vs reveal, dark  (#0F1623 / #050505)    1.13:1
        //     …if the reveal went pure black                1.16:1
        //     …if the sheet lifted all the way to #26314C   1.58:1
        //
        // The tonal range simply isn't there in dark, and the lift that buys the
        // least-bad number also stops the home page's ground matching the
        // #0F1623 every other page uses. So the boundary is drawn rather than
        // coloured: an edge that reads as deliberate is the honest version of an
        // effect that can't have its light-mode drama back.
        //
        // Both must be *inset* — clip-path clips an outer shadow away entirely.
        // Neither needs a dark: variant: white at low alpha on the white
        // light-mode sheet is invisible, so this self-cancels rather than
        // branching on theme.
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(255,255,255,0.35)',
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
