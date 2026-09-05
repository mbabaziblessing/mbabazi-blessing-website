import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, Clock } from 'lucide-react';
import { blogPosts, blogCategories } from '@/components/portfolio/blogData';
import PageHero from '@/components/portfolio/PageHero';
import HomeBlog from '@/components/portfolio/home/Blog';

export default function Blog() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = blogPosts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === 'All' || post.category === activeCat;
    return matchSearch && matchCat;
  });

  const featured = blogPosts[0];

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="Insights and thoughts on technology, web development, fashion, branding, and entrepreneurship."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Blog' }]}
      />

      {/* Featured post */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Link to={`/blog/${featured.slug}`} className="block glass-strong rounded-2xl overflow-hidden group hover:border-vapor/20 transition-all duration-500">
              <div className="grid md:grid-cols-2">
                <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-vapor text-white text-xs font-mono uppercase tracking-wider">Featured</span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="font-mono text-[10px] text-vapor tracking-[0.2em] uppercase mb-3">{featured.category}</span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-3 group-hover:text-vapor transition">{featured.title}</h2>
                  <p className="text-graphite text-sm font-light leading-relaxed mb-5">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-graphite text-xs font-mono">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {featured.readTime}</span>
                  </div>
                  <span className="mt-6 text-vapor text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Read Article <ArrowUpRight size={14} /></span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Search + Categories */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite" />
              <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl glass text-alabaster text-sm placeholder:text-graphite/50 focus:border-vapor/30 focus:outline-none transition bg-transparent" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            <button onClick={() => setActiveCat('All')} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${activeCat === 'All' ? 'bg-vapor text-white' : 'glass text-graphite hover:text-alabaster'}`}>All</button>
            {blogCategories.map((cat) => (
              <button key={cat} onClick={() => setActiveCat(cat)} className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${activeCat === cat ? 'bg-vapor text-white' : 'glass text-graphite hover:text-alabaster'}`}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-8 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <p className="text-center text-graphite py-20 font-light">No articles found. Try a different search.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Link to={`/blog/${post.slug}`} className="block glass rounded-2xl overflow-hidden group hover:border-vapor/20 transition-all duration-500">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-vapor/80 text-white text-[10px] font-mono uppercase tracking-wider">{post.category}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="text-alabaster font-medium text-base mb-2 flex items-start gap-2 group-hover:text-vapor transition">{post.title}<ArrowUpRight size={14} className="text-vapor opacity-0 group-hover:opacity-100 transition mt-1 flex-shrink-0" /></h3>
                      <p className="text-graphite text-sm font-light leading-relaxed mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-1.5 text-graphite text-xs font-mono"><Clock size={12} />{post.readTime}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeBlog />
    </>
  );
}