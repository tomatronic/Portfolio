import { LISTED_CASE_STUDIES } from './lib/caseStudies'

const BASE_URL = 'https://www.tomspencer.design'

export default function sitemap() {
  const routes = ['', '/about', ...LISTED_CASE_STUDIES.map((cs) => cs.href)]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
