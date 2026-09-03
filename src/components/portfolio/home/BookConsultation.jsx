import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Calendar, CreditCard, MailCheck, Video, ArrowRight, Check,
  Globe, ShoppingCart, PenTool, Tag, Bot, Megaphone, TrendingUp, Briefcase, Sparkles,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const steps = [
  { icon: Search, title: 'Choose a Service', desc: 'Select the consultation service that matches your project or business needs.' },
  { icon: Calendar, title: 'Book a Date & Time', desc: 'Choose an available date and time that works for you through Calendly.' },
  { icon: CreditCard, title: 'Complete Payment', desc: 'Securely complete your payment (where applicable) to confirm your booking.' },
  { icon: MailCheck, title: 'Receive Confirmation', desc: "You'll receive an email confirmation with your Google Meet link and meeting details." },
  { icon: Video, title: 'Attend Your Consultation', desc: 'Join the meeting on time and receive personalized guidance and recommendations.' },
];

const consultations = [
  { icon: Globe, name: 'Website Design Consultation', duration: '2 Hours', price: '$50 USD', link: 'https://calendly.com/mbabaziblessing/website-design-consultation', desc: 'Project planning, website strategy, and UI/UX recommendations.' },
  { icon: Sparkles, name: 'Fashion Business Consultation', duration: '1 Hour', price: '$50 USD', link: 'https://calendly.com/mbabaziblessing/fashion-business-consultation', desc: 'Fashion business strategy, branding advice, and growth guidance.' },
  { icon: PenTool, name: 'Logo & Brand Identity Consultation', duration: '1 Hour', price: '$40 USD', link: 'https://calendly.com/mbabaziblessing/logo-brand-identity-consultation', desc: 'Brand strategy, logo planning, colour palette, and typography.' },
  { icon: ShoppingCart, name: 'E-commerce Store Consultation', duration: '2 Hours', price: '$80 USD', link: 'https://calendly.com/mbabaziblessing/ecommerce-store-setup', desc: 'Store planning, payment integration, and growth strategy.' },
  { icon: Megaphone, name: 'Digital Marketing Consultation', duration: '1 Hour', price: '$50 USD', link: 'https://calendly.com/mbabaziblessing/digital-marketing-strategy', desc: 'Marketing strategy, social media, SEO, and content recommendations.' },
  { icon: Search, name: 'SEO Consultation', duration: '1 Hour', price: '$60 USD', link: 'https://calendly.com/mbabaziblessing/seo-consultation', desc: 'SEO audit, keyword strategy, technical SEO, and optimization.' },
  { icon: Bot, name: 'AI Automation & Chatbot Consultation', duration: '2 Hours', price: '$100 USD', link: 'https://calendly.com/mbabaziblessing/ai-automation-consultation', desc: 'AI strategy, chatbot planning, OpenAI integration, and automation.', badge: 'Most Popular' },
  { icon: TrendingUp, name: 'Business Growth Strategy Consultation', duration: '2 Hours', price: '$100 USD', link: 'https://calendly.com/mbabaziblessing/business-growth-strategy', desc: 'Business planning, growth strategy, and digital transformation.', badge: 'Best Value' },
  { icon: Briefcase, name: 'Free Discovery Call', duration: '15 Minutes', price: 'FREE', link: 'https://calendly.com/mbabaziblessing/free-discovery-call', desc: 'Introduction, project overview, and service recommendation.', badge: 'Start Here' },
];

const whyBook = [
  'Personalized one-on-one consultation', 'Professional recommendations tailored to your goals', 'Practical solutions you can implement immediately',
  'Modern technology and business expertise', 'Secure online meetings via Google Meet', 'Flexible scheduling through Calendly', 'Clear action plan after every consultation',
];

const paymentInfo = [
  'Payment is required before confirming paid consultations.', 'Payments are processed securely through PayPal.', 'Google Meet links are sent automatically after booking.',
  'Rescheduling is available up to 24 hours before the meeting.', 'Consultation fees are non-refundable unless cancelled by the host.',
];

export default function BookConsultation() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Book a Session</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Book a Consultation</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Schedule a one-on-one consultation to discuss your project, business, or digital solution. Select the service that best fits your needs and book a convenient time.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">Whether you need a professional website, AI integration, branding, business strategy, or fashion business guidance, I provide personalized consultations to help you achieve your goals. Every consultation is conducted online through Google Meet and can be booked instantly using Calendly.</p>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-vapor/40 to-transparent" />
            <h3 className="font-heading text-2xl font-light text-alabaster">How It Works</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-vapor/40 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 text-center hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500">
                  <div className="w-11 h-11 rounded-xl bg-vapor/10 flex items-center justify-center mx-auto mb-3">
                    <Icon size={20} className="text-vapor" />
                  </div>
                  <span className="font-mono text-[10px] text-vapor tracking-[0.2em]">STEP {i + 1}</span>
                  <h4 className="text-alabaster font-medium text-sm mt-1 mb-2">{s.title}</h4>
                  <p className="text-graphite text-xs font-light leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Available consultations */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-vapor/40 to-transparent" />
            <h3 className="font-heading text-2xl font-light text-alabaster">Available Consultations</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-vapor/40 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {consultations.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.08 }} className={`relative glass rounded-2xl p-6 flex flex-col hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 ${c.badge === 'Most Popular' ? 'ring-1 ring-vapor/20' : ''}`}>
                  {c.badge && <span className="absolute -top-2.5 right-4 px-2.5 py-1 rounded-full bg-vapor text-white text-[9px] font-mono uppercase tracking-wider whitespace-nowrap">{c.badge}</span>}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-vapor/10 flex items-center justify-center"><Icon size={20} className="text-vapor" /></div>
                    <span className="font-mono text-[10px] text-graphite flex items-center gap-1"><Tag size={10} /> {c.duration}</span>
                  </div>
                  <h4 className="text-alabaster font-medium text-sm mb-2 leading-snug">{c.name}</h4>
                  <p className="text-graphite text-xs font-light leading-relaxed mb-4">{c.desc}</p>
                  <div className="flex items-center justify-between mb-4 mt-auto">
                    <span className={`font-heading text-xl font-light ${c.price === 'FREE' ? 'gradient-text' : 'text-alabaster'}`}>{c.price}</span>
                  </div>
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition ${c.price === 'FREE' ? 'bg-vapor text-white hover:bg-vapor/90' : 'glass text-alabaster hover:bg-white/10'}`}>Book Now <ArrowRight size={14} /></a>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Why book + payment */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="glass rounded-2xl p-7">
            <h3 className="font-heading text-xl font-light text-alabaster mb-5">Why Book With Me</h3>
            <ul className="space-y-2.5">
              {whyBook.map((w) => (
                <li key={w} className="flex items-start gap-2 text-graphite text-sm font-light"><Check size={15} className="text-vapor mt-0.5 flex-shrink-0" /> {w}</li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-7">
            <h3 className="font-heading text-xl font-light text-alabaster mb-5">Payment Information</h3>
            <ul className="space-y-2.5">
              {paymentInfo.map((p) => (
                <li key={p} className="flex items-start gap-2 text-graphite text-sm font-light"><Check size={15} className="text-vapor mt-0.5 flex-shrink-0" /> {p}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-3">Ready to start your next project?</h3>
          <p className="text-graphite font-light mb-6">Book your consultation today and let's build something exceptional together.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://calendly.com/mbabaziblessing/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-vapor-dark text-white rounded-xl font-medium text-sm hover:bg-vapor transition">Book a Consultation <ArrowRight size={15} /></a>
            <Link to="/services" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">View All Services</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}