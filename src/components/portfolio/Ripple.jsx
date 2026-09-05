import { useState, useCallback } from 'react';

export default function Ripple({ children, className = '', color = 'rgba(255,255,255,0.35)' }) {
  const [ripples, setRipples] = useState([]);

  const handleClick = useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const x = e.clientX - r.left - size / 2;
    const y = e.clientY - r.top - size / 2;
    const id = Date.now() + Math.random();
    setRipples((prev) => [...prev, { id, x, y, size }]);
    setTimeout(() => setRipples((prev) => prev.filter((rp) => rp.id !== id)), 600);
  }, []);

  return (
    <span className={`relative overflow-hidden inline-flex ${className}`} onClick={handleClick}>
      {children}
      {ripples.map((rp) => (
        <span
          key={rp.id}
          style={{ left: rp.x, top: rp.y, width: rp.size, height: rp.size, background: color }}
          className="absolute rounded-full pointer-events-none animate-ripple"
        />
      ))}
    </span>
  );
}