import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowUpRight, ChevronDown, Home, User, Compass, Target, Cpu, Briefcase, Award,
  Trophy, FolderGit2, FileSearch, Star, Wrench, DollarSign, CalendarClock, HelpCircle, BookOpen,
  Download, Mail, Newspaper, Layers, ShoppingBag, Palette, Bot, ShoppingCart, Megaphone, Phone,
  MessageCircle, Calendar, Share2, Music2, FileText, Shield, Map,
  ExternalLink, Compass as CompassIcon,
} from 'lucide-react';
import PageHero from '@/components/portfolio/PageHero';
import { CONTACT, SOCIALS, WhatsAppIcon } from '@/components/portfolio/shared';

const groups = [
  {
    title: 'Main Navigation',
    icon: Home,
    links: [
      { label: 'Home', desc: 'Hero, featured work, and quick navigation', to: '/' },
      { label: 'About Me', desc: 'My story, mission, and values', to: '/about' },
      { label: 'My Journey', desc: 'Career path and entrepreneurial timeline', to: '/' },
      { label: 'Mission, Vision & Values', desc: 'Principles that guide my work', to: '/' },
      { label: 'Skills & Technologies', desc: 'Technical and creative proficiencies', to: '/skills' },
      { label: 'Experience', desc: 'Professional career timeline', to: '/experience' },
      { label: 'Certifications', desc: 'Professional credentials and qualifications', to: '/certifications' },
      { label: 'Awards & Achievements', desc: 'Recognition and milestones', to: '/certifications' },
      { label: 'Featured Projects', desc: 'Highlighted work and case studies', to: '/portfolio' },
      { label: 'Case Studies', desc: 'In-depth project deep dives', to: '/case-studies' },
      { label: 'Client Testimonials', desc: 'Reviews and endorsements', to: '/testimonials' },
      { label: 'Services', desc: 'Offerings, packages, and process', to: '/services' },
      { label: 'Pricing', desc: 'Transparent pricing and plans', to: '/pricing' },
      { label: 'Book a Consultation', desc: 'Schedule a discovery or strategy call', to: '/book-consultation' },
      { label: 'Frequently Asked Questions', desc: 'Answers to common questions', to: '/faq' },
      { label: 'Blog', desc: 'Articles on tech, fashion, and business', to: '/blog' },
      { label: 'Resources', desc: 'Templates, guides, and tools', to: '/' },
      { label: 'Resume / CV', desc: 'Complete professional overview', to: '/resume' },
      { label: 'Contact', desc: 'Get in touch and start a project', to: '/contact' },
      { label: 'Newsletter', desc: 'Subscribe for updates and insights', to: '/contact' },
    ],
  },
  {
    title: 'Professional Services',
    icon: Wrench,
    links: [
      { label: 'Website Design & Development', desc: 'Fast, secure, responsive websites', to: '/services' },
      { label: 'E-commerce Development', desc: 'Online stores and payment integration', to: '/services' },
      { label: 'UI/UX Design', desc: 'Intuitive, user-centered interfaces', to: '/services' },
      { label: 'Brand Identity Design', desc: 'Logos, style guides, and visual systems', to: '/services' },
      { label: 'Search Engine Optimization (SEO)', desc: 'Rank higher and grow organic traffic', to: '/services' },
      { label: 'AI Solutions & Automation', desc: 'Chatbots, workflows, and integrations', to: '/services' },
      { label: 'Digital Marketing Strategy', desc: 'Campaigns that convert and scale', to: '/services' },
      { label: 'Business & Technology Consulting', desc: 'Strategic guidance for growth', to: '/services' },
    ],
  },
  {
    title: 'Consultations',
    icon: CalendarClock,
    links: [
      { label: 'Free Discovery Call', desc: 'Initial 15-minute introduction', to: '/book-consultation' },
      { label: 'Website Design Consultation', desc: 'Plan your next website project', to: '/book-consultation' },
      { label: 'Fashion Business Consultation', desc: 'Grow and scale your fashion brand', to: '/book-consultation' },
      { label: 'Logo & Brand Identity Consultation', desc: 'Define your visual identity', to: '/book-consultation' },
      { label: 'E-commerce Store Consultation', desc: 'Launch and optimize online sales', to: '/book-consultation' },
      { label: 'Digital Marketing Consultation', desc: 'Strategy and channel guidance', to: '/book-consultation' },
      { label: 'SEO Consultation', desc: 'Technical and content SEO review', to: '/book-consultation' },
      { label: 'AI Automation & Chatbot Consultation', desc: 'Automate support and workflows', to: '/book-consultation' },
      { label: 'Business Growth Strategy Consultation', desc: 'Roadmap for scaling', to: '/book-consultation' },
    ],
  },
  {
    title: 'Portfolio',
    icon: FolderGit2,
    links: [
      { label: 'Featured Projects', desc: 'Highlighted work and case studies', to: '/portfolio' },
      { label: 'Project Details', desc: 'Deep dives into individual projects', to: '/case-studies' },
      { label: 'Case Studies', desc: 'Challenges, solutions, and results', to: '/case-studies' },
      { label: 'Technologies Used', desc: 'Stack and tools across projects', to: '/skills' },
      { label: 'Project Gallery', desc: 'Visual showcase of completed work', to: '/bless-fashion-house' },
    ],
  },
  {
    title: 'Blog',
    icon: BookOpen,
    links: [
      { label: 'All Articles', desc: 'Browse every published post', to: '/blog' },
      { label: 'Categories', desc: 'Filter articles by topic', to: '/blog' },
      { label: 'Tags', desc: 'Explore content by tag', to: '/blog' },
      { label: 'Search Articles', desc: 'Find specific tutorials and insights', to: '/blog' },
      { label: 'Featured Articles', desc: 'Editorâ€™s picks and popular reads', to: '/blog' },
      { label: 'Latest Articles', desc: 'Newest publications', to: '/blog' },
    ],
  },
  {
    title: 'Resources',
    icon: Layers,
    links: [
      { label: 'Website Development', desc: 'Checklists, templates, and guides', to: '/' },
      { label: 'Branding & Design', desc: 'Brand identity and style resources', to: '/' },
      { label: 'Business & Entrepreneurship', desc: 'Plans, growth, and strategy tools', to: '/' },
      { label: 'Artificial Intelligence', desc: 'Prompt engineering and AI guides', to: '/' },
      { label: 'E-commerce', desc: 'Listing, inventory, and support templates', to: '/' },
      { label: 'Digital Marketing', desc: 'SEO, content, and social guides', to: '/' },
    ],
  },
  {
    title: 'Legal Pages',
    icon: Shield,
    links: [
      { label: 'Privacy Policy', desc: 'How your data is collected and protected', to: '/privacy' },
      { label: 'Terms of Service', desc: 'Terms of use and project agreements', to: '/terms' },
      { label: 'Sitemap', desc: 'This page â€” a full site overview', to: '/sitemap' },
    ],
  },
  {
    title: 'Contact',
    icon: Mail,
    links: [
      { label: 'Contact Form', desc: 'Send a message directly', to: '/contact' },
      { label: 'WhatsApp', desc: 'Quick chat and enquiries', to: CONTACT.whatsappLink, external: true },
      { label: 'Telephone', desc: 'Call during business hours', to: 'tel:+256707333422', external: true },
      { label: 'Calendly Booking', desc: 'Schedule a consultation online', to: CONTACT.calendly, external: true },
    ],
  },
  {
    title: 'Social Media',
    icon: MessageCircle,
    links: [
      { label: 'WhatsApp', desc: 'Primary contact for quick communication', to: CONTACT.whatsappLink, external: true },
      { label: 'Share2', desc: 'Business updates and announcements', to: SOCIALS.Share2, external: true },
      { label: 'Share2', desc: 'Fashion content and creative work', to: SOCIALS.Share2, external: true },
      { label: 'X (Share2)', desc: 'Technology discussions and AI insights', to: SOCIALS.Share2, external: true },
      { label: 'TikTok', desc: 'Short educational and fashion videos', to: SOCIALS.tiktok, external: true },
    ],
  },
];

const linkIcon = (label) => {
  const map = {
    Home, 'About Me': User, 'My Journey': Compass, 'Mission, Vision & Values': Target,
    'Skills & Technologies': Cpu, Experience: Briefcase, Certifications: Award,
    'Awards & Achievements': Trophy, 'Featured Projects': FolderGit2, 'Case Studies': FileSearch,
    'Client Testimonials': Star, Services: Wrench, Pricing: DollarSign,
    'Book a Consultation': CalendarClock, 'Frequently Asked Questions': HelpCircle,
    Blog: BookOpen, Resources: Layers, 'Resume / CV': Download, Contact: Mail, Newsletter: Newspaper,
  };
  return map[label] || FileText;
};

export default function Sitemap() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(groups.map((g) => g.title));

  const q = query.toLowerCase().trim();
  const filtered = useMemo(() => {
    if (!q) return groups;
    return groups
      .map((g) => ({ ...g, links: g.links.filter((l) => l.label.toLowerCase().includes(q) || l.desc.toLowerCase().includes(q)) }))
      .filter((g) => g.links.length > 0);
  }, [q]);

  const toggle = (title) => setOpen((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));

  return (
    <>
      <PageHero
        title="Sitemap"
        subtitle="Browse every page, section, and major feature available on my portfolio website."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Sitemap' }]}
      />

      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Intro + Search */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-graphite font-light leading-relaxed">
              This sitemap provides a structured overview of the entire website, making it easier for visitors to quickly find pages, services, resources, and important information.
            </p>
          </div>
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-graphite" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the website..."
                aria-label="Search the website"
                className="w-full pl-12 pr-4 py-3.5 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/60 focus:outline-none focus:border-vapor/30 transition bg-transparent"
              />
            </div>
          </div>

          {/* Groups */}
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <p className="text-alabaster font-light">No pages match your search. Try a different term.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((group, gi) => {
                const GIcon = group.icon;
                const isOpen = open.includes(group.title);
                return (
                  <motion.div
                    key={group.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ duration: 0.5, delay: (gi % 3) * 0.08 }}
                    className="glass rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(group.title)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition"
                      aria-expanded={isOpen}
                    >
                      <div className="w-10 h-10 rounded-xl bg-vapor/10 flex items-center justify-center flex-shrink-0">
                        <GIcon size={18} className="text-vapor" />
                      </div>
                      <span className="font-mono text-vapor text-xs tracking-[0.25em] uppercase flex-1">{group.title}</span>
                      <ChevronDown size={16} className={`text-graphite transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden px-5 pb-5 space-y-2"
                        >
                          {group.links.map((link) => {
                            const LIcon = linkIcon(link.label);
                            const content = (
                              <div className="group flex items-start gap-3 py-2.5 px-3 -mx-3 rounded-lg hover:bg-white/5 transition">
                                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-vapor/15 transition">
                                  {link.label === 'WhatsApp' && group.title === 'Social Media' ? <WhatsAppIcon size={14} className="text-vapor" /> : <LIcon size={14} className="text-vapor" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1">
                                    <span className="text-alabaster text-sm font-medium group-hover:text-vapor transition">{link.label}</span>
                                    {link.external ? <ExternalLink size={11} className="text-graphite/50" /> : <ArrowUpRight size={13} className="text-vapor opacity-0 group-hover:opacity-100 transition" />}
                                  </div>
                                  <p className="text-graphite text-xs font-light mt-0.5 leading-snug">{link.desc}</p>
                                </div>
                              </div>
                            );
                            return (
                              <li key={link.label}>
                                {link.external ? (
                                  <a href={link.to} target="_blank" rel="noopener noreferrer" className="block">{content}</a>
                                ) : (
                                  <Link to={link.to} className="block">{content}</Link>
                                )}
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Footer message */}
          <div className="mt-16 text-center">
            <div className="glass-strong rounded-3xl p-8 sm:p-10 max-w-2xl mx-auto">
              <h3 className="font-heading text-2xl font-light text-alabaster mb-3">Can't find what you're looking for?</h3>
              <p className="text-graphite font-light text-sm mb-6">
                Visit the Contact page or use the website search to quickly locate the information you need.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="flex items-center gap-2 px-6 py-3 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition">
                  <Mail size={16} /> Visit Contact Page
                </Link>
                <button
                  onClick={() => { setQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition"
                >
                  <Search size={16} /> Clear Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

