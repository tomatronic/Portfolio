'use client'

import { usePathname } from 'next/navigation'
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
 */

const SELF_CHROME = new Set(['/', '/about'])

const REVEAL_BG = '#050505'

export function SiteNav() {
  const pathname = usePathname()
  if (SELF_CHROME.has(pathname)) return null

  return (
    <div className="px-6">
      <div className={`${CONTAINER} mx-auto`}>
        <Nav active={pathname?.startsWith('/casestudy') ? 'Work' : undefined} />
      </div>
    </div>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  if (SELF_CHROME.has(pathname)) return null

  // Footer is built for a near-black ground, so it needs the dark band
  // around it on pages that are otherwise light.
  return (
    <div style={{ background: REVEAL_BG }}>
      <Footer />
    </div>
  )
}
