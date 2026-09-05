import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { CONTACT } from '@/config/site';

export default function ConsultationCTA() {
  return (
    <section className="relative py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative glass-strong rounded-3xl p-10 sm:p-14 overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-4">Let's Get Started</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-5">
            Ready to Grow Your <span className="text-amber-400">Business?</span>
          </h2>
          <p className="text-graphite font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you're launching a startup, improving your online presence, or scaling an existing
            business, choose the consultation that fits your needs and book your session today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-400 text-obsidian rounded-xl text-sm font-semibold hover:bg-amber-300 transition"
            >
              <Calendar size={16} /> Schedule Your Consultation
            </a>
            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 glass text-amber-400 rounded-xl text-sm font-medium ring-1 ring-amber-400/20 hover:bg-amber-400/10 transition"
            >
              WhatsApp <ArrowRight size={15} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}