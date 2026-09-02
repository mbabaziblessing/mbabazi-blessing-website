import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe, ShoppingCart, Palette, PenTool, Search, Bot, Megaphone, Briefcase,
  Check, ArrowRight, Sparkles, ShieldCheck,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CONTACT } from '@/components/portfolio/shared';

const services = [
  { icon: Globe, name: 'Website Design & Development', category: 'Web Development', desc: 'Design and development of modern, responsive, secure, and high-performance websites for businesses, startups, organizations, and personal brands.', includes: ['Business Websites', 'Corporate Websites', 'Portfolio Websites', 'Landing Pages', 'Custom Websites', 'Responsive Design', 'Website Maintenance'] },
  { icon: ShoppingCart, name: 'E-commerce Development', category: 'E-commerce', desc: 'Build professional online stores with secure shopping experiences, product management, payment integration, and mobile-friendly design.', includes: ['Online Stores', 'Product Catalogues', 'Shopping Cart', 'Checkout System', 'Order Management', 'Inventory Management', 'Payment Integration'] },
  { icon: Palette, name: 'UI/UX Design', category: 'Design', desc: 'Design intuitive, user-friendly, and visually appealing digital experiences that improve usability and customer satisfaction.', includes: ['User Interface Design', 'User Experience Design', 'Wireframes', 'Prototypes', 'Design Systems', 'Mobile App Design'] },
  { icon: PenTool, name: 'Brand Identity Design', category: 'Branding', desc: 'Create strong, memorable, and professional brand identities that help businesses stand out and build customer trust.', includes: ['Logo Design', 'Brand Colours', 'Typography', 'Brand Guidelines', 'Business Cards', 'Social Media Branding'] },
  { icon: Search, name: 'Search Engine Optimization (SEO)', category: 'Digital Marketing', desc: 'Improve website visibility on search engines through technical SEO, on-page optimization, content strategy, and performance improvements.', includes: ['Technical SEO', 'On-page SEO', 'Keyword Research', 'SEO Audit', 'Performance Optimization', 'Google Search Console Setup'] },
  { icon: Bot, name: 'AI Solutions & Automation', category: 'Artificial Intelligence', desc: 'Develop intelligent AI-powered solutions that automate business processes, improve customer support, and enhance productivity.', includes: ['AI Chatbots', 'AI Assistants', 'Workflow Automation', 'OpenAI Integration', 'Prompt Engineering', 'Knowledge Base Systems'] },
  { icon: Megaphone, name: 'Digital Marketing Strategy', category: 'Marketing', desc: 'Develop effective digital marketing strategies that increase brand awareness, customer engagement, and business growth.', includes: ['Social Media Strategy', 'Content Marketing', 'Facebook Marketing', 'Instagram Marketing', 'TikTok Marketing', 'Marketing Consultation'] },
  { icon: Briefcase, name: 'Business & Technology Consulting', category: 'Consulting', desc: 'Provide strategic guidance for entrepreneurs, startups, and organizations looking to leverage technology, improve operations, and grow sustainably.', includes: ['Business Strategy', 'Technology Consulting', 'Startup Guidance', 'Digital Transformation', 'Innovation Planning', 'Growth Strategy'] },
];

const whyWorkWithMe = [
  'Professional and modern solutions', 'User-focused design approach', 'Mobile-first development',
  'Secure and scalable architecture', 'Transparent communication', 'Continuous project support',
  'Quality-driven development', 'Commitment to long-term success',
];

export default function Services() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">What I Offer</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Services</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Professional services that help businesses, entrepreneurs, startups, and organizations build strong digital products, modern brands, and sustainable business solutions.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">I provide professional technology, design, branding, AI, and business consulting services tailored to help clients achieve their goals. Every service is delivered with a focus on quality, innovation, user experience, and measurable business value.</p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 4) * 0.08 }} className="glass rounded-2xl p-6 flex flex-col hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-vapor/10 flex items-center justify-center mb-4 group-hover:bg-vapor/20 transition">
                  <Icon size={22} className="text-vapor" />
                </div>
                <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase mb-2">{s.category}</span>
                <h3 className="text-alabaster font-medium text-base mb-2 leading-snug">{s.name}</h3>
                <p className="text-graphite text-sm font-light leading-relaxed mb-4">{s.desc}</p>
                <ul className="space-y-1.5 mb-5 mt-auto">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-graphite/80 text-xs font-light">
                      <Check size={13} className="text-vapor mt-0.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-2">
                  <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-vapor text-white rounded-xl text-xs font-medium hover:bg-vapor/90 transition">Book Consultation <ArrowRight size={13} /></a>
                  <Link to="/book-consultation" className="flex items-center justify-center gap-1.5 px-4 py-2.5 glass text-alabaster rounded-xl text-xs font-medium hover:bg-white/10 transition">Learn More</Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Why work with me */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles size={16} className="text-vapor" />
            <h3 className="font-heading text-2xl font-light text-alabaster">Why Work With Me</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {whyWorkWithMe.map((w, i) => (
              <motion.div key={w} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl px-4 py-3.5 flex items-center gap-2.5 hover:border-vapor/20 transition-all duration-500">
                <ShieldCheck size={15} className="text-vapor flex-shrink-0" />
                <span className="text-alabaster text-xs font-light">{w}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[180px] bg-vapor/15 rounded-full blur-[100px]" />
          <div className="relative">
            <h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-3">Ready to start your next project?</h3>
            <p className="text-graphite font-light mb-6 max-w-lg mx-auto">Let's discuss your ideas and build something exceptional together.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">Book a Consultation <ArrowRight size={15} /></a>
              <Link to="/contact" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">Contact Me</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}