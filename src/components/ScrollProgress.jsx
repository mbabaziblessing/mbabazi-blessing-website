import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = null;

    const updateProgress = () => {
      if (frame) return;

      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        setProgress(
          scrollHeight > 0
            ? Math.min(1, Math.max(0, scrollTop / scrollHeight))
            : 0
        );

        frame = null;
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      style={{ transform: `scaleX(${progress})` }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-vapor via-blue-500 to-violet-500"
      aria-hidden="true"
    />
  );
}