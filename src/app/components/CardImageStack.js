'use client'

import { motion } from 'framer-motion'

// Left → right layering: right card sits on top, like a real card spread
const Z_ORDERS = [1, 2, 3]

// Spring params are defined as { type: 'easing', duration, ease } — strip the type key
// so Framer Motion receives a plain { duration, ease } transition
function toFramerTransition(spring) {
  if (!spring) return {}
  if (spring.type === 'easing') {
    const { type: _t, ...rest } = spring
    return rest
  }
  return spring
}

export default function CardImageStack({ images, isHovered, params }) {
  const transition = toFramerTransition(params.spring)

  // Rest: strongly fanned — outer cards rotated and spread
  // Hover: spread widens significantly, rotation reduces but doesn't flatten fully
  const restX       = [-params.restSpread,   0, params.restSpread]
  const hoverX      = [-params.hoverSpread,  0, params.hoverSpread]
  const restRotate  = [-params.restRotation, 0, params.restRotation]
  const hoverRotate = [-params.hoverRotation, 0, params.hoverRotation]

  return (
    <div className="relative h-full w-full">
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: Z_ORDERS[i], width: `${params.imageSize}%` }}
        >
          <motion.div
            className="overflow-hidden rounded-xl shadow-md ring-0.5 ring-[rgba(184,64,16,0.22)] dark:ring-[rgba(238,159,104,0.30)]"
            animate={{
              x:      isHovered ? hoverX[i]      : restX[i],
              y:      0,
              rotate: isHovered ? hoverRotate[i] : restRotate[i],
            }}
            transition={transition}
          >
            {img}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
