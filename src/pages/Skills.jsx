import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import PageHero from '@/components/portfolio/PageHero';

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 }, { name: 'CSS3', level: 92 },
      { name: 'JavaScript', level: 90 }, { name: 'React', level: 88 }, { name: 'Next.js', level: 82 },
    ],
  },
  {
    title: 'Backend',
    skills: [{ name: 'Node.js', level: 85 }, { name: 'Express', level: 83 }],
  },
  {
    title: 'Databases',
    skills: [{ name: 'MySQL', level: 80 }, { name: 'MongoDB', level: 78 }, { name: 'Firebase', level: 82 }],
  },
  {
    title: 'Design Tools',
    skills: [
      { name: 'Figma', level: 88 }, { name: 'Canva', level: 92 },
      { name: 'Photoshop', level: 80 }, { name: 'Illustrator', level: 75 },
    ],
  },
  {
    title: 'Business',
    skills: [
      { name: 'SEO', level: 85 }, { name: 'Branding', level: 90 },
      { name: 'Marketing', level: 87 }, { name: 'E-commerce', level: 88 }, { name: 'Social Media', level: 92 },
    ],
  },
  {
    title: 'Dev Tools',
    skills: [      { name: 'Git', level: 90 }, { name: 'VS Code', level: 95 }, { name: 'Tailwind CSS', level: 92 }],
  },
];

function SkillBar({ name, level, delay }) {
  const [ref, isVisible] = useScrollAnimation(0.2);
  return (
    <div ref={ref} className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-alabaster font-light">{name}</span>
        <span className="font-mono text-xs text-vapor">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div initial={{ width: 0 }} animate={isVisible ? { width: `${level}%` } : {}} transition={{ duration: 1, delay: delay * 0.1, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-vapor to-indigo-400" />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <PageHero
        title="Skills"
        subtitle="Technical proficiency across development, design, and business strategy — the tools that power my craft."
        breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Skills' }]}
      />
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, gi) => (
              <motion.div key={group.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: gi * 0.1 }} className="glass rounded-2xl p-6 hover:border-vapor/20 transition-all duration-500">
                <h3 className="font-mono text-xs text-vapor tracking-[0.2em] uppercase mb-6">{group.title}</h3>
                {group.skills.map((skill, si) => <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={si} />)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}