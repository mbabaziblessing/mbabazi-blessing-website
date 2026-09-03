import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full glass-strong border border-vapor/30 text-vapor shadow-lg shadow-vapor/20 transition-all duration-300 ${
        show
          ? 'visible translate-y-0 scale-100 opacity-100'
          : 'invisible translate-y-2 scale-75 opacity-0'
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}