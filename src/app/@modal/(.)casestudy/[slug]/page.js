import { notFound } from 'next/navigation'
import CaseStudyModal from './CaseStudyModal'

const caseStudyPages = {
  Prompt:              () => import('../../../casestudy/Prompt/page'),
  ACJ:                 () => import('../../../casestudy/ACJ/page'),
  Rakuten:             () => import('../../../casestudy/Rakuten/page'),
  InfluencerCampaigns: () => import('../../../casestudy/InfluencerCampaigns/page'),
}

/**
 * Without these, the `[slug]` segment makes this the only dynamic route in the
 * app: every card click blocked on an on-demand render in the function's region
 * (US East) while the visitor waited, 1.8s warm and ~8.6s cold, with no loading
 * state to cover it. The direct /casestudy/* pages were static all along, so the
 * modal was the slow way into content the CDN was already serving.
 *
 * The four slugs are a fixed set, so they prerender at build like everything
 * else. `dynamicParams = false` makes anything outside that set a static 404
 * rather than a function invocation.
 */
export function generateStaticParams() {
  return Object.keys(caseStudyPages).map((slug) => ({ slug }))
}

export const dynamicParams = false

export default async function CaseStudyModalPage({ params }) {
  const { slug } = await params
  const loader = caseStudyPages[slug]
  if (!loader) notFound()

  const { default: PageContent } = await loader()

  return (
    <CaseStudyModal>
      <PageContent />
    </CaseStudyModal>
  )
}
