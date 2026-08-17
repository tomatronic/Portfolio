'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { X } from 'lucide-react'

const TITLE_ID = 'case-study-modal-title'

/** Everything the browser will stop on with Tab, in DOM order. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * True while `react-medium-image-zoom` has an image zoomed (InfluencerCampaigns
 * is the only case study using it). Its overlay is portalled to `document.body`
 * so it sits *outside* this panel, and both the focus trap and the Escape
 * handler have to stand down while it's up — otherwise one Escape closes the
 * whole case study when the visitor only meant to shrink the image.
 *
 * The `[open]` is load-bearing. That overlay is a native `<dialog>` and it is
 * in the DOM from first render, closed; only the attribute distinguishes shown
 * from not. Matching on `[data-rmiz-modal]` alone reads as "permanently
 * zoomed" and silently kills Escape for the whole case study — which is
 * exactly what the first cut of this did.
 */
const isImageZoomed = () => document.querySelector('[data-rmiz-modal][open]') !== null

export default function CaseStudyModal({ children }) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)
  const panelRef = useRef(null)

  const close = useCallback(() => setIsClosing(true), [])

  /* The dialog is named by the case study's own <h1> rather than a title
     passed down from the route. The four h1s differ in shape — ACJ's wraps
     half of itself in a <span>, Influencer's doesn't match its card title at
     all — so a hand-kept map here would drift the moment one of them is
     reworded. Reading the heading that's actually on screen can't drift.

     Layout effect, not effect: the id has to be on the node before paint, or
     the aria-labelledby below points at nothing for a frame. */
  useLayoutEffect(() => {
    const heading = panelRef.current?.querySelector('h1')
    if (heading && !heading.id) heading.id = TITLE_ID
  }, [])

  /* Focus moves into the dialog on open and back to wherever it came from on
     close — without this the card that opened the modal keeps focus, so the
     first five Tab stops were the nav links *underneath* the panel. */
  useEffect(() => {
    const opener = document.activeElement
    panelRef.current?.focus({ preventScroll: true })

    return () => {
      // The home page stays mounted underneath an intercepting route, so the
      // opener is usually still the same node. Check anyway — if the modal was
      // opened from a direct URL there may be nothing to go back to.
      if (opener instanceof HTMLElement && document.contains(opener)) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (isImageZoomed()) return

      if (e.key === 'Escape') {
        close()
        return
      }

      if (e.key !== 'Tab') return

      // Keep Tab inside the panel. `aria-modal` tells screen readers to ignore
      // the page behind the dialog, but it has no effect on the tab order —
      // that has to be done by hand.
      const panel = panelRef.current
      if (!panel) return

      const stops = [...panel.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (stops.length === 0) return

      const first = stops[0]
      const last = stops[stops.length - 1]

      // Focus sitting on the panel itself (where it starts) counts as "before
      // the first stop", so Shift+Tab from there wraps to the end.
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  return (
    <>
      {/* Backdrop — fades in/out independently. Primary ink rather than the
          amber it used to tint with (#B84010 / #3D1204); same opacities. */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#292929]/[0.08] dark:bg-[#292929]/90 backdrop-blur-sm pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={isClosing
          ? { duration: 0.18, ease: 'easeIn' }
          : { duration: 0.28, ease: 'easeOut' }}
      />

      {/* Panel — slides up from bottom.
          tabIndex -1 so focus can be moved here on open without adding a stop
          to the tab order. */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        className="fixed inset-0 z-50 overflow-y-auto focus:outline-none"
        initial={{ y: '100%' }}
        animate={{ y: isClosing ? '100%' : '0%' }}
        transition={isClosing
          ? { duration: 0.22, ease: 'easeIn' }
          : { type: 'spring', stiffness: 320, damping: 38, mass: 0.9 }}
        onAnimationComplete={() => { if (isClosing) router.back() }}
      >
        {/* Floating close button */}
        <div className="pointer-events-none sticky right-0 top-0 z-10 flex justify-end px-6 pt-6">
          <button
            onClick={close}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md transition-[transform,box-shadow] hover:scale-105 hover:shadow-lg active:scale-[0.96]"
            aria-label="Close case study"
          >
            <X size={16} strokeWidth={2.5} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* Content.
            The sticky row above is in flow, so it already contributes 68px (its
            24px inset plus the 44px button) before this padding is counted. That
            put the card 116px down the viewport, which read as a dead band across
            the top. Kept small deliberately: the card must still start below the
            button's lower edge at 68px, since the two are within a few pixels of
            each other horizontally once the content hits its max width. */}
        <div className="pt-3 md:pt-4">
          {children}
        </div>
      </motion.div>
    </>
  )
}
