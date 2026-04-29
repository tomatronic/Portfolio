import Image from "next/image"
import Zoom from "react-medium-image-zoom"
import 'react-medium-image-zoom/dist/styles.css'
import OtherCaseStudies from "../../components/OtherCaseStudies"

export async function generateMetadata() {
    return {
      title: "Designflows | Tom Spencer",
      description: "Designflows — a weekend design competition to create a DIY toolkit rental mobile app, from brief to high-fidelity mocks in 60 hours.",
    }
}

function CaseStudy() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">

                        {/* Hero */}
                        <div className="relative h-[55vh] overflow-hidden rounded-2xl mb-8 bg-[url('/dfbg.png')] bg-cover">
                            <div className="flex h-full items-center justify-center">
                                <Image src="/tools.png" width={800} height={520} alt="Designflows app hero showing the DIY toolkit rental interface" className="object-contain" />
                            </div>
                        </div>

                        {/* Header grid */}
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Homely &bull; Oct 2021</p>
                                <h1>Designflows</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>This was a competition brief that had to be completed in a weekend.</p>
                                <p>I got access to the brief at 7pm on Friday and had to submit high-fidelity mocks by Monday at 9am.</p>
                                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                                    <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-semibold">Sole UX designer</span></p>
                                    <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-semibold">UX/UI, User Research, App icon design</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
                            <div className="col-span-4 mb-12">

                                <div className="mb-8 flex justify-center">
                                    <Zoom>
                                        <Image src="/designflows.png" width={197} height={107} alt="Designflows 2021 logo" />
                                    </Zoom>
                                </div>

                                <h2 className="pt-10 text-xl tracking-tight">Overview</h2>
                                <p>The brief requested a new mobile app to be designed to allow a user to hire a toolkit from a location nearby for a specific DIY task.</p>
                                <p>For example: I need to put some shelves up, so I open the app and find a nearby location to pick up the right tools.</p>
                                <p>The brief specified 3 screens that required designing:</p>
                                <p>
                                    &bull; <b>Toolkit rental</b> — including a search bar<br />
                                    &bull; <b>My rentals</b> — manage and track bookings<br />
                                    &bull; <b>How it works</b> — instructions on how to collect a toolkit
                                </p>
                                <p className="mb-8">As well as an app icon and a presentation poster.</p>

                                <h2 className="pt-10 text-xl tracking-tight">Plan of action</h2>
                                <p>There was a lot to do and not much time to do it. I spent Friday evening reading the brief multiple times, printed it off and highlighted the key points.</p>
                                <p className="mb-8">Once I had a clear picture of what was needed, I made a to-do list. Having it written down helped me work through the weekend methodically and make sure nothing got missed.</p>
                                <Zoom>
                                    <Image src="/poa.png" width={944} height={944} alt="To-do list made to stay on track across the weekend" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Competitor research</h2>
                                <p>With no time for traditional user research, I focused on competitor analysis. It&apos;s not my usual approach, but given the deadline it made the most sense.</p>
                                <p className="mb-8">I started with large DIY retailers like IKEA and B&amp;Q, then looked at hire services like Uber, and then collection and delivery apps like Deliveroo. Looking at their apps helped me understand common UI patterns, what worked well, and where there was room to do something better.</p>
                                <Zoom>
                                    <Image src="/compResearch.png" width={2000} height={944} alt="Competitor research — identifying key components across similar applications" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Brand identity</h2>
                                <p>I spent some time establishing a brand identity for the project. Having that in place meant I could build a simple pattern library and move much faster once I got into the actual design.</p>
                                <p className="mb-8">I focused mainly on colour palette and typography — simple, but with a bit of character.</p>
                                <Zoom>
                                    <Image src="/brandID.png" width={2000} height={1040} alt="Brand identity exploration for Designflows — colour palette and typography choices" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Initial ideas</h2>
                                <p>With a basic pattern library in place, I started sketching.</p>
                                <p>I ended up mapping out a full user flow even though I only needed to design a couple of screens. It cost me some time, but it surfaced details I wouldn&apos;t have caught otherwise.</p>
                                <p>I began with very rough sketches — quick enough to try lots of ideas, easy to throw away if they weren&apos;t working.</p>
                                <p className="mb-8">By Saturday evening I had a sketch I was happy to work from. I took a break and picked it back up the next morning.</p>
                                <div className="mb-8">
                                    <Zoom>
                                        <Image src="/sketch.png" width={1421} height={1000} className="rounded-2xl" alt="Initial sketches for the first screen of the app" />
                                    </Zoom>
                                </div>

                                <h2 className="pt-10 text-xl tracking-tight">Mockups</h2>
                                <p className="mb-8">Sunday morning I got an early start and spent most of the day on the hi-fidelity mocks. Even though I wasn&apos;t building the full app, I wanted to design it in a way that could be extended later without things falling apart.</p>
                                <Zoom>
                                    <Image src="/appMocks.png" width={1365} height={879} alt="Preview of the app mocks in progress" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">App icon</h2>
                                <p>The app icon was the last big piece, and honestly the one I found hardest. I hadn&apos;t designed one before, so there was a learning curve just getting the basics right — correct dimensions, what actually makes an icon readable at small sizes.</p>
                                <p className="mb-8">I went through a lot of iterations. Eventually I settled on a simple icon using the app&apos;s colour palette to keep things consistent.</p>
                                <Zoom>
                                    <Image src="/iconexploration.png" width={2000} height={646} alt="Exploration of icon ideas" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Icon decision</h2>
                                <p className="mb-8">After running through many iterations I settled on this. The reasons:<br /><br />
                                    &bull; <b>Unique</b> — some earlier ideas felt too close to existing brands. I wanted something that belonged to this project.<br /><br />
                                    &bull; <b>Negative space</b> — the house shape in the negative space hints at what the app does. It could also read as an upward arrow, suggesting &apos;upgrading&apos; your home.<br /><br />
                                    &bull; <b>Simplicity</b> — minimal colour and iconography. Clean and easy to read at any size.
                                </p>
                                <Zoom>
                                    <Image src="/appStoreMock.png" width={1024} height={1757} alt="Final icon design" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Outcome</h2>
                                <p>Overall, happy with how it came out — though I wish I&apos;d had more time.</p>
                                <p className="mb-8">I would have spent more time on research if I could. A better look at the competitor landscape and some user interviews would have improved the end result. The colour palette and framework could also have been more refined, though that might have been a stretch given the timeline.</p>
                                <div className="overflow-hidden rounded-3xl mb-8">
                                    <Zoom>
                                        <Image src="/dfFinal.png" width={1403} height={931} className="rounded-2xl" alt="Designflows final submission 2021" />
                                    </Zoom>
                                </div>

                                <h2 className="pt-10 text-xl tracking-tight">Final thoughts</h2>
                                <p>The competition was fun. I&apos;ll be keeping an eye out for it again. In the meantime, I&apos;ll take the judges&apos; feedback on board and maybe come back to this one to see if I can push the result further.</p>

                                <OtherCaseStudies currentHref="/casestudy/DesignFlows" />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default CaseStudy
