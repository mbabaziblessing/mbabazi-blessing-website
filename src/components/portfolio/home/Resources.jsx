import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Globe, Palette, Briefcase, Bot, ShoppingCart, Megaphone, ArrowRight, Wrench,
  Download, Clock, BookOpen, FileText, Sparkles, Calculator, Lock, QrCode, Image as ImageIcon, Ruler, Check,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { CONTACT } from '@/config/site';

const categories = [
  { key: 'web', icon: Globe, title: 'Website Development', items: ['Website Planning Checklist', 'Website Requirements Template', 'Website Launch Checklist', 'Responsive Design Guide', 'Website Maintenance Checklist'] },
  { key: 'branding', icon: Palette, title: 'Branding & Design', items: ['Brand Identity Checklist', 'Logo Design Brief Template', 'Brand Style Guide Template', 'Social Media Branding Guide', 'Colour Palette Guide'] },
  { key: 'business', icon: Briefcase, title: 'Business & Entrepreneurship', items: ['Business Plan Template', 'Business Startup Checklist', 'Business Growth Guide', 'Customer Service Guide', 'Marketing Strategy Template'] },
  { key: 'ai', icon: Bot, title: 'Artificial Intelligence', items: ['Prompt Engineering Guide', 'AI Chatbot Planning Template', 'AI Integration Checklist', 'AI Automation Workflow Guide', 'OpenAI API Getting Started Guide'] },
  { key: 'ecom', icon: ShoppingCart, title: 'E-commerce', items: ['Product Listing Template', 'Product Description Template', 'Inventory Management Spreadsheet', 'Order Tracking Template', 'Customer Support Response Templates'] },
  { key: 'marketing', icon: Megaphone, title: 'Digital Marketing', items: ['SEO Checklist', 'Keyword Research Template', 'Social Media Content Calendar', 'Facebook Marketing Guide', 'Instagram Growth Guide'] },
];

const filters = ['All', 'Website Development', 'Branding', 'Business', 'AI', 'E-commerce', 'Marketing'];
const filterKeyMap = { 'Website Development': 'web', 'Branding': 'branding', 'Business': 'business', 'AI': 'ai', 'E-commerce': 'ecom', 'Marketing': 'marketing' };

const onlineTools = [
  { icon: Calculator, name: 'Website Cost Calculator' },
  { icon: Search, name: 'SEO Audit Tool' },
  { icon: Palette, name: 'Colour Palette Generator' },
  { icon: Lock, name: 'Password Generator' },
  { icon: QrCode, name: 'QR Code Generator' },
  { icon: ImageIcon, name: 'Image Compression Tool' },
  { icon: Ruler, name: 'Unit Converter' },
  { icon: FileText, name: 'Invoice Generator' },
];

const learningTopics = ['HTML & CSS', 'JavaScript', 'React', 'UI/UX Design', 'Artificial Intelligence', 'Branding', 'Entrepreneurship', 'Business Strategy', 'Digital Marketing', 'SEO'];
const downloads = ['PDF Guides', 'Checklists', 'Templates', 'Worksheets', 'Business Documents', 'Branding Resources', 'Presentations'];
const comingSoon = ['Video Courses', 'Premium Templates', 'Source Code Downloads', 'Website Components', 'UI Kits', 'Business Calculators', 'AI Prompt Library', 'Design Assets', 'E-books'];

export default function Resources() {
  const [ref, isVisible] = useScrollAnimation();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState('All');

  const q = query.toLowerCase().trim();
  const filtered = useMemo(() => {
    return categories.filter((c) => {
      const matchFilter = active === 'All' || filterKeyMap[active] === c.key;
      const matchSearch = !q || c.title.toLowerCase().includes(q) || c.items.some((i) => i.toLowerCase().includes(q));
      return matchFilter && matchSearch;
    });
  }, [q, active]);

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 left-0 w-[500px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Free & Premium</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Resources</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Explore free and premium resources designed to help entrepreneurs, businesses, students, and professionals improve their digital presence, technology skills, and business growth.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">I believe knowledge should be shared to help others grow. This Resources section provides useful templates, guides, checklists, tools, and learning materials based on my experience in technology, business, branding, AI, and entrepreneurship.</p>
        </div>

        {/* Search + filters */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Resources" aria-label="Search Resources" className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/60 focus:outline-none focus:border-vapor/30 transition bg-transparent" />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)} className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition border ${active === f ? 'bg-vapor text-white border-vapor' : 'glass text-graphite border-white/10 hover:text-alabaster hover:border-vapor/30'}`}>{f}</button>
          ))}
        </div>

        {/* Category cards */}
        {filtered.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center"><p className="text-alabaster font-light">No resources match your search. Try a different term.</p></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {filtered.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={c.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-30px' }} transition={{ duration: 0.5, delay: (i % 3) * 0.08 }} className="glass rounded-2xl p-6 flex flex-col hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-vapor/10 flex items-center justify-center group-hover:bg-vapor/20 transition"><Icon size={22} className="text-vapor" /></div>
                    <span className="px-2 py-1 rounded-full bg-white/5 text-graphite text-[9px] font-mono uppercase tracking-wider">Coming Soon</span>
                  </div>
                  <h3 className="text-alabaster font-medium text-base mb-3">{c.title}</h3>
                  <ul className="space-y-2 mb-5 mt-auto">
                    {c.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-graphite/80 text-xs font-light"><Check size={13} className="text-vapor mt-0.5 flex-shrink-0" /> {item}</li>
                    ))}
                  </ul>
                  <button disabled className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-white/5 text-graphite/50 cursor-not-allowed">Resume will be available soon</button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Online tools */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6"><Wrench size={18} className="text-vapor" /><h3 className="font-heading text-2xl font-light text-alabaster">Online Tools</h3></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {onlineTools.map((t, i) => { const Icon = t.icon; return (
              <motion.div key={t.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="glass rounded-xl px-4 py-4 flex flex-col items-center text-center gap-2 hover:border-vapor/25 hover:-translate-y-0.5 transition-all duration-500">
                <div className="w-10 h-10 rounded-lg bg-vapor/10 flex items-center justify-center"><Icon size={18} className="text-vapor" /></div>
                <span className="text-alabaster text-xs font-light">{t.name}</span>
                <span className="text-[9px] font-mono text-graphite/60 uppercase tracking-wider">Coming Soon</span>
              </motion.div>
            ); })}
          </div>
        </div>

        {/* Learning + Downloads + Coming Soon */}
        <div className="grid lg:grid-cols-3 gap-5 mb-12">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4"><BookOpen size={16} className="text-vapor" /><h3 className="font-heading text-lg font-light text-alabaster">Learning Resources</h3></div>
            <div className="flex flex-wrap gap-1.5">
              {learningTopics.map((t) => <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-graphite text-xs font-light">{t}</span>)}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4"><Download size={16} className="text-vapor" /><h3 className="font-heading text-lg font-light text-alabaster">Downloads</h3></div>
            <ul className="space-y-1.5">
              {downloads.map((d) => <li key={d} className="flex items-center gap-2 text-graphite text-xs font-light"><Check size={12} className="text-vapor" /> {d}</li>)}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4"><Sparkles size={16} className="text-vapor" /><h3 className="font-heading text-lg font-light text-alabaster">Coming Soon</h3></div>
            <ul className="space-y-1.5">
              {comingSoon.map((c) => <li key={c} className="flex items-center gap-2 text-graphite text-xs font-light"><Clock size={12} className="text-vapor" /> {c}</li>)}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster mb-3">Need a custom resource or template?</h3>
          <p className="text-graphite font-light mb-6">Contact me or book a consultation to receive resources tailored to your business or project.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition" disabled>Browse Resources</button>
            <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">Book a Consultation <ArrowRight size={15} /></a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}