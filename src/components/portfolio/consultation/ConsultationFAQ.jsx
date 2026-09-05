import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    q: 'Can I reschedule?',
    a: 'Yes, you can reschedule up to 24 hours before your appointment via your confirmation email.',
  },
  {
    q: 'Are payments refundable?',
    a: 'Payments are generally non-refundable, except where required by law or in exceptional circumstances.',
  },
  {
    q: 'How will we meet?',
    a: 'All consultations take place online via Google Meet. You will receive a meeting link with your confirmation.',
  },
  {
    q: 'Can international clients book?',
    a: 'Yes. Appointments are available worldwide. Times are shown in your local timezone when you book.',
  },
];

function FAQItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-heading text-base text-alabaster">{q}</span>
        <span className="text-amber-400 flex-shrink-0 ml-3">
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-graphite text-sm font-light leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ConsultationFAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="relative py-24 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">Questions</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
            Frequently <span className="text-amber-400">Asked</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem
              key={f.q}
              {...f}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}