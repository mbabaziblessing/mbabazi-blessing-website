import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Download } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/portfolio/PageHero';

const certs = [
  { title: 'Full-Stack Web Development', org: 'freeCodeCamp', year: '2023', credential: 'FCC-FS-2023-7841', link: 'https://www.freecodecamp.org/mbabaziblessing' },
  { title: 'Responsive Web Design', org: 'freeCodeCamp', year: '2022', credential: 'FCC-RWD-2022-4521', link: 'https://www.freecodecamp.org/mbabaziblessing' },
  { title: 'JavaScript Algorithms & Data Structures', org: 'freeCodeCamp', year: '2023', credential: 'FCC-JS-2023-9201', link: 'https://www.freecodecamp.org/mbabaziblessing' },
  { title: 'Google UX Design Professional', org: 'Google / Coursera', year: '2023', credential: 'GOOG-UX-2023-1147', link: 'https://coursera.org' },
  { title: 'Digital Marketing Fundamentals', org: 'Google Digital Garage', year: '2022', credential: 'GDG-DM-2022-3301', link: 'https://learndigital.withgoogle.com' },
  { title: 'Meta Front-End Developer', org: 'Meta / Coursera', year: '2024', credential: 'META-FE-2024-8890', link: 'https://coursera.org' },
];

export default function Certifications() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <>
      <PageHero
        title="Certifications"
        subtitle="Professional credentials and qualifications that validate my expertise across development, design, and marketing."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Certifications' }]}
      />
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map((cert, i) => (
              <motion.div key={cert.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="glass rounded-2xl overflow-hidden group hover:border-vapor/20 transition-all duration-500">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-vapor/15 via-vapor/5 to-transparent flex items-center justify-center">
                  <Award size={48} className="text-vapor/60 group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-obsidian/60 text-vapor text-[10px] font-mono">{cert.year}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-alabaster font-medium text-base mb-1">{cert.title}</h3>
                  <p className="text-vapor text-sm font-light mb-2">{cert.org}</p>
                  <p className="text-graphite text-xs font-mono mb-4">ID: {cert.credential}</p>
                  <div className="flex gap-2">
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 glass text-alabaster rounded-lg text-xs font-medium hover:bg-white/10 transition flex-1 justify-center">
                      <ExternalLink size={12} /> View
                    </a>
                    <button className="flex items-center gap-1.5 px-3 py-2 glass text-alabaster rounded-lg text-xs font-medium hover:bg-white/10 transition flex-1 justify-center">
                      <Download size={12} /> Download
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
