import React from 'react';

export default function Skeleton({ className = '', aspect }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/[0.04] ${className}`}
      style={aspect ? { aspectRatio: aspect.replace('x', ' / ') } : undefined}
      aria-hidden="true"
    />
  );
}