import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Phone, MapPin, GraduationCap, Briefcase, Award } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';
import { CONTACT } from '@/components/portfolio/shared';

const experience = [
  { role: 'Founder & Creative Director', company: 'Bless Fashion House', period: '2021 — Present', desc: 'Leading a Ugandan fashion brand offering bespoke tailoring, ready-to-wear collections, and corporate uniforms. Managing design, production, and e-commerce operations.' },
  { role: 'Full-Stack Web Developer', company: 'Freelance', period: '2020 — Present', desc: 'Building responsive web applications and e-commerce platforms for clients across Africa, specializing in React, modern UI/UX, and performance optimization.' },
  { role: 'UI/UX Designer', company: 'Bloom Digital Agency', period: '2022 — 2023', desc: 'Designed intuitive dashboards and user interfaces for fintech and e-commerce clients, improving team productivity and conversion rates.' },
];

const education = [
  { degree: 'BSc. Computer Science', school: 'Makerere University', period: '2019 — 2023' },
  { degree: 'Fashion Design Certificate', school: 'Margaret Trowell School', period: '2020' },
];

const certifications = [
  'Meta Front-End Developer Professional Certificate',
  'Google UX Design Professional Certificate',
  'freeCodeCamp Full Stack Certification',
  'HubSpot Digital Marketing Certification',
];

const skills = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 'Figma', 'MongoDB', 'SEO', 'Brand Strategy', 'Fashion Design', 'Digital Marketing'];

export default function Resume() {
  return (
    <>
      <PageHero
        title="Resume / CV"
        subtitle="A complete overview of my professional journey, education, certifications, and skills."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Resume / CV' }]}
      />

      {/* Summary + Download */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="lg:col-span-2 glass rounded-2xl p-8">
              <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Professional Summary</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-4">Mbabazi Blessing</h2>
              <p className="text-graphite text-sm font-light leading-relaxed mb-6">
                Multidisciplinary creative and entrepreneur based in Kampala, Uganda. Bridging the worlds of fashion and technology through Bless Fashion House and freelance web development. Five years of experience building digital products and a growing fashion brand, with a track record of delivering measurable results for clients.
              </p>
              <a href={CONTACT.email ? `mailto:${CONTACT.email}` : '#'} className="inline-flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">
                <Download size={16} /> Download Full CV (PDF)
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-8 space-y-5">
              <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase">Contact</p>
              <div className="flex items-start gap-3 text-graphite text-sm font-light">
                <Mail size={16} className="text-vapor flex-shrink-0 mt-0.5" />
                <span className="break-all">{CONTACT.email}</span>
              </div>
              <div className="flex items-start gap-3 text-graphite text-sm font-light">
                <Phone size={16} className="text-vapor flex-shrink-0 mt-0.5" />
                <span>{CONTACT.phone}</span>
              </div>
              <div className="flex items-start gap-3 text-graphite text-sm font-light">
                <MapPin size={16} className="text-vapor flex-shrink-0 mt-0.5" />
                <span>{CONTACT.location}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase size={20} className="text-vapor" />
            <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">Work Experience</h2>
          </div>
          <div className="space-y-5">
            {experience.map((e, i) => (
              <motion.div key={e.role} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
                <div className="flex flex-wrap justify-between gap-2 mb-2">
                  <h3 className="text-alabaster font-medium">{e.role}</h3>
                  <span className="font-mono text-xs text-vapor">{e.period}</span>
                </div>
                <p className="text-vapor text-sm font-light mb-3">{e.company}</p>
                <p className="text-graphite text-sm font-light leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Certifications */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <GraduationCap size={20} className="text-vapor" />
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">Education</h2>
            </div>
            <div className="space-y-5">
              {education.map((e) => (
                <motion.div key={e.degree} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-6">
                  <h3 className="text-alabaster font-medium mb-1">{e.degree}</h3>
                  <p className="text-vapor text-sm font-light mb-2">{e.school}</p>
                  <span className="font-mono text-xs text-graphite">{e.period}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Award size={20} className="text-vapor" />
              <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">Certifications</h2>
            </div>
            <div className="glass rounded-2xl p-6 space-y-3">
              {certifications.map((c) => (
                <div key={c} className="flex items-start gap-3 text-graphite text-sm font-light">
                  <span className="text-vapor mt-1.5 w-1.5 h-1.5 rounded-full bg-vapor flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-8">Core Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }} className="px-4 py-2 glass rounded-xl text-graphite text-sm font-mono hover:text-vapor hover:border-vapor/20 transition cursor-default">
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}