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
 * Each hover reshuffles: new order, directions and timings.
 */

// Small seeded generator so one hover's burst is internally consistent.
function burst(seed) {
  let s = seed * 9973
  const rnd = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  const order = [...COUNTRIES]
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rnd() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  const n = order.length
  return order.map((c, i) => ({
    src: `/flags/${c.flag}.svg`,
    cls: `fl b${Math.floor(rnd() * 16)}${rnd() < 0.5 ? 'n' : 'f'}`,
    // Spread over the first 2.6s so the stream is steady, not a single volley.
    delay: ((i / n) * 2.6 + rnd() * 0.3).toFixed(2),
    dur: (2.2 + rnd() * 0.8).toFixed(2),
  }))
}

export default function TravelCard() {
  const ref = useRef(null)
  const p = useCountUp(ref)
  const [seed, setSeed] = useState(0)
  const flags = seed ? burst(seed) : null

  return (
    <div
      ref={ref}
      className={`travel ${CARD_RADIUS} flex flex-col justify-between gap-8 overflow-hidden border border-white/10 bg-white/[0.03] p-7`}
      onMouseEnter={() => setSeed(Math.floor(Math.random() * 100000) + 2)}
    >
      <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 font-medium leading-[22px]`}>Travel</p>

      <div className="relative isolate flex items-start justify-center pb-2.5 pt-1.5">
        <div aria-hidden="true" className="flayer pointer-events-none absolute inset-0 -z-10">
          {flags?.map((f) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={f.src}
              className={f.cls}
              src={f.src}
              alt=""
              style={{ animationDelay: `${f.delay}s`, animationDuration: `${f.dur}s` }}
            />
          ))}
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
