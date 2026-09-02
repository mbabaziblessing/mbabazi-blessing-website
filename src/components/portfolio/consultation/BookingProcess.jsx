import React from 'react';
import { motion } from 'framer-motion';
import {
  MousePointerClick,
  CalendarDays,
  CreditCard,
  MailCheck,
  Video,
} from 'lucide-react';

const steps = [
  { icon: MousePointerClick, title: 'Choose a consultation', desc: 'Pick the session that fits your needs.' },
  { icon: CalendarDays, title: 'Select a date & time', desc: 'Pick an available slot that works for you.' },
  { icon: CreditCard, title: 'Secure payment via PayPal', desc: 'Complete your booking with secure checkout.' },
  { icon: MailCheck, title: 'Email confirmation', desc: 'Receive a confirmation with all the details.' },
  { icon: Video, title: 'Join via Google Meet', desc: 'Meet online at your scheduled time.' },
];

const reasons = [
  'Business Strategy',
  'Website Development',
  'E-commerce Solutions',
  'AI Integration',
  'Fashion Industry Experience',
  'Digital Marketing',
  'SEO Optimization',
  'Professional Branding',
];

export default function BookingProcess() {
  return (
    <section className="relative py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Why work with me */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">Why Work With Me</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
            Expertise Across <span className="text-amber-400">Disciplines</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-24">
          {reasons.map((r, i) => (
            <motion.span
              key={r}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-4 py-2 rounded-full glass text-sm text-alabaster/80 font-light ring-1 ring-amber-400/15 hover:ring-amber-400/40 hover:text-amber-400 transition"
            >
              {r}
            </motion.span>
          ))}
        </div>

        {/* Booking process */}
        <div className="text-center mb-14">
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">How It Works</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
            Simple <span className="text-amber-400">Booking Process</span>
          </h2>
        </div>
        <div className="relative grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative glass rounded-2xl p-6 text-center"
            >
              <span className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-amber-400 text-obsidian text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 flex items-center justify-center mx-auto mb-4">
                <s.icon size={22} className="text-amber-400" />
              </div>
              <h3 className="font-heading text-lg text-alabaster mb-2">{s.title}</h3>
              <p className="text-graphite text-xs font-light leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}