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

/**
 * The tertiary ink is two values, split by the contrast threshold that applies
 * at each size. It was one value, #9E9E9E, which measured 2.68:1 on white —
 * under the 4.5:1 required for body text and under even the 3:1 allowed for
 * large text, so every use of it failed.
 *
 * Darkening everything to #767676 would have cleared AA but flattened the ramp:
 * in perceptual lightness the three inks step 16.6 → 39.5 → 65.1, and moving the
 * third to 49.6 turns even steps of 22.9/25.6 into 22.9/10.1, so the tertiary
 * level stops reading as its own level. Since this system takes its hierarchy
 * from colour rather than size, that matters.
 *
 * Splitting keeps the display line light. Only text below 24px owes 4.5:1;
 * at 24px and above the bar is 3:1, and TEXT.title is 27px.
 *
 * Both values are set against #fafafa, not #ffffff. The page ground is white,
 * but case study bodies sit on a bg-zinc-50 card, and the quote attributions
 * land there — #767676 measured 4.54:1 on white and only 4.35:1 on the card,
 * which axe-core caught. Sizing to the darker of the two grounds means one
 * value works everywhere rather than one value with an exception.
 *
 * Dark mode is unchanged — #8A8A8A already measures 5.25:1 on the navy sheet
 * and 5.90:1 on the near-black reveal. This was only ever a light-mode problem.
 */
// Text below 24px — 4.74:1 on white, 4.54:1 on the zinc-50 card.
export const FAINT = 'text-[#737373] dark:text-[#8A8A8A]'
// TEXT.title and above only — 3.19:1 on white, 3.06:1 on the card. L* 59.8
// against the original 65.1, so the display line keeps most of its lightness.
export const FAINT_DISPLAY = 'text-[#909090] dark:text-[#8A8A8A]'

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
 * Width for the case study wrappers, which run wider than the home route.
 *
 * 904px resolves to a 760px content column: 904 − 48 (the wrapper's own px-6)
 * − 96 (the card's md:p-12).
 *
 * **This width is the measure.** Body copy has no cap (see PROSE below), so
 * every character-per-line number on these pages comes from here — changing it
 * changes how the case studies read, not just how wide they look.
 *
 * It was max-w-6xl (1152px → a 1008px column) until 2026-08-17, at 132
 * characters a line. 760 brings that to ~100 while keeping the figures large
 * and letting the copy run edge to edge with them.
 *
 * The scale, measured rather than estimated, if it ever needs a nudge:
 *
 *     content   chars/line
 *     700       92
 *     760      100   ← here
 *     860      113
 *    1008      132   (the original)
 */
export const CASE_STUDY_CONTAINER = 'max-w-[904px]'

/**
 * Long-form type rules for case study bodies.
 *
 * Those pages are mostly bare `h2`/`p`/`ul`/`blockquote` inheriting from
 * globals.css, which styles those elements directly. An element rule beats
 * anything inherited from a wrapper, so these descendant selectors compile to
 * `.wrapper h2 { … }` and outrank the bare rule.
 *
 * `:not([data-keep])` on `p` and `li` is an escape hatch, and it is not
 * optional: a descendant selector also outranks a plain utility class, so any
 * `<p className="text-sm">` inside this wrapper is silently ignored and renders
 * at body size. Anything that deliberately sets its own size — metadata rows,
 * card labels, the Prompt stat row — must carry `data-keep` or the class does
 * nothing. Before this was applied consistently, every intended small size in
 * the case studies was inert, so the pages ran at two sizes (16 and 27) rather
 * than the four in the scale.
 *
 * Written as literal class strings: Tailwind only emits what it can find whole
 * in the source.
 */
export const PROSE = [
  // h1 is semibold where h2 is medium. Both are 27px — the scale has one
  // heading step — so without a weight difference the case study title rendered
  // identically to every "Challenge"/"Approach" heading below it and stopped
  // reading as the page title.
  '[&_h1]:text-[27px] [&_h1]:font-semibold [&_h1]:leading-[1.35] [&_h1]:tracking-tight [&_h1]:text-[#292929] dark:[&_h1]:text-[#F2F2F2]',
  // Headings had generous space above (pt-10 / pt-6 at the call sites) and none
  // below, so they sat flush on their own body copy and bound upward as much as
  // down. A small margin under each keeps roughly a 3:1 ratio with the space
  // above, so the heading reads as belonging to what follows it.
  //
  // `data-flush` opts out, for headings that are not stacked above body copy —
  // the OtherCaseStudies card titles sit in a centred flex row, where a bottom
  // margin pushes them off the card's vertical centre.
  '[&_h2]:text-[27px] [&_h2]:font-medium [&_h2]:leading-[1.25] [&_h2]:tracking-tight [&_h2]:text-[#292929] dark:[&_h2]:text-[#F2F2F2]',
  // h3 stays at body size deliberately. It reads as a bold lead-in rather than
  // a structural step, which the Aug 2026 review raised (finding 05) — the
  // alternatives were tried on 17 Aug and Tom kept this. An eyebrow treatment
  // (14px, uppercase, tracked) reads as structure but is louder than the rest
  // of the site, and half the h3s are sentences rather than labels — "My
  // approach: Prototype first, validate fast" — which uppercase strains.
  '[&_h3]:text-[16px] [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-[#292929] dark:[&_h3]:text-[#F2F2F2]',
  '[&_h2:not([data-flush])]:mb-3 [&_h3:not([data-flush])]:mb-2',
  /* There is deliberately NO max-width on body copy here — findings 04/05,
   * settled 2026-08-17. The measure is set by the card width alone
   * (CASE_STUDY_CONTAINER above), so don't reintroduce a cap without moving
   * that too.
   *
   * The history, because the obvious fix is the one that was rejected:
   *
   *   · The original 1008px column ran 132 characters a line, which is what the
   *     review flagged.
   *   · Capping the prose is the obvious answer and it looks broken. These
   *     pages are screenshots, persona cards and decision tables as much as
   *     prose, and all of those are siblings of the copy that keep the card's
   *     full width. A capped paragraph beside a full-width card reads as
   *     truncated, not measured — the copy looked cut short, most obviously in
   *     the modal.
   *   · So the card narrowed instead and the cap came off. Everything on the
   *     page shares one edge, and the line length falls out of that width.
   *
   * On `ch`, if a cap is ever revisited: it is the width of "0", 10.95px in DM
   * Sans against an average character of 7.63px — 43% wider. `ch` badly
   * overstates the characters it buys, and the review's suggested 68ch would
   * have been 98 characters, still outside the 45–75 range it was citing.
   */
  '[&_p:not([data-keep])]:text-[16px] [&_p:not([data-keep])]:leading-relaxed [&_p:not([data-keep])]:text-[#5D5D5D] dark:[&_p:not([data-keep])]:text-[#B0B0B0]',
  // `li` takes the same data-keep opt-out as `p`. Without it, compact lists
  // inside cards — the persona goals and pain points — were pinned to body size
  // however they were classed, which flattened those cards to a single size.
  '[&_li:not([data-keep])]:text-[16px] [&_li:not([data-keep])]:leading-relaxed [&_li:not([data-keep])]:text-[#5D5D5D] dark:[&_li:not([data-keep])]:text-[#B0B0B0]',
  '[&_strong]:font-medium [&_strong]:text-[#292929] dark:[&_strong]:text-[#F2F2F2]',
  '[&_b]:font-medium [&_b]:text-[#292929] dark:[&_b]:text-[#F2F2F2]',
  '[&_blockquote]:my-6 [&_blockquote]:border-0 [&_blockquote]:p-0 [&_blockquote]:not-italic',
  '[&_blockquote]:text-[16px] [&_blockquote]:leading-relaxed [&_blockquote]:text-[#5D5D5D] dark:[&_blockquote]:text-[#B0B0B0]',
  // 15px, so it takes the 4.5:1 value rather than the display one.
  '[&_cite]:mt-2 [&_cite]:block [&_cite]:text-[15px] [&_cite]:not-italic [&_cite]:text-[#737373] dark:[&_cite]:text-[#8A8A8A]',
].join(' ')
