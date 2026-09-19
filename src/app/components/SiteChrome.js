'use client'

import { usePathname, useSelectedLayoutSegment } from 'next/navigation'
import Nav from './site/Nav'
import Footer from './site/Footer'
import { CONTAINER } from './site/tokens'

/**
 * Nav and footer for routes that don't supply their own.
 *
 * Home can't take its nav from the layout: the scroll reveal clips the sheet,
 * and a nav rendered outside that sheet would end up floating over the dark
 * section once the sheet scrolls past. So home and About
 * render chrome themselves, and this fills it in everywhere else — currently
 * the case studies and 404.
 *
 * "Which page is this?" is answered by the layout segment, not the URL. They
 * differ exactly when it matters: open a case study from a home card and the
 * URL becomes /casestudy/Prompt while the page in the `children` slot is still
 * home, with its own nav inside the sheet. Reading the pathname here rendered
 * a second nav and footer around the home page underneath the modal — two
 * avatars behind the scrim, and a 108px layout jump on open and close as the
 * extra nav was inserted above the sheet. The blurred backdrop used to hide
 * it; the flat one didn't (2026-09-19).
 */

// Segments (one level below the root layout) of the routes that render their
// own chrome. `null` is the root page — home.
const SELF_CHROME_SEGMENTS = new Set([null, 'about'])

const REVEAL_BG = '#050505'

function useRendersOwnChrome() {
  return SELF_CHROME_SEGMENTS.has(useSelectedLayoutSegment())
}

export function SiteNav() {
  const pathname = usePathname()
  if (useRendersOwnChrome()) return null

  return (
    <div className="px-6">
      <div className={`${CONTAINER} mx-auto`}>
        <Nav active={pathname?.startsWith('/casestudy') ? 'Work' : undefined} />
      </div>
    </div>
  )
}

export function SiteFooter() {
  if (useRendersOwnChrome()) return null

  // Footer is built for a near-black ground, so it needs the dark band
  // around it on pages that are otherwise light.
  return (
    <div style={{ background: REVEAL_BG }}>
      <Footer />
    </div>
  )
}
