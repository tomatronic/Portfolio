/**
 * The one place the site's identity for search engines and link previews lives.
 *
 * `pageMetadata` exists because of how Next.js merges metadata: it is shallow,
 * per top-level key, so a page that sets only `title` and `description` still
 * inherits the root layout's `openGraph` and `twitter` *wholesale*. Every case
 * study link was therefore previewing as "Tom Spencer — Senior Product
 * Designer" on LinkedIn, Slack and iMessage, whatever page had been shared —
 * the browser tab said the right thing and the preview said the wrong one.
 * Setting `openGraph` on a page replaces the root's entirely (including its
 * image), so the shape has to be complete, and it lives here once rather than
 * being repeated on six pages.
 *
 * `path` also sets the canonical URL. Omit it for the root layout, where a
 * canonical would be inherited by the 404.
 */

export const SITE_URL = 'https://www.tomspencer.design'

const SITE_NAME = 'Tom Spencer'
const OG_IMAGE = {
  url: '/ogdata.png',
  width: 1200,
  height: 630,
  alt: 'Tom Spencer — Senior Product Designer portfolio',
}

export function pageMetadata({ title, description, path, ...rest }) {
  return {
    title,
    description,
    ...(path && { alternates: { canonical: path } }),
    openGraph: {
      title,
      description,
      ...(path && { url: path }),
      siteName: SITE_NAME,
      locale: 'en_GB',
      type: 'website',
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
    ...rest,
  }
}
