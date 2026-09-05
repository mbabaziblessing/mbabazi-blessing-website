import { motion } from 'framer-motion';
import {
  BookOpen, Lightbulb, Briefcase, Sparkles,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { journeySteps } from '@/data/journey';

const summary = [
  { icon: BookOpen, title: 'Learning', desc: 'Continuously improving my technical and business knowledge.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'Creating practical solutions that solve real-world problems.' },
  { icon: Briefcase, title: 'Entrepreneurship', desc: 'Building sustainable businesses and digital products.' },
  { icon: Sparkles, title: 'Impact', desc: 'Helping businesses, entrepreneurs, and communities grow through technology and innovation.' },
];

export default function Journey() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3"
          >
            The Road So Far
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4"
          >
            My Journey
          </motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">
            The milestones that have shaped my journey as an entrepreneur, developer, designer, and innovator.
          </p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">
            Every achievement begins with a single step. My journey has been built through continuous learning,
            practical experience, entrepreneurship, and a commitment to solving real-world problems with technology
            and creativity. Each milestone has strengthened my skills and prepared me for larger opportunities.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* vertical line: mobile left, desktop center */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 w-px bg-gradient-to-b from-vapor/50 via-vapor/25 to-transparent md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {journeySteps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <div key={step.id} className="relative md:grid md:grid-cols-2 md:gap-16 md:py-6">
                  {/* node */}
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full glass-strong flex items-center justify-center border border-vapor/30">
                    <span className="font-mono text-xs text-vapor">{step.step}</span>
                  </div>

                  {/* card */}
                  <motion.div
                    initial={{ opacity: 0, x: left ? -24 : 24, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6 }}
                    className={`pl-14 md:pl-0 ${left ? 'md:col-start-1 md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}
                  >
                    <div className="glass rounded-2xl p-6 hover:border-vapor/25 transition-all duration-500">
                      <div className="mb-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                        <img
                          src={step.image}
                          alt={step.alt}
                          loading="lazy"
                          decoding="async"
                          className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105 sm:h-48"
                        />
                      </div>
                      <span className="font-mono text-vapor text-xs tracking-[0.3em]">STEP {step.step}</span>
                      <h3 className="font-heading text-xl sm:text-2xl font-light text-alabaster mt-1 mb-3">{step.title}</h3>
                      <p className="text-graphite text-sm font-light leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline summary */}
        <div className="mt-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-vapor/40 to-transparent" />
            <h3 className="font-heading text-xl sm:text-2xl font-light text-alabaster">Timeline Summary</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-vapor/40 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summary.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-6 hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-11 h-11 rounded-xl bg-vapor/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-vapor" />
                  </div>
                  <h4 className="text-alabaster font-medium text-sm mb-2">{s.title}</h4>
                  <p className="text-graphite text-sm font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}