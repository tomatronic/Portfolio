'use client'

import { useLayoutEffect, useState } from 'react'

/**
 * Progress 0 → 1 once `ref`'s element is 35% in view, eased out over 1.4s; the
 * caller multiplies its own figure by it.
 *
 * Starts at 1, so the server render and a no-JS visit show the final numbers.
 * The layout effect drops it to 0 before first paint on the client and only
 * then counts up — so nobody sees the real figure flash and reset. Under
 * `prefers-reduced-motion` it never leaves 1.
 */
export default function useCountUp(ref) {
  const [p, setP] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (
      !el ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    setP(0)
    let raf
    let started = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return
        started = true
        io.disconnect()
        const t0 = performance.now()
        const step = (now) => {
          const t = Math.min(1, (now - t0) / 1400)
          setP(1 - Math.pow(1 - t, 3))
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [ref])

  return p
}
