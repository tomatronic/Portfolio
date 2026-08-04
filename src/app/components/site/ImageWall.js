'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CARD_RADIUS, FAINT, TEXT } from './tokens'

/**
 * Scattered, individually draggable photos.
 *
 * Each photo is its own draggable, constrained to the area element, so they can
 * be pushed around and re-stacked but never leave the block. Placement, size,
 * rotation and stacking order are all hand-authored rather than randomised at
 * runtime: random values would differ between the server and client render, and
 * would reshuffle on every navigation.
 *
 * Positions are in px against a ~442×430 area — the width the right-hand column
 * settles at once the page hits `lg` and the container caps at max-w-4xl. That
 * is why the scatter is gated on `lg` as well as pointer type; below it the area
 * goes full-width and the fixed coordinates would leave the right side bare.
 *
 * The layout is authored for exactly the seven photos below. Adding an eighth
 * means re-authoring the coordinates, not appending to the array — seven tiles
 * spread over the old 520px-tall frame left visible holes, which is why the
 * frame came down to 430.
 */

// The scatter's reference frame: coordinates below are authored against a
// 442×430 area, and this is the floor that keeps it that tall.
const AREA_H = 430

// left/top/width in px; rotate in degrees; z is the resting stack order.
// Aspect comes from width/height, as with any next/image.
const PHOTOS = [
  { src: '/outside/fuji-dusk.jpg', alt: 'Mount Fuji at dusk, seen across the lake', width: 1000, height: 800, left: 0, top: 8, w: 180, rotate: 4, z: 4 },
  { src: '/outside/seoul-gyeongbokgung.jpg', alt: 'Tom and his partner at Gyeongbokgung Palace, Seoul', width: 900, height: 900, left: 158, top: 0, w: 140, rotate: -3, z: 3 },
  { src: '/outside/glendalough-boulder.jpg', alt: 'Tom standing on a boulder in the Glendalough valley, Wicklow', width: 800, height: 1000, left: 290, top: 22, w: 150, rotate: -6, z: 6 },
  { src: '/outside/kinkakuji.jpg', alt: 'Kinkaku-ji, the Golden Pavilion, reflected in its pond in Kyoto', width: 800, height: 1000, left: 12, top: 138, w: 145, rotate: 5, z: 5 },
  { src: '/outside/glendalough-lake.jpg', alt: 'The Upper Lake at Glendalough, seen from the ridge above', width: 900, height: 900, left: 168, top: 152, w: 155, rotate: -8, z: 7 },
  { src: '/outside/seven-sisters.jpg', alt: 'The Seven Sisters cliffs and the coastguard cottages at Cuckmere Haven, Sussex', width: 1000, height: 800, left: 258, top: 258, w: 170, rotate: 6, z: 2 },
  { src: '/outside/south-downs-walk.jpg', alt: 'A group walking the South Downs with dogs on a summer afternoon', width: 1000, height: 800, left: 40, top: 296, w: 165, rotate: -4, z: 8 },
]

// Dragged photos are raised above the resting range, which tops out at 8.
const LIFT_FROM = 10

// The server can't know the pointer type or, on first paint, the viewport.
// Reading both in a layout effect means the correction lands before paint.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function ImageWall() {
  const areaRef = useRef(null)
  const lift = useRef(LIFT_FROM)
  const [scatter, setScatter] = useState(false)
  const [raised, setRaised] = useState({})

  useIsomorphicLayoutEffect(() => {
    const queries = [window.matchMedia('(pointer: fine)'), window.matchMedia('(min-width: 1024px)')]
    const sync = () => setScatter(queries.every((q) => q.matches))
    sync()
    queries.forEach((q) => q.addEventListener('change', sync))
    return () => queries.forEach((q) => q.removeEventListener('change', sync))
  }, [])

  const bringToFront = (src) => {
    lift.current += 1
    setRaised((current) => ({ ...current, [src]: lift.current }))
  }

  // Touch, pen, and any viewport below lg: a plain grid, no drag. Dragging by
  // finger would fight the page's vertical scroll, and a scatter this dense
  // hides too much of each photo at phone width.
  if (!scatter) {
    return (
      <ul className="grid list-none grid-cols-2 gap-2 p-0">
        {PHOTOS.map((photo, i, arr) => {
          // Odd count: the last tile spans both columns rather than leaving a
          // half-empty final row — the same rule the value cards above use.
          const wide = i === arr.length - 1 && arr.length % 2 !== 0
          return (
            <li
              key={photo.src}
              className={`relative ${wide ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/5]'}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 1023px) 50vw, 260px"
                className={`${CARD_RADIUS} object-cover ring-1 ring-[#292929]/10 dark:ring-white/10`}
              />
            </li>
          )
        })}
      </ul>
    )
  }

  return (
    <div
      ref={areaRef}
      className="relative h-full w-full"
      style={{ minHeight: AREA_H }}
    >
      {PHOTOS.map((photo) => (
        <motion.div
          key={photo.src}
          drag
          dragConstraints={areaRef}
          dragElastic={0.05}
          dragMomentum={false}
          // On pointer down, not drag start — a photo should come to the front
          // the instant it's grabbed, before it has moved far enough to count
          // as a drag.
          onPointerDown={() => bringToFront(photo.src)}
          whileDrag={{ scale: 1.03 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{
            left: photo.left,
            top: photo.top,
            width: photo.w,
            rotate: photo.rotate,
            zIndex: raised[photo.src] ?? photo.z,
          }}
          className="absolute cursor-grab active:cursor-grabbing"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={`${photo.w}px`}
            draggable={false}
            className="pointer-events-none h-auto w-full rounded-[10px] shadow-[0_6px_20px_rgba(41,41,41,0.10)] ring-1 ring-[#292929]/10 dark:shadow-[0_6px_20px_rgba(0,0,0,0.45)] dark:ring-white/10"
          />
        </motion.div>
      ))}


      {/* Affordance. Above every photo, and takes no pointer events so it can
          never eat the first drag. */}
      <span
        aria-hidden="true"
        className={`${TEXT.xs} ${FAINT} pointer-events-none absolute bottom-0 right-0 z-[100] rounded-full bg-white/70 px-2 py-0.5 backdrop-blur-sm dark:bg-[#0F1623]/70`}
      >
        Drag the photos
      </span>
    </div>
  )
}
