/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF first, WebP fallback. AVIF is typically 20–30% smaller than WebP at
    // equivalent quality; Next serves whichever format the browser accepts.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
