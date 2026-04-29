'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Lock } from 'lucide-react'
import OtherCaseStudies from '../../components/OtherCaseStudies'

const CORRECT_PASSWORD = 'secret'

// ─── Inline password gate (for direct URL access) ─────────────────────────────

function PagePasswordGate({ onAuth }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem('influencer_auth', '1')
      onAuth()
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
            <Lock size={18} />
          </div>
          <div>
            <h3
              className="text-xl text-slate-950 dark:text-white"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              Password protected
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This case study is currently under wraps.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Enter password"
            className={[
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors',
              'bg-slate-50 text-slate-950 placeholder-slate-400 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500',
              error
                ? 'border-red-400 dark:border-red-500'
                : 'border-slate-200 focus:border-violet-500 dark:border-slate-700 dark:focus:border-violet-500',
            ].join(' ')}
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="btn-violet-3d w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
          >
            View case study
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Case study content ────────────────────────────────────────────────────────

function CaseStudyContent() {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">

          {/* Hero */}
          <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
            <Image
              src="/brewtifulBg.png"
              width={1600}
              height={927}
              alt="Influencer Campaigns product overview — advertiser and influencer interface for managing affiliate influencer campaigns on Rakuten Advertising"
            />
          </div>

          {/* Header grid */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                Rakuten Advertising &bull; Sept 2025 – Ongoing
              </p>
              <h1>From Concept to Production in 5 Months</h1>
            </div>
            <div className="md:col-span-2">
              <p>
                Rakuten Advertising needed to enter the influencer affiliate marketing space, fast.
                High-value advertisers were requesting an influencer solution that could integrate
                within their existing affiliate program. Aware that competitors offered this,
                Rakuten Advertising risked losing high-value, strategic accounts.
              </p>
              <div className="space-y-1 text-slate-600 dark:text-slate-400">
                <p className="text-sm">
                  <span className="font-normal">Role:</span>{' '}
                  <span className="font-semibold">Sole UX designer</span>
                </p>
                <p className="text-sm">
                  <span className="font-normal">Skills:</span>{' '}
                  <span className="font-semibold">UX/UI, User Research, Prototyping, User Testing</span>
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
            <div className="col-span-4 mb-12">

              {/* Business case */}
              <p>The business case was clear:</p>
              <ul className="mb-8 space-y-2">
                <li><b>Retain and win high-value advertisers</b> who wanted influencer and affiliate in one platform</li>
                <li><b>Grow the creator network</b> — attract influencers to Rakuten Advertising and encourage advertisers to invite them into the ecosystem</li>
                <li><b>New revenue streams</b> from influencer campaigns and creator-focused advertisers</li>
              </ul>
              <p>
                The challenge? Rakuten had never worked closely with influencers before. There was no
                infrastructure to connect social accounts, no management tools for campaigns, and no
                creator-facing UI. An added pressure was to meet a hard deadline for a prospect demo
                the following Monday.
              </p>

              {/* Challenge */}
              <h2 className="pt-10 text-xl tracking-tight">Challenge</h2>
              <p>This project had many constraints that can make design hard:</p>
              <ul className="mb-8 space-y-2">
                <li><b>Extreme time pressure</b> — a prospect demo within a week of project initiation</li>
                <li><b>New user type</b> — influencers think about content creation, brand partnerships and social engagement, not metrics and commission structures</li>
                <li><b>New product category</b> — campaigns were a new concept; advertisers would create opportunities, set deliverables and offer incentives, then invite and manage influencers</li>
                <li><b>Technical unknowns</b> — we were using a partner to authenticate social accounts and consolidate posts linked to campaigns</li>
                <li><b>No existing patterns</b> — although some influencers were in the platform, there was no influencer-specific UI; everything needed designing from scratch</li>
                <li><b>Cross-functional complexity</b> — working across timezones, coordinating with external partners, aligning with developers estimating effort on the fly</li>
              </ul>

              <h3 className="pt-10">My approach: Prototype first, validate fast</h3>
              <p>
                On Tuesday morning, I joined a briefing call with the VP of Product. The big question
                was asked: "Can we demonstrate a compelling vision of this product to a prospect by
                Monday?" That gave me less than a week.
              </p>
              <p>
                I started with a light level of research to enable quick user flows, which were beefed
                out with wireframes and quickly iterated into a golden-path clickthrough prototype with
                high-fidelity mocks.
              </p>
              <p>What I built in 5 days:</p>
              <ul className="mb-8 space-y-2">
                <li>Full clickable prototype showing the end-to-end experience</li>
                <li>Advertiser side: campaign creation, influencer invites, application review</li>
                <li>Influencer side: campaign discovery, application flow, deliverable submission</li>
                <li>Social post display</li>
                <li>Key workflows connected and demonstrable</li>
              </ul>
              <p>Why this approach worked:</p>
              <ul className="mb-8 space-y-2">
                <li><b>Speed over perfection</b> — I jumped straight to high-fidelity mockups using existing design system components where possible</li>
                <li><b>Risk reduction</b> — by prototyping the complete flow, I surfaced technical questions early and gave engineering and the external partner team clear requirements to evaluate</li>
                <li><b>Stakeholder confidence</b> — when the VP of Product saw the prototype, it gave her confidence to demo the vision to the prospect</li>
                <li><b>The result</b> — prototype delivered Friday, demo to prospect Monday, prospect impressed, project greenlit for December MVP</li>
              </ul>

              <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
                <Zoom>
                  <Image
                    src="/sampleBeer.png"
                    className="w-full rounded-2xl"
                    width={500}
                    height={542}
                    alt="High-fidelity prototype screens delivered in five days showing the end-to-end influencer campaign flow for the prospect demo"
                  />
                </Zoom>
              </div>

              {/* Key Decisions */}
              <h2 className="pt-10 text-xl tracking-tight">Key Decisions</h2>
              <p>
                With the prototype validated, I moved into detailed design and scoping. Here are the
                critical decisions that helped shape the product.
              </p>

              <h3 className="pt-10">Ruthless V1 scoping: ship a complete story, not everything</h3>
              <p>
                With only five months to production, I worked with the PM to make hard choices about
                what to include in MVP versus what to defer.
              </p>
              <p>What I cut for V1:</p>
              <ul className="mb-8 space-y-2">
                <li><b>In-app negotiation</b> — advertisers and influencers can't negotiate terms in-platform (V2 feature pending user feedback)</li>
                <li><b>AI integrations</b> — brief and campaign creation, smart influencer suggestions, and AI-optimised incentive recommendations deferred to V2</li>
                <li><b>Multiple invite entry points</b> — limited to one primary location to reduce engineering surface area</li>
              </ul>
              <p>What I kept for V1:</p>
              <ul className="mb-8 space-y-2">
                <li>Core campaign creation and editing</li>
                <li>Influencer application flow</li>
                <li>Social post verification (the key differentiator)</li>
                <li>Basic campaign management and review tools</li>
              </ul>
              <p>
                <b>The principle</b>: ship a complete story a user can accomplish end-to-end, even if
                it's missing extra polish. The ruthless scoping had an unexpected benefit — it forced
                me to identify the absolute core value proposition. What's the ONE thing this product
                must do? Let advertisers create campaigns and let influencers apply and complete them.
                Everything else is enhancement.
              </p>

              <h3 className="pt-10">Dual-audience UI</h3>
              <p>
                Advertisers and influencers needed fundamentally different experiences from the same
                underlying campaign system.
              </p>
              <p>For advertisers (campaign creation):</p>
              <ul className="mb-8 space-y-2">
                <li>Business-focused language: goals, deliverables, compensation structures</li>
                <li>Campaign management dashboard showing applications, completions, performance</li>
                <li>Detailed influencer profiles with audience data, engagement rates, previous campaigns</li>
              </ul>
              <p>For influencers (campaign discovery):</p>
              <ul className="mb-8 space-y-2">
                <li>Opportunity-focused language: what's in it for them, what they need to do</li>
                <li>"Sell" the campaign with compelling visuals and clear expectations</li>
                <li>Simplified application flow — quick to apply, easy to understand requirements</li>
              </ul>
              <p>
                These couldn't be separate products (engineering would never deliver in time), but they
                couldn't feel identical either. I settled on shared underlying components and data
                structures, but with different content hierarchy and visual framing. Advertisers see
                "Campaign Management." Influencers see "Opportunities."
              </p>

              <h3 className="pt-10">Social post verification</h3>
              <p>
                The most critical — and most uncertain — piece was social post detection. The external
                partner would detect when an influencer posted about a campaign, but the exact mechanism
                wasn't finalised. How do you design a verification UI when you don't know exactly what
                data you'll receive?
              </p>
              <ul className="mb-8 space-y-2">
                <li><b>Design for the ideal state first</b> — what should it look like if everything works perfectly? Show the post preview, engagement metrics, verification status</li>
                <li><b>Then design for failure states</b> — what if the post isn't detected? How does an advertiser manually review or flag issues?</li>
                <li><b>Build in flexibility</b> — card-based layouts that can accommodate variable data, whether posts have images, videos, or just text</li>
              </ul>

              <h3 className="pt-10">Influencer profile design</h3>
              <p>
                Advertisers needed to evaluate influencers before approving applications. We suddenly
                had access to social data we'd never dealt with — follower counts, engagement rates, post
                frequency, audience demographics. It would be easy to show everything, but more data
                isn't always better. I prioritised active socials, engagement quality over vanity
                metrics, recent activity, and audience relevance. Everything else was cut to keep the
                profile clean and the story immediate.
              </p>

              <h3 className="pt-10">Campaign details page</h3>
              <p>
                After clicking a campaign thumbnail, influencers needed comprehensive information
                presented persuasively. I shifted my thinking from "display campaign details" to
                "convert interested influencers into applicants." Key decisions: lead with deliverables
                and compensation; frame requirements as opportunities, not obligations; clear primary
                CTAs with minimal friction. The page needed to feel like an opportunity worth pursuing,
                not a dry specification document.
              </p>

              <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
                <Zoom>
                  <Image
                    src="/initialDoodle.png"
                    className="w-full rounded-2xl"
                    width={1000}
                    height={774}
                    alt="Early wireframe sketches for the influencer campaign creation and discovery flows"
                  />
                </Zoom>
              </div>

              {/* Testing */}
              <h2 className="pt-10 text-xl tracking-tight">Testing and iteration</h2>
              <div className="mb-12 space-y-6">
                <p><b>Internal validation (Weeks 2–3)</b> — tested with 8 PMs and engineers; advertiser flows were clear, but influencer outcome messaging needed clarification and workflows were adjusted accordingly.</p>
                <p><b>MVP scope refinement (Weeks 3–8)</b> — weekly reviews with VP and engineering; continuously cutting scope to hit December, with every cut documented with rationale for potential V2.</p>
                <p><b>The biggest surprise</b> — advertisers cared more about getting influencers onboard and carrying out campaigns than the outcomes. With a small initial advertiser pool of larger companies, the extras can come later.</p>
              </div>

              <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
                <Zoom>
                  <Image
                    src="/brewComp.png"
                    className="w-full rounded-2xl"
                    width={2390}
                    height={1206}
                    alt="Iteration notes and internal validation feedback from weeks two and three"
                  />
                </Zoom>
              </div>

              {/* Solution */}
              <h2 className="pt-10 text-xl tracking-tight">Solution</h2>
              <p>
                The final MVP design focused on the core workflow: advertisers create campaigns,
                influencers discover and apply, content gets posted and verified, incentives get
                distributed. Key design elements: progressive disclosure to show essential info first;
                card-based layouts flexible enough to handle variable data from external APIs; clear
                primary CTAs on every screen; dual-audience framing with different language and
                hierarchy for each user type; and visual hierarchy that makes incentives and
                requirements unmissable.
              </p>

              {/* Outcome */}
              <h2 className="pt-10 text-xl tracking-tight">Outcome</h2>
              <ul className="mb-8 space-y-2">
                <li><b>Complete clickable prototype</b> — 5 days</li>
                <li><b>Prospect demo and buy-in</b> — Day 6</li>
                <li><b>MVP development</b> — September 2025 to February 2026 (5 months concept-to-production)</li>
                <li><b>Planned V2 iteration</b> — Mid-January 2026 based on real user feedback and data</li>
              </ul>
              <p>What this speed enabled:</p>
              <ul className="mb-8 space-y-2">
                <li>Secured prospect commitment by demonstrating vision before competitors</li>
                <li>Lowered project risk by validating concepts before heavy engineering investment</li>
                <li>Aligned stakeholders around a shared vision through tangible prototypes</li>
                <li>Created urgency that kept the project prioritised through competing demands</li>
              </ul>

              {/* What I learned */}
              <h2 className="pt-10 text-xl tracking-tight">What I learned</h2>
              <p>Having a prototype that looked and felt real made a concrete difference. A VP could show it to a prospect with confidence — wireframes wouldn't have done that. Fidelity bought credibility faster than I expected.</p>
              <p>The five-month deadline forced a kind of clarity I rarely have on longer projects. Every feature had to earn its place in V1. I ended up cutting things I would normally have kept, and the product was tighter for it.</p>
              <p>I built the layouts to be flexible from the start — cards that could handle variable data, components that could be extended without breaking. That wasn't over-engineering; it was the only practical way to ship something that could grow once real users showed up with real feedback.</p>
              <p>Prototyping end-to-end, rather than screen by screen, helped me catch gaps that would have been expensive to fix later. It's easy to design a screen that looks good in isolation. It's harder to design a journey that actually holds together.</p>
              <p className="mb-12">And the deadline, oddly, helped. When you have to ship something complete in a tight timeframe, you stop defending nice-to-haves and focus on what the product actually needs to be usable.</p>

              <div className="mb-8 space-y-8">
                <Zoom>
                  <Image
                    src="/beerLover.png"
                    className="w-full rounded-2xl"
                    width={1684}
                    height={1190}
                    alt="Advertiser persona — goals, pain points, and mental model for an advertiser using Rakuten's influencer campaign tools"
                  />
                </Zoom>
                <Zoom>
                  <Image
                    src="/designLover.png"
                    className="w-full rounded-2xl"
                    width={1684}
                    height={1190}
                    alt="Influencer persona — goals, pain points, and mental model for a content creator using Rakuten's campaign discovery and application flow"
                  />
                </Zoom>
              </div>

              <OtherCaseStudies currentHref="/casestudy/InfluencerCampaigns" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ─── Auth wrapper ──────────────────────────────────────────────────────────────

export default function InfluencerContent() {
  const [auth, setAuth] = useState(null) // null = checking, true/false = result

  useEffect(() => {
    setAuth(sessionStorage.getItem('influencer_auth') === '1')
  }, [])

  if (auth === null) return null // avoid flash before sessionStorage check
  if (!auth) return <PagePasswordGate onAuth={() => setAuth(true)} />
  return <CaseStudyContent />
}
