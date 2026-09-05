import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Boutique Owner',
    text: 'The business consultation gave me clarity and a real action plan. Worth every minute.',
    rating: 5,
  },
  {
    name: 'David M.',
    role: 'Startup Founder',
    text: 'Mbabazi helped me plan my e-commerce store from scratch. Professional and insightful.',
    rating: 5,
  },
  {
    name: 'Aisha L.',
    role: 'Fashion Designer',
    text: 'The fashion business session was exactly what my brand needed. Highly recommend.',
    rating: 5,
  },
];

export default function ConsultationTestimonials() {
  return (
    <section className="relative py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="font-mono text-xs text-amber-400 tracking-[0.3em] uppercase mb-3">Client Feedback</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light text-alabaster">
            What Clients <span className="text-amber-400">Say</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 relative"
            >
              <Quote size={28} className="text-amber-400/30 mb-3" />
              <p className="text-alabaster/80 text-sm font-light leading-relaxed mb-5">{t.text}</p>
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div>
                <p className="font-heading text-sm text-alabaster">{t.name}</p>
                <p className="text-graphite text-xs font-light">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}