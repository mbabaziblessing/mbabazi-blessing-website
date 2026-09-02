import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export default function TiltCard({ children, className = '', max = 8, glare = true }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 18 });
  const sry = useSpring(ry, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(srx, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sry, [-0.5, 0.5], [-max, max]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12), transparent 55%)`;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rx.set(py);
    ry.set(px);
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      whileHover={{ scale: 1.02 }}
      className={`relative rounded-2xl transition-shadow duration-500 ${hovered ? 'shadow-xl shadow-vapor/10 border-vapor/25' : ''} ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          style={{ background: glareBg, opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}