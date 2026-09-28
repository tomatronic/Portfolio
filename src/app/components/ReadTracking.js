'use client'

import { useEffect } from 'react'
import { sendGAEvent } from '@next/third-parties/google'

/**
 * Named GA4 events for a page you have shared with someone specific.
 *
 * GA4 already logs a pageview for every route, but a pageview is buried among
 * every other path and carries nothing that identifies the visit. This sends
 * three named events instead, so you can watch one event name in Realtime:
 *
 *   <name>_view    on arrival
 *   <name>_read    30s in AND past half the page — a read rather than a bounce
 *   <name>_finish  past 90% of the page
 *
 * Each carries a `ref` parameter read from `?ref=` on the URL. **That is the
 * only thing that identifies the visit** — GA cannot tell you who someone is,
 * so a distinct link per recipient (`/blueprints?ref=acme`) is what makes the
 * events legible. Without the param `ref` is 'none'.
 *
 * Reading it in GA4:
 * - **Realtime** (Reports → Realtime) shows the events within a minute or two.
 *   Click an event name to see its parameter values, including `ref`.
 * - **Standard reports and Explorations** only show `ref` once it is registered
 *   as a custom dimension: Admin → Custom definitions → Create custom
 *   dimension, event-scoped, parameter name `ref`. It is not retroactive, so
 *   register it before sharing any links.
 *
 * Two honest limits. A visitor with an ad or tracker blocker sends nothing at
 * all, so silence is not evidence nobody looked. And there is no instant
 * notification — Realtime is a report you open, not an alert.
 *
 * Your own visits fire these too. Open the page as `?ref=tom` so they are
 * filterable rather than indistinguishable.
 *
 * `window.location.search` is read in the effect rather than via
 * `useSearchParams`, which would force this page out of static prerendering (or
 * demand a Suspense boundary) for a value only ever needed on the client.
 */
export default function ReadTracking({ name, readAfterSeconds = 30 }) {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref') || 'none'
    const started = Date.now()
    const sent = new Set()
    const timers = []

    // gtag is defined by @next/third-parties' init script, which next/script
    // runs afterInteractive — so it may not exist yet when this effect fires.
    // Its presence is also the proof that gtag('config') has been queued, so an
    // event sent after it cannot land ahead of the config command and be lost.
    const send = (suffix, params) => {
      if (sent.has(suffix)) return
      if (typeof window.gtag !== 'function') return false
      sent.add(suffix)
      sendGAEvent('event', `${name}_${suffix}`, {
        ref,
        seconds: Math.round((Date.now() - started) / 1000),
        ...params,
      })
      return true
    }

    // Retry the arrival event until GA is up, then give up rather than poll
    // forever — a blocked tracker never arrives.
    let attempts = 0
    const ready = setInterval(() => {
      if (send('view') || ++attempts > 40) clearInterval(ready)
    }, 250)

    const depth = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      // A page shorter than the viewport is fully read on arrival.
      if (scrollable <= 0) return 1
      return (window.scrollY || doc.scrollTop) / scrollable
    }

    const check = () => {
      const d = depth()
      if (d >= 0.9) send('finish')
      if (d >= 0.5 && Date.now() - started >= readAfterSeconds * 1000) {
        send('read')
      }
      if (sent.has('read') && sent.has('finish')) {
        window.removeEventListener('scroll', check)
      }
    }

    window.addEventListener('scroll', check, { passive: true })
    // Scrolling alone can't fire `read` — someone who scrolls once and stops
    // never triggers another listener call, so re-check when the clock is up.
    timers.push(setTimeout(check, readAfterSeconds * 1000 + 500))

    return () => {
      clearInterval(ready)
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', check)
    }
  }, [name, readAfterSeconds])

  return null
}
