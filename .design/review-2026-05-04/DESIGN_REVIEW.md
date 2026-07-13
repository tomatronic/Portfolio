# Design Review: tomspencer.design

Reviewed against: CLAUDE.md project conventions + memory
Philosophy: Warm editorial minimalism — Fraunces + DM Sans, amber accent, cream/navy palette
Date: 2026-05-04

---

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/home-desktop-1280.png` | Desktop 1280×800 | Home page, light mode, full page |
| `screenshots/home-tablet-768.png` | Tablet 768×1024 | Home page, light mode, full page |
| `screenshots/home-mobile-375.png` | Mobile 375×812 | Home page, light mode, full page |
| `screenshots/home-dark-desktop-1280.png` | Desktop 1280×800 | Home page, dark mode, full page |
| `screenshots/about-desktop-1280.png` | Desktop 1280×800 | About page, light mode, full page |
| `screenshots/about-mobile-375.png` | Mobile 375×812 | About page, light mode, full page |
| `screenshots/about-dark-desktop-1280.png` | Desktop 1280×800 | About page, dark mode, full page |

---

## Summary

The portfolio has a distinctive, refined aesthetic that sets it apart from generic designer portfolios — the solar arc hero is genuinely original, the typography pairing works well, and the amber accent palette is used with discipline. The major issues are: a large dead zone in the hero below the CTA that provides no scroll affordance; missing images on two of four case study cards; and a dark mode state on the hero that doesn't fully commit to the navy palette. Everything else is polished — this is a "should fix" and "could improve" list, not a "must rebuild" one.

---

## Must Fix

### 1. Case study cards #2 and #3 have empty image areas
`src/app/components/casestudyShowcase.js`

The ACJ and Rakuten cards show blank/grey image containers on the home page — no images are rendering. The CLAUDE.md notes Rakuten still uses Unsplash placeholder URLs. These empty boxes actively undermine credibility on the most important section of the homepage. A hiring manager's eye will go straight to them.

**Fix:** Add real screenshots for both cards, or use the same placeholder images used in #1 and #4 as a temporary measure.

### 2. Hero dark mode is incomplete
`src/app/components/SolarHero.js` + `src/app/components/PageBackground.js`

In dark mode, the solar hero background remains cream (`#F2ECE2`) while every section below it correctly switches to deep navy (`#0F1623`). The result is a jarring cream island at the top of an otherwise dark page — visible clearly in `home-dark-desktop-1280.png`. The chart arc colours and sun dot do appear to switch correctly (the amber arc is faintly visible against cream), but the background colour does not.

This is likely because `PageBackground.js` sets `body` background colour via React state, but the hero's own background is set differently (either via a wrapper div with a hardcoded class, or the `body` background shows through but the hero container has its own bg class). Audit the hero's container background declaration specifically.

**Fix:** Ensure the hero's container background (or body background) switches cleanly to `#0F1623` in dark mode. The chart colours already do this — the background just needs to follow.

---

## Should Fix

### 3. Hero: No scroll affordance below the CTA
`src/app/components/SolarHero.js`

The solar chart fills 100vh. The hero copy and CTA sit roughly in the top 30–35% of the viewport. The remaining 65% is the chart's below-horizon arc and empty grid — beautiful, but visually inert. There is no visual signal that anything exists below. Users on a first visit may not scroll, especially on desktop where the content below is entirely hidden.

This is visible in all desktop screenshots: after the CTA there is a large warm-cream void before the case studies begin.

**Fix (choose one):**
- Add a subtle animated scroll indicator (a downward chevron or pulsing dot) anchored to the bottom of the viewport.
- Add a faint "Scroll to see work" label near the time axis at the bottom of the chart.
- Reduce the hero height slightly (`95vh`) so the top of the next section is just visible, creating natural intrigue.

### 4. About page: Left column bottoms out short of the right column
`src/app/about/page.js`

On the about page bio card (`about-desktop-1280.png`), the left column (heading + `aspect-[3/4]` photo) is visually shorter than the right column's body text. This leaves a noticeable gap at the bottom of the left column before the card edge. The column is using `aspect-[3/4]` on the photo which constrains its height relative to the column width rather than the surrounding content.

**Fix:** Remove the fixed aspect ratio on the photo and let it fill available height with `h-full object-cover`, or add `self-stretch` to the image container so it fills the column. The right column text naturally determines the card height — the photo should match it.

### 5. About page: "Interests and hobbies" card has too much dead space
`src/app/about/page.js`

In both light and dark mode screenshots (`about-desktop-1280.png`, `about-dark-desktop-1280.png`), the "Interests and hobbies" card has a very large gap between the image and the divider/CTA at the bottom — roughly equal to the image height again. The `mb-16 md:mb-20` below the image is generating this.

Additionally, the section currently has only one wide image and no accompanying copy. It feels sparse — a heading and a photo with no context doesn't communicate much about who you are outside work.

**Fix (two steps):**
- Reduce `mb-16 md:mb-20` on the image wrapper to `mb-8` or remove it entirely.
- Add 2–3 lines of copy above or below the image explaining what the photos represent (travel, climbing, etc.) — this is content, not decoration, and makes the section do real work.

### 6. Testimonials: Left quote is significantly longer than the right
`src/app/components/Testimonials.js`

In the two-column testimonials grid (`home-desktop-1280.png`), the left card is roughly 2.5× the height of the right due to the first testimonial being much longer. The cards don't match in height, which creates a lopsided layout. On a grid with `items-start` (the default), the right card floats at the top leaving a large gap at the bottom of that column.

**Fix (choose one):**
- Add `items-stretch` to the grid so both cards fill the same height.
- Trim the first testimonial further — the edited version is still long and could lose the middle section ("He also helped triage bug tickets…") without losing its impact.

### 7. Mobile: "Interests and hobbies" image is very small
`about-mobile-375.png`

On mobile the hobbies banner image renders very small (the fanned image stack compresses tightly at 375px). The three overlapping images are hard to read at this size and the section feels underdeveloped.

**Fix:** On mobile, consider switching to a simple stacked layout (`flex-col`) rather than the fanned overlap, or crop to a single prominent image.

---

## Could Improve

### 8. Hero copy: Subtitle and body text are too similar in weight
`src/app/components/SolarHero.js`

The subtitle ("Making complex products easy to use…") and the body paragraph below it are very close in size and weight — both small, both left-aligned in the centre panel. There's no clear secondary-to-tertiary hierarchy step between them. The eye doesn't know which to read second.

**Suggestion:** Increase the subtitle to `text-lg` and keep body at `text-sm`, or apply `font-medium` to the subtitle to distinguish the two levels.

### 9. About page: "Where I add value" section feels list-heavy
`src/app/about/page.js`

The bio card already contains a bulleted list ("In practical terms, this includes…"). The next card is also an entirely bulleted list. Two consecutive cards of bullet points creates a résumé feel that works against the editorial warmth of the rest of the design. The bio card's list in particular reads as boilerplate — it might land harder as a short paragraph.

**Suggestion:** Consider converting one of the two lists to prose, or restructuring "Where I add value" into 2–3 short labelled blocks (icon or number + a line of text) rather than a plain bullet list.

### 10. Nav "About" link uses accent colour as active state
`src/app/components/navigation.js` (visible in `about-desktop-1280.png`)

On the about page, the nav "About" link renders in amber/accent colour as the active state. This is consistent and intentional. However it also makes "About" look like a CTA rather than an active indicator — especially since the Resume pill button is nearby using a similar amber outline. Consider whether a different active treatment (underline, slightly bolder weight, or just removing the colour change) would be clearer.

**Suggestion:** Use an underline indicator for active nav state rather than the accent colour, reserving accent colour for the Resume pill and buttons.

### 11. Testimonials section heading needs stronger anchoring
`src/app/components/Testimonials.js`

"What colleagues say" appears directly below the case studies with no visual breathing room to separate the two sections. On scroll it can read as a continuation of the case study section rather than a new unit of content.

**Suggestion:** Add a subtle top border or increase the card's top padding to create a clearer section break, or add a small label above the heading ("Feedback" in `text-xs tracking-widest uppercase`) to signal the change in content type.

### 12. Footer theme toggle could be more discoverable
`src/app/components/footer.js`

The dark/light toggle lives in the footer, which most users will never reach on a first visit. The site has a distinctive dark mode that a user might want to explore — but they won't find the toggle unless they scroll past every section of content first.

**Suggestion:** Consider moving the theme toggle to the nav (right side, before the Resume pill) where it's persistent and immediately visible.

### 13. Missing `prefers-reduced-motion` handling
`src/app/page.js` — Framer Motion animations

The Framer Motion `fadeUp` animation on every home page section has no reduced-motion fallback. Users with vestibular disorders or motion sensitivity who have `prefers-reduced-motion: reduce` enabled will still see the scroll-triggered animations.

**Suggestion:** Wrap the `transition` values in a `useReducedMotion()` hook (Framer Motion has this built in) and set duration to 0 when it returns true.

---

## What Works Well

- **The solar arc hero is genuinely distinctive.** No other designer portfolio has this. It's the right level of conceptual — it communicates precision, craft, and personality without being gimmicky. The amber arc colour is exactly right.
- **Typography pairing is excellent.** Fraunces for headings, DM Sans for body — the contrast between the two is clear at every size and never conflicts.
- **Amber accent discipline.** The accent colour appears only where it needs to — bullet points, CTAs, active states, hover states — and never in body copy. This is harder to get right than it looks.
- **About page layout redesign is a significant improvement.** The heading-above-photo + prose-right layout directly mirrors credible editorial references and feels more senior than the previous photo-left layout.
- **Card system is coherent.** `rounded-4xl bg-zinc-50 dark:bg-slate-900` creates a consistent container language across about, case studies, and testimonials. The visual rhythm of the stacked cards on the about page works particularly well.
- **"Explore case studies" CTA is now properly prominent.** Full accent colour with generous padding — it reads as the primary action without competing with nav elements.
- **Testimonials are well-edited and well-placed.** Two strong quotes in an appropriate position (after the work, not before it). The anonymisation is clean.
