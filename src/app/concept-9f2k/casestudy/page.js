import CaseStudyConcept from './CaseStudyConcept'

export async function generateMetadata() {
  return {
    title: 'Concept — case study, not part of the live site',
    robots: { index: false, follow: false },
  }
}

export default function ConceptCaseStudyPage() {
  return <CaseStudyConcept />
}
