'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import { COUNTRIES, TRAVEL_PHOTOS } from '../../lib/travel'
import useCountUp from './useCountUp'

/**
 * "Travel" — five overlapping photos with a dock-style zoom, and on card hover a
 * burst of every country's flag fired out from behind them.
 *
 * The flags are not rendered until the first hover. That keeps 26 looping
 * animations off the page until they are wanted, and means the randomised burst
 * only ever exists on the client — nothing for the server HTML to disagree with.
 * Each hover starts a fresh burst, and each flag keeps re-rolling its own route.
 */

const rand = (min, max) => min + Math.random() * (max - min)

// One flag's launch: a direction (16 rays, near or far), a little distance and
// tilt jitter so no two passes trace the same line, and a duration.
function roll() {
  return {
    cls: `fl b${Math.floor(Math.random() * 16)}${Math.random() < 0.5 ? 'n' : 'f'}`,
    scale: rand(0.8, 1.2),
    rot: rand(-25, 25),
    dur: rand(2.2, 3.4),
  }
}

/**
 * One country's flag. It re-rolls itself every time a loop finishes — the
 * animation is at opacity 0 at that moment, so the jump to a new direction is
 * invisible — which means a flag never flies the same route twice. Only the
 * first pass carries a delay, picked at random across ~1.6s: every flag shows
 * up inside the first couple of seconds, so a short hover still sees all of
 * them (a fixed, ordered stagger left the last few barely visible).
 */
function Flag({ flag }) {
  const [launch, setLaunch] = useState(roll)
  const [delay] = useState(() => rand(0, 1.6))
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={launch.cls}
      src={`/flags/${flag}.svg`}
      alt=""
      onAnimationIteration={() => setLaunch(roll())}
      style={{
        animationDelay: `${delay.toFixed(2)}s`,
        animationDuration: `${launch.dur.toFixed(2)}s`,
        '--s': launch.scale.toFixed(2),
        '--rot': `${launch.rot.toFixed(0)}deg`,
      }}
    />
  )
}

export default function TravelCard() {
  const ref = useRef(null)
  const p = useCountUp(ref)
  const [seed, setSeed] = useState(0)
  
  return (
    <div
      ref={ref}
      className={`travel ${CARD_RADIUS} flex flex-col justify-between gap-8 overflow-hidden border border-white/10 bg-white/[0.03] p-7`}
      onMouseEnter={() => setSeed(Math.floor(Math.random() * 100000) + 2)}
    >
      <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 font-medium leading-[22px]`}>Travel</p>

      <div className="relative isolate flex items-start justify-center pb-2.5 pt-1.5">
        <div aria-hidden="true" className="flayer pointer-events-none absolute inset-0 -z-10">
          {seed > 0 && COUNTRIES.map((c) => <Flag key={`${seed}-${c.flag}`} flag={c.flag} />)}
        </div>
        {TRAVEL_PHOTOS.map((ph) => (
          <Image
            key={ph.src}
            className="tp h-[72px] w-[72px] shrink-0 rounded-lg object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_6px_16px_rgba(0,0,0,0.45)]"
            src={ph.src}
            alt={ph.alt}
            title={ph.title}
            width={72}
            height={72}
            sizes="72px"
            style={{
              marginLeft: -ph.overlap,
              transform: `translateY(${ph.shift}px) rotate(${ph.tilt}deg)`,
            }}
          />
        ))}
      </div>

      <div>
        <p className={`${DARK_INK} mb-0 text-[36px] font-medium leading-[40px] tracking-[-0.01em] tabular-nums`}>
          {Math.round(COUNTRIES.length * p)}
          <span className={`${DARK_FAINT} text-[16px] font-normal`}> countries</span>
        </p>
        <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 mt-1 leading-[22px]`}>
          travelled to so far — and counting
        </p>
      </div>
    </div>
  )
}
