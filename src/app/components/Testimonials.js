const TESTIMONIALS = [
  {
    quote: "Tom hugely contributed to our project's on-time release — always available for questions, demos, and meetings when needed. His early involvement in design reviews meant issues were caught before QA, saving significant time. He also helped triage bug tickets, offering clear UX perspective on severity and priority right up to release day.",
    name: 'Project Manager',
    featured: true,
  },
  {
    quote: "I just wanted to acknowledge the work you've done taking the initiative to redesign a core feature for scalability, and coordinating across teams to leverage that into new capabilities. Keep up the great work!",
    name: 'Senior Product Manager',
    featured: false,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">

          {/* Left: label + heading + sub-copy */}
          <div className="flex flex-col justify-start md:pt-4">
            <h2 className="mb-4 font-normal tracking-tight text-slate-950 dark:text-white"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}>
              What colleagues say.
            </h2>
            <p className="text-base font-normal leading-relaxed text-slate-500 dark:text-slate-400">
              Collaboration is at the heart of my work. I aim to bridge the gap between design, engineering, and business goals.
            </p>
          </div>

          {/* Right: stacked cards */}
          <div className="flex flex-col gap-6 md:col-span-2">
            {TESTIMONIALS.map(({ quote, name, featured }) => (
              <figure
                key={name}
                className="rounded-3xl bg-[#E4DDD2] px-8 pb-8 pt-5 dark:bg-white/[0.02] md:px-10 md:pb-10 md:pt-6"
              >
                <blockquote
                  className={[
                    'mb-6 border-none p-0 not-italic leading-relaxed',
                    featured
                      ? 'text-base italic text-slate-700 dark:text-slate-300'
                      : 'text-base font-normal text-slate-600 dark:text-slate-400',
                  ].join(' ')}
                  style={featured ? { fontFamily: 'var(--font-fraunces), Georgia, serif' } : undefined}
                >
                  {featured ? `"${quote}"` : `"${quote}"`}
                </blockquote>

                <figcaption className="text-sm font-semibold text-slate-950 dark:text-white">
                  {name}
                </figcaption>
              </figure>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
