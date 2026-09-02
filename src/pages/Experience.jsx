import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { IMAGES } from '@/components/portfolio/shared';
import PageHero from '@/components/portfolio/PageHero';

const experiences = [
  {
    title: 'Founder & CEO', company: 'Bless Fashion House', period: '2021 — Present',
    desc: 'Founded and lead a fashion brand specializing in contemporary African designs, managing everything from sourcing and production to digital marketing and e-commerce.',
    responsibilities: ['Brand strategy and product development', 'E-commerce platform management', 'Team leadership and vendor relations', 'Digital marketing and content creation'],
  },
  {
    title: 'Freelance Web Developer', company: 'Self-Employed', period: '2020 — Present',
    desc: 'Building high-performance websites and web applications for clients across East Africa and internationally, specializing in React, Next.js, and full-stack solutions.',
    responsibilities: ['Full-stack web development', 'Client consultation and project scoping', 'Performance optimization and SEO', 'Ongoing maintenance and support'],
  },
  {
    title: 'UI/UX Designer', company: 'Freelance', period: '2020 — Present',
    desc: 'Designing intuitive and beautiful user interfaces for web and mobile applications, conducting user research, and creating scalable design systems.',
    responsibilities: ['User research and wireframing', 'High-fidelity prototyping in Figma', 'Design system creation', 'Usability testing and iteration'],
  },
  {
    title: 'Digital Marketing Consultant', company: 'Various Clients', period: '2019 — Present',
    desc: 'Developing and executing digital marketing strategies including SEO, social media, content marketing, and paid advertising campaigns.',
    responsibilities: ['SEO strategy and implementation', 'Social media campaign management', 'Content marketing planning', 'Analytics and performance reporting'],
  },
  {
    title: 'Brand Strategist', company: 'Freelance', period: '2020 — Present',
    desc: 'Creating comprehensive brand identities and strategies for startups and SMEs, including visual identity, brand voice, and market positioning.',
    responsibilities: ['Brand identity development', 'Market positioning strategy', 'Visual language design', 'Brand guideline documentation'],
  },
];

export default function Experience() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <>
      <PageHero
        title="Experience"
        subtitle="My professional journey across fashion, technology, and brand strategy — building expertise with every project."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Experience' }]}
      />
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-vapor/30 via-vapor/10 to-transparent" />
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <motion.div key={exp.title + exp.company} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="relative pl-14 sm:pl-20">
                  <div className="absolute left-2.5 sm:left-6.5 top-1.5 w-3 h-3 rounded-full bg-vapor border-2 border-obsidian shadow-lg shadow-vapor/30" />
                  <div className="glass rounded-2xl p-6 hover:border-vapor/20 transition-all duration-500 group">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h3 className="text-alabaster font-medium text-lg">{exp.title}</h3>
                        <p className="text-vapor text-sm font-light">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs text-graphite mt-1 sm:mt-0">{exp.period}</span>
                    </div>
                    <p className="text-graphite text-sm font-light leading-relaxed mb-4">{exp.desc}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {exp.responsibilities.map((r, ri) => (
                        <div key={ri} className="flex items-start gap-2 text-xs text-graphite font-light">
                          <span className="text-vapor mt-0.5">▸</span>{r}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}