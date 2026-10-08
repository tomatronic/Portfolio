import "./globals.css";
import { SiteNav, SiteFooter } from './components/SiteChrome';
import ThemeProvider from './components/ThemeProvider';
import ProductionAnalytics from "./components/ProductionAnalytics";
import { DM_Sans } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { SITE_URL, pageMetadata } from './lib/seo'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
  // 400 body, 500 medium, 600 case study titles, 700 the hero. Nothing uses 300.
  weight: ['400', '500', '600', '700'],
});

const SITE_TITLE = 'Tom Spencer — Senior Product Designer'
const SITE_DESCRIPTION = 'Portfolio of Tom Spencer, a Senior Product Designer based in Brighton, UK — making complex, data-heavy products easy to use.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: { icon: '/just_me.webp' },
  ...pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION }),
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
          <SiteNav />
          {children}
          <SiteFooter />
          {modal}
        </ThemeProvider>
        <ProductionAnalytics gaId="G-CCDKVM70NV" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
