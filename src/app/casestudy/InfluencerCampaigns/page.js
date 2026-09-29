import { pageMetadata } from '../../lib/seo'
import InfluencerContent from './InfluencerContent'

export const metadata = pageMetadata({
  title: "Influencer Campaign Management | Tom Spencer",
  description:
    "Designing a full influencer campaign platform for Rakuten Advertising — from prototype to prospect demo in 5 days, concept to production in 5 months.",
  path: '/casestudy/InfluencerCampaigns',
})

export default function Page() {
    return <InfluencerContent />
}
