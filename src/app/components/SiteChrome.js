'use client'

import { usePathname } from 'next/navigation'
import ConceptNav from '../concept-9f2k/ConceptNav'
import ConceptFooter from '../concept-9f2k/ConceptFooter'
import { CONTAINER } from '../concept-9f2k/tokens'

/**
 * Nav and footer for routes that don't supply their own.
 *
 * Home can't take its nav from the layout: the scroll reveal clips the sheet,
 * and a nav rendered outside that sheet would end up floating over the dark
 * section once the sheet scrolls past. So home (and About, and the sandbox)
 * render chrome themselves, and this fills it in everywhere else — currently
 * the case studies and 404.
 */

const SELF_CHROME = new Set([
  '/',
  '/about',
  '/concept-9f2k',
  '/concept-9f2k/about',
  '/concept-9f2k/casestudy',
])

const REVEAL_BG = '#050505'

export function SiteNav() {
  const pathname = usePathname()
  if (SELF_CHROME.has(pathname)) return null

  return (
    <div className="px-6">
      <div className={`${CONTAINER} mx-auto`}>
        <ConceptNav active={pathname?.startsWith('/casestudy') ? 'Work' : undefined} />
      </div>
    </div>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  if (SELF_CHROME.has(pathname)) return null

  // ConceptFooter is built for a near-black ground, so it needs the dark band
  // around it on pages that are otherwise light.
  return (
    <div style={{ background: REVEAL_BG }}>
      <ConceptFooter />
    </div>
  )
}
