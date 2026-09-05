import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, ChevronDown } from 'lucide-react';
import { CONTACT } from '@/config/site';
import ConsultationServices from '@/components/portfolio/consultation/ConsultationServices';
import BookingProcess from '@/components/portfolio/consultation/BookingProcess';
import ConsultationTestimonials from '@/components/portfolio/consultation/ConsultationTestimonials';
import ConsultationFAQ from '@/components/portfolio/consultation/ConsultationFAQ';
import ConsultationCTA from '@/components/portfolio/consultation/ConsultationCTA';
import CalendlyEmbed from '@/components/CalendlyEmbed';

export default function BookConsultation() {
  return (
    <div className="bg-obsidian">
      {/* Hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-obsidian" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(rgba(255,215,0,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="relative max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-graphite mb-6">
            <Link to="/" className="hover:text-amber-400 transition">Home</Link>
            <ChevronDown size={12} className="text-graphite/50 -rotate-90" />
            <span className="text-alabaster">Book a Consultation</span>
          </nav>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-4"
          >
            Premium Consultation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-alabaster leading-[0.9] mb-6"
          >
            Book a Consultation with
            <br />
            <span className="text-amber-400">Mbabazi Blessing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-graphite font-light text-lg max-w-2xl mb-8"
          >
            Professional guidance in business, e-commerce, AI, website development, branding,
            and digital marketing.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-obsidian rounded-xl text-sm font-semibold hover:bg-amber-300 transition"
            >
              <Calendar size={16} /> Book a Session
            </a>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass text-amber-400 rounded-xl text-sm font-medium ring-1 ring-amber-400/20 hover:bg-amber-400/10 transition"
            >
              <MessageCircle size={16} /> Contact on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <ConsultationServices />

      {/* Live availability */}
      <section className="relative py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">Live Availability</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
              Book a <span className="text-amber-400">Time Slot</span> Now
            </h2>
            <p className="text-graphite font-light mt-4 max-w-xl mx-auto">
              Real-time availability synced directly with my calendar — updated automatically. Pick a time that works for you.
            </p>
          </div>
          <div className="glass-strong rounded-2xl overflow-hidden">
            <CalendlyEmbed url={CONTACT.calendly} height={720} />
          </div>
        </div>
      </section>

      <BookingProcess />
      <ConsultationTestimonials />
      <ConsultationFAQ />
      <ConsultationCTA />
    </div>
  );
}
