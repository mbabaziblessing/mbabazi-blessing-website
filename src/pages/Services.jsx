import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Monitor,
  Code2,
  Briefcase,
  Building2,
  ShoppingCart,
  Palette,
  Fingerprint,
  Search,
  Megaphone,
  Share2,
  Scissors,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import PageHero from '@/components/portfolio/PageHero';
import PricingTable from '@/components/portfolio/PricingTable';
import ConsultationPackages from '@/components/portfolio/ConsultationPackages';
import HomeServices from '@/components/portfolio/home/Services';

const services = [
  { icon: Monitor, title: 'Website Design', desc: 'Crafting visually stunning, responsive websites that captivate your audience and reflect your brand identity with precision and elegance.' },
  { icon: Code2, title: 'Web Development', desc: 'Building high-performance, scalable web applications with modern frameworks and clean, maintainable architecture.' },
  { icon: Briefcase, title: 'Portfolio Websites', desc: 'Designing professional portfolios that showcase your work and attract international clients and opportunities.' },
  { icon: Building2, title: 'Business Websites', desc: 'Creating corporate websites that establish authority, build trust, and drive measurable business growth.' },
  { icon: ShoppingCart, title: 'Online Stores', desc: 'Developing e-commerce platforms with seamless checkout, inventory management, and secure payment integration.' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Designing intuitive interfaces with user-centered methodologies for optimal engagement and conversion.' },
  { icon: Palette, title: 'Logo Design', desc: 'Creating memorable brand marks that embody your vision and stand the test of time.' },
  { icon: Fingerprint, title: 'Brand Identity', desc: 'Building cohesive brand systems with typography, color, and visual language that resonate.' },
  { icon: Search, title: 'SEO Optimization', desc: 'Implementing data-driven SEO strategies for higher rankings, organic traffic, and lasting visibility.' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Executing multi-channel digital campaigns that convert audiences into loyal customers.' },
  { icon: Share2, title: 'Social Media Management', desc: 'Growing your social presence with strategic content, community engagement, and data-backed planning.' },
  { icon: Scissors, title: 'Fashion Business Consulting', desc: 'Providing expert guidance on fashion business strategy, sourcing, and brand positioning.' },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We start by understanding your goals, audience, and brand to define the project scope.' },
  { step: '02', title: 'Strategy', desc: 'I craft a tailored plan covering design, technology, and marketing approach.' },
  { step: '03', title: 'Design & Build', desc: 'Bringing the vision to life with iterative design and clean, performant development.' },
  { step: '04', title: 'Launch & Optimize', desc: 'We deploy, monitor, and refine to ensure long-term success and growth.' },
];

const faqs = [
  { q: 'How long does a typical project take?', a: 'Most projects take between 1-4 weeks depending on scope. A simple portfolio site can be delivered in 5 days, while a full e-commerce platform may take 3-4 weeks.' },
  { q: 'Do you offer ongoing support?', a: 'Yes. Every project includes a post-launch support period (5-90 days depending on the package). Extended maintenance plans are also available.' },
  { q: 'Can you work with clients outside Uganda?', a: 'Absolutely. I work with clients worldwide remotely. Communication happens via email, WhatsApp, and scheduled video calls.' },
  { q: 'What technologies do you use?', a: 'I primarily use React, Next.js, Node.js, and modern CSS frameworks. For design, I work in Photoshop, and Canva.' },
  { q: 'Do you require a deposit?', a: 'Yes, a 50% deposit secures your project slot, with the balance due upon completion before launch.' },
];

function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left">
        <span className="text-alabaster font-medium text-sm sm:text-base">{q}</span>
        <ChevronDown size={18} className={`text-vapor transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="text-graphite text-sm font-light leading-relaxed px-5 pb-5">{a}</p>
      </motion.div>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <PageHero
        title="Services"
        subtitle="Premium services spanning web development, design, branding, and fashion consulting — tailored to elevate your brand."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Services' }]}
      />

      {/* Services grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }} className="glass rounded-2xl p-6 group hover:border-vapor/20 hover:bg-vapor/5 transition-all duration-500">
                  <div className="w-12 h-12 rounded-xl bg-vapor/10 flex items-center justify-center mb-4 group-hover:bg-vapor/20 transition">
                    <Icon size={22} className="text-vapor" />
                  </div>
                  <h3 className="text-alabaster font-medium text-base mb-2 flex items-center gap-2">
                    {service.title}
                    <ArrowUpRight size={14} className="text-vapor opacity-0 group-hover:opacity-100 transition" />
                  </h3>
                  <p className="text-graphite text-sm leading-relaxed font-light">{service.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Pricing</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-alabaster mb-3">Consultation Packages</h2>
            <p className="text-graphite font-light max-w-lg mx-auto">Transparent pricing for every stage of your business. Custom quotes available for unique projects.</p>
          </div>
          <PricingTable />
        </div>
      </section>

      {/* Consultation Packages */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Consultation</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-alabaster mb-3">Consultation Packages</h2>
            <p className="text-graphite font-light max-w-lg mx-auto">Need guidance before committing to a full project? Book a consultation session tailored to your needs.</p>
          </div>
          <ConsultationPackages />
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">How I Work</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-alabaster">My Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {process.map((p, i) => (
              <motion.div key={p.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
                <span className="font-mono text-3xl font-light text-vapor/30 mb-3 block">{p.step}</span>
                <h3 className="text-alabaster font-medium text-base mb-2">{p.title}</h3>
                <p className="text-graphite text-sm font-light leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">FAQ</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-alabaster">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} i={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">
              Start a Project →
            </Link>
          </div>
        </div>
      </section>

      <HomeServices />
    </>
  );
}
