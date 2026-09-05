import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Palette, ShoppingBag, TrendingUp, Globe, Zap, Scissors, Users, Target, Eye, Heart } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/portfolio/PageHero';
import HomeResources from '@/components/portfolio/home/Resources';
import Journey from '@/components/portfolio/home/Journey';

const expertise = [
  { icon: Code2, label: 'Web Development' },
  { icon: Palette, label: 'UI/UX Design' },
  { icon: TrendingUp, label: 'Branding' },
  { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Globe, label: 'Digital Marketing' },
  { icon: Zap, label: 'SEO' },
  { icon: Scissors, label: 'Fashion Business' },
  { icon: Users, label: 'Business Consulting' },
];

const values = [
  { icon: Target, title: 'Mission', text: 'To empower African businesses with world-class digital experiences that compete on a global stage — blending fashion, technology, and strategy.' },
  { icon: Eye, title: 'Vision', text: 'To be the bridge between African creativity and global digital excellence, building brands and products that inspire and endure.' },
  { icon: Heart, title: 'Values', text: 'Craftsmanship, integrity, and relentless innovation. I believe quality is never an accident — it is always the result of intelligent effort.' },
];

const achievements = [
  'Founded Bless Fashion House in 2021',
  'Delivered 80+ projects across 5 countries',
  'Helped clients rank on Google\'s first page',
  'Built e-commerce platforms that doubled sales',
  'Spoke at regional tech and fashion events',
  'Mentored young developers and entrepreneurs',
];

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 80, suffix: '+', label: 'Projects Completed' },
  { value: 50, suffix: '+', label: 'Happy Clients' },
  { value: 30, suffix: '+', label: 'Technologies Used' },
];

function StatCard({ stat }) {
  const [ref, isVisible] = useScrollAnimation(0.3);
  const count = useCountUp(stat.value, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-3xl sm:text-4xl font-semibold text-vapor mb-1">{count}{stat.suffix}</div>
      <div className="text-graphite text-sm font-light">{stat.label}</div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        title="About Me"
        subtitle="A multidisciplinary entrepreneur bridging the worlds of fashion, technology, and brand strategy."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'About' }]}
      />

      {/* Biography */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="font-heading text-3xl sm:text-4xl font-light text-alabaster mb-6">Biography</h2>
              <p className="text-graphite text-base sm:text-lg leading-relaxed mb-6 font-light">
                I'm Mbabazi Blessing, a multidisciplinary entrepreneur and technologist based in Kampala, Uganda. With over five years of experience spanning web development, fashion entrepreneurship, and brand strategy, I bring a unique perspective to every project.
              </p>
              <p className="text-graphite text-base sm:text-lg leading-relaxed mb-8 font-light">
                As the founder of Bless Fashion House and an active freelance developer, I bridge the gap between creative vision and technical execution. I specialize in building high-performance websites, crafting intuitive user experiences, and developing brand identities that resonate across digital and physical landscapes.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {expertise.map(({ icon: Icon, label }) => (
                  <div key={label} className="glass rounded-xl p-3 text-center group hover:bg-vapor/10 transition">
                    <Icon size={20} className="text-vapor mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-graphite group-hover:text-alabaster transition">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-vapor/10 to-transparent rounded-3xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden border border-white/8">
                <img src="/assets/portfolio/about-me.jpg" alt="Mbabazi Blessing" className="w-full h-auto object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, text }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-8">
                <div className="w-12 h-12 rounded-xl bg-vapor/10 flex items-center justify-center mb-4">
                  <Icon size={22} className="text-vapor" />
                </div>
                <h3 className="text-alabaster font-medium text-lg mb-3">{title}</h3>
                <p className="text-graphite text-sm font-light leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-alabaster mb-10">Personal Achievements</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass rounded-xl p-5 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-vapor/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-vapor font-mono text-sm">{i + 1}</span>
                </div>
                <p className="text-graphite text-sm font-light">{a}</p>
              </motion.div>
            ))}
          </div>
          <Link to="/experience" className="inline-flex items-center gap-2 mt-8 px-6 py-3 glass text-alabaster rounded-xl text-sm font-medium hover:bg-white/10 transition">
            View Full Professional Journey →
          </Link>
        </div>
      </section>

      <Journey />

      {/* Stats */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-strong rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {stats.map((stat) => <StatCard key={stat.label} stat={stat} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <HomeResources />
    </>
  );
}