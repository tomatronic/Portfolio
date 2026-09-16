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
 * `zoom` swaps the image for `ZoomableImage`, which opens it full-screen on
 * tap. Read that file before using it: it wants `sizes="100vw"`, and it does
 * not rescue a very wide image on a phone.
 *
 * Anything else — `src`, `width`, `height`, `alt`, `priority`, a `sizes`
 * override — passes straight through to the image.
 */

const GROUND = 'flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8'
const IMAGE = 'rounded-2xl ring-1 ring-black/10 dark:ring-white/10'
const SIZES = '(max-width: 768px) 100vw, 1008px'

export default function CaseStudyFigure({ zoom = false, className = '', ...img }) {
  const Img = zoom ? ZoomableImage : Image
  return (
    <div className={GROUND}>
      <Img sizes={SIZES} className={`${IMAGE} ${className}`.trim()} {...img} />
    </div>
  )
}
