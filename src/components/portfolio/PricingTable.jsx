import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Starter',
    price: '$150',
    period: '/ project',
    desc: 'Perfect for small businesses and personal brands needing a quick, professional online presence.',
    features: [
      '1-3 page responsive website',
      'Basic SEO setup',
      'Mobile-friendly design',
      'Contact form integration',
      '5 days delivery',
      '2 revision rounds',
    ],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$450',
    period: '/ project',
    desc: 'A complete solution for growing businesses that need a polished, full-featured website.',
    features: [
      'Up to 10 custom pages',
      'Advanced SEO optimization',
      'Brand identity consultation',
      'CMS integration',
      'Performance optimization',
      'Unlimited revisions',
      '30 days post-launch support',
    ],
    popular: true,
    cta: 'Choose Professional',
  },
  {
    name: 'Premium',
    price: '$900',
    period: '/ project',
    desc: 'Full-stack development and brand strategy for enterprises and established brands.',
    features: [
      'Custom web application',
      'E-commerce integration',
      'UI/UX design system',
      'Complete brand identity',
      'Digital marketing setup',
      'Priority support',
      '90 days post-launch support',
    ],
    popular: false,
    cta: 'Go Premium',
  },
];

export default function PricingTable() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className={`relative rounded-2xl p-8 transition-all duration-500 ${
            plan.popular
              ? 'glass-strong border-vapor/30 shadow-lg shadow-vapor/10 lg:scale-105'
              : 'glass hover:border-vapor/20'
          }`}
        >
          {plan.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-vapor text-white text-[10px] font-mono uppercase tracking-wider rounded-full flex items-center gap-1">
              <Sparkles size={10} /> Most Popular
            </span>
          )}
          <h3 className="font-heading text-2xl font-light text-alabaster mb-1">{plan.name}</h3>
          <p className="text-graphite text-sm font-light mb-5">{plan.desc}</p>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="font-mono text-4xl font-semibold text-alabaster">{plan.price}</span>
            <span className="text-graphite text-sm font-light">{plan.period}</span>
          </div>
          <ul className="space-y-3 mb-8">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-graphite font-light">
                <Check size={16} className="text-vapor flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className={`block text-center px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              plan.popular
                ? 'bg-vapor text-white hover:bg-vapor/90'
                : 'glass text-alabaster hover:bg-white/10'
            }`}
          >
            {plan.cta}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}