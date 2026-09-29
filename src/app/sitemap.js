import { LISTED_CASE_STUDIES } from './lib/caseStudies'
import { SITE_URL } from './lib/seo'

export default function sitemap() {
  const routes = ['', '/about', ...LISTED_CASE_STUDIES.map((cs) => cs.href)]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
