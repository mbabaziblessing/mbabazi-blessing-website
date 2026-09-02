import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const faqs = [
  { q: 'Who is Mbabazi Blessing?', a: 'I am a Fashion Entrepreneur, Full-Stack Web Developer, UI/UX Designer, Brand Strategist, AI Solutions Developer, and Digital Innovator based in Uganda. I help businesses, entrepreneurs, and organizations build modern digital solutions, professional brands, websites, AI-powered systems, and business platforms.' },
  { q: 'What services do you offer?', a: 'I offer professional services including website design and development, UI/UX design, e-commerce development, brand identity design, AI chatbot development, AI automation, SEO, digital marketing strategy, business consulting, and fashion business consultation.' },
  { q: 'How can I book a consultation?', a: 'You can book a consultation directly through my Calendly booking page. Select the service you need, choose an available date and time, complete the payment if required, and you will receive a confirmation email with your Google Meet link.' },
  { q: 'Which meeting platform do you use?', a: 'All online consultations are conducted through Google Meet. A meeting link is automatically sent after your booking has been confirmed.' },
  { q: 'Which payment methods do you accept?', a: 'Online consultation payments are currently processed securely through PayPal before the consultation is confirmed.' },
  { q: 'Can I reschedule my consultation?', a: 'Yes. Consultations may be rescheduled up to 24 hours before the scheduled meeting using the link provided in your confirmation email.' },
  { q: 'Do you work with international clients?', a: 'Yes. I work with clients from Uganda and around the world through online meetings and remote collaboration.' },
  { q: 'Do you build custom websites?', a: "Yes. Every website is designed according to the client's goals, branding, business requirements, and target audience. I do not rely on generic templates for custom projects." },
  { q: 'Do you provide website maintenance?', a: 'Yes. Website maintenance, updates, performance improvements, and technical support can be arranged after project completion.' },
  { q: 'Can you redesign an existing website?', a: 'Yes. I can improve existing websites by modernizing the design, enhancing user experience, improving responsiveness, increasing performance, and implementing SEO best practices.' },
  { q: 'Do you develop AI-powered applications?', a: 'Yes. I design and develop AI-powered solutions including intelligent chatbots, AI assistants, workflow automation, knowledge base systems, and OpenAI-powered business applications.' },
  { q: 'What technologies do you work with?', a: 'My primary technologies include HTML5, CSS3, JavaScript, TypeScript, React, Next.js, Node.js, Tailwind CSS, Supabase, PostgreSQL, GitHub, Vite, OpenAI APIs, and Figma.' },
  { q: 'How long does a typical website project take?', a: "The timeline depends on the project's size and complexity. After discussing your requirements during the consultation, I will provide a detailed project plan and estimated delivery schedule." },
  { q: 'Can you help improve my business online?', a: 'Yes. I provide guidance on branding, digital marketing, SEO, e-commerce, AI integration, and business strategy to help businesses strengthen their online presence and achieve sustainable growth.' },
  { q: 'How can I contact you?', a: 'You can contact me using the contact form on this website, through the provided email address, WhatsApp, phone number, or by booking a consultation through Calendly.' },
];

export default function FAQ() {
  const [ref, isVisible] = useScrollAnimation();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(null);

  const filtered = faqs.filter((f) => {
    const q = query.toLowerCase();
    return !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
  });

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Got Questions?</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Frequently Asked Questions</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Find answers to common questions about my services, consultations, projects, and the way I work.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">Below are answers to the questions I receive most often. If your question is not listed here, feel free to contact me or book a consultation.</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" />
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpen(null); }}
              placeholder="Search Frequently Asked Questions"
              aria-label="Search Frequently Asked Questions"
              className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/60 focus:outline-none focus:border-vapor/30 transition bg-transparent"
            />
          </div>
        </div>

        {/* Accordion - 2 columns on desktop */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center max-w-2xl mx-auto">
            <MessageCircle size={28} className="text-vapor mx-auto mb-3" />
            <p className="text-alabaster font-light">We couldn't find an answer to your question. Please contact me or book a consultation for personalized assistance.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {filtered.map((f, i) => {
              const isOpen = open === i;
              return (
                <motion.div key={f.q} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 2) * 0.05 }} className="glass rounded-2xl overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between gap-3 p-5 text-left">
                    <span className="text-alabaster text-sm font-medium leading-snug">{f.q}</span>
                    <ChevronDown size={18} className={`text-vapor flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="px-5 pb-5 text-graphite text-sm font-light leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-12">
          <a href="https://calendly.com/mbabaziblessing/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">Book a Consultation <ArrowRight size={15} /></a>
          <Link to="/contact" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">Contact Me</Link>
        </div>
      </div>
    </section>
  );
}