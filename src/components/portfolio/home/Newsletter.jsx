import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Check, Bell, Shield, AlertCircle, Users, FileText, Share2, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const benefits = ['Website Development Tips', 'Artificial Intelligence Updates', 'UI/UX Design Insights', 'Business Growth Strategies', 'Branding Advice', 'Digital Marketing Guides', 'SEO Best Practices', 'E-commerce Tutorials', 'Fashion Business Updates', 'Project Announcements', 'Free Resources', 'Exclusive Templates', 'Portfolio Updates', 'Technology News'];
const frequency = ['Monthly Newsletter', 'Important Project Announcements', 'New Blog Articles', 'Major Product Releases'];

export default function Newsletter() {
  const [ref, isVisible] = useScrollAnimation();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName.trim()) return setError('Please enter your first name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError('Please enter a valid email address.');
    if (!consent) return setError('Please accept the newsletter agreement to subscribe.');
    try {
      setStatus('success');
      setForm({ firstName: '', lastName: '', email: '' });
      setConsent(false);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} className="relative py-24 border-t border-white/5">
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3">Join the Community</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.05 }} className="font-heading text-4xl sm:text-5xl font-light text-alabaster mb-4">Subscribe to My Newsletter</motion.h2>
          <p className="text-graphite font-light max-w-2xl mx-auto">Stay informed with the latest articles, technology insights, AI updates, business strategies, web development tutorials, fashion innovations, and exclusive resources.</p>
          <p className="text-graphite/80 text-sm font-light max-w-3xl mx-auto mt-5 leading-relaxed">Join my newsletter to receive valuable content designed to help entrepreneurs, businesses, developers, designers, and technology enthusiasts stay ahead in today's digital world. Subscribers receive practical insights, project updates, learning resources, and exclusive content delivered directly to their inbox.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Illustration + benefits */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass rounded-3xl p-8 flex flex-col">
            <div className="relative h-40 rounded-2xl bg-gradient-to-br from-vapor/20 to-blue-500/10 flex items-center justify-center mb-6 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-vapor/20 rounded-full blur-3xl" />
              <Mail size={56} className="text-vapor relative" />
            </div>
            <h3 className="font-heading text-xl font-light text-alabaster mb-4">What You'll Receive</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-6">
              {benefits.map((b) => <li key={b} className="flex items-start gap-2 text-graphite text-xs font-light"><Check size={13} className="text-vapor mt-0.5 flex-shrink-0" /> {b}</li>)}
            </ul>
            <div className="mt-auto grid grid-cols-3 gap-3">
              {[{ icon: Users, label: 'Subscribers' }, { icon: FileText, label: 'Articles Published' }, { icon: Share2, label: 'Resources Shared' }].map((c) => { const Icon = c.icon; return (
                <div key={c.label} className="glass rounded-xl p-3 text-center">
                  <Icon size={18} className="text-vapor mx-auto mb-1.5" />
                  <p className="text-graphite/70 text-[10px] font-mono uppercase tracking-wider leading-tight">{c.label}</p>
                </div>
              ); })}
            </div>
            <p className="text-graphite/50 text-[11px] font-light text-center mt-4 italic">Statistics will appear as the community grows.</p>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="glass-strong rounded-3xl p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-5"><Bell size={18} className="text-vapor" /><h3 className="font-heading text-xl font-light text-alabaster">Subscribe Now</h3></div>

            {status === 'success' && (
              <div className="mb-5 flex items-start gap-2.5 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <Check size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-alabaster text-sm font-medium">Thank you for subscribing!</p>
                  <p className="text-graphite text-xs font-light mt-1">Your subscription has been confirmed successfully. Please check your email for a confirmation message.</p>
                </div>
              </div>
            )}
            {status === 'error' && (
              <div className="mb-5 flex items-start gap-2.5 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-alabaster text-sm font-light">Sorry, your subscription could not be completed. Please try again later.</p>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-graphite text-xs font-light mb-1.5">First Name <span className="text-vapor">*</span></label>
                  <input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} placeholder="First name" className="w-full px-4 py-3 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/50 focus:outline-none focus:border-vapor/30 transition bg-transparent" />
                </div>
                <div>
                  <label className="block text-graphite text-xs font-light mb-1.5">Last Name (Optional)</label>
                  <input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} placeholder="Last name" className="w-full px-4 py-3 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/50 focus:outline-none focus:border-vapor/30 transition bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-graphite text-xs font-light mb-1.5">Email Address <span className="text-vapor">*</span></label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="w-full px-4 py-3 glass rounded-xl text-alabaster text-sm placeholder:text-graphite/50 focus:outline-none focus:border-vapor/30 transition bg-transparent" />
              </div>
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 rounded accent-vapor flex-shrink-0" />
                <span className="text-graphite text-xs font-light leading-relaxed">I agree to receive newsletters, updates, and promotional emails from Mbabazi Blessing. I understand that I can unsubscribe at any time.</span>
              </label>
              <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-vapor text-white rounded-xl font-medium text-sm hover:bg-vapor/90 transition"><Mail size={16} /> Subscribe Now</button>
            </form>

            {/* Frequency */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="font-mono text-[10px] text-vapor uppercase tracking-wider mb-2">Email Frequency</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {frequency.map((f) => <span key={f} className="px-2.5 py-1 rounded-lg bg-white/5 text-graphite text-[11px] font-light">{f}</span>)}
              </div>
              <p className="text-graphite/60 text-[11px] font-light">No spam. Unsubscribe anytime.</p>
            </div>

            {/* Privacy */}
            <div className="mt-5 flex items-start gap-2 text-graphite/70 text-[11px] font-light leading-relaxed">
              <Shield size={14} className="text-vapor mt-0.5 flex-shrink-0" />
              <span>Your personal information will only be used to send newsletters and updates from Mbabazi Blessing. Your information will never be sold, shared, or distributed to third parties without your permission.</span>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
          <p className="text-alabaster font-heading text-xl font-light max-w-xl mx-auto mb-2">Become part of my growing community of entrepreneurs, developers, designers, and innovators.</p>
          <p className="text-graphite font-light text-sm mb-5">Let's learn, build, and grow together.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 glass text-alabaster rounded-xl font-medium text-sm hover:bg-white/10 transition">View All Articles <ArrowRight size={15} /></Link>
        </motion.div>
      </div>
    </section>
  );
}