import HomeContent from './components/site/Home'

export const metadata = { alternates: { canonical: '/' } }

/**
 * Home. The previous version (noise hero, gradient headline, CasestudyShowcase,
 * AboutMeSection, Testimonials) is in git — see commit 18e886c — if any of it
 * needs recovering.
 *
 * Title, description and the OpenGraph card come from the root layout; this page
 * adds only its canonical URL, which the layout leaves off so the 404 doesn't
 * inherit one.
 */

export default function HomePage() {
  return <HomeContent />
}
