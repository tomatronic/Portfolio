import CaseStudyHeader from '../components/site/CaseStudyHeader'
import CaseStudyShell from '../components/site/CaseStudyShell'
import OtherCaseStudies from '../components/OtherCaseStudies'

/**
 * The design system case study, deliberately off the main path.
 *
 * It lives at `/blueprints` rather than `/casestudy/blueprints` for two
 * reasons: Tom asked for that address, and the `/casestudy` segment carries
 * machinery this page does not want — the `@modal` route intercepts those
 * slugs from a home card, and there is no home card here. A top-level route
 * skips all of it and still gets `Nav`/`Footer` from `SiteChrome`, which keys
 * off the layout segment.
 *
 * **Hidden, in the two ways that matter.** It is absent from
 * `lib/caseStudies.js`, so the home cards, the compact cards at the foot of
 * every case study and `sitemap.js` all skip it — that list is the single
 * source for those three. And `robots: { index: false }` below keeps it out of
 * search while leaving the URL shareable, which is the useful shape for a link
 * you hand to someone directly. Remove that block to make it public; add an
 * entry to `lib/caseStudies.js` to make it linked.
 *
 * **This is a draft.** Bracketed text renders as-is — `[on what cadence]` and
 * the rest are blanks Tom still has to fill, left visible so they cannot be
 * missed. Every figure is a comment rather than a `CaseStudyFigure`, since none
 * of the nine images exist yet; a `CaseStudyFigure` with no `src` would throw.
 * Each comment says what the image is and where it goes.
 */

export async function generateMetadata() {
  return {
    title: 'One library, three products | Tom Spencer',
    description:
      "Eight years co-owning Rakuten Advertising's design system — one component library shared by three products, its governance, token layer and AI contribution workflows.",
    // Shareable by link, invisible to search. Drop this to publish it properly.
    robots: { index: false, follow: false },
  }
}

function Blueprints() {
  return (
    <CaseStudyShell>
      {/* IMAGE 1 — hero. Core components (button, input, pill, card, table row)
          composed on a neutral ground. Recreated in Figma.
          Caption: "Core components, recreated for illustration."
          Add as: <CaseStudyFigure hero priority src="/blueprints-hero.png" … /> */}

      <CaseStudyHeader
        eyebrow="Rakuten Advertising • 2018 – 2026"
        title="One library, three products"
        meta={[
          { label: 'Role', value: 'Founding team member and design system co-owner' },
          { label: 'Team', value: '3 designers and 2 engineers' },
          { label: 'Scope', value: 'Three products, one shared library' },
        ]}
      >
        <p>
          Rakuten Advertising&apos;s platform is made up of three products used by advertisers,
          publishers and account managers. One component library served all three, unchanged, for
          eight years.
        </p>
      </CaseStudyHeader>

      <div className="grid auto-rows-auto grid-cols-1 gap-5 md:grid-cols-4 md:gap-10">
        <div className="col-span-4 mb-12">
          <h2 className="pt-10 tracking-tight">At a glance</h2>
          <ul className="mb-8 space-y-2">
            <li>Helped found the system and co-owned it for eight years</li>
            <li>
              Set up governance: how components are proposed, reviewed, versioned, deprecated and
              documented
            </li>
            <li>
              Built the semantic token layer and accessible components, plus AI workflows connecting
              Figma to code
            </li>
          </ul>

          <h2 className="pt-10 tracking-tight">Challenge</h2>
          <p>
            Rakuten Advertising&apos;s platform is made up of three products used by advertisers,
            publishers and account managers. If each product were built separately, it would end up
            with its own buttons, tables and patterns. The result would be inconsistent experiences
            and the same UI designed and built three times.
          </p>
          <p>
            In 2018 a small group of designers and engineers set out to build one design system that
            all three products could use as it is. I was part of that founding team.
          </p>

          <h3 className="pt-6">My role</h3>
          <ul className="mb-8 space-y-2">
            <li>Founding team member and co-owner, alongside designers and engineers</li>
            <li>Helped define the system&apos;s scope and principles</li>
            <li>Set up the governance model and reviewed contributions</li>
            <li>Built the token layer and many of the components</li>
            <li>Mentored designers on using and extending the system</li>
            <li>Introduced AI workflows connecting Figma, code and AI tools</li>
          </ul>

          <h2 className="pt-10 tracking-tight">Approach</h2>

          <h3 className="pt-6">Scope: one library, no customisation</h3>
          <p>
            The system covers the full set of core components, including buttons, inputs, tables,
            cards, pills, navigation and modals. All three products use the same components with no
            product-level customisation, so a fix or improvement made once reaches every product.
          </p>

          {/* IMAGE 2 — what the system covers. A map of component categories
              (foundations, inputs, navigation, data display, feedback) with the
              component names under each. A diagram to draw; no proprietary
              visuals needed. */}

          <h3 className="pt-6">Principles</h3>
          <ul className="mb-8 space-y-2">
            <li>
              <b>One source of truth</b>: every product uses the same component, with no local
              versions.
            </li>
            <li>
              <b>Flexible over specific</b>: fewer components that adapt, rather than many that each
              do one job.
            </li>
            <li>
              <b>Accessible by default</b>: accessibility is solved inside the component, not feature
              by feature.
            </li>
          </ul>

          <h3 className="pt-6">Governance</h3>
          <p>Every addition or change follows the same path:</p>
          {/* Ordered, because the five steps are a sequence rather than a set —
              the only ordered list on the site, hence the explicit
              list-decimal: Tailwind's preflight strips markers and globals.css
              has no `ol` rule. PROSE still styles the `li` text. */}
          <ol className="mb-8 ml-5 list-decimal space-y-2">
            <li>
              <b>Propose</b>: any designer can propose a new component or a change in [where, e.g. a
              Figma branch, Jira or a Slack channel].
            </li>
            <li>
              <b>Review</b>: [the co-owning designers and engineers] check it against the
              system&apos;s scope and principles, and decide whether it belongs in the system or
              should stay local to one product.
            </li>
            <li>
              <b>Version</b>: approved changes are released as a new version [on what cadence].
            </li>
            <li>
              <b>Deprecate</b>: components being replaced are marked as deprecated [and how teams
              were told], then removed after [timeframe].
            </li>
            <li>
              <b>Document</b>: usage guidance is written or updated in [where].
            </li>
          </ol>

          {/* IMAGE 3 — governance flow. propose → review → version → deprecate →
              document, with the review step branching to "add to system" and
              "keep local". A diagram to draw. */}

          <h3 className="pt-6">Tokens</h3>
          <p>I built the token layer in Figma variables, in two tiers:</p>
          <ul className="mb-8 space-y-2">
            <li>
              <b>Foundation tokens</b> hold the raw values: colours, spacing and type sizes.
            </li>
            <li>
              <b>Semantic tokens</b> describe purpose, e.g. [text-primary] or [surface-success].
              [They were mirrored in code as …]
            </li>
          </ul>
          <p>
            Because components use semantic tokens, a single change flows through every component and
            every product that uses it.
          </p>

          {/* IMAGE 4 — token architecture. Three columns, foundation → semantic →
              component, with one chain highlighted: green-100 → surface-success →
              pill background. A diagram to draw. */}

          <h2 className="pt-10 tracking-tight">Key decisions</h2>

          <h3 className="pt-6">Consolidating cards into one template</h3>
          <p>
            Over time, the card component built up [X] variants as teams added one-off versions for
            new features, and each variant had to be maintained separately. I replaced them with a
            single templated card with configurable content areas. That one component covered every
            existing use case and was far easier to maintain.
          </p>

          {/* IMAGE 5 — cards before and after. Left: the old variants (rough
              recreations or greyed wireframes are fine). Right: the single
              template with its Figma component properties panel. Recreated in
              Figma. Caption: "[X] variants replaced by one templated card." */}

          <h3 className="pt-6">Fixing contrast at component level</h3>
          <p>
            Our status pills used green text on a light green background, which fell below WCAG
            AA&apos;s 4.5:1 contrast requirement for text. I updated the pill colours to meet AA.
            Because all three products shared the component, the fix reached every pill everywhere,
            and no product team had to change anything.
          </p>

          {/* IMAGE 6 — pill contrast before and after. Old and new side by side,
              each labelled with its contrast ratio. Recreated; if the original
              colours aren't known, use representative ones and label them
              "illustrative". */}

          <h3 className="pt-6">Connecting Figma to code with Claude</h3>
          <p>
            I introduced a contribution workflow that let designers update a component in Figma and
            pass the change directly to code. Claude uses the Figma MCP to read the change, then
            generates the code update in GitHub [as a pull request for engineers to review].
            Designers could contribute and ship independently instead of waiting for handoff.
          </p>

          {/* IMAGE 7 — Figma → code workflow. designer edits component in Figma →
              Claude reads it via the Figma MCP → code change in GitHub →
              [engineer review] → release. A diagram to draw; a short screen
              recording of the workflow rebuilt on a personal project would be
              stronger still. */}

          <h3 className="pt-6">A Design.md file for AI tools</h3>
          <p>
            As more of the team used AI tools, I created a Design.md file: a single written reference
            describing the system&apos;s [tokens, components and usage rules]. It gave AI models a
            consistent reference, so the UI they generated stayed consistent with the system.
          </p>

          {/* IMAGE 8 — Design.md excerpt. A short, sanitised excerpt showing its
              structure: headings for tokens, components and usage rules, with one
              example entry. Rewritten from memory, no internal details. */}

          <h2 className="pt-10 tracking-tight">The system in use</h2>

          {/* IMAGE 9 — components in real products. Screens from the existing case
              studies (Influencer Campaigns, Natural Language Search, Attribution)
              with callouts pointing at system components: cards, pills, tables,
              inputs. Sourceable from images already in /public — no new capture
              needed. Caption: "The same components across three products." */}

          <h2 className="pt-10 tracking-tight">Outcome</h2>
          <ul className="mb-8 space-y-2">
            <li>
              Three products ran on one library, with no product-level customisation, for eight
              years.
            </li>
            <li>[X] card variants were consolidated into one templated component.</li>
            <li>One contrast fix reached every product at once.</li>
            <li>
              Designers could pass component changes directly to code through the Claude workflow.
            </li>
            <li>
              The Influencer Campaign platform reached a clickable prototype in 5 days, using
              existing components where possible.
            </li>
          </ul>

          <h2 className="pt-10 tracking-tight">What I learned</h2>
          <ul className="mb-8 space-y-2">
            <li>Fewer, flexible components are easier to govern than many specific ones.</li>
            <li>
              Fixing accessibility at system level is the highest-leverage accessibility work there
              is.
            </li>
            <li>
              AI tools are only as consistent as the reference you give them, which is why Design.md
              mattered.
            </li>
          </ul>

          <OtherCaseStudies currentHref="/blueprints" />
        </div>
      </div>
    </CaseStudyShell>
  )
}

export default Blueprints
