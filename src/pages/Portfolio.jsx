import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { IMAGES } from '@/components/portfolio/shared';
import PageHero from '@/components/portfolio/PageHero';

const filters = ['All', 'Websites', 'UI/UX', 'Branding', 'Fashion', 'Graphics'];

const projects = [
  { title: 'Luxe Commerce', desc: 'A premium e-commerce platform for a high-end fashion brand with seamless payment integration and inventory management.', category: 'Websites', tech: ['React', 'Node.js', 'MongoDB'], image: IMAGES.ecom, caseStudy: 'Increased client conversion rate by 40% within two months of launch. Integrated Stripe and local mobile money payments for the Ugandan market.' },
  { title: 'Novus Brand System', desc: 'Complete brand identity and visual language for a tech startup including logo, typography, and brand guidelines.', category: 'Branding', image: IMAGES.brand, tech: ['Figma', 'Photoshop', 'Illustrator'], caseStudy: 'Delivered a 40-page brand guideline document and a complete visual system used across web, print, and social media.' },
  { title: 'FinTrack Dashboard', desc: 'An intuitive financial tracking dashboard with real-time data visualization and responsive design.', category: 'UI/UX', image: IMAGES.uiux, tech: ['Figma', 'React', 'Recharts'], caseStudy: 'Designed and built a dashboard that simplified 7 complex workflows into one clean interface, boosting team productivity by 35%.' },
  { title: 'Bless Fashion House', desc: 'Online presence and digital storefront for Bless Fashion House featuring lookbooks and custom orders.', category: 'Fashion', image: IMAGES.fashion, tech: ['Next.js', 'Tailwind', 'Firebase'], caseStudy: 'Built a complete digital storefront that doubled online sales within the first two months of operation.' },
  { title: 'DevPortal Platform', desc: 'A developer documentation and API portal with interactive code examples and search functionality.', category: 'Websites', image: IMAGES.workspace, tech: ['React', 'Express', 'MySQL'], caseStudy: 'Created an interactive documentation portal reducing developer onboarding time from 3 days to 4 hours.' },
  { title: 'Artisan Studio', desc: 'Visual identity and marketing collateral for a boutique design studio specializing in handcrafted goods.', category: 'Graphics', image: IMAGES.studio, tech: ['Canva', 'Photoshop', 'Figma'], caseStudy: 'Developed a cohesive visual identity applied to packaging, social media, and an in-store display system.' },
];

const galleryItems = [
  { title: 'Avant-Garde Collection', category: 'Fashion', image: IMAGES.fashion, desc: 'Editorial fashion piece from the Bless Fashion House autumn collection.' },
  { title: 'Silk Texture Study', category: 'Fashion', image: IMAGES.fabric, desc: 'Macro study of fabric textures used in bespoke garments.' },
  { title: 'Luxe E-Commerce', category: 'Websites', image: IMAGES.ecom, desc: 'High-end online store with seamless checkout experience.' },
  { title: 'Novus Brand Identity', category: 'Branding', image: IMAGES.brand, desc: 'Complete visual identity system for a tech startup.' },
  { title: 'FinTrack Dashboard', category: 'UI/UX', image: IMAGES.uiux, desc: 'Financial tracking interface with real-time data visualization.' },
  { title: 'DevPortal Platform', category: 'Websites', image: IMAGES.workspace, desc: 'Developer documentation portal with interactive code samples.' },
  { title: 'Artisan Studio Collateral', category: 'Graphics', image: IMAGES.studio, desc: 'Marketing collateral for a boutique design studio.' },
  { title: 'Abstract Motion', category: 'Graphics', image: IMAGES.bg, desc: 'Generative art exploring the intersection of code and creativity.' },
];

export default function Portfolio() {
  const [ref, isVisible] = useScrollAnimation();
  const [active, setActive] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);
  const galleryFiltered = active === 'All' ? galleryItems : galleryItems.filter(i => i.category === active);

  const nextImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => {
      const idx = galleryFiltered.findIndex(i => i.title === prev.title);
      return galleryFiltered[(idx + 1) % galleryFiltered.length];
    });
  };
  const prevImage = (e) => {
    e.stopPropagation();
    setLightbox(prev => {
      const idx = galleryFiltered.findIndex(i => i.title === prev.title);
      return galleryFiltered[(idx - 1 + galleryFiltered.length) % galleryFiltered.length];
    });
  };

  return (
    <>
      <PageHero
        title="Portfolio"
        subtitle="A curated selection of projects spanning web development, design, branding, and fashion â€” each crafted with intention."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Portfolio' }]}
      />

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${active === f ? 'bg-vapor text-white' : 'glass text-graphite hover:text-alabaster hover:bg-white/5'}`}>{f}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div key={project.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="glass rounded-2xl overflow-hidden group hover:border-vapor/20 transition-all duration-500">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 gap-3">
                      <button className="px-4 py-2 bg-vapor text-white rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-vapor/90 transition"><ExternalLink size={14} /> Live Demo</button>
                      <button className="px-4 py-2 glass text-alabaster rounded-lg text-sm font-medium flex items-center gap-1.5 hover:bg-white/10 transition"><span className="text-xs font-bold">GH</span> GitHub</button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase">{project.category}</span>
                    <h3 className="text-alabaster font-medium text-lg mt-1 mb-2">{project.title}</h3>
                    <p className="text-graphite text-sm font-light leading-relaxed mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((t) => <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-graphite text-[11px] font-mono">{t}</span>)}
                    </div>
                    <button onClick={() => setSelectedProject(project)} className="text-vapor text-sm font-medium hover:gap-2 flex items-center gap-1 transition-all">View Case Study â†’</button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Project Gallery</p>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-alabaster">Visual Showcase</h2>
            <p className="text-graphite font-light mt-3">Click any image to expand and view in full screen.</p>
          </div>
          <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
            <AnimatePresence mode="popLayout">
              {galleryFiltered.map((item, i) => (
                <motion.div key={item.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} onClick={() => setLightbox(item)} className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-white/8 hover:border-vapor/30 transition-all duration-500 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase">{item.category}</span>
                    <h3 className="text-alabaster font-medium text-sm sm:text-base mt-1">{item.title}</h3>
                  </div>
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ZoomIn size={15} className="text-alabaster" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Case study modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)} className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} onClick={e => e.stopPropagation()} className="glass-strong rounded-3xl max-w-2xl w-full overflow-hidden">
              <div className="relative aspect-[16/9]">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedProject(null)} className="absolute top-3 right-3 w-9 h-9 rounded-full glass-strong flex items-center justify-center text-alabaster hover:text-vapor transition"><X size={18} /></button>
              </div>
              <div className="p-6 sm:p-8">
                <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase">{selectedProject.category}</span>
                <h3 className="font-heading text-2xl font-light text-alabaster mt-1 mb-3">{selectedProject.title}</h3>
                <p className="text-graphite text-sm font-light leading-relaxed mb-4">{selectedProject.desc}</p>
                <div className="glass rounded-xl p-4 mb-5">
                  <p className="font-mono text-xs text-vapor mb-2 uppercase tracking-wider">Case Study</p>
                  <p className="text-graphite text-sm font-light leading-relaxed">{selectedProject.caseStudy}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {selectedProject.tech.map((t) => <span key={t} className="px-2.5 py-1 rounded-md bg-white/5 text-graphite text-xs font-mono">{t}</span>)}
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1.5 px-4 py-2.5 bg-vapor text-white rounded-lg text-sm font-medium hover:bg-vapor/90 transition"><ExternalLink size={14} /> Live Demo</button>
                  <button className="flex items-center gap-1.5 px-4 py-2.5 glass text-alabaster rounded-lg text-sm font-medium hover:bg-white/10 transition"><span className="text-xs font-bold">GH</span> GitHub</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)} className="fixed inset-0 z-[60] bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-6">
            <button onClick={() => setLightbox(null)} className="absolute top-6 right-6 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-graphite hover:text-alabaster transition z-10"><X size={20} /></button>
            <button onClick={prevImage} className="absolute left-4 sm:left-8 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-graphite hover:text-alabaster transition z-10"><ArrowLeft size={20} /></button>
            <button onClick={nextImage} className="absolute right-4 sm:right-8 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-graphite hover:text-alabaster transition z-10"><ArrowRight size={20} /></button>
            <motion.div key={lightbox.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <img src={lightbox.image} alt={lightbox.title} className="w-full max-h-[70vh] object-contain bg-obsidian" />
              </div>
              <div className="text-center mt-5">
                <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase">{lightbox.category}</span>
                <h3 className="text-alabaster font-heading text-2xl font-light mt-1 mb-2">{lightbox.title}</h3>
                <p className="text-graphite text-sm font-light max-w-lg mx-auto">{lightbox.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
