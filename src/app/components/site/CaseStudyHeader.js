import { FAINT, MUTED } from './tokens'

/**
 * The block under a case study's hero: eyebrow and title on the left, intro
 * copy and the Role / Skills rows on the right, two columns from `md`.
 *
 * `title` can be a node, not just a string — ACJ tints the product name inside
 * its title with a span. `children` is the intro: one or more `<p>`s that pick
 * up the body style from PROSE on the page wrapper.
 *
 * The metadata rows carry `data-keep` so PROSE leaves their 15px size alone.
 *
 * Two shapes for those rows. The four Rakuten case studies pass `role` and
 * `skills`, which is the common case and stays the shorthand. `meta` takes an
 * array of `{ label, value }` instead, for a page whose metadata isn't that
 * pair — /blueprints lists Role, Team and Scope. Passing both is a mistake, so
 * `meta` wins and the shorthand is ignored.
 */
export default function CaseStudyHeader({ eyebrow, title, role, skills, meta, children }) {
  const rows = meta ?? [
    { label: 'Role', value: role },
    { label: 'Skills', value: skills },
  ]

  return (
    <div className="mb-12 grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-4">
      <div className="md:col-span-2">
        <p data-keep className={`text-[15px] font-medium ${FAINT}`}>{eyebrow}</p>
        <h1 className="text-balance">{title}</h1>
      </div>
      <div className="md:col-span-2">
        {children}
        <div className={`${MUTED} space-y-1`}>
          {rows.map(({ label, value }) => (
            <p key={label} data-keep className={`text-[15px] ${MUTED}`}>
              <span className={FAINT}>{label}:</span> <span className="font-medium">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
