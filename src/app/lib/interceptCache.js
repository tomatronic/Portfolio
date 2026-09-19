/**
 * Works around a Next.js router-cache quirk that broke the case study modal.
 *
 * Land on `/casestudy/Prompt` directly, go home via the avatar, click the
 * Prompt card: the full page opened instead of the modal. The hard load put
 * the *full* `/casestudy/Prompt` tree in the client router cache, and a later
 * soft navigation to the same URL reused that entry rather than asking the
 * server — which is the only place the `(.)casestudy` interception happens.
 * Present on every deployment back to when the modal was added; only visible
 * in that one flow, which is why it survived.
 *
 * The fix is targeted: a direct case study visit sets a flag, and the next
 * time the home page mounts it calls `router.refresh()` — documented to clear
 * the whole router cache — then clears the flag. A fresh load of the home
 * page never sets the flag, so it costs nothing on the common path.
 *
 * Module state, so it must only be imported from client components (it is:
 * CaseStudyShell and Home). It is per-tab and per-session by design — that
 * is exactly the scope of the cache it is working around.
 */
let directCaseStudyVisited = false

export function markDirectCaseStudyVisit() {
  directCaseStudyVisited = true
}

export function consumeDirectCaseStudyVisit() {
  const was = directCaseStudyVisited
  directCaseStudyVisited = false
  return was
}
