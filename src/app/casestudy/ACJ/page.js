import Image from "next/image"
import OtherCaseStudies from "../../components/OtherCaseStudies"
import { PROSE, CASE_STUDY_CONTAINER } from '../../components/site/tokens'
import ZoomableImage from '../../components/site/ZoomableImage'

export async function generateMetadata() {
    return {
        title: "Affiliate Conversion Journey | Tom Spencer",
        description: "Designing multi-touch attribution visualisation for Rakuten Advertising — giving publishers and advertisers a clear view of contribution across the full conversion journey.",
    }
}

function ACJ() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className={`container mx-auto ${CASE_STUDY_CONTAINER} px-6`}>
                    <div className={`rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900 ${PROSE}`}>
                    <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                            <Image sizes="(max-width: 768px) 100vw, 1008px" priority className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/ACJ-hero.png" width={1600} height={927} alt="Affiliate Conversion Journey dashboard showing multi-touch attribution across awareness, consideration, and conversion phases" />
                        </div>
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p data-keep className="text-[15px] font-medium text-[#737373] dark:text-[#8A8A8A]">Rakuten Advertising &bull; Oct 2022 – Jun 2023</p>
                                <h1 className="text-balance"><span className="text-[#5D5D5D] dark:text-[#B0B0B0]">Affiliate Conversion Journey</span> — Multi-Touch Attribution for Affiliate</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>Publishers and advertisers on Rakuten's affiliate network needed to understand their contribution to sales beyond last-click attribution. When a customer discovers a product through Publisher A's blog, researches it via Publisher B's review site, then purchases after clicking Publisher C's discount link, who deserves credit?</p>
                                <p>Without this visibility, publishers couldn't prove their value in earlier phases of the funnels, and advertisers couldn't optimize their partnerships. Competitors like CJ Affiliate and Impact offered journey tracking, putting Rakuten at a strategic disadvantage.</p>

                                <div className="text-[#5D5D5D] dark:text-[#B0B0B0] space-y-1">
                                    <p data-keep className="text-[15px] text-[#5D5D5D] dark:text-[#B0B0B0]"><span className="text-[#737373] dark:text-[#8A8A8A]">Role:</span> <span className="font-medium">Sole UX designer</span></p>
                                    <p data-keep className="text-[15px] text-[#5D5D5D] dark:text-[#B0B0B0]"><span className="text-[#737373] dark:text-[#8A8A8A]">Skills:</span> <span className="font-medium">UX/UI, User Research, Prototyping, User testing</span></p>
                                </div>
                            </div>
                        </div>

                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
                            <div className="col-span-4 mb-12">
                                <h2 className="pt-10 tracking-tight">Challenge</h2>
                                <ul className="mb-8 space-y-2">
                                    <li><b>Data complexity</b>: A single customer journey could have up to 15 touchpoints across 30 days. Multiply that by thousands of conversions, and you have overlapping, non-linear paths that are nearly impossible to parse visually.</li>
                                    <li><b>Dual audiences</b>: Publishers needed to see "Where do I contribute?", Advertisers needed "Which publishers work together to drive conversions?". Same data, different questions and mental models.</li>
                                    <li><b>Trust</b>: Users needed confidence to make budget decisions, which meant explaining the complex attribution logic without overwhelming them.</li>
                                </ul>
                                <h2 className="pt-10 tracking-tight">Approach</h2>
                                <p>Through interviews with both internal account managers and external users, I learned that users wanted answers to specific questions with the ability to dig deeper when needed, not open ended data exploration.</p>

                                <p><b>Key insight</b>: Start with answers, allow exploration.</p>
                                <h3 className="pt-6">The version that didn&apos;t work</h3>
                                <p>The first attempt plotted touchpoints along an actual timeline, with the phase carried by the shape and colour of each marker. It reads cleanly here because this is one journey across fourteen days. At realistic volumes it stopped reading, and the design was already compensating in two places: the &lsquo;5&rsquo; is five events collapsed into a single dot because they would not fit, and the zoom control exists so you can escape the crowding. Both hide data to keep the picture legible, which is the opposite of what the screen is for.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <ZoomableImage sizes="100vw" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/acj-timeline.png" width={2518} height={708} alt="An early exploration: one customer journey plotted along a date axis from 19 May to 2 June, with a green Recognition diamond, cyan Research circles including one marked 5 where five events are collapsed together, and an orange Conversion diamond" />
                                </div>
                                <p>The phases were already in the thinking, but only as a legend. The move that worked was to stop plotting time and let the phases become the structure instead — three columns, every journey the same shape, comparable at a glance. Recognition and Research became Awareness and Consideration on the way, landing on the language marketers already use.</p>
                                <h3 className="pt-6">Key design decisions</h3>
                                <ul className="mb-8 space-y-2">
                                    <li><b>Three-phase framework (Awareness → Consideration → Conversion)</b>: Rather than showing raw click sequences, I organised journeys based around purchase phases. This created a mental model: "Am I/a Publisher driving discovery, research, or final purchase?"
                                        This framework solved two critical problems:
                                        It simplified multi-touch attribution into digestible stages
                                        It gave publishers language to prove their value beyond last-click: "I am strong in awareness" becomes a selling point, not a liability
                                        Other frameworks considered (first/middle/last click, paid/organic/direct channels) didn't align as well with the awareness/consideration/conversion model, which aligned best with how marketers already think about funnels.
                                    </li>
                                    <li><b>Two-tab structure Contributions vs. Touchpoints</b>: Contributions tab: High-level summary ("You contributed to 45% of conversions in the awareness phase")
                                        Touchpoints tab: Detailed journey paths for users who wanted to dig deeper
                                    </li>
                                    <li><b>Dual-audience design</b>: Publishers see their own contribution. Advertisers see all publishers in each journey. Same data structure, different views. The core visualisation is adapted to work for both user types, without increasing engineering efforts.</li>
                                </ul>
                                <h2 className="pt-10 tracking-tight">Solution</h2>
                                <div className="space-y-6">
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                        <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/ACJ-activity-summary.png" width={1000} height={774} alt="Users first see an activity summary with total clicks across phases, average clicks to conversion, and their baseline contribution footprint—providing context before diving into detailed journeys." />
                                    </div>
                                    <p>The Activity Summary presents raw data up front, total clicks, across phases, average clicks to conversion and baseline contributions. It allows users to quickly understand perforb before diving into complex journeys.</p>
                                    <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                        <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/ACJ-contributions.png" width={1000} height={774} alt="The Contributions tab breaks down publisher involvement across awareness, consideration, and conversion phases—giving users clear language to discuss their value beyond last-click attribution." />
                                    </div>
                                    <p>The three-phase framework transformed abstract click sequences into a clear narrative. Publishers could now say "I drive 40% of awareness conversions" instead of struggling to explain their role. Advertisers could identify which publishers were performing well at different stages of the journey.</p>
                                    <p>For deeper analyses the Touchpoints tab revealed detailed conversion paths, presenting which sequences benefitted them most.</p>
                                    <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                        <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/ACJ-filter-selected.png" width={1000} height={774} alt="Users could adjust order period and lookback window to see how attribution changed—with smart defaults (30-day lookback, month-to-date) and inline helper text preventing confusion." />
                                    </div>
                                    <p>The default filters prevented cognitive overload while still giving users control. As users updated filter choices the report updates seamlessly.</p>
                                    <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                            <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/ACJ-comparison.png" width={1600} height={927} alt="Side-by-side comparison of publisher and advertiser views of the same attribution data, demonstrating the dual-audience design" />
                        </div>
                                    <p><b>Dual-audience view</b>: Rather than building two separate tools, one core visualization adapted based on user type. Publishers filtered by their own SIDs and saw "you" language. Advertisers filtered by campaign or publisher group and saw top contributors. Same data structure, different views, serving both audiences without doubling engineering effort.</p>
                                </div>
                                <div className="max-w-full mb-12">
                                    <h2 className="pt-10 tracking-tight">Outcome</h2>
                                    <ul className="mb-8 space-y-2">
                                        <li>8-month development from concept to production (October 2022 – June 2023)</li>
                                        <li>Sole designer on a cross-functional team</li>
                                        <li>Launched to all eligible publishers and advertisers</li>
                                    </ul>
                                    <h3 className="pt-6">Impact</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Used in sales pitches as a key differentiator against competitors</li>
                                        <li>Became standard part of the platform's analytics offering</li>
                                    </ul>
                                    <h3 className="pt-6">What this enabled for publishers</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Proved value beyond last-click (e.g., &ldquo;I drive 40% of awareness-phase conversions&rdquo;)</li>
                                        <li>Created new sales narratives when pitching to advertisers</li>
                                        <li>Enabled data-backed conversations about their role in the funnel</li>
                                    </ul>
                                    <h3 className="pt-6">What this enabled for advertisers</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Understood which publisher combinations drive the best results</li>
                                        <li>Optimised partner mix based on full-funnel contribution</li>
                                        <li>More informed budget allocation decisions across awareness, consideration, and conversion</li>
                                    </ul>
                                    <p>Users engaged more with the high-level summaries than the detailed paths. They wanted answers to specific questions, not open-ended data exploration. The more I added context around the numbers, the more confident they were making decisions from them.</p>
                                </div>
                                <h2 className="pt-10 tracking-tight">What I learned</h2>
                                <p>The dual-audience constraint pushed me somewhere I wouldn't have gone otherwise. Rather than building two separate tools, sharing a data structure with different views turned out to be a cleaner solution than I expected. The same data really can tell different stories depending on what question you're starting with.</p>
                                <p>Users engaged more readily with the attribution data once the logic was explained upfront — not simplified away. They didn't need less information, they needed better framing. That's something I've kept in mind since.</p>
                                <OtherCaseStudies currentHref="/casestudy/ACJ" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ACJ
