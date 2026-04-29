import Image from "next/image"
import Zoom from "react-medium-image-zoom"
import 'react-medium-image-zoom/dist/styles.css'
import OtherCaseStudies from "../../components/OtherCaseStudies"

export async function generateMetadata() {
    return {
      title: "Brewtiful | Tom Spencer",
      description: "Brewtiful — a personal UX project designing a magazine-style website celebrating craft beer packaging and the designers behind it.",
    }
}

function BeerBlog() {
    return (
        <>
            <div className="relative min-h-screen">
                <div className="container mx-auto max-w-6xl px-6">
                    <div className="rounded-4xl bg-zinc-50 p-8 md:p-12 dark:bg-slate-900">

                        {/* Hero */}
                        <div className="flex flex-row flex-wrap place-content-center content-center bg-[#EDE7DD] dark:bg-slate-800/50 rounded-2xl mb-8 overflow-hidden">
                            <Zoom>
                                <Image src="/brewtifulBg.png" width={1600} height={927} alt="Brewtiful hi-fidelity mock showing the craft beer review website homepage design" />
                            </Zoom>
                        </div>

                        {/* Header grid */}
                        <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Personal Project &bull; Oct 2022 – Jan 2023</p>
                                <h1>Brewtiful</h1>
                            </div>
                            <div className="md:col-span-2">
                                <p>I decided I wanted to find a new project for myself — something that would challenge me as a designer but also solve a real problem.</p>
                                <p>After a lot of thinking I landed on &apos;Brewtiful&apos;. Craft beers often have genuinely great packaging design, but almost no one was writing about that side of it. Most sites focused entirely on the beer itself.</p>
                                <div className="text-slate-600 dark:text-slate-400 space-y-1">
                                    <p className="text-sm"><span className="font-normal">Role:</span> <span className="font-semibold">Sole UX designer</span></p>
                                    <p className="text-sm"><span className="font-normal">Skills:</span> <span className="font-semibold">UX/UI, User Research, Prototyping, User testing</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
                            <div className="col-span-4 mb-12">

                                <h2 className="pt-10 text-xl tracking-tight">Project goal</h2>
                                <p className="mb-8">Create a magazine/blog style website that focuses on craft beers and the packaging they come in. Each beer gets reviewed in a way that&apos;s entertaining but also teaches you something.</p>
                                <Zoom>
                                    <Image src="/sampleBeer.png" className="rounded-2xl" width={500} height={542} alt="I had previously begun exploring ways of documenting beers I had sampled" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">A new brand is born</h2>
                                <p>Now I had the idea, I needed a name. I wanted something that felt like a brand, not just a project title — and I needed an end goal to work towards.</p>
                                <p className="mb-8">After a lot of searching (domain availability checks, social handle hunting) I landed on &apos;Brewtiful&apos;. It plays on words, it&apos;s easy to remember, and it covers both sides of the concept.</p>
                                <Zoom>
                                    <Image src="/initialDoodle.png" className="rounded-2xl" width={1000} height={774} alt="Some very messy initial thoughts on what I wanted to include and the direction I could take a name" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Understanding the landscape</h2>
                                <p>My first task was to look at what was already out there and figure out where Brewtiful might sit.</p>
                                <p className="mb-8">I pulled together a handful of sites, identified where they overlapped and where they had something different going on, then mapped my idea against those findings.</p>
                                <div className="mb-8">
                                    <Zoom>
                                        <Image src="/brewComp.png" className="rounded-2xl" width={2390} height={1206} alt="Competitor research - Investigating the craft beer and design review landscape" />
                                    </Zoom>
                                </div>

                                <div className="max-w-full rounded-2xl bg-accent-50 dark:bg-accent-950/20 p-8 mb-8">
                                    <h2 className="text-xl tracking-tight">Who is this for?</h2>
                                    <p className="mb-8">My next task was to figure out who this was actually for. Being a personal project, my access to research was limited, so I created a couple of personas based on what I could find. I focused on the two sides of the idea — the beer lover and the design lover — with the goal of making something both could enjoy.</p>
                                    <Zoom>
                                        <Image src="/beerLover.png" width={1684} height={1190} alt="User Persona A - The user persona of a beer lover" />
                                    </Zoom>
                                    <Zoom>
                                        <Image src="/designLover.png" width={1684} height={1190} alt="User Persona B - The user persona of a design lover" />
                                    </Zoom>
                                </div>

                                <h2 className="pt-10 text-xl tracking-tight">Considering content</h2>
                                <p>Next up was figuring out what the site would actually need.</p>
                                <p>I sketched out a rough IA to identify what pages I&apos;d need to design. The site would be fairly simple, built so content could be added without it becoming a chore. I landed on 5&ndash;6 main pages and templates:</p>
                                <p>
                                    &bull; <b>Homepage</b> — something that promotes new content and encourages interaction.<br />
                                    &bull; <b>Search / directory</b> — usable for both beers and breweries.<br />
                                    &bull; <b>Beer bio</b> — the most information-dense page.<br />
                                    &bull; <b>Brewery bio</b> — kept simple: basic details and reviewed beers.<br />
                                    &bull; <b>Blog</b> — fairly minimal. The beer is the main attraction.<br />
                                    &bull; <b>Resource pages</b> — about, contact, etc.
                                </p>
                                <p className="mb-8">At this point I had a solid enough structure to start thinking about design.</p>
                                <Zoom>
                                    <Image src="/brewtifulIA.png" className="rounded-2xl" width={1392} height={622} alt="Initial IA for the new site — kept deliberately flat" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Initial sketches</h2>
                                <p>I got the pen out and started sketching. At this stage it&apos;s all rough — quick scribbles to explore ideas and work out what information actually needs to be on each page. It&apos;s scrappy but fast, and I can discard and revisit ideas without losing much time.</p>
                                <Zoom>
                                    <Image src="/initialSketchBrewtiful.png" className="rounded-2xl" width={1000} height={1000} alt="A sample of initial sketches and ideas for Brewtiful" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Brand identity</h2>

                                <h2 className="pt-10 text-xl tracking-tight">Low fidelity mocks</h2>
                                <p>At this point I took my favourite sketch and turned it into a slightly more polished digital version.</p>
                                <p className="mb-8">Not a huge leap, but it helped me get a clearer sense of how the final page might look. A few tweaks in and I was getting pretty happy with the direction.</p>
                                <Zoom>
                                    <Image src="/lofiBeer.png" className="rounded-2xl" width={2000} height={1500} alt="Developing sketches into simple digital assets" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Prototyping</h2>
                                <p>I took a slightly different route than usual — I built some prototypes first, then figured out how to get feedback on them.</p>
                                <p className="mb-8">I didn&apos;t want to rely on friends and colleagues (too much risk of polite non-answers), so I posted on Reddit. Not a conventional approach, and I&apos;ll be honest — it&apos;s not that much more rigorous. You don&apos;t know who&apos;s responding or what their background is.</p>

                                <h2 className="pt-10 text-xl tracking-tight">Feedback</h2>
                                <p>Reddit isn&apos;t built for design research. It doesn&apos;t give you focused insights — it depends on whoever happens to see the post and has something to say.</p>
                                <p className="mb-8">That said, the response was positive, which was reassuring. I also got a few useful ideas for iterations out of it.</p>
                                <Zoom>
                                    <Image src="/crit.png" className="rounded-2xl" width={1212} height={784} alt="Examples of replies and feedback from reddit" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Final mocks</h2>
                                <p className="mb-8">Armed with the reddit feedback I made a few tweaks before settling on a final design.</p>
                                <Zoom>
                                    <Image src="/brewtiful.png" className="rounded-2xl" width={1211} height={1567} alt="Brewtiful — current hi-fidelity mocks" />
                                </Zoom>

                                <h2 className="pt-10 text-xl tracking-tight">Project reflection</h2>
                                <p className="mb-8">It&apos;s a personal project, so I&apos;m happy with where it landed. I&apos;d like to come back to it — maybe even build it into a real site one day.</p>
                                <p>This one needed more self-discipline than most projects I&apos;ve worked on. Finding time around work and life takes actual planning. If I do something similar again, I&apos;ll set aside dedicated time each week from the start rather than fitting it in wherever I can.</p>

                                <OtherCaseStudies currentHref="/casestudy/Brewtiful" />

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default BeerBlog
