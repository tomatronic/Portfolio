import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { TEXT, INK, MUTED, ICON_NAV, GHOST_PILL } from './components/site/tokens'

export const metadata = {
  title: 'Page not found | Tom Spencer',
}

/**
 * Brought onto the site's type and button system 2026-08-17 (review finding 09).
 * This was the last page predating the current design — it ran its heading at
 * 30px/600, outside the 14/15/16/27 scale, and its solid amber pill was the only
 * filled CTA anywhere on the site, so the one page a visitor reaches by mistake
 * was also the one that looked like a different site.
 *
 * Everything here now comes from tokens: 27px semibold h1 (the h1 weight PROSE
 * gives every case study title), 14px accent eyebrow, 16px muted body, and the
 * same ghost pill the home intro uses for Resume and LinkedIn.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <p className={`${TEXT.xs} ${MUTED} mb-2 font-medium`}>404</p>
        <h1 className={`${TEXT.title} ${INK} mb-4 font-semibold leading-[1.25] tracking-tight`}>
          This page doesn&apos;t exist
        </h1>
        <p className={`${TEXT.base} ${MUTED} mb-8 max-w-md font-normal leading-relaxed`}>
          The page you&apos;re looking for has moved or never existed. The work, however, is very much still here.
        </p>
        <Link
          href="/"
          className={`${GHOST_PILL} min-h-11`}
        >
          <ArrowLeft size={ICON_NAV} strokeWidth={2} />
          Back to home
        </Link>
      </div>
    </div>
  )
}
