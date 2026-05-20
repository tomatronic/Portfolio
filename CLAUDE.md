# Portfolio 2.0 — Claude Context

## Versions

### Safe version (stable baseline)
- **Git commit**: `ce8b3de` — "Extend nav avatar hover effect to name + update CLAUDE.md"
- **Hero backup**: `src/app/components/hero.safe.js` — original centred layout
- To restore safe hero: `cp src/app/components/hero.safe.js src/app/components/hero.js`
- To restore full safe version: `git checkout ce8b3de` (creates detached HEAD — branch off from there if needed)
- **Palette**: violet-600 accent, `#fafafa` / `#0a0a0a` bg

### Current version (active — May 2026)
- **Hero**: Centred, full-bleed noise + gradient background. Pill badge, Fraunces headline with amber gradient highlight on "easy to use", sub-copy, rounded-full CTA with smooth scroll to `#work`.
- **Background**: Fixed fractal noise SVG (`feTurbulence baseFrequency 0.9`) + 3 radial gradient blobs over `#EDE7DD` light / `#0F1623` dark. Both layers at `z-index: 0`; page content at `z-index: 1`.
- **Palette**: amber `#B84010` accent, warm cream `#EDE7DD` (page + hero base) light, deep navy `#0F1623` dark

### Archived version — SolarHero (`/testHome`)
- **Hero**: `SolarHero.js` — full-viewport solar elevation arc for Brighton, UK. Real-time sun position. Hover tooltip + custom cursor (6px dot).
- `hero.js` still re-exports from `SolarHero.js` — used by `/testHome` only.
- Accessible at `http://localhost:3000/testHome`

## Project
Tom Spencer's portfolio site. Next.js 15 + Tailwind CSS v4 + Framer Motion.
Live dev server: `npm run dev` → `http://localhost:3000`

Project root: `/Users/thomasspencer/Documents/Portfolio2.0/portfolio2.0/`

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (`globals.css` — uses `@import "tailwindcss"`, no PostCSS config needed)
- **Animation**: Framer Motion
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: DM Sans (body, `--font-dm-sans`) + Fraunces (headings, `--font-fraunces`) via `next/font/google`
- **Deployment**: Vercel (Analytics integrated)

## Key files
```
src/app/
  layout.js                   — root layout: Navigation, Footer, ThemeProvider, PageBackground, FOUC script
  page.js                     — home page: noise/gradient hero + AboutMeSection + CasestudyShowcase + Testimonials
  testHome/page.js            — archived SolarHero design (for reference)
  globals.css                 — Tailwind v4 config, @theme accent tokens, dark mode variant, base styles, btn-violet-3d / btn-dark-3d utilities
  components/
    hero.js                   — re-exports SolarHero (used by /testHome only)
    SolarHero.js              — archived solar elevation chart hero (see below)
    hero.safe.js              — safe version hero (original centred layout, violet accent)
    hero.original.js          — same as hero.safe.js — kept for reference
    casestudyShowcase.js      — work cards: full-width 2-col, CardImageStack right, text left
    navigation.js             — top nav: just_me.webp avatar + "Tom Spencer", desktop links, Resume pill, mobile full-screen menu. No background (chart shows through).
    PageBackground.js         — sets body bg from theme: #EDE7DD light / #0F1623 dark
    AboutMeSection.js         — open editorial layout: large Fraunces headline + 2 body paragraphs + "More about me →" + LinkedIn link
    examples.js               — ExampleGallery: hover-expand 4-image grid ("Extra Pixels" section)
    CardImageStack.js         — fanned/spread image stack, shared by casestudyShowcase + OtherCaseStudies
    ThemeProvider.js          — context for dark/light theme; toggle() persists to localStorage
    ThemeToggle.js            — pill toggle (Sun/Moon icons) in footer — cream/teal branded, no Tailwind dark: classes (uses inline styles)
    PasswordGate.js           — modal overlay for locked case studies; checks sessionStorage for auth
    OtherCaseStudies.js       — compact cards at bottom of each case study (title left, image stack right)
    footer.js                 — footer with ThemeToggle + copyright
  casestudy/                  — 6 individual case study pages
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
  resume.pdf
  prompt_1.png, prompt_2.png, prompt_3.png  — Prompt case study card images
  acj_1.png, acj_2.png, acj_3.png          — ACJ case study card images
```

## SolarHero component
`src/app/components/SolarHero.js`

### Overview
Full-viewport (`width: 100%`, `height: 100vh`) solar elevation arc chart showing today's sun path for Brighton, UK (50.82°N, -0.14°E). Real sun position updates every 30s. Hover shows time + elevation tooltip with locked-to-arc positioning.

The chart extends behind the nav (`marginTop: -${NAV_HEIGHT}px`) so the chart fills the full viewport height visually. The nav has no background, allowing the chart to show through.

### Key constants
```js
const NAV_HEIGHT    = 144      // nav py-12×2 + h-12 = 144px; chart pulls up by this amount
const F_TOP         = 0.048    // summer solstice peak (~62°) aligns with nav vertical centre
const F_BOT         = 0.95     // horizon sits at 95% of chart height
const E_MAX         = 70       // chart elevation ceiling (degrees)
const E_MIN         = -70      // chart elevation floor (degrees)
const E_RNG         = 140      // E_MAX - E_MIN
const GLOW_R_FACTOR = 0.33     // atmospheric glow radius as fraction of chart height
```

### Coordinate helpers
```js
lhToX(localHour, w)   // local hour 0–24 → SVG x pixel
elevToY(elev, h)      // elevation degrees → SVG y pixel (F_TOP/F_BOT bounds)
```

### Arc colours (amber, reduced opacity for subtle background element)
```js
arcToday    = dark ? 'rgba(238,159,104,0.30)' : 'rgba(184,64,16,0.22)'
arcSolstice = dark ? 'rgba(238,159,104,0.26)' : 'rgba(184,64,16,0.20)'
gridStroke  = dark ? 'rgba(238,159,104,0.07)' : 'rgba(184,64,16,0.06)'
```

### Sun colour
```js
sunBright = sunAbove ? '#D4905A' : (dark ? '#6A8ABB' : '#C0B8A8')
// amber when above horizon, steel-blue (dark) or warm grey (light) when below
```
No `mix-blend-mode` on the sun — plain colour only.

### Layer order
- `z-0` — background SVG (arcs, grid, glow)
- `z-10` — hero copy + CTA button (`ref={copyRef}` on CTA for tooltip suppression)
- `z-20` — sun dot SVG (always on top)

### Tooltip behaviour
- **Locked to arc**: tooltip x/y is derived from the arc point at the hovered hour, not the cursor position. Uses `containerRef.getBoundingClientRect()` (single call, consolidated) to convert SVG coords to screen coords.
- **Suppressed over CTA button**: `cursorOverBtn` checks cursor against `copyRef.current.getBoundingClientRect()`. `showOverlay = hover && active && !cursorOverBtn`.
- Custom cursor (hidden native cursor, 6×6 px dot rendered in JSX) follows the actual mouse position.

### Time labels
Labels positioned using **local hours** (not UTC). BST/GMT offset computed from last-Sunday-of-March/October rule. Displayed at 00:00, 06:00, 12:00, 18:00, 24:00.

### Grid
Ultra-fine horizontal + vertical grid lines at E = 0°, ±30°, ±60° and local hours 0, 6, 12, 18, 24. Stroke colour `gridStroke` (amber at ~6–7% opacity).

## ThemeProvider
`src/app/components/ThemeProvider.js`

One theme-switching method in context:
- `toggle()` — flips theme and writes to `localStorage`

## Navigation
`src/app/components/navigation.js`

- Left: `just_me.webp` circular avatar + "Tom Spencer" in Fraunces `font-normal text-2xl`. Hover triggers spring scale + rotate on avatar.
- Desktop links: Work, About, Resume pill (hover → `accent-600` with white text)
- Mobile: full-screen `bg-slate-950` overlay with Menu/X lucide icons. Links are `font-normal` (not bold).
- `className="relative z-50"` — `relative` is required for `z-50` to take effect
- **No background** — fixed noise/gradient layers show through nav area. This is intentional.

## Case study cards (home page)
`src/app/components/casestudyShowcase.js`

Card order (top to bottom):
1. **Prompt** — Natural Language Search & AI (linked)
2. **ACJ** — Multi-Touch Attribution for Affiliate (linked)
3. **Rakuten** — Enhancing Offer Management (linked)
4. **InfluencerCampaigns** — Influencer Campaign Management (locked — password gate)

Locked card behaviour:
- `div` instead of `Link` — clicking opens `PasswordGate` modal
- CTA shows `<Lock size={13} />` + "Password required" (no ArrowRight) — clicking anywhere on the card opens the PasswordGate modal
- No badge/tag

Hover shadows (amber-tinted):
```
hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)]
```

## PasswordGate
`src/app/components/PasswordGate.js`

Modal overlay for locked case studies. Password stored as `CORRECT_PASSWORD` constant (client-side — intended for light friction, not real security). On success, writes `influencer_auth: '1'` to `sessionStorage` and navigates to `href`.

Colours match site palette:
- Backdrop: `bg-[#1C1C16]/50 backdrop-blur-sm`
- Panel: `bg-[#F2ECE2] border-[#C8BEB0] dark:bg-[#0F1623] dark:border-[#2A3A4A]`
- Lock icon: `bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400`
- Input: `bg-[#EDE7DD] focus:border-accent-600`

## Colour palette — Experimental (current)
| Role | Light | Dark |
|------|-------|------|
| Hero / page bg | `#EDE7DD` + noise + gradient blobs | `#0F1623` + noise + gradient blobs |
| Page body bg | `#EDE7DD` | `#0F1623` |
| Case study image containers | `#EDE7DD` | `slate-800/50` |
| Nav bg | none (transparent) | none (transparent) |
| Modal bg | `#2A6B6B/12%` | `#051F1F/90%` |
| Accent / CTA | `#B84010` (accent-600) | `#EE9F68` (accent-300) |
| Body text | `#020617` | `#ededed` |
| Card border | `#C8BEB0` | `#2A3A4A` |
| Arc (today) | `rgba(184,64,16,0.22)` | `rgba(238,159,104,0.30)` |
| Arc (solstice) | `rgba(184,64,16,0.20)` | `rgba(238,159,104,0.26)` |
| Sun (above horizon) | `#D4905A` | `#D4905A` |
| Sun (below horizon) | `#C0B8A8` | `#6A8ABB` |
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
### `btn-violet-3d` (now amber/teal — keep class name, used in PasswordGate + InfluencerContent)
Defined in `globals.css`. Base `#155C5C`, hover `#0A3A3A`. White gradient overlay on hover. `rounded-xl`.

### `btn-dark-3d`
Near-black `#1C1C16` base, hover `#2C2C22`. Used on the archived SolarHero CTA.

## Dark mode
- **Tailwind v4** dark mode: configured via `@variant dark (&:is(.dark, .dark *))` in `globals.css`
- **Do NOT use** `darkMode: 'class'` in `tailwind.config.js` — that's v3 syntax and is ignored
- ThemeProvider adds/removes `dark` class on `<html>`. `toggle()` persists to `localStorage`.
- FOUC prevention: inline `<script>` in layout.js applies dark class before hydration
- `<html>` has `suppressHydrationWarning` to avoid React mismatch warnings
- PageBackground.js only reacts to theme changes (NOT pathname — avoids flash on modal open)
- `page.js` and `SolarHero.js` both read `useTheme()` directly and switch colour palette via JS (not Tailwind dark: classes)

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
- Layout: title (Fraunces, text-base, font-normal) left — image stack right
- Padding: `px-5 py-8`, image container `h-16 w-28 mr-6`
- Border: `border-[#C8BEB0] dark:border-[#2A3A4A]` — matches main card borders
- Hover shadow: amber-tinted `rgba(184,64,16,0.10)` / `rgba(238,159,104,0.12)` — matches rest of site
- `replace` prop on Link prevents modal history stacking
- Images: use real case study images (prompt_1-3, acj_1-3); Rakuten still uses Unsplash placeholders

## Case studies
- `/casestudy/Prompt` — Natural Language Search & AI (2025)
- `/casestudy/ACJ` — Multi-Touch Attribution for Affiliate (Oct 2022 – Jun 2023)
- `/casestudy/Rakuten` — Enhancing Offer Management (2021)
- `/casestudy/InfluencerCampaigns` — Influencer Campaigns (2025) — password protected; accessible via home page password gate
- `/casestudy/Brewtiful` — Craft Beer & Design (2023)
- `/casestudy/DesignFlows` — DIY Toolkit Rental App (2021)

### Case study layout template (all 6 now use this)
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
- InfluencerCampaigns: all inline images are placeholders from other case studies — needs real product screenshots
- InfluencerCampaigns: hero image is `/brewtifulBg.png` placeholder
- About page: philosophy cards show `"Image placeholder"` — awaiting real images from Tom

## AboutMeSection
`src/app/components/AboutMeSection.js`

Links row: "More about me →" (text link) + LinkedIn icon link (`https://www.linkedin.com/in/thomas-spencer/`). Both are inline-flex items in a flex row. LinkedIn link uses `<Linkedin size={14} />` from lucide-react.

## About page
`src/app/about/page.js`

- Card: `rounded-4xl bg-white dark:bg-slate-900 p-8 md:p-12 lg:p-16`
- h1: `text-2xl tracking-tight md:text-3xl` (uses globals Fraunces, not a custom override)
- Philosophy cards: `bg-[#EDE7DD] dark:bg-slate-800/50` with `bg-[#E4DDD2] dark:bg-slate-700/50` image placeholders
- Hobbies image gallery is present in code but commented out — enable when `/public/hobbies/` images are ready

## Typographic scale
| Role | Font | Size | Weight | Color | Leading |
|------|------|------|--------|-------|---------|
| Page title (h1) | Fraunces | `text-4xl` (globals default) | `font-normal` | `text-slate-950 dark:text-white` | `leading-tight` |
| Section heading (h2) | Fraunces | `text-xl` (case studies override) / `text-2xl→3xl` (globals) | `font-normal` | `text-slate-950 dark:text-white` | `tracking-tight` |
| Sub-heading (h3) | Fraunces | `text-xl` | `font-normal` | `text-slate-950 dark:text-white` | — |
| Body / muted text | DM Sans | `text-base` | `font-normal` | `text-slate-600 dark:text-slate-400` | `leading-relaxed` |
| Small / caption | DM Sans | `text-sm` or `text-xs` | — | — | — |

**Rule**: All body/muted `<p>` text must use `text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400`. Do NOT use `font-medium`, `font-semibold`, `text-slate-700`, `leading-7`, or `text-lg` for regular body copy.

**Fraunces on non-heading elements**: apply via `style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}` — there is no Tailwind utility class for it.

## globals.css base styles
```css
h1    { font-family: Fraunces; text-4xl font-normal leading-tight tracking-tight dark:text-white }
h2    { font-family: Fraunces; text-2xl→text-3xl font-normal tracking-tight text-slate-950 dark:text-white }
h3    { font-family: Fraunces; text-xl font-normal tracking-tight text-slate-950 dark:text-white }
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
