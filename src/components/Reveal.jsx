import { motion, useReducedMotion } from 'framer-motion';

const offsets = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
  scale: { scale: 0.92 },
  zoom: { scale: 0.85 },
  blur: {},
};

export default function Reveal({ children, direction = 'up', delay = 0, duration = 0.6, className = '', once = true }) {
  const reduce = useReducedMotion();
  const off = reduce ? {} : (offsets[direction] || offsets.up);
  const isBlur = direction === 'blur' && !reduce;
  return (
    <motion.div
      initial={{ opacity: 0, ...off, ...(isBlur ? { filter: 'blur(10px)' } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}