# Design Review: tomspencer.design — Post-Restructure

Reviewed against: CLAUDE.md project conventions + prior review (2026-05-04)
Philosophy: Warm editorial minimalism — Fraunces + DM Sans, amber accent, cream/navy palette
Date: 2026-05-25

---

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/home-desktop-1280.png` | Desktop 1280×800 | Home page, light mode, full page |
| `screenshots/home-tablet-768.png` | Tablet 768×1024 | Home page, light mode, full page |
| `screenshots/home-mobile-375.png` | Mobile 375×812 | Home page, light mode, full page |
| `screenshots/home-dark-desktop-1280.png` | Desktop 1280×800 | Home page, dark mode, full page |
| `screenshots/home-dark-mobile-375.png` | Mobile 375×812 | Home page, dark mode, full page |

---

## Summary

The homepage restructure is directionally strong — moving case studies above the fold and switching to the two-image card layout makes the work much more immediately visible, which was the goal. However, three critical content problems dominate the page right now: two cards have completely missing images (blank placeholders), and the Influencer card's second image is food photography that looks like a data error next to a B2B SaaS screenshot. These need resolving before the overall design quality can be fairly judged. Below that, there are responsive and spacing issues worth addressing.

---

## Must Fix

### 1. Offer Management Dashboard — both images are blank
`src/app/components/casestudyShowcase.js` — `offer_2.png`, `offer_1.png`

Both image slots on the Offer Management card render as empty cream/dark boxes. The files `/public/offer_1.png` and `/public/offer_2.png` almost certainly do not exist. This is the most damaging issue on the page — a card with no images in the new layout looks completely broken, not just placeholder-ish.

**Fix:** Either supply real screenshots, or temporarily reuse existing images from another card to hold the layout until real ones are ready.

---

### 2. Influencer card — second image is food/lifestyle photography
`src/app/components/casestudyShowcase.js` — `influencer_2.png`

The right slot on the Influencer Campaign Platform card is rendering what appears to be lifestyle food photography — completely incongruous next to a product UI screenshot of a campaign management interface. This looks like a data error to any viewer and actively undermines the card's credibility.

**Fix:** Replace `influencer_2.png` with an actual product screenshot (any screen from the influencer flow), or remove it and hold that slot as a placeholder until a real image is available.

---

### 3. Mobile — card images stay 2-column at 375px
`src/app/components/casestudyShowcase.js` — image grid `grid-cols-2 gap-3`

The image pair inside each card is `grid-cols-2` with no responsive modifier, so at 375px both images sit side by side at roughly 155px × 115px each — tiny thumbnail size. For a portfolio whose primary purpose is showing work, this is a significant failure at mobile. The text (correctly) collapses to 1-column at `md:`, but the images do not follow suit.

**Fix:** Change the image grid to `grid-cols-1 md:grid-cols-2`. On mobile, show the first image only in a single full-width slot with `aspect-video` to keep height manageable, or stack both images vertically. The single dominant image on mobile is a better use of limited space.

---

## Should Fix

### 4. Multi-Touch Attribution — right image may not be rendering
`src/app/components/casestudyShowcase.js` — `acj_2.png`

The right image slot on the Multi-Touch Attribution card is significantly lighter/fainter than the left. It may be rendering a very light or washed-out image, or `acj_2.png` contains a screenshot with a mostly white background that disappears against the cream card container. Either way, the visual balance between the two image slots is broken on this card.

**Fix:** Verify the image renders correctly locally. If it's a white-background screenshot, add a subtle inner border or shadow to the image container (`ring-1 ring-black/5`) to give it definition against the cream background.

---

### 5. Hero sub-copy is too long for a headline section
`src/app/page.js` — `<p>` below the h1

The paragraph below the main heading is 57 words and runs to 4–5 lines even at desktop. For a hero whose job is to create a fast first impression and drive scroll, this is too much to read before reaching the CTA. Employers scanning quickly will skip it.

**Fix:** Trim to 2 sentences maximum (25–30 words). The current copy contains two ideas: what you do and how you do it. Pick the stronger one. The case studies immediately below will do more persuasive work than any hero paragraph.

---

### 6. Tags above card title look very faint
`src/app/components/casestudyShowcase.js` — tag pill `text-slate-500`

The category tags (e.g. "Enterprise UX", "AI Search") render at `text-xs text-slate-500` with a `border-[#C8BEB0]` outline. On the cream background they are barely legible at normal reading distance — they appear as a faint whisper of text before the title. They don't add enough visual value to justify the hierarchy interruption.

**Fix (choose one):** Remove the tags entirely — the titles and bullets communicate the project type clearly enough. Or increase to `text-slate-600` and add `bg-[#EDE7DD]` background fill to make them read as actual chips rather than ghost outlines.

---

### 7. About Me section has no visual separation from case studies
`src/app/components/AboutMeSection.js` + `src/app/page.js`

In the desktop screenshot, the About Me editorial section follows directly below the four case study cards with only the section's own `py-24` padding as a separator. The transition from "case studies" to "personal description" is abrupt — there's no visual signal that the content type has changed.

**Fix:** Add a full-width subtle horizontal rule (`border-t border-[#C8BEB0] dark:border-[#2A3A4A]`) above the About Me section, or increase the top margin of the AboutMeSection wrapper. A thin divider signals a section transition without adding visual weight.

---

## Could Improve

### 8. Testimonials — left heading column loses its purpose at tablet
`src/app/components/Testimonials.js`

At 768px (tablet), the 3-column grid compresses the left heading column quite tightly. The "What colleagues say." heading and sub-copy paragraph become narrow and slightly cramped before the md breakpoint gives them more room. Between roughly 640–768px there's an awkward middle state.

**Suggestion:** Consider switching the heading column to span full width below `lg:` rather than `md:`, giving it more room to breathe: `grid-cols-1 lg:grid-cols-3`.

---

### 9. CTA arrow in card doesn't animate in current layout
`src/app/components/casestudyShowcase.js` — `group-hover:translate-x-0.5`

The `ArrowRight` icon on each card's "Read case study" link has a `group-hover:translate-x-0.5` class, but this requires the `group` class to be on a parent element. The card wrapper has `group` on the `Link`/`div`, so this should work — but confirm the animation fires correctly on hover, as the restructured card layout has changed the nesting depth.

**Suggestion:** Verify in browser. If the animation isn't firing, add `group` explicitly to the `<CardInner>` wrapper div.

---

### 10. Dark mode card images have no visible distinction between placeholder and loaded
`src/app/components/casestudyShowcase.js`

In dark mode, missing images render as `dark:bg-slate-800/50` containers — which is visually indistinguishable from intentional dark framing. This means broken cards don't look broken in dark mode, which can mask problems during development. The light mode cream placeholder makes missing images obvious; dark mode hides them.

**Suggestion (low priority):** Not worth fixing now, but when real images are in place this self-corrects. Just be aware that the dark mode screenshots won't reveal missing images as clearly as light mode.

---

### 11. Footer theme toggle is still buried
`src/app/components/footer.js`

Noted in the previous review — the dark/light toggle lives in the footer, which most visitors never reach. The dark mode palette is strong and distinctive, and moving the toggle to the nav would let people experience it. This remains unaddressed.

**Suggestion:** Move the `ThemeToggle` to the nav bar, placed between the desktop links and the Resume pill.

---

## What Works Well

- **The restructure is the right call.** Showing work before personal copy is the correct hierarchy for a hiring context — the page now answers "what do you make?" before "who are you?" This is a meaningful improvement over the previous structure.
- **The two-image card layout is more credible than the image stack.** Real screenshots in structured containers communicate professionalism. When the missing images are filled in, this layout will read significantly stronger than the fanned stack.
- **Hero is now appropriately sized.** The previous full-viewport hero with the solar chart left a large dead zone and buried the work. The current compact hero gets out of the way quickly.
- **Testimonials redesign is clean.** The two-column heading+cards layout elevates what were previously plain bordered boxes. The cream card background ties into the site palette. The pruning (removing avatars, tags, large quote mark) was the right call — less decoration lets the words land harder.
- **Amber accent consistency is excellent throughout.** Bullet dots, CTA links, gradient text, button — all use the same token. No rogue colours have crept in.
- **Dark mode is coherent end-to-end.** The navy background, muted amber accents, and subtle blob gradients hold together well across all sections. The dark card containers look intentional rather than inverted.
- **Typography is consistent.** Fraunces headings, DM Sans body, correct weights and sizes throughout — the typographic system has held up through all the changes.
