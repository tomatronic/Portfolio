import Image from "next/image"
import 'react-medium-image-zoom/dist/styles.css'
import OtherCaseStudies from "../../components/OtherCaseStudies"

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
                    <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">
                        <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                            <Image src="/Prompt-hero.png" width={1600} height={927} alt="Natural language search interface for Rakuten Advertising custom reports" />
                        </div>
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Rakuten Advertising &bull; Jan 2025 - Ongoing</p>
                                <h1>Intelligent Search for Custom Reports — Natural Language Search & AI</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>Advertisers on Rakuten&apos;s platform create custom reports monthly — sometimes weekly — to track campaign performance across 170+ metrics. Building one manually meant 15–20 minutes of clicking through dropdowns and configuring data points. With 1,000+ active advertisers and dozens of account managers doing this regularly, the time loss was significant. It also landed on support when people couldn&apos;t figure out the interface.</p>
                                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                                    <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-semibold">Sole UX designer</span></p>
                                    <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-semibold">UX/UI, User Research, Prototyping, User testing</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">

                            <div className="col-span-4 mb-12">
                                <h2 className="pt-10 text-xl tracking-tight">Challenge</h2>
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
                                    <Image src="/Prompt-old2.png" width={1920} height={1142} alt="Original manual report builder showing the complex dropdown-based interface before natural language search" />
                                </div>
                                <h2 className="pt-10 text-xl tracking-tight">Approach</h2>
                                <p>I started by analyzing existing reports to understand common patterns: What metrics did users combine? What date ranges mattered? What questions were they trying to answer? This informed the natural language query design. Instead of just free-form text, I included suggested questions to help a user get started and understand the mechanics of the input box. We also included a 'tag' system in a later iteration to help users find and include certain data points that were harder to remember.</p>
                                <h3 className="pt-10">Key decisions</h3>
                                <ul className="mb-8 space-y-2">
                                    <li><b>Tags/Tokens</b>: Users were able to include 'quick selected' tags to help direct a prompt better.</li>
                                    <li><b>Manual override</b>: Every search generated report could be edited, saved, scheduled for a future date or rebuilt from scratch</li>
                                    <li><b>Feedback</b>: Gathering feedback via Fullstory we were able to make further decisions in the UI and functionality to help continually improve the feature.</li>
                                    <li><b>Conservative defaults</b>: The system suggested safe, common queries rather than trying to be clever.</li>
                                </ul>
                                <p className="mb-12">I prototyped three interaction models and tested them with multiple users. The ability to select suggestions won over many participants and the addition of tags was identified as an extremely helpful approach to more complex report requirements.</p>
                                <h2 className="pt-10 text-xl tracking-tight">Solution</h2>
                                <p>
                                    The final solution combined natural language prompts, structured tags, and suggested queries to give users both speed and control. Every search generated report remained fully editable, could be saved as a template, or rebuilt from scratch, this preserved the manual workflow for users who preferred it.
                                </p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/Prompt-tags-alt.png" width={2390} height={1206} alt="Tag and token system allowing users to refine and direct natural language search queries" />
                                </div>
                                <div className="max-w-full mb-12">
                                    <h2 className="pt-10 text-xl tracking-tight">Outcome</h2>
                                    <p>Closed beta launched in May 2025 with select power users, followed by a full open beta in July 2025 to all users. With this staggered approach it has allowed us to begin gathering adoption data and user feedback before the full release.</p>

                                    <p>Based on the initial few months of usage we have determined that we have reduced the report creation time by up to 90% (measured using Fullstory during the beta phase) This translates to around $10 million in annual time saving potential when fully adopted by all users (both internal account managers and external users).</p>

                                    <h3 className="pt-10">User feedback</h3>

                                    <blockquote>"Super helpful to put in the prompts and get the reporting answers right away instead of having to sometimes pull a few different reports to get the answer." <cite>Account Manager</cite></blockquote>

                                    <blockquote>"When I needed to check week-on-week sales, Prompt made it easier and faster to generate the report, saving time and reducing manual effort." <cite>Account manager</cite></blockquote>

                                    <blockquote>"I was able to visualize best performing placement periods over time. I was able to add a 'lifetime value bounty' on top of RAD data. I was really impressed with that." <cite>Account manager</cite></blockquote>
                                    <h3 className="pt-10">Behavioural changes observed</h3>
                                    <ul className="mb-8 space-y-2">
                                        <li>Discovery driven reporting: "I figured out new and noteworthy products performing well in the program which I could share with publishers", this shows users are willing to ask questions they may not have bothered searching for manually.</li>
                                        <li>Reduced multireport workflows: Users may previously have needed to create or edit reports 3 or 4 times, AI is allowing them to get them in a single go.</li>
                                        <li>Power user adoption: The introduction of tags has helped create more advanced reports within the Prompt product.</li>
                                    </ul>
                                    <h2 className="pt-10 text-xl tracking-tight">Learning from beta</h2>
                                    <p>
                                        Reviews and feedback have been positive and allowed us to continue to deliver updates and additional features. Some items of Prompt have not been as successful as we hoped, for example saving reports has not been used as much as expected, largely due to users finding it easy to recreate reports as needed. The suggested prompts have become a useful tool for new users, offering guidance into creating a first time prompt, we hope to expand this in the future to allow for personalised suggestions.</p>
                                    <p>What surprised me?: The request for tags/tokens was not expected, it became apparent that for more accuracy in data heavy UI we needed additional ways to control the search results.
                                    </p>
                                    <p>
                                        Seeing users explore the search possibilities was interesting and allowed us to observe users trying to create more complex reports through search that they may not have been confident in building manually.
                                    </p>

                                </div>
                                <h2 className="pt-10 text-xl tracking-tight">What I learned</h2>
                                <p>The biggest surprise was how much trust mattered. I expected users to love the freedom of a text box; what they actually needed was confidence that the output matched their intent. The full text-to-report approach had to evolve so users could see exactly what had been selected and step in if anything looked off.</p>
                                <p>We ended up with a hybrid interface. Everyone assumed users would prefer pure natural language, but the tag system became the most-used feature for complex reports. When there's a lot of data on the line, people want precision — not just speed.</p>
                                <p className="mb-12">Users could generate reports in 90 seconds, but they'd still verify manually if they didn't trust the output — which defeated the point entirely. The continuous previews and manual override options were what finally shifted that. Adoption followed trust, not the other way around.</p>

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
