'use client'

import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import OtherCaseStudies from '../../components/OtherCaseStudies'

// ─── Case study content ────────────────────────────────────────────────────────

function CaseStudyContent() {
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">

          {/* Hero */}
          <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
            <Image
              src="/influencerHero.png"
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
              <p>
                The business case was clear: retain and win high-value advertisers who wanted influencer
                and affiliate in one platform, grow the creator network by attracting influencers to the
                ecosystem, and open new revenue streams from creator-focused campaigns.
              </p>
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

              {/* Personas */}
              <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Advertiser */}
                <div className="rounded-2xl border border-[#C8BEB0] bg-[#EDE7DD] p-6 dark:border-[#2A3A4A] dark:bg-slate-800/50">
                  <span className="mb-5 inline-block rounded-full border border-[#C8BEB0] bg-white/70 px-2.5 py-0.5 text-xs font-medium text-accent-600 dark:border-[#2A3A4A] dark:bg-white/10 dark:text-accent-400">
                    Advertiser
                  </span>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-200 text-accent-700 dark:bg-accent-950 dark:text-accent-400"
                      style={{ fontSize: '1.1rem' }}
                    >
                      S
                    </div>
                    <div>
                      <p className="mb-0 max-w-none text-sm font-semibold text-slate-950 dark:text-white">Sarah Chen</p>
                      <p className="mb-0 max-w-none text-xs text-slate-500 dark:text-slate-400">Performance Marketing Manager</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 max-w-none text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Goals</p>
                      <ul className="max-w-none space-y-1.5">
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Retain influencer partners within one platform
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Prove influencer ROI to stakeholders
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Manage deliverables without switching tools
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 max-w-none text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Pain points</p>
                      <ul className="max-w-none space-y-1.5">
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Fragmented tools for affiliate and influencer management
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          No way to verify posts were published as agreed
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Social metrics don't connect to affiliate performance data
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Creator */}
                <div className="rounded-2xl border border-[#C8BEB0] bg-[#EDE7DD] p-6 dark:border-[#2A3A4A] dark:bg-slate-800/50">
                  <span className="mb-5 inline-block rounded-full border border-[#C8BEB0] bg-white/70 px-2.5 py-0.5 text-xs font-medium text-accent-600 dark:border-[#2A3A4A] dark:bg-white/10 dark:text-accent-400">
                    Creator
                  </span>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-200 text-accent-700 dark:bg-accent-950 dark:text-accent-400"
                      style={{ fontSize: '1.1rem' }}
                    >
                      M
                    </div>
                    <div>
                      <p className="mb-0 max-w-none text-sm font-semibold text-slate-950 dark:text-white">Marcus Reid</p>
                      <p className="mb-0 max-w-none text-xs text-slate-500 dark:text-slate-400">Lifestyle Content Creator · 85k followers</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 max-w-none text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Goals</p>
                      <ul className="max-w-none space-y-1.5">
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Find brand partnerships that match their niche
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Understand exactly what's required before committing
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                          Get paid reliably with clear terms upfront
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 max-w-none text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">Pain points</p>
                      <ul className="max-w-none space-y-1.5">
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Vague campaign briefs with unclear deliverables
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Platforms built for advertisers, not creators
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          No visibility on payment status after posting
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

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
              <p>
                In five days I built a full clickable prototype covering the end-to-end experience:
                campaign creation, influencer invites, and application review on the advertiser side;
                campaign discovery, application flow, and deliverable submission on the influencer side;
                social post display; and all key workflows connected and demonstrable.
              </p>
              <p>
                Jumping straight to high-fidelity mockups — using existing design system components
                where possible — meant the prototype moved fast without sacrificing credibility.
                Prototyping the complete flow, rather than individual screens, surfaced technical
                questions early and gave engineering clear requirements to evaluate. When the VP of
                Product saw it, she had enough confidence to demo the vision to the prospect directly.
                Prototype delivered Friday, demo on Monday, project greenlit for December MVP.
              </p>

              <div className="mb-8 flex flex-row flex-wrap place-content-center content-center rounded-2xl bg-[#EDE7DD] dark:bg-slate-800/50">
                <Zoom>
                  <Image
                    src="/prototypeScreens.png"
                    className="w-full rounded-2xl"
                    width={1400}
                    height={800}
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
              <p>Everything went through the same filter: does this need to exist on day one?</p>

              <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Shipped in V1 */}
                <div className="rounded-2xl bg-[#EDE7DD] p-6 dark:bg-slate-800/50">
                  <p className="mb-4 text-sm font-semibold text-slate-950 dark:text-white">Shipped in V1</p>
                  <ul className="space-y-2.5 text-base font-normal text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                      <span>Campaign creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                      <span>The influencer application flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                      <span>Social post verification (the key differentiator)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                      <span>The basic management tools to run it all</span>
                    </li>
                  </ul>
                </div>

                {/* Deferred to V2 */}
                <div className="rounded-2xl bg-[#EDE7DD] p-6 dark:bg-slate-800/50">
                  <p className="mb-4 text-sm font-semibold text-slate-950 dark:text-white">Deferred to V2 — genuinely useful, but not necessary to ship a complete story</p>
                  <ul className="space-y-2.5 text-base font-normal text-slate-600 dark:text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                      <span>In-app negotiation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                      <span>AI-powered brief creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                      <span>Smart influencer recommendations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                If a user could complete that journey end-to-end, we had an MVP. The ruthless scoping
                had an unexpected benefit — it forced me to identify the absolute core value proposition.
                What's the one thing this product must do? Let advertisers create campaigns and let
                influencers apply and complete them. Everything else is enhancement.
              </p>

              <h3 className="pt-10">Dual-audience UI</h3>
              <p>
                Advertisers and influencers needed fundamentally different experiences from the same
                underlying campaign system.
              </p>
              <p>
                Advertisers needed business-focused tools: a management dashboard tracking applications
                and completions, detailed influencer profiles with audience data and engagement rates,
                and language around goals, deliverables, and compensation structures. Influencers needed
                almost the opposite — opportunity-focused framing that answered "what's in it for me?"
                before anything else. Campaigns needed to be sold, not specified. The application flow
                had to be quick and low-friction, with requirements framed as expectations rather than
                obligations.
              </p>
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

              {/* Testing */}
              <h2 className="pt-10 text-xl tracking-tight">Testing and iteration</h2>
              <div className="mb-12 space-y-6">
                <p><b>Internal validation (Weeks 2–3)</b> — tested with 8 PMs and engineers; advertiser flows were clear, but influencer outcome messaging needed clarification and workflows were adjusted accordingly.</p>
                <p><b>MVP scope refinement (Weeks 3–8)</b> — weekly reviews with VP and engineering; continuously cutting scope to hit December, with every cut documented with rationale for potential V2.</p>
                <p><b>The biggest surprise</b> — advertisers cared more about getting influencers onboard and carrying out campaigns than the outcomes. With a small initial advertiser pool of larger companies, the extras can come later.</p>
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
              <p>
                Moving fast with a tangible prototype did more than hit a deadline. It secured the
                prospect's commitment before competitors could respond, validated the concept before
                any serious engineering investment, and aligned stakeholders around a shared vision
                they could actually click through. The prototype also created its own momentum —
                when people can see and interact with something real, it stays prioritised through
                competing demands in a way that a slide deck never does.
              </p>

              {/* What I learned */}
              <h2 className="pt-10 text-xl tracking-tight">What I learned</h2>
              <p>Having a prototype that looked and felt real made a concrete difference. A VP could show it to a prospect with confidence — wireframes wouldn't have done that. Fidelity bought credibility faster than I expected.</p>
              <p>The five-month deadline forced a kind of clarity I rarely have on longer projects. Every feature had to earn its place in V1. I ended up cutting things I would normally have kept, and the product was tighter for it.</p>
              <p>I built the layouts to be flexible from the start — cards that could handle variable data, components that could be extended without breaking. That wasn't over-engineering; it was the only practical way to ship something that could grow once real users showed up with real feedback.</p>
              <p>Prototyping end-to-end, rather than screen by screen, helped me catch gaps that would have been expensive to fix later. It's easy to design a screen that looks good in isolation. It's harder to design a journey that actually holds together.</p>
              <p className="mb-12">And the deadline, oddly, helped. When you have to ship something complete in a tight timeframe, you stop defending nice-to-haves and focus on what the product actually needs to be usable.</p>

              <OtherCaseStudies currentHref="/casestudy/InfluencerCampaigns" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function InfluencerContent() {
  return <CaseStudyContent />
}
