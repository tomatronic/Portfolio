'use client'

import { useEffect, useRef, useState } from 'react'
import { Mail, Check, Linkedin } from 'lucide-react'
import { TEXT, DARK_INK, DARK_FAINT, ICON_NAV, BUTTON_RADIUS, CONTAINER } from './tokens'

/**
 * Footer for the concept route, styled to sit continuously with the Experiments
 * & Lab section above it — same near-black ground, same ink levels, same scale.
 * It is dark in both themes, exactly like that section.
 *
 * The theme toggle moved out of here and into the nav's right zone
 * (ThemeToggle).
 *
 * This is now the site's only footer. components/footer.js is the previous
 * design and no longer imported anywhere. The theme toggle is rebuilt here
 * rather than reusing ThemeToggle: that one is a cream/teal branded pill that
 * would clash against #050505.
 */

const EMAIL = 'tom.m.spencer@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/thomas-spencer/'

const ICON_BUTTON = `${BUTTON_RADIUS} relative inline-flex h-11 w-11 items-center justify-center bg-white/[0.08] text-[#B0B0B0] transition-[background-color,color,transform] hover:bg-[#F2F2F2] hover:text-[#292929] active:scale-[0.96]`

// Cross-fade between the two icons, the same trick as the nav's menu button.
const ICON_LAYER = 'absolute transition-[opacity,transform,filter] duration-300 motion-reduce:transition-none'

/**
 * The email button copies the address rather than opening a mail client: a
 * `mailto:` does nothing for anyone without one set up. If the clipboard is
 * refused (an insecure context, a denied permission) it falls back to the
 * `mailto:`, so the button never silently does nothing.
 */
function CopyEmail() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      window.location.href = `mailto:${EMAIL}`
      return
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    // `flex`, not a plain block: the button is inline-flex, and inside a block
    // its line box adds a descender gap under it, so the wrapper ends up taller
    // than the button and the circle sits higher than its LinkedIn neighbour.
    <div className="relative flex">
      <button type="button" onClick={copy} aria-label="Copy email address" title="Copy email address" className={ICON_BUTTON}>
        <Mail
          size={ICON_NAV}
          strokeWidth={2}
          className={`${ICON_LAYER} ${copied ? 'scale-[0.25] opacity-0 blur-[4px]' : ''}`}
        />
        <Check
          size={ICON_NAV}
          strokeWidth={2.5}
          className={`${ICON_LAYER} ${copied ? '' : 'scale-[0.25] opacity-0 blur-[4px]'}`}
        />
      </button>
      <span
        role="status"
        className={`${TEXT.xs} pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#F2F2F2] px-3 py-1 font-medium text-[#292929] transition-[opacity,transform] duration-200 motion-reduce:transition-none ${copied ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'}`}
      >
        {copied ? 'Email copied' : ''}
      </span>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="px-6 pb-16">
      <div className={`${CONTAINER} mx-auto border-t border-white/10 pt-10`}>
        {/* Everything centred on the container axis. The two nested column
            wrappers the old left-aligned layout needed collapse to one. */}
        <div className="flex flex-col items-center gap-5 text-center">
          {/* On its own line above the icons, at the scale's top size — 24px is
              the only step up from body, so weight and ink carry the rest. */}
          <p className={`${TEXT.title} ${DARK_INK} mb-0 font-medium leading-[1.25] tracking-tight`}>
            Want to get in touch?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <CopyEmail />
            <a
              href={LINKEDIN}
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className={ICON_BUTTON}
            >
              <Linkedin size={ICON_NAV} strokeWidth={2} />
            </a>
          </div>
          <p className={`${TEXT.xs} ${DARK_FAINT} mb-0`}>
            Designed and built by Tom Spencer © {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
