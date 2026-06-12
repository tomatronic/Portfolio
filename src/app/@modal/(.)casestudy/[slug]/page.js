import { notFound } from 'next/navigation'
import CaseStudyModal from './CaseStudyModal'

const caseStudyPages = {
  Prompt:              () => import('../../../casestudy/Prompt/page'),
  ACJ:                 () => import('../../../casestudy/ACJ/page'),
  Rakuten:             () => import('../../../casestudy/Rakuten/page'),
  InfluencerCampaigns: () => import('../../../casestudy/InfluencerCampaigns/page'),
}

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
