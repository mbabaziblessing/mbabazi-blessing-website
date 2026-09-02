import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock, User, Check, Mail, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { IMAGES } from '@/components/portfolio/shared';

const articles = [
  { title: 'Why Every Business Needs a Professional Website in 2026', category: 'Website Development', author: 'Mbabazi Blessing', readTime: '8 Minutes', date: 'Jul 2026', image: IMAGES.ecom, summary: 'A professional website is more than an online presence—it is a powerful marketing, sales, and customer service tool. This article explains why every modern business should invest in a fast, secure, mobile-friendly website and how it contributes to long-term business growth.', tags: ['Website Development', 'Business', 'Technology', 'Digital Transformation'] },
  { title: 'How Artificial Intelligence is Transforming Small Businesses', category: 'Artificial Intelligence', author: 'Mbabazi Blessing', readTime: '10 Minutes', date: 'Jul 2026', image: IMAGES.workspace, summary: 'Artificial Intelligence is becoming an essential tool for businesses of all sizes. Learn how AI chatbots, automation, intelligent customer support, and data-driven insights help businesses improve efficiency and enhance customer experiences.', tags: ['Artificial Intelligence', 'Automation', 'Business', 'Innovation'] },
  { title: 'Building a Strong Brand Identity from the Ground Up', category: 'Branding', author: 'Mbabazi Blessing', readTime: '7 Minutes', date: 'Jun 2026', image: IMAGES.brand, summary: 'Brand identity goes beyond logos and colours. Discover the key elements of creating a memorable and trusted brand, including positioning, messaging, visual identity, consistency, and customer experience.', tags: ['Branding', 'Business', 'Marketing'] },
  { title: 'Getting Started with E-commerce: A Complete Guide', category: 'E-commerce', author: 'Mbabazi Blessing', readTime: '12 Minutes', date: 'Jun 2026', image: IMAGES.fabric, summary: 'Planning to launch an online store? This guide covers choosing the right platform, organizing products, integrating payments, improving customer experience, and growing online sales.', tags: ['E-commerce', 'Online Business', 'Digital Marketing'] },
  { title: 'The Importance of UI/UX Design in Modern Websites', category: 'UI/UX Design', author: 'Mbabazi Blessing', readTime: '9 Minutes', date: 'May 2026', image: IMAGES.uiux, summary: 'Excellent design improves user satisfaction and business performance. Learn the principles of intuitive interfaces, responsive layouts, accessibility, and user-centered design.', tags: ['UI Design', 'UX Design', 'Web Design'] },
];

const categories = ['All', 'Website Development', 'Artificial Intelligence', 'UI/UX Design', 'Branding', 'E-commerce', 'Digital Marketing', 'SEO', 'Entrepreneurship', 'Fashion Business', 'Technology', 'Software Development', 'Business Strategy'];
const features = ['Featured Articles', 'Search Articles', 'Categories', 'Tags', 'Related Articles', 'Popular Posts', 'Latest Posts', 'Reading Time', 'Author Info', 'Share Buttons', 'Newsletter', 'SEO Optimized'];

export default function Blog() {
  const [ref, isVisible] = useScrollAnimation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  const q = query.toLowerCase().trim();
  const filtered = useMemo(() => articles.filter((a) => {
    const matchCat = active === 'All' || a.category === active;
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  }), [q, active]);

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Insights & Tutorials</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Blog</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Insights, tutorials, business ideas, technology trends, and practical guides based on my experience in web development, AI, branding, fashion, and entrepreneurship.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">Welcome to my blog, where I share knowledge, practical guides, project updates, and insights about technology, entrepreneurship, artificial intelligence, website development, branding, digital marketing, and fashion business. My goal is to educate, inspire, and help individuals and businesses grow through innovation and continuous learning.</p>
        </div>

        {/* Search + categories */}
        <div className="max-w-2xl mx-auto mb-6">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Articles" aria-label="Search Articles" className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/60 focus:outline-none focus:border-vapor/30 transition bg-transparent" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((c) => (
            <button key={c} onClick={() => setActive(c)} className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition border ${active === c ? 'bg-vapor text-white border-vapor' : 'glass text-graphite border-white/10 hover:text-alabaster hover:border-vapor/30'}`}>{c}</button>
          ))}
        </div>

        {/* Articles */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center"><p className="text-alabaster font-light">No articles match your search. Try a different term or category.</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {filtered.map((a, i) => (
              <motion.article key={a.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="glass rounded-2xl overflow-hidden flex flex-col hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-vapor/80 text-white text-[10px] font-mono uppercase tracking-wider">{a.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-alabaster font-medium text-base mb-2 leading-snug">{a.title}</h3>
                  <p className="text-graphite text-xs font-light leading-relaxed mb-4 line-clamp-3">{a.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {a.tags.slice(0, 3).map((t) => <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-graphite/70 text-[10px] font-mono">#{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-graphite/70 font-mono mb-4 mt-auto">
                    <span className="flex items-center gap-1"><User size={11} /> {a.author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {a.readTime}</span>
                  </div>
                  <Link to="/blog" className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-vapor/10 text-vapor hover:bg-vapor hover:text-white transition">Read More <ArrowRight size={13} /></Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Features strip */}
        <div className="glass rounded-2xl p-6 mb-12">
          <p className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase mb-4 text-center">Blog Features</p>
          <div className="flex flex-wrap justify-center gap-2">
            {features.map((f) => <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-graphite text-xs font-light"><Check size={12} className="text-vapor" /> {f}</span>)}
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 sm:p-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-3"><Mail size={20} className="text-vapor" /><h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">Stay Updated</h3></div>
          <p className="text-graphite font-light mb-6 max-w-lg mx-auto">Subscribe to receive new articles, tutorials, project updates, and technology insights.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition"><Mail size={15} /> Subscribe</Link>
            <Link to="/blog" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">View All Articles <ArrowRight size={15} /></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}