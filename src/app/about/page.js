import ConceptAbout from '../concept-9f2k/about/ConceptAbout'

export async function generateMetadata() {
  return {
    title: 'About | Tom Spencer',
    description:
      'About Tom Spencer — Senior Product Designer specialising in data-heavy enterprise tools, based in Brighton, UK.',
  }
}

export default function About() {
  return <ConceptAbout />
}
