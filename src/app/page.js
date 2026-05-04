'use client';
import { motion, useReducedMotion } from 'framer-motion';
import Hero from './components/hero'
import CasestudyShowcase from './components/casestudyShowcase';
import AboutMeSection from './components/AboutMeSection';
import ExampleGallery from './components/examples';
import Testimonials from './components/Testimonials';

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const fadeUp = {
    initial:     prefersReducedMotion ? {} : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    transition:  { duration: prefersReducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    viewport:    { once: true, margin: '-80px' },
  };

  return (
    <div>
      <Hero />
      <motion.div {...fadeUp}><AboutMeSection /></motion.div>
      <motion.div {...fadeUp}><CasestudyShowcase /></motion.div>
      <motion.div {...fadeUp}><Testimonials /></motion.div>
      {/* <motion.div {...fadeUp}><ExampleGallery /></motion.div> */}
    </div>
  );
}