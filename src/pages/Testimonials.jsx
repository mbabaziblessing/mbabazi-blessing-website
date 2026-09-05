import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';

const testimonials = [
  { name: 'Sarah Nakamya', company: 'TechStart Uganda', review: 'Mbabazi delivered a stunning website that exceeded our expectations. His attention to detail and understanding of our brand was remarkable. The site increased our conversions by 40%.', rating: 5 },
  { name: 'David Ochieng', company: 'Afri Wear Co.', review: 'Working with Blessing was a fantastic experience. He transformed our brand identity completely and built an e-commerce platform that our customers love. Highly recommended.', rating: 5 },
  { name: 'Grace Auma', company: 'Bloom Digital Agency', review: 'His UI/UX design skills are world-class. Mbabazi created an intuitive dashboard that simplified our complex workflows. Our team productivity increased significantly.', rating: 5 },
  { name: 'James Mugisha', company: 'KGL Ventures', review: 'Mbabazi is not just a developer — he is a strategic thinker. His branding and SEO work helped us rank on the first page of Google within three months.', rating: 5 },
  { name: 'Patricia Akello', company: 'Elegance Boutique', review: 'From fashion design to the website, Blessing delivered excellence on every front. Our online sales doubled within two months of launching the new platform.', rating: 5 },
  { name: 'Robert Ssebunya', company: 'Kampala Studios', review: 'A true professional. Mbabazi understands both the creative and technical sides. Our brand identity and website now feel world-class and cohesive.', rating: 5 },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => setCurrent(prev => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const t = testimonials[current];

  const goNext = () => setCurrent(prev => (prev + 1) % testimonials.length);
  const goPrev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      <PageHero
        title="Testimonials"
        subtitle="Professional endorsements from clients and partners who trusted me with their vision."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Testimonials' }]}
      />

      {/* Auto-playing slider */}
      <section className="py-16 pb-32">
        <div className="max-w-3xl mx-auto px-6" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div className="glass-strong rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <Quote size={40} className="text-vapor/20 absolute top-6 left-6" />
            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-alabaster text-lg sm:text-xl font-light leading-relaxed mb-8 italic">"{t.review}"</p>
                <div className="w-12 h-12 rounded-full bg-vapor/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-vapor font-heading text-xl font-semibold">{t.name.charAt(0)}</span>
                </div>
                <h4 className="text-alabaster font-medium text-base">{t.name}</h4>
                <p className="text-graphite text-sm font-light">{t.company}</p>
              </motion.div>
            </AnimatePresence>
            <div className="h-0.5 bg-white/5 rounded-full mt-8 overflow-hidden">
              <motion.div key={current} initial={{ width: '0%' }} animate={{ width: isPaused ? '0%' : '100%' }} transition={{ duration: isPaused ? 0 : 5, ease: 'linear' }} className="h-full bg-vapor rounded-full" />
            </div>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button onClick={goPrev} className="w-10 h-10 rounded-full glass flex items-center justify-center text-graphite hover:text-alabaster hover:bg-vapor/10 transition" aria-label="Previous testimonial">
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-vapor w-6' : 'bg-white/20 w-2'}`} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
              <button onClick={goNext} className="w-10 h-10 rounded-full glass flex items-center justify-center text-graphite hover:text-alabaster hover:bg-vapor/10 transition" aria-label="Next testimonial">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}