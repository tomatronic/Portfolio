'use client'

/**
 * SolarHero.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Full-viewport hero showing a real solar elevation chart for Brighton, UK.
 * Sun position updates every 30 s. Hover shows a crosshair + tooltip locked
 * to today's arc.
 *
 * LAYER ORDER
 * ───────────
 *  z:0   Background SVG  — glow, grid, arc paths, horizon, labels
 *  z:5   Sun dot SVG     — above chart, behind copy
 *  z:10  Hero copy       — headline, body, CTA button
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
import { useTheme } from './ThemeProvider'

// ─── Brighton, UK constants ───────────────────────────────────────────────────
const LAT = 50.8229
const LON = -0.1363

// Elevation display range — E_MIN must cover Brighton's winter solstice midnight (~-62°)
const E_MAX =  70
const E_MIN = -70
const E_RNG = E_MAX - E_MIN  // 140°

// Chart vertical bounds as a fraction of container height
// F_TOP = 0.048 places the summer solstice peak at ~nav vertical centre
const F_TOP = 0.048
const F_BOT = 0.95

// Atmospheric glow radius as a fraction of container width
const GLOW_R_FACTOR = 0.33

// Nav height in px — chart extends behind the nav by this amount
const NAV_HEIGHT = 144

// ─── Solar math ──────────────────────────────────────────────────────────────
const toRad = d => (d * Math.PI) / 180
const toDeg = r => (r * 180) / Math.PI

function dayOfYear(date) {
  return Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / 86_400_000)
}

function lastSundayUTC(year, month) {
  const last = new Date(Date.UTC(year, month + 1, 0))
  last.setUTCDate(last.getUTCDate() - last.getUTCDay())
  last.setUTCHours(1, 0, 0, 0)
  return last
}

/** Returns 1 during BST (last Sunday March → last Sunday October), 0 otherwise. */
function brightonOffset(date) {
  const y = date.getUTCFullYear()
  const bstStart = lastSundayUTC(y, 2)  // last Sunday of March
  const bstEnd   = lastSundayUTC(y, 9)  // last Sunday of October
  return date >= bstStart && date < bstEnd ? 1 : 0
}

/**
 * Solar elevation in degrees for a UTC decimal hour and day-of-year.
 * Uses the equation-of-time correction for ~1° accuracy.
 */
function solarElev(utcH, doy) {
  const decl = toRad(-23.45 * Math.cos(toRad((360 / 365) * (doy + 10))))
  const B    = toRad((360 / 365) * (doy - 81))
  const eot  = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B) // minutes
  const H    = toRad((utcH + LON / 15 + eot / 60 - 12) * 15)
  const sinE =
    Math.sin(toRad(LAT)) * Math.sin(decl) +
    Math.cos(toRad(LAT)) * Math.cos(decl) * Math.cos(H)
  return toDeg(Math.asin(Math.max(-1, Math.min(1, sinE))))
}

// ─── Coordinate helpers ───────────────────────────────────────────────────────

/** Maps an elevation angle to a y pixel position within the chart. */
function elevToY(elev, height) {
  const top  = F_TOP * height
  const span = (F_BOT - F_TOP) * height
  return top + ((E_MAX - elev) / E_RNG) * span
}

/** Maps a local decimal hour (0–24) to an x pixel position. */
function lhToX(lh, width) { return (lh / 24) * width }

/** Maps an x pixel position back to a local decimal hour. */
function xToLh(x, width)  { return (x / width) * 24 }

// ─── Path builders ────────────────────────────────────────────────────────────

/** Builds an array of { x, y, elev } points for a given day. */
function buildPoints(doy, offset, width, height, step = 0.08) {
  const pts = []
  for (let lh = 0; lh <= 24; lh += step) {
    const elev = solarElev(lh - offset, doy)
    pts.push({ x: lhToX(lh, width), y: elevToY(elev, height), elev })
  }
  return pts
}

/** Converts a points array to an SVG path `d` string. */
function ptsToD(pts) {
  return pts
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join('')
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function SolarHero() {
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const containerRef = useRef(null)
  const copyRef      = useRef(null)

  const [dims,   setDims]   = useState({ w: 0, h: 0 })
  const [now,    setNow]    = useState(() => new Date())
  const [hover,  setHover]  = useState(null)  // { x, y, lh, elev }
  const [active, setActive] = useState(false)

  // ── Resize observer ───────────────────────────────────────────────────────────
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setDims({ w: containerRef.current.offsetWidth, h: containerRef.current.offsetHeight })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // ── Clock tick — updates sun position every 30 s ──────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  // ── Mouse tracking ────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (!dims.w) return
    const offset = brightonOffset(now)
    const lh     = xToLh(e.clientX, dims.w)
    const elev   = solarElev(lh - offset, dayOfYear(now))
    setHover({ x: e.clientX, y: e.clientY, lh, elev })
  }, [dims.w, now])

  // ── Early return while dimensions are being measured ─────────────────────────
  const { w, h } = dims
  if (!w || !h) {
    return (
      <div
        ref={containerRef}
        className="w-full"
        style={{ background: dark ? '#0F1623' : '#F2ECE2', height: '100vh', marginTop: `-${NAV_HEIGHT}px` }}
      />
    )
  }

  // ── Derived solar values ──────────────────────────────────────────────────────
  const offset   = brightonOffset(now)
  const year     = now.getUTCFullYear()
  const todayDOY = dayOfYear(now)
  const sumDOY   = dayOfYear(new Date(Date.UTC(year, 5, 21)))
  const winDOY   = dayOfYear(new Date(Date.UTC(year, 11, 21)))

  const utcNow  = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600
  const sunElev = solarElev(utcNow, todayDOY)
  const sunX    = lhToX(utcNow + offset, w)
  const sunY    = elevToY(sunElev, h)
  const sunAbove = sunElev > -1
  const hY       = elevToY(0, h)

  const todayD = ptsToD(buildPoints(todayDOY, offset, w, h))
  const sumD   = ptsToD(buildPoints(sumDOY,   offset, w, h))
  const winD   = ptsToD(buildPoints(winDOY,   offset, w, h))

  // ── Colour palette (all derived from `dark` — no Tailwind dark: in SVG) ──────
  const bgColour = dark ? '#0F1623' : '#F2ECE2'

  const sunBright = sunAbove ? '#D4905A' : (dark ? '#6A8ABB' : '#C0B8A8')

  const glowInner = sunAbove
    ? 'rgba(224,192,120,0.42)'
    : (dark ? 'rgba(60,90,140,0.20)' : 'rgba(190,182,172,0.15)')
  const glowMid = sunAbove
    ? 'rgba(240,224,192,0.18)'
    : (dark ? 'rgba(60,90,140,0.06)' : 'rgba(210,205,198,0.06)')
  const glowR = w * GLOW_R_FACTOR

  const arcToday    = dark ? 'rgba(238,159,104,0.30)' : 'rgba(184,64,16,0.22)'
  const arcSolstice = dark ? 'rgba(238,159,104,0.26)' : 'rgba(184,64,16,0.20)'
  const gridStroke  = dark ? 'rgba(238,159,104,0.07)' : 'rgba(184,64,16,0.06)'

  const horizonStroke = dark ? 'rgba(160,185,210,0.12)' : 'rgba(28,28,22,0.09)'
  const labelFill     = dark ? '#B0C4D8'                 : '#1C1C16'
  const labelOpacity  = dark ? '0.40'                    : '0.22'
  const markerOpacity = dark ? '0.35'                    : '0.18'

  const hoverDotStroke = dark ? 'rgba(160,185,210,0.28)' : 'rgba(28,28,22,0.20)'

  const legendColour = dark ? 'rgba(238,159,104,0.40)' : 'rgba(184,64,16,0.38)'
  const arcLegendBg  = dark ? 'rgba(238,159,104,0.30)' : 'rgba(184,64,16,0.22)'
  const tooltipColour = dark ? 'rgba(160,185,210,0.85)' : '#7A7668'
  const tooltipSep    = dark ? '#4A6A8A'                 : '#A8A49A'
  const cursorColour  = dark ? '#4A6A8A'                 : '#A8A49A'

  const headingColour = dark ? '#E8EEF4' : '#1C1C16'

  // ── Tooltip content ───────────────────────────────────────────────────────────
  let ttTime = '', ttElev = ''
  if (hover) {
    const lhWrapped = ((hover.lh % 24) + 24) % 24
    const hh = Math.floor(lhWrapped)
    const mm = Math.floor((lhWrapped - hh) * 60)
    ttTime = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`
    ttElev = hover.elev >= 0
      ? `${hover.elev.toFixed(1)}° above horizon`
      : `${Math.abs(hover.elev).toFixed(1)}° below horizon`
  }

  // Tooltip position — anchored to the arc point, not the cursor.
  // One getBoundingClientRect call shared by x, y, and overflow check.
  const containerRect = containerRef.current?.getBoundingClientRect()
  const arcScreenX = containerRect ? containerRect.left + lhToX(hover?.lh ?? 0, w) : 0
  const arcScreenY = containerRect ? containerRect.top  + elevToY(hover?.elev ?? 0, h) : 0
  const tipLeft    = arcScreenX + 196 > (containerRect?.right ?? w) ? arcScreenX - 196 : arcScreenX + 16

  // ── Tooltip / crosshair visibility ────────────────────────────────────────────
  // Hidden when cursor is directly over the CTA button (copyRef).
  const btnRect       = copyRef.current?.getBoundingClientRect()
  const cursorOverBtn = !!(btnRect && hover &&
    hover.x >= btnRect.left && hover.x <= btnRect.right &&
    hover.y >= btnRect.top  && hover.y <= btnRect.bottom)
  const showOverlay = hover && active && !cursorOverBtn

  // ── Time labels — positioned at local-hour intervals ─────────────────────────
  const timeLabels = [0, 6, 12, 18, 24].map(localH => ({
    key:    localH,
    x:      lhToX(localH, w),
    label:  `${String(localH % 24).padStart(2, '0')}:00`,
    anchor: localH === 0 ? 'start' : localH === 24 ? 'end' : 'middle',
  }))

  // ── Grid lines ────────────────────────────────────────────────────────────────
  const verticalGridHours = [3, 6, 9, 12, 15, 18, 21]
  const horizontalGridDegs = [-60, -45, -30, -15, 15, 30, 45, 60]

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: bgColour,
        cursor:     'none',
        height:     '100vh',
        marginTop:  `-${NAV_HEIGHT}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => { setActive(false); setHover(null) }}
    >

      {/* ── z:0 — Background SVG: glow, grid, arcs, horizon, labels ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0"
        width={w}
        height={h}
        style={{ zIndex: 0, overflow: 'hidden' }}
      >
        <defs>
          {/* Atmospheric glow centred on the sun */}
          <radialGradient id="atmoGlow" cx={sunX} cy={sunY} r={glowR} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={glowInner} />
            <stop offset="28%"  stopColor={glowMid} />
            <stop offset="100%" stopColor={dark ? 'rgba(15,22,35,0)' : 'rgba(242,236,226,0)'} />
          </radialGradient>

          {/* Crosshair fade — userSpaceOnUse required on zero-width vertical strokes */}
          <linearGradient id="crosshairFade" x1="0" y1="0" x2="0" y2={h} gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor={dark ? 'rgba(160,185,210,0.02)' : 'rgba(28,28,22,0.01)'} />
            <stop offset="12%"  stopColor={dark ? 'rgba(160,185,210,0.18)' : 'rgba(28,28,22,0.12)'} />
            <stop offset="88%"  stopColor={dark ? 'rgba(160,185,210,0.18)' : 'rgba(28,28,22,0.12)'} />
            <stop offset="100%" stopColor={dark ? 'rgba(160,185,210,0.02)' : 'rgba(28,28,22,0.01)'} />
          </linearGradient>
        </defs>

        {/* Glow */}
        <rect width={w} height={h} fill="url(#atmoGlow)" />

        {/* Below-horizon shadow (light mode only — dark bg is already dark) */}
        {!dark && <rect x={0} y={hY} width={w} height={h - hY} fill="#1C1C16" fillOpacity="0.024" />}

        {/* Grid — vertical every 3 h, horizontal every 15° */}
        {verticalGridHours.map(hr => (
          <line key={`vg${hr}`} x1={lhToX(hr, w)} y1={0} x2={lhToX(hr, w)} y2={h}
            stroke={gridStroke} strokeWidth="0.4" />
        ))}
        {horizontalGridDegs.map(deg => (
          <line key={`hg${deg}`} x1={0} y1={elevToY(deg, h)} x2={w} y2={elevToY(deg, h)}
            stroke={gridStroke} strokeWidth="0.4" />
        ))}

        {/* Solstice reference arcs — dashed */}
        <path d={sumD} fill="none" stroke={arcSolstice} strokeWidth="0.7" strokeDasharray="2 5" />
        <path d={winD} fill="none" stroke={arcSolstice} strokeWidth="0.7" strokeDasharray="2 5" />

        {/* Today's arc */}
        <path d={todayD} fill="none" stroke={arcToday} strokeWidth="1.1" />

        {/* Horizon */}
        <line x1={0} y1={hY} x2={w} y2={hY} stroke={horizonStroke} strokeWidth="0.75" />

        {/* Time labels at the bottom */}
        {timeLabels.map(({ key, x, label, anchor }) => (
          <text
            key={key}
            x={x} y={h - 14}
            textAnchor={anchor}
            fontFamily="var(--font-dm-sans), system-ui, sans-serif"
            fontSize="10"
            letterSpacing="0.04em"
            fill={labelFill}
            fillOpacity={labelOpacity}
          >
            {label}
          </text>
        ))}

        {/* Horizon elevation marker */}
        <text
          x={7} y={hY - 5}
          fontFamily="var(--font-dm-sans), system-ui, sans-serif"
          fontSize="9.5"
          letterSpacing="0.04em"
          fill={labelFill}
          fillOpacity={markerOpacity}
        >
          0°
        </text>

        {/* Crosshair — visible when hovering outside the CTA button */}
        {showOverlay && (
          <>
            <line x1={hover.x} y1={0} x2={hover.x} y2={h}
              stroke="url(#crosshairFade)" strokeWidth="1" />
            <circle cx={hover.x} cy={elevToY(hover.elev, h)} r={2.5}
              fill="none" stroke={hoverDotStroke} strokeWidth="0.75" />
          </>
        )}
      </svg>

      {/* ── z:10 — Hero copy ── */}
      <div
        className="absolute inset-x-0 flex justify-center"
        style={{ zIndex: 10, top: `calc(${NAV_HEIGHT}px + 72px)` }}
      >
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl px-8"
        >
          <div className="flex flex-col items-center gap-8">

            <h1
              className="text-balance text-center text-4xl font-normal tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: headingColour, lineHeight: 1.1, marginBottom: 0 }}
            >
              Senior UX Designer
            </h1>

            <div className="flex flex-col items-center gap-3 max-w-3xl w-full">
              <h2
                className="w-full text-center text-xl font-normal tracking-tight"
                style={{ color: dark ? 'rgba(200,215,230,0.85)' : '#334155' }}
              >
                Making complex products easy to use, especially where decisions matter most.
              </h2>

              <p
                className="max-w-2xl text-center text-base font-normal leading-relaxed"
                style={{ marginBottom: 0, color: dark ? 'rgba(160,185,210,0.70)' : '#64748B' }}
              >
                I specialise in turning data-heavy, high-stakes workflows into interfaces that are easy to understand and quick to act on. In practice, this means helping users move from &ldquo;what am I looking at?&rdquo; to &ldquo;I know exactly what to do next&rdquo; without training, friction, or guesswork.
              </p>
            </div>

            {/* ref used to suppress tooltip/crosshair when cursor is over this button */}
            <span ref={copyRef}>
              <Link
                href="/#work"
                onClick={e => {
                  const el = document.getElementById('work')
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }) }
                }}
                className="btn-dark-3d inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium text-white"
              >
                Explore case studies
                <ArrowDown size={15} strokeWidth={2.5} />
              </Link>
            </span>

            <p
              style={{
                fontFamily:    'var(--font-dm-sans), system-ui, sans-serif',
                fontSize:      '10.5px',
                fontStyle:     'italic',
                letterSpacing: '0.04em',
                color:         dark ? 'rgba(160,185,210,0.45)' : 'rgba(28,28,22,0.30)',
                marginBottom:  0,
              }}
            >
              Today&apos;s sun path, charted live from Brighton, UK
            </p>

          </div>
        </motion.div>
      </div>

      {/* ── z:20 — Sun dot (rendered above all copy) ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        width={w}
        height={h}
        style={{ zIndex: 5, overflow: 'hidden' }}
      >
        <circle cx={sunX} cy={sunY} r={5.5} fill={sunBright} />
      </svg>

      {/* ── Tooltip — anchored to the arc, not the cursor ── */}
      {showOverlay && (
        <div
          className="fixed pointer-events-none"
          style={{
            left:        tipLeft,
            top:         arcScreenY - 24,
            zIndex:      100,
            display:     'flex',
            alignItems:  'center',
            gap:         '7px',
            fontFamily:  'var(--font-dm-sans), system-ui, sans-serif',
            letterSpacing: '0.03em',
          }}
        >
          <span style={{ fontSize: '12.5px', color: tooltipColour }}>{ttTime}</span>
          <span style={{ width: 1, height: 9, background: tooltipSep, display: 'block' }} />
          <span style={{ fontSize: '12px', fontStyle: 'italic', color: tooltipColour }}>{ttElev}</span>
        </div>
      )}

      {/* ── Custom cursor dot ── */}
      {active && hover && (
        <div
          aria-hidden="true"
          className="fixed pointer-events-none"
          style={{
            left:         hover.x,
            top:          hover.y,
            width:        6,
            height:       6,
            background:   cursorColour,
            borderRadius: '50%',
            transform:    'translate(-50%, -50%)',
            zIndex:       200,
          }}
        />
      )}

      {/* ── Legend ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 left-8 flex items-center gap-4 pointer-events-none"
        style={{
          zIndex:        10,
          fontFamily:    'var(--font-dm-sans), system-ui, sans-serif',
          fontSize:      '10.5px',
          letterSpacing: '0.05em',
          color:         legendColour,
        }}
      >
        <div className="flex items-center gap-1.5">
          <div style={{ width: 18, height: 1, background: arcLegendBg }} />
          <span>today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div style={{ width: 18, height: 0, borderTop: `1px dashed ${legendColour}` }} />
          <span>summer · winter solstice</span>
        </div>
      </div>

      {/* ── Location tag ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-7 right-8 pointer-events-none"
        style={{
          zIndex:        10,
          fontFamily:    'var(--font-dm-sans), system-ui, sans-serif',
          fontSize:      '10.5px',
          fontStyle:     'italic',
          letterSpacing: '0.06em',
          color:         legendColour,
        }}
      >
        Brighton, UK · 50.8°N
      </div>

    </div>
  )
}
