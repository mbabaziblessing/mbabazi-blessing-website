import { Link } from 'react-router-dom';
import { Check, Headphones, Video, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const packages = [
  {
    name: 'Quick Call',
    icon: Video,
    price: '$25',
    period: '/ 30 min',
    desc: 'A focused one-on-one video call to discuss a specific question or get quick advice.',
    features: [
      '30-minute video consultation',
      'Screen sharing',
      'Action notes after call',
      'Best for quick decisions',
    ],
    popular: false,
    cta: 'Book a Call',
  },
  {
    name: 'Strategy Session',
    icon: Headphones,
    price: '$60',
    period: '/ 60 min',
    desc: 'An in-depth consultation covering project planning, tech stack, and brand strategy.',
    features: [
      '60-minute deep-dive call',
      'Project roadmap outline',
      'Tech & design recommendations',
      'Follow-up summary email',
    ],
    popular: true,
    cta: 'Book Strategy Session',
  },
  {
    name: 'Team Workshop',
    icon: Users,
    price: '$200',
    period: '/ 3 hours',
    desc: 'A guided workshop for teams covering design systems, best practices, and workflow.',
    features: [
      '3-hour live workshop',
      'Up to 8 team members',
      'Custom agenda & materials',
      'Recording & resources',
    ],
    popular: false,
    cta: 'Request Workshop',
  },
];

export default function ConsultationPackages() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {packages.map((pkg, i) => {
        const Icon = pkg.icon;
        return (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative rounded-2xl p-8 transition-all duration-500 ${
              pkg.popular
                ? 'glass-strong border-vapor/30 shadow-lg shadow-vapor/10 lg:scale-105'
                : 'glass hover:border-vapor/20'
            }`}
          >
            {pkg.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-vapor text-white text-[10px] font-mono uppercase tracking-wider rounded-full flex items-center gap-1">
                <Sparkles size={10} /> Best Value
              </span>
            )}
            <div className="w-11 h-11 rounded-xl bg-vapor/10 flex items-center justify-center mb-4">
              <Icon size={22} className="text-vapor" />
            </div>
            <h3 className="font-heading text-2xl font-light text-alabaster mb-1">{pkg.name}</h3>
            <p className="text-graphite text-sm font-light mb-5">{pkg.desc}</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="font-mono text-4xl font-semibold text-alabaster">{pkg.price}</span>
              <span className="text-graphite text-sm font-light">{pkg.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-graphite font-light">
                  <Check size={16} className="text-vapor flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className={`block text-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                pkg.popular
                  ? 'bg-vapor text-white hover:bg-vapor/90'
                  : 'glass text-alabaster hover:bg-white/10'
              }`}
            >
              {pkg.cta}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}