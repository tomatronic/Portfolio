'use client'

import CaseStudyFigure from '../../components/site/CaseStudyFigure'
import CaseStudyHeader from '../../components/site/CaseStudyHeader'
import { WASH, OUTLINE } from '../../components/site/tokens'
import OtherCaseStudies from '../../components/OtherCaseStudies'
import CaseStudyShell from '../../components/site/CaseStudyShell'

// ─── Case study content ────────────────────────────────────────────────────────

function CaseStudyContent() {
  return (
    <CaseStudyShell>

          {/* Hero */}
          <CaseStudyFigure hero priority src="/influencerHero.png" width={1600} height={900} alt="Influencer Campaigns product overview — advertiser and influencer interface for managing affiliate influencer campaigns on Rakuten Advertising" />

          <CaseStudyHeader
            eyebrow="Rakuten Advertising • Sept 2025 – Ongoing"
            title="From Concept to Production in 5 Months"
            role="Sole UX designer"
            skills="UX/UI, User Research, Prototyping, User Testing"
          >
            <p>
              Rakuten Advertising needed to enter the influencer affiliate marketing space, fast.
              High-value advertisers were requesting an influencer solution that could integrate
              within their existing affiliate program. Aware that competitors offered this,
              Rakuten Advertising risked losing high-value, strategic accounts.
            </p>
          </CaseStudyHeader>

          {/* Content */}
          <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
            <div className="col-span-4 mb-12">

              {/* Business case */}
              <p>
                The business case was clear: retain and win high-value advertisers who wanted influencer
                and affiliate in one platform, grow the creator network by attracting influencers to the
                ecosystem, and open new revenue streams from creator focused campaigns.
              </p>
              <p>
                The challenge? Rakuten Advertising had never worked closely with influencers before. There was no
                infrastructure to connect social accounts, no management tools for campaigns, and no
                creator-facing UI. An added pressure was to meet a hard deadline for a prospect demo
                the following Monday.
              </p>

              {/* Challenge */}
              <h2 className="pt-10 tracking-tight">Challenge</h2>
              <p>This project had many constraints that could make the process difficult:</p>
              <ul className="mb-8 space-y-2">
                <li><b>Extreme time pressure</b>: A prospect demo within a week of project initiation</li>
                <li><b>New user type</b>: Influencers think about content creation, brand partnerships and social engagement, not metrics and commission structures.</li>
                <li><b>New product category</b>: Campaigns were a new concept; advertisers would create opportunities, set deliverables and offer incentives, then invite and manage influencers.</li>
                <li><b>Technical unknowns</b>: We would use a partner to authenticate social accounts and consolidate posts linked to campaigns.</li>
                <li><b>No existing patterns</b>: Although some influencers were in the platform, there was no influencer-specific UI, everything needed designing from scratch.</li>
                <li><b>Cross-functional complexity</b>: Working across timezones, coordinating with external partners, aligning with developers estimating effort on the fly</li>
              </ul>

              {/* Personas */}
              <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* Advertiser */}
                <div className={`rounded-2xl border ${OUTLINE} ${WASH} p-6`}>
                  <span className="mb-5 inline-block rounded-full border border-[#292929]/10 bg-white/70 px-2.5 py-0.5 text-[14px] font-medium text-[#292929] dark:border-white/10 dark:bg-white/10 dark:text-[#F2F2F2]">
                    Advertiser
                  </span>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#292929]/[0.08] text-[#292929] dark:bg-white/10 dark:text-[#F2F2F2]"
                      style={{ fontSize: '1.1rem' }}
                    >
                      S
                    </div>
                    <div>
                      <p data-keep className="mb-0 max-w-none text-[15px] font-medium text-[#292929] dark:text-[#F2F2F2]">Sarah Chen</p>
                      <p data-keep className="mb-0 max-w-none text-[14px] text-[#5D5D5D] dark:text-[#B0B0B0]">Performance Marketing Manager</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p data-keep className="mb-2 max-w-none text-[14px] font-medium uppercase tracking-widest text-[#5D5D5D] dark:text-[#B0B0B0]">Goals</p>
                      <ul className="max-w-none space-y-1.5">
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Retain influencer partners within one platform
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Prove influencer ROI to stakeholders
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Manage deliverables without switching tools
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p data-keep className="mb-2 max-w-none text-[14px] font-medium uppercase tracking-widest text-[#5D5D5D] dark:text-[#B0B0B0]">Pain points</p>
                      <ul className="max-w-none space-y-1.5">
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Fragmented tools for affiliate and influencer management
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          No way to verify posts were published as agreed
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Social metrics don't connect to affiliate performance data
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Creator */}
                <div className={`rounded-2xl border ${OUTLINE} ${WASH} p-6`}>
                  <span className="mb-5 inline-block rounded-full border border-[#292929]/10 bg-white/70 px-2.5 py-0.5 text-[14px] font-medium text-[#292929] dark:border-white/10 dark:bg-white/10 dark:text-[#F2F2F2]">
                    Creator
                  </span>
                  <div className="mb-5 flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#292929]/[0.08] text-[#292929] dark:bg-white/10 dark:text-[#F2F2F2]"
                      style={{ fontSize: '1.1rem' }}
                    >
                      M
                    </div>
                    <div>
                      <p data-keep className="mb-0 max-w-none text-[15px] font-medium text-[#292929] dark:text-[#F2F2F2]">Marcus Reid</p>
                      <p data-keep className="mb-0 max-w-none text-[14px] text-[#5D5D5D] dark:text-[#B0B0B0]">Lifestyle Content Creator · 85k followers</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p data-keep className="mb-2 max-w-none text-[14px] font-medium uppercase tracking-widest text-[#5D5D5D] dark:text-[#B0B0B0]">Goals</p>
                      <ul className="max-w-none space-y-1.5">
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Find brand partnerships that match their niche
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Understand exactly what's required before committing
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                          Get paid reliably with clear terms upfront
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p data-keep className="mb-2 max-w-none text-[14px] font-medium uppercase tracking-widest text-[#5D5D5D] dark:text-[#B0B0B0]">Pain points</p>
                      <ul className="max-w-none space-y-1.5">
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Vague campaign briefs with unclear deliverables
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          Platforms built for advertisers, not creators
                        </li>
                        <li data-keep className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" />
                          No visibility on payment status after posting
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

              <h3 className="pt-6">My approach: Prototype first, validate fast</h3>
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
                By the end of the week I managed to build a full clickable prototype covering the
                end-to-end experience: campaign creation, influencer invites, and application review on
                the advertiser side and campaign discovery, application flow, and deliverable submission
                on the influencer side. All key workflows connected and demonstrable.
              </p>
              <p>
                Jumping straight to high-fidelity mockups (using existing design system components
                where possible) meant the prototype moved fast without sacrificing credibility.
                Prototyping the complete flow, rather than individual screens, surfaced technical
                questions early and gave engineering clear requirements to run through and understand.
                When the VP of Product viewed it, she had enough confidence to demo the vision to the
                prospect directly. Prototype delivered Friday, demo on Monday, project greenlit for
                December MVP.
              </p>

              <CaseStudyFigure zoom className="w-full" src="/prototypeScreens.png" width={1400} height={800} alt="High-fidelity prototype screens delivered in five days showing the end-to-end influencer campaign flow for the prospect demo" />

              {/* Key Decisions */}
              <h2 className="pt-10 tracking-tight">Key Decisions</h2>
              <p>
                With the prototype validated, I moved into detailed design and scoping. Here are the
                critical decisions that helped shape the product.
              </p>

              <h3 className="pt-6">Ruthless V1 scoping: ship a complete story, not everything</h3>
              <p>
                With only five months to production, I worked with the PM to make hard choices about
                what to include in MVP versus what to defer.
              </p>
              <p>Everything went through the same filter: does this need to exist on day one?</p>

              <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Shipped in V1 */}
                <div className={`rounded-2xl ${WASH} p-6`}>
                  <p data-keep className="mb-4 text-[15px] font-medium text-[#292929] dark:text-[#F2F2F2]">Shipped in V1</p>
                  <ul className="space-y-2.5 text-[16px] font-normal text-[#5D5D5D] dark:text-[#B0B0B0]">
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                      <span>Campaign creation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                      <span>The influencer application flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                      <span>Social post verification (the key differentiator)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#292929] dark:bg-[#F2F2F2]" />
                      <span>The basic management tools to run it all</span>
                    </li>
                  </ul>
                </div>

                {/* Deferred to V2 */}
                <div className={`rounded-2xl ${WASH} p-6`}>
                  <p data-keep className="mb-4 text-[15px] font-medium text-[#292929] dark:text-[#F2F2F2]">Deferred to V2 — genuinely useful, but not necessary to ship a complete story</p>
                  <ul className="space-y-2.5 text-[16px] font-normal text-[#5D5D5D] dark:text-[#B0B0B0]">
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
                If a user could complete the journey end-to-end, we had an MVP. The ruthless scoping
                had an unexpected benefit, it forced me to identify the absolute core value proposition.
                What's the one thing this product must do?
              </p>
              <p>
                Let advertisers create campaigns and let influencers apply and complete them. Everything
                else is enhancement.
              </p>

              <h3 className="pt-6">Dual-audience UI</h3>
              <p>
                Advertisers and influencers needed fundamentally different experiences from the same
                underlying system.
              </p>
              <p>
                Advertisers needed business-focused tools like a management dashboard tracking
                applications and completions, detailed influencer profiles with audience data and
                engagement rates, and language around goals, deliverables, and compensation structures.
                Influencers instead needed almost the opposite, opportunity-focused framing that answered
                "what's in it for me?" before anything else. Campaigns needed to be sold, not specified. The application flow
                had to be quick and low-friction, with requirements framed as expectations rather than
                obligations.
              </p>
              <p>
                These couldn't be separate products (engineering would never deliver in time), but they
                couldn't feel identical either. I settled on shared underlying components and data
                structures, but with different content hierarchy and visual framing. Advertisers see
                "Campaign Management." Influencers see "Opportunities."
              </p>

              <h3 className="pt-6">Social post verification</h3>
              <p>
                The most critical and most uncertain piece was social post detection. The external
                partner would detect when an influencer posted about a campaign, but the exact mechanism
                wasn't finalised. How do you design a verification UI when you don't know exactly what
                data you'll receive?
              </p>
              <ul className="mb-8 space-y-2">
                <li><b>Design for the ideal state first</b>: What should it look like if everything works perfectly? Show the post preview, engagement metrics, verification status</li>
                <li><b>Then design for failure states</b>: What if the post isn't detected? Can this be manually reviewed and issues flagged?</li>
                <li><b>Build in flexibility</b>: Card based layouts that can accommodate variable data, whether posts have images, videos, or just text</li>
              </ul>

              <h3 className="pt-6">Influencer profile design</h3>
              <p>
                An Advertiser needs to evaluate influencers before approving applications. We suddenly
                had access to social data we'd never dealt with. It would be easy to show everything,
                but more data isn't always better. I prioritised active socials and engagement quality
                over recent activity and audience relevance. Everything else was cut to keep the profile
                clean.
              </p>

              <h3 className="pt-6">Campaign details page</h3>
              <p>
                After clicking a campaign thumbnail, influencers needed detailed information presented
                clearly. I shifted my thinking from "display campaign details" to "convert interested
                influencers into applicants." Key decisions included leading with deliverables and
                compensation, frame requirements as opportunities and clear CTAs with minimal friction.
                The page needed to feel like an opportunity worth pursuing, not a dry specification
                document.
              </p>

              {/* Testing */}
              <h2 className="pt-10 tracking-tight">Testing and iteration</h2>
              <div className="mb-12 space-y-6">
                <p><b>Internal validation (Weeks 2–3)</b>: Tested with 8 PMs and engineers. Findings showed that Advertiser flows were clear, but influencer outcome messaging needed clarification and workflows should be adjusted accordingly.</p>
                <p><b>MVP scope refinement (Weeks 3–8)</b>: Weekly reviews with VP and engineering where we continuously cut or reduced scope to hit the December deadline, every cut was documented with reason for potential V2 implementation.</p>
                <p><b>The biggest surprise</b>: Advertisers cared more about getting influencers onboard and carrying out campaigns than the outcomes. With a small initial advertiser pool of larger companies, the extras can come later.</p>
              </div>


              {/* Solution */}
              <h2 className="pt-10 tracking-tight">Solution</h2>
              <p>
                The final MVP design focused on the core workflow: Advertisers create campaigns,
                influencers discover and apply, content gets posted and verified, incentives get
                distributed. Key design elements included progressive disclosure to show essential info
                first, card-based layouts flexible enough to handle variable data from external APIs,
                dual-audience framing with different language and hierarchy for each user type and
                visual hierarchy that makes incentives and requirements unmissable.
              </p>

              {/* Outcome */}
              <h2 className="pt-10 tracking-tight">Outcome</h2>
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
                they could actually click through. When people can see and interact with something
                real, it provides context that a slide deck might not.
              </p>

              {/* What I learned */}
              <h2 className="pt-10 tracking-tight">What I learned</h2>
              <p>Having a prototype that looked and felt real made a concrete difference. A VP could show it to a prospect with confidence, wireframes wouldn't have done that. Fidelity bought credibility fast.</p>
              <p>The five-month deadline forced a kind of clarity I rarely have on longer projects. Every feature had to earn its place in V1. I ended up cutting things I would normally have kept, and the product was much tighter because of this.</p>
              <p>I built the layouts to be flexible from the start, cards that could handle variable data, components that could be extended without breaking. It created a practical way to ship something that could grow once real users showed up with real feedback.</p>
              <p className="mb-12">The deadline helped. When you have to ship something complete in a tight timeframe, you stop defending nice-to-haves and focus on what the user actually needs.</p>

              <OtherCaseStudies currentHref="/casestudy/InfluencerCampaigns" />
            </div>
          </div>

    </CaseStudyShell>
  )
}

export default function InfluencerContent() {
  return <CaseStudyContent />
}
