'use client'

import { useTheme } from '../ThemeProvider'
import { CONTAINER } from './tokens'
import CanvasReveal from './CanvasReveal'
import ConceptNav from './ConceptNav'
import ConceptHero from './ConceptHero'
import ExperimentsLab from './ExperimentsLab'
import ConceptFooter from './ConceptFooter'

// The grain layer that was here has gone: at 0.14 alpha it washed the white sheet
// to roughly #EDEDED, which read as grey rather than white. The intro is meant to
// be a flat white ground, so the texture buys nothing here.

// The colour the sheet clips back to reveal. Near-black in both themes — in dark
// mode it sits just below the sheet's own #0F1623, which is why CanvasReveal
// draws a hairline along the sheet's top edge to keep the boundary legible.
const REVEAL_BG = '#050505'

export default function ConceptHome() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  // The intro sheet now uses the site's own page colours rather than the earlier
  // indigo colour-block — the reveal does the heavy lifting, so the sheet itself
  // stays quiet. Everything inside it is plain Tailwind `dark:` classes.
  const sheetBg = dark ? '#0F1623' : '#ffffff'

  return (
    // The reveal colour lives on the wrapper, not just the section below — the
    // sheet's clipped side strips need something dark behind them for their full
    // height, not only where the section itself sits.
    <div style={{ background: REVEAL_BG }}>

      <CanvasReveal style={{ background: sheetBg, minHeight: '100vh' }}>
        {/* Nav lives inside the sheet so the clip-path carries it — a nav outside
            would sit over the dark section once the sheet scrolls past. */}
        <div id="top" className={`${CONTAINER} mx-auto`}>
          <ConceptNav />
        </div>
        <ConceptHero />
      </CanvasReveal>

      {/* Footer shares this block rather than sitting in its own — it reads as a
          continuation of the lab section, which is the point. */}
      <div style={{ background: REVEAL_BG, minHeight: '100vh' }}>
        <ExperimentsLab />
        <ConceptFooter />
      </div>
    </div>
  )
}
