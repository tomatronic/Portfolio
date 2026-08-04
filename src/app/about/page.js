import AboutContent from '../components/site/About'
import { getRunningTotals } from '../lib/strava'

// Refetch the Strava total once a day. The page stays statically rendered —
// this is ISR, not a per-request fetch.
export const revalidate = 86400

export async function generateMetadata() {
  return {
    title: 'About | Tom Spencer',
    description:
      'About Tom Spencer — Senior Product Designer specialising in data-heavy enterprise tools, based in Brighton, UK.',
  }
}

export default async function AboutPage() {
  // null when the Strava env vars aren't set, or if the API call fails — the
  // page then falls back to its static figure.
  const running = await getRunningTotals()

  return <AboutContent running={running} />
}
