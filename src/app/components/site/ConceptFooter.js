'use client'

import { Mail, Linkedin } from 'lucide-react'
import { TEXT, DARK_INK, DARK_FAINT, ICON_NAV, BUTTON_RADIUS, CONTAINER } from './tokens'

/**
 * Footer for the concept route, styled to sit continuously with the Experiments
 * & Lab section above it — same near-black ground, same ink levels, same scale.
 * It is dark in both themes, exactly like that section.
 *
 * The theme toggle moved out of here and into the nav's right zone
 * (ConceptThemeToggle).
 *
 * This is now the site's only footer. components/footer.js is the previous
 * design and no longer imported anywhere. The theme toggle is rebuilt here
 * rather than reusing ThemeToggle: that one is a cream/teal branded pill that
 * would clash against #050505.
 */

const CONTACTS = [
  { label: 'Email', href: 'mailto:tom.m.spencer@gmail.com', Icon: Mail, external: false },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/thomas-spencer/',
    Icon: Linkedin,
    external: true,
  },
]

export default function ConceptFooter() {
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
            {CONTACTS.map(({ label, href, Icon, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`${BUTTON_RADIUS} inline-flex h-10 w-10 items-center justify-center bg-white/[0.08] text-[#B0B0B0] transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96]`}
                >
                  <Icon size={ICON_NAV} strokeWidth={2} />
                </a>
            ))}
          </div>
          <p className={`${TEXT.xs} ${DARK_FAINT} mb-0`}>
            Designed and built by Tom Spencer © {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
