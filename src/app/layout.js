import "./globals.css";
import Navigation from './components/navigation';
import Footer from "./components/footer";
import PageBackground from './components/PageBackground';
import ThemeProvider from './components/ThemeProvider';
import { GoogleAnalytics } from "@next/third-parties/google";
import { DM_Sans } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const SITE_URL = 'https://www.tomspencer.design'
const SITE_TITLE = 'Tom Spencer — Senior Product Designer'
const SITE_DESCRIPTION = 'Portfolio of Tom Spencer, a Senior Product Designer based in Brighton, UK — making complex, data-heavy products easy to use.'

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    icons: { icon: '/just_me.webp' },
    openGraph: {
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: 'Tom Spencer',
      locale: 'en_GB',
      type: 'website',
      images: [{ url: '/ogdata.png', width: 1200, height: 630, alt: 'Tom Spencer — Senior Product Designer portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      images: ['/ogdata.png'],
    },
  }
}

// Prevent flash of incorrect theme before React hydrates
const themeScript = `
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
`

export default function RootLayout({ children, modal }) {
  return (
    <html lang="en" className={`${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <PageBackground />
          <Navigation />
          {children}
          <Footer />
          {modal}
        </ThemeProvider>
        <GoogleAnalytics gaId="G-CCDKVM70NV" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
