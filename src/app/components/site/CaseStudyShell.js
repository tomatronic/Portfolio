'use client'

import { createContext, useContext, useEffect } from 'react'
import { PROSE, CASE_STUDY_CONTAINER } from './tokens'
import { markDirectCaseStudyVisit } from '../../lib/interceptCache'

/**
 * The surface a case study renders on. There are two, and the page itself
 * doesn't know which it's on:
 *
 * - Visited directly (`/casestudy/Prompt`), it is a tinted card floating on the
 *   page, inside the site chrome.
 * - Opened from a home card, the intercepting route renders the same component
 *   inside `CaseStudyModal`, which is already a white sheet with its own width
 *   and corners. Wrapping a card inside that sheet gave the modal three nested
 *   frames — panel, card, figure — and the page behind showing around the
 *   card's margins. That was what made it read as a dialog rather than a
 *   sheet (2026-09-19, compared against matt-evans.co.uk).
 *
 * So the modal provides `CaseStudySurface`, and this shell drops the outer
 * container and card when it finds it, keeping only the padding. The padding
 * is the same in both cases — `CaseStudyFigure`'s `hero` variant relies on it
 * to bleed to the surface's edges with matching negative margins.
 *
 * Client component so it can read the context; the case study content it
 * wraps stays server-rendered.
 */

const SurfaceContext = createContext(false)

export function CaseStudySurface({ children }) {
  return <SurfaceContext.Provider value={true}>{children}</SurfaceContext.Provider>
}

// One value, both surfaces. The hero's negative margins are derived from it.
export const SURFACE_PADDING = 'p-8 md:p-12'

export default function CaseStudyShell({ children }) {
  const inModal = useContext(SurfaceContext)

  // A direct visit poisons the router cache for the modal — see
  // lib/interceptCache.js. Home consumes this on its next mount.
  useEffect(() => {
    if (!inModal) markDirectCaseStudyVisit()
  }, [inModal])

  if (inModal) {
    return <div className={`${SURFACE_PADDING} ${PROSE}`}>{children}</div>
  }

  return (
    <div className="relative min-h-screen">
      <div className={`container mx-auto ${CASE_STUDY_CONTAINER} px-6`}>
        {/* rounded-2xl, not the old rounded-4xl: 16px is CARD_RADIUS, the
            radius every other card on the site uses, and the sheet in the
            modal matches it so the two surfaces read as the same thing. */}
        <div className={`rounded-2xl bg-zinc-50 ${SURFACE_PADDING} dark:bg-slate-900 ${PROSE}`}>
          {children}
        </div>
      </div>
    </div>
  )
}
