import ConceptHome from './components/site/ConceptHome'

/**
 * Home. The previous version (noise hero, gradient headline, CasestudyShowcase,
 * AboutMeSection, Testimonials) is in git — see the commit that introduced this
 * file — if any of it needs recovering.
 *
 * Title and description come from the root layout's metadata; this page doesn't
 * override them, so the site-level OpenGraph card still applies.
 */

export default function Home() {
  return <ConceptHome />
}
