'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X, Lock } from 'lucide-react'

const CORRECT_PASSWORD = 'secret'

export default function PasswordGate({ href, onClose }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    inputRef.current?.focus()

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (value === CORRECT_PASSWORD) {
      sessionStorage.setItem('influencer_auth', '1')
      router.push(href)
      onClose()
    } else {
      setError(true)
      setValue('')
      inputRef.current?.focus()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1C16]/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-[#C8BEB0] bg-[#F2ECE2] p-8 shadow-xl dark:border-[#2A3A4A] dark:bg-[#0F1623]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-[#E8E0D5] hover:text-slate-600 dark:hover:bg-[#1A2535] dark:hover:text-slate-300"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        <div className="mb-5 flex flex-col items-center gap-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-600 dark:bg-accent-950 dark:text-accent-400">
            <Lock size={18} />
          </div>
          <div>
            <h3
              className="text-xl text-slate-950 dark:text-white"
              style={{ fontFamily: 'var(--font-fraunces), Georgia, serif' }}
            >
              NDA protected
            </h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              This work is confidential.{' '}
              <a
                href="mailto:tom.m.spencer@gmail.com?subject=Influencer Campaigns case study"
                className="text-accent-600 hover:underline dark:text-accent-400"
              >
                Get in touch
              </a>
              {' '}and I'll send you the password.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false) }}
            placeholder="Enter password"
            className={[
              'w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors',
              'bg-[#EDE7DD] text-slate-950 placeholder-slate-400 dark:bg-[#0A1020] dark:text-white dark:placeholder-slate-500',
              error
                ? 'border-red-400 dark:border-red-500'
                : 'border-[#C8BEB0] focus:border-accent-600 dark:border-[#2A3A4A] dark:focus:border-accent-500',
            ].join(' ')}
          />
          {error && (
            <p className="text-xs text-red-500">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            className="btn-violet-3d w-full rounded-xl px-4 py-3 text-sm font-medium text-white"
          >
            View case study
          </button>
        </form>
      </div>
    </div>
  )
}
