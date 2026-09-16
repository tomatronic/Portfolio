/** @type {import('next').NextConfig} */
const nextConfig = {
  // Baseline hardening headers, applied to every route. Vercel already sends
  // HSTS on custom domains; these cover what it doesn't. There is no CSP —
  // the GA and Vercel Analytics scripts would need nonces or hashes, and for
  // a static site with no user input the four below are the ones that matter.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Stop browsers sniffing a response into a different content type.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Never render this site inside another site's frame.
          { key: 'X-Frame-Options', value: 'DENY' },
          // Send the origin, not the full URL, on cross-origin navigations.
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Nothing here needs a camera, mic, or location.
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  images: {
    // AVIF first, WebP fallback. AVIF is typically 20–30% smaller than WebP at
    // equivalent quality; Next serves whichever format the browser accepts.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
