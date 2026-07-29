import HomeContent from './components/site/Home'

/**
 * Home. The previous version (noise hero, gradient headline, CasestudyShowcase,
 * AboutMeSection, Testimonials) is in git — see commit 18e886c — if any of it
 * needs recovering.
 *
 * Title and description come from the root layout's metadata; this page doesn't
 * override them, so the site-level OpenGraph card still applies.
 */

export default function HomePage() {
  return <HomeContent />
}
