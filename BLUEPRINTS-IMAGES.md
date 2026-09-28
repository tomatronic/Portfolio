# /blueprints — the eight remaining images

Image 9 ("The system in use") is built from images already in `/public`. These
eight are all diagrams or Figma recreations — **none need Rakuten access**, so
this case study is completable whenever.

---

## House style — applies to all eight

The page is monochrome ink with one colour. Diagrams that follow this will look
like they belong; diagrams in a generic flowchart palette won't.

| | value |
|---|---|
| Type | **DM Sans** throughout (the site's only font) |
| Primary ink | `#292929` — headings, labels, arrows that matter |
| Muted ink | `#5D5D5D` — body, secondary labels |
| Faint ink | `#737373` — captions, axis labels. Don't go lighter; this is the AA floor on white |
| The one colour | `#8529CD` Rakuten purple, **used sparingly** — highlight one path, one chain, one state |
| Box radius | **16px** |
| Box border | `#292929` at 10% |
| Ground | **White.** Each figure gets a rounded ring and sits on a pale purple wash, so a white diagram reads as a card on it |

**No orange or amber.** The site had a burnt-amber accent until 2026-09-19 and
it's gone — an amber diagram would be the only orange left on the site.

**Don't make dark versions.** Every image on the site is light and sits on the
same wash in both themes. A dark diagram would invert against everything else.

**Export**: PNG, **1600px wide**. Inline figures render at 760px and the hero at
856px, so 1600 covers retina with room. Anything under ~1000px will look soft.

---

## 1. Hero — core components

**Goes**: top of the page, above the title. **The hero is different from the
other seven**: it spans the full sheet edge-to-edge, has no ring, and is clipped
by the sheet's top corners.

- **Shows**: button, input, pill, card and table row — the five things the copy
  names — arranged as a loose composition rather than a spec sheet.
- **Layout**: components floating at varying sizes, centred, generous space. Not
  a grid, not labelled. This is a texture shot, not a reference.
- **Ground**: **transparent**, or `#F5EEFB` if transparent is awkward. The page
  paints the purple wash behind it, and the other case study heroes rely on that
  showing through.
- **Size**: **1600 × 727** — the exact ratio the Prompt and ACJ heroes use, so
  the five case studies open the same way.

## 2. What the system covers

**Goes**: Approach → "Scope: one library, no customisation".

- **Shows**: five categories — foundations, inputs, navigation, data display,
  feedback — with the component names under each.
- **Layout**: five columns. Category name at the top in `#292929` medium, the
  components beneath as a plain list in `#5D5D5D`. No boxes around each column;
  whitespace separates them.
- **Why plain**: the copy's point is breadth. A list reads as breadth; boxes
  would read as architecture.
- **Size**: 1600 × ~900.

## 3. Governance flow

**Goes**: Approach → Governance, under the numbered steps.

- **Shows**: propose → review → version → deprecate → document, with **review
  branching two ways**: "add to system" and "keep local".
- **Layout**: five boxes left to right, arrows between. The branch drops below
  the review box as two short arrows to two smaller boxes. The branch is the
  interesting part — give it room rather than cramming it inline.
- **Style**: 16px radius boxes, 10% ink borders, arrows in `#737373`. Put the
  **purple on the branch only** — it's the decision the whole model turns on.
- **Size**: 1600 × ~700.

## 4. Token architecture

**Goes**: Approach → Tokens.

- **Shows**: three columns — foundation → semantic → component — with one chain
  highlighted end to end: `green-100` → `surface-success` → a pill background.
- **Layout**: three labelled columns, several token rows in each, greyed back.
  The highlighted chain runs across all three in purple with connecting arrows.
- **End it on something real**: the third column should show an **actual
  rendered success pill**, not the words "pill background". The whole point is
  that an abstract token becomes a visible thing.
- **Size**: 1600 × ~900.

## 5. Cards before and after

**Goes**: Key decisions → "Consolidating cards into one template".

- **Shows**: left, the 20+ old variants; right, the single template with its
  Figma component properties panel.
- **Layout**: two panels, "Before" and "After" labels in `#737373`.
  - **Left**: a dense grid. Greyed wireframes are fine and arguably better —
    the point is *how many*, not what each one was. Make the count legible at a
    glance; if 20+ won't fit legibly, show ~20 and let them crop at the edge to
    imply more.
  - **Right**: one card at a larger size with the properties panel beside it,
    so the variant switches are visible.
- **The asymmetry is the argument.** Don't balance the two sides — a crowded
  left against a calm right is the story.
- **Size**: 1600 × ~900.

## 6. Pill contrast before and after

**Goes**: Key decisions → "Fixing contrast at component level".

- **Shows**: the old pill and the new one, each labelled with its contrast ratio.
- **Layout**: two pills side by side at **large scale** — much bigger than
  life-size, so the difference is unmissable. Ratio under each: old marked as
  failing, new as passing AA. State the 4.5:1 threshold somewhere.
- **If you don't remember the original colours**: use representative ones and
  **label the image "illustrative"**. A wrong-but-specific colour is worse than
  an honest approximation.
- **Size**: 1600 × ~600. This one is mostly white space; resist filling it.

## 7. Figma → code workflow

**Goes**: Key decisions → "Connecting Figma to code with Claude".

- **Shows**: designer edits component in Figma → Claude reads it via the Figma
  MCP → code change in GitHub → **Copilot review** → **engineer review for minor
  and above** → release.
- **Match the copy exactly.** The page now says Copilot reviews first and a
  patch-level change can ship on that alone, with minor and above also going to
  an engineer. The diagram needs that branch or the two will disagree.
- **Layout**: horizontal flow, same box language as image 3 so the two read as a
  pair. The review branch drops below, as in 3.
- **Better still**: a short screen recording of the workflow rebuilt on a
  personal project. A moving demo of design-to-code is worth more than a
  diagram of it — but it'd need somewhere to live, so treat it as a stretch.
- **Size**: 1600 × ~700.

## 8. Design.md excerpt

**Goes**: Key decisions → "A Design.md file for AI tools".

- **Shows**: a short, sanitised excerpt — headings for tokens, components and
  usage rules, with one real example entry under one of them.
- **Layout**: a document block on white, monospace, left-aligned, with the
  markdown syntax visible (`##`, `-`). It should look like a file, not like
  prose about a file.
- **Keep it short.** Six to twelve lines. This is evidence the thing existed and
  had a shape, not documentation to read.
- **Rewrite from memory — no internal details.**
- **Size**: 1600 × ~900.

---

## Order worth doing them in

1. **6 (pill contrast)** — smallest, and the most concrete claim on the page.
2. **5 (cards)** — the strongest single argument you have. Twenty-plus to one.
3. **4 (tokens)** — makes the most abstract section land.
4. **3 and 7 (the two flows)** — build them as a pair, same box language.
5. **2 (coverage map)** — easy, mostly typesetting.
6. **8 (Design.md)** — easy, but the least load-bearing.
7. **1 (hero)** — last. It sets the tone, and you'll have the component
   vocabulary sorted by then from making the other seven.

Send them over as you go and I'll wire each one in — the insertion points are
already marked as comments in `src/app/blueprints/page.js`.
