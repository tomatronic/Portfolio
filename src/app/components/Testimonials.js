export default function Testimonials() {
  const testimonials = [
    {
      quote: "Tom hugely contributed to our project's on-time release — always available for questions, demos, and meetings when needed. His early involvement in design reviews meant issues were caught before QA, saving significant time. He also helped triage bug tickets, offering clear UX perspective on severity and priority right up to release day. I hear great feedback about Tom from development and QA teams — he's been a delight to work with.",
      attribution: 'Project Manager',
    },
    {
      quote: "I just wanted to acknowledge the work you've done taking the initiative to redesign a core feature for scalability, and coordinating across teams to leverage that into new capabilities. Keep up the great work!",
      attribution: 'Senior Product Manager',
    },
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto max-w-6xl px-4">

        <div className="mb-16">
          <h2 className="text-3xl font-normal tracking-tight text-slate-950 dark:text-white md:text-4xl">
            What colleagues say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map(({ quote, attribution }, i) => (
            <figure key={i} className="rounded-4xl border border-[#C8BEB0] dark:border-[#2A3A4A] p-8 md:p-10">
              <blockquote className="not-italic border-none pl-0 my-0 mb-6 text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm font-medium text-slate-500 dark:text-slate-400">
                — {attribution}
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
