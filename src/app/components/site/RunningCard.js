'use client'

import { useRef } from 'react'
import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import useCountUp from './useCountUp'

/**
 * "Running" — a year of runs as a GitHub-style grid, 53 weekly columns by 7
 * weekday rows (Monday first), one dot per day.
 *
 * `year` comes from `lib/strava.js` already shaped (padding, per-day km, month
 * columns), because the grid has to match the server's HTML exactly. When Strava
 * returns nothing `year` is null and there are no runs to draw — the card then
 * shows only the floor figure, not an invented grid. `fallbackKm` is that floor;
 * see the note on FALLBACK_KM in About.js for why it stays low.
 *
 * Fixed DARK_* ink: this card lives on the near-black band, which does not flip
 * with the theme.
 */

const RUN = '#F97316'
const REST = 'rgba(255,255,255,0.1)'
const INJURED = '#DC2626'
const LABEL = `${TEXT.xs} ${DARK_FAINT} mb-0 font-medium leading-[22px]`
const BIG = `${DARK_INK} mb-0 text-[36px] font-medium leading-[40px] tracking-[-0.01em] tabular-nums`
const UNIT = `${DARK_FAINT} text-[16px] font-normal`
const CAPTION = `${TEXT.xs} ${DARK_FAINT} mb-0 mt-1 leading-[22px]`

export default function RunningCard({ year, fallbackKm, injuredFrom = null }) {
  const ref = useRef(null)
  const p = useCountUp(ref)

  if (!year) {
    return (
      <section
        aria-label="Running"
        className={`${CARD_RADIUS} mt-10 flex flex-col gap-7 border border-white/10 bg-white/[0.03] p-7`}
      >
        <p className={LABEL}>Running</p>
        <div>
          <p className={BIG}>
            {fallbackKm.toLocaleString('en-GB')}+<span className={UNIT}> km</span>
          </p>
          <p className={CAPTION}>ran in a typical year</p>
        </div>
      </section>
    )
  }

  // ISO dates compare correctly as strings. Only rest days go red: a run on or
  // after the date keeps its colour, so a comeback shows up as it happens.
  const isInjured = (d) => injuredFrom && d.km === 0 && d.date >= injuredFrom
  const hasInjury = year.days.some(isInjured)
  const gridLabel = `${year.runs} runs over the last 365 days, ${year.km.toLocaleString('en-GB')} km in total${hasInjury ? ', then injured since ' + injuredFrom : ''}`

  return (
    <section
      ref={ref}
      aria-label="Running in the last 365 days"
      className={`${CARD_RADIUS} mt-10 flex flex-col gap-7 border border-white/10 bg-white/[0.03] p-7`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <p className={LABEL}>Running · the last 365 days</p>
        <div className="flex items-center gap-4 text-[13px] leading-5 text-[#8A8A8A]">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: REST }} />
            Rest day
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: RUN }} />
            Run
          </span>
          {hasInjury && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: INJURED }} />
              Injured
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-12">
        <div>
          <p className={BIG}>
            {Math.round(year.km * p).toLocaleString('en-GB')}
            <span className={UNIT}> km</span>
          </p>
          <p className={CAPTION}>total distance</p>
        </div>
        <div>
          <p className={BIG}>
            {(year.avgKm * p).toFixed(1)}
            <span className={UNIT}> km</span>
          </p>
          <p className={CAPTION}>average run, across {year.runs} runs</p>
        </div>
      </div>

      {/* min-w-[600px] inside an overflow-x-auto: below ~650px the grid scrolls
          sideways within the card rather than shrinking the dots to specks. */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div
            aria-hidden="true"
            className="grid gap-x-1 text-[12px] leading-4 text-[#8A8A8A]"
            style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}
          >
            {year.months.map((m) => (
              <span
                key={`${m.label}-${m.col}`}
                className="whitespace-nowrap"
                style={{ gridColumn: `${m.col} / span 3` }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div
            role="img"
            aria-label={gridLabel}
            className="mt-2 grid gap-1"
            style={{
              gridTemplateColumns: 'repeat(53, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(7, auto)',
              gridAutoFlow: 'column',
            }}
          >
            {Array.from({ length: year.pad }, (_, i) => (
              <span key={`pad-${i}`} className="aspect-square" />
            ))}
            {year.days.map((d, i) => (
              <span
                key={i}
                title={`${d.label} · ${d.km > 0 ? `${d.km} km` : isInjured(d) ? 'Injured :(' : 'rest day'}`}
                className="aspect-square rounded-full"
                style={{ background: d.km > 0 ? RUN : isInjured(d) ? INJURED : REST }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
