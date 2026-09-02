import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, Tag, ShieldCheck, CreditCard, Calendar, RotateCcw, Lock } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const plans = [
  { name: 'Free Discovery Call', duration: '15 Minutes', price: 'FREE', includes: ['Meet and introduction', 'Project overview', 'Service recommendation', 'Questions and answers'], button: 'Book Free Call', link: 'https://calendly.com/mbabaziblessing/free-discovery-call', suitable: ['New clients', 'Initial introductions', 'Project discussions', 'Service recommendations'], badge: 'Start Here' },
  { name: 'Website Design Consultation', duration: '2 Hours', price: '$50 USD', includes: ['Project planning', 'Website strategy', 'UI/UX recommendations', 'Technology recommendations', 'Questions & answers'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/website-design-consultation' },
  { name: 'Fashion Business Consultation', duration: '1 Hour', price: '$50 USD', includes: ['Fashion business strategy', 'Branding advice', 'Marketing guidance', 'Growth recommendations'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/fashion-business-consultation' },
  { name: 'Logo & Brand Identity Consultation', duration: '1 Hour', price: '$40 USD', includes: ['Brand strategy', 'Logo planning', 'Colour palette', 'Typography', 'Brand identity recommendations'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/logo-brand-identity-consultation' },
  { name: 'E-commerce Store Consultation', duration: '2 Hours', price: '$80 USD', includes: ['Store planning', 'Platform recommendations', 'Payment integration', 'Customer experience', 'Growth strategy'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/ecommerce-store-setup' },
  { name: 'Digital Marketing Consultation', duration: '1 Hour', price: '$50 USD', includes: ['Marketing strategy', 'Social media planning', 'SEO advice', 'Content recommendations'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/digital-marketing-strategy' },
  { name: 'SEO Consultation', duration: '1 Hour', price: '$60 USD', includes: ['SEO audit', 'Keyword strategy', 'Technical SEO', 'Website optimization'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/seo-consultation' },
  { name: 'AI Automation & Chatbot Consultation', duration: '2 Hours', price: '$100 USD', includes: ['AI strategy', 'Chatbot planning', 'OpenAI integration', 'Automation roadmap'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/ai-automation-consultation', badge: 'Most Popular' },
  { name: 'Business Growth Strategy Consultation', duration: '2 Hours', price: '$100 USD', includes: ['Business planning', 'Growth strategy', 'Digital transformation', 'Technology roadmap'], button: 'Book Now', link: 'https://calendly.com/mbabaziblessing/business-growth-strategy', badge: 'Best Value' },
];

const paymentInfo = [
  { icon: CreditCard, text: 'Payment is required before confirming a consultation.' },
  { icon: Lock, text: 'Payments are securely processed through PayPal.' },
  { icon: RotateCcw, text: 'Rescheduling is available up to 24 hours before the meeting.' },
  { icon: ShieldCheck, text: 'Consultation fees are non-refundable unless cancelled by the host.' },
  { icon: Calendar, text: 'Google Meet links are automatically provided after booking confirmation.' },
];

export default function Pricing() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <>
      <PageHero
        title="Pricing"
        subtitle="Transparent consultation pricing designed for individuals, entrepreneurs, startups, and businesses seeking professional technology, branding, AI, and business solutions."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Services', path: '/services' }, { label: 'Pricing' }]}
      />

      <section ref={ref} className="relative py-16">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center text-graphite font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            Choose the consultation that best matches your needs. Every session is conducted professionally through Google Meet and must be booked in advance using Calendly. All prices are in United States Dollars (USD).
          </motion.p>

          {/* Pricing grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className={`relative glass rounded-3xl p-7 flex flex-col hover:-translate-y-1.5 transition-all duration-500 ${plan.badge === 'Most Popular' ? 'border-vapor/40 ring-1 ring-vapor/20' : 'hover:border-vapor/25'} ${plan.badge === 'Best Value' ? 'border-blue-500/40 ring-1 ring-blue-500/20' : ''}`}>
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-[10px] font-mono uppercase tracking-wider whitespace-nowrap ${plan.badge === 'Best Value' ? 'bg-blue-500' : 'bg-vapor'}`}>{plan.badge}</span>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase flex items-center gap-1"><Tag size={11} /> Consultation</span>
                  <span className="font-mono text-[10px] text-graphite flex items-center gap-1"><Clock size={11} /> {plan.duration}</span>
                </div>
                <h3 className="font-heading text-xl font-light text-alabaster mb-3 leading-snug min-h-[3rem]">{plan.name}</h3>
                <div className="mb-5">
                  <span className={`font-heading text-4xl font-light ${plan.price === 'FREE' ? 'gradient-text' : 'text-alabaster'}`}>{plan.price}</span>
                </div>
                {plan.suitable && (
                  <div className="mb-3">
                    <p className="font-mono text-[10px] text-vapor uppercase tracking-wider mb-2">Suitable For</p>
                    <div className="flex flex-wrap gap-1.5">
                      {plan.suitable.map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-white/5 text-graphite text-[10px] font-mono">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
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

          {/* Payment info */}
          <div className="glass-strong rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl font-light text-alabaster mb-6 text-center">Payment Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {paymentInfo.map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.text} className="flex items-start gap-3 glass rounded-xl p-4">
                    <div className="w-9 h-9 rounded-lg bg-vapor/10 flex items-center justify-center flex-shrink-0"><Icon size={16} className="text-vapor" /></div>
                    <p className="text-graphite text-sm font-light leading-relaxed">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/book-consultation" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">Book a Consultation <ArrowRight size={15} /></Link>
              <Link to="/contact" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">Contact Me</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}