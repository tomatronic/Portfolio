# Portfolio 2.0 — Claude Context

## Versions

### Prompt's screenshots span three generations of the UI (2026-08-26)
Found while adding the Approach artefact. Read from the navigation chrome
in each image, not from dates — treat the grouping as inferred:

| where | image | chrome |
|---|---|---|
| Hero | `Prompt-hero.png` | toggle pill, dark purple panel — **gen B** |
| Challenge | `Prompt-old2.png` | legacy manual builder — correct, it is the "before" |
| Approach | `Prompt-suggestion.png` | full-bleed purple, no sidebar — **gen A** |
| Solution | `Prompt-tags-alt.png` | toggle pill, no sidebar — **gen B** |
| Home card | `prompt-report.png` | left sidebar — **gen C, shipped** |
| (untracked) | `prompt-home.png` | left sidebar — **gen C, shipped** |

A reader skimming won't audit this, but **any caption that claims
currency obliges the rest of the page to hold to it** — a "What shipped"
label in Approach is contradicted by the Solution image two screens
later. That is why the concept/shipped pair was built and then parked on
2026-08-26 (see below); the single undated concept image makes no such
claim and is safe.

**The fix is three gen-C exports from Tom**: the home screen (he is
already replacing it), the tag/token state in the shipped sidebar layout,
and a new hero. The shipped design does still have tokens — they are in
the "Ask a follow up…" box at the foot of `prompt-report.png` — so the
tags shot should exist. Do that pass before adding any dated or
currency-claiming caption to this case study.

### Prompt's card image replaced (2026-08-26)
Finding 06's first third, and it needed no crop. `report-generated.png`
(1600×1222) is out and **`prompt-report.png`** (1287×867) is in — a new
screenshot Tom supplied, showing the Insights & Analytics screen with the
natural-language query and the generated chart, rather than another
top-strip of the purple Rakuten dashboard that cards 2 and 3 both open
with. `report-generated.png` was deleted, not left orphaned.

The new file is **1.484**, against a desktop image box of 832×565
(**1.472**) — `object-cover` trims ~3px a side, so nothing is lost. Below
`md` the 4:3 window centre-crops ~5% off each edge and clips the sidebar
label; unchanged behaviour, and it reads fine at that scale.

**The descriptor band is now the site's tightest contrast margin.**
Re-measured with the text hidden, sampling every pixel per band: title
3.64:1 (needs 3), descriptor **4.54:1** (needs 4.5), metrics 7.34:1. The
old three images gave 4.62–4.82 on the descriptor; this one is lower
because it is pure white at the left edge under that band, which is the
worst possible ground for white text — so 4.54 is the floor and no future
screenshot can push it lower. **Don't soften the middle stops of the top
ramp** — they are what 0.04 of margin now rests on.

~~Still open on finding 06: `touchpoints.png` and `view-campaign.png` want a
purpose-crop to 3:2.~~ — **closed in `ba04d4b`** (2026-08-26), which this note
predates. Both were cropped *and* renamed: `touchpoints.png` →
`acj-touchpoints.png` and `view-campaign.png` → `influencer-campaign.png`,
each now 1600×1067 — exactly 3:2. They are the ACJ and Influencer card images
in `CaseStudyCards.js`. Finding 06 has nothing left open.

### The concept/shipped pair, built and parked (2026-08-26)
A two-up comparison for the Approach section — `Prompt-suggestion.png`
labelled "First concept" beside `prompt-home.png` labelled "What
shipped", side by side from `md`, stacked below, one line of framing
copy under it. Built, measured, then **deliberately not committed**: the
"What shipped" label collides with the generation mismatch recorded
above. Rebuild it after the gen-C exports land.

Worth keeping from the build, because both were found the expensive way:
- **The images need `ring-1 ring-black/10`.** `prompt-home.png` is
  near-white and dissolved into the `#EDE7DD` ground — the same failure
  the 2026-07-25 ring pass fixed for the other twenty inline images. The
  ring has to sit on the `img`, which means sizing it with
  `width`/`height` + `max-h-full w-auto` rather than `fill`, since a
  ringed `fill` image rings the padding box instead of the picture.
- **Any fixed aspect box must be `md:` only.** A bare `aspect-[4/3]`
  constrained by height once the figures stacked, shrinking each frame to
  227px inside a 263px column on a 390px phone. The box exists to make
  two side-by-side frames agree on height; below `md` there is no row, so
  there is nothing for it to do.

**A reveal slider was considered and rejected.** It needs two spatially
aligned frames — same crop, one variable changed. These differ in aspect
(1.31 vs 1.71) and in layout (sidebar vs none), so a wipe would only ever
show half of each. A slider is worst exactly when the layout is what
changed. It would also need keyboard support and would fight page scroll
on touch, which is the trap `ImageWall` already documents.

### Review polish pass — findings 08/09/10 + 07 (2026-08-17)
Four more items from `.design/review-2026-08-15/` shipped, all code-only.
Commits `b83b5c5` (08/09/10) and `a1197b6` (07). What is left on that
review is **finding 11** (the ragged lab grid, needs a content decision on
the three "Coming soon" tiles) plus the Figma/copy items.

- **08 — nav hit areas.** Items in the pill now claim a 44px-tall box
  (`min-h-11` + `inline-flex items-center`); they were 27px, which clears
  WCAG 2.5.8's 24px floor but not the 44px this repo asks of nav. The
  pill's `py-3.5` came off to `py-1.5` to absorb it, so the pill is 58px
  against the old 55 and — critically — **still exactly 259px wide**,
  which the 480px breakpoint math in `Nav.js` is derived from. Widths are
  untouched (Work is narrowest at 39px); padding them to 44 would widen
  the pill and invalidate that measurement.
- **09 — the 404 is on-system.** `not-found.js` was the last page
  predating the current design: a 30px/600 heading outside the
  14/15/16/27 scale, and the only filled CTA on a site whose home uses
  ghost pills. Now built from `tokens.js` throughout, reusing the Hero's
  ghost-pill treatment. Dark accent moved `accent-400` → `accent-300`.
- **10 — work above the fold.** The intro's spacing was scaled by two
  thirds, 96/144 → 64/96 (`Hero.js`). **The ratio is the rule, not the
  numbers**: 96/64 is the same 1.5 the old 144/96 had, so the section
  break stays the larger space — the thing an earlier pass deliberately
  fixed. Note the "above" figure is the nav's own `pb-8` (32px) *plus*
  the hero's `pt`, not the `pt` alone. First card moved y=840 → y=737, a
  63px sliver at 1280×800.
  - This needed a second change to work at all: `CaseStudyCards`'
    `whileInView` used `viewport={{ margin: '-80px' }}`, so a card had to
    be 80px inside the viewport before animating. The new sliver fell in
    that dead band and rendered at `opacity: 0` — the space was made and
    stayed blank. Now `'0px'`.
- **07 — the dark-mode reveal.** See the note under CanvasReveal below.

**Measured, so it doesn't get re-litigated:** in dark mode the reveal
sheet and the section beneath it are 1.13:1 apart, against 20.38:1 in
light. Pure black gets 1.16:1; lifting the sheet to `#26314C` gets
1.58:1 and breaks the `#0F1623` ground shared with every other page.
Colour cannot fix the dark reveal — don't re-propose it. The fix is a
1px inset hairline on the sheet's **bottom** edge at 35% white
(`CanvasReveal.js`); the pre-existing 28% hairline is on the *top* edge
and never touched this boundary. Both must be inset — `clip-path` clips
an outer shadow away entirely — and neither needs a `dark:` variant,
since white-on-white is invisible in light mode.

**Not a bug, recorded so it isn't chased again:** sampling the home page
mid-`location.reload()` shows dark-mode text (`#F2F2F2`/`#B0B0B0`) over
a still-light `#ffffff` sheet, and axe reports ~12 contrast violations
from it. That is the inline FOUC script having applied `.dark` before
React repaints, and it resolves before paint on a settled page.
`ThemeProvider`'s `useLayoutEffect` already handles it. Verified correct
on production and dev, at 1280 and 375, on fresh load / toggle / reload
with dark persisted. **Always re-check contrast on a settled page.**

### Current version (active — from 2026-07-29)
See "Design direction overhaul" below — that is the live design. Everything in the dated sections beneath it describes the **previous** version and is kept as history.
- **Home**: `ConceptHome` — a white sheet that clips inward on scroll (`CanvasReveal`) to reveal a near-black Experiments & Lab section beneath. Intro (name / role / copy / Resume + LinkedIn), image-forward case study cards, lab tiles, footer.
- **Nav**: avatar left (home link, greyscale→colour, confetti burst + `cuelume` sound on click), centred pill, theme toggle right. Rendered inside the sheet on `/` and `/about`; supplied by `components/SiteChrome.js` everywhere else.
- **Background**: flat `#ffffff` light / `#0F1623` dark, set in `globals.css` (including `html.dark body`) and by `PageBackground.js`. The noise texture and gradient headline of the previous version are gone.
- **Palette**: amber `#B84010` accent retained for active/emphasis; ink scale is `#292929` / `#5D5D5D` / `#737373` (the tertiary was `#9E9E9E` until the contrast split — see Outstanding clean-up 3). Warm cream is no longer used anywhere on `/` or `/about`.
- Older hero experiments (SolarHero solar-arc chart, `/testHome`, `hero.safe.js`/`hero.original.js`) were deleted in June 2026; the noise/gradient hero this replaced is in git history (safe baseline commit `ce8b3de`).

### Case study stat rows — Prompt only (2026-08-04)
**Only Prompt has one, and that is settled.** It opens with a cream `#EDE7DD`
card of three headline figures between the header grid and the content grid.

Both other case studies were considered and **both were rejected** — don't
re-propose either:
- **InfluencerCampaigns**: a row was built from its three timeline figures
  (5 days / Day 6 / 5 months) and **removed the same day** — Tom's call. The
  numbers are a schedule, not outcomes, and framed as headline metrics they
  didn't make sense; they read correctly in the Outcome list where they sit
  as narrative. The row itself is in `c4c39ab` if it's ever wanted back.
- **ACJ**: Outcome and Impact are qualitative and the only hard number is the
  8-month timeline; a row padded out with "sole designer" would read as filler.
  Don't add one unless a real adoption figure turns up, and never promote the
  "40% of awareness-phase conversions" line — it's an `e.g.` of what a
  publisher *could* claim, not a measured result.

The pattern that emerged: a stat row earns its place only when the figures are
**measured outcomes**. Timelines and scope facts belong in Outcome prose.

If a third case study ever does get one, copy Prompt's markup rather than
re-deriving it: `sm:grid-cols-3`, stat at `text-[27px] font-medium
text-accent-600 dark:text-accent-300`, label at `text-[15px] text-[#5D5D5D]
dark:text-[#B0B0B0]`. Both `<p>`s need `data-keep` to opt out of `PROSE`'s body
sizing. Label ink is `#5D5D5D` (MUTED), **not** `#737373` (FAINT) — on the cream
ground `#737373` measures 3.85:1 and fails AA, `#5D5D5D` is 5.35:1. 27px is the
scale's ceiling, so the stat leads on colour and weight, not a display size.

### Design direction overhaul — new home + about promoted live (2026-07-29)
The `/concept-9f2k` exploration was adopted as the site's real design and the sandbox route was then removed; its components live in `src/app/components/site/`. `/` and `/about` now render `components/site/Home` and `components/site/About` (they were `ConceptHome` / `ConceptAbout` until the prefixes were dropped, see 2 below); the new nav and footer are global via `components/SiteChrome.js`; case study **bodies** keep their own layout but were brought onto the new type scale.

**Type system** lives in `src/app/components/site/tokens.js` (the `concept-9f2k` path this once gave was deleted with the sandbox route): sizes **14/15/16/27 only** — bumped from 12/13/14/24 in July 2026 when the 14px body was reported as too small, every step × 16/14 so the relationships are unchanged. Ink `#292929` / `#5D5D5D` / `#737373` light, `#F2F2F2` / `#B0B0B0` / `#8A8A8A` dark, with `FAINT_DISPLAY` (`#909090`) as a second tertiary for 24px-and-above only. 16px card radius, fully-round buttons, 14px nav icons / 20px card icons. `PROSE` in the same file applies it to long-form bodies via descendant selectors — needed because `globals.css` styles `h1`/`h2`/`p`/`blockquote` as *elements*, which beats anything inherited from a wrapper. `:not([data-keep])` on the `p` rule is the escape hatch for deliberately-sized paragraphs (Prompt's stat row).

### Component map (from 2026-07-29)
`src/app/components/site/` holds the design system and every page-level block:
`tokens.js` (scale, ink, radii, icon sizes, `GHOST_PILL`, `CONTAINER`,
`CASE_STUDY_CONTAINER`, `PROSE`), `Nav`, `Footer`, `ThemeToggle`, `CanvasReveal`,
`Home`, `Hero`, `CaseStudyCards`, `ExperimentsLab`, `About`, `ImageWall`,
`CaseStudyFigure`, `CaseStudyHeader`, `ZoomableImage`.
`src/app/components/` keeps the framework-level pieces: `SiteChrome` (renders
`Nav`/`Footer` on routes that don't render their own — decided by
`useSelectedLayoutSegment`, **not the pathname**: with the modal open the URL is
a case study but the page underneath is still home, and reading the URL put a
second nav and footer around it, fixed 2026-09-19), `ThemeProvider`,
`OtherCaseStudies`, `CardImageStack`.
`src/app/lib/` holds `caseStudies.js` (**the one list of case studies** — cards,
compact cards and sitemap all read it), `sound.js` (`playCue`, the try/catch
around `cuelume`), and `strava.js`.

**Deleted 2026-09-16 in a duplication pass:** `Prose.js` (never imported) and
`PageBackground.js` (set the body colour from a `useEffect`; `globals.css`'s
`body` / `html.dark body` rules already did it before first paint).
Route files (`page.js`) are thin: they set metadata and render the matching
block, e.g. `app/page.js` → `components/site/Home`.

## Outstanding clean-up (2026-07-29)

**1. ~~Orphaned components~~ — deleted 2026-07-29.** `navigation.js`, `footer.js`, `casestudyShowcase.js`, `AboutMeSection.js`, `Testimonials.js`, `ClosingCTA.js`, `examples.js`, and `ThemeToggle.js` (a chain orphan — its only importer was `footer.js`). All in git history.

**2. ~~Rename `concept-9f2k/`~~ — done 2026-07-29.** Shared components live in `src/app/components/site/` and the sandbox routes were deleted; nothing references that path any more, and the `robots.js` disallow went with it. The components also dropped their `Concept*` prefixes (`ConceptNav` → `Nav`, and so on) now that nothing collides. **There is no staging route** — changes to `components/site/*` go straight to the live pages.

**3. ~~Known accessibility exception~~ — resolved.** `#9E9E9E` on white was 2.68:1 and failed AA at every size it was used at. It is gone from `src/` entirely; `tokens.js` now splits the tertiary in two rather than darkening it wholesale, which would have flattened the ramp (L\* 16.6 → 39.5 → 65.1 becoming 22.9/10.1 steps) in a system that takes its hierarchy from colour rather than size:
- `FAINT` `#737373` for anything below 24px — 4.74:1 on white, 4.54:1 on the zinc-50 case study card.
- `FAINT_DISPLAY` `#909090` for `TEXT.title` and above, where the bar is 3:1 — 3.19:1 / 3.06:1.

Both are sized against `#fafafa` rather than `#ffffff`, because quote attributions land on the case study card and `#767676` measured 4.35:1 there. Dark mode never had the problem (`#8A8A8A` is 5.25:1 on the navy sheet).

### Code audit fixes (2026-07-13)
Ran the `improve` skill (`.agents/skills/improve/SKILL.md`) as a read-only audit, then implemented the findings directly:
- **Fixed**: `globals.css`'s `body` selector still had the pre-2026-07-01 cream default (`#EDE7DD`) — `PageBackground.js` only overwrites it in a `useEffect` (post-mount), so About, all 4 case-study pages, and 404 flashed cream→white on every light-mode load (Home was accidentally spared since its own wrapper div sets background inline). Now `#ffffff` to match.
- **Fixed**: `ThemeProvider.js` resolved the real theme (localStorage/system) inside a plain `useEffect`, which fires after first paint — dark-theme visitors briefly saw light-mode hero colours (`page.js`'s Home reads `theme` via JS, not Tailwind `dark:` classes) before the correction landed. Now uses an isomorphic `useLayoutEffect` (falls back to `useEffect` during SSR) so the correction happens before paint. Verified with Playwright (emulated dark color-scheme, cleared localStorage): resolves to `dark` immediately, no hydration warnings, no console errors.
- **Fixed**: bumped `next` to `^15.5.20` and the `tar` override to `^7.5.20` — closed all `npm audit` findings (was 2 moderate + 1 high on Next.js, none of the vulnerable surfaces were actually in use here, but the patched version was a free minor-patch bump). Verified `npm run build` still succeeds.
- **Removed**: ~8.9MB / 22 files of dead images from the deleted Brewtiful/DesignFlows case studies (`brewtiful*`, `designflows.png`, `dfbg.png`, `dfFinal.png`, `brandID.png`, `crit.png`, `poa.png`, etc.) — confirmed zero references anywhere in `src/app` before deleting.
- **Fixed**: stale doc references — removed the "hobbies gallery commented out" and "philosophy cards" claims from this file (neither exists in the current `about/page.js`; `/public/hobbies/travelling-1.png` is a real unused photo if that section ever gets built) and the outdated "InfluencerCampaigns hero is a placeholder" note (it's `/influencerHero.png`, already real). Reworded a comment in `CardImageStack.js` that referenced `dialkit` (removed as a dependency in June 2026).

### Design review + accessibility fixes (2026-07-13, later same day)
Ran `/design-review` against the **live** production site (not local), with Playwright screenshot capture across breakpoints/themes plus axe-core automated WCAG2A/AA scans. Full review at `.design/review-2026-07-13/DESIGN_REVIEW.md`. Found and fixed real contrast failures the earlier code audit didn't catch (that audit was code-reading only, not a rendered/automated accessibility scan):
- **Fixed**: `globals.css`'s global `blockquote cite` rule was `text-slate-400 dark:text-slate-500` — 2.51:1 light-mode contrast against Prompt's 3 testimonial cards (needs 4.5:1). Now `text-slate-600 dark:text-slate-400`, matching the site's existing muted-body-text convention (verified 7.26:1 light / 6.96:1 dark against the actual card backgrounds).
- **Fixed**: footer copyright text (`footer.js`) was `text-slate-500 dark:text-slate-500` (i.e. no real dark variant) — 3.8:1 in dark mode against the site's navy `#0F1623` (needs 4.5:1). Now `dark:text-slate-400` (7.06:1). This is global (every page), so it was failing site-wide in dark mode.
- **Fixed**: `InfluencerContent.js` persona cards had 3 more real contrast fails only surfaced by scanning that specific page (not covered by the earlier code audit or the first pass of this review): role/name line (`text-slate-500` → `text-slate-600` light), "Goals"/"Pain points" labels (`text-slate-400 dark:text-slate-500` → `text-slate-600 dark:text-slate-400`), and the Advertiser/Creator badge in dark mode (`dark:text-accent-400` → `dark:text-accent-300`). All verified against axe's actual computed/blended background colors, not assumed Tailwind defaults.
- **Verified clean**: re-ran axe-core (wcag2a/wcag2aa) against all 6 pages × both themes after the fixes — zero `color-contrast` violations remain anywhere.
- ~~**Known, not fixed this pass**: `aria-valid-attr-value` (critical) on InfluencerCampaigns~~ — **fixed 2026-07-25**, see below.
- **Content flag (not code) — resolved by hiding, not fixing**: the Rakuten homepage card screenshot (`offer_2.png`) visibly showed a third-party "Nexus Commerce" product UI, not Tom's work. Rather than replace the image, Tom hid the whole Rakuten case study 2026-07-13 (see Case study cards section) since it was the weakest of the four anyway.

### Quick fixes (2026-07-25)
- **Fixed**: `casestudy/InfluencerCampaigns/page.js` metadata description said "concept to production in **3 months**" while the h1, body copy, timeline (`InfluencerContent.js:32,245,381`) and the home card (`casestudyShowcase.js:28`) all said **5 months**. 5 is correct — the metadata was the only wrong instance, and it was what showed in search results and link previews.
- **Added**: on-brand keyboard focus. There was no `:focus-visible` styling anywhere in `src/` (0 matches) — focus fell back to the browser default blue outline. Added a single global rule in `globals.css`: `2px solid var(--color-accent-600)` with `outline-offset: 2px`, stepping up to `accent-400` in dark mode (accent-600 is too dark against the `#0F1623` navy). `:focus-visible` only, so mouse/touch presses don't show a ring.
- **Fixed**: bumped `react-medium-image-zoom` 5.3.0 → 5.4.8, which resolves the critical `aria-valid-attr-value` violation flagged on 2026-07-13. Verified the fix rather than assuming it: `aria-owns` no longer appears anywhere in the package's `dist/`. `npm run build` passes.
- **Added**: neutral outlines on **all 20 inline case-study images** (Prompt 4, ACJ 5, Rakuten 9, InfluencerCampaigns 2) — the long-deferred backlog item from the 2026-07-01 polish pass. Applied `rounded-2xl ring-1 ring-black/10 dark:ring-white/10` directly to each `<Image>`, matching the `casestudyShowcase.js`/`examples.js` convention.
  - Measured before deciding: 9 of the 20 have near-white edge pixels (`flowchart`/`offersFull`/`Prompt-userflow`/`affinitymap` at 255 luminance, plus `digitalwireframe`/`prototypeMap`/`legacy1`/`ACJ-activity-summary`/`prototypeScreens`) and were dissolving into the `#EDE7DD` cream container behind them. The other 11 are dark-edged and don't strictly need it — applied uniformly anyway so there's one rule rather than nine per-image exceptions, and a 10% ring is invisible on a dark image.
  - The `rounded-2xl` half also fixes a pre-existing bug: the images had square corners inside a `rounded-2xl` cream container with no `overflow-hidden`, so they overflowed its rounded corners.
  - Deliberately **did not** add `w-full` — images narrower than their container (e.g. the 1000px-wide ACJ set) keep rendering at natural size instead of upscaling.
- **Partly addressed**: `npm audit fix` took the count 7 → 4 (resolved `tar`; `next` moved 15.5.20 → 15.5.21 within its existing range — `package.json` unchanged, only the gitignored lockfile). The remaining 4 (3 high `sharp`/libvips, 1 moderate `js-yaml` via `@eslint/eslintrc`) only clear with `npm audit fix --force`, **which would downgrade Next to 14.2.35** — a breaking major downgrade to escape a transitive advisory in a build-time image dep. Not worth it for a static marketing site; left as-is deliberately. Re-check when `sharp` ships a patched libvips that Next 15 picks up.

### Layout changes (2026-07-15)
- **Removed** the tan/navy wrapper around the home page case study cards (commit `2c066c1`) — cards now sit directly on the page background with `gap-6` between them.
- **Fixed** horizontal alignment (commit `e932fb2`): nav, footer and case-study/about pages used `px-6` while the home hero, case study cards, about-me and testimonials used `px-4` — an 8px inset mismatch that made the nav look misaligned against home content. All standardised on `px-6`.

### Hidden concept explorations (`/concept-9f2k`, 2026-07-13 → resolved 2026-07-29)
Four commits of visual-direction exploration behind a hidden, noindexed route. **Resolved:** the direction was adopted (see "Design direction overhaul" above), its components moved to `src/app/components/site/`, and the route deleted. The earlier bold experiments it also held — weight-900 all-caps hero in amber / colour-block / indigo, and a matching case-study concept — were *not* adopted and exist only in git history.

### Interface polish pass (2026-07-01)
Applied the `make-interfaces-feel-better` skill (`.agents/skills/make-interfaces-feel-better/SKILL.md`) across the whole site — commit `af47a1b`, pushed. Re-run this skill for future UI work; it covers:
- **Staggered entrance animations**: `casestudyShowcase.js` (4 cards), `Testimonials.js` (2 cards), `AboutMeSection.js` (photo + text as 2 chunks) each now animate their own children via Framer Motion `variants`/`staggerChildren` instead of fading in as one block. `page.js` no longer wraps these in a page-level `fadeUp` — each component owns its own `whileInView`.
- **40×44px minimum hit areas**: footer mail/LinkedIn buttons, `ThemeToggle` Sun/Moon targets, nav mobile toggle + full-screen close button.
- **Scale on press** (`active:scale-[0.96]`): hero CTA, nav Resume pill, footer icon buttons, about-page resume/LinkedIn pills, modal close button, mobile menu toggle/close, theme toggle.
- **Icon cross-fade**: nav mobile Menu/X swap now animates (opacity/scale/blur, spring `duration:0.3 bounce:0`) instead of an instant swap.
- **No `transition-all`**: replaced with explicit property lists (`ThemeToggle.js`, modal close button).
- **Text wrapping**: `text-wrap: pretty` added to the global `p` base style (site-wide); `text-balance` added to card titles, About h1, and 3 case-study h1s.
- **Font smoothing**: `-webkit-font-smoothing: antialiased` added to `body` in `globals.css`.
- **Neutral image outlines**: `ring-1 ring-black/10 dark:ring-white/10` added to casestudyShowcase card screenshots and the "Additional work" gallery (`examples.js`) — these had no outline before.
- **Concentric radius**: casestudyShowcase outer tan container bumped `rounded-3xl` → `rounded-4xl` to match its `rounded-2xl` cards + padding.
- **Known tension, left as-is**: the amber-tinted rings on the About photo and `CardImageStack` (documented under "Card interactions" below) technically conflict with the skill's "pure neutral outline only" rule, but that tint is a deliberate brand accent — didn't override it.
- ~~**Not done**: the inline images across the 4 case-study content pages still have no outline~~ — **done 2026-07-25**, all 20 now ringed (see the 2026-07-25 section above).

## Project
Tom Spencer's portfolio site. Next.js 15 + Tailwind CSS v4 + Framer Motion.
Live dev server: `npm run dev` → `http://localhost:3000`

Project root: `/Users/thomasspencer/Documents/Portfolio2.0/portfolio2.0/`

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4, configured **CSS-first** in `globals.css` (`@import "tailwindcss"` + an `@theme` block). `postcss.config.mjs` is required and real — it loads `@tailwindcss/postcss` and autoprefixer. There is no JS config: `tailwind.config.js` was deleted 2026-09-09 (see Dark mode).
- **Animation**: Framer Motion
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: DM Sans only (`--font-dm-sans`) via `next/font/google` — single font across all text; headings and body both `font-normal` (400) as of 2026-07-13 (was `font-semibold`/600 — see Typographic scale section). Home hero is the one exception, at `font-medium` (500).
- **Deployment**: Vercel. `layout.js` mounts Vercel Analytics, Vercel Speed Insights, and `GoogleAnalytics` (`G-CCDKVM70NV`) from `@next/third-parties`.

## Key files
```
src/app/
  layout.js        — root layout: SiteChrome (nav + footer), ThemeProvider,
                     FOUC script, Vercel Analytics + Speed Insights + GoogleAnalytics, full
                     OpenGraph/Twitter metadata (metadataBase https://www.tomspencer.design,
                     /ogdata.png card)
  page.js          — thirteen lines: renders components/site/Home. The old noise/gradient
                     hero, CasestudyShowcase, AboutMeSection and Testimonials are in commit
                     18e886c if any of it is ever wanted back
  about/page.js    — renders components/site/About
  sitemap.js       — home, about + the 3 *linked* case studies (Rakuten is unlisted)
  robots.js        — robots.txt, points at sitemap
  not-found.js     — 404, rebuilt on tokens.js 2026-08-17
  globals.css      — @import "tailwindcss", @theme accent tokens, dark variant,
                     :focus-visible ring, element base styles
  components/
    SiteChrome.js       — renders Nav/Footer on routes that don't render their own
    ThemeProvider.js    — dark/light context; toggle() persists to localStorage
    OtherCaseStudies.js — compact cards at the foot of each case study
    CardImageStack.js   — fanned image stack, used by OtherCaseStudies
    site/               — the design system and every page-level block (see Component map)
  lib/
    caseStudies.js      — the case study list: slug, title, listed, card + stack data
    sound.js            — playCue(): cuelume, never allowed to throw
    strava.js           — 365-day running total for the About page
  casestudy/            — 4 case study pages (Prompt, InfluencerCampaigns, ACJ, Rakuten)
  @modal/               — intercepting route that renders case studies in a modal
public/
  just_me.webp     — nav avatar + favicon
  bio.png          — about page photo
  ogdata.png       — 1200×630 OpenGraph share card
  resume.pdf       — linked from the nav and the Hero
  outside/         — 7 photos for the About page ImageWall
  prompt_1-3, acj_1-3, influencer_1-3 — OtherCaseStudies card images
```

**There is no `/resume` route** — Resume is a direct link to `/resume.pdf`.

## ThemeProvider
`src/app/components/ThemeProvider.js`

One theme-switching method in context:
- `toggle()` — flips theme and writes to `localStorage`

## Navigation
`src/app/components/site/Nav.js` — the site's only nav. `components/navigation.js` (wordmark,
desktop links, full-screen `bg-slate-950` mobile menu) was **deleted 2026-07-29**; nothing
described here resembles it.

A three-zone grid from 480px up — avatar left, pill centre, `ThemeToggle` right. Below 480px it
becomes two rows with the pill alone on the second.

- **The avatar is the home affordance** (`just_me.webp`, 44px). No wordmark and no "Home" item,
  which keeps the pill down to three real destinations. Greyscale → colour and a 2°
  anticlockwise twist on hover; a confetti burst (5 particles on hover, 10 on click, accent-scale
  colours) and a `cuelume` `play('success')` cue on click. Both are skipped under
  `prefers-reduced-motion`, and the audio is wrapped in try/catch so autoplay policy can never
  block navigation.
  - The image carries `scaleX(-1)` **inline** — neither `scale-x-[-1]` nor `-scale-x-100`
    emitted a rule in this build — so the hover rotation must go on the wrapping span. A second
    transform on the image itself would replace the mirror and turn the face away.
  - Particles mount on the `Link`, not the inner span: that span is `overflow-hidden` to clip the
    avatar circle and would clip the burst too.
- **The pill** is one bordered control holding Work / About / Resume as plain text — Resume gets
  no special treatment, which is what lets it read as a single unbroken control. Resume is
  external, to `/resume.pdf`. Active item is `accent-600` / `dark:accent-300` (5.56:1 on white,
  8.31:1 on the navy sheet). Items claim `min-h-11` and the pill's own padding is `py-1.5` to
  absorb it — see finding 08 above.
- **480px is measured, not a Tailwind breakpoint.** The pill needs 259.3px; one row needs
  259.3 + 44 avatar + 44 toggle + 32 gaps + 48 page padding = 428px, and the threshold is set
  above that and clear of 428/430, both real iPhone widths. **It moves with the type scale** —
  it was 420 when the base was 14px. Re-measure the pill rather than assuming.
- Item hrefs are absolute (`/#work`, not `#work`) because the nav renders on About too.

## Case study cards (home page)
`src/app/components/site/CaseStudyCards.js` is the presentation only — **the
data is `lib/caseStudies.js`**, shared with `OtherCaseStudies` and `sitemap.js`.
Hide or reorder a case study there, in one place. (`components/casestudyShowcase.js`
was **deleted 2026-07-29**.)

Card order (top to bottom):
1. **Prompt** — Natural Language Search & AI
2. **InfluencerCampaigns** — Influencer Campaign Platform
3. **ACJ** — Multi-Touch Attribution for Affiliate

**These cards do not use the site's amber hover shadow.** They carry a purple lift
(`rgba(88,28,160,0.08)` at rest → `rgba(88,28,160,0.28)` on hover; `rgba(120,60,200,0.25)` →
`rgba(155,105,240,0.55)` dark), keyed to the product UI in the screenshots rather than to the
palette. `transition-shadow`, not `transition-all`. Outline is a neutral `ring-1 ring-black/10
dark:ring-white/10`, radius from `CARD_RADIUS`.

Cards stagger in individually on scroll. `whileInView` uses `viewport={{ margin: '0px' }}` — it
was `'-80px'`, which left the first card blank when finding 10 moved it to a 63px sliver above
the fold. Don't put that margin back without re-checking the fold.

**Rakuten hidden 2026-07-13** — Tom's call: it was the weakest case study (thin outcome metrics,
one-sentence Solution section, and its card image showed a third-party "Nexus Commerce" product,
not his own work — see the content flag below), and 3 case studies is fine given they're all
Rakuten Advertising-based anyway. It is `listed: false` in `lib/caseStudies.js`, which drops it
from the home cards, the compact cards and the sitemap at once — but the page itself (`src/app/casestudy/Rakuten/page.js`) and the
`@modal` slug mapping are untouched, so it's still reachable at `/casestudy/Rakuten` by direct
URL, just unlisted everywhere. Reversible: flip `listed` and give it a `card` and `stack`.

No cards are locked — all password-gate code was deleted in June 2026.

## Colour palette — Experimental (current)
**There is no noise texture anywhere on the site.** It was removed with the
2026-07-29 overhaul (`Home.js` records why: at 0.14 alpha it washed the white
sheet to roughly `#EDEDED`, which read as grey). Don't reintroduce it from an
older row of this table.

| Role | Light | Dark |
|------|-------|------|
| Page / intro sheet bg | `#ffffff` | `#0F1623` |
| Reveal, lab and footer ground | `#050505` | `#050505` (same in both themes) |
| Case study card | `bg-zinc-50` | `bg-slate-900` |
| Case study figure ground, stat row, persona and scoping cards (`WASH`) | `#8529CD` @ 8% (≈ `#F5EEFB`) | `#8529CD` @ 15% |
| Nav pill | `bg-white`, border `#292929`/12 | `bg-white/[0.04]`, border white/12 |
| Modal backdrop | `#EFEFEF` @ 80%, no blur | `#050505` @ 80% |
| Ink — primary / muted / faint | `#292929` / `#5D5D5D` / `#737373` | `#F2F2F2` / `#B0B0B0` / `#8A8A8A` |
| Case study card border (`OUTLINE`) | `#292929`/10 | white/10 |
| CardImageStack ring | black/10 | white/10 |
| Home card hover shadow | `rgba(88,28,160,0.28)` | `rgba(155,105,240,0.55)` |
| Blockquote border | `#292929`/20 | white/20 |
| Keyboard focus ring | `#292929` | `#F2F2F2` |

### There is no accent colour (from 2026-09-19)
The burnt-amber `accent-50…950` scale is gone from `globals.css` — Tom: orange
was never part of the branding. Every former accent use is primary ink now:
nav active state (ink against muted siblings), Prompt's stat figures (ink,
semibold), the 404 eyebrow, persona badges and avatar circles, list dots, the
focus ring, the blockquote border, the footer icon hover. The nav's confetti
burst picks ink greys per theme at burst time. `accent-*` classes render
nothing — grep for them rather than re-adding the scale.

## Button styles
The `btn-violet-3d` / `btn-dark-3d` utilities were removed from `globals.css` in June 2026. The only CTA treatment now is `GHOST_PILL` in `tokens.js`: ink wash at rest, fills to ink on hover.

## Dark mode
- **Tailwind v4** dark mode: configured via `@variant dark (&:is(.dark, .dark *))` in `globals.css`
- **There is no `tailwind.config.js`** — deleted 2026-09-09. Tailwind v4 only reads a JS config when `globals.css` names one with `@config`, and it never did, so the file's custom `fontSize` ramp (`base: 1.125rem`, `xl: 1.44rem`, …) had **never been in effect**: the built CSS resolves `--text-base: 1rem`, stock Tailwind. It was dead weight that read as live configuration. Configure in the `@theme` block instead; `darkMode: 'class'` is v3 syntax and would be ignored regardless.
- ThemeProvider adds/removes `dark` class on `<html>`. `toggle()` persists to `localStorage`.
- FOUC prevention: inline `<script>` in layout.js applies dark class before hydration
- `<html>` has `suppressHydrationWarning` to avoid React mismatch warnings
- **Theme-switching by hand in a browser tool**: the global 450ms colour crossfade in `globals.css` means `getComputedStyle` read straight after toggling `.dark` returns a mid-transition value. Wait ~500ms before measuring.
- `page.js` reads `useTheme()` directly and switches colour palette via JS (not Tailwind dark: classes)

## Case study modal (Parallel + Intercepting Routes)
Rebuilt as a **bottom sheet** on 2026-09-19, measured against matt-evans.co.uk.
The old version was a dialog: the case study's tinted card floated inside a
blurred panel with a floating X, so a visitor saw three nested frames — panel,
card, figure — and the home page smeared around the card's margins. Now:

- Clicking a card triggers `@modal/(.)casestudy/[slug]/page.js` — URL updates, the sheet
  slides up. Direct URL (`/casestudy/Prompt`) still renders the full page normally. The four
  slugs are a fixed set and prerender at build.
- **The sheet is the modal's own surface.** `max-w-[856px]`, centred, `rounded-t-2xl`, `bg-white
  dark:bg-[#0F1623]`, with a 64px (`md:` 80px) gap above it where the page behind shows through.
  856 not 904: the direct page loses 48px to its container's `px-6` before the card padding, so
  the sheet is 48px narrower to keep the same 760px measure. Dark mode adds a `ring-1
  ring-white/10` hairline — the sheet and scrim are both near-navy (finding 07 again).
- **The case study drops its card inside the sheet.** `CaseStudyModal` wraps its children in
  `CaseStudySurface`; `CaseStudyShell` reads that context and renders only the padding. On a
  direct visit the same shell renders the tinted card. See `CaseStudyShell.js`.
- **Backdrop is a flat wash, not a blur**: `bg-[#EFEFEF]/80 dark:bg-[#050505]/80`. Tom called this
  one "perfect" (2026-09-19) — a purple 8% version was shipped for a day on a misread and reverted.
  The blur it replaced turned the strip above the sheet into a smear. Clicking the scrim closes
  (`onScrimClick`, checked against `currentTarget`).
- **Two close affordances.** The floating X (44px circle at the viewport's top-right, over the
  scrim, in a zero-height sticky row at panel level — where it was before the sheet) is the accessible close and
  the only one in the tab order. The handle pill at the sheet's top-centre also closes on click
  but is `aria-hidden` + `tabIndex={-1}` — it's the sheet cue, not a second button for screen
  readers. The X was dropped for a day and came back at Tom's request: the handle alone was too
  quiet a cue.
- **The modal has a router-cache workaround, and it is load-bearing.** Land on
  `/casestudy/Prompt` directly, go home, click the card: without it the full page opens instead
  of the modal, because the hard load cached the full tree and the soft navigation reused it
  rather than asking the server, where interception happens. Present since the modal was added.
  `lib/interceptCache.js`: a direct visit sets a flag in `CaseStudyShell`; `Home` calls
  `router.refresh()` on mount if the flag is set. Don't remove either half.
- Animation unchanged: backdrop fade 0.28s / 0.18s; panel spring up, `easeIn` 0.22s down.
  `router.back()` fires after the panel animation completes.
- Scroll lock: `overflow: hidden` + `paddingRight` compensates for scrollbar width shift.
- **Don't trust the desktop app's Browser pane to screenshot this.** It captured a stale
  compositor layer for the scrim and showed the dark backdrop as light; Playwright rendered it
  correctly. Verify the modal with Playwright or the real site.

## Card interactions
- **Home case study cards**: purple shadow set, see the Case study cards section above.
- **OtherCaseStudies cards**: purple hover lift scaled down from the home tiles (see the
  component), border `OUTLINE`.
- **CardImageStack ring**: neutral `ring-1 ring-black/10 dark:ring-white/10`, like every other image.
- **Inline case study images**: `rounded-2xl ring-1 ring-black/10 dark:ring-white/10` on the
  `<Image>` itself (2026-07-25 pass).
- The "Extra Pixels" gallery (`examples.js`) was **deleted 2026-07-29** with the rest of the previous home page.

## OtherCaseStudies cards
`src/app/components/OtherCaseStudies.js` — compact cards at the foot of each case study.

- Layout: title left, `CardImageStack` right. Padding `px-5 py-8`, image container `h-16 w-28 mr-6`.
- Images come from each entry's `stack` in `lib/caseStudies.js` — `prompt_1-3`,
  `influencer_1-3`, `acj_1-3`. (**Not** `offer_1-3`; that set was deleted in `40f6df4`.)
- Border `OUTLINE`; purple hover lift matching the home cards, scaled down.
- `replace` on the Link prevents modal history stacking, so closing always returns home.
- Titles carry `data-flush` to opt out of `PROSE`'s heading bottom-margin — they sit in a centred
  flex row, where a bottom margin pushes them off the card's vertical centre.

## Case studies
- `/casestudy/Prompt` — Natural Language Search & AI (2025)
- `/casestudy/ACJ` — Multi-Touch Attribution for Affiliate (Oct 2022 – Jun 2023)
- `/casestudy/Rakuten` — Enhancing Offer Management (2021) — **hidden 2026-07-13** (unlinked everywhere, page still exists, see the Case study cards section above)
- `/casestudy/InfluencerCampaigns` — Influencer Campaigns (2025) — **not** password protected (all gate code deleted June 2026)
- Brewtiful and DesignFlows (older, junior-level work) were deleted June 2026 — recover from git history if needed

### Case study layout template (all 4 use this)
```jsx
<CaseStudyShell>
  <CaseStudyFigure hero priority src="/hero.png" width={1600} height={927} alt="…" />
  <CaseStudyHeader eyebrow="Rakuten Advertising • Date" title="Title" role="…" skills="…">
    <p>[intro]</p>
  </CaseStudyHeader>
  <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
    <div className="col-span-4 mb-12">[sections]</div>
  </div>
</CaseStudyShell>
```

`CaseStudyShell` (`components/site/CaseStudyShell.js`) is the surface: on a direct
visit it is the `rounded-2xl bg-zinc-50 p-8 md:p-12` card inside
`CASE_STUDY_CONTAINER`; inside the modal it is padding only, because the sheet
is already the surface. Its `SURFACE_PADDING` is what the hero's negative
margins are derived from — change one, change both. The card radius is 16px
now, not the old `rounded-4xl` 32px, so it matches `CARD_RADIUS` and the sheet.

**Every inline image is a `CaseStudyFigure`** (`components/site/CaseStudyFigure.js`):
it owns the cream ground, the ring and the `sizes` hint, so don't write the
wrapper out by hand — that markup was duplicated 21 times before 2026-09-16.
`zoom` makes it a `ZoomableImage`; pass `sizes="100vw"` with it. **`hero`** is
for the first image: the cream band bleeds to the surface's edges and takes its
top radius, so the hero is the top of the sheet rather than a picture inside it.
The screenshot keeps its ring inside the band — three of the four heroes are
near-white and would dissolve into a white sheet without it. The only page not
using `hero` is Rakuten, whose hero sits on a `bg-[url('/offerBG.png')]` panel.
**The header is a `CaseStudyHeader`**; `title` accepts a node for ACJ's tinted
product name. **The hero has no ring and fills the surface edge-to-edge**, clipped
by the top corners; its band is the purple `WASH`, which shows through the hero
PNGs' transparent regions (Tom, 2026-09-19). The three heroes are 1600×727,
1600×727 and 1600×900 — the code said 927 for all three until 2026-09-19, which
was a layout shift on load once the image went `h-auto`.

`CASE_STUDY_CONTAINER` is `max-w-[904px]`, a 760px content column. It was
`max-w-6xl` (a 1008px column, 132 characters a line) until 2026-08-17 — see the
token's own comment for the measured chars-per-line scale before changing it.
`PROSE` on the inner card is what applies the type system to the bare
`h2`/`p`/`ul`/`blockquote` inside; anything setting its own size needs
`data-keep`.

**Known content gaps (not code issues):**
- ~~InfluencerCampaigns: outcome/adoption metrics missing~~ — **closed 2026-08-04.** Adoption metrics don't exist. The page stands on its narrative instead; a stat row built from its timeline figures was tried and rejected (see "Case study stat rows" above). Hero image is `/influencerHero.png`, already real.
- Rakuten: Solution section is one sentence — needs expanding; no outcome metrics (lower priority now the case study is hidden — see Case study cards section)
- ACJ: "35 DAU" metric needs context (total eligible users)
- ~~Prompt: missing before/after comparison copy + section header for `Prompt-old2.png`~~ — **closed.** The Challenge section now has an `<h3>The builder it replaced</h3>` and two paragraphs of before-copy above the image. (`Prompt-userflow.png`, the customer journey map, went into Approach 2026-05-26.)
- ACJ: "35 daily active users" metric removed from Impact section 2026-05-26 (no denominator; removed rather than reframed)

**Unused images in /public/ (audited 2026-09-09 — the list is now one item):**
- `prompt-home.png` — **untracked on purpose** (2026-08-26). Tom added it
  alongside `prompt-report.png` and is replacing it shortly; it isn't
  referenced anywhere yet, so it's staying out of git until it has a job.

Everything else this list used to offer is **gone, not pending**. `40f6df4`
(2026-07-30, "Drop 51MB of files the site does not use") deleted
`Prompt-error.png`, `ACJ-early-mock*.png`, `ACJ-pub-view.png`,
`ACJ-advertiser-view.png` and the whole `Campaign*.png` set — including the
three earmarked for an Influencer 3-col grid. That plan cannot be actioned
from `/public/`; it needs new exports from Tom, and is only worth reviving if
he wants it. `Prompt-suggestion.png` also left the list by the other route:
it is **in use**, in Prompt's Approach section (`casestudy/Prompt/page.js:89`).

The blobs are still in git history if any of the deleted set is wanted back
(`git show 40f6df4^:public/<name>`), so nothing is unrecoverable — but they
are deliberately not in the working tree.

## About page
`src/app/about/page.js` → `components/site/About.js`

Sections, in order: lead + bio photo, "Where I add value" (5 cards), "What
colleagues say" (2 testimonials), "Outside of work", closing CTA. All cards use
the shared outlined treatment — `CARD_RADIUS` + `border-[#292929]/10
dark:border-white/10`, no fill.

### Outside of work (rebuilt 2026-07-31)
Two-column on `lg`: copy card and a Running stat card stacked left,
`components/site/ImageWall.js` right. Both left cards are `flex-1` so the column
fills the photo area's height and all three blocks sit on the same 12px gutter;
the stat card is additionally `justify-between`, which drops the figure to its
foot however tall it ends up.

- **`ImageWall`** is seven photos scattered over the area, each its own Framer
  `drag` with `dragConstraints={areaRef}`, so they can be pushed around and
  re-stacked but never leave the block. `onPointerDown` raises the grabbed photo
  above the resting stack (`LIFT_FROM`, an incrementing counter) — on pointer
  down rather than drag start, so it comes forward the instant it's grabbed.
  - Placement, size, rotation and stack order are **hand-authored in `PHOTOS`,
    not randomised**. Runtime random would differ between the server and client
    renders and would reshuffle on every navigation.
  - Coordinates are px against a **442×520** area — the width the right column
    settles at once the page hits `lg` and the container caps at `max-w-4xl`.
    That is why the scatter is gated on `lg` as well as pointer type: below it
    the area goes full-width and fixed coordinates would leave the right bare.
  - **Two layouts, switched on `(pointer: fine)` and `(min-width: 1024px)`.**
    Anything else — touch, pen, narrow desktop — gets a plain 2-column grid with
    no drag: dragging by finger fights the page's vertical scroll, and the
    scatter hides too much of each photo at phone width. Both queries are read
    in a layout effect, so the swap lands before paint and mouse users never see
    the grid flash.
  - Rotation means a photo can rest ~10px outside the area (Framer clamps the
    layout box, not the rotated one). Deliberate — a pile spilling its notional
    box is the point.
  - **The photos are real and in place** — seven of them under `/public/outside/`
    (Fuji, Gyeongbokgung, two from Glendalough, Kinkaku-ji, the Seven Sisters, a
    South Downs walk), each with descriptive alt text in `PHOTOS`. The dummy
    gradients this file used to describe are long gone; the coordinates below were
    hand-authored against the real set.
- **Running stat** comes from `src/app/lib/strava.js`. Strava is wired up and
  live (838km when last checked, 2026-08-17). `FALLBACK_KM` in `About.js` is
  what renders whenever the API returns nothing — see the fallback note under
  Strava below for why it is a floor and why it should stay one.
- `/aboutBanner.png` was deleted 2026-08-04 (the wall replaced it; zero
  references). In git history if the wall is ever reverted.

### Strava
`lib/strava.js`, called from the About route with `revalidate = 86400`, so the
page stays static and refreshes once a day. Needs `STRAVA_CLIENT_ID`,
`STRAVA_CLIENT_SECRET`, `STRAVA_REFRESH_TOKEN`; with any missing it returns
`null` and the fallback renders. There is no rolling-365-day endpoint — the
`/athletes/{id}/stats` totals are 4-week / year-to-date / all-time only, and YTD
resets in January — so it pages `/athlete/activities` with an `after` timestamp
and sums locally. One-off instructions for minting the refresh token are in a
comment at the foot of that file.

**The card currently carries no attribution, and that is Tom's call, not an
oversight.** Two forms were tried and both removed on 2026-08-05:
- a plain "via Strava" text link in the card's header row (the original);
- the official **"Powered by Strava"** logo at the card's foot, 12px tall, from
  Strava's API asset pack. Built at `components/site/PoweredByStrava.js`
  (deleted; recover from `43cf760`). Notes if it ever comes back: the orange
  file is **two-tone** — "POWERED BY" black, wordmark `#FC5200` — so dark mode
  needs the black half bound to `currentColor` to flip white, since Strava ship
  no orange-on-dark variant. Orange, black and white are the only sanctioned
  colours; don't tint it into the site's ink scale or drop its resting opacity.
  It was briefly linked to `strava.com/athletes/50591363`, which was removed
  because Strava gates profiles behind a login wall — **don't re-add that link.**

Two consequences to be aware of rather than fix unprompted:
- Strava's guidelines require visible attribution wherever their data appears.
  If it's ever wanted back in the least obtrusive form, their guidelines
  explicitly permit **plain text** — the exact phrase "Powered by Strava" or
  "Compatible with Strava" — which would sit in `FAINT` ink like any caption.
- The attribution used to render only when the figure was live, so it doubled as
  the one visual tell that `FALLBACK_KM` had fired. Its removal is what made the
  fallback indistinguishable from a real figure — addressed 2026-08-17, see
  below.

### The fallback figure (2026-08-17)
`FALLBACK_KM` was **1,234** — a made-up placeholder rendering as "1,234 km ran
in the last 365 days" in the same typography as the live figure. With the Strava
badge gone there was nothing to give it away, so an outage would have produced a
confident false claim, and an inflated one: the real number is ~838.

Now **500**, and the card changes what it says when the figure isn't live:

| | figure | caption |
|---|---|---|
| live | `838 km` | ran in the last 365 days |
| fallback | `500+ km` | ran in a typical year |

Both halves matter. The `+` makes it a floor rather than an estimate, and the
looser window is a claim a floor can actually support — "the last 365 days" is
precise and only live data earns it. Together they also restore the visual tell
the Strava badge used to provide.

**Keep the floor low.** 500 is set well under the real figure deliberately, so
it stays true through a bad year. Don't creep it up towards whatever Strava is
currently returning — a floor set just under today's number is a precise number
wearing a plus sign, and because this path is invisible until it fires, nobody
will notice when it goes stale.

Hiding the card entirely when the figure isn't live is still the strictest fix
if this ever needs revisiting. It was weighed on 2026-08-17 and the floor was
chosen instead: the card keeps doing its job, and a true vague claim beats no
claim.

## Typographic scale

**Scope, because two systems now coexist.** Everything below describes the
`globals.css` *element* defaults, which still govern any bare heading or
paragraph. But `/`, `/about` and everything in `components/site/` are built on
`tokens.js`'s own scale (14/15/16/27), and case study bodies have `PROSE`
applied on the wrapper, whose descendant selectors outrank these element rules.
So this section is the fallback layer, not what the home page or a case study
body actually renders at.

Harmonized 2026-07-13 in two passes:
1. **Size**: the primary heading was inconsistent across pages (Home hero peaked at 60px desktop, case-study h1s were a flat 36px with no mobile step, About's h1 was smaller at 24→30px, and AboutMeSection's h2 was accidentally bigger than About's own h1 at 30→36px). All primary headings now converge on one shared responsive step — 30px mobile → 36px tablet+. Case-study in-page section headings (Challenge/Solution/etc.) were bumped from a flat 20px up to the shared 24px→30px h2 size, and h3 sub-points were normalized to always use tighter `pt-6` spacing (was a mix of `pt-6`/`pt-10`, which sometimes made an h3 read identically to an h2).
2. **Weight**: the shared `h1`/`h2`/`h3` default in `globals.css` was still `font-semibold` (600) — a legacy value nothing actually matched anymore, since every deliberately-styled heading (Home hero, About h1, AboutMeSection's h2, card titles) already overrode it to `font-normal` (400). This left "What colleagues say." (an unstyled `<h2>`, inheriting the stale 600 default) visibly heavier than its sibling headings once they were all the same size. Fixed by changing the shared default itself to `font-normal` — this also lightened every case-study h1/h2/h3, which had the same problem. Home's hero is the one deliberate exception, bumped to `font-medium` (500) as the single heaviest text on the site.

Single font: **DM Sans** (`--font-dm-sans`) for all text. Hierarchy is now created primarily through size and spacing, with weight mostly uniform except the Home hero.

| Role | Font | Size | Weight | Color | Leading |
|------|------|------|--------|-------|---------|
| Home hero h1 (the one exception) | DM Sans | `text-3xl md:text-4xl` (30px → 36px) | `font-medium` (500) | inline (`#ffffff` dark / `#020617` light) | `lineHeight: 1.05` inline |
| Page title (h1) — About, all 4 case studies | DM Sans | `text-3xl md:text-4xl` (30px → 36px, globals default) | `font-normal` (400, globals default) | `text-slate-950 dark:text-white` | `leading-tight` |
| Section heading (h2) — "A little about me", "What colleagues say.", case-study Challenge/Solution/etc. | DM Sans | `text-2xl md:text-3xl` (24px → 30px, globals default) | `font-normal` (400, globals default) | `text-slate-950 dark:text-white` | `tracking-tight` |
| Sub-heading (h3) — case-study sub-points, always `pt-6` above (never `pt-10`, which is h2-only) | DM Sans | `text-xl` (20px, flat, globals default) | `font-normal` (400, globals default) | `text-slate-950 dark:text-white` | — |
| Body / muted text | DM Sans | `text-base` | `font-normal` | `text-slate-600 dark:text-slate-400` | `leading-relaxed` |
| Small / caption | DM Sans | `text-sm` or `text-xs` | — | — | — |

**Rule going forward**: any new primary page heading or section heading should use a plain `<h1>`/`<h2>`/`<h3>` with no size or weight override at all — the globals defaults now match the site's actual design intent, so most new headings need zero custom classes. The only sanctioned exception is the Home hero's `font-medium`. Don't introduce a third one-off weight or size for any heading role — that's exactly the drift these two passes just cleaned up.

**Rule**: All body/muted `<p>` text must use `text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400`. Do NOT use `font-medium`, `text-slate-700`, `leading-7`, or `text-lg` for regular body copy.

**DM Sans on non-heading elements**: apply via `style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}` — there is no Tailwind utility class for it.

## globals.css base styles
```css
h1    { font-family: DM Sans; text-3xl md:text-4xl font-normal leading-tight tracking-tight dark:text-white }
h2    { font-family: DM Sans; text-2xl→text-3xl font-normal tracking-tight text-slate-950 dark:text-white }
h3    { font-family: DM Sans; text-xl font-normal tracking-tight text-slate-950 dark:text-white }
p     { text-base font-normal leading-relaxed mb-4 text-slate-600 dark:text-slate-400 }
blockquote { italic border-l-4 border-accent-300 dark:border-accent-600 pl-4 text-slate-600 dark:text-slate-400 my-6 }
blockquote cite { block mt-2 not-italic text-sm text-slate-600 dark:text-slate-400 }
li    { text-slate-600 dark:text-slate-400 }
```

**The `cite` values above are the fixed ones.** This block listed
`text-slate-400 dark:text-slate-500` until 2026-09-09 — the pre-fix value that
measured 2.51:1 on Prompt's testimonial cards and was corrected on 2026-07-13.
Anyone restoring globals.css from this summary would have reintroduced the
failure. Check the file, not this block, if they ever disagree again.

## Case study page spacing system
- Main card padding: `p-8 md:p-12`
- Between major sections: `mb-12`
- Image containers: `mb-8`
- Section heading top: `pt-10`
- Lists: `mb-8 space-y-2`
- Grid gaps: `gap-8 md:gap-12`
- Section h2: `pt-10 text-xl tracking-tight` (font-normal from globals)
- Section h3: `pt-10` (font-normal, size from globals); use `pt-6` for tighter sub-sections within a group

## Footer
`src/app/components/site/Footer.js` — the site's only footer. `components/footer.js` was
**deleted 2026-07-29**.

Dark in both themes, so it reads as one continuous block with the Experiments & Lab section above
it. Centred column: "Want to get in touch?" at `TEXT.title`, two 40×40 icon buttons (Email,
LinkedIn — `hover:bg-accent-600`, `active:scale-[0.96]`), then `Designed and built by Tom Spencer
© {year}` at `TEXT.xs` in `DARK_FAINT`.

**The theme toggle is not here** — it moved into the nav's right zone. On otherwise-light routes
`SiteChrome` wraps this footer in a `#050505` band so it keeps the ground it is built for.

## Important conventions
- Dark mode uses Tailwind v4 `@variant dark` — all `dark:` classes work via `.dark` class on `<html>`.
- `CardImageStack.js` is a shared component — changes affect all card layouts.
- Favicon: `icons: { icon: '/just_me.webp' }` in `generateMetadata()` in `layout.js`.
- Image filenames in `/public` must be lowercase (e.g. `.png` not `.PNG`) — Vercel runs on Linux (case-sensitive).
- `group-hover` animations require `group` class on the parent element — check this when adding arrow animations to links.
- The Hero's Resume/LinkedIn pills and the 404's CTA share `GHOST_PILL` from `tokens.js`. The 404 adds `min-h-11`; the Hero pills don't — a 44px hit-area inconsistency worth settling one way or the other.
- UI sounds go through `lib/sound.js`'s `playCue()`, never `cuelume`'s `play()` directly — the try/catch is what stops autoplay policy from blocking the click.
- `components/site/ThemeToggle.js` is plain Tailwind `dark:` classes with **no inline styles** — the old cream/teal `components/ThemeToggle.js`, which did use inline `style` props, was deleted 2026-07-29.
- Do NOT add `w-screen` to any element — use `w-full` to avoid horizontal scroll from scrollbar width.
- Nav requires `relative` class for `z-50` to create a stacking context — without `relative`, z-index has no effect.
- **Tailwind scans `src/` only** (`@import "tailwindcss" source("../")` in `globals.css`). Class names written in this file do not reach the stylesheet — they used to, and a retired colour lived on in the CSS through a doc table.
- **There is no beige on the site any more.** Figure grounds and case study cards use `WASH` from `tokens.js` (Rakuten purple at 8% / 15%); outlined cards use `OUTLINE`. `#EDE7DD` and `#C8BEB0` were retired 2026-09-19 — don't reintroduce them.
- **Hover is ink.** `GHOST_PILL` fills to `#292929` (dark: `#F2F2F2`); the footer icons, which sit on the dark ground, fill to `#F2F2F2`. There is no accent colour to hover to.
- All case study metadata rows use `text-slate-600 dark:text-slate-400` — do NOT use `text-gray-600`.
- `<cite>` inside `<blockquote>` renders as a new line automatically (styled in globals.css as `block mt-2 not-italic text-sm`).
- Icon-only buttons need a **40×40px minimum hit area** (44×44px for nav/mobile toggles) — don't rely on icon size + small padding alone.
- Buttons/links get press feedback via `active:scale-[0.96]` — never go below `0.95`, it reads as exaggerated.
- Never use `transition-all` — list exact properties, e.g. `transition-[background-color,color,transform]`.
- Headings use `text-balance`; the global `p` base style has `text-wrap: pretty` (set in `globals.css`) so body copy avoids orphans everywhere without per-instance classes.
- `body` has `-webkit-font-smoothing: antialiased` (added 2026-07-01).
- Design-engineering polish skill lives at `.agents/skills/make-interfaces-feel-better/SKILL.md` — re-run it for future UI/animation work rather than re-deriving these principles from scratch.
- Additional project-scoped skills (pulled in from job-monitor, 2026-07-13; registered in `skills-lock.json`): `animation-vocabulary`, `apple-design`, `emil-design-eng`, `improve`, `improve-animations`, `review-animations` (all `emilkowalski/skills` except `improve`, which is `shadcn/improve`). Some overlap with `make-interfaces-feel-better` on animation/polish principles — check both before assuming one is authoritative.
