import Image from "next/image"
import { Download, Linkedin } from "lucide-react"

export async function generateMetadata() {
    return {
        title: "About | Tom Spencer",
        description: "About Tom Spencer — Senior Product Designer specialising in data-heavy enterprise tools, based in Brighton, UK.",
    }
}

export default function About() {
    return (
        <div className="mt-4 mb-16">
            <div className="container mx-auto max-w-6xl px-6 flex flex-col gap-4">

                {/* Bio card */}
                <div className="rounded-4xl bg-zinc-50 dark:bg-slate-900 p-8 md:p-12 lg:p-16">
                    <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-16">

                        {/* Left: heading + body copy */}
                        <div>
                            <h1 className="mb-8 text-balance text-3xl font-normal leading-snug tracking-tight text-slate-950 dark:text-white md:text-4xl">
                                I design complex software so it feels easy to use – especially where people rely on data to make fast, high-impact decisions.
                            </h1>
                            <div className="space-y-4 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                                <p>
                                    For the past 13 years at Rakuten Advertising, I&apos;ve worked on large-scale internal platforms used by thousands of advertisers, publishers, and account teams. Since these systems are built around large datasets, detailed reporting, and multi-step workflows, they can easily become slow, confusing, or overly technical – adding friction where users need to make vital decisions.
                                </p>
                                <p className="font-medium text-slate-950 dark:text-white">
                                    It&apos;s my role to remove this friction.
                                </p>
                                <p>
                                    I take tools that require expertise and redesign them so users can understand what they&apos;re seeing, find the information they need quickly, and act with confidence – without any second-guessing.
                                </p>
                                <p>In practical terms, this includes:</p>
                                <ul className="space-y-2">
                                    {[
                                        'Simplifying dashboards and reporting tools',
                                        'Designing search experiences that don\'t require technical knowledge',
                                        'Making complex concepts (like marketing attribution) clear and usable',
                                        'Reducing reliance on support teams by improving usability',
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p>
                                    If you&apos;re building products, services, or workflows for people who know exactly what they want (and won&apos;t tolerate anything that slows them down), that&apos;s the kind of project where I thrive – and what I want to work on next.
                                </p>
                                <div className="flex items-center gap-3 pt-4">
                                    <a
                                        href="/resume.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950/[0.07] px-4 py-1.5 text-sm font-normal text-slate-600 transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96] dark:bg-white/10 dark:text-slate-400 dark:hover:bg-accent-600 dark:hover:text-white"
                                    >
                                        <Download size={14} strokeWidth={2} />
                                        Download resume
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/thomas-spencer/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-slate-950/[0.07] px-4 py-1.5 text-sm font-normal text-slate-600 transition-[background-color,color,transform] hover:bg-accent-600 hover:text-white active:scale-[0.96] dark:bg-white/10 dark:text-slate-400 dark:hover:bg-accent-600 dark:hover:text-white"
                                    >
                                        <Linkedin size={14} strokeWidth={2} />
                                        LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: photo */}
                        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-0.5 ring-[rgba(184,64,16,0.22)] dark:ring-[rgba(238,159,104,0.30)]">
                            <Image
                                src="/bio.png"
                                alt="Tom Spencer"
                                fill
                                sizes="(max-width: 768px) 100vw, 430px"
                                className="object-cover object-top"
                                priority
                            />
                        </div>

                    </div>
                </div>


                {/* What I do outside of work card */}
                <div className="rounded-4xl bg-zinc-50 dark:bg-slate-900 p-8 md:p-12 lg:p-16">

                    <h2 className="mb-8 text-2xl font-normal tracking-tight text-slate-950 dark:text-white">
                        What I do outside of work
                    </h2>

                    <div className="mb-10 space-y-8 md:w-2/3">
                        <div>
                            <h3 className="mb-3 text-lg font-normal tracking-tight text-slate-950 dark:text-white">
                                Travelling
                            </h3>
                            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                                I love arriving somewhere new and diving straight in. I get genuinely excited by unfamiliar food, different ways of living, and finding the spots that locals actually go to, trying my hardest to avoid the well trodden tourist trails where I can.
                            </p>
                        </div>
                        <div>
                            <h3 className="mb-3 text-lg font-normal tracking-tight text-slate-950 dark:text-white">
                                Hiking &amp; running
                            </h3>
                            <p className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                                Being outdoors gives me real headspace. It&apos;s where I slow down, reflect, and come back feeling balanced. Good for the mind as much as anything else. I enjoy taking note of the small things, whether it&apos;s sitting watching a squirrel or admiring how a tree has grown in an odd way.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl">
                        <Image
                            src="/aboutBanner.png"
                            alt="Outside of work"
                            width={1200}
                            height={600}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                </div>

            </div>
        </div>
    )
}
