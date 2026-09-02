import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Download, FileText, Globe, MapPin, Clock, Check, ArrowRight, User, Target, Code,
  Briefcase, Rocket, Wrench, GraduationCap, Award, Trophy, Languages, Cpu, Phone, Users, Sparkles,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { IMAGES, CONTACT } from '@/components/portfolio/shared';

const expertise = ['Website Development', 'UI/UX Design', 'Artificial Intelligence', 'E-commerce Solutions', 'Branding', 'Business Strategy', 'Digital Marketing', 'SEO', 'Software Development', 'Fashion Entrepreneurship'];

const highlights = [
  { icon: User, label: 'Professional Profile' },
  { icon: Target, label: 'Career Objective' },
  { icon: Code, label: 'Technical Skills' },
  { icon: Briefcase, label: 'Professional Experience' },
  { icon: Rocket, label: 'Featured Projects' },
  { icon: Wrench, label: 'Services' },
  { icon: GraduationCap, label: 'Education' },
  { icon: Award, label: 'Certifications' },
  { icon: Trophy, label: 'Awards & Achievements' },
  { icon: Languages, label: 'Languages' },
  { icon: Cpu, label: 'Tools & Technologies' },
  { icon: Phone, label: 'Contact Information' },
  { icon: Users, label: 'References (Available Upon Request)' },
];

const downloads = [
  { type: 'PDF', name: 'Professional Resume (PDF)', desc: 'Optimized for sharing with employers, clients, and business partners.', button: 'Download PDF Resume', size: '~250 KB' },
  { type: 'CV', name: 'Curriculum Vitae (CV)', desc: 'Detailed professional background including projects, skills, and experience.', button: 'Download CV', size: '~320 KB' },
  { type: 'Online', name: 'Online Resume', desc: 'View the latest version directly on this website.', button: 'View Online Resume', size: 'Web' },
];

export default function Resume() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Download</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Resume / Curriculum Vitae</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Download my professional resume to learn more about my experience, technical skills, projects, services, and career journey.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">My resume provides a comprehensive overview of my professional background, technical expertise, entrepreneurial journey, projects, and the services I provide. Whether you're a potential client, employer, business partner, or collaborator, you're welcome to download a copy.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">
          {/* Profile card */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-strong rounded-3xl p-8 flex flex-col items-center text-center h-fit lg:sticky lg:top-28">
            <div className="relative mb-5">
              <div className="absolute -inset-2 bg-gradient-to-br from-vapor/30 to-blue-500/20 rounded-full blur-md" />
              <img src={IMAGES.portrait} alt="Mbabazi Blessing" className="relative w-32 h-32 rounded-full object-cover border-2 border-vapor/30" />
            </div>
            <h3 className="font-heading text-2xl font-light text-alabaster mb-2">Mbabazi Blessing</h3>
            <p className="text-vapor text-xs font-mono mb-4 leading-relaxed">Fashion Entrepreneur | Full-Stack Web Developer | UI/UX Designer | Brand Strategist | AI Solutions Developer | Digital Innovator</p>
            <div className="flex items-center gap-1.5 text-graphite text-xs mb-3"><MapPin size={13} className="text-vapor" /> Uganda</div>
            <div className="flex items-center gap-2 mb-5"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-alabaster text-xs font-light">Available for Freelance, Contract, Remote, and Business Projects.</span></div>
            <div className="w-full mb-5">
              <p className="font-mono text-[10px] text-vapor uppercase tracking-wider mb-2">Primary Expertise</p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {expertise.map((e) => <span key={e} className="px-2 py-1 rounded-md bg-white/5 text-graphite text-[10px] font-mono">{e}</span>)}
              </div>
            </div>
            <button disabled className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-white/5 text-graphite/50 cursor-not-allowed">Resume will be available soon</button>
          </motion.div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Highlights */}
            <div>
              <div className="flex items-center gap-2 mb-5"><FileText size={16} className="text-vapor" /><h3 className="font-heading text-2xl font-light text-alabaster">Resume Highlights</h3></div>
              <div className="grid sm:grid-cols-2 gap-3">
                {highlights.map((h, i) => { const Icon = h.icon; return (
                  <motion.div key={h.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass rounded-xl px-4 py-3.5 flex items-center gap-3 hover:border-vapor/20 hover:-translate-y-0.5 transition-all duration-500">
                    <div className="w-9 h-9 rounded-lg bg-vapor/10 flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-vapor" /></div>
                    <span className="text-alabaster text-xs font-light">{h.label}</span>
                  </motion.div>
                ); })}
              </div>
            </div>

            {/* Download options */}
            <div>
              <div className="flex items-center gap-2 mb-5"><Download size={16} className="text-vapor" /><h3 className="font-heading text-2xl font-light text-alabaster">Download Options</h3></div>
              <div className="space-y-4">
                {downloads.map((d, i) => (
                  <motion.div key={d.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-11 h-11 rounded-xl bg-vapor/10 flex items-center justify-center flex-shrink-0"><FileText size={20} className="text-vapor" /></div>
                      <div>
                        <h4 className="text-alabaster font-medium text-sm mb-1">{d.name}</h4>
                        <p className="text-graphite text-xs font-light mb-1.5">{d.desc}</p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-graphite/60">
                          <span className="flex items-center gap-1"><FileText size={10} /> {d.type}</span>
                          <span className="flex items-center gap-1"><Download size={10} /> {d.size}</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> Jul 2026</span>
                        </div>
                      </div>
                    </div>
                    {d.type === 'Online' ? (
                      <Link to="/resume" className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-vapor text-white hover:bg-vapor/90 transition flex-shrink-0">{d.button} <ArrowRight size={13} /></Link>
                    ) : (
                      <button disabled className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/5 text-graphite/50 cursor-not-allowed flex-shrink-0">{d.button}</button>
                    )}
                  </motion.div>
                ))}
              </div>
              <p className="text-graphite/60 text-xs font-light mt-4 flex items-center gap-2"><Clock size={12} className="text-vapor" /> The online version of my resume is regularly updated to reflect new projects, skills, certifications, and professional achievements.</p>
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-3"><Sparkles size={18} className="text-vapor" /><h3 className="font-heading text-xl font-light text-alabaster">Interested in working together?</h3></div>
              <p className="text-graphite font-light text-sm mb-5">Download my resume or schedule a consultation to discuss your project.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button disabled className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white/5 text-graphite/50 cursor-not-allowed"><Download size={15} /> Download Resume</button>
                <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-vapor text-white rounded-xl text-sm font-medium hover:bg-vapor/90 transition">Book a Consultation <ArrowRight size={15} /></a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}