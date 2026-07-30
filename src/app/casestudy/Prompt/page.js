import Image from "next/image"
import OtherCaseStudies from "../../components/OtherCaseStudies"
import { PROSE } from '../../components/site/tokens'

export async function generateMetadata() {
    return {
        title: "Natural Language Search & AI | Tom Spencer",
        description: "Designing a natural language search tool for Rakuten Advertising's custom report builder — balancing AI automation with user trust and control.",
    }
}

function Prompt() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className={`rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900 ${PROSE}`}>
                        <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                            <Image sizes="(max-width: 768px) 100vw, 1008px" priority className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/Prompt-hero.png" width={1600} height={927} alt="Natural language search interface for Rakuten Advertising custom reports" />
                        </div>
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-[#5D5D5D] dark:text-[#B0B0B0]">Rakuten Advertising &bull; Jan 2025 - Ongoing</p>
                                <h1 className="text-balance">Intelligent Search for Custom Reports — Natural Language Search & AI</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>Advertisers on Rakuten&apos;s platform create custom reports monthly — sometimes weekly — to track campaign performance across 170+ metrics. Building one manually meant 15–20 minutes of clicking through dropdowns and configuring data points. With 1,000+ active advertisers and dozens of account managers doing this regularly, the time loss was significant. It also landed on support when people couldn&apos;t figure out the interface.</p>
                                <div className="text-[#5D5D5D] dark:text-[#B0B0B0] space-y-1">
                                    <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-medium">Sole UX designer</span></p>
                                    <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-medium">UX/UI, User Research, Prototyping, User testing</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Headline outcomes */}
                        <div className="mb-12 grid grid-cols-1 gap-8 rounded-2xl bg-[#EDE7DD] p-8 sm:grid-cols-3 md:p-10 dark:bg-slate-800/50">
                            {[
                                { stat: '90%', label: 'faster report creation, measured in Fullstory during beta' },
                                { stat: '~$10M', label: 'annual time-saving potential at full adoption' },
                                { stat: '1,000+', label: 'active advertisers with access from open beta' },
                            ].map(({ stat, label }) => (
                                <div key={stat}>
                                    {/* data-keep opts this out of the body size — 24px is the
                                        scale's ceiling, so the stat leads on colour and weight
                                        rather than on a display size. */}
                                    <p data-keep className="mb-1 text-[27px] font-medium tracking-tight text-accent-600 dark:text-accent-300">{stat}</p>
                                    <p className="mb-0 text-sm leading-relaxed text-[#5D5D5D] dark:text-[#B0B0B0]">{label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">

                            <div className="col-span-4 mb-12">
                                <h2 className="pt-10 tracking-tight">Challenge</h2>
                                <p>
                                    Natural language search features sound simple until you design one. The challenge wasn't just "add a text box", it was building trust in automation while preserving user control in an area where data accuracy matters. Users want to make decisions based on these reports, meaning any search generated content needs to be verifiable and editable.
                                    <br />
                                    I needed to solve for:
                                </p>
                                <ul className="mb-8 space-y-2">
                                    <li><b>Trust</b>: How will a user know that the search results accurately match the query, without expecting them to check against up to 170+ metrics?</li>
                                    <li><b>Ambiguity</b>: How do we handle queries that are vague and could mean one of the many data points available?</li>
                                    <li><b>Control vs. speed</b>: Power users want a quick way of performing time consuming tasks, new users want guidance, how can we offer both?</li>
                                    <li><b>Technical constraints</b>: The query parser struggled with specific metric names that can be bespoke to Rakuten Advertising, or even the user's account, this required careful design around these considerations.</li>
                                    <li><b>Fallback</b>: Some users prefer manual control over search based automation. How can we ensure this option is still available to them?</li>
                                </ul>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/Prompt-old2.png" width={1920} height={1142} alt="Original manual report builder showing the complex dropdown-based interface before natural language search" />
                                </div>
                                <h2 className="pt-10 tracking-tight">Approach</h2>
                                <p>I started by analyzing existing reports to understand common patterns: What metrics did users combine? What date ranges mattered? What questions were they trying to answer? This informed the natural language query design. Instead of just free-form text, I included suggested questions to help a user get started and understand the mechanics of the input box. We also included a 'tag' system in a later iteration to help users find and include certain data points that were harder to remember.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/Prompt-userflow.png" width={1754} height={1240} alt="Customer journey map comparing the current multi-step report creation flow with the proposed natural language search flow" />
                                </div>
                                <h3 className="pt-6">Key decisions</h3>
                                <ul className="mb-8 space-y-2">
                                    <li><b>Tags/Tokens</b>: Users were able to include 'quick selected' tags to help direct a prompt better.</li>
                                    <li><b>Manual override</b>: Every search generated report could be edited, saved, scheduled for a future date or rebuilt from scratch</li>
                                    <li><b>Feedback</b>: Gathering feedback via Fullstory we were able to make further decisions in the UI and functionality to help continually improve the feature.</li>
                                    <li><b>Conservative defaults</b>: The system suggested safe, common queries rather than trying to be clever.</li>
                                </ul>
                                <p className="mb-12">I prototyped three interaction models and tested them with multiple users. The ability to select suggestions won over many participants and the addition of tags was identified as an extremely helpful approach to more complex report requirements.</p>
                                <h2 className="pt-10 tracking-tight">Solution</h2>
                                <p>
                                    The final solution combined natural language prompts, structured tags, and suggested queries to give users both speed and control. Every search generated report remained fully editable, could be saved as a template, or rebuilt from scratch, this preserved the manual workflow for users who preferred it.
                                </p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image sizes="(max-width: 768px) 100vw, 1008px" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/Prompt-tags-alt.png" width={2390} height={1206} alt="Tag and token system allowing users to refine and direct natural language search queries" />
                                </div>
                                <div className="max-w-full mb-12">
                                    <h2 className="pt-10 tracking-tight">Outcome</h2>
                                    <p>Closed beta launched in May 2025 with select power users, followed by a full open beta in July 2025 to all users. With this staggered approach it has allowed us to begin gathering adoption data and user feedback before the full release.</p>

                                    <p>Based on the initial few months of usage we have determined that we have reduced the report creation time by up to 90% (measured using Fullstory during the beta phase) This translates to around $10 million in annual time saving potential when fully adopted by all users (both internal account managers and external users).</p>

                                    <h3 className="pt-6">User feedback</h3>

                                    <blockquote>"Super helpful to put in the prompts and get the reporting answers right away instead of having to sometimes pull a few different reports to get the answer." <cite>Account Manager</cite></blockquote>

                                    <blockquote>"When I needed to check week-on-week sales, Prompt made it easier and faster to generate the report, saving time and reducing manual effort." <cite>Account manager</cite></blockquote>

                                    <blockquote>"I was able to visualize best performing placement periods over time. I was able to add a 'lifetime value bounty' on top of RAD data. I was really impressed with that." <cite>Account manager</cite></blockquote>
                                    <h2 className="pt-10 tracking-tight">Learning from beta</h2>
                                    <h3 className="pt-6">What worked</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Suggested prompts became a reliable onboarding tool — new users used them to understand what Prompt could do before writing their own queries</li>
                                        <li>The tag system was adopted quickly by power users, enabling more precise, complex reports than pure natural language alone could produce</li>
                                        <li>Users began exploring reports they would never have built manually — discovery-driven reporting emerged as an unexpected use case</li>
                                        <li>Reduced multi-report workflows: users who previously needed 3–4 report iterations were completing the same analysis in a single query</li>
                                    </ul>
                                    <h3 className="pt-6">What surprised us</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Saving reports was used far less than expected — users found it easier to recreate reports on demand than to manage a saved library</li>
                                        <li>The tag request itself was a surprise — we assumed free-form text would be enough, but data-heavy reporting required a more precise input mechanism</li>
                                        <li>Trust was the real adoption gate, not usability. Users who didn&apos;t trust the output verified everything manually, which negated the time saving entirely. Adoption followed trust, not the other way around</li>
                                    </ul>

                                </div>
                                <h2 className="pt-10 tracking-tight">What I learned</h2>
                                <p>The biggest surprise was how much trust mattered. I expected users to love the freedom of a text box; what they actually needed was confidence that the output matched their intent. The full text-to-report approach had to evolve so users could see exactly what had been selected and step in if anything looked off.</p>
                                <p className="mb-12">We ended up with a hybrid interface. Everyone assumed users would prefer pure natural language, but the tag system became the most-used feature for complex reports. When there's a lot of data on the line, people want precision — not just speed.</p>

                                <OtherCaseStudies currentHref="/casestudy/Prompt" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Prompt
