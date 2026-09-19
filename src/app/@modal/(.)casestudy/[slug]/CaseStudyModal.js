'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { CaseStudySurface } from '../../../components/site/CaseStudyShell'

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

  // Click on the scrim — the top gap or the margins beside the sheet — closes.
  // Checked against currentTarget so a click that started inside the sheet
  // and bubbled up doesn't count.
  const onScrimClick = (e) => {
    if (e.target === e.currentTarget) close()
  }

  return (
    <>
      {/* Backdrop. Rakuten purple at 8% in light mode — Tom's spec, 2026-09-19 —
          which is barely a tint: the page behind shows almost fully. Not
          blurred; a blur turned the strip above the sheet into a smear of the
          home cards. Dark mode keeps a heavy ink wash, because the sheet is
          navy on navy and an 8% tint would leave nothing but the hairline to
          separate them. */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#8529CD]/[0.08] dark:bg-[#050505]/80 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={isClosing
          ? { duration: 0.18, ease: 'easeIn' }
          : { duration: 0.28, ease: 'easeOut' }}
      />

      {/* Panel — the scroll container, sliding up from the bottom. The sheet
          inside it is what the visitor sees as the modal.
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
        {/* The floating close, where it was before the sheet: top-right of the
            viewport, over the scrim, not inside the sheet. A zero-height sticky
            row keeps it out of flow so the gap above the sheet stays exact, and
            pins it once the sheet scrolls under it. This is the accessible
            close control; the handle on the sheet is pointer-only. */}
        <div className="pointer-events-none sticky top-0 z-10 h-0">
          <button
            type="button"
            onClick={close}
            aria-label="Close case study"
            className="pointer-events-auto absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-[transform,box-shadow] hover:scale-105 hover:shadow-lg active:scale-[0.96] dark:bg-slate-800"
          >
            <X size={16} strokeWidth={2.5} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* The gap above the sheet is where the page behind shows through.
            min-h-full so a short case study still fills the viewport, and the
            sheet never ends with the scrim visible beneath it. */}
        <div className="min-h-full pt-16 md:pt-20" onClick={onScrimClick}>
          {/* The sheet. 856px, not CASE_STUDY_CONTAINER's 904: the direct page
              loses 48px to its container's px-6 before the card's padding, and
              the sheet has no such container, so it is 48px narrower to keep
              the same 760px measure — see CASE_STUDY_CONTAINER in tokens.js.
              Top corners only, at the site's 16px card radius; the bottom edge
              runs off the viewport. In dark mode the sheet and the scrim are
              both near-navy, so a hairline keeps the top edge legible — the
              same fix the home reveal needed (finding 07). */}
          <div className="relative mx-auto min-h-[calc(100vh-4rem)] max-w-[856px] rounded-t-2xl bg-white dark:bg-[#0F1623] dark:ring-1 dark:ring-white/10 md:min-h-[calc(100vh-5rem)]">
            {/* The handle. A bottom-sheet's grab affordance at the sheet's
                top-centre, drawn as a 48×6 pill in a 44px-tall hit area.
                Clicking it closes, but it is out of the tab order and hidden
                from assistive tech — the X above is the one close control a
                keyboard or screen reader user needs, and two buttons with the
                same label would be noise. Not sticky: it belongs to the top of
                the sheet the way a real one does. */}
            <button
              type="button"
              onClick={close}
              tabIndex={-1}
              aria-hidden="true"
              className="absolute left-1/2 top-0 z-10 flex h-11 w-24 -translate-x-1/2 items-center justify-center"
            >
              <span className="h-1.5 w-12 rounded-full bg-[#292929]/25 transition-colors dark:bg-white/30" />
            </button>

            <CaseStudySurface>
              {children}
            </CaseStudySurface>
          </div>
        </div>
      </motion.div>
    </>
  )
}
