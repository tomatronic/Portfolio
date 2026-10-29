import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import { NEXT_UP } from '../../lib/travel'

/**
 * "Next up" — the destination as a line drawing. On hover the outline fades,
 * redraws itself and the pin pops back (CSS in globals.css, once per hover).
 * All of it comes from NEXT_UP, so changing destination is a data edit.
 */
export default function NextUpCard() {
  const { country, alt, outline, pin } = NEXT_UP

  return (
    <div className={`next ${CARD_RADIUS} flex flex-col gap-5 border border-white/10 bg-white/[0.03] p-7`}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 font-medium leading-[22px]`}>Next up</p>
        <p className={`${DARK_INK} mb-0 text-[20px] font-medium leading-7`}>{country}</p>
      </div>
      <svg viewBox="0 0 450 260" role="img" aria-label={alt} className="block h-auto w-full">
        <path
          className="cz"
          pathLength="1"
          d={outline}
          fill="none"
          stroke="#D4D4D4"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle className="pin" cx={pin.cx} cy={pin.cy} r="6" fill="#F97316" />
        <text x={pin.cx + 12} y={pin.cy + 5} fill="#8A8A8A" fontSize="14" fontFamily="var(--font-dm-sans), sans-serif">
          {pin.city}
        </text>
      </svg>
    </div>
  )
}
