'use client'

import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

/**
 * A `next/image` that opens full-screen when tapped or clicked.
 *
 * This exists so a *server* case study page can have one zoomable image
 * without the whole page becoming a client component. InfluencerCampaigns
 * doesn't need it — `InfluencerContent.js` is already `'use client'` and wraps
 * `<Zoom>` inline. Every other case study page is a server component.
 *
 * Use it for images the copy makes a specific claim about that the reader
 * can't check at column width. The first case is ACJ's rejected timeline: the
 * source is 2518×708, so at 390px it renders 74px tall and the details the
 * prose names — a "5" cluster badge, the date axis, the legend — are gone.
 * A wide screenshot in a narrow column is the whole problem this solves.
 *
 * Props pass straight through to `next/image`, so `sizes`, `width`, `height`
 * and `alt` behave exactly as they do elsewhere.
 *
 * **Give it `sizes="100vw"`, not the usual `(max-width: 768px) 100vw, 1008px`.**
 * The zoom reuses the inline image's `srcset`, so the `sizes` hint caps how
 * large the zoom can ever be — with the 1008px hint the browser kept picking a
 * 1008-wide variant and the zoom gained only 1.32×, then upscaled it to fill
 * the viewport, which is soft as well as pointless. At `100vw` it picks the
 * 1920 variant and the zoom renders 1280×360 at natural size on a 1280
 * viewport: 1.68× the inline size, and sharp. `zoomImg` looks like the right
 * lever and is not — the `srcset` wins over a plain `src`, so setting it
 * silently does nothing.
 *
 * The inline render pays for that: it fetches a 1920 variant for a 760px slot.
 * On a diagram this size that is a few tens of KB and buys retina sharpness,
 * but don't reach for this component for a photo.
 *
 * **It does not rescue a very wide image on a phone.** Zoom fits to viewport
 * width, so a 3.56:1 source at 390px is 390×110 zoomed against 263×74 inline —
 * sharper, still unreadable. Fixing that needs a different move: a
 * horizontally scrollable container, or a narrow-screen crop.
 *
 * One trap, already paid for once (see `CaseStudyModal.js`): this renders a
 * native `<dialog>` that sits in the DOM from first render and differs only by
 * the `[open]` attribute. Anything asking "is an image zoomed?" must match
 * `[data-rmiz-modal][open]`, never the bare attribute, or Escape silently
 * stops closing the case study. It also means `[role="dialog"]` is no longer
 * a unique selector on any page using this.
 */
export default function ZoomableImage(props) {
  return (
    <Zoom>
      <Image {...props} />
    </Zoom>
  )
}
