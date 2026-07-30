/**
 * Site type + colour system.
 *
 * Scale is deliberately tiny — 14 / 15 / 16 / 27 only. Nothing else. Hierarchy
 * comes from colour, not size, which is why there are three ink levels and only
 * one heading step.
 *
 * Bumped from 12 / 13 / 14 / 24 in July 2026: the 14px body was reported as too
 * small to read comfortably. Every step is the old value × 16/14, rounded to the
 * nearest pixel, so the relationships between them are unchanged — only the
 * whole scale moved up. 27 rather than 28 for the title keeps the title-to-body
 * ratio (1.69) nearest the original 1.71.
 *
 * The three greys are specified for the white sheet. The dark equivalents are
 * chosen to hold the same relationship against #0F1623 (dark-mode sheet) and
 * #050505 (the reveal section) while clearing WCAG AA at the smallest size.
 */

// Type scale — the only sizes allowed.
export const TEXT = {
  xs: 'text-[14px]',
  sm: 'text-[15px]',
  base: 'text-[16px]',
  title: 'text-[27px]',
}

// Ink levels. Light values are the specified hexes; dark values are their
// counterparts for the navy sheet and the near-black reveal.
export const INK = 'text-[#292929] dark:text-[#F2F2F2]'
export const MUTED = 'text-[#5D5D5D] dark:text-[#B0B0B0]'
export const FAINT = 'text-[#9E9E9E] dark:text-[#8A8A8A]'

// Fixed ink for the always-dark Experiments & Lab section, which doesn't flip
// with the theme — it is dark in both.
export const DARK_INK = 'text-[#F2F2F2]'
export const DARK_MUTED = 'text-[#B0B0B0]'
export const DARK_FAINT = 'text-[#8A8A8A]'

// Icon sizes: navigation/inline vs card.
export const ICON_NAV = 14
export const ICON_CARD = 20

// Radii: cards 16px, buttons fully round.
export const CARD_RADIUS = 'rounded-[16px]'
export const BUTTON_RADIUS = 'rounded-full'

// One content width for the whole route — nav, intro, cards, lab and footer.
// Keeps every section on the same measure; before this token the sheet ran at
// 1152px while the lab and footer ran at 1320px, so the dark section sat wider
// than the white sheet above it.
export const CONTAINER = 'max-w-4xl'

/**
 * Long-form type rules for case study bodies.
 *
 * Those pages are mostly bare `h2`/`p`/`ul`/`blockquote` inheriting from
 * globals.css, which styles those elements directly. An element rule beats
 * anything inherited from a wrapper, so these descendant selectors compile to
 * `.wrapper h2 { … }` and outrank the bare rule.
 *
 * `:not([data-keep])` on `p` is an escape hatch: a descendant selector (0,1,1)
 * also outranks a plain utility class (0,1,0), so without it a paragraph that
 * deliberately sets its own size — the Prompt stat row — would be flattened
 * back to body size. Mark those with `data-keep`.
 *
 * Written as literal class strings: Tailwind only emits what it can find whole
 * in the source.
 */
export const PROSE = [
  '[&_h1]:text-[27px] [&_h1]:font-medium [&_h1]:leading-[1.35] [&_h1]:tracking-tight [&_h1]:text-[#292929] dark:[&_h1]:text-[#F2F2F2]',
  '[&_h2]:text-[27px] [&_h2]:font-medium [&_h2]:leading-[1.25] [&_h2]:tracking-tight [&_h2]:text-[#292929] dark:[&_h2]:text-[#F2F2F2]',
  '[&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-[#292929] dark:[&_h3]:text-[#F2F2F2]',
  '[&_p:not([data-keep])]:text-[16px] [&_p:not([data-keep])]:leading-relaxed [&_p:not([data-keep])]:text-[#5D5D5D] dark:[&_p:not([data-keep])]:text-[#B0B0B0]',
  '[&_li]:text-[16px] [&_li]:leading-relaxed [&_li]:text-[#5D5D5D] dark:[&_li]:text-[#B0B0B0]',
  '[&_strong]:font-medium [&_strong]:text-[#292929] dark:[&_strong]:text-[#F2F2F2]',
  '[&_b]:font-medium [&_b]:text-[#292929] dark:[&_b]:text-[#F2F2F2]',
  '[&_blockquote]:my-6 [&_blockquote]:border-0 [&_blockquote]:p-0 [&_blockquote]:not-italic',
  '[&_blockquote]:text-[16px] [&_blockquote]:leading-relaxed [&_blockquote]:text-[#5D5D5D] dark:[&_blockquote]:text-[#B0B0B0]',
  '[&_cite]:mt-2 [&_cite]:block [&_cite]:text-[15px] [&_cite]:not-italic [&_cite]:text-[#9E9E9E] dark:[&_cite]:text-[#8A8A8A]',
].join(' ')
