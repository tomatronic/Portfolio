'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const pathname = usePathname()

  const [hash, setHash] = useState('')

  useEffect(() => {
    const updateHash = () => {
      const next = window.location.hash || ''
      setHash(prev => (prev === next ? prev : next))
    }

    const scheduleUpdateHash = () => {
      // Avoid scheduling state updates during React insertion phase
      if (typeof queueMicrotask === 'function') queueMicrotask(updateHash)
      else Promise.resolve().then(updateHash)
    }

    // Initial sync (safe to do in useEffect)
    updateHash()

    // Native events
    window.addEventListener('hashchange', updateHash)
    window.addEventListener('popstate', updateHash)

    // Patch history methods (Next can update the URL via these without firing hashchange)
    const originalPushState = window.history.pushState
    const originalReplaceState = window.history.replaceState

    window.history.pushState = function (...args) {
      originalPushState.apply(this, args)
      scheduleUpdateHash()
    }

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(this, args)
      scheduleUpdateHash()
    }

    return () => {
      window.removeEventListener('hashchange', updateHash)
      window.removeEventListener('popstate', updateHash)
      window.history.pushState = originalPushState
      window.history.replaceState = originalReplaceState
    }
  }, [])

  const isActive = (path) => {
    if (path === '/#work') return pathname === '/' && hash === '#work'
    if (path === '/about') return pathname === '/about'
    return pathname === path
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  // Escape-close + focus trap for mobile menu
  useEffect(() => {
    if (!isMenuOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
        buttonRef.current?.focus()
        return
      }
      if (e.key === 'Tab') {
        const focusable = Array.from(
          menuRef.current?.querySelectorAll('a, button') ?? []
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last  = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    // Move initial focus into the menu
    menuRef.current?.querySelector('button')?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  return (
    <>
      <nav className="relative z-50">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setHash('')}
              className="flex items-center"
              aria-label="Tom Spencer — home"
            >
              <span className="text-2xl font-normal tracking-tight text-slate-950 dark:text-white">Tom Spencer</span>
            </Link>

            <button
              ref={buttonRef}
              className="text-slate-950 dark:text-white md:hidden"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link
                href="/#work"
                onClick={() => setHash('#work')}
                className={`text-base ${isActive('/#work') ? 'text-slate-950 dark:text-white underline underline-offset-4 decoration-accent-600 dark:decoration-accent-400' : 'text-slate-950 dark:text-slate-200 hover:text-accent-600 dark:hover:text-accent-400'}`}
              >
                Work
              </Link>

              <Link
                href="/about"
                className={`text-base ${isActive('/about') ? 'text-slate-950 dark:text-white underline underline-offset-4 decoration-accent-600 dark:decoration-accent-400' : 'text-slate-950 dark:text-slate-200 hover:text-accent-600 dark:hover:text-accent-400'}`}
              >
                About
              </Link>

              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950/[0.07] px-4 py-1.5 text-base font-medium text-slate-950 transition-colors hover:bg-accent-600 hover:text-white dark:bg-white/10 dark:text-slate-200 dark:hover:bg-accent-600 dark:hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download size={14} strokeWidth={2} />
                Resume
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-screen Mobile menu */}
      <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          ref={menuRef}
          className="fixed inset-0 z-50 bg-slate-950 md:hidden"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        >
          <div className="container relative mx-auto h-full px-6 py-8">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute right-6 top-12 text-white md:hidden"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>

            <div className="flex h-full flex-col items-center justify-center space-y-8">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  href="/#work"
                  className="group relative text-3xl font-normal text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Work</span>
                  <span className={`absolute bottom-0 left-0 h-1 w-full bg-white ${isActive('/#work') ? '' : 'hidden'}`}></span>
                  <span className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 ${isActive('/#work') ? 'hidden' : ''}`}></span>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.10, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  href="/about"
                  className="group relative text-3xl font-normal text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">About</span>
                  <span className={`absolute bottom-0 left-0 h-1 w-full bg-white ${isActive('/about') ? '' : 'hidden'}`}></span>
                  <span className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100 ${isActive('/about') ? 'hidden' : ''}`}></span>
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <a
                  href="/resume.pdf"
                  className="group relative text-3xl font-normal text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="relative z-10">Resume</span>
                  <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  )
}
