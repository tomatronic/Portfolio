import Image from "next/image"
import OtherCaseStudies from "../../components/OtherCaseStudies"
import { PROSE } from '../../components/site/tokens'

export async function generateMetadata() {
    return {
      title: "Rakuten Advertising Offer Flow | Tom Spencer",
      description: "Redesigning Rakuten Advertising's affiliate offer management dashboard through discovery, research, and iterative testing.",
      }
  }

function Offer() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className={`rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900 ${PROSE}`}>

                        {/* Hero section */}
                        <div className="relative h-[55vh] overflow-hidden rounded-2xl mb-8 bg-[url('/offerBG.png')] bg-cover">
                            <div className="flex h-full items-center justify-center">
                                <Image className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" src="/offersFull.png" width={1000} height={640} alt="Redesigned Rakuten Advertising offer management dashboard showing the full offer invitation and comparison interface" />
                            </div>
                        </div>

                        {/* Title grid */}
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p className="text-sm font-medium text-[#5D5D5D] dark:text-[#B0B0B0]">Rakuten Advertising &bull; June 2021 &ndash; August 2021</p>
                                <h1>Offer management</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>Rakuten Advertising&apos;s offer management dashboard lets publishers view, compare and accept affiliate offers from advertisers. It hadn&apos;t been touched in years — the UI was cluttered, the terminology was unclear, and users were avoiding it rather than working with it.</p>
                                <div className="text-[#5D5D5D] dark:text-[#B0B0B0] space-y-1">
                                    <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-medium">Sole UX designer</span></p>
                                    <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-medium">UX/UI, Research, Prototyping, User testing</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Main content */}
                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
                            <div className="col-span-4 mb-12">

                                {/* Challenge / Problem */}
                                <h2 className="pt-10 tracking-tight">Challenge / Problem</h2>
                                <p>Managing offers is a cumbersome task, it involves multiple pages and unclear terminology that deters users from exploring options. The dashboard has also been neglected for many years and is in need of a UI overhaul.</p>

                                {/* Approach */}
                                <h3 className="pt-6">Discovery</h3>
                                <p>Before sketching anything, I wanted to understand exactly how the existing flow worked. I mapped it out in Miro using screenshots from the legacy dashboard — this gave me a clear picture of what was there and where the friction points were. But I wasn't going to assume I had the full story without talking to people first.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/legacy1.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1952} height={1200} alt="The legacy dashboard offer invitation screen" />
                                </div>
                                <h3 className="pt-6">Gaining insight</h3>
                                <p>I went ahead and captured some qualitative data. To do this I created a small survey within a google form (click the image to view) to distribute amongst the account management teams to help gather a better understanding of how they interacted with this feature, it was also a chance for me to understand known pain points that the team have been presented with. The reason I chose the account managers was due to the level of exposure they have to both the platform and the end users.</p>
                                <p>Once I had responses collated I created an affinity diagram to group and prioritise what I&apos;d heard. I also followed up with several participants directly — partly to clarify anything ambiguous, partly because talking to people fills in the gaps that survey answers never quite do.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/affinitymap.jpg" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1386} height={721} alt="The affinity map was created to help understand the results from the completed user surveys" />
                                </div>

                                {/* Goals */}
                                <h2 className="pt-10 tracking-tight">Goals</h2>
                                <p>Using survey data I was able to identify three main goals to focus on:</p>
                                <h3 className="pt-6">Comparison</h3>
                                <p>If I am presented with a new offer invitation I want to be able to compare it to my current offer.</p>
                                <h3 className="pt-6">Discovery</h3>
                                <p>There was no consistent answer to how a user would find a new offer invitation. Can I make a consistent point of discovery?</p>
                                <h3 className="pt-6">Partnership status</h3>
                                <p>The current UI does not offer any indication of partnership status. A user wants to know if a partnership already exists.</p>

                                {/* Solution */}
                                <h2 className="pt-10 tracking-tight">Solution</h2>
                                <p>Redesign how publishers manage affiliate offers within the Rakuten Advertising dashboard — making the flow cleaner and easier to use, so publishers actually engage with it rather than avoid it.</p>

                                {/* Planning */}
                                <h2 className="pt-10 tracking-tight">Planning</h2>
                                <p>I started with a flowchart mapping the routes a user might take to accept an offer request, then ran it past people in user-facing teams to check nothing was missing.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/flowchart.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1116} height={766} alt="Simple flowchart of a proposed solution" />
                                </div>

                                {/* Sketching */}
                                <h2 className="pt-10 tracking-tight">Sketching</h2>
                                <p>Once happy with the flow I opened my notepad and began sketching some initial ideas. At this stage I scribble a lot of ideas down both illustrated and in note form, it can look like a mess but I find it helps to get all my initial ideas on paper and then quickly eliminate ideas or come back to them at a later date if needed. As I develop an idea I start to sketch it into something of higher quality to allow me to easily translate it to a digital wireframe when the time comes.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/sketches.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1116} height={766} alt="Initial sketches and ideas - A bit messy but helps me gather thoughts" />
                                </div>

                                {/* Prototypes */}
                                <h2 className="pt-10 tracking-tight">Prototypes</h2>
                                <p>Rather than testing from sketches, I built simple wireframes in Sketch first and ran them with candidates over Zoom. I gave them a set of tasks to complete and watched where they got stuck. That first round told me users wanted a dedicated landing page for offer invitations alongside the notification system — something I hadn&apos;t fully anticipated.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/digitalwireframe.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1116} height={766} alt="Simple flowchart of a proposed solution" />
                                </div>
                                <p>I gradually increased the fidelity across rounds, eventually mapping the mockups into an interactive prototype in Sketch. The more linear flow gave candidates something closer to the real experience and produced much more useful feedback than static screens alone.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/prototypeMap.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1403} height={931} alt="An example of the complex web of interactions created to allow for testing of the prototype" />
                                </div>

                                {/* User testing */}
                                <h2 className="pt-10 tracking-tight">User testing</h2>
                                <p>Testing surfaced a few things that needed fixing — mainly how functionality was communicated and making offers easier to compare side by side. I iterated on both before sign-off.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/usertestingOffers.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={1849} height={900} alt="An example of the complex web of interactions created to allow for testing of the prototype with external users" />
                                </div>

                                {/* Outcome */}
                                <h2 className="pt-10 tracking-tight">Outcome</h2>
                                <p>Since the updated flow launched, support tickets around offer management have dropped, and account managers have reported fewer queries from publishers on this area. That freed them up to focus on users' actual needs rather than walking people through a confusing interface.</p>
                                <p>I still monitor usage through FullStory and make iterative updates as patterns emerge.</p>
                                <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8">
                                    <Image src="/after.png" className="rounded-2xl ring-1 ring-black/10 dark:ring-white/10" width={2435} height={1544} alt="The final offer invitation screen" />
                                </div>

                                <OtherCaseStudies currentHref="/casestudy/Rakuten" />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Offer
