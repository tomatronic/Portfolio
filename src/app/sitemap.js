const BASE_URL = 'https://www.tomspencer.design'

export default function sitemap() {
  const routes = [
    '',
    '/about',
    '/casestudy/Prompt',
    '/casestudy/InfluencerCampaigns',
    '/casestudy/ACJ',
  ]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
