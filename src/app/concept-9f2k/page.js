import ConceptHome from './ConceptHome'

export async function generateMetadata() {
  return {
    title: 'Concept — not part of the live site',
    robots: { index: false, follow: false },
  }
}

export default function ConceptPage() {
  return <ConceptHome />
}
