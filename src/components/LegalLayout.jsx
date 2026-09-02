import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ArrowUp, Printer, ShieldCheck } from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function LegalLayout({ title, subtitle, lastUpdated, sections, closingStatement, breadcrumb, icon: Icon = ShieldCheck }) {
  const withIds = useMemo(() => sections.map((s) => ({ ...s, id: s.id || slug(s.heading) })), [sections]);
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(withIds[0]?.id);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [openIds, setOpenIds] = useState(() => withIds.map((s) => s.id));
  const contentRef = useRef(null);

  const q = query.toLowerCase().trim();
  const filtered = useMemo(() => {
    if (!q) return withIds;
    return withIds.filter((s) => {
      const parts = [s.heading, ...(s.paragraphs || []), ...(s.blocks || []).flatMap((b) => [b.label || '', ...(b.items || [])])];
      return parts.join(' ').toLowerCase().includes(q);
    });
  }, [q, withIds]);

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (el) {
        const total = Math.max(el.offsetHeight - window.innerHeight, 1);
        const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
        setProgress((scrolled / total) * 100);
      }
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveId(e.target.id)),
      { rootMargin: '-15% 0px -75% 0px' }
    );
    withIds.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [withIds]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-white/5">
        <div className="h-full bg-gradient-to-r from-vapor to-blue-400 transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      <PageHero title={title} subtitle={subtitle} breadcrumb={breadcrumb} />

      <section className="relative py-12 pb-32">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-graphite text-xs font-mono w-fit">
              <Icon size={13} className="text-vapor" /> Last updated: {lastUpdated}
            </span>
            <div className="flex items-center gap-3 flex-1 sm:max-w-md sm:justify-end">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={`Search ${title}`}
                  aria-label={`Search ${title}`}
                  className="w-full pl-10 pr-3 py-2.5 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/60 focus:outline-none focus:border-vapor/30 transition bg-transparent"
                />
              </div>
              <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2.5 glass rounded-xl text-graphite text-xs hover:bg-white/10 transition flex-shrink-0" aria-label="Print">
                <Printer size={15} />
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-[260px_1fr] gap-10">
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <p className="font-mono text-[10px] text-vapor tracking-[0.25em] uppercase mb-4">Table of Contents</p>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2 legal-toc">
                  {withIds.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`block w-full text-left text-xs leading-snug py-1.5 px-3 rounded-lg transition border-l-2 ${activeId === s.id ? 'text-alabaster border-vapor bg-vapor/10' : 'text-graphite border-transparent hover:text-alabaster hover:bg-white/5'}`}
                    >
                      {s.heading}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div ref={contentRef}>
              {filtered.length === 0 ? (
                <div className="glass rounded-2xl p-10 text-center">
                  <Search size={26} className="text-vapor mx-auto mb-3" />
                  <p className="text-alabaster font-light">No sections match your search. Try a different term.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {filtered.map((s) => {
                    const open = openIds.includes(s.id);
                    return (
                      <motion.article
                        key={s.id}
                        id={s.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.4 }}
                        className="glass rounded-2xl overflow-hidden scroll-mt-28"
                      >
                        <button
                          onClick={() => setOpenIds((prev) => (prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id]))}
                          className="w-full flex items-center justify-between gap-3 p-5 sm:p-6 text-left"
                        >
                          <h2 className="font-heading text-lg sm:text-xl font-light text-alabaster leading-snug">{s.heading}</h2>
                          <ChevronDown size={18} className={`text-vapor flex-shrink-0 transition-transform duration-300 lg:hidden ${open ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`px-5 sm:px-6 pb-6 ${open ? 'block' : 'hidden'} lg:block`}>
                          {(s.paragraphs || []).map((p, pi) => (
                            <p key={pi} className="text-graphite text-sm sm:text-[15px] font-light leading-relaxed mb-3">{p}</p>
                          ))}
                          {(s.blocks || []).map((b, bi) => (
                            <div key={bi} className="mb-4">
                              {b.label && <p className="text-alabaster text-sm font-medium mb-2 mt-2">{b.label}</p>}
                              {b.items && (
                                <ul className="space-y-2">
                                  {b.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-graphite text-sm font-light leading-relaxed">
                                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-vapor flex-shrink-0" /> {item}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                          {(s.trailing || []).map((p, pi) => (
                            <p key={`t${pi}`} className="text-graphite text-sm sm:text-[15px] font-light leading-relaxed mb-3">{p}</p>
                          ))}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 sm:p-10 mt-10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] bg-vapor/15 rounded-full blur-[90px]" />
                <div className="relative">
                  <Icon size={26} className="text-vapor mx-auto mb-4" />
                  <p className="text-alabaster font-heading text-lg sm:text-xl font-light leading-relaxed max-w-2xl mx-auto">{closingStatement}</p>
                  <div className="flex flex-wrap justify-center gap-3 mt-7">
                    <Link to="/contact" className="flex items-center gap-2 px-5 py-2.5 bg-vapor text-white rounded-xl text-sm font-medium hover:bg-vapor/90 transition">Contact Me</Link>
                    <Link to="/" className="flex items-center gap-2 px-5 py-2.5 glass text-alabaster rounded-xl text-sm font-medium hover:bg-white/10 transition">Back to Home</Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-vapor text-white flex items-center justify-center shadow-lg shadow-vapor/30 hover:bg-vapor/90 transition"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}