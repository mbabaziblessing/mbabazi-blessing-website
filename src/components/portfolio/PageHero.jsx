import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-obsidian" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-vapor/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-xs font-mono text-graphite mb-6" aria-label="Breadcrumb">
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              {b.path ? (
                <Link to={b.path} className="hover:text-vapor transition">{b.label}</Link>
              ) : (
                <span className="text-alabaster">{b.label}</span>
              )}
              {i < breadcrumb.length - 1 && <ChevronRight size={12} className="text-graphite/50" />}
            </React.Fragment>
          ))}
        </nav>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-alabaster leading-[0.9]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-graphite font-light text-base sm:text-lg max-w-2xl mt-5"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}