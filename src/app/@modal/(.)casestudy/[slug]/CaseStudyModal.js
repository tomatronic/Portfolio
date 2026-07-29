'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { X } from 'lucide-react'

export default function CaseStudyModal({ children }) {
  const router = useRouter()
  const [isClosing, setIsClosing] = useState(false)

  const close = useCallback(() => setIsClosing(true), [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [])

  return (
    <>
      {/* Backdrop — fades in/out independently. Primary ink rather than the
          amber it used to tint with (#B84010 / #3D1204); same opacities. */}
      <motion.div
        className="fixed inset-0 z-50 bg-[#292929]/[0.08] dark:bg-[#292929]/90 backdrop-blur-sm pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={isClosing
          ? { duration: 0.18, ease: 'easeIn' }
          : { duration: 0.28, ease: 'easeOut' }}
      />

      {/* Panel — slides up from bottom */}
      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto"
        initial={{ y: '100%' }}
        animate={{ y: isClosing ? '100%' : '0%' }}
        transition={isClosing
          ? { duration: 0.22, ease: 'easeIn' }
          : { type: 'spring', stiffness: 320, damping: 38, mass: 0.9 }}
        onAnimationComplete={() => { if (isClosing) router.back() }}
      >
        {/* Floating close button */}
        <div className="pointer-events-none sticky right-0 top-0 z-10 flex justify-end px-6 pt-6">
          <button
            onClick={close}
            className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-md transition-[transform,box-shadow] hover:scale-105 hover:shadow-lg active:scale-[0.96]"
            aria-label="Close case study"
          >
            <X size={16} strokeWidth={2.5} className="text-slate-700 dark:text-slate-200" />
          </button>
        </div>

        {/* Content */}
        <div className="pt-6 md:pt-12">
          {children}
        </div>
      </motion.div>
    </>
  )
}
