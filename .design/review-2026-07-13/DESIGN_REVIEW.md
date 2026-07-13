# Design Review: Portfolio 2.0 (live site)

Reviewed against: no `DESIGN_BRIEF.md` exists in this repo or `.design/` — used `CLAUDE.md`'s documented palette/typography/conventions as the de facto reference, since that's the closest artifact to a stated design direction.
Philosophy (inferred): warm-neutral editorial minimalism — flat white/navy base, amber (`#B84010`) accent, DM Sans throughout, cream/tan card containers, generous whitespace, restrained motion.
Site: https://www.tomspencer.design (production, as deployed right now — **not** the local working tree, which has uncommitted fixes from a same-day code audit that haven't shipped yet)
Date: 2026-07-13

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/light-home-desktop-1280.png` | Desktop (1280×800) | Home, light, real-scroll capture |
| `screenshots/light-home-tablet-768.png` | Tablet (768×1024) | Home, light |
| `screenshots/light-home-mobile-375.png` | Mobile (375×812) | Home, light |
| `screenshots/light-about-desktop-1280.png` | Desktop | About, light |
| `screenshots/light-about-mobile-375.png` | Mobile | About, light |
| `screenshots/dark-home-desktop-1280.png` | Desktop | Home, dark |
| `screenshots/dark-home-mobile-375.png` | Mobile | Home, dark |
| `screenshots/dark-about-desktop-1280.png` | Desktop | About, dark |
| `screenshots/light-mobile-nav-open-375.png` | Mobile | Full-screen mobile nav, open state |
| `screenshots/light-casestudy-modal-settled-desktop-1280.png` | Desktop | Prompt case study, intercepted-route modal, settled |
| `screenshots/light-casestudy-modal-scrolled-desktop-1280.png` | Desktop | Prompt modal, scrolled to stat row + Challenge |
| `screenshots/light-focus-state-desktop-1280.png` | Desktop | Keyboard focus state on nav "Work" link |
| `screenshots/light-mobile-header-crop.png` | Mobile (375×200) | Header crop confirming hamburger icon renders |

> All screenshots are in `.design/review-2026-07-13/screenshots/`.
> Two investigative detours are worth noting since they shape how much to trust this review's rigor: (1) a "blank gap" between the case-study cards and testimonials in early full-page captures turned out to be a Playwright fullPage-screenshot artifact — `whileInView` animations never fire without a real scroll event, so below-the-fold content freezes at `opacity:0`. Recaptured with real incremental scrolling; not a live bug. (2) What looked like an undocumented "hobbies gallery" on the About page (three travel photos) is actually a single pre-composed `aboutBanner.png` — confirmed by opening the file directly. Local code and live site agree; no discrepancy.

## Summary

Visually, this is a confident, well-executed portfolio — consistent palette, clean type hierarchy, tasteful restraint. Automated accessibility scanning (axe-core, WCAG2A/AA) came back clean on Home and About, which is a real achievement for a hand-rolled site with no component library. But three things pull this down from "polished" to "needs a pass before more recruiters see it": a live, verified WCAG AA contrast failure on the Prompt case study, a background-color bug already fixed in the local repo but **not yet deployed**, and a third-party competitor's product ("Nexus Commerce") visibly branded on the homepage's Rakuten card — which is a portfolio credibility risk, not just a content gap.

## Must Fix

1. **WCAG AA contrast failure on Prompt case study testimonial attributions**: `<cite>` text under all 3 pull-quotes renders at 2.51:1 contrast (`#90a1b9` on `#fafafa`), against a required 4.5:1 for 14px text. Confirmed via axe-core automated scan (`impact: serious`) directly against the live site — not a code-reading guess. Source: `globals.css`'s global `blockquote cite { text-slate-400 dark:text-slate-500 }` rule, consumed at `src/app/casestudy/Prompt/page.js:94,96,98`. Only Prompt uses `<cite>` (confirmed by grep — the other 3 case studies don't), so this is scoped to one page, but it's live right now for every visitor. _Fix: bump `cite`'s color at minimum to `text-slate-500` (light) — check the actual ratio, `slate-500` may still fall short depending on the exact background — or `text-slate-600` to match the rest of the site's muted-body-text convention, which already passes elsewhere._

2. **Stale cream (`#EDE7DD`) body background still live in production**: confirmed by fetching the deployed CSS directly (`body{background:#ede7dd}` in the shipped stylesheet) — this is the same bug already found and fixed in the local code-audit session, but that fix hasn't been pushed/deployed. Every light-mode visitor to `/about`, the 4 case-study pages, or 404 currently sees a cream flash before the page corrects to white. _Fix: deploy the pending local commit(s)._

3. **Rakuten homepage card shows a third-party competitor's UI, not Tom's work**: the "Offer Management Dashboard" card's screenshot (`offer_2.png`) clearly displays "Nexus Commerce" branding and product UI (visible in `screenshots/light-home-desktop-1280.png`, the fourth card). This was already flagged in the existing content backlog as needing a real screenshot from Tom, but seeing it rendered live sharpens the stakes: this isn't a placeholder gap, it's actively showing a stranger's product on Tom's portfolio, on the homepage, above the fold on scroll. Any hiring manager who recognizes "Nexus Commerce" will have questions. _Fix: this needs Tom's real screenshot — flagging with elevated urgency, not new scope._

## Should Fix

4. **No custom `:focus-visible` styling anywhere in the codebase** (confirmed: zero matches grepping `globals.css` and every component for `focus-visible`/`focus:`/`:focus`). Keyboard focus falls back entirely to the browser's default blue outline (see `screenshots/light-focus-state-desktop-1280.png`) — functionally accessible (visible, adequate contrast) but visually disconnected from the warm amber/cream palette everywhere else, and will render differently across Chrome/Safari/Firefox. _Fix: a single `:focus-visible { outline: 2px solid var(--color-accent-600); outline-offset: 2px; }` rule in `globals.css` would bring focus states on-brand site-wide in one place._

5. **~15 inline case-study images still lack the neutral ring outline** applied to homepage cards and the gallery (visible in the modal screenshots — the hero screenshot pairs inside Prompt's content have no ring, unlike the same images when framed on the homepage card). This was already flagged in the existing backlog as "skipped as repetitive/lower-value" — re-surfacing because seeing it side-by-side with the homepage (which does have the ring) makes the inconsistency more visible than it reads as a bullet point.

6. **Dark-mode hero flash** and the **Next.js dependency/dead-asset findings** from the same-day code audit are also still live in production for the same reason as #2 — nothing's deployed yet. Not re-detailing here since they're already documented and fixed locally; grouping under this item as a reminder that a deploy resolves 5 of this review's would-be findings at once.

## Could Improve

1. **`aboutBanner.png` is a single flattened ~1MB PNG collage** of three travel photos rather than three independent elements. It looks good and isn't broken, but it can't participate in the site's staggered-entrance motion language the way `AboutMeSection`'s photo+text or the case-study cards do — it just appears as one static block. Minor stylistic inconsistency, not urgent.
2. Testimonial `figcaption` attributions (e.g. "Project Manager") correctly use `text-slate-600`, not `text-slate-400` — worth noting only because it's the reference implementation the Prompt `cite` fix (Must Fix #1) should copy.
3. Tablet breakpoint (768px) already renders the desktop nav (Work / About / Resume inline) rather than the mobile hamburger — this is a direct consequence of Tailwind's `md:` breakpoint being `min-width: 768px` (inclusive), not a bug, but worth knowing if an actual 768px-wide tablet in portrait ever feels cramped in practice.

## What Works Well

- **Zero axe-core violations on Home and About** (WCAG2A/AA) — genuinely good for a hand-built site with no accessibility-focused component library underneath it.
- **Reduced-motion support is real, not decorative**: verified live with `prefers-reduced-motion: reduce` emulated — cards render at full opacity immediately with no dependency on scroll-triggered animation, confirming the `useReducedMotion()` branches in `casestudyShowcase.js`/`AboutMeSection.js`/`Testimonials.js` work as intended in production, not just in code.
- **Dark mode is a first-class citizen, not an inversion filter** — palette shifts (lighter amber ramp, navy instead of pure black, adjusted card tints) read as deliberately tuned rather than auto-generated, in both the screenshots and the underlying token values.
- **The case-study modal (intercepted route) is smooth and correctly settles** — spring slide-up, backdrop blur, sticky close button all work as intended once fully settled (confirmed by comparing a mid-flight capture against a properly-waited one — the mid-flight frame briefly looked broken but was purely a timing artifact of my own capture, not the site).
- **Visual hierarchy is unambiguous everywhere reviewed**: headline > sub-copy > CTA on the hero, card title > body > stat bullets > CTA on each case-study card — no competing focal points, no guessing where to look next.
- **Consistent warm-neutral card treatment** (cream/tan containers, amber accent, consistent border/shadow tinting) ties the homepage cards, testimonial cards, and About's "outside of work" card into one visual system rather than three unrelated components.
