import ConceptAbout from './ConceptAbout'

export async function generateMetadata() {
  return {
    title: 'Concept: About — not part of the live site',
    robots: { index: false, follow: false },
  }
}

export default function ConceptAboutPage() {
  return <ConceptAbout />
}
