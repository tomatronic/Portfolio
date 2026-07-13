# Case Study Review — Layout, Consistency & Content

Date: 2026-05-25

---

## Layout & Consistency Audit

### Issues across all four case studies

**1. Container padding inconsistency**
Prompt, ACJ, and Influencer use `px-6` on the outer container. Rakuten also uses `px-6`. These all match each other — however they use `px-6` while the homepage uses `px-4`. Minor, but worth aligning.

**2. Outcome sections use inconsistent formatting**
- Prompt uses proper `<h2>` and `<blockquote>` elements — cleanest structure
- ACJ mixes `<p>` with inline `&bull;` characters instead of `<ul>` lists, and uses inline `<b>` tags mid-paragraph
- Rakuten has very short, underdeveloped outcome copy with no metrics
- Influencer is the strongest for structure (personas, headers, clear sections)

**Fix:** Replace all `&bull;` + inline formatting in ACJ with proper `<ul>` lists, consistent with the other three.

**3. h2 section headings use `pt-10 text-xl` — correct on all four** ✓
This is consistent. No issues here.

**4. Hero image treatment is inconsistent**
- Prompt: `flex flex-row flex-wrap place-content-center` image container — image floats at natural size inside the cream wrapper, not full-bleed
- ACJ: Same pattern — image floats rather than filling the container
- Rakuten: Completely different — uses `h-[55vh]` with a background image (`offerBG.png`) and a centred `<Image>` on top. This is a visually richer treatment but inconsistent with the others and the `offerBG.png` file uses what appears to be stock photography that doesn't match the site's cream/amber palette
- Influencer: Uses the standard flex-wrap pattern like Prompt/ACJ

**Fix:** Standardise hero images to fill their container using `w-full` on the `<Image>` element, rather than floating at natural width. This gives each case study a proper full-bleed hero. Rakuten's background-image hero should be rebuilt to match the others.

**5. `rounded-4xl` card wrapping is present on all four** ✓ Consistent.

**6. `OtherCaseStudies` component appears at the bottom of all four** ✓ Consistent.

---

## Content Review — Per Case Study

---

### 1. Natural Language Search & AI (Prompt) ★★★★☆

**Strengths:**
- Best written of the four. The "What I Learned" section is genuinely insightful — the observation that "adoption followed trust, not the other way around" is a senior-level reflection
- Strong quantified outcomes ($10M time savings, 90% reduction) — these are the most compelling numbers on the site
- User quotes are specific and believable — they feel real, not PR-polished
- "Behavioural changes observed" is a standout section — shows you were tracking what actually changed, not just whether people used the feature
- The five-point challenge list (Trust, Ambiguity, Control vs. speed, Technical constraints, Fallback) demonstrates systems thinking up front

**Gaps & suggestions:**
- **Missing: a before/after comparison.** You have `Prompt-old2.png` (the legacy interface) and the new solution — but there's no explicit before/after framing. A side-by-side section titled "Before & After" with both images would make the transformation immediately clear to a recruiter skimming
- **Missing: your process visuals.** The Approach section tells us you "prototyped three interaction models" and tested them — but there are no wireframes, explorations, or iteration screenshots. Even one image showing an early sketch or low-fi wireframe would show your thinking, not just your output
- **"Learning from beta" needs a sharper structure.** The section currently reads as one long paragraph of mixed observations. Breaking it into two short sub-sections — "What worked" and "What surprised us" — would make it scannable
- **The role/skills metadata is underselling you.** "Sole UX designer" is correct but bland. Consider adding context: "Sole UX designer — embedded in a cross-functional team of 4 engineers and 1 PM" or similar

---

### 2. Multi-Touch Attribution for Affiliate (ACJ) ★★★★☆

**Strengths:**
- The challenge section is excellent — the dual-audience problem ("same data, different questions") is explained clearly and makes the design constraints tangible
- Strong decision rationale: explaining WHY you chose the three-phase framework over alternatives (first/middle/last click) shows senior-level thinking
- The "What I Learned" closing is clean and honest
- Multiple good product screenshots that show the actual UI progression

**Gaps & suggestions:**
- **Outcome section is formatted poorly.** It uses raw `&bull;` characters mixed into `<p>` tags rather than proper lists, and has two separate `<div>` blocks with `<b>` headers mid-paragraph. This reads like a draft, not a finished case study. Restructure into clean `<ul>` lists with a proper `<h3>` for each sub-section
- **"35 daily active users" is a weak metric to lead with.** That number sounds small without context. Reframe: how many total eligible users were there? If it's 35 out of 50 eligible publishers, that's 70% adoption — a very different story. Add the denominator or replace with a more meaningful metric
- **Missing: research artefacts.** The approach section mentions user interviews — are there any synthesis artefacts (journey maps, key insight callouts) you could share? Even a quote from a publisher interview would add credibility to the research claims
- **The "Dual audience" section deserves more prominence.** This is genuinely clever design thinking — one data structure, two views. It should have its own `<h2>` and a visual showing the two different states side by side, not buried mid-paragraph

---

### 3. Offer Management Dashboard (Rakuten) ★★☆☆☆

**This is the weakest case study by a significant margin and needs the most work.**

**Strengths:**
- Good process rigour: survey → affinity mapping → flowchart → wireframe → prototype → testing → iteration. This is the right sequence and you've documented it
- Affinity map image (`affinitymap.jpg`) is a genuinely good research artefact to show — it proves the work happened
- The three goals (Comparison, Discovery, Partnership status) are clear and measurable

**Critical gaps:**

- **No outcome metrics whatsoever.** "Support tickets have dropped" and "account managers report fewer queries" are the only results — no numbers, no percentages, no timeframes. For a case study from 2021, you've had years to gather this data. Even rough estimates ("tickets reduced by approximately 30% in the 6 months post-launch") would be better than nothing. This is the biggest gap on the entire portfolio.
- **The hero image treatment is out of step with the rest of the site.** The `offerBG.png` background appears to be stock/lifestyle photography (it looks like lifestyle photos in dark purple), which clashes with the professional B2B tone of everything else. Replace it with the same cream `#EDE7DD` background treatment used in the other three case studies.
- **The "Solution" section is only one sentence.** After all the research, the actual design solution gets one paragraph: "Redesign how publishers manage affiliate offers... making the flow cleaner and easier to use." This tells us nothing about what you actually designed. You need at minimum 2–3 paragraphs or bullet points explaining the specific design decisions you made and why.
- **The case study reads as a process diary, not a design narrative.** It documents what you did (survey, affinity map, flowchart, sketch, wireframe, prototype, test) but never ties these steps to design decisions. A senior reader wants to know: what did the research tell you that you didn't expect? What tradeoffs did you make? What did you change after testing and why?
- **Sketches image is low signal.** Showing sketches is good in principle, but the `sketches.png` image without any annotation or narration just proves you drew things. Add a caption or surrounding copy that explains what specific problem these sketches were exploring.
- **Missing: the final design screens.** The `after.png` at the very bottom is the final screen — but there's only one. Show 2–3 final screens covering the key flows: the offer list, the comparison view, the acceptance confirmation. These are the deliverables that prove design quality.

**Recommended additions:**
1. Add a "What changed" section between "User testing" and "Outcome" — 3 bullet points explaining the specific iterations made after testing
2. Add quantified outcomes (even approximate)
3. Replace the hero with the standard treatment

---

### 4. Influencer Campaign Platform ★★★★★

**This is your strongest case study and the clearest demonstration of senior-level design.**

**Strengths:**
- The "From Concept to Production in 5 Months" framing immediately signals business impact
- Persona cards are the best-designed element in any case study — they show UX rigour visually, not just in prose
- The timeline narrative (Tuesday briefing → Monday demo → 5-month production) is compelling and concrete
- Challenge list is excellent — six specific, non-trivial constraints show you were working under real pressure
- Cross-functional complexity is documented (external partners, timezone coordination, developer estimation) — this signals senior maturity
- "Prototype first, validate fast" is the right senior-level framing for a constrained brief

**Gaps & suggestions:**
- **Missing: the prototype screens themselves.** `prototypeScreens.png` is referenced and the file exists — make sure it's showing properly in the case study. This is the hero artefact for this section.
- **Missing: a section on what was cut from the MVP.** You mention "In-app negotiation, AI-powered brief creation, and smart influencer recommendations" were cut. This is gold — a senior reader wants to see that you made disciplined scope decisions. Add a short "What we shipped vs. what we scoped" section with a brief explanation of why each feature was deferred
- **The "What Stayed" section is too brief.** The MVP rationale ("advertisers create campaigns, influencers discover and apply...") is stated but not defended. Why was this the right MVP scope? What would have been the cost of including more?
- **Outcome metrics are strong but could be more specific.** "Prototype in 5 days", "shipped in 5 months" — these are good. Can you add anything about initial adoption, advertiser retention numbers, or the prospect demo outcome? Even "the demo successfully retained the account" would close the loop

---

## Priority Action List

### Must do (before sharing with employers)
1. **Rakuten: Add outcome metrics** — even approximate numbers
2. **Rakuten: Replace hero image treatment** to match other three case studies
3. **Rakuten: Expand the "Solution" section** — explain the actual design decisions made
4. **ACJ: Reformat the outcome section** — replace `&bull;` characters with proper lists
5. **Prompt: Add a before/after comparison** — the legacy screen is already in the codebase

### Should do (meaningfully strengthens the portfolio)
6. **Rakuten: Add a "What changed after testing" section** — 3 specific iterations
7. **Prompt: Add one process image** — a wireframe or early exploration screenshot
8. **ACJ: Reframe the DAU metric** — add context or replace with a stronger measure
9. **Influencer: Add a "Shipped vs. Scoped" section** — show your MVP decision-making

### Could do (polish)
10. **All four: Add "Time / team size" to the role metadata** — e.g. "Sole designer, 4-person team, 8 months"
11. **ACJ: Give "Dual-audience design" its own `<h2>`** with a side-by-side visual
12. **Prompt: Break "Learning from beta" into two scannable sub-sections**
