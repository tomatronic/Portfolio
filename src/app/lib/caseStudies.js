/**
 * The case studies, in the order they appear on the home page.
 *
 * This is the one list. `CaseStudyCards` (home), `OtherCaseStudies` (the foot
 * of each case study) and `sitemap.js` all read from it, so adding, hiding or
 * reordering a case study is one edit rather than three that have to agree.
 *
 * `listed: false` keeps a case study's page reachable by direct URL but drops
 * it from the cards and the sitemap — Rakuten, since 2026-07-13. The modal
 * route (`@modal/(.)casestudy/[slug]`) has its own slug map because it needs
 * a dynamic `import()` per page, which can't be built from a string.
 *
 * `card` is what the home tile shows. The tints are a light wash of the
 * dominant colour in each screenshot — Rakuten purple, not an unrelated hue —
 * and they have to stay light: the tile's scrim darkens the bottom to
 * charcoal, and a pale top against a dark base is what gives it shape.
 * `stack` is the three-image fan on the compact cards.
 */
export const CASE_STUDIES = [
  {
    slug: 'Prompt',
    title: 'Natural Language Search & AI',
    listed: true,
    card: {
      descriptor: 'Plain-English reporting for 1,000+ advertisers',
      metrics: ['90% faster report creation', 'Est. $10M annual time savings'],
      image: { src: '/prompt-report.png', position: 'top' },
      tint: '#E6E0F5',
    },
    stack: ['/prompt_1.png', '/prompt_2.png', '/prompt_3.png'],
  },
  {
    slug: 'InfluencerCampaigns',
    title: 'Influencer Campaign Platform',
    listed: true,
    card: {
      descriptor: 'Concept to production in five months',
      metrics: ['Prototype in 5 days', 'Shipped in 5 months'],
      image: { src: '/influencer-campaign.png', position: 'top' },
      tint: '#F5E1EA',
    },
    stack: ['/influencer_1.png', '/influencer_2.png', '/influencer_3.png'],
  },
  {
    slug: 'ACJ',
    title: 'Multi-Touch Attribution for Affiliate',
    listed: true,
    card: {
      descriptor: 'How every channel contributes across 15 interactions',
      metrics: ['Clarified complex journeys', 'Key differentiator in pitches'],
      image: { src: '/acj-touchpoints.png', position: 'top' },
      tint: '#DEE5F7',
    },
    stack: ['/acj_1.png', '/acj_2.png', '/acj_3.png'],
  },
  {
    slug: 'Rakuten',
    title: 'Offer management',
    listed: false,
  },
].map((cs) => ({ ...cs, href: `/casestudy/${cs.slug}` }))

export const LISTED_CASE_STUDIES = CASE_STUDIES.filter((cs) => cs.listed)
