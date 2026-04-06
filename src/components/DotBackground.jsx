import React, { useEffect, useRef, useCallback } from 'react';

const COLS = 28;
const ROWS = 20;
const DOT_RADIUS = 3;
const REPEL_RADIUS = 120;
const SPRING = 0.12;
const DAMPING = 0.72;
const MAX_LIFT = 28;
const ROSE_COLORS = [
  'rgba(244,114,182,',   // pink-400
  'rgba(236,72,153,',    // pink-500
  'rgba(251,191,212,',   // rose-200
  'rgba(253,164,175,',   // rose-300
  'rgba(244,63,94,',     // rose-500
  'rgba(216,180,254,',   // purple-300
  'rgba(192,132,252,',   // purple-400
];

export default function DotBackground() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const dotsRef = useRef([]);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  const initDots = useCallback((w, h) => {
    const cols = Math.ceil(w / (w / COLS));
    const rows = Math.ceil(h / (h / ROWS));
    const spacingX = w / (COLS - 1);
    const spacingY = h / (ROWS - 1);
    const dots = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ox = c * spacingX;
        const oy = r * spacingY;
        const colorBase = ROSE_COLORS[Math.floor(Math.random() * ROSE_COLORS.length)];
        dots.push({
          ox, oy,
          x: ox, y: oy,
          vx: 0, vy: 0,
          color: colorBase,
          baseAlpha: 0.18 + Math.random() * 0.12,
          size: DOT_RADIUS * (0.7 + Math.random() * 0.7),
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const dot of dotsRef.current) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Repel from mouse
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (1 - dist / REPEL_RADIUS);
          const angle = Math.atan2(dy, dx);
          dot.vx += Math.cos(angle) * force * 6;
          dot.vy += Math.sin(angle) * force * 6;
        }

        // Spring back to origin
        dot.vx += (dot.ox - dot.x) * SPRING;
        dot.vy += (dot.oy - dot.y) * SPRING;

        // Damping
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Alpha based on displacement
        const displacement = Math.sqrt((dot.x - dot.ox) ** 2 + (dot.y - dot.oy) ** 2);
        const liftRatio = Math.min(displacement / MAX_LIFT, 1);
        const alpha = dot.baseAlpha + liftRatio * 0.65;
        const size = dot.size + liftRatio * dot.size * 1.2;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `${dot.color}${alpha.toFixed(3)})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
