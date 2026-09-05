import { motion } from 'framer-motion';
import {
  Code, Palette, ShoppingBag, Sparkles, Search, Bot,
  Briefcase, TrendingUp, Megaphone, Layers, Target,
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { IMAGES } from '@/config/site';

const whatIDo = [
  { icon: Code, label: 'Full-Stack Website Development' },
  { icon: Palette, label: 'UI/UX Design' },
  { icon: ShoppingBag, label: 'E-commerce Development' },
  { icon: Sparkles, label: 'Brand Identity Design' },
  { icon: Search, label: 'Search Engine Optimization (SEO)' },
  { icon: Bot, label: 'AI Solutions Development' },
  { icon: Briefcase, label: 'Business Strategy & Digital Transformation' },
  { icon: TrendingUp, label: 'Fashion Entrepreneurship' },
  { icon: Layers, label: 'Custom Software Development' },
  { icon: Megaphone, label: 'Digital Marketing' },
];

export default function AboutSection() {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-vapor text-xs tracking-[0.3em] uppercase mb-3"
          >
            Who I Am
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-heading text-4xl sm:text-5xl font-light text-alabaster"
          >
            About Me
          </motion.h2>
        </div>

        {/* Intro two-column */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-graphite text-base font-light leading-relaxed"
          >
            <p>
              My name is <span className="text-alabaster font-medium">Mbabazi Blessing</span>, a Fashion Entrepreneur,
              Full-Stack Web Developer, UI/UX Designer, Brand Strategist, AI Solutions Developer, and Digital
              Innovator based in Uganda.
            </p>
            <p>
              I am passionate about creating modern digital solutions that help businesses, entrepreneurs, and
              organizations grow through technology, creativity, and innovation. My work combines software
              development, user experience design, branding, e-commerce, artificial intelligence, and fashion
              entrepreneurship to deliver professional, practical, and impactful solutions.
            </p>
            <p>
              I founded <span className="text-alabaster font-medium">Bless Fashion House</span> to provide quality
              fashion products and services, including clothing, shoes, bags, beauty products, accessories,
              uniforms, and custom tailoring. Alongside fashion, I develop modern websites, digital platforms,
              AI-powered applications, and business solutions that improve efficiency and create better customer
              experiences.
            </p>
            <p>
              My mission is to build businesses, technologies, and brands that solve real-world problems while
              creating opportunities for people and contributing to sustainable economic growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-br from-violet-500/25 via-vapor/15 to-blue-500/25 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 aspect-[4/5]">
              <img src={IMAGES.workspace} alt="Mbabazi Blessing at work" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* What I Do */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-vapor/40 to-transparent" />
            <h3 className="font-heading text-2xl sm:text-3xl font-light text-alabaster">What I Do</h3>
            <div className="h-px flex-1 bg-gradient-to-l from-vapor/40 to-transparent" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {whatIDo.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="glass rounded-2xl p-5 hover:border-vapor/25 hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-vapor/10 flex items-center justify-center mb-3 group-hover:bg-vapor/20 transition">
                    <Icon size={18} className="text-vapor" />
                  </div>
                  <p className="text-alabaster text-sm font-light leading-snug">{item.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* My Goal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-5 items-start"
        >
          <div className="w-12 h-12 rounded-xl bg-vapor/15 flex items-center justify-center flex-shrink-0">
            <Target size={22} className="text-vapor" />
          </div>
          <div>
            <h3 className="font-mono text-vapor text-xs uppercase tracking-wider mb-2">My Goal</h3>
            <p className="text-graphite text-base font-light leading-relaxed">
              My goal is to build solutions that make businesses more efficient, strengthen brands, improve
              customer experiences, and create meaningful opportunities through technology, entrepreneurship, and
              innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}