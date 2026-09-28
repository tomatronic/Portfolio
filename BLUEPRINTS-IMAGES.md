# /blueprints — the remaining images

Image 9 ("The system in use") is built from images already in `/public`, and
**image 6 (pill contrast) landed 2026-09-28** — see the note under it. **Image 8
was dropped** rather than deferred — see below. The remaining six are diagrams or
Figma recreations — **none need Rakuten access**, so this case study is
completable whenever.

---

## House style — applies to all six

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

## 6. Pill contrast before and after — ✅ DONE, but re-export it

`public/blueprints-pill-contrast.png`, in place and wired up. The colours are
correct: measured from the file, the before half is `#16a34a` on `#dcfce7`
(3.00:1, fails) and the after is `#456418` on `#e8f4d7` (5.94:1, passes), so the
red and green AA marks are honest.

**It is 386px wide and needs re-exporting at 1600.** The column is 760px, so at
386 it renders centred at half width and is soft on any retina screen — it needs
772 device pixels and has 386. The site has no `w-full` on figure images, so
nothing is stretched; it is just small and soft. A 4x export from the same Figma
frame fixes both.

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

## 8. Design.md excerpt — ❌ DROPPED (2026-09-28)

Tom's call, and the right one: the file is text, and it is internal. A
screenshot would either carry internal detail or be a re-creation standing in as
evidence, and an illustrative markdown block proves nothing a sentence doesn't.
The section stands on its copy; the figure slot is gone from the page.

Don't revive this as "a generic version" — that is the version that isn't worth
having.

---

## Order worth doing them in

1. ~~**6 (pill contrast)**~~ — done, pending a 1600px re-export.
2. **5 (cards)** — the strongest single argument you have. Twenty-plus to one.
3. **4 (tokens)** — makes the most abstract section land.
4. **3 and 7 (the two flows)** — build them as a pair, same box language.
   Figma prompts for both are at the foot of this file.
5. **2 (coverage map)** — easy, mostly typesetting.
6. **1 (hero)** — last. It sets the tone, and you'll have the component
   vocabulary sorted by then from making the other five.

Send them over as you go and I'll wire each one in — the insertion points are
already marked as comments in `src/app/blueprints/page.js`.

---

# Figma prompts for the two flow diagrams

Both flows use **the same box language** — build one, then duplicate the frame
and swap the contents, so images 3 and 7 read as a pair on the page. Shared
spec, before either prompt:

- Frame **1600 wide**, white fill, no border.
- Boxes: white fill, **16px radius**, 1px stroke `#292929` at **10%**, no shadow.
  Label inside in **DM Sans Medium 28px `#292929`**, one or two words.
- A line of supporting text under a label where it's needed: **DM Sans Regular
  22px `#5D5D5D`**, kept to one short line.
- Arrows: **2px `#737373`**, simple triangular heads, horizontal between steps.
- **One purple, `#8529CD`.** Exactly one path per diagram gets it — box stroke
  at 100%, fill at 8%, arrow and label in solid purple. Everything else is ink.
- Step numbers are unnecessary in 3 (the page already numbers them) and wrong in
  7 (it isn't a numbered list). Leave them off both.
- Export **PNG at 2x**, so 1600 wide comes out at 3200 and downsamples cleanly.

## Prompt — image 3, governance flow

> A horizontal process diagram on a white background, 1600 × 700, in DM Sans.
> Five rounded rectangles left to right, evenly spaced, connected by thin grey
> arrows: **Propose**, **Review**, **Version**, **Deprecate**, **Document**.
> Each box has its name in dark grey and one short line of lighter grey text
> beneath it: Propose — "any designer, in the design channel"; Review — "checked
> against scope and principles"; Version — "released from GitHub"; Deprecate —
> "removed one major version later"; Document — "guidance in the pattern
> library".
>
> Below the Review box, two short arrows drop down and outward to two smaller
> boxes: **Add to system** on the left and **Keep local** on the right. A thin
> arrow curves from *Add to system* back up into the Version box, so the
> approved path rejoins the flow. **Keep local** has no outgoing arrow — it
> leaves the flow. Draw this branch in purple (#8529CD): both small boxes
> stroked purple with an 8% purple fill, both arrows purple. Everything else is
> monochrome grey.
>
> Generous white space, no shadows, no icons, no colour other than the purple
> branch.

**What the diagram has to earn:** the branch is the whole reason this image
exists. A five-box row is just the list above it in another shape. Give the
branch real vertical room — don't tuck it under Review as an afterthought — and
make sure **Keep local terminating** is visually obvious, because "not
everything gets in" is the point of having governance at all.

## Prompt — image 7, Figma to code workflow

> A horizontal workflow diagram on a white background, 1600 × 700, in DM Sans,
> matching the style of the governance diagram: rounded rectangles, 16px radius,
> thin grey strokes, thin grey arrows, no shadows or icons.
>
> Four boxes left to right: **Figma** ("designer edits the component"), **Claude**
> ("reads the change via the Figma MCP"), **GitHub** ("generates the code
> change"), **Copilot review** ("automated first pass").
>
> After Copilot review the flow splits into two paths that both end at a final
> **Release** box on the right:
> - the upper path goes straight from Copilot review to Release, labelled
>   **"patch — ships on this alone"**. Draw this path in purple (#8529CD):
>   purple arrows and a purple label.
> - the lower path passes through one more box, **Engineer review** ("minor and
>   above"), before reaching Release. Keep this path grey.
>
> The purple path should read as the shorter, faster one. Generous white space,
> no colour other than the purple.

**Why purple goes on the patch path and not the engineer one:** the claim in the
copy is that designers could ship independently. The short path *is* that claim.
Highlighting the engineer path instead would make the same diagram argue the
opposite.

**One thing to watch:** the page says Copilot reviews first and a patch can ship
on that alone. If you simplify the diagram to a single straight line, it
contradicts the paragraph directly above it. The split is not optional.

**Stretch, if there's time:** a 20–30 second screen recording of this workflow
rebuilt on a personal project beats the diagram outright — a moving demo of
design-to-code is the kind of evidence nobody expects to see. It needs somewhere
to live, so treat it as a bonus rather than a blocker.
