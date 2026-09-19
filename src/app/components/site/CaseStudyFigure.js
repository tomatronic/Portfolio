import Image from 'next/image'
import ZoomableImage from './ZoomableImage'
import { WASH } from './tokens'

/**
 * An inline case study image on the cream figure ground.
 *
 * Every case study figure is the same two elements — a purple-wash box and a
 * ringed, rounded `next/image` inside it — and before this component the pair
 * was written out longhand twenty-one times across the four pages. One place
 * now owns the ground, the ring and the responsive `sizes` hint.
 *
 * `hero` is the variant for the image at the top of the page. It bleeds to the
 * edges of the surface it sits on — the card on a direct visit, the sheet in
 * the modal — with negative margins that cancel `CaseStudyShell`'s padding,
 * and its top corners take the surface's radius, clipping the image. No ring
 * and no inner padding: the screenshot fills the band. The band itself is the
 * purple WASH, and that is not decorative — all three hero PNGs have
 * transparent regions (5–14% of their pixels, the corners around the
 * overlapping windows), so the wash shows through them. Swap a hero for an
 * opaque image and the band colour disappears with nothing lost. (A first cut
 * kept a ring and a padded cream band; Tom dropped both on 2026-09-19.)
 *
 * `zoom` swaps the image for `ZoomableImage`, which opens it full-screen on
 * tap. Read that file before using it: it wants `sizes="100vw"`, and it does
 * not rescue a very wide image on a phone.
 *
 * Anything else — `src`, `width`, `height`, `alt`, `priority`, a `sizes`
 * override — passes straight through to the image.
 */

const GROUND = `flex flex-row flex-wrap place-content-center content-center ${WASH} rounded-2xl mb-8`
// Negative margins mirror SURFACE_PADDING in CaseStudyShell (p-8 md:p-12).
const HERO_GROUND = `${WASH} -mx-8 -mt-8 mb-8 overflow-hidden rounded-t-2xl md:-mx-12 md:-mt-12`
const IMAGE = 'rounded-2xl ring-1 ring-black/10 dark:ring-white/10'
const HERO_IMAGE = 'w-full h-auto'
const SIZES = '(max-width: 768px) 100vw, 1008px'

export default function CaseStudyFigure({ hero = false, zoom = false, className = '', ...img }) {
  const Img = zoom ? ZoomableImage : Image
  return (
    <div className={hero ? HERO_GROUND : GROUND}>
      <Img sizes={SIZES} className={`${hero ? HERO_IMAGE : IMAGE} ${className}`.trim()} {...img} />
    </div>
  )
}
