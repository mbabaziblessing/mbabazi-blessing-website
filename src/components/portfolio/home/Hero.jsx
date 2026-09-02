import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code, Cpu, Sparkles, Palette, Rocket, Brain, ArrowDown,
  Eye, Briefcase, Calendar, Download, MapPin,
} from 'lucide-react';
import { IMAGES } from '@/components/portfolio/shared';
import MagneticButton from '@/components/portfolio/MagneticButton';

const stats = [
  { value: '25+', label: 'Projects Completed' },
  { value: '15+', label: 'Professional Services' },
  { value: '5+', label: 'Business Ventures' },
  { value: '100%', label: 'Commitment' },
];

const titleRoles = [
  'Fashion Entrepreneur',
  'Full-Stack Web Developer',
  'UI/UX Designer',
  'Digital Business Strategist',
  'Brand Consultant',
  'E-commerce Specialist',
  'AI Solutions Developer',
];

const buttons = [
  { label: 'View Portfolio', to: '/portfolio', icon: Eye, primary: true },
  { label: 'Explore Services', to: '/services', icon: Briefcase },
  { label: 'Book a Consultation', to: '/book-consultation', icon: Calendar },
  { label: 'Download Resume', to: '/resume', icon: Download },
];

const floatingIcons = [
  { Icon: Code, top: '14%', left: '7%' },
  { Icon: Cpu, top: '20%', right: '6%' },
  { Icon: Sparkles, bottom: '26%', left: '9%' },
  { Icon: Palette, bottom: '16%', right: '10%' },
  { Icon: Brain, top: '48%', right: '4%' },
  { Icon: Rocket, bottom: '44%', left: '4%' },
];

function useTypewriter(words, { typeSpeed = 90, deleteSpeed = 40, pause = 1600 } = {}) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typed = useTypewriter(titleRoles);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-obsidian" />
      <motion.div
        initial={{ opacity: 0.24, scale: 1.08 }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0.19, scale: 1.1 }}
        className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0.1, scale: 1.05 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-vapor/10 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '42px 42px' }}
      />

      {/* Floating tech icons */}
      <motion.div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingIcons.map(({ Icon, top, left, right, bottom }, i) => (
          <motion.div
            key={i}
            className="absolute text-vapor/25"
            style={{ top, left, right, bottom }}
            initial={{ opacity: 0.3 }}
          >
            <Icon size={38} strokeWidth={1.4} />
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-28 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="font-mono text-sm sm:text-base text-vapor tracking-[0.25em] uppercase mb-4">Hello, I'm</p>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-alabaster leading-[0.9] tracking-tight mb-5">
              Mbabazi <span className="gradient-text">Blessing</span>
            </h1>

            {/* Typing animation */}
            <div className="flex items-center gap-2 mb-6 h-7">
              <span className="text-graphite text-sm sm:text-base font-light">I'm a</span>
              <span className="font-mono text-base sm:text-lg text-alabaster">
                {typed}
                <span className="typing-cursor text-vapor ml-0.5">|</span>
              </span>
            </div>

            <p className="text-graphite text-sm sm:text-base leading-relaxed max-w-xl font-light mb-8">
              I am a passionate entrepreneur and technology enthusiast dedicated to building innovative digital
              solutions that empower individuals, businesses, and communities. I specialize in website development,
              UI/UX design, e-commerce solutions, branding, AI integration, digital marketing, and software
              development. Through my businesses and projects, I strive to create meaningful products that solve
              real-world problems, improve user experiences, and drive sustainable growth.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              {buttons.map(({ label, to, icon: Icon, primary }, i) => (
                <MagneticButton key={label} strength={0.3}>
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                  >
                    <Link
                      to={to}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-vapor/20 ${
                        primary ? 'bg-vapor text-white hover:bg-vapor/90' : 'glass text-alabaster hover:bg-white/10'
                      }`}
                    >
                      <Icon size={16} /> {label}
                    </Link>
                  </motion.div>
                </MagneticButton>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-4 text-center hover:border-vapor/25 transition-all duration-500"
                >
                  <p className="font-heading text-2xl sm:text-3xl font-light gradient-text">{s.value}</p>
                  <p className="text-graphite text-[10px] sm:text-xs font-mono mt-1 uppercase tracking-wider leading-tight">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <motion.div
              className="relative"
            >
              <div className="absolute -inset-3 bg-gradient-to-br from-violet-500/30 via-vapor/20 to-blue-500/30 rounded-[2rem] blur-2xl" />
              <div className="relative w-64 h-80 sm:w-80 sm:h-[420px] lg:w-96 lg:h-[500px] rounded-[2rem] overflow-hidden border border-white/10">
                <img src={IMAGES.portrait} alt="Mbabazi Blessing — Fashion Entrepreneur and Full-Stack Developer" className="w-full h-full object-cover" loading="eager" width="384" height="500" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
              </div>

              {/* Floating location chip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-strong rounded-full px-4 py-2.5 flex items-center gap-2 whitespace-nowrap"
              >
                <MapPin size={14} className="text-vapor" />
                <span className="text-alabaster text-xs font-light">Uganda</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Primary focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 lg:mt-16 max-w-3xl"
        >
          <div className="glass rounded-2xl px-5 py-4 flex items-start gap-3">
            <Sparkles size={18} className="text-vapor flex-shrink-0 mt-0.5" />
            <p className="text-graphite text-sm font-light leading-relaxed">
              <span className="text-alabaster font-medium">Primary Focus:</span> Building modern digital experiences
              through technology, fashion, business innovation, and artificial intelligence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => window.scrollTo({ top: window.innerHeight - 60, behavior: 'smooth' })}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-graphite hover:text-vapor transition cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll Down</span>
        <motion.div>
          <ArrowDown size={16} className="text-vapor" />
        </motion.div>
      </motion.button>
    </section>
  );
}