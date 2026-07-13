# Design Review: tomspencer.design

Reviewed against: project brief + memory (Next.js 15, Tailwind v4, Framer Motion)
Philosophy: Warm editorial minimalism — Fraunces + DM Sans, amber accent, cream palette
Date: 2026-04-29

---

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|---|---|---|
| `screenshots/review-homepage-desktop-1280.png` | Desktop (1280×800) | Full homepage, light mode |
| `screenshots/review-homepage-tablet-768.png` | Tablet (768×1024) | Full homepage, light mode |
| `screenshots/review-homepage-mobile-375.png` | Mobile (375×812) | Full homepage, light mode |
| `screenshots/review-homepage-dark-desktop-1280.png` | Desktop (1280×800) | Full homepage, dark mode |
| `screenshots/review-about-desktop-1280.png` | Desktop (1280×800) | About page, light mode |
| `screenshots/review-casestudy-prompt-desktop-1280.png` | Desktop (1280×800) | Prompt case study, dark mode |

> Note: Framer Motion scroll-triggered animations (opacity/translate whileInView) render as invisible in headless Playwright full-page screenshots. A JS override was applied to force elements visible for review. See "Must Fix #2" below.

---

## Summary

The site has a genuinely distinctive identity — the sun path hero, warm cream palette, and Fraunces/DM Sans pairing give it a premium, human feel that stands out in a sea of generic dev portfolios. The two blockers preventing it from feeling finished are the blank case study card images (cards 2–3) and the "Additional work" gallery being completely invisible in dark mode. Fix those and this is very shippable.

---

## Must Fix

### 1. Case study cards 2 & 3 have blank placeholder images
**Cards:** Multi-Touch Attribution for Affiliate + Offer Management Dashboard  
**File:** See `screenshots/review-homepage-desktop-1280.png`  
Cards 1 (Prompt) and 4 (Influencer) have real content. Cards 2 and 3 have a blank light-gray rectangle where the case study preview image should be. At a glance it reads as broken. These are noted in the memory as "needs Tom's content" — real screenshots from the Rakuten and ACJ projects need to go in.  
_Fix: Drop real product screenshots into the correct `/public/` paths. Even a cropped, blurred, or stylised version would be better than a blank box._

### 2. "Additional work" gallery is invisible in dark mode
**File:** `screenshots/review-homepage-dark-desktop-1280.png`  
The four portfolio thumbnail images (donut app, 404 illustration, beer app, to-do app) are completely black/invisible in dark mode. The section heading and subtext are readable but the images disappear entirely — the section looks like an unfinished placeholder.  
_Fix: Check whether these `<img>` elements have a dark-mode background or overlay being applied incorrectly. Likely a CSS dark mode class adding a dark `background-color` or `mix-blend-mode` to the image container that swallows the images. Remove or scope it properly._

### 3. Scroll animations create invisible content risk in certain environments
**File:** All homepage screenshots (pre-override)  
All content below the fold — "What I actually do", all case study cards, "Additional work" — renders with `opacity: 0` as its initial Framer Motion state. In a normal user browser with scrolling this is fine. But in any context where IntersectionObserver doesn't fire correctly (some crawlers, RSS readers, print, aggressive prerender) all below-fold content is invisible.  
_Fix: Set a CSS fallback — add a `.no-js` or `@media (prefers-reduced-motion: reduce)` rule that sets `opacity: 1; transform: none` on animated elements, ensuring content is always visible even if JS doesn't run the entrance animation._

---

## Should Fix

### 4. "Additional work" images very faint in light mode too
**File:** `screenshots/review-homepage-desktop-1280.png`  
Even in light mode, the four small portfolio thumbnails are quite dim and low-contrast against the cream background. On mobile they're barely registerable as content.  
_Fix: Add a subtle card or border to each image, or increase the image container size slightly to give them more visual weight. A soft shadow (`shadow-sm`) would help lift them off the background._

### 5. Nav switches to hamburger too late (or not at all at 768px)
**File:** `screenshots/review-homepage-tablet-768.png`  
At 768px the full desktop nav (Work · About · Resume) is still visible — text is tiny but readable. At 375px mobile a hamburger is shown. Worth checking whether the 768px nav is intentional or whether there's a breakpoint gap where the nav becomes cramped. Currently it looks a bit squeezed at tablet.  
_Fix: Either drop the hamburger breakpoint to `md` (768px) or verify the current text sizes don't overflow at this width on all browsers._

### 6. Case study page was only reviewed in dark mode
**File:** `screenshots/review-casestudy-prompt-desktop-1280.png`  
The dark mode case study layout looks well-structured with clear hierarchy. However, the review didn't capture the light mode variant — worth a manual check to ensure the case study hero image and section dividers render correctly in light mode too.

---

## Could Improve

### 7. "What I actually do" section on the homepage doubles up with the About page
Both the homepage and About page describe Tom's role and day-to-day work in similar terms. A visitor who clicks "More about me →" gets what feels like a repeat. Consider whether this section should be leaner on the homepage — just 2–3 punchy lines + the CTA — and save the detailed bullet list for About only.

### 8. "Additional work" section has no hover states or interaction
The four thumbnail images sit passively with no hover treatment. Every other interactive element on the site has a clear affordance. Even a gentle scale or opacity shift on hover would help signal these are meant to be inspected (even if they don't link anywhere currently).

### 9. The hero "Explore case studies →" CTA could better anchor to the work section
Clicking "Explore case studies" jumps to `/#work`. The scroll is smooth, but on desktop there's a long gap between the hero (with the sun path animation) and the case study cards — the "What I actually do" section sits in between. A user clicking the CTA might expect to land directly on the cards, not the bio section first. Consider reordering: hero → cards → "What I actually do" → additional work, or rename the anchor to match the actual scroll destination.

### 10. About page photo feels snapshot-casual at desktop sizes
The headshot on the About page is warm and human (which is good) but at 1280px desktop it renders quite large alongside a serious professional heading. A tighter crop or subtle vignette treatment could make it feel more intentional and less like a holiday photo.

---

## What Works Well

- **The sun path hero is exceptional.** A real-time Brighton sun arc as a decorative element is genuinely memorable and says "UX designer who sweats the details" without saying it. Keep it.
- **Dark mode is well-executed overall.** The navy `#0F1623` background, amber accents, and warm headline colour feel intentional — not a simple inversion. The sun path adapts correctly in dark mode.
- **Typography is doing heavy lifting in the best way.** Fraunces headings + DM Sans body is a sophisticated pairing. The type hierarchy is clear on every page — you always know what level you're reading.
- **The About page is the strongest page on the site.** The photo + long-form intro + hobbies gallery combination is personal without being indulgent. The overlapping photo layout in the hobbies section is a genuinely nice touch.
- **Amber accent restraint is correct.** The `#B84010` colour is used only for links and key highlights — never as a background, never over-used. This keeps it feeling premium rather than shouty.
- **Case study card content is compelling.** The stat-led bullet points (90% time reduction, $10M savings) immediately communicate impact. This is the right call over generic feature descriptions.
