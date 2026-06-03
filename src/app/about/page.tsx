'use client';

import AboutHero from '../../components/about/AboutHero';
import Skills from '../../components/about/Skills';
import Experience from '../../components/about/Experience';
import Journey from '../../components/about/Journey';

export default function About() {
  return (
    <div>
      <AboutHero />
      <Skills />
      <Experience />
      <Journey />
    </div>
  );
}
