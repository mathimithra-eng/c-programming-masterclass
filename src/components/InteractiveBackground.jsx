import React from 'react';

/* ─────────────────────────────────────────────────────────
   Static Navy Blue Background — 2 colours only:
     Primary : #001233  (deep navy blue)
     Secondary: #0a1628  (slightly lighter navy)
   Zero animations — pure CSS, no canvas, no motion.
───────────────────────────────────────────────────────── */

export default function InteractiveBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        background: 'linear-gradient(160deg, #001233 0%, #0a1628 100%)',
      }}
    >
      {/* Static dot grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(14,165,233,0.10) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }} />

      {/* Static top-left glow */}
      <div style={{
        position: 'absolute',
        top: '-8%', left: '-4%',
        width: '42%', height: '52%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.07) 0%, transparent 70%)',
      }} />

      {/* Static top-right glow */}
      <div style={{
        position: 'absolute',
        top: '-4%', right: '-6%',
        width: '38%', height: '46%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(10,31,61,0.50) 0%, transparent 70%)',
      }} />

      {/* Static bottom glow */}
      <div style={{
        position: 'absolute',
        bottom: '-8%', left: '28%',
        width: '44%', height: '42%',
        borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(14,165,233,0.05) 0%, transparent 70%)',
      }} />
    </div>
  );
}
