import { useState } from 'react';

/**
 * Optimized image: lazy-loads, prevents layout shift via aspect ratio,
 * shows a shimmer placeholder, and fades in on load.
 */
export default function SmartImage({ src, alt, width, height, aspect = '3/2', className = '', imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  return (
    <div
      className={`relative overflow-hidden bg-white/[0.04] ${className}`}
      style={{ aspectRatio: aspect.replace('x', ' / ') }}
    >
      {!loaded && !errored && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/[0.03] to-white/[0.06]" />
      )}
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center text-graphite text-xs">Image unavailable</div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
}