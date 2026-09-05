import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, Tag } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const featured = [
  {
    name: 'Free Discovery Call',
    duration: '15 Minutes',
    price: 'FREE',
    includes: ['Meet and introduction', 'Project overview', 'Service recommendation', 'Questions and answers'],
    button: 'Book Free Call',
    link: 'https://calendly.com/mbabaziblessing/free-discovery-call',
    badge: 'Start Here',
  },
  {
    name: 'Website Design Consultation',
    duration: '2 Hours',
    price: '$50 USD',
    includes: ['Project planning', 'Website strategy', 'UI/UX recommendations', 'Technology recommendations', 'Questions & answers'],
    button: 'Book Now',
    link: 'https://calendly.com/mbabaziblessing/website-design-consultation',
  },
  {
    name: 'AI Automation & Chatbot Consultation',
    duration: '2 Hours',
    price: '$100 USD',
    includes: ['AI strategy', 'Chatbot planning', 'OpenAI integration', 'Automation roadmap'],
    button: 'Book Now',
    link: 'https://calendly.com/mbabaziblessing/ai-automation-consultation',
    badge: 'Most Popular',
  },
];

export default function Pricing() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Featured Plans</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Pricing</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Transparent consultation pricing designed for individuals, entrepreneurs, startups, and businesses seeking professional technology, branding, AI, and business solutions.</p>
          <p className="text-graphite/80 text-sm font-light max-w-2xl mx-auto mt-4 leading-relaxed">Choose the consultation that best matches your needs. Every session is conducted professionally through Google Meet and must be booked in advance using Calendly. All prices are in United States Dollars (USD).</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {featured.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`relative glass rounded-3xl p-7 flex flex-col hover:-translate-y-1.5 transition-all duration-500 ${plan.badge === 'Most Popular' ? 'border-vapor/40 ring-1 ring-vapor/20' : 'hover:border-vapor/25'}`}>
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-vapor text-white text-[10px] font-mono uppercase tracking-wider whitespace-nowrap">{plan.badge}</span>
              )}
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase flex items-center gap-1"><Tag size={11} /> Consultation</span>
                <span className="font-mono text-[10px] text-graphite flex items-center gap-1"><Clock size={11} /> {plan.duration}</span>
              </div>
              <h3 className="font-heading text-xl font-light text-alabaster mb-3 leading-snug">{plan.name}</h3>
              <div className="mb-5">
                <span className={`font-heading text-4xl font-light ${plan.price === 'FREE' ? 'gradient-text' : 'text-alabaster'}`}>{plan.price}</span>
              </div>
              <ul className="space-y-2.5 mb-6 mt-auto">
                {plan.includes.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-graphite text-sm font-light">
                    <Check size={14} className="text-vapor mt-0.5 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a href={plan.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition ${plan.price === 'FREE' ? 'bg-vapor text-white hover:bg-vapor/90' : 'glass text-alabaster hover:bg-white/10'}`}>{plan.button} <ArrowRight size={15} /></a>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/pricing" className="inline-flex items-center gap-2 px-7 py-3.5 glass-strong text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition group">
            View All Services & Pricing <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
}