import React from 'react';
import { motion } from 'framer-motion';
import {
  Target, Eye, Lightbulb, Award, ShieldCheck, HeartHandshake,
  BookOpen, Palette, Users, Crown, Sparkles, Flag,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  { icon: Lightbulb, title: 'Innovation', desc: 'I continuously seek creative ideas, modern technologies, and better ways to solve problems and deliver value.' },
  { icon: Award, title: 'Excellence', desc: 'I am committed to delivering high-quality work with professionalism, attention to detail, and continuous improvement.' },
  { icon: ShieldCheck, title: 'Integrity', desc: 'I believe in honesty, transparency, accountability, and building long-term trust with clients, partners, and communities.' },
  { icon: HeartHandshake, title: 'Customer Success', desc: 'My priority is understanding client needs and delivering solutions that create measurable value and long-term success.' },
  { icon: BookOpen, title: 'Continuous Learning', desc: 'Technology evolves every day. I continuously improve my knowledge, skills, and expertise to stay ahead of industry trends.' },
  { icon: Palette, title: 'Creativity', desc: 'I combine technology, design, and business strategy to develop unique, practical, and visually appealing solutions.' },
  { icon: Users, title: 'Collaboration', desc: 'Great ideas are built together. I value teamwork, partnerships, communication, and mutual respect.' },
  { icon: Crown, title: 'Leadership', desc: 'I strive to inspire others through innovation, responsibility, professionalism, and positive influence.' },
  { icon: Sparkles, title: 'Impact', desc: 'Every project I build should improve businesses, empower people, and create meaningful, lasting change.' },
];

function PillCard({ children, icon: Icon, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="glass rounded-3xl p-7 sm:p-9 hover:border-vapor/25 transition-all duration-500"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${accent}`}>
          <Icon size={22} className="text-vapor" />
        </div>
        <h3 className="font-heading text-2xl font-light text-alabaster">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function MissionVisionValues() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3"
          >
            Guiding Principles
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4"
          >
            Mission, Vision & Values
          </motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">
            The principles that guide my work, my purpose, and my long-term vision.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <PillCard icon={Target} title="Mission" accent="bg-violet-500/15">
            <p className="text-graphite text-base font-light leading-relaxed">
              My mission is to empower businesses, entrepreneurs, and organizations by creating innovative digital
              solutions, modern websites, AI-powered technologies, professional brands, and scalable business
              systems that solve real-world problems, improve lives, and contribute to sustainable economic growth.
            </p>
          </PillCard>
          <PillCard icon={Eye} title="Vision" accent="bg-blue-500/15">
            <p className="text-graphite text-base font-light leading-relaxed">
              My vision is to become one of Africa's leading technology entrepreneurs by building globally
              recognized companies in software development, artificial intelligence, fashion, e-commerce, digital
              innovation, financial technology, and business solutions that create lasting impact worldwide.
            </p>
          </PillCard>
        </div>

        {/* Core Values */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles size={16} className="text-vapor" />
            <h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">Core Values</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                  className="glass rounded-2xl p-5 hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-vapor/10 flex items-center justify-center group-hover:bg-vapor/20 transition">
                      <Icon size={18} className="text-vapor" />
                    </div>
                    <h4 className="text-alabaster font-medium text-sm">{v.title}</h4>
                  </div>
                  <p className="text-graphite text-sm font-light leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* My Commitment */}
        <PillCard icon={Flag} title="My Commitment" accent="bg-vapor/15">
          <p className="text-graphite text-base font-light leading-relaxed">
            I am committed to building reliable digital solutions that combine technology, creativity, business
            strategy, and innovation to help businesses grow, strengthen brands, improve customer experiences, and
            create opportunities for individuals and communities.
          </p>
        </PillCard>
      </div>
    </section>
  );
}