# Portfolio 2.0 — Claude Context

## Versions

### Current version (active — from 2026-07-29)
See "Design direction overhaul" below — that is the live design. Everything in the dated sections beneath it describes the **previous** version and is kept as history.
- **Home**: `ConceptHome` — a white sheet that clips inward on scroll (`CanvasReveal`) to reveal a near-black Experiments & Lab section beneath. Intro (name / role / copy / Resume + LinkedIn), image-forward case study cards, lab tiles, footer.
- **Nav**: avatar left (home link, greyscale→colour, confetti burst + `cuelume` sound on click), centred pill, theme toggle right. Rendered inside the sheet on `/` and `/about`; supplied by `components/SiteChrome.js` everywhere else.
- **Background**: flat `#ffffff` light / `#0F1623` dark, set in `globals.css` (including `html.dark body`) and by `PageBackground.js`. The noise texture and gradient headline of the previous version are gone.
- **Palette**: amber `#B84010` accent retained for active/emphasis; ink scale is now `#292929` / `#5D5D5D` / `#9E9E9E`. Warm cream is no longer used anywhere on `/` or `/about`.
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
The `/concept-9f2k` exploration was adopted as the site's real design and the sandbox route was then removed; its components live in `src/app/components/site/`. `/` and `/about` now render `ConceptHome` / `ConceptAbout`; the new nav and footer are global via `components/SiteChrome.js`; case study **bodies** keep their own layout but were brought onto the new type scale.

**Type system** lives in `src/app/concept-9f2k/tokens.js`: sizes 12/13/14/24 only, ink `#292929` / `#5D5D5D` / `#9E9E9E` (dark: `#F2F2F2` / `#B0B0B0` / `#8A8A8A`), 16px card radius, fully-round buttons, 14px nav icons / 20px card icons. `PROSE` in the same file applies it to long-form bodies via descendant selectors — needed because `globals.css` styles `h1`/`h2`/`p`/`blockquote` as *elements*, which beats anything inherited from a wrapper. `:not([data-keep])` on the `p` rule is the escape hatch for deliberately-sized paragraphs (Prompt's stat row).

### Component map (from 2026-07-29)
`src/app/components/site/` holds the design system and every page-level block:
`tokens.js` (scale, ink, radii, icon sizes, `PROSE`), `Nav`, `Footer`,
`ThemeToggle`, `CanvasReveal`, `Home`, `Hero`, `CaseStudyCards`,
`ExperimentsLab`, `About`, `Prose`.
`src/app/components/` keeps the framework-level pieces: `SiteChrome` (renders
`Nav`/`Footer` on routes that don't render their own), `ThemeProvider`,
`PageBackground`, `OtherCaseStudies`, `CardImageStack`.
Route files (`page.js`) are thin: they set metadata and render the matching
block, e.g. `app/page.js` → `components/site/Home`.

## Outstanding clean-up (2026-07-29)

**1. ~~Orphaned components~~ — deleted 2026-07-29.** `navigation.js`, `footer.js`, `casestudyShowcase.js`, `AboutMeSection.js`, `Testimonials.js`, `ClosingCTA.js`, `examples.js`, and `ThemeToggle.js` (a chain orphan — its only importer was `footer.js`). All in git history.

**2. ~~Rename `concept-9f2k/`~~ — done 2026-07-29.** Shared components live in `src/app/components/site/` and the sandbox routes were deleted; nothing references that path any more, and the `robots.js` disallow went with it. The components also dropped their `Concept*` prefixes (`ConceptNav` → `Nav`, and so on) now that nothing collides. **There is no staging route** — changes to `components/site/*` go straight to the live pages.

**3. Known accessibility exception.** `#9E9E9E` on white is 2.68:1 — fails AA (4.5:1) for the 13px "About" eyebrow and testimonial roles, and the 3:1 large-text threshold for the 24px "Senior Product Designer". It is the specified tertiary ink; clearing AA below 24px would need roughly `#767676`. Deliberate, undecided.

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
- **Styling**: Tailwind CSS v4 (`globals.css` — uses `@import "tailwindcss"`, no PostCSS config needed)
- **Animation**: Framer Motion
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: DM Sans only (`--font-dm-sans`) via `next/font/google` — single font across all text; headings and body both `font-normal` (400) as of 2026-07-13 (was `font-semibold`/600 — see Typographic scale section). Home hero is the one exception, at `font-medium` (500).
- **Deployment**: Vercel (Analytics integrated)

## Key files
```
src/app/
  layout.js                   — root layout: Navigation, Footer, ThemeProvider, PageBackground, FOUC script, full OpenGraph/Twitter metadata (metadataBase https://www.tomspencer.design, /ogdata.png card)
  page.js                     — home page: noise/gradient hero (inline) + CasestudyShowcase + AboutMeSection + Testimonials
  sitemap.js                  — sitemap for home, about + the 4 linked case studies
  robots.js                   — robots.txt, points at sitemap
  not-found.js                — branded typographic 404 with back-home CTA
  globals.css                 — Tailwind v4 config, @theme accent tokens, dark mode variant, base styles
  components/
    casestudyShowcase.js      — work cards: individual white cards (rounded-2xl, ring border, hover shadow) sitting directly on the page background with `gap-6` between them. The warm tan outer container (#C4B09A light / #0D1927 dark) was removed 2026-07-15. Each card: image left (46%, padded inset, rounded-xl screenshot with shadow) / text right (54%): title, body, bullets, CTA arrow.
    navigation.js             — top nav: "Tom Spencer" wordmark, desktop links, Resume pill, mobile full-screen menu. No background (fixed noise/gradient shows through).
    PageBackground.js         — sets body bg from theme: #ffffff light / #0F1623 dark (was #EDE7DD light, changed 2026-07-01)
    AboutMeSection.js         — open editorial layout: large DM Sans headline + 2 body paragraphs + "More about me →" + LinkedIn link. Photo + text animate in as 2 staggered chunks.
    Testimonials.js           — "What colleagues say" — heading/sub-copy left, 2 stacked quote cards right (staggered entrance)
    examples.js               — ExampleGallery: hover-expand 4-image grid ("Extra Pixels" section)
    CardImageStack.js         — fanned/spread image stack, used by OtherCaseStudies
    ThemeProvider.js          — context for dark/light theme; toggle() persists to localStorage
    ThemeToggle.js            — pill toggle (Sun/Moon icons) in footer — cream/teal branded, no Tailwind dark: classes (uses inline styles). Sun/Moon targets are 40×40px.
    OtherCaseStudies.js       — compact cards at bottom of each case study (title left, image stack right)
    footer.js                 — footer with ThemeToggle + copyright
  casestudy/                  — 4 individual case study pages (Prompt, InfluencerCampaigns, ACJ, Rakuten)
  @modal/
    default.js                — null default for modal slot
    (.)casestudy/[slug]/
      page.js                 — intercepts /casestudy/* navigation, renders content in modal
      CaseStudyModal.js       — modal shell: spring slide-up, sticky close button, teal-tinted bg
  about/
  resume/
public/
  just_me.webp                — nav avatar + favicon
  bio.png                     — about page photo
  ogdata.png                  — 1200×630 OpenGraph share card (refreshed by Tom, June 2026)
  resume.pdf
  prompt_1.png, prompt_2.png, prompt_3.png  — Prompt case study card images
  acj_1.png, acj_2.png, acj_3.png          — ACJ case study card images
```

## ThemeProvider
`src/app/components/ThemeProvider.js`

One theme-switching method in context:
- `toggle()` — flips theme and writes to `localStorage`

## Navigation
`src/app/components/navigation.js`

- Left: "Tom Spencer" wordmark, `font-normal text-2xl` (no avatar image).
- Desktop links: Work, About, Resume pill (hover → `accent-600` with white text)
- Mobile: full-screen `bg-slate-950` overlay with Menu/X lucide icons. Links are `font-normal` (not bold).
- `className="relative z-50"` — `relative` is required for `z-50` to take effect
- **No background** — fixed noise/gradient layers show through nav area. This is intentional.

## Case study cards (home page)
`src/app/components/casestudyShowcase.js`

Card order (top to bottom):
1. **Prompt** — Natural Language Search & AI (linked)
2. **InfluencerCampaigns** — Influencer Campaign Management (linked — password removed)
3. **ACJ** — Multi-Touch Attribution for Affiliate (linked)

**Rakuten hidden 2026-07-13** — Tom's call: it was the weakest case study (thin outcome metrics, one-sentence Solution section, and its card image showed a third-party "Nexus Commerce" product, not his own work — see the content flag above), and 3 case studies is fine for now given they're all Rakuten Advertising-based anyway. Removed from this array, from `OtherCaseStudies.js`'s `CARDS`, and from `sitemap.js` — but the page itself (`src/app/casestudy/Rakuten/page.js`) and the `@modal` route mapping are untouched, so it's still reachable at `/casestudy/Rakuten` by direct URL, just unlisted everywhere. Reversible: re-add the card object (still in git history — see commit that removed it) to bring it back.

No cards are locked — all password-gate code (the `PasswordGate` component and the inline gate in `InfluencerContent.js`) was deleted in June 2026.

Hover shadows (amber-tinted):
```
hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)]
```

Cards stagger in individually (~100ms delay) on scroll rather than fading in as one block. Card screenshot containers have a neutral `ring-1 ring-black/10 dark:ring-white/10` outline (added 2026-07-01). The tan outer container that used to wrap them is gone (2026-07-15) — cards sit on the page background, `gap-6` apart, so the `rounded-4xl` concentric-radius note from 2026-07-01 no longer applies.

## Colour palette — Experimental (current)
| Role | Light | Dark |
|------|-------|------|
| Hero / page bg | `#ffffff` + noise texture only (no gradient blobs — removed 2026-07-01) | `#0F1623` + noise texture only |
| Page body bg | `#ffffff` | `#0F1623` |
| Case study image containers | `#EDE7DD` | `slate-800/50` |
| Nav bg | none (transparent) | none (transparent) |
| Modal bg | `#2A6B6B/12%` | `#051F1F/90%` |
| Accent / CTA | `#B84010` (accent-600) | `#EE9F68` (accent-300) |
| Body text | `#020617` | `#ededed` |
| Card border | `#C8BEB0` | `#2A3A4A` |
| Card image ring | `rgba(184,64,16,0.22)` | `rgba(238,159,104,0.30)` |
| Card hover shadow | `rgba(184,64,16,0.10)` | `rgba(238,159,104,0.12)` |
| Gallery hover shadow | `rgba(184,64,16,0.14)` | — |
| Blockquote border | `accent-300` | `accent-600` |

### Accent token scale (defined in `globals.css` `@theme`)
| Token | Value |
|-------|-------|
| `accent-50` | `#FDF4EE` |
| `accent-100` | `#FAE3D0` |
| `accent-200` | `#F5C4A0` |
| `accent-300` | `#EE9F68` |
| `accent-400` | `#E07840` |
| `accent-500` | `#C85A22` |
| `accent-600` | `#B84010` ← primary |
| `accent-800` | `#7A2808` |
| `accent-950` | `#3D1204` |

Use `text-accent-600`, `bg-accent-600`, `border-accent-200`, etc. in Tailwind classes.

## Button styles
The `btn-violet-3d` / `btn-dark-3d` utilities were removed from `globals.css` in June 2026 (their only consumers — the password gates and SolarHero — were deleted). CTAs now use plain Tailwind: `rounded-full bg-accent-600 ... hover:bg-accent-800 dark:bg-accent-400`.

## Dark mode
- **Tailwind v4** dark mode: configured via `@variant dark (&:is(.dark, .dark *))` in `globals.css`
- **Do NOT use** `darkMode: 'class'` in `tailwind.config.js` — that's v3 syntax and is ignored
- ThemeProvider adds/removes `dark` class on `<html>`. `toggle()` persists to `localStorage`.
- FOUC prevention: inline `<script>` in layout.js applies dark class before hydration
- `<html>` has `suppressHydrationWarning` to avoid React mismatch warnings
- PageBackground.js only reacts to theme changes (NOT pathname — avoids flash on modal open)
- `page.js` reads `useTheme()` directly and switches colour palette via JS (not Tailwind dark: classes)

## Case study modal (Parallel + Intercepting Routes)
- Clicking a card triggers `@modal/(.)casestudy/[slug]/page.js` — URL updates, modal slides up
- Direct URL (`/casestudy/Prompt`) still renders the full page normally
- **Two separate layers**: backdrop (`motion.div` fade 0.28s open / 0.18s close) + panel (`motion.div` spring slide-up open / `easeIn` 0.22s close)
- Backdrop: `bg-[#B84010]/[0.08] dark:bg-[#3D1204]/90 backdrop-blur-sm pointer-events-none` — fades independently
- Panel: transparent container, handles scroll + close button + content
- Close: sticky X button inside panel, Escape key. `router.back()` fires after panel animation completes.
- OtherCaseStudies links use `replace` prop to avoid history stacking (close always returns home)
- Scroll lock: `overflow: hidden` + `paddingRight` compensates for scrollbar width shift

## Card interactions
- **Hover shadow**: `0 4px 24px rgba(184,64,16,0.10)` light / `rgba(238,159,104,0.12)` dark (amber-tinted)
- **Border**: `border-[#C8BEB0]` light / `dark:border-[#2A3A4A]` — visible on cream bg
- **Image stack ring**: `ring-2 ring-[rgba(184,64,16,0.22)] dark:ring-[rgba(238,159,104,0.30)]` — matches arc colour
- **Gallery cards** (examples.js): rest shadow `rgba(184,64,16,0.07)`, hover `rgba(184,64,16,0.14)`

## OtherCaseStudies cards
- Layout: title (DM Sans, text-base, font-normal — globals h3 default) left — image stack right
- Padding: `px-5 py-8`, image container `h-16 w-28 mr-6`
- Border: `border-[#C8BEB0] dark:border-[#2A3A4A]` — matches main card borders
- Hover shadow: amber-tinted `rgba(184,64,16,0.10)` / `rgba(238,159,104,0.12)` — matches rest of site
- `replace` prop on Link prevents modal history stacking
- Images: use real case study images (prompt_1-3, acj_1-3, offer_1-3)

## Case studies
- `/casestudy/Prompt` — Natural Language Search & AI (2025)
- `/casestudy/ACJ` — Multi-Touch Attribution for Affiliate (Oct 2022 – Jun 2023)
- `/casestudy/Rakuten` — Enhancing Offer Management (2021) — **hidden 2026-07-13** (unlinked everywhere, page still exists, see the Case study cards section above)
- `/casestudy/InfluencerCampaigns` — Influencer Campaigns (2025) — **not** password protected (all gate code deleted June 2026)
- Brewtiful and DesignFlows (older, junior-level work) were deleted June 2026 — recover from git history if needed

### Case study layout template (all 4 use this)
```jsx
<div className="relative min-h-screen">
  <div className="container mx-auto max-w-6xl px-6">
    <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">
      {/* Hero image container */}
      <div className="bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8 ...">
        <Image ... />
      </div>
      {/* Header grid */}
      <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Brand • Date</p>
          <h1>Title</h1>
        </div>
        <div className="md:col-span-2">[intro + role/skills metadata]</div>
      </div>
      {/* Content */}
      <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
        <div className="col-span-4 mb-12">[sections]</div>
      </div>
    </div>
  </div>
</div>
```

**Known content gaps (not code issues):**
- ~~InfluencerCampaigns: outcome/adoption metrics missing~~ — **closed 2026-08-04.** Adoption metrics don't exist. The page stands on its narrative instead; a stat row built from its timeline figures was tried and rejected (see "Case study stat rows" above). Hero image is `/influencerHero.png`, already real.
- Rakuten: Solution section is one sentence — needs expanding; no outcome metrics (lower priority now the case study is hidden — see Case study cards section)
- ACJ: "35 DAU" metric needs context (total eligible users)
- Prompt: `Prompt-userflow.png` (customer journey map) added to Approach section 2026-05-26. Still missing: before/after comparison copy + section header for `Prompt-old2.png`
- ACJ: "35 daily active users" metric removed from Impact section 2026-05-26 (no denominator; removed rather than reframed)

**Unused images in /public/ ready to add to case studies:**
- `Prompt-suggestion.png`, `Prompt-error.png` — UI states; add to Prompt Challenge/Solution
- `ACJ-early-mock.png`, `ACJ-early-mock-touchpoints.png` — despite filename, these are final shipped UI not early mocks; hold until Tom provides a genuine early exploration artefact for the Approach section
- `ACJ-pub-view.png`, `ACJ-advertiser-view.png` — final shipped UI; dual-audience angle already covered by `ACJ-comparison.png`; not needed
- `Campaign-application.png`, `Campaigns-approvals.png`, `Campaign-view-posts.png` — add to Influencer Solution section in a 3-col grid; skip `Campaigns-setup.png` (form too long at case study scale) and `Campaigns-all.png` (too simple)

## AboutMeSection
`src/app/components/AboutMeSection.js`

Links row: "More about me →" (text link) + LinkedIn icon link (`https://www.linkedin.com/in/thomas-spencer/`). Both are inline-flex items in a flex row. LinkedIn link uses `<Linkedin size={14} />` from lucide-react.

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

- **`ImageWall`** is nine photos scattered over the area, each its own Framer
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
  - Photos are dummy gradients at `/public/outside/dummy-1..9.jpg` — replace the
    `src`/`width`/`height` in `PHOTOS`.
- **Running stat** comes from `src/app/lib/strava.js`. `FALLBACK_KM` in
  `About.js` is a placeholder (1,234) used whenever the API returns nothing —
  **it is not a real figure**; wire Strava up or replace it before deploying.
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
  the one visual tell that `FALLBACK_KM` had fired. With it gone the fallback is
  indistinguishable from a real figure. See the fallback note below.

## Typographic scale

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
blockquote cite { block mt-2 not-italic text-sm text-slate-400 dark:text-slate-500 }
```

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
`src/app/components/footer.js`
- Copyright: `text-xs text-center text-slate-500 dark:text-slate-500`
- Format: `Designed and built by Tom Spencer © {year}`

## Important conventions
- Dark mode uses Tailwind v4 `@variant dark` — all `dark:` classes work via `.dark` class on `<html>`.
- `CardImageStack.js` is a shared component — changes affect all card layouts.
- `PageBackground.js` must NOT use pathname logic — causes flash when modal intercepts route.
- Favicon: `icons: { icon: '/just_me.webp' }` in `generateMetadata()` in `layout.js`.
- Image filenames in `/public` must be lowercase (e.g. `.png` not `.PNG`) — Vercel runs on Linux (case-sensitive).
- `group-hover` animations require `group` class on the parent element — check this when adding arrow animations to links.
- `ThemeToggle.js` uses inline `style` props (not Tailwind `dark:` classes) since it needs to respond to JS theme state at render time.
- Do NOT add `w-screen` to any element — use `w-full` to avoid horizontal scroll from scrollbar width.
- Nav requires `relative` class for `z-50` to create a stacking context — without `relative`, z-index has no effect.
- Shadow colours should use amber tint (`rgba(184,64,16,...)` light / `rgba(238,159,104,...)` dark) to stay consistent with the arc and accent palette.
- Image containers in case studies use `bg-[#EDE7DD] dark:bg-slate-800/50` — do NOT use `bg-purple-100` (old palette).
- All case study metadata rows use `text-slate-600 dark:text-slate-400` — do NOT use `text-gray-600`.
- `<cite>` inside `<blockquote>` renders as a new line automatically (styled in globals.css as `block mt-2 not-italic text-sm`).
- Icon-only buttons need a **40×40px minimum hit area** (44×44px for nav/mobile toggles) — don't rely on icon size + small padding alone.
- Buttons/links get press feedback via `active:scale-[0.96]` — never go below `0.95`, it reads as exaggerated.
- Never use `transition-all` — list exact properties, e.g. `transition-[background-color,color,transform]`.
- Headings use `text-balance`; the global `p` base style has `text-wrap: pretty` (set in `globals.css`) so body copy avoids orphans everywhere without per-instance classes.
- `body` has `-webkit-font-smoothing: antialiased` (added 2026-07-01).
- Design-engineering polish skill lives at `.agents/skills/make-interfaces-feel-better/SKILL.md` — re-run it for future UI/animation work rather than re-deriving these principles from scratch.
- Additional project-scoped skills (pulled in from job-monitor, 2026-07-13; registered in `skills-lock.json`): `animation-vocabulary`, `apple-design`, `emil-design-eng`, `improve`, `improve-animations`, `review-animations` (all `emilkowalski/skills` except `improve`, which is `shadcn/improve`). Some overlap with `make-interfaces-feel-better` on animation/polish principles — check both before assuming one is authoritative.
