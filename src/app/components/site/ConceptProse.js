'use client'

import { PROSE } from './tokens'

/**
 * Applies the type system to a block of long-form content. The rules themselves
 * live in tokens.js as PROSE, so the live case study pages can apply the same
 * string directly to their existing wrapper without adding a DOM node.
 *
 * Case study bodies are mostly bare `<h2>`, `<p>`, `<ul>`, `<blockquote>` with
 * no classes — they inherit from globals.css, which styles those elements
 * directly (h1 30/36px, h2 24/30px, p 16px slate-600). An element rule beats
 * anything inherited from a wrapper, so setting the scale on a parent does
 * nothing. These descendant selectors compile to `.parent h2 { … }`, which
 * outranks the bare `h2` rule and brings the whole block onto 12/13/14/24.
 *
 * Written out as literal classes, not composed from the TEXT/INK tokens —
 * Tailwind only emits what it can find as complete strings in the source.
 */


export default function ConceptProse({ className = '', children }) {
  return <div className={`${PROSE} ${className}`}>{children}</div>
}
