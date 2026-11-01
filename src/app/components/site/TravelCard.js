'use client'

import { useEffect, useRef } from 'react'
import { CARD_RADIUS, TEXT, DARK_INK, DARK_FAINT } from './tokens'
import { COUNTRIES } from '../../lib/travel'
import { WORLD_MAP } from '../../lib/travelGeo'
import useCountUp from './useCountUp'

/**
 * Travel, as a dot-matrix world map. Every country visited is lit, and the lights
 * sweep in from west to east the first time the card scrolls into view. Move
 * across it and the dots under the cursor swell, gently. There is deliberately no
 * country label on hover for now; the grid still knows which country each cell
 * belongs to (WORLD_MAP.names) if one is wanted back.
 *
 * It echoes the running card above it — a grid of small dots with a lit state —
 * and shows all the countries at once, which matters on a phone where there is no
 * hover. Canvas, because it is ~4,400 cells redrawn on every mouse move: it draws
 * once at rest and only runs a frame loop while the intro or the cursor needs one.
 *
 * The grid is in lib/travelGeo.js; the lit cells are the countries in
 * lib/travel.js, so the number and the map cannot disagree.
 */

const { cols, rows, grid } = WORLD_MAP
const LIT = '183,156,240' // About's purple icon accent, as rgb, for the canvas
const SPOT = 30 // spotlight radius, px
const INTRO = 1500 // ms

export default function TravelCard() {
  const cardRef = useRef(null)
  const boxRef = useRef(null)
  const canvasRef = useRef(null)
  const api = useRef(null)
  const p = useCountUp(cardRef)

  useEffect(() => {
    const canvas = canvasRef.current
    const box = boxRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let pitch = 0
    let raf = 0
    let t0 = reduce ? -Infinity : null // null: not yet on screen
    let mouse = null

    const draw = (now) => {
      ctx.clearRect(0, 0, W, H)
      const reveal = t0 === null ? 0 : Math.min(1, (now - t0) / INTRO)
      for (let r = 0; r < rows; r++) {
        const y = (r + 0.5) * pitch
        const row = grid[r]
        for (let c = 0; c < cols; c++) {
          const ch = row[c]
          if (ch === '0') continue
          const x = (c + 0.5) * pitch
          const visited = ch !== '1'
          let boost = 0
          if (mouse) {
            const d = Math.hypot(x - mouse.x, y - mouse.y)
            if (d < SPOT) boost = 1 - d / SPOT
          }
          let a = 0.14
          let rad = pitch * 0.36
          let colour = '255,255,255'
          if (visited) {
            // Lit from west to east: each cell waits its turn, then fades up.
            const k = Math.min(1, Math.max(0, reveal * 1.4 - (c / cols) * 0.4) / 0.35)
            colour = LIT
            a = 0.14 + 0.78 * k
            rad = pitch * (0.36 + 0.16 * k)
          }
          a = Math.min(1, a + boost * (visited ? 0.08 : 0.12))
          rad += boost * pitch * 0.15
          ctx.fillStyle = `rgba(${colour},${a})`
          ctx.beginPath()
          ctx.arc(x, y, rad, 0, 6.2832)
          ctx.fill()
        }
      }
      return reveal < 1 || mouse !== null
    }

    const loop = (now) => {
      raf = 0
      if (draw(now) && t0 !== null) raf = requestAnimationFrame(loop)
    }
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = box.clientWidth
      H = box.clientHeight
      pitch = W / cols
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    api.current = {
      move(e) {
        const b = canvas.getBoundingClientRect()
        mouse = { x: e.clientX - b.left, y: e.clientY - b.top }
        if (t0 === null) t0 = performance.now()
        kick()
      },
      leave() {
        mouse = null
        kick()
      },
    }

    size()
    const ro = new ResizeObserver(size)
    ro.observe(box)
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && t0 === null) {
        t0 = performance.now()
        kick()
      }
    })
    io.observe(box)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`${CARD_RADIUS} flex flex-col justify-between gap-8 border border-white/10 bg-white/[0.03] p-7`}
    >
      <p className={`${TEXT.xs} ${DARK_FAINT} mb-0 font-medium leading-[22px]`}>Travel</p>

      <div ref={boxRef} className="relative w-full" style={{ aspectRatio: `${cols} / ${rows}` }}>
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          onMouseMove={(e) => api.current?.move(e)}
          onMouseLeave={() => api.current?.leave()}
        />
      </div>

      <p className={`${DARK_INK} mb-0 text-[36px] font-medium leading-[40px] tracking-[-0.01em] tabular-nums`}>
        {Math.round(COUNTRIES.length * p)}
        <span className={`${DARK_FAINT} text-[16px] font-normal tracking-normal`}> countries visited so far</span>
      </p>
    </div>
  )
}
