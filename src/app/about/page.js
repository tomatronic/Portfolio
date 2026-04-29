import Image from "next/image"
import Link from "next/link"
import { Download } from "lucide-react"

export async function generateMetadata() {
    return {
        title: "About | Tom Spencer",
        description: "About Tom Spencer — Senior UX Designer specialising in data-heavy enterprise tools, based in Brighton, UK.",
    }
}

export default function About() {
    return (
        <div className="mt-4">
            <div className="container mx-auto max-w-6xl px-6">
                <div className="rounded-4xl bg-zinc-50 dark:bg-slate-900 p-8 md:p-12 lg:p-16">

                    {/* Header */}
                    <header className="mb-16 md:mb-20">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_2fr] md:gap-16">

                            {/* Left: photo */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-0.5 ring-[rgba(184,64,16,0.22)] dark:ring-[rgba(238,159,104,0.30)] md:aspect-auto md:min-h-[480px]">
                                <Image
                                    src="/bio.png"
                                    alt="Tom Spencer"
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>

                            {/* Right: copy */}
                            <div className="flex flex-col justify-center">
                                <h1 className="mb-8 text-2xl font-normal leading-snug tracking-tight text-slate-950 dark:text-white md:text-3xl">
                                    I design complex software so it feels easy to use – especially where people rely on data to make fast, high-impact decisions.
                                </h1>

                                <div className="space-y-4 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                                    <p>
                                        For the past 8 years at Rakuten Advertising, I&apos;ve worked on large-scale internal platforms used by thousands of advertisers, publishers, and account teams. Since these systems are built around large datasets, detailed reporting, and multi-step workflows, they can easily become slow, confusing, or overly technical – adding friction where users need to make vital decisions.
                                    </p>
                                    <blockquote className="not-italic">
                                        It&apos;s my role to remove this friction.
                                    </blockquote>
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
                                </div>
                            </div>

                        </div>
                    </header>

                    {/* Where I add value */}
                    <section className="mb-16 md:mb-20">
                        <h2 className="mb-8 text-2xl font-normal tracking-tight text-slate-950 dark:text-white">
                            Where I add value
                        </h2>
                        <div className="text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                            <ul className="mb-8 space-y-3">
                                {[
                                    '8+ years designing enterprise UX for data-heavy products, with experience across product design and user behaviour',
                                    'Strong focus on usability, clarity, and fast, confident decision-making',
                                    'Experience designing tools used at scale (thousands of users)',
                                    'Comfortable working in complex, technical domains',
                                    'Collaborative across product, engineering, and commercial teams to ship usable solutions',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-600 dark:bg-accent-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-slate-950/[0.07] px-4 py-1.5 text-base font-medium text-slate-950 transition-colors hover:bg-accent-600 hover:text-white dark:bg-white/10 dark:text-slate-200 dark:hover:bg-accent-600 dark:hover:text-white"
                            >
                                <Download size={14} strokeWidth={2} />
                                Download resume
                            </a>
                        </div>
                    </section>

                    {/* Banner image */}
                    <div className="mb-16 overflow-hidden rounded-2xl md:mb-20">
                        <Image
                            src="/aboutBanner.png"
                            alt="Outside of work"
                            width={1200}
                            height={600}
                            className="h-auto w-full object-cover"
                        />
                    </div>

                    {/* CTA */}
                    <div className="border-t border-[#C8BEB0] dark:border-[#2A3A4A] pt-12 pb-4">
                        <p className="text-base text-slate-600 dark:text-slate-400">
                            Want to see how this plays out in practice?{' '}
                            <Link
                                href="/#work"
                                className="font-medium text-accent-600 dark:text-accent-400 underline underline-offset-2 decoration-accent-300 hover:decoration-accent-500 transition-colors"
                            >
                                See my work →
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
