# Portfolio 2.0 — Claude Context

## Versions

### Current version (active — June 2026)
- **Hero**: Left-aligned, full-bleed noise + gradient background. DM Sans headline (`text-4xl md:text-5xl lg:text-6xl`, `line-height: 1.05`) with amber gradient highlight on "easy to use". Short one-sentence sub-copy. Rounded-full CTA with smooth scroll to `#work`. Defined inline in `page.js` — there is no separate hero component.
- **Background**: Fixed fractal noise SVG (`feTurbulence baseFrequency 0.9`) + 3 radial gradient blobs over `#EDE7DD` light / `#0F1623` dark. Both layers at `z-index: 0`; page content at `z-index: 1`.
- **Palette**: amber `#B84010` accent, warm cream `#EDE7DD` (page + hero base) light, deep navy `#0F1623` dark
- Older hero experiments (SolarHero solar-arc chart, `/testHome` route, `hero.safe.js`/`hero.original.js` centred violet layout) were deleted in June 2026 — recover from git history if ever needed (safe baseline commit `ce8b3de`).

## Project
Tom Spencer's portfolio site. Next.js 15 + Tailwind CSS v4 + Framer Motion.
Live dev server: `npm run dev` → `http://localhost:3000`

Project root: `/Users/thomasspencer/Documents/Portfolio2.0/portfolio2.0/`

## Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 (`globals.css` — uses `@import "tailwindcss"`, no PostCSS config needed)
- **Animation**: Framer Motion
- **Icons**: Lucide React (`lucide-react`)
- **Fonts**: DM Sans only (`--font-dm-sans`) via `next/font/google` — single font across all text; headings at `font-semibold` (600), body at `font-normal` (400)
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
    casestudyShowcase.js      — work cards: individual white cards (rounded-2xl, ring border, hover shadow) in a warm tan outer container (#C4B09A light / #0D1927 dark, rounded-3xl, p-4/5). Each card: image left (46%, padded inset, rounded-xl screenshot with shadow) / text right (54%): title, body, bullets, CTA arrow.
    navigation.js             — top nav: "Tom Spencer" wordmark, desktop links, Resume pill, mobile full-screen menu. No background (fixed noise/gradient shows through).
    PageBackground.js         — sets body bg from theme: #EDE7DD light / #0F1623 dark
    AboutMeSection.js         — open editorial layout: large DM Sans headline + 2 body paragraphs + "More about me →" + LinkedIn link
    examples.js               — ExampleGallery: hover-expand 4-image grid ("Extra Pixels" section)
    CardImageStack.js         — fanned/spread image stack, used by OtherCaseStudies
    ThemeProvider.js          — context for dark/light theme; toggle() persists to localStorage
    ThemeToggle.js            — pill toggle (Sun/Moon icons) in footer — cream/teal branded, no Tailwind dark: classes (uses inline styles)
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
4. **Rakuten** — Enhancing Offer Management (linked)

No cards are locked — all password-gate code (the `PasswordGate` component and the inline gate in `InfluencerContent.js`) was deleted in June 2026.

Hover shadows (amber-tinted):
```
hover:shadow-[0_4px_24px_rgba(184,64,16,0.10)] dark:hover:shadow-[0_4px_24px_rgba(238,159,104,0.12)]
```

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
- Layout: title (DM Sans, text-base, font-semibold) left — image stack right
- Padding: `px-5 py-8`, image container `h-16 w-28 mr-6`
- Border: `border-[#C8BEB0] dark:border-[#2A3A4A]` — matches main card borders
- Hover shadow: amber-tinted `rgba(184,64,16,0.10)` / `rgba(238,159,104,0.12)` — matches rest of site
- `replace` prop on Link prevents modal history stacking
- Images: use real case study images (prompt_1-3, acj_1-3, offer_1-3)

## Case studies
- `/casestudy/Prompt` — Natural Language Search & AI (2025)
- `/casestudy/ACJ` — Multi-Touch Attribution for Affiliate (Oct 2022 – Jun 2023)
- `/casestudy/Rakuten` — Enhancing Offer Management (2021)
- `/casestudy/InfluencerCampaigns` — Influencer Campaigns (2025) — password protected; accessible via home page password gate
- Brewtiful and DesignFlows (older, junior-level work) were deleted June 2026 — recover from git history if needed

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
- InfluencerCampaigns: hero image is `/brewtifulBg.png` placeholder — needs replacing
- InfluencerCampaigns: outcome metrics missing — needs Tom's input
- Rakuten: Solution section is one sentence — needs expanding; no outcome metrics
- ACJ: "35 DAU" metric needs context (total eligible users)
- Prompt: `Prompt-userflow.png` (customer journey map) added to Approach section 2026-05-26. Still missing: before/after comparison copy + section header for `Prompt-old2.png`
- ACJ: "35 daily active users" metric removed from Impact section 2026-05-26 (no denominator; removed rather than reframed)
- About page: philosophy cards show `"Image placeholder"` — awaiting real images from Tom

**Unused images in /public/ ready to add to case studies:**
- `Prompt-suggestion.png`, `Prompt-error.png` — UI states; add to Prompt Challenge/Solution
- `ACJ-early-mock.png`, `ACJ-early-mock-touchpoints.png` — despite filename, these are final shipped UI not early mocks; hold until Tom provides a genuine early exploration artefact for the Approach section
- `ACJ-pub-view.png`, `ACJ-advertiser-view.png` — final shipped UI; dual-audience angle already covered by `ACJ-comparison.png`; not needed
- `Campaign-application.png`, `Campaigns-approvals.png`, `Campaign-view-posts.png` — add to Influencer Solution section in a 3-col grid; skip `Campaigns-setup.png` (form too long at case study scale) and `Campaigns-all.png` (too simple)

## AboutMeSection
`src/app/components/AboutMeSection.js`

Links row: "More about me →" (text link) + LinkedIn icon link (`https://www.linkedin.com/in/thomas-spencer/`). Both are inline-flex items in a flex row. LinkedIn link uses `<Linkedin size={14} />` from lucide-react.

## About page
`src/app/about/page.js`

- Card: `rounded-4xl bg-white dark:bg-slate-900 p-8 md:p-12 lg:p-16`
- h1: `text-2xl tracking-tight md:text-3xl` (uses globals DM Sans font-semibold, not a custom override)
- Philosophy cards: `bg-[#EDE7DD] dark:bg-slate-800/50` with `bg-[#E4DDD2] dark:bg-slate-700/50` image placeholders
- Hobbies image gallery is present in code but commented out — enable when `/public/hobbies/` images are ready

## Typographic scale
Single font: **DM Sans** (`--font-dm-sans`) for all text. Hierarchy is created through weight and size alone.

| Role | Font | Size | Weight | Color | Leading |
|------|------|------|--------|-------|---------|
| Page title (h1) | DM Sans | `text-4xl` (globals default) | `font-semibold` | `text-slate-950 dark:text-white` | `leading-tight` |
| Section heading (h2) | DM Sans | `text-xl` (case studies override) / `text-2xl→3xl` (globals) | `font-semibold` | `text-slate-950 dark:text-white` | `tracking-tight` |
| Sub-heading (h3) | DM Sans | `text-xl` | `font-semibold` | `text-slate-950 dark:text-white` | — |
| Body / muted text | DM Sans | `text-base` | `font-normal` | `text-slate-600 dark:text-slate-400` | `leading-relaxed` |
| Small / caption | DM Sans | `text-sm` or `text-xs` | — | — | — |

**Rule**: All body/muted `<p>` text must use `text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400`. Do NOT use `font-medium`, `text-slate-700`, `leading-7`, or `text-lg` for regular body copy.

**DM Sans on non-heading elements**: apply via `style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}` — there is no Tailwind utility class for it.

## globals.css base styles
```css
h1    { font-family: DM Sans; text-4xl font-semibold leading-tight tracking-tight dark:text-white }
h2    { font-family: DM Sans; text-2xl→text-3xl font-semibold tracking-tight text-slate-950 dark:text-white }
h3    { font-family: DM Sans; text-xl font-semibold tracking-tight text-slate-950 dark:text-white }
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
