import AboutContent from '../components/site/About'

export async function generateMetadata() {
  return {
    title: 'About | Tom Spencer',
    description:
      'About Tom Spencer — Senior Product Designer specialising in data-heavy enterprise tools, based in Brighton, UK.',
  }
}

export default function AboutPage() {
  return <AboutContent />
}
