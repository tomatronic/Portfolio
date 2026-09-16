import { play } from 'cuelume'

/**
 * Play a UI cue without ever letting audio block the interaction it decorates.
 * Autoplay policy, an unsupported audio context or a muted device should all
 * fail silently — the theme still flips, the link still navigates.
 */
export function playCue(name) {
  try {
    play(name)
  } catch {
    /* no-op */
  }
}
