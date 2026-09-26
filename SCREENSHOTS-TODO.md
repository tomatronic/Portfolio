# Screenshots to capture — before access ends

**Everything here needs Rakuten Advertising product access. Once that goes, none
of it is recoverable.** Ordered so that if you only get through the first
section, the site is still in decent shape.

Capture at **1600px wide or more** (the column renders at 760px and the hero at
856px, so 1600 covers retina with room). PNG. Lorem/dummy data is fine and
already the norm across the site — none of these need real account data.

Drop them anywhere and say where; wiring them in is a few minutes each.

---

## P1 — InfluencerCampaigns (the urgent one)

The longest case study (1,254 words) carries **two images**. Four sections each
describe a specific screen and show nothing. These four are the whole gap.

- [ ] **Verified posts grid** → *Social post verification*
  The posts view with previews, impressions/engagements per post, and the
  adcode row. The copy promises "post preview, engagement metrics, verification
  status" and card layouts that "accommodate variable data" — so a grid with a
  few cards visible is ideal. **If a failure/undetected state exists, grab that
  too** — the section is explicitly about designing for it, and nothing on the
  page shows it.

- [ ] **Campaign approvals / influencer profiles** → *Influencer profile design*
  The advertiser-side approvals list: influencer name, socials, follower counts,
  Approve/Decline. Doubles as the advertiser half of *Dual-audience UI*.

- [ ] **Campaign details page (influencer view)** → *Campaign details page*
  Deliverables, hashtags, offers and incentives, and the Apply CTA. The copy is
  about converting applicants, so the compensation and CTA need to be in frame.
  ⚠️ **Use a Rakuten-branded advertiser, not Etsy.** The version in git history
  is white-labelled Etsy and reads as an Etsy product at a glance — the Rakuten
  case study was hidden for exactly that reason.

- [ ] **Advertiser dashboard / campaign management** → *Dual-audience UI*
  The "Campaign Management" side, to sit against the influencer "Opportunities"
  side. The section's whole point is the same system wearing two faces, so a
  pair works better than one: if you can get **both** in the same visual state,
  that becomes the strongest image on the page.

- [ ] *(optional)* **One end-to-end shot** → *Solution*
  The Solution section currently has no image at all. Anything that shows the
  core workflow in one frame would close it — otherwise the four above carry it.

## P2 — Prompt (two known gaps, both flagged since August)

The hero is done. These are the two that stop the case study from carrying any
caption that claims to show the shipped product.

- [ ] **Tag/token state, in the shipped sidebar layout**
  The field picker open — search, checkbox list, "Add to prompt" — with the
  token row visible underneath. Must be the **current** UI with the left
  sidebar, not the older full-bleed purple.

- [ ] **One more shipped screen** to replace either `Prompt-suggestion.png`
  (Approach, older full-bleed purple) or `Prompt-tags-alt.png` (Solution, older
  toggle-pill). Either one replaced is enough to clear the mismatch.

## P3 — nice to have

- [ ] **ACJ** needs nothing. Best-illustrated of the three at 124 words per
  image. Only grab something if it's free.
- [ ] **`bio.png` re-export, ~900px wide.** Not Rakuten — do it any time. It is
  currently 382px for a 300px slot, the one genuinely soft image on the site.

---

## Why 1600px

| slot | renders at | wants at 2× |
|---|---|---|
| case study hero | 856px | 1712px |
| inline figure | 760px | 1520px |

Anything at 1600+ clears both. Under ~1000px will look soft on a laptop screen.

## Not needed

Rakuten (the fourth case study) is `listed: false` — unlinked everywhere. Don't
spend any of Wednesday on it.
