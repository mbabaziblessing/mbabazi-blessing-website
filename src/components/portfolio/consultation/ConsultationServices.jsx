import { motion } from 'framer-motion';
import { Clock, Check, ArrowRight, Sparkles } from 'lucide-react';

const services = [
  {
    name: 'Free Discovery Call',
    sub: 'with Mbabazi Blessing',
    duration: '15 Minutes',
    desc: 'For first-time clients who want to discuss their project and determine the best next steps.',
    includes: ['Project discussion', 'Requirements review', 'Service recommendations'],
    price: 'FREE',
    priceNum: 0,
    cta: 'Book Free Call',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'Business Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '30 Minutes',
    desc: 'Get practical advice on growing your business, increasing sales, and improving operations.',
    includes: ['Business strategy', 'Growth planning', 'Sales improvement'],
    price: '$10',
    priceNum: 10,
    cta: 'Book Now',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: true,
  },
  {
    name: 'Website Development Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '60 Minutes',
    desc: 'Planning for business websites, portfolios, online stores, and web applications.',
    includes: ['Website planning', 'UI/UX advice', 'Technology recommendations'],
    price: '$50',
    priceNum: 50,
    cta: 'Book Consultation',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'E-commerce Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '60 Minutes',
    desc: 'Build or improve your online store with the right platform and payment setup.',
    includes: ['Shopify', 'WooCommerce', 'Payment gateways', 'SEO'],
    price: '$50',
    priceNum: 50,
    cta: 'Book Consultation',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'AI & Automation Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '60 Minutes',
    desc: 'Develop AI assistants, automate workflows, and integrate tools into your business.',
    includes: ['ChatGPT', 'OpenAI APIs', 'AI automation', 'Custom AI assistants'],
    price: '$50',
    priceNum: 50,
    cta: 'Book Consultation',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'Fashion Business Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '45 Minutes',
    desc: 'Focused on fashion brands, online selling, and business growth.',
    includes: ['Brand strategy', 'Product positioning', 'Marketing', 'Store optimization'],
    price: '$30',
    priceNum: 30,
    cta: 'Book Consultation',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'Digital Marketing Consultation',
    sub: 'with Mbabazi Blessing',
    duration: '60 Minutes',
    desc: 'Improve your online visibility and marketing performance.',
    includes: ['SEO', 'Facebook Ads', 'Instagram', 'TikTok', 'Content strategy'],
    price: '$40',
    priceNum: 40,
    cta: 'Book Consultation',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
  {
    name: 'Private Mentorship',
    sub: 'with Mbabazi Blessing',
    duration: '90 Minutes',
    desc: 'One-on-one mentoring tailored to your goals.',
    includes: ['Personalized action plan', 'Business coaching', 'Accountability'],
    price: '$100',
    priceNum: 100,
    cta: 'Book Mentorship',
    calendly: 'https://calendly.com/mbabaziblessing/',
    featured: false,
  },
];

export default function ConsultationServices() {
  return (
    <section id="services" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">Consultation Services</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
            Choose Your <span className="text-amber-400">Session</span>
          </h2>
          <p className="text-graphite font-light mt-4 max-w-xl mx-auto">
            Each session is a focused, one-on-one conversation tailored to your goals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className={`relative rounded-2xl p-6 flex flex-col glass transition-all duration-300 hover:-translate-y-1 ${
                s.featured ? 'ring-1 ring-amber-400/40 bg-amber-400/[0.04]' : 'hover:ring-1 hover:ring-amber-400/20'
              }`}
            >
              {s.featured && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-obsidian text-[10px] font-semibold tracking-wide">
                  <Sparkles size={10} /> POPULAR
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-heading text-xl font-medium text-alabaster leading-tight">{s.name}</h3>
                <p className="text-amber-400/70 text-xs font-mono mt-1">{s.sub}</p>
              </div>
              <div className="flex items-center gap-1.5 text-graphite text-xs mb-4">
                <Clock size={13} className="text-amber-400" /> {s.duration}
              </div>
              <p className="text-graphite text-sm font-light leading-relaxed mb-5">{s.desc}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-xs text-alabaster/80 font-light">
                    <Check size={13} className="text-amber-400 mt-0.5 flex-shrink-0" /> {inc}
                  </li>
                ))}
              </ul>
              <div className="mb-4">
                <span className="font-heading text-2xl text-amber-400 font-medium">{s.price}</span>
              </div>
              <a
                href={s.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition ${
                  s.featured
                    ? 'bg-amber-400 text-obsidian hover:bg-amber-300'
                    : 'glass text-amber-400 hover:bg-amber-400/10 ring-1 ring-amber-400/20'
                }`}
              >
                {s.cta} <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
