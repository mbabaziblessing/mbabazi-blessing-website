import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';
import { IMAGES, CONTACT, WhatsAppIcon } from '@/components/portfolio/shared';

const looks = [
  { src: IMAGES.portrait, title: 'Royal Heritage Gown', category: 'Evening Wear', tall: true },
  { src: IMAGES.fabric, title: 'Atelier Fabric Study', category: 'Textiles', tall: false },
  { src: IMAGES.brand, title: 'Signature Collection', category: 'Couture', tall: true },
  { src: IMAGES.fashion, title: 'Runway Silhouette', category: 'Runway', tall: false },
  { src: IMAGES.studio, title: 'Studio Atelier', category: 'Behind the Scenes', tall: true },
  { src: IMAGES.ecom, title: 'Urban Street Edit', category: 'Ready-to-Wear', tall: false },
  { src: IMAGES.uiux, title: 'Editorial Composition', category: 'Editorial', tall: true },
  { src: IMAGES.workspace, title: 'Craftsmanship Detail', category: 'Detail', tall: false },
  { src: IMAGES.bg, title: 'Mood Board', category: 'Inspiration', tall: true },
  { src: IMAGES.portrait, title: 'Bridal Couture', category: 'Bridal', tall: false },
  { src: IMAGES.brand, title: 'Heritage Reimagined', category: 'Couture', tall: true },
  { src: IMAGES.fashion, title: 'Contemporary Drape', category: 'Runway', tall: false },
];

export default function BlessFashionHouse() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (i) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const next = () => setLightbox((i) => (i + 1) % looks.length);
  const prev = () => setLightbox((i) => (i - 1 + looks.length) % looks.length);

  return (
    <>
      <PageHero
        title="Bless Fashion House"
        subtitle="A visual lookbook of designs from Bless Fashion House — where Ugandan heritage craftsmanship meets contemporary silhouette."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Bless Fashion House' }]}
      />

      {/* Lookbook masonry grid */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-8">
            <Sparkles size={14} className="text-vapor" />
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase">Lookbook Collection</p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]">
            {looks.map((look, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
                onClick={() => openLightbox(i)}
                className={`group relative w-full mb-4 rounded-2xl overflow-hidden glass break-inside-avoid block ${
                  look.tall ? 'aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <img
                  src={look.src}
                  alt={look.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 text-left">
                  <p className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase mb-1">{look.category}</p>
                  <h3 className="font-heading text-base text-alabaster font-light leading-tight">{look.title}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-vapor/15 rounded-full blur-[100px]" />
            <div className="relative">
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-alabaster mb-4">
                Commission Your <span className="gradient-text">Signature Piece</span>
              </h2>
              <p className="text-graphite font-light max-w-lg mx-auto mb-8">
                From bespoke tailoring to ready-to-wear — let's create something that fits your story.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">
                  Request a Quote <ArrowRight size={16} />
                </Link>
                <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">
                  <WhatsAppIcon size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-alabaster hover:text-vapor transition" onClick={closeLightbox}>
              <X size={20} />
            </button>
            <button
              className="absolute left-4 sm:left-8 w-11 h-11 rounded-full glass flex items-center justify-center text-alabaster hover:text-vapor transition"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={looks[lightbox].src} alt={looks[lightbox].title} className="w-full max-h-[80vh] object-contain rounded-2xl" />
              <div className="text-center mt-4">
                <p className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase mb-1">{looks[lightbox].category}</p>
                <h3 className="font-heading text-lg text-alabaster font-light">{looks[lightbox].title}</h3>
              </div>
            </motion.div>
            <button
              className="absolute right-4 sm:right-8 w-11 h-11 rounded-full glass flex items-center justify-center text-alabaster hover:text-vapor transition"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}