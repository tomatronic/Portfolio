'use client'

import { useRef } from 'react'
import useCountUp from './useCountUp'

/**
 * A headline figure that counts up when it scrolls into view — the same motion
 * as "26 countries" on the About page, driven by the same `useCountUp`.
 *
 * It animates the number inside the string and keeps everything around it:
 * "~$10M" counts 0 → 10 between "~$" and "M", "1,000+" counts to 1,000 and
 * keeps its comma. The real figure is in the markup from the start (the hook
 * starts at 1), so a no-JS visit and the server render show it, and screen
 * readers get the final value rather than a running count.
 */
export default function CountStat({ stat, className }) {
  const ref = useRef(null)
  const p = useCountUp(ref)

  const match = stat.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return <p data-keep className={className}>{stat}</p>

  const [, prefix, figure, suffix] = match
  const target = parseFloat(figure.replace(/,/g, ''))
  const decimals = figure.includes('.') ? figure.split('.')[1].length : 0
  const shown = (target * p).toLocaleString('en-GB', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <p ref={ref} data-keep className={`${className} tabular-nums`}>
      <span className="sr-only">{stat}</span>
      <span aria-hidden="true">
        {prefix}
        {shown}
        {suffix}
      </span>
    </p>
  )
}
