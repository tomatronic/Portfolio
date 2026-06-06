import "./globals.css";
import Navigation from './components/navigation';
import Footer from "./components/footer";
import PageBackground from './components/PageBackground';
import ThemeProvider from './components/ThemeProvider';
import { GoogleAnalytics } from "@next/third-parties/google";
import { DM_Sans, Space_Grotesk } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
});

export async function generateMetadata() {
  return {
    title: "Tom Spencer — UX Designer",
    description: "Portfolio of Tom Spencer, a Senior UX Designer based in Brighton, UK — complex problems, clear interfaces.",
    icons: { icon: '/just_me.webp' },
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
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
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
        <GoogleAnalytics gaId="G-CCDKVM70NV" debug={true} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
