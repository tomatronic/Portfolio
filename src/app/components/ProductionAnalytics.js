'use client'

import { useEffect, useState } from 'react'
import { GoogleAnalytics } from '@next/third-parties/google'

// GA loads only on the real domain, decided in the browser. This replaced a
// `process.env.VERCEL_ENV === 'production'` gate (2026-09-28) that silently
// switched GA off in production too: the variable was not available at build
// time on this project, so every page shipped without the tag and a recruiter's
// visit went unrecorded. A hostname check cannot depend on build configuration.
const HOSTS = ['www.tomspencer.design', 'tomspencer.design']

export default function ProductionAnalytics({ gaId }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (HOSTS.includes(window.location.hostname)) setOn(true)
  }, [])
  return on ? <GoogleAnalytics gaId={gaId} /> : null
}
