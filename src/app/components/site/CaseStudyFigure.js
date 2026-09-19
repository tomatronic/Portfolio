import Image from 'next/image'
import ZoomableImage from './ZoomableImage'

/**
 * An inline case study image on the cream figure ground.
 *
 * Every case study figure is the same two elements — a cream `#EDE7DD` box and a
 * ringed, rounded `next/image` inside it — and before this component the pair
 * was written out longhand twenty-one times across the four pages. One place
 * now owns the ground, the ring and the responsive `sizes` hint.
 *
 * `hero` is the variant for the image at the top of the page. The ground
 * bleeds to the edges of the surface it sits on — the card on a direct visit,
 * the sheet in the modal — with negative margins that cancel
 * `CaseStudyShell`'s padding, and its top corners take the surface's radius.
 * That makes the hero the top of the surface rather than a picture inside it,
 * which is the single biggest thing separating a sheet from a dialog. The
 * image inside keeps its ring: three of the four heroes are near-white
 * screenshots, and without the cream band and ring they dissolve into a white
 * sheet — the same failure the 2026-07-25 ring pass fixed inline. So it's not
 * a full-bleed photo the way a designed banner would be; it's the band that
 * bleeds, and the screenshot sits in it.
 *
 * `zoom` swaps the image for `ZoomableImage`, which opens it full-screen on
 * tap. Read that file before using it: it wants `sizes="100vw"`, and it does
 * not rescue a very wide image on a phone.
 *
 * Anything else — `src`, `width`, `height`, `alt`, `priority`, a `sizes`
 * override — passes straight through to the image.
 */

const GROUND = 'flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8'
// Negative margins mirror SURFACE_PADDING in CaseStudyShell (p-8 md:p-12).
const HERO_GROUND = 'flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 -mx-8 -mt-8 mb-8 rounded-t-2xl p-8 md:-mx-12 md:-mt-12 md:p-12'
const IMAGE = 'rounded-2xl ring-1 ring-black/10 dark:ring-white/10'
const SIZES = '(max-width: 768px) 100vw, 1008px'

export default function CaseStudyFigure({ hero = false, zoom = false, className = '', ...img }) {
  const Img = zoom ? ZoomableImage : Image
  return (
    <div className={hero ? HERO_GROUND : GROUND}>
      <Img sizes={SIZES} className={`${IMAGE} ${className}`.trim()} {...img} />
    </div>
  )
}
