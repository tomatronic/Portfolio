'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../../components/ThemeProvider'
import ConceptNav from '../ConceptNav'
import ConceptFooter from '../ConceptFooter'
import ConceptProse from '../ConceptProse'
import { TEXT, INK, MUTED, FAINT, ICON_NAV, CARD_RADIUS, CONTAINER } from '../tokens'

/**
 * Concept-route case study — the live /casestudy/Prompt content on this route's
 * type system. Replaces the abandoned July concept (weight-900 caps on indigo),
 * which belonged to a direction that's no longer being pursued.
 *
 * Body copy is wrapped in ConceptProse rather than tagged element by element,
 * so ACJ and InfluencerCampaigns can be brought over the same way.
 *
 * The live case studies are untouched.
 */

const REVEAL_BG = '#050505'

const STATS = [
  { stat: '90%', label: 'faster report creation, measured in Fullstory during beta' },
  { stat: '~$10M', label: 'annual time-saving potential at full adoption' },
  { stat: '1,000+', label: 'active advertisers with access from open beta' },
]

const META = [
  { label: 'Role', value: 'Sole UX designer' },
  { label: 'Skills', value: 'UX/UI, User Research, Prototyping, User testing' },
]

function Figure({ src, alt, width, height }) {
  return (
    <div
      className={`${CARD_RADIUS} mb-8 overflow-hidden bg-[#292929]/[0.04] p-4 ring-1 ring-[#292929]/10 dark:bg-white/[0.04] dark:ring-white/10`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full rounded-[8px] ring-1 ring-[#292929]/10 dark:ring-white/10"
      />
    </div>
  )
}

export default function CaseStudyConcept() {
  const { theme } = useTheme()
  const sheetBg = theme === 'dark' ? '#0F1623' : '#ffffff'

  return (
    <div style={{ background: REVEAL_BG }}>
      <div className="fixed bottom-4 right-4 z-50 rounded-full bg-slate-950 px-3 py-1.5 text-xs font-medium text-white/80">
        Concept — case study. Not linked anywhere.
      </div>

      <div style={{ background: sheetBg }} className="px-6">
        <div className={`${CONTAINER} mx-auto`}>
          <ConceptNav active="Work" />
        </div>

        <div className={`${CONTAINER} mx-auto pb-28 pt-4`}>
          <Link
            href="/concept-9f2k#work"
            className={`${TEXT.sm} ${MUTED} group mb-8 inline-flex items-center gap-1.5 font-medium transition-colors hover:text-accent-600 dark:hover:text-accent-300`}
          >
            <ArrowLeft
              size={ICON_NAV}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:-translate-x-0.5 motion-reduce:transition-none"
            />
            All case studies
          </Link>

          {/* ── Header ───────────────────────────────────────────── */}
          <p className={`${TEXT.sm} ${FAINT} mb-3 font-medium`}>
            Rakuten Advertising &bull; Jan 2025 – Ongoing
          </p>
          <h1
            className={`${TEXT.title} ${INK} mb-10 max-w-[46ch] text-balance font-medium leading-[1.35] tracking-tight`}
          >
            Intelligent Search for Custom Reports — Natural Language Search &amp; AI
          </h1>

          <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px] md:gap-14">
            <ConceptProse>
              <p className="mb-0">
                Advertisers on Rakuten&apos;s platform create custom reports monthly —
                sometimes weekly — to track campaign performance across 170+ metrics.
                Building one manually meant 15–20 minutes of clicking through
                dropdowns and configuring data points. With 1,000+ active advertisers
                and dozens of account managers doing this regularly, the time loss was
                significant. It also landed on support when people couldn&apos;t figure
                out the interface.
              </p>
            </ConceptProse>

            <dl className="space-y-3">
              {META.map(({ label, value }) => (
                <div key={label}>
                  <dt className={`${TEXT.xs} ${FAINT} mb-0.5 font-medium`}>{label}</dt>
                  <dd className={`${TEXT.sm} ${INK} font-medium`}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <Figure
            src="/Prompt-hero.png"
            alt="Natural language search interface for Rakuten Advertising custom reports"
            width={1600}
            height={927}
          />

          {/* ── Headline outcomes ────────────────────────────────── */}
          <div
            className={`${CARD_RADIUS} mb-16 grid grid-cols-1 gap-8 border border-[#292929]/10 p-6 sm:grid-cols-3 md:p-8 dark:border-white/10`}
          >
            {STATS.map(({ stat, label }) => (
              <div key={stat}>
                {/* 24px — the stat is emphasis by weight and colour, not by
                    breaking the scale with a display size. */}
                <p className={`${TEXT.title} mb-1 font-medium tracking-tight text-accent-600 dark:text-accent-300`}>
                  {stat}
                </p>
                <p className={`${TEXT.sm} ${MUTED} mb-0 leading-relaxed`}>{label}</p>
              </div>
            ))}
          </div>

          {/* ── Body ─────────────────────────────────────────────── */}
          <ConceptProse className="max-w-[68ch] [&>h2]:mb-4 [&>h2]:pt-14 [&>h3]:mb-3 [&>h3]:pt-8 [&>p]:mb-4 [&>ul]:mb-8 [&>ul]:space-y-2">
            <h2>Challenge</h2>
            <p>
              Natural language search features sound simple until you design one. The
              challenge wasn&apos;t just &ldquo;add a text box&rdquo;, it was building
              trust in automation while preserving user control in an area where data
              accuracy matters. Users want to make decisions based on these reports,
              meaning any search generated content needs to be verifiable and editable.
            </p>
            <p>I needed to solve for:</p>
            <ul>
              <li>
                <b>Trust</b>: How will a user know that the search results accurately
                match the query, without expecting them to check against up to 170+
                metrics?
              </li>
              <li>
                <b>Ambiguity</b>: How do we handle queries that are vague and could mean
                one of the many data points available?
              </li>
              <li>
                <b>Control vs. speed</b>: Power users want a quick way of performing time
                consuming tasks, new users want guidance, how can we offer both?
              </li>
              <li>
                <b>Technical constraints</b>: The query parser struggled with specific
                metric names that can be bespoke to Rakuten Advertising, or even the
                user&apos;s account, this required careful design around these
                considerations.
              </li>
              <li>
                <b>Fallback</b>: Some users prefer manual control over search based
                automation. How can we ensure this option is still available to them?
              </li>
            </ul>

            <Figure
              src="/Prompt-old2.png"
              alt="Original manual report builder showing the complex dropdown-based interface before natural language search"
              width={1920}
              height={1142}
            />

            <h2>Approach</h2>
            <p>
              I started by analyzing existing reports to understand common patterns:
              What metrics did users combine? What date ranges mattered? What questions
              were they trying to answer? This informed the natural language query
              design. Instead of just free-form text, I included suggested questions to
              help a user get started and understand the mechanics of the input box. We
              also included a &lsquo;tag&rsquo; system in a later iteration to help users
              find and include certain data points that were harder to remember.
            </p>

            <Figure
              src="/Prompt-userflow.png"
              alt="Customer journey map comparing the current multi-step report creation flow with the proposed natural language search flow"
              width={1754}
              height={1240}
            />

            <h3>Key decisions</h3>
            <ul>
              <li>
                <b>Tags/Tokens</b>: Users were able to include &lsquo;quick
                selected&rsquo; tags to help direct a prompt better.
              </li>
              <li>
                <b>Manual override</b>: Every search generated report could be edited,
                saved, scheduled for a future date or rebuilt from scratch.
              </li>
              <li>
                <b>Feedback</b>: Gathering feedback via Fullstory we were able to make
                further decisions in the UI and functionality to help continually improve
                the feature.
              </li>
              <li>
                <b>Conservative defaults</b>: The system suggested safe, common queries
                rather than trying to be clever.
              </li>
            </ul>
            <p>
              I prototyped three interaction models and tested them with multiple users.
              The ability to select suggestions won over many participants and the
              addition of tags was identified as an extremely helpful approach to more
              complex report requirements.
            </p>

            <h2>Solution</h2>
            <p>
              The final solution combined natural language prompts, structured tags, and
              suggested queries to give users both speed and control. Every search
              generated report remained fully editable, could be saved as a template, or
              rebuilt from scratch, this preserved the manual workflow for users who
              preferred it.
            </p>

            <Figure
              src="/Prompt-tags-alt.png"
              alt="Tag and token system allowing users to refine and direct natural language search queries"
              width={2390}
              height={1206}
            />

            <h2>Outcome</h2>
            <p>
              Closed beta launched in May 2025 with select power users, followed by a
              full open beta in July 2025 to all users. With this staggered approach it
              has allowed us to begin gathering adoption data and user feedback before
              the full release.
            </p>
            <p>
              Based on the initial few months of usage we have determined that we have
              reduced the report creation time by up to 90% (measured using Fullstory
              during the beta phase). This translates to around $10 million in annual
              time saving potential when fully adopted by all users (both internal
              account managers and external users).
            </p>

            <h3>User feedback</h3>
          </ConceptProse>

          {/* Quotes as cards rather than bordered blockquotes — matches the
              testimonial treatment on the concept About page. */}
          <div className="mb-4 mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            {[
              {
                quote:
                  'Super helpful to put in the prompts and get the reporting answers right away instead of having to sometimes pull a few different reports to get the answer.',
                name: 'Account Manager',
              },
              {
                quote:
                  'When I needed to check week-on-week sales, Prompt made it easier and faster to generate the report, saving time and reducing manual effort.',
                name: 'Account Manager',
              },
              {
                quote:
                  "I was able to visualize best performing placement periods over time. I was able to add a 'lifetime value bounty' on top of RAD data. I was really impressed with that.",
                name: 'Account Manager',
              },
            ].map((t, i) => (
              <figure
                key={i}
                className={`${CARD_RADIUS} mb-0 border border-[#292929]/10 p-5 dark:border-white/10`}
              >
                <blockquote className={`${TEXT.base} ${MUTED} mb-3 border-0 p-0 not-italic leading-relaxed`}>
                  {t.quote}
                </blockquote>
                <figcaption className={`${TEXT.sm} ${FAINT} font-medium`}>{t.name}</figcaption>
              </figure>
            ))}
          </div>

          <ConceptProse className="max-w-[68ch] [&>h2]:mb-4 [&>h2]:pt-14 [&>h3]:mb-3 [&>h3]:pt-8 [&>p]:mb-4 [&>ul]:mb-8 [&>ul]:space-y-2">
            <h2>Learning from beta</h2>
            <h3>What worked</h3>
            <ul>
              <li>
                Suggested prompts became a reliable onboarding tool — new users used them
                to understand what Prompt could do before writing their own queries.
              </li>
              <li>
                The tag system was adopted quickly by power users, enabling more precise,
                complex reports than pure natural language alone could produce.
              </li>
              <li>
                Users began exploring reports they would never have built manually —
                discovery-driven reporting emerged as an unexpected use case.
              </li>
              <li>
                Reduced multi-report workflows: users who previously needed 3–4 report
                iterations were completing the same analysis in a single query.
              </li>
            </ul>

            <h3>What surprised us</h3>
            <ul>
              <li>
                Saving reports was used far less than expected — users found it easier to
                recreate reports on demand than to manage a saved library.
              </li>
              <li>
                The tag request itself was a surprise — we assumed free-form text would be
                enough, but data-heavy reporting required a more precise input mechanism.
              </li>
              <li>
                Trust was the real adoption gate, not usability. Users who didn&apos;t
                trust the output verified everything manually, which negated the time
                saving entirely. Adoption followed trust, not the other way around.
              </li>
            </ul>

            <h2>What I learned</h2>
            <p>
              The biggest surprise was how much trust mattered. I expected users to love
              the freedom of a text box; what they actually needed was confidence that the
              output matched their intent. The full text-to-report approach had to evolve
              so users could see exactly what had been selected and step in if anything
              looked off.
            </p>
            <p>
              We ended up with a hybrid interface. Everyone assumed users would prefer pure
              natural language, but the tag system became the most-used feature for complex
              reports. When there&apos;s a lot of data on the line, people want precision —
              not just speed.
            </p>
          </ConceptProse>
        </div>
      </div>

      <div style={{ background: REVEAL_BG }}>
        <ConceptFooter />
      </div>
    </div>
  )
}
