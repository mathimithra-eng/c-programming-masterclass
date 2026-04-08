import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import Slide, { SlideItem } from '../components/Slide';
import Diagram from '../components/Diagram';


import ProgressBar from '../components/ProgressBar';
import InteractiveBackground from '../components/InteractiveBackground';
import RightPanel from '../components/RightPanel';
import '../styles/course.css';

/* ─── Animated Card Wrapper ──────────────────────────────── */
const AnimCard = ({ children, className = '', delay = 0 }) => {
  const [blown, setBlown] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: '-8%' }}
      transition={{ duration: 0.6, delay, type: 'spring', bounce: 0.3 }}
      animate={blown ? {
        scale: [1, 1.08, 0.95, 1.04, 1],
        rotate: [0, -3, 3, -1, 0],
        y: [0, -16, 4, -6, 0],
      } : {
        y: [0, -5, 0],
        transition: { duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.3 }
      }}
      transistion={blown ? { duration: 0.55, ease: 'easeInOut' } : { y: { duration: 3.5 + delay * 0.5, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.3 } }}
      whileHover={{ scale: 1.03, y: -8, boxShadow: '0 18px 50px rgba(56,189,248,0.25)', transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.97 }}
      onClick={() => { setBlown(true); setTimeout(() => setBlown(false), 600); }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* ─── Reusable UI ──────────────────────────────────────────── */
const CodeBlock = ({ filename, children }) => (
  <AnimCard className="w-full max-w-4xl">
    <div className="bg-[#0d1117] rounded-3xl overflow-hidden shadow-2xl text-left w-full">
      <div className="bg-[#161b22] px-6 py-4 flex items-center gap-2 border-b border-[#30363d]">
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="text-[#8b949e] ml-4 font-mono text-sm">{filename}</span>
      </div>
      <pre className="p-8 text-lg font-mono leading-relaxed overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  </AnimCard>
);

/* ─── Main Component ───────────────────────────────────────── */
export default function CCourse() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const slides = container.querySelectorAll('.slide-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(slides).indexOf(entry.target);
            if (idx !== -1) setCurrentSlide(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    slides.forEach(slide => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="course-container font-sans selection:bg-cyan-200 relative overflow-hidden" style={{ background: 'transparent' }}>
      <ProgressBar />

      <RightPanel
        currentSlide={currentSlide}
        videoPanelOpen={videoOpen}
        onVideoClose={() => setVideoOpen(false)}
      />

      <InteractiveBackground />

      <div className="relative z-10" style={{ position: "relative" }}>
        {/* SLIDE 0 · TITLE */}
        <div className="slide-section">
          <Slide>
            {/* Subtle radial accent — static, no animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 38%, rgba(14,165,233,0.10) 0%, transparent 68%)' }} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center w-full">
              {/* ── HIGH-FIDELITY NEON 'C' & DATA FLOW PARTICLES ── */}
              <SlideItem>
                <div style={{ position: 'relative', display: 'inline-block', padding: 40 }}>
                  <motion.div
                    onClick={() => setVideoOpen(true)}
                    whileHover={{ scale: 1.1, filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.8))' }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                    style={{ cursor: 'pointer', position: 'relative', zIndex: 10 }}
                  >
                    {/* Minimalist Neon 'C' SVG */}
                    <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 15px rgba(14,165,233,0.6))' }}>
                      <defs>
                        <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0ea5e9" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M75 25C68.5 18.5 59.5 15 50 15C30.5 15 15 30.5 15 50C15 69.5 30.5 85 50 85C59.5 85 68.5 81.5 75 75"
                        stroke="url(#neonGradient)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 5px rgba(14,165,233,0.8))' }}
                      />
                      <motion.path
                        d="M75 25C68.5 18.5 59.5 15 50 15C30.5 15 15 30.5 15 50C15 69.5 30.5 85 50 85C59.5 85 68.5 81.5 75 75"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </svg>

                    {/* Core Pulse Glow */}
                    <motion.div
                      animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                        width: 100, height: 100, borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(14,165,233,0.4) 0%, transparent 70%)',
                        zIndex: -1
                      }}
                    />
                  </motion.div>

                  {/* Orbital Data Flow Particles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
                      style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: 160 + i * 40, height: 160 + i * 40,
                        marginLeft: -(80 + i * 20), marginTop: -(80 + i * 20),
                        borderRadius: '50%', border: '1px solid rgba(14,165,233,0.06)',
                        pointerEvents: 'none'
                      }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        style={{
                          position: 'absolute', top: -4, left: '50%',
                          width: 8, height: 8, borderRadius: '50%',
                          background: '#0ea5e9',
                          boxShadow: '0 0 12px #0ea5e9',
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </SlideItem>

              {/* Title text */}
              <SlideItem delay={0.18}>
                <p style={{ 
                  fontSize: 'clamp(1.4rem, 8vw, 2.4rem)', fontWeight: 900, letterSpacing: 'clamp(0.1em, 2vw, 0.40em)', 
                  color: '#38bdf8', textTransform: 'uppercase', marginBottom: 6, textShadow: '0 0 32px rgba(14,165,233,0.85)', 
                  width: '100%', padding: '0 10px' 
                }}>
                  C Programming
                </p>
                <p style={{ 
                  fontSize: 'clamp(0.8rem, 4vw, 1.2rem)', fontWeight: 800, letterSpacing: 'clamp(0.2em, 5vw, 0.60em)', 
                  color: '#7dd3fc', textTransform: 'uppercase', marginBottom: 20, textShadow: '0 0 20px rgba(125,211,252,0.70)', 
                  width: '100%', padding: '0 10px' 
                }}>
                  Masterclass
                </p>
              </SlideItem>

              {/* Divider */}
              <SlideItem delay={0.28}>
                <div style={{ width: 100, height: 2, background: 'linear-gradient(90deg,transparent,#0ea5e9,transparent)', margin: '0 auto 24px' }} />
              </SlideItem>

              {/* Sub-text */}
              <SlideItem delay={0.35}>
                <p style={{ fontSize: '1.1rem', color: '#7dd3fc', fontWeight: 500, maxWidth: 450, lineHeight: 1.7, marginBottom: 32, padding: '0 16px' }}>
                  From Hello World to Dynamic Memory — master the{' '}
                  <span style={{ color: '#38bdf8', fontWeight: 800, textShadow: '0 0 10px rgba(56,189,248,0.4)' }}>mother of all programming languages</span>
                </p>
              </SlideItem>

              {/* ── ATTRACTIVE ANIMATED CODINGBOSS BANNER ── */}
              <SlideItem delay={0.45}>
                <motion.div
                  onClick={() => setVideoOpen(true)}
                  whileHover={{ scale: 1.04, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    cursor: 'pointer',
                    maxWidth: 520, width: '92vw',
                    marginBottom: 24,
                    position: 'relative',
                    borderRadius: 24,
                  }}
                >
                  {/* Animated gradient border wrapper */}
                  <div className="banner-glow-border" style={{
                    padding: 3,
                    borderRadius: 24,
                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 50%, #0ea5e9 100%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradientMove 4s ease infinite',
                    boxShadow: '0 20px 60px rgba(14,165,233,0.4), 0 0 20px rgba(14,165,233,0.2)',
                  }}>
                    <style>{`
                      @keyframes gradientMove {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50% ; }
                      }
                    `}</style>
                    <div style={{
                      borderRadius: 22,
                      overflow: 'hidden',
                      background: 'linear-gradient(160deg, #000e24 0%, #001a3c 100%)',
                    }}>
                      {/* ── Top: YouTube-Thumbnail Area ── */}
                      <div style={{
                        position: 'relative',
                        height: 180,
                        background: 'linear-gradient(135deg, #000d22 0%, #001a3a 50%, #000e28 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        {/* Dynamic background particles/glows */}
                        <div style={{ position: 'absolute', top: '10%', left: '10%', width: 100, height: 100, background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)' }} />
                        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 120, height: 120, background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)' }} />

                        {/* Left code text */}
                        <div style={{
                          position: 'absolute', left: 15, top: 12,
                          fontFamily: 'monospace', fontSize: 10, lineHeight: 1.85,
                          opacity: 0.25, color: '#0ea5e9', pointerEvents: 'none', textAlign: 'left',
                        }}>
                          {'#include <stdio.h>\nint main() {\n  int n = 10;\n  printf("%d",n);\n  return 0;\n}'}
                        </div>

                        {/* Right code text */}
                        <div style={{
                          position: 'absolute', right: 15, top: 15,
                          fontFamily: 'monospace', fontSize: 9.5, lineHeight: 1.85,
                          opacity: 0.20, color: '#38bdf8', pointerEvents: 'none', textAlign: 'right',
                        }}>
                          {'char *ptr;\nmalloc(50);\nfree(ptr);\nstruct Node{\n  int data;\n}'}
                        </div>

                        {/* Centre content */}
                        <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          {/* Animated C logo with pulse */}
                          <motion.div
                            animate={{
                              scale: [1, 1.15, 1],
                              filter: [
                                'drop-shadow(0 0 10px rgba(14,165,233,0.5))',
                                'drop-shadow(0 0 25px rgba(14,165,233,0.8))',
                                'drop-shadow(0 0 10px rgba(14,165,233,0.5))'
                              ]
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                            style={{ marginBottom: 12 }}
                          >
                            <svg width="72" height="72" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                              <path fill="#0ea5e9" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
                              <path fill="#0369a1" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
                              <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
                            </svg>
                          </motion.div>

                          {/* Play control badge */}
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'rgba(14,165,233,0.15)',
                            padding: '6px 16px',
                            borderRadius: 100,
                            border: '1px solid rgba(14,165,233,0.3)',
                            backdropFilter: 'blur(10px)',
                          }}>
                            <div style={{
                              width: 28, height: 28, borderRadius: '50%',
                              background: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: '0 0 15px rgba(14,165,233,0.6)',
                            }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                            <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '0.05em' }}>PREVIEW COURSE</span>
                          </div>
                        </div>
                      </div>

                      {/* ── Bottom: Info strip ── */}
                      <div style={{
                        padding: '12px 20px',
                        background: 'rgba(14,165,233,0.06)',
                        borderTop: '1px solid rgba(14,165,233,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          {['Fundamentals', 'Pointers', 'Memory', 'Projects'].map((t, i) => (
                            <span key={i} style={{
                              fontSize: 10, fontWeight: 700,
                              padding: '3px 10px', borderRadius: 6,
                              background: 'rgba(14,165,233,0.15)',
                              color: '#38bdf8',
                              border: '1px solid rgba(14,165,233,0.2)',
                            }}>{t}</span>
                          ))}
                        </div>
                        <div style={{
                          fontSize: 10, fontWeight: 900, color: '#fff',
                          padding: '6px 14px', borderRadius: 10,
                          background: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
                          boxShadow: '0 4px 15px rgba(14,165,233,0.3)',
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          WATCH NOW
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SlideItem>

              {/* Scroll hint */}
              <SlideItem delay={0.65}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 24, height: 38, borderRadius: 12, border: '2px solid rgba(14,165,233,0.25)', display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                    <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                      style={{ width: 3, height: 7, borderRadius: 2, background: 'rgba(14,165,233,0.55)' }} />
                  </div>
                  <span style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(14,165,233,0.35)', fontWeight: 600 }}>Scroll</span>
                </div>
              </SlideItem>
            </div>
          </Slide>
        </div>

        {/* SLIDE 1 · INTRODUCTION */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <div className="flex items-center justify-center gap-6 mb-4">
                <svg width="72" height="72" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 4px 12px rgba(3,89,156,0.25))' }}>
                  <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
                  <path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
                  <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
                </svg>
                <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold bg-sky-800/60 text-sky-200 backdrop-blur-md">Chapter 1</span></AnimCard>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Introduction to C</h2>
            </SlideItem>
            <SlideItem delay={0.2}>
              <p className="text-2xl text-blue-100/80 leading-relaxed max-w-4xl mb-8">
                C is a <strong className="text-sky-300">general-purpose, procedural</strong> programming language created in the early 1970s. It is the <strong className="text-sky-300">foundation of modern computing</strong> — Linux, Windows, Python, Java, and JavaScript are all built on or inspired by C.
              </p>
            </SlideItem>
            <SlideItem delay={0.4}>
              <AnimCard className="w-full max-w-4xl mb-8">
                <div className="bg-sky-900/30 border-2 border-sky-400/40 backdrop-blur-md p-8 rounded-3xl w-full text-left">
                  <h3 className="text-2xl font-bold text-sky-200 mb-4">🌍 Real World Uses of C:</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[['🐧', 'Linux Kernel'], ['🪟', 'Windows Core'], ['🔌', 'Microcontrollers'], ['🛠️', 'Compilers & DBs']].map(([icon, label], i) => (
                      <motion.div key={i} whileHover={{ scale: 1.08, rotate: 2 }} whileTap={{ scale: 0.93 }}
                        className="text-center p-4 bg-white/10 rounded-2xl border border-sky-400/30 cursor-pointer">
                        <div className="text-4xl mb-2">{icon}</div>
                        <div className="font-bold text-sky-800 text-sm">{label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimCard>
            </SlideItem>
            <SlideItem delay={0.6}>
              <AnimCard className="p-6 bg-indigo-900/30 border-2 border-indigo-400/40 backdrop-blur-md rounded-2xl max-w-3xl">
                <p className="text-lg text-indigo-200 font-medium">💡 <strong>Key Philosophy:</strong> C trusts the programmer completely — no automatic garbage collection, no bounds checking. Total power, total responsibility.</p>
              </AnimCard>
            </SlideItem>
          </Slide>
        </div>

        {/* SLIDE 2 · HISTORY */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-orange-800/60 text-orange-200 backdrop-blur-md">Chapter 2</span></AnimCard>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">History of C</h2>
            </SlideItem>
            <SlideItem delay={0.2}>
              <p className="text-2xl text-blue-100/80 leading-relaxed max-w-4xl mb-8">
                Born at <strong className="text-orange-300">Bell Labs</strong> in Murray Hill, New Jersey. Dennis Ritchie created C while co-developing Unix — proving C could build entire operating systems!
              </p>
            </SlideItem>
            <SlideItem delay={0.4} className="w-full flex justify-center">
              <Diagram type="timeline" />
            </SlideItem>
            <SlideItem delay={0.8}>
              <AnimCard className="mt-8 p-6 bg-orange-900/30 border-2 border-orange-400/40 backdrop-blur-md rounded-2xl max-w-2xl">
                <p className="text-lg text-orange-200 font-medium">💡 <strong>Fun Fact:</strong> Unix was rewritten in C in 1973 — this proved C could build entire operating systems, changing computing history forever!</p>
              </AnimCard>
            </SlideItem>
          </Slide>
        </div>

        {/* SLIDE 3 · FEATURES */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-sky-800/60 text-sky-200 backdrop-blur-md">Chapter 3</span></AnimCard>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-10 text-white">Features of C</h2>
            </SlideItem>
            <div className="w-full max-w-4xl mx-auto space-y-4">
              {[
                { delay: 0.1, icon: '⚡', title: 'Fast & Efficient', titleC: 'text-sky-300', borderC: 'border-sky-400/40', desc: 'Compiles directly to machine code. No interpreter overhead. Perfect for real-time and embedded systems.' },
                { delay: 0.2, icon: '🔩', title: 'Low-Level Memory Access', titleC: 'text-cyan-300', borderC: 'border-cyan-400/40', desc: 'Pointers let you read and write any memory address. You control allocation and deallocation explicitly.' },
                { delay: 0.3, icon: '🌍', title: 'Highly Portable', titleC: 'text-blue-300', borderC: 'border-blue-400/40', desc: '"Write once, compile anywhere." The same C source compiles on Linux, Windows, macOS, and ARM microcontrollers.' },
                { delay: 0.4, icon: '📐', title: 'Structured Programming', titleC: 'text-sky-200', borderC: 'border-sky-300/40', desc: 'Functions, loops, and conditionals enforce clean top-down design — easy to read, test, and maintain.' },
                { delay: 0.5, icon: '📦', title: 'Rich Standard Library', titleC: 'text-cyan-200', borderC: 'border-cyan-300/40', desc: 'stdio.h, stdlib.h, string.h, math.h — hundreds of battle-tested functions included out of the box.' },
                { delay: 0.6, icon: '🏗️', title: 'Foundation of All Languages', titleC: 'text-sky-300', borderC: 'border-sky-400/40', desc: 'C++ extends C. Java and Python are implemented in C. Learn C and every other language feels familiar.' },
              ].map(({ delay, icon, title, titleC, borderC, desc }, i) => (
                <SlideItem key={i} delay={delay}>
                  <AnimCard className={`flex items-start gap-4 p-5 rounded-xl border bg-sky-900/20 ${borderC} backdrop-blur-md`}>
                    <span className="text-3xl flex-shrink-0">{icon}</span>
                    <div>
                      <h3 className={`text-xl font-bold ${titleC}`}>{title}</h3>
                      <p className="text-blue-100/70 mt-1">{desc}</p>
                    </div>
                  </AnimCard>
                </SlideItem>
              ))}
            </div>
          </Slide>
        </div>

        {/* SLIDE 4 · PROGRAM STRUCTURE */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold bg-violet-800/60 text-violet-200 backdrop-blur-md">Chapter 4</span></AnimCard>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Structure of a C Program</h2>
            </SlideItem>
            <SlideItem delay={0.2}>
              <p className="text-2xl text-blue-100/80 leading-relaxed max-w-4xl mb-8">
                Every C program follows the <strong className="text-violet-300">same skeleton</strong>. Master this structure once and you can read or write any C program, no matter how large.
              </p>
            </SlideItem>
            <SlideItem delay={0.4} className="w-full flex justify-center">
              <AnimCard className="bg-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/10 max-w-5xl w-full">
                <h3 className="text-xl font-bold text-center text-white mb-6">📋 C Program Structure</h3>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { num: '1', border: 'border-violet-500', bg: 'bg-violet-100 text-violet-700', code: '#include <stdio.h>', desc: 'Preprocessor directives — import libraries, define constants', codeC: 'text-blue-300' },
                    { num: '2', border: 'border-violet-500', bg: 'bg-violet-100 text-violet-700', code: 'void greet(void);', desc: 'Function prototypes — declare functions before use', codeC: 'text-pink-300' },
                    { num: '3', border: 'border-emerald-500', bg: 'bg-emerald-100 text-emerald-700', code: 'int main()', desc: 'Main function — program entry point (execution starts here)', codeC: 'text-pink-300' },
                    { num: '4', border: 'border-emerald-500', bg: 'bg-emerald-100 text-emerald-700', code: '// Statements and logic', desc: 'Function body — actual code that executes', codeC: 'text-white bg-gray-800 px-2 py-1 rounded text-sm' },
                    { num: '5', border: 'border-emerald-500', bg: 'bg-emerald-100 text-emerald-700', code: 'return 0;', desc: 'Return statement — exit status (0 = success)', codeC: 'text-emerald-300' },
                    { num: '6', border: 'border-violet-500', bg: 'bg-violet-100 text-violet-700', code: 'void greet(void)', desc: 'Function definitions — implementation of declared functions', codeC: 'text-pink-300' },
                  ].map(({ num, border, bg, code, desc, codeC }, i) => (
                    <motion.div key={i} whileHover={{ x: 6, scale: 1.01 }} className={`border-l-4 ${border} pl-4`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 ${bg} rounded-full text-xs font-bold`}>{num}</span>
                        <code className={`${codeC} font-bold`}>{code}</code>
                      </div>
                      <p className="text-sm text-blue-100/80 ml-8">{desc}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimCard>
            </SlideItem>
            <SlideItem delay={0.6} className="w-full max-w-4xl mt-6">
              <AnimCard>
                <div className="bg-[#0d1117] rounded-3xl overflow-hidden shadow-2xl text-left w-full">
                  <div className="bg-[#161b22] px-6 py-4 flex items-center gap-2 border-b border-[#30363d]">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" /><div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" /><div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                    <span className="text-[#8b949e] ml-4 font-mono text-sm">structure.c</span>
                  </div>
                  <pre className="p-8 text-lg font-mono leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-blue-400">#include</span><span className="text-orange-300"> &lt;stdio.h&gt;</span><span className="text-[#6e7681]">  /* 1. Import standard library */</span>{'\n'}
                      <span className="text-blue-400">#define</span><span className="text-white"> MAX </span><span className="text-emerald-400">100</span><span className="text-[#6e7681]">        /* 2. Constant macro */</span>{'\n\n'}
                      <span className="text-pink-400">void</span><span className="text-blue-300"> greet</span><span className="text-white">(</span><span className="text-pink-400">void</span><span className="text-white">);</span><span className="text-[#6e7681]">               /* 3. Function prototype */</span>{'\n\n'}
                      <span className="text-pink-400">int</span><span className="text-blue-300"> main</span><span className="text-white">(</span><span className="text-pink-400">void</span><span className="text-white">) {'{'}</span>{'\n    '}
                      <span className="text-blue-300">greet</span><span className="text-white">();</span>{'\n    '}
                      <span className="text-pink-400">return</span><span className="text-white"> </span><span className="text-emerald-400">0</span><span className="text-white">;</span>{'\n'}{'}'}{'\n\n'}
                      <span className="text-pink-400">void</span><span className="text-blue-300"> greet</span><span className="text-white">(</span><span className="text-pink-400">void</span><span className="text-white">) {'{'}</span>{'\n    '}
                      <span className="text-white">printf(</span><span className="text-orange-300">"Hello from C!\\n"</span><span className="text-white">);</span>{'\n'}{'}'}
                    </code>
                  </pre>
                </div>
              </AnimCard>
            </SlideItem>
            <SlideItem delay={0.8}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 max-w-5xl w-full">
                {[
                  { bg: 'bg-violet-50 border-violet-200', icon: '📦', titleC: 'text-violet-200', title: 'Preprocessor', sub: 'text-violet-300', subText: '#include, #define, #ifdef' },
                  { bg: 'bg-emerald-50 border-emerald-200', icon: '🎯', titleC: 'text-emerald-200', title: 'Main Function', sub: 'text-emerald-300', subText: 'Entry point — must exist' },
                  { bg: 'bg-amber-50 border-amber-200', icon: '🔄', titleC: 'text-amber-800', title: 'Functions', sub: 'text-amber-600', subText: 'Reusable code blocks' },
                ].map(({ bg, icon, titleC, title, sub, subText }, i) => (
                  <AnimCard key={i} delay={i * 0.1} className={`p-4 border-2 rounded-2xl ${bg}`}>
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className={`font-bold ${titleC} text-sm`}>{title}</div>
                    <div className={`text-s ${sub} mt-1`}>{subText}</div>
                  </AnimCard>
                ))}
              </div>
            </SlideItem>
            <SlideItem delay={1}>
              <AnimCard className="mt-6 p-5 bg-violet-900/30 border-2 border-violet-400/40 backdrop-blur-md rounded-2xl max-w-4xl">
                <p className="text-violet-200 font-medium text-lg">💡 <strong>Key Point:</strong> The compiler reads from top to bottom — functions must be declared (prototyped) before they are called!</p>
              </AnimCard>
            </SlideItem>
          </Slide>
        </div>

        {/* SLIDE 5 · HELLO WORLD */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold bg-sky-800/60 text-sky-200 backdrop-blur-md">Chapter 5</span></AnimCard>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Your First C Program</h2>
            </SlideItem>
            <SlideItem delay={0.2} className="w-full max-w-4xl">
              <AnimCard>
                <div className="bg-[#0d1117] rounded-3xl overflow-hidden shadow-2xl text-left w-full">
                  <div className="bg-[#161b22] px-6 py-4 flex items-center gap-2 border-b border-[#30363d]">
                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" /><div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" /><div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
                    <span className="text-[#8b949e] ml-4 font-mono text-sm">hello.c</span>
                  </div>
                  <pre className="p-8 text-lg font-mono leading-relaxed overflow-x-auto">
                    <code>
                      <span className="text-blue-400">#include</span><span className="text-blue-400"> &lt;stdio.h&gt;</span>{'\n\n'}
                      <span className="text-pink-400">int</span><span className="text-blue-300"> main</span><span className="text-white">() {'{'}</span>{'\n    '}
                      <span className="text-white">printf(</span><span className="text-orange-300">"Hello, World!\\n"</span><span className="text-white">);</span>{'\n    '}
                      <span className="text-pink-400">return</span><span className="text-white"> </span><span className="text-emerald-400">0</span><span className="text-white">;</span>{'\n'}
                      <span className="text-white">{'}'}</span>
                    </code>
                  </pre>
                </div>
              </AnimCard>
            </SlideItem>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl text-left mt-8">
              {[
                { delay: 0.4, bg: 'bg-blue-50 border-blue-500/30', code: '#include <stdio.h>', codeC: 'text-blue-500', desc: 'Imports the Standard I/O library. Needed for printf and scanf.' },
                { delay: 0.5, bg: 'bg-pink-50 border-pink-500/30', code: 'int main()', codeC: 'text-pink-500', desc: 'Entry point of every C program. Execution always starts here.' },
                { delay: 0.6, bg: 'bg-emerald-50 border-emerald-400/30', code: 'return 0', codeC: 'text-emerald-500', desc: 'Returns 0 = success to the OS. Any other value signals an error.' },
              ].map(({ delay, bg, code, codeC, desc }, i) => (
                <SlideItem key={i} delay={delay}>
                  <AnimCard className={`p-6 rounded-2xl border ${bg} h-full`}>
                    <code className={`${codeC} font-bold text-sm block mb-2 font-mono`}>{code}</code>
                    <p className="text-blue-1000/80 text-sm">{desc}</p>
                  </AnimCard>
                </SlideItem>
              ))}
            </div>
            <SlideItem delay={0.7}>
              <AnimCard className="mt-6 bg-[#0d1117] rounded-2xl px-8 py-4 font-mono text-emerald-400 text-base shadow-xl border border-[#30363d]">
                $ gcc hello.c -o hello &nbsp;&nbsp; $ ./hello &nbsp;&nbsp; → Hello, World!
              </AnimCard>
            </SlideItem>
          </Slide>
        </div>

        {/* SLIDE 6 · VARIABLES */}
        <div className="slide-section">
          <Slide>
            <div className="min-h-screen flex items-center justify-center py-12 px-6 w-full">
              <div className="w-full max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                  <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-sky-800/60 text-sky-200 backdrop-blur-md">Chapter 6</span></AnimCard>
                  <h2 className="text-5xl md:text-6xl font-extrabold text-white">What are Variables?</h2>
                </div>

                {/* Definition */}
                <AnimCard delay={0.1} className="bg-sky-900/30 border-2 border-sky-400/40 backdrop-blur-md rounded-2xl p-8 mb-6">
                  <p className="text-2xl text-blue-100/80 leading-relaxed">
                    A <strong className="text-sky-300">variable</strong> is a <strong className="text-sky-300">named memory location</strong> that stores data which can be changed during program execution.
                  </p>
                  <div className="mt-5 bg-sky-500/10 rounded-xl p-5 border border-sky-400/20">
                    <p className="text-blue-200 text-lg">📦 <strong>Analogy:</strong> Think of a variable as a <strong>labeled box</strong> where you can store, update, and retrieve values.</p>
                    <div className="w-full flex justify-center mt-4">
                      <div className="bg-[#0d1117] rounded-lg p-4 font-mono text-base text-left">
                        <span className="text-pink-400">int</span><span className="text-white"> </span><span className="text-blue-300">age</span><span className="text-white"> = </span><span className="text-emerald-400">25</span><span className="text-white">;</span><span className="text-gray-500">  // Box named "age" stores 25</span>
                      </div>
                    </div>
                  </div>
                </AnimCard>

                {/* Naming Rules */}
                <AnimCard delay={0.2} className="bg-white/5 backdrop-blur-md border border-sky-400/20 rounded-2xl p-8 mb-6">
                  <h3 className="text-2xl font-bold text-sky-300 mb-5 flex items-center gap-2"><span>🏷️</span> Variable Naming Rules</h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-5">
                    <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-400/20">
                      <div className="text-emerald-400 font-bold mb-3">✓ Valid Examples</div>
                      <div className="bg-[#0d1117] rounded-lg p-3 font-mono text-sm space-y-1">
                        <div><span className="text-pink-400">int</span> <span className="text-blue-300">age</span><span className="text-white">;</span></div>
                        <div><span className="text-pink-400">float</span> <span className="text-blue-300">_salary</span><span className="text-white">;</span></div>
                        <div><span className="text-pink-400">char</span> <span className="text-blue-300">student_name</span><span className="text-white">;</span></div>
                        <div><span className="text-pink-400">int</span> <span className="text-blue-300">totalMarks123</span><span className="text-white">;</span></div>
                      </div>
                    </div>
                    <div className="bg-rose-500/10 rounded-xl p-4 border border-rose-400/20">
                      <div className="text-rose-400 font-bold mb-3">✗ Invalid Examples</div>
                      <div className="bg-[#0d1117] rounded-lg p-3 font-mono text-sm space-y-1">
                        <div><span className="text-white">2ndValue;</span><span className="text-gray-500">  // starts with digit</span></div>
                        <div><span className="text-white">my-name;</span><span className="text-gray-500">   // hyphen invalid</span></div>
                        <div><span className="text-white">int;</span><span className="text-gray-500">       // keyword reserved</span></div>
                        <div><span className="text-white">my name;</span><span className="text-gray-500">   // space not allowed</span></div>
                      </div>
                    </div>
                  </div>
                  {/* Rules as cards — no bullet points */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      { icon: '🔤', rule: 'Start with a letter or underscore (_)' },
                      { icon: '🔢', rule: 'Can contain letters, numbers, underscore' },
                      { icon: '🔡', rule: 'Case-sensitive — Age ≠ age' },
                      { icon: '🚫', rule: 'Cannot use keywords: int, float, char...' },
                      { icon: '💡', rule: 'Use meaningful names: studentAge, totalMarks' },
                    ].map(({ icon, rule }, i) => (
                      <div key={i} className="flex items-center gap-3 bg-sky-500/10 rounded-xl p-3 border border-sky-400/15">
                        <span className="text-xl flex-shrink-0">{icon}</span>
                        <span className="text-blue-200 text-sm font-medium">{rule}</span>
                      </div>
                    ))}
                  </div>
                </AnimCard>

                {/* Variable Types — same style as Data Types slide */}
                <AnimCard delay={0.3} className="bg-white/5 backdrop-blur-md border border-sky-400/20 rounded-2xl p-8">
                  <h3 className="text-3xl font-bold text-center text-sky-300 mb-8">📊 Types of Variables in C</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { border: 'border-pink-500', accent: 'from-pink-500/20 to-rose-500/20', code: 'int', codeC: 'text-pink-300', sizeC: 'bg-pink-500/30 text-pink-200', desc: 'Integer — whole numbers', example: { kw: 'int', var: 'age', val: '25' }, meta: 'Range: -2,147,483,648 to 2,147,483,647\nSize: 4 bytes | Format: %d' },
                      { border: 'border-blue-500', accent: 'from-blue-500/20 to-cyan-500/20', code: 'float', codeC: 'text-blue-300', sizeC: 'bg-blue-500/30 text-blue-200', desc: 'Single precision decimal', example: { kw: 'float', var: 'price', val: '99.99f' }, meta: '6-7 decimal digits precision\nSize: 4 bytes | Format: %f' },
                      { border: 'border-green-500', accent: 'from-green-500/20 to-emerald-500/20', code: 'double', codeC: 'text-green-300', sizeC: 'bg-green-500/30 text-green-200', desc: 'Double precision decimal', example: { kw: 'double', var: 'pi', val: '3.14159265359' }, meta: '15-16 decimal digits precision\nSize: 8 bytes | Format: %lf' },
                      { border: 'border-orange-500', accent: 'from-orange-500/20 to-amber-500/20', code: 'char', codeC: 'text-orange-300', sizeC: 'bg-orange-500/30 text-orange-200', desc: 'Single character / ASCII', example: { kw: 'char', var: 'grade', val: "'A'" }, meta: 'Stores ASCII values\nSize: 1 byte | Format: %c' },
                    ].map(({ border, accent, code, codeC, sizeC, desc, example, meta }, i) => (
                      <AnimCard key={i} delay={i * 0.1} className={`bg-gradient-to-br ${accent} rounded-xl p-5 border-l-4 ${border} shadow-md cursor-pointer`}>
                        <div className="flex items-center justify-between mb-3">
                          <code className={`text-2xl font-bold ${codeC}`}>{code}</code>
                          <span className={`${sizeC} px-2 py-1 rounded text-xs font-bold`}>{meta.match(/Size: .+? \|/)?.[0].replace(' |', '') ?? ''}</span>
                        </div>
                        <p className="text-blue-200 text-sm">{desc}</p>
                        <div className="w-full flex justify-center mt-3">
                          <div className="bg-[#0d1117] rounded-lg p-3 font-mono text-sm w-full text-left">
                            <span className="text-pink-400">{example.kw}</span><span className="text-white"> </span><span className="text-blue-300">{example.var}</span><span className="text-white"> = </span><span className="text-emerald-400">{example.val}</span><span className="text-white">;</span>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-blue-300 whitespace-pre-line">{meta}</div>
                      </AnimCard>
                    ))}
                  </div>
                </AnimCard>

              </div>
            </div>
          </Slide>
        </div>

        {/* SLIDE 7 · DATA TYPES */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header Section */}
              <div className="text-center mb-12">
                <AnimCard>
                  <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-blue-800/60 text-blue-200 backdrop-blur-md">Chapter 7</span>
                </AnimCard>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Data Types in C</h2>
              </div>

              {/* Definition Card */}
              <AnimCard delay={0.1} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-blue-500">
                <p className="text-2xl text-blue-100 leading-relaxed">
                  A <strong className="text-blue-300">data type</strong> defines the <strong className="text-blue-300">type of data</strong> a variable can store, the <strong className="text-blue-300">amount of memory</strong> it occupies, and the <strong className="text-blue-300">operations</strong> that can be performed on it.
                </p>
                <div className="mt-4 p-4 bg-blue-500/20 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-200 text-sm">🎯 <strong>Purpose:</strong> Determines memory allocation, allowed values, and operations</p>
                </div>
              </AnimCard>

              {/* Classification Card */}
              <AnimCard delay={0.15} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-blue-300 mb-8">📊 Classification of Data Types</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 text-center border border-blue-400/30 transition-all duration-500 hover:scale-105">
                    <div className="text-4xl mb-3">🔢</div>
                    <h4 className="text-2xl font-bold text-blue-300 mb-2">Primitive Data Types</h4>
                    <p className="text-blue-200">Basic built-in types provided by C language</p>
                    <div className="mt-3 text-sm text-blue-300">int, char, float, double, void</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 text-center border border-purple-400/30 transition-all duration-500 hover:scale-105">
                    <div className="text-4xl mb-3">📦</div>
                    <h4 className="text-2xl font-bold text-purple-300 mb-2">Non-Primitive Data Types</h4>
                    <p className="text-purple-200">Derived/User-defined types from primitive types</p>
                    <div className="mt-3 text-sm text-purple-300">arrays, pointers, structures, unions, enum</div>
                  </div>
                </div>
              </AnimCard>

              {/* Primitive Data Types Cards */}
              <AnimCard delay={0.2} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-pink-300 mb-8">📋 Primitive Data Types</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* int Card */}
                  <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl p-5 border-l-4 border-pink-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-pink-300">int</code>
                      <span className="bg-pink-500/30 text-pink-200 px-2 py-1 rounded text-xs font-bold">4 bytes</span>
                    </div>
                    <p className="text-blue-200 text-sm">Integer values - whole numbers</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">int</span><span className="text-white"> age = </span><span className="text-emerald-400">25</span><span className="text-white">;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Range: -2,147,483,648 to 2,147,483,647</div>
                      <div className="min-w-0">📝 Format: %d | %i</div>
                    </div>
                  </div>

                  {/* char Card */}
                  <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl p-5 border-l-4 border-orange-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-orange-300">char</code>
                      <span className="bg-orange-500/30 text-orange-200 px-2 py-1 rounded text-xs font-bold">1 byte</span>
                    </div>
                    <p className="text-blue-200 text-sm">Single character / ASCII values</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">char</span><span className="text-white"> grade = </span><span className="text-emerald-400">'A'</span><span className="text-white">;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Range: -128 to 127 or 0 to 255</div>
                      <div>📝 Format: %c</div>
                    </div>
                  </div>

                  {/* float Card */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-5 border-l-4 border-blue-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-blue-300">float</code>
                      <span className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-xs font-bold">4 bytes</span>
                    </div>
                    <p className="text-blue-200 text-sm">Single precision floating point</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">float</span><span className="text-white"> price = </span><span className="text-emerald-400">99.99f</span><span className="text-white">;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Precision: 6-7 decimal digits</div>
                      <div>📝 Format: %f</div>
                    </div>
                  </div>

                  {/* double Card */}
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-5 border-l-4 border-green-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-green-300">double</code>
                      <span className="bg-green-500/30 text-green-200 px-2 py-1 rounded text-xs font-bold">8 bytes</span>
                    </div>
                    <p className="text-blue-200 text-sm">Double precision floating point</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">double</span><span className="text-white"> pi = </span><span className="text-emerald-400">3.14159265359</span><span className="text-white">;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Precision: 15-16 decimal digits</div>
                      <div>📝 Format: %lf</div>
                    </div>
                  </div>

                  {/* void Card */}
                  <div className="bg-gradient-to-br from-gray-500/20 to-slate-500/20 rounded-xl p-5 border-l-4 border-gray-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-gray-300">void</code>
                      <span className="bg-gray-500/30 text-gray-200 px-2 py-1 rounded text-xs font-bold">0 bytes</span>
                    </div>
                    <p className="text-blue-200 text-sm">No value / Empty type</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">void</span><span className="text-white"> functionName(</span><span className="text-pink-400">void</span><span className="text-white">);</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Used for functions returning nothing</div>
                      <div>📝 Cannot declare void variables</div>
                    </div>
                  </div>

                  {/* long long Card */}
                  <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl p-5 border-l-4 border-purple-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <code className="text-2xl font-bold text-purple-300">long long</code>
                      <span className="bg-purple-500/30 text-purple-200 px-2 py-1 rounded text-xs font-bold">8 bytes</span>
                    </div>
                    <p className="text-blue-200 text-sm">Extended integer range</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">long long</span><span className="text-white"> big = </span><span className="text-emerald-400">9223372036854775807LL</span><span className="text-white">;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Range: ±9.2 quintillion</div>
                      <div>📝 Format: %lld</div>
                    </div>
                  </div>
                </div>
              </AnimCard>

              {/* Non-Primitive Data Types Cards */}
              <AnimCard delay={0.25} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-purple-300 mb-8">🏗️ Non-Primitive Data Types</h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Arrays Card */}
                  <div className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl p-5 border-l-4 border-cyan-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-layer-group text-2xl text-cyan-300"></i>
                      <code className="text-xl font-bold text-cyan-300">Arrays</code>
                    </div>
                    <p className="text-blue-200 text-sm">Collection of elements of same type stored contiguously</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">int</span><span className="text-white"> arr[</span><span className="text-emerald-400">5</span><span className="text-white">] = {"{"}</span><span className="text-emerald-400">1,2,3,4,5</span><span className="text-white">{"};"}</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📦 Fixed size at compile time</div>
                      <div>📍 Index starts from 0</div>
                    </div>
                  </div>

                  {/* Pointers Card */}
                  <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-xl p-5 border-l-4 border-indigo-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-location-dot text-2xl text-indigo-300"></i>
                      <code className="text-xl font-bold text-indigo-300">Pointers</code>
                    </div>
                    <p className="text-blue-200 text-sm">Stores memory address of another variable</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">int</span><span className="text-white"> *ptr = &x;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📍 Size: 4/8 bytes (32/64-bit)</div>
                      <div>🔗 Used for dynamic memory</div>
                    </div>
                  </div>

                  {/* Structures Card */}
                  <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl p-5 border-l-4 border-emerald-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-cubes text-2xl text-emerald-300"></i>
                      <code className="text-xl font-bold text-emerald-300">Structures</code>
                    </div>
                    <p className="text-blue-200 text-sm">Group different data types under one name</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">struct</span><span className="text-white"> Student {"{"} int id; char name[50]; {"}"};</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📦 Size: Sum of all members</div>
                      <div>🏷️ Access with . operator</div>
                    </div>
                  </div>

                  {/* Unions Card */}
                  <div className="bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl p-5 border-l-4 border-rose-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-share-alt text-2xl text-rose-300"></i>
                      <code className="text-xl font-bold text-rose-300">Unions</code>
                    </div>
                    <p className="text-blue-200 text-sm">Members share same memory location</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">union</span><span className="text-white"> Data {"{"} int i; float f; {"}"};</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📦 Size: Largest member size</div>
                      <div>⚡ Memory efficient</div>
                    </div>
                  </div>

                  {/* Enum Card */}
                  <div className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-xl p-5 border-l-4 border-amber-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-list-ul text-2xl text-amber-300"></i>
                      <code className="text-xl font-bold text-amber-300">Enumeration (enum)</code>
                    </div>
                    <p className="text-blue-200 text-sm">Named integer constants</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">enum</span><span className="text-white"> Day {"{"} MON, TUE, WED {"}"};</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📊 Values: 0,1,2 by default</div>
                      <div>🏷️ Improves code readability</div>
                    </div>
                  </div>

                  {/* Typedef Card */}
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl p-5 border-l-4 border-teal-500 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer">
                    <div className="flex items-center gap-2 mb-3">
                      <i className="fas fa-tag text-2xl text-teal-300"></i>
                      <code className="text-xl font-bold text-teal-300">typedef</code>
                    </div>
                    <p className="text-blue-200 text-sm">Create alias for existing data types</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-3 font-mono text-sm">
                      <span className="text-pink-400">typedef</span><span className="text-white"> unsigned int uint;</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300">
                      <div>📝 Makes code readable</div>
                      <div>🔧 Platform independent</div>
                    </div>
                  </div>
                </div>
              </AnimCard>

              {/* Quick Summary Card */}
              <AnimCard delay={0.3} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-center text-blue-300 mb-4">💡 Quick Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-blue-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-blue-300">6</div>
                    <div className="text-xs text-blue-200">Primitive Types</div>
                  </div>
                  <div className="bg-purple-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-300">6</div>
                    <div className="text-xs text-purple-200">Non-Primitive Types</div>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-300">1-8</div>
                    <div className="text-xs text-green-200">Bytes Size Range</div>
                  </div>
                  <div className="bg-orange-500/20 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-300">%d,%c,%f</div>
                    <div className="text-xs text-orange-200">Format Specifiers</div>
                  </div>
                </div>
              </AnimCard>

            </div>
          </Slide>
        </div>
        {/* SLIDE 8 · OPERATORS */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header Section */}
              <div className="text-center mb-12">
                <AnimCard>
                  <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-purple-800/60 text-purple-200 backdrop-blur-md">Chapter 8</span>
                </AnimCard>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Operators in C</h2>
              </div>

              {/* Definition Card */}
              <AnimCard delay={0.1} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-purple-500">
                <p className="text-2xl text-purple-100 leading-relaxed">
                  An <strong className="text-purple-300">operator</strong> is a symbol that tells the compiler to perform specific <strong className="text-purple-300">mathematical, relational, or logical operations</strong> on operands and produce a result.
                </p>
                <div className="mt-4 p-4 bg-purple-500/20 rounded-lg border-l-4 border-purple-400">
                  <p className="text-purple-200 text-sm">📌 <strong>Key Concepts:</strong> Operands are values on which operators work. Operators can be unary (one operand), binary (two operands), or ternary (three operands).</p>
                </div>
              </AnimCard>

              {/* Types of Operators Card */}
              <AnimCard delay={0.15} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-purple-300 mb-8">📊 Types of Operators in C</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { name: 'Arithmetic', icon: '🔢', ops: '+ - * / % ++ --', desc: 'Mathematical calculations' },
                    { name: 'Relational', icon: '⚖️', ops: '== != &gt; &lt; &gt;= &lt;=', desc: 'Compare values' },
                    { name: 'Logical', icon: '🔗', ops: '&amp;&amp; || !', desc: 'Combine conditions' },
                    { name: 'Bitwise', icon: '🧮', ops: '&amp; | ^ ~ &lt;&lt; &gt;&gt;', desc: 'Bit-level operations' },
                    { name: 'Assignment', icon: '📝', ops: '= += -= *= /= %=', desc: 'Assign values' }
                  ].map((type, i) => (
                    <AnimCard key={i} delay={i * 0.1} className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-xl p-4 text-center border-2 border-purple-200 transition-all duration-500 hover:scale-105">
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="font-bold text-purple-300">{type.name}</h4>
                      <p className="text-xs text-blue-100/50 mt-1 font-mono">{type.ops}</p>
                      <p className="text-xs text-purple-300/60 mt-1">{type.desc}</p>
                    </AnimCard>
                  ))}
                </div>
              </AnimCard>

              {/* Arithmetic Operators Card */}
              <AnimCard delay={0.2} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-pink-300 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🔢</span> Arithmetic Operators
                </h3>
                <p className="text-blue-200 mb-4">Used to perform mathematical operations like addition, subtraction, multiplication, etc.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-pink-500/20">
                        <th className="border p-3 text-left text-pink-200">Operator</th>
                        <th className="border p-3 text-left text-pink-200">Meaning</th>
                        <th className="border p-3 text-left text-pink-200">Example</th>
                        <th className="border p-3 text-left text-pink-200">Result</th>
                        <th className="border p-3 text-left text-pink-200">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['+', 'Addition', '5 + 3', '8', 'Adds two numbers'],
                      ['-', 'Subtraction', '5 - 3', '2', 'Subtracts second from first'],
                      ['*', 'Multiplication', '5 * 3', '15', 'Multiplies two numbers'],
                      ['/', 'Division', '5 / 2', '2', 'Integer division (truncates)'],
                      ['%', 'Modulus', '5 % 2', '1', 'Remainder after division'],
                      ['++', 'Increment', 'a++ or ++a', '-', 'Increases value by 1'],
                      ['--', 'Decrement', 'a-- or --a', '-', 'Decreases value by 1']].map((row, i) => (
                        <motion.tr key={i} whileHover={{ backgroundColor: 'rgba(255,200,220,0.15)' }} className="border-b cursor-pointer">
                          <td className="border p-3 font-mono font-bold text-pink-300">{row[0]}</td>
                          <td className="border p-3 text-blue-200">{row[1]}</td>
                          <td className="border p-3 font-mono text-blue-200">{row[2]}</td>
                          <td className="border p-3 text-blue-200">{row[3]}</td>
                          <td className="border p-3 text-blue-200">{row[4]}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-pink-500/20 rounded-lg">
                  <p className="text-sm text-pink-200">💡 <strong>Note:</strong> Division of integers truncates decimal part. Use modulus (%) to get remainder.</p>
                </div>
              </AnimCard>

              {/* Relational Operators Card */}
              <AnimCard delay={0.25} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="text-3xl">⚖️</span> Relational Operators
                </h3>
                <p className="text-blue-200 mb-4">Used to compare two values. Returns 1 (true) or 0 (false).</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-blue-500/20">
                        <th className="border p-3 text-left text-blue-200">Operator</th>
                        <th className="border p-3 text-left text-blue-200">Meaning</th>
                        <th className="border p-3 text-left text-blue-200">Example (a=5,b=3)</th>
                        <th className="border p-3 text-left text-blue-200">Result</th>
                        <th className="border p-3 text-left text-blue-200">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['==', 'Equal to', '5 == 3', '0 (false)', 'Checks equality'],
                      ['!=', 'Not equal', '5 != 3', '1 (true)', 'Checks inequality'],
                      ['&gt;', 'Greater than', '5 &gt; 3', '1 (true)', 'Checks greater than'],
                      ['&lt;', 'Less than', '5 &lt; 3', '0 (false)', 'Checks less than'],
                      ['&gt;=', 'Greater/Equal', '5 &gt;= 3', '1 (true)', 'Checks greater or equal'],
                      ['&lt;=', 'Less/Equal', '5 &lt;= 3', '0 (false)', 'Checks less or equal']].map((row, i) => (
                        <motion.tr key={i} whileHover={{ backgroundColor: 'rgba(100,150,255,0.15)' }} className="border-b cursor-pointer">
                          <td className="border p-3 font-mono font-bold text-blue-300">{row[0]}</td>
                          <td className="border p-3 text-blue-200">{row[1]}</td>
                          <td className="border p-3 font-mono text-blue-200">{row[2]}</td>
                          <td className="border p-3 text-blue-200">{row[3]}</td>
                          <td className="border p-3 text-blue-200">{row[4]}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AnimCard>

              {/* Logical Operators Card */}
              <AnimCard delay={0.3} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🔗</span> Logical Operators
                </h3>
                <p className="text-blue-200 mb-4">Used to combine conditional statements. Returns 1 (true) or 0 (false).</p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-green-500/20 rounded-xl p-4 border-l-4 border-green-400">
                    <code className="text-xl font-bold text-green-300">&amp;&amp;</code>
                    <p className="text-blue-200 mt-1">Logical AND</p>
                    <div className="mt-2 text-sm text-blue-200"><code>(a &gt; b) &amp;&amp; (a &gt; c)</code></div>
                    <p className="text-xs text-blue-300 mt-2">True if both conditions are true</p>
                    <div className="mt-2 p-2 bg-black/30 rounded text-xs text-green-300">Example: (5 &gt; 3) &amp;&amp; (5 &gt; 2) → 1 (true)</div>
                  </div>
                  <div className="bg-green-500/20 rounded-xl p-4 border-l-4 border-green-400">
                    <code className="text-xl font-bold text-green-300">||</code>
                    <p className="text-blue-200 mt-1">Logical OR</p>
                    <div className="mt-2 text-sm text-blue-200"><code>(a &gt; b) || (a &lt; c)</code></div>
                    <p className="text-xs text-blue-300 mt-2">True if at least one condition is true</p>
                    <div className="mt-2 p-2 bg-black/30 rounded text-xs text-green-300">Example: (5 &gt; 3) || (5 &lt; 2) → 1 (true)</div>
                  </div>
                  <div className="bg-green-500/20 rounded-xl p-4 border-l-4 border-green-400">
                    <code className="text-xl font-bold text-green-300">!</code>
                    <p className="text-blue-200 mt-1">Logical NOT</p>
                    <div className="mt-2 text-sm text-blue-200"><code>!(a &gt; b)</code></div>
                    <p className="text-xs text-blue-300 mt-2">True if condition is false</p>
                    <div className="mt-2 p-2 bg-black/30 rounded text-xs text-green-300">Example: !(5 &gt; 3) → 0 (false)</div>
                  </div>
                </div>
              </AnimCard>

              {/* Bitwise Operators Card */}
              <AnimCard delay={0.35} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-orange-300 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🧮</span> Bitwise Operators
                </h3>
                <p className="text-blue-200 mb-4">Perform operations on bits of integer values. Essential for low-level programming, embedded systems, and optimization.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-orange-500/20">
                        <th className="border p-3 text-left text-orange-200">Operator</th>
                        <th className="border p-3 text-left text-orange-200">Meaning</th>
                        <th className="border p-3 text-left text-orange-200">Example (5 &amp; 3)</th>
                        <th className="border p-3 text-left text-orange-200">Binary</th>
                        <th className="border p-3 text-left text-orange-200">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[['&amp;', 'Bitwise AND', '5 &amp; 3', '101 &amp; 011', '1 (001)'],
                      ['|', 'Bitwise OR', '5 | 3', '101 | 011', '7 (111)'],
                      ['^', 'Bitwise XOR', '5 ^ 3', '101 ^ 011', '6 (110)'],
                      ['~', 'Bitwise NOT', '~5', '~0101', '-6 (11111010)'],
                      ['&lt;&lt;', 'Left shift', '5 &lt;&lt; 1', '101 &lt;&lt; 1', '10 (1010)'],
                      ['&gt;&gt;', 'Right shift', '5 &gt;&gt; 1', '101 &gt;&gt; 1', '2 (010)']].map((row, i) => (
                        <motion.tr key={i} whileHover={{ backgroundColor: 'rgba(255,150,100,0.15)' }} className="border-b cursor-pointer">
                          <td className="border p-3 font-mono font-bold text-orange-300">{row[0]}</td>
                          <td className="border p-3 text-blue-200">{row[1]}</td>
                          <td className="border p-3 font-mono text-blue-200">{row[2]}</td>
                          <td className="border p-3 font-mono text-blue-200">{row[3]}</td>
                          <td className="border p-3 text-blue-200">{row[4]}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 p-3 bg-orange-500/20 rounded-lg">
                  <p className="text-sm text-orange-200">💡 <strong>Bitwise Operators:</strong> Used in flags, permissions, cryptography, device drivers, and performance-critical applications.</p>
                </div>
              </AnimCard>

              {/* Assignment Operators Card */}
              <AnimCard delay={0.4} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                  <span className="text-3xl">📝</span> Assignment Operators
                </h3>
                <p className="text-blue-200 mb-4">Used to assign values to variables. Shorthand operators combine assignment with arithmetic/bitwise operations.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    ['=', 'a = 5', 'Assigns value 5 to a'],
                    ['+=', 'a += 3', 'a = a + 3'],
                    ['-=', 'a -= 3', 'a = a - 3'],
                    ['*=', 'a *= 3', 'a = a * 3'],
                    ['/=', 'a /= 3', 'a = a / 3'],
                    ['%=', 'a %= 3', 'a = a % 3'],
                    ['&amp;=', 'a &amp;= 3', 'a = a &amp; 3'],
                    ['|=', 'a |= 3', 'a = a | 3'],
                    ['^=', 'a ^= 3', 'a = a ^ 3'],
                    ['&lt;&lt;=', 'a &lt;&lt;= 1', 'a = a &lt;&lt; 1'],
                    ['&gt;&gt;=', 'a &gt;&gt;= 1', 'a = a &gt;&gt; 1']
                  ].map((op, i) => (
                    <div key={i} className="bg-emerald-500/20 rounded-xl p-3 text-center transition-all duration-500 hover:scale-105">
                      <code className="font-bold text-emerald-300 text-lg">{op[0]}</code>
                      <p className="text-xs text-blue-200 mt-1">{op[1]}</p>
                      <p className="text-xs text-blue-300/70 mt-1">{op[2]}</p>
                    </div>
                  ))}
                </div>
              </AnimCard>

              {/* Complete Code Example Card */}
              <AnimCard delay={0.45} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">💻 Complete Program - All Operators</h3>

                <div className="bg-black/50 rounded-2xl overflow-hidden border border-purple-500/30">
                  <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-purple-300 text-sm ml-2">all_operators.c</span>
                  </div>
                  <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto text-blue-200">
                    {`#include <stdio.h>

int main() {
    int a = 10, b = 5, c = 10;
    
    // 1. Arithmetic Operators
    printf("=== Arithmetic Operators ===\\n");
    printf("Addition: %d + %d = %d\\n", a, b, a + b);
    printf("Subtraction: %d - %d = %d\\n", a, b, a - b);
    printf("Multiplication: %d * %d = %d\\n", a, b, a * b);
    printf("Division: %d / %d = %d\\n", a, b, a / b);
    printf("Modulus: %d %% %d = %d\\n\\n", a, b, a % b);
    
    // 2. Relational Operators
    printf("=== Relational Operators ===\\n");
    printf("%d == %d: %d\\n", a, b, a == b);
    printf("%d != %d: %d\\n", a, b, a != b);
    printf("%d > %d: %d\\n", a, b, a > b);
    printf("%d < %d: %d\\n", a, b, a < b);
    printf("%d >= %d: %d\\n", a, b, a >= b);
    printf("%d <= %d: %d\\n\\n", a, b, a <= b);
    
    // 3. Logical Operators
    printf("=== Logical Operators ===\\n");
    printf("(a > b) && (a == c): %d\\n", (a > b) && (a == c));
    printf("(a > b) || (a < b): %d\\n", (a > b) || (a < b));
    printf("!(a > b): %d\\n\\n", !(a > b));
    
    // 4. Bitwise Operators
    printf("=== Bitwise Operators ===\\n");
    printf("%d & %d = %d\\n", a, b, a & b);
    printf("%d | %d = %d\\n", a, b, a | b);
    printf("%d ^ %d = %d\\n", a, b, a ^ b);
    printf("%d << 1 = %d\\n", a, a << 1);
    printf("%d >> 1 = %d\\n\\n", a, a >> 1);
    
    // 5. Assignment Operators
    int x = 10;
    printf("=== Assignment Operators ===\\n");
    printf("x = %d\\n", x);
    x += 5; printf("x += 5: %d\\n", x);
    x -= 3; printf("x -= 3: %d\\n", x);
    x *= 2; printf("x *= 2: %d\\n", x);
    
    return 0;
}`}
                  </pre>
                </div>

                <div className="bg-black/50 rounded-xl p-5 mt-4">
                  <div className="text-green-400 font-mono">
                    <div className="text-purple-300 font-bold mb-2">📤 Program Output:</div>
                    === Arithmetic Operators ===<br />
                    Addition: 10 + 5 = 15<br />
                    Subtraction: 10 - 5 = 5<br />
                    Multiplication: 10 * 5 = 50<br />
                    Division: 10 / 5 = 2<br />
                    Modulus: 10 % 5 = 0<br /><br />
                    === Relational Operators ===<br />
                    10 == 5: 0<br />
                    10 != 5: 1<br />
                    10 &gt; 5: 1<br />
                    10 &lt; 5: 0<br />
                    10 &gt;= 5: 1<br />
                    10 &lt;= 5: 0<br /><br />
                    === Logical Operators ===<br />
                    (10 &gt; 5) &amp;&amp; (10 == 10): 1<br />
                    (10 &gt; 5) || (10 &lt; 5): 1<br />
                    !(10 &gt; 5): 0<br /><br />
                    === Bitwise Operators ===<br />
                    10 &amp; 5 = 0<br />
                    10 | 5 = 15<br />
                    10 ^ 5 = 15<br />
                    10 &lt;&lt; 1 = 20<br />
                    10 &gt;&gt; 1 = 5<br /><br />
                    === Assignment Operators ===<br />
                    x = 10<br />
                    x += 5: 15<br />
                    x -= 3: 12<br />
                    x *= 2: 24
                  </div>
                </div>
              </AnimCard>

              {/* Quick Summary Card */}
              <AnimCard delay={0.5} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mt-8">
                <h3 className="text-xl font-bold text-center text-purple-300 mb-4">💡 Quick Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
                  <div className="bg-purple-500/20 rounded-lg p-2">
                    <div className="text-lg font-bold text-purple-300">5</div>
                    <div className="text-xs text-blue-200">Operator Types</div>
                  </div>
                  <div className="bg-pink-500/20 rounded-lg p-2">
                    <div className="text-lg font-bold text-pink-300">7</div>
                    <div className="text-xs text-blue-200">Arithmetic Ops</div>
                  </div>
                  <div className="bg-blue-500/20 rounded-lg p-2">
                    <div className="text-lg font-bold text-blue-300">6</div>
                    <div className="text-xs text-blue-200">Relational Ops</div>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-2">
                    <div className="text-lg font-bold text-green-300">3</div>
                    <div className="text-xs text-blue-200">Logical Ops</div>
                  </div>
                  <div className="bg-orange-500/20 rounded-lg p-2">
                    <div className="text-lg font-bold text-orange-300">6</div>
                    <div className="text-xs text-blue-200">Bitwise Ops</div>
                  </div>
                </div>
              </AnimCard>

            </div>
          </Slide>
        </div>
        {/* SLIDE 9 · CONDITIONALS */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-cyan-800/60 text-cyan-200 backdrop-blur-md">Chapter 9</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Conditional Statements</h2>
              </div>

              {/* Definition */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-cyan-500">
                <p className="text-2xl text-cyan-100 leading-relaxed">
                  <strong className="text-cyan-300">Conditional statements</strong> allow the program to make <strong className="text-cyan-300">decisions</strong> and execute different code blocks based on whether a condition is <strong className="text-cyan-300">true</strong> or <strong className="text-rose-300">false</strong>.
                </p>
                <div className="mt-4 p-4 bg-cyan-500/20 rounded-lg">
                  <p className="text-cyan-200">📌 <strong>Key Concept:</strong> In C, any non-zero value is TRUE and zero is FALSE.</p>
                  <div className="mt-2 font-mono text-cyan-300">
                    if(1) &#123; &#125;  // Always true<br />
                    if(0) &#123; &#125;  // Always false<br />
                    if(5) &#123; &#125;  // Always true (non-zero)
                  </div>
                </div>
              </div>

              {/* Types of Conditional Statements */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-cyan-300 mb-8">Types of Conditional Statements</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="bg-cyan-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔹</div>
                    <div className="font-bold text-cyan-300">if</div>
                    <div className="text-xs text-blue-200">Single condition</div>
                  </div>
                  <div className="bg-cyan-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔸</div>
                    <div className="font-bold text-cyan-300">if-else</div>
                    <div className="text-xs text-blue-200">Two-way decision</div>
                  </div>
                  <div className="bg-cyan-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">📊</div>
                    <div className="font-bold text-cyan-300">else-if</div>
                    <div className="text-xs text-blue-200">Multiple conditions</div>
                  </div>
                  <div className="bg-cyan-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🎛️</div>
                    <div className="font-bold text-cyan-300">switch</div>
                    <div className="text-xs text-blue-200">Fixed values</div>
                  </div>
                  <div className="bg-cyan-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔁</div>
                    <div className="font-bold text-cyan-300">nested</div>
                    <div className="text-xs text-blue-200">Complex conditions</div>
                  </div>
                </div>
              </div>

              {/* 1. if Statement */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-pink-300 mb-4">🔹 1. if Statement</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Executes a block of code only if condition is true.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">if(condition) &#123; // code &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Condition → true → execute block → continue</p>

                    {/* Animated Visual Diagram for if Statement */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-pink-300 text-sm mb-2">if Statement Flowchart (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1], backgroundColor: ['#3b82f6', '#60a5fa', '#3b82f6'] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="bg-blue-500/50 px-4 py-2 rounded-lg text-center mb-1"
                        >
                          START
                        </motion.div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-1"
                        >
                          Condition?
                        </motion.div>
                        <div className="flex gap-6 md:gap-12 mt-2">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-green-500/50 px-3 py-1 rounded-lg"
                            >
                              Execute if block
                            </motion.div>
                            <div className="text-white text-xl mt-2">↓</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-gray-500/50 px-3 py-1 rounded-lg">Skip block</div>
                            <div className="text-white text-xl mt-2">↓</div>
                          </div>
                        </div>
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center">END</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-cyan-300 text-sm">if_statement.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int age = 18;
    if (age >= 18) {
        printf("Eligible to vote");
    }
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> Eligible to vote
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. if-else Statement */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">🔸 2. if-else Statement</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Executes one block if true, another if false.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">if(cond) &#123; &#125; else &#123; &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Condition → true: if block → false: else block</p>

                    {/* Animated Visual Diagram for if-else Statement */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-blue-300 text-sm mb-2">if-else Flowchart (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center mb-1">START</div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-1"
                        >
                          Condition?
                        </motion.div>
                        <div className="flex gap-4 md:gap-8 mt-2">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-green-500/50 px-3 py-1 rounded-lg"
                            >
                              if block
                            </motion.div>
                            <div className="text-white text-xl mt-2">↓</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-red-500/50 px-3 py-1 rounded-lg"
                            >
                              else block
                            </motion.div>
                            <div className="text-white text-xl mt-2">↓</div>
                          </div>
                        </div>
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center">END</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-cyan-300 text-sm">if_else.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int num = 7;
    if (num % 2 == 0) {
        printf("Even");
    } else {
        printf("Odd");
    }
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> Odd
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. else-if Ladder */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">📊 3. else-if Ladder</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Multiple conditions checked in sequence.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">if(cond1) &#123; &#125; else if(cond2) &#123; &#125; else &#123; &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Check top to bottom → first true executes → exits</p>

                    {/* Animated Visual Diagram for else-if Ladder */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-purple-300 text-sm mb-2">else-if Ladder (Animated)</div>
                      <div className="space-y-2 min-w-max mx-auto px-2">
                        {[
                          { cond: "score >= 90", result: "A", color: "bg-green-500/50" },
                          { cond: "score >= 80", result: "B", color: "bg-blue-500/50" },
                          { cond: "score >= 70", result: "C", color: "bg-yellow-500/50" },
                          { cond: "score >= 60", result: "D", color: "bg-orange-500/50" },
                          { cond: "else", result: "F", color: "bg-red-500/50" }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.3, repeat: Infinity, repeatDelay: 5 }}
                            className="flex items-center gap-2"
                          >
                            <div className={`${item.color} px-3 py-1 rounded-lg text-sm w-32 text-center`}>
                              {item.cond}
                            </div>
                            <motion.div
                              animate={{ x: [0, 10, 0] }}
                              transition={{ repeat: Infinity, duration: 1, delay: idx * 0.2 }}
                              className="text-white"
                            >
                              →
                            </motion.div>
                            <div className="bg-gray-700/50 px-3 py-1 rounded-lg text-sm">
                              Grade: {item.result}
                            </div>
                            {idx < 4 && (
                              <div className="text-gray-400 text-xs ml-2">if false</div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-center text-xs text-purple-300 mt-3 min-w-max"
                      >
                        First true condition executes, then exits
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-cyan-300 text-sm">else_if.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int score = 85;
    if (score >= 90) printf("A");
    else if (score >= 80) printf("B");
    else if (score >= 70) printf("C");
    else printf("D");
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> B
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. switch Statement */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">🎛️ 4. switch Statement</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Tests a variable against multiple fixed values.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">switch(var) &#123; case: break; default: &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Compare var with each case → execute match → break exits</p>
                    <p className="text-xs text-orange-200 mt-2">⚠️ Always use break to prevent fall-through!</p>

                    {/* Animated Visual Diagram for switch Statement */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-orange-300 text-sm mb-2">switch Statement (Animated)</div>
                      <div className="min-w-max mx-auto px-2">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-lg text-center mb-3 max-w-[200px] mx-auto"
                        >
                          switch(day)
                        </motion.div>
                        <div className="space-y-1">
                        {[
                          { case: 1, value: "Monday", matched: false },
                          { case: 2, value: "Tuesday", matched: false },
                          { case: 3, value: "Wednesday", matched: true },
                          { case: 4, value: "Thursday", matched: false },
                          { case: 5, value: "Friday", matched: false }
                        ].map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ x: -10, opacity: 0.5 }}
                            animate={item.matched ? { x: [0, 5, 0], backgroundColor: '#22c55e' } : { x: 0 }}
                            transition={{ repeat: item.matched ? Infinity : 0, duration: 1.5, delay: idx * 0.2 }}
                            className={`flex items-center gap-2 p-1 rounded ${item.matched ? 'bg-green-500/30' : ''}`}
                          >
                            <div className="w-12 text-right">case {item.case}:</div>
                            <div className="text-blue-200">{item.value}</div>
                            {item.matched && (
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="text-green-400 text-sm"
                              >
                                ← MATCH! break
                              </motion.div>
                            )}
                            {!item.matched && idx < 2 && (
                              <div className="text-gray-500 text-xs">↓ fall-through (if no break)</div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                      </div>
                      <div className="mt-2 text-center text-xs text-gray-400 min-w-max">
                        Break exits switch, preventing fall-through
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-cyan-300 text-sm">switch.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int day = 3;
    switch(day) {
        case 1: printf("Mon"); break;
        case 2: printf("Tue"); break;
        case 3: printf("Wed"); break;
        default: printf("Invalid");
    }
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> Wed
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Nested if-else */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">🔁 5. Nested if-else</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> if-else inside another if-else for complex decisions.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">if(cond1) &#123; if(cond2) &#123; &#125; else &#123; &#125; &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Outer condition → inner condition → nested blocks</p>

                    {/* Animated Visual Diagram for Nested if-else */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-emerald-300 text-sm mb-2">Nested if-else (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-2"
                        >
                          num = 0 ?
                        </motion.div>
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-green-500/50 px-3 py-1 rounded-lg">Positive number</div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-amber-500/50 px-3 py-1 rounded-full text-sm"
                            >
                              num % 2 == 0 ?
                            </motion.div>
                            <div className="flex gap-2 mt-1">
                              <div className="flex flex-col items-center">
                                <div className="text-green-400 text-xs">TRUE</div>
                                <div className="bg-green-500/50 px-2 py-0.5 rounded text-xs">Even</div>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="text-red-400 text-xs">FALSE</div>
                                <div className="bg-red-500/50 px-2 py-0.5 rounded text-xs">Odd</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-red-500/50 px-3 py-1 rounded-lg">Negative/Zero</div>
                          </div>
                        </div>
                        <motion.div
                          animate={{ y: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="text-xs text-emerald-300 mt-2"
                        >
                          Nested decision making
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-cyan-300 text-sm">nested_if.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int num = 15;
    if (num > 0) {
        printf("Positive ");
        if (num % 2 == 0) printf("Even");
        else printf("Odd");
    }
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> Positive Odd
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Example */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">💻 Complete Program</h3>
                <div className="bg-black/50 rounded-lg overflow-hidden">
                  <div className="bg-cyan-800/30 px-3 py-1 border-b border-cyan-500/30">
                    <span className="text-cyan-300 text-sm">all_conditionals.c</span>
                  </div>
                  <pre className="p-5 text-sm font-mono text-blue-200 overflow-x-auto">
                    {`#include <stdio.h>

int main() {
    int marks = 85;
    char grade;
    
    if (marks >= 90) grade = 'A';
    else if (marks >= 80) grade = 'B';
    else if (marks >= 70) grade = 'C';
    else grade = 'D';
    printf("Grade: %c\\n", grade);
    
    switch(grade) {
        case 'A': printf("Excellent"); break;
        case 'B': printf("Good job"); break;
        default: printf("Keep improving");
    }
    
    if (marks >= 80) {
        if (marks >= 90) printf("\\nScholarship");
        else printf("\\nGood performance");
    }
    return 0;
}`}
                  </pre>
                </div>
                <div className="bg-black/50 rounded-lg p-4 mt-4">
                  <div className="text-green-400">Output: Grade: B<br />Good job<br />Good performance</div>
                </div>
              </div>

            </div>
          </Slide>
        </div>
        {/* SLIDE 10 · LOOPS */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-amber-800/60 text-amber-200 backdrop-blur-md">Chapter 10</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Loops in C</h2>
              </div>

              {/* Definition */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-amber-500">
                <p className="text-2xl text-amber-100 leading-relaxed">
                  A <strong className="text-amber-300">loop</strong> is a programming construct that repeats a block of code multiple times until a specified condition is met. Loops help in executing repetitive tasks efficiently without writing duplicate code.
                </p>
                <div className="mt-4 p-4 bg-amber-500/20 rounded-lg">
                  <p className="text-amber-200">📌 <strong>Why Loops?</strong> Code reusability, efficiency, array processing, automation of repetitive tasks.</p>
                </div>
              </div>

              {/* Types of Loops */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-amber-300 mb-8">Types of Loops in C</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-amber-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔄</div>
                    <div className="font-bold text-amber-300">for loop</div>
                    <div className="text-xs text-blue-200">Known iterations</div>
                  </div>
                  <div className="bg-amber-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔁</div>
                    <div className="font-bold text-amber-300">while loop</div>
                    <div className="text-xs text-blue-200">Condition controlled</div>
                  </div>
                  <div className="bg-amber-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">♻️</div>
                    <div className="font-bold text-amber-300">do-while</div>
                    <div className="text-xs text-blue-200">Executes at least once</div>
                  </div>
                  <div className="bg-amber-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🔂</div>
                    <div className="font-bold text-amber-300">nested loops</div>
                    <div className="text-xs text-blue-200">Loop inside loop</div>
                  </div>
                </div>
              </div>

              {/* 1. for Loop */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-pink-300 mb-4">🔄 1. for Loop</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Used when number of iterations is known. Executes initialization once, checks condition, executes block, then increments.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">for(init; condition; increment) &#123; // code &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> init → condition true → execute → increment → repeat until false</p>

                    {/* Animated Visual Diagram for for Loop */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-pink-300 text-sm mb-2">for Loop Flowchart (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <motion.div
                          initial={{ scale: 1 }}
                          animate={{ scale: [1, 1.05, 1], backgroundColor: ['#3b82f6', '#60a5fa', '#3b82f6'] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="bg-blue-500/50 px-4 py-2 rounded-lg text-center mb-1"
                        >
                          START
                        </motion.div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                          className="bg-purple-500/50 px-4 py-2 rounded-lg text-center mb-1"
                        >
                          Initialization (i=1)
                        </motion.div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-1"
                        >
                          Condition? (i ≤ 5)
                        </motion.div>
                        <div className="flex gap-8 mt-2">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-green-500/50 px-3 py-1 rounded-lg"
                            >
                              Execute Body
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="bg-cyan-500/50 px-3 py-1 rounded-lg"
                            >
                              Increment (i++)
                            </motion.div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="text-white text-xl mt-1"
                            >
                              ↺
                            </motion.div>
                            <div className="text-xs text-gray-400">Back to Condition</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-red-500/50 px-3 py-1 rounded-lg">Exit Loop</div>
                          </div>
                        </div>
                        <div className="text-white text-xl mt-2">↓</div>
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center">END</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-amber-300 text-sm">for_loop.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    // Print 1 to 5
    for(int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    // Output: 1 2 3 4 5
    
    // Print even numbers 2 to 10
    for(int i = 2; i <= 10; i += 2) {
        printf("%d ", i);
    }
    // Output: 2 4 6 8 10
    
    // Countdown from 5 to 1
    for(int i = 5; i >= 1; i--) {
        printf("%d ", i);
    }
    // Output: 5 4 3 2 1
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> 1 2 3 4 5<br />2 4 6 8 10<br />5 4 3 2 1
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. while Loop */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">🔁 2. while Loop</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Used when iterations depend on condition. Checks condition first, then executes. May execute zero times.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">while(condition) &#123; // code &#125;</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Check condition → true → execute → recheck → false → exit</p>

                    {/* Animated Visual Diagram for while Loop */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-blue-300 text-sm mb-2">while Loop Flowchart (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center mb-1">START</div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-1"
                        >
                          Condition?
                        </motion.div>
                        <div className="flex gap-8 mt-2">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 1.2 }}
                              className="bg-green-500/50 px-3 py-1 rounded-lg"
                            >
                              Execute Body
                            </motion.div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="text-white text-xl mt-1"
                            >
                              ↺
                            </motion.div>
                            <div className="text-xs text-gray-400">Back to Condition</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-red-500/50 px-3 py-1 rounded-lg">Exit Loop</div>
                          </div>
                        </div>
                        <div className="text-white text-xl mt-2">↓</div>
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center">END</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-amber-300 text-sm">while_loop.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    // Print 1 to 5
    int i = 1;
    while(i <= 5) {
        printf("%d ", i);
        i++;
    }
    // Output: 1 2 3 4 5
    
    // Sum of 1 to 10
    int sum = 0, num = 1;
    while(num <= 10) {
        sum += num;
        num++;
    }
    printf("Sum = %d", sum);
    // Output: Sum = 55
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> 1 2 3 4 5<br />Sum = 55
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. do-while Loop */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-green-300 mb-4">♻️ 3. do-while Loop</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Executes block at least once, then checks condition. Useful for menus.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">do &#123; // code &#125; while(condition);</code></p>
                    <p className="text-blue-200"><strong>Flow:</strong> Execute once → check condition → true → repeat → false → exit</p>

                    {/* Animated Visual Diagram for do-while Loop */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-green-300 text-sm mb-2">do-while Loop Flowchart (Animated)</div>
                      <div className="flex flex-col items-center min-w-max mx-auto px-2">
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center mb-1">START</div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2 }}
                          className="bg-green-500/50 px-4 py-2 rounded-lg text-center mb-1"
                        >
                          Execute Body (at least once)
                        </motion.div>
                        <div className="text-white text-xl">↓</div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="bg-amber-500/50 px-4 py-2 rounded-full text-center mb-1"
                        >
                          Condition?
                        </motion.div>
                        <div className="flex gap-8 mt-2">
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="text-green-400 text-sm"
                            >
                              TRUE
                            </motion.div>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                              className="text-white text-xl"
                            >
                              ↺
                            </motion.div>
                            <div className="text-xs text-gray-400">Back to Execute</div>
                          </div>
                          <div className="flex flex-col items-center">
                            <motion.div
                              animate={{ x: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                              className="text-red-400 text-sm"
                            >
                              FALSE
                            </motion.div>
                            <div className="text-white text-xl">↓</div>
                            <div className="bg-red-500/50 px-3 py-1 rounded-lg">Exit Loop</div>
                          </div>
                        </div>
                        <div className="text-white text-xl mt-2">↓</div>
                        <div className="bg-blue-500/50 px-4 py-2 rounded-lg text-center">END</div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-amber-300 text-sm">dowhile.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    // Print 1 to 5
    int i = 1;
    do {
        printf("%d ", i);
        i++;
    } while(i <= 5);
    // Output: 1 2 3 4 5
    
    // Menu example - runs at least once
    int choice;
    do {
        printf("\\n1.Start 2.Settings 3.Exit\\n");
        printf("Enter: ");
        scanf("%d", &choice);
    } while(choice != 3);
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> 1 2 3 4 5<br />Menu runs until exit selected
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Nested Loops */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">🔂 4. Nested Loops</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Loop inside another loop. Inner loop completes all iterations for each outer iteration.</p>
                    <p className="text-blue-200 mb-2"><strong>Use:</strong> Multi-dimensional arrays, patterns, multiplication tables.</p>
                    <p className="text-blue-200"><strong>Complexity:</strong> Outer N times × Inner M times = N×M iterations</p>

                    {/* Animated Visual Diagram for Nested Loops */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-purple-300 text-sm mb-2">Nested Loop Visualization (Animated)</div>
                      <div className="space-y-2">
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="bg-pink-500/50 p-2 rounded text-center text-sm"
                        >
                          Outer Loop i = 1 to 3
                        </motion.div>
                        <div className="ml-4">
                          <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="bg-blue-500/50 p-2 rounded text-center text-sm"
                          >
                            Inner Loop j = 1 to 3
                          </motion.div>
                          <div className="ml-4 mt-1 space-y-1">
                            {[1, 2, 3].map((j) => (
                              <motion.div
                                key={j}
                                animate={{ x: [0, 3, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: j * 0.3 }}
                                className="bg-green-500/50 p-1 rounded text-xs text-center"
                              >
                                i=1, j={j} → Output {1 * j}
                              </motion.div>
                            ))}
                          </div>
                          <motion.div
                            animate={{ y: [0, 3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                            className="mt-2 text-xs text-gray-400 text-center"
                          >
                            Inner Loop Complete
                          </motion.div>
                        </div>
                        <div className="text-center text-xs text-gray-400 mt-2">
                          <motion.span
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            i=2 → Repeat Inner Loop → i=3 → Repeat Inner Loop
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-amber-300 text-sm">nested_loops.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    // Multiplication table (1 to 3)
    for(int i = 1; i <= 3; i++) {
        for(int j = 1; j <= 3; j++) {
            printf("%2d ", i * j);
        }
        printf("\\n");
    }
    /* Output:
     1  2  3
     2  4  6
     3  6  9 */
    
    // Star pattern
    for(int i = 1; i <= 5; i++) {
        for(int j = 1; j <= i; j++) {
            printf("* ");
        }
        printf("\\n");
    }
    /* Output:
    *
    * *
    * * *
    * * * *
    * * * * * */
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-black/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> Multiplication table and star pattern shown above
                    </div>
                  </div>
                </div>
              </div>

              {/* Loop Control Statements */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">🎮 Loop Control Statements</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong className="text-orange-300">break</strong> - Terminates the loop immediately and exits.</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-2">
                      <pre className="text-sm font-mono text-blue-200 overflow-x-auto">
                        {`for(int i = 1; i <= 10; i++) {
    if(i == 5) break;
    printf("%d ", i);
}
// Output: 1 2 3 4`}
                      </pre>
                    </div>
                    {/* Animated break Visual */}
                    <div className="mt-3 bg-black/30 rounded-lg p-3 overflow-x-auto">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <motion.div
                            key={num}
                            initial={{ scale: 1 }}
                            animate={num === 5 ? { scale: [1, 1.2, 0], backgroundColor: '#ef4444' } : { scale: 1 }}
                            transition={{ duration: 2, delay: num * 0.2 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${num < 5 ? 'bg-green-500' : num === 5 ? 'bg-red-500' : 'bg-gray-600'
                              }`}
                          >
                            {num}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ x: [0, 100, 0] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                        className="text-xs text-center mt-2 text-orange-300"
                      >
                        break → exits when i=5
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong className="text-orange-300">continue</strong> - Skips current iteration, continues to next.</p>
                    <div className="bg-black/50 rounded-lg p-3 mt-2">
                      <pre className="text-sm font-mono text-blue-200 overflow-x-auto">
                        {`for(int i = 1; i <= 10; i++) {
    if(i % 2 == 0) continue;
    printf("%d ", i);
}
// Output: 1 3 5 7 9`}
                      </pre>
                    </div>
                    {/* Animated continue Visual */}
                    <div className="mt-3 bg-black/30 rounded-lg p-3 overflow-x-auto">
                      <div className="flex items-center justify-center gap-1 flex-wrap">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <motion.div
                            key={num}
                            initial={{ scale: 1 }}
                            animate={num % 2 === 0 ? { scale: [1, 0.8, 1], opacity: [1, 0.5, 1] } : { scale: 1 }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: num * 0.1 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${num % 2 === 1 ? 'bg-green-500' : 'bg-yellow-500'
                              }`}
                          >
                            {num}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-xs text-center mt-2 text-orange-300"
                      >
                        continue → skips even numbers
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Example */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">💻 Complete Program</h3>
                <div className="bg-black/50 rounded-lg overflow-hidden">
                  <div className="bg-amber-800/30 px-3 py-1 border-b border-amber-500/30">
                    <span className="text-amber-300 text-sm">all_loops.c</span>
                  </div>
                  <pre className="p-5 text-sm font-mono text-blue-200 overflow-x-auto">
                    {`#include <stdio.h>

int main() {
    // 1. for loop - factorial
    int fact = 1;
    for(int i = 1; i <= 5; i++) fact *= i;
    printf("Factorial 5 = %d\\n", fact);
    
    // 2. while loop - sum of digits
    int n = 123, sum = 0;
    while(n > 0) {
        sum += n % 10;
        n /= 10;
    }
    printf("Sum of digits = %d\\n", sum);
    
    // 3. do-while - reverse number
    int num = 456, rev = 0, temp = num;
    do {
        rev = rev * 10 + temp % 10;
        temp /= 10;
    } while(temp > 0);
    printf("Reverse of %d = %d\\n", num, rev);
    
    // 4. nested loops - prime numbers
    printf("Primes 2-20: ");
    for(int i = 2; i <= 20; i++) {
        int prime = 1;
        for(int j = 2; j <= i/2; j++) {
            if(i % j == 0) { prime = 0; break; }
        }
        if(prime) printf("%d ", i);
    }
    
    return 0;
}`}
                  </pre>
                </div>
                <div className="bg-black/50 rounded-lg p-4 mt-4">
                  <div className="text-green-400">
                    Factorial 5 = 120<br />
                    Sum of digits = 6<br />
                    Reverse of 456 = 654<br />
                    Primes 2-20: 2 3 5 7 11 13 17 19
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>

        {/* SLIDE 11 · ARRAYS */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-blue-800/60 text-blue-200 backdrop-blur-md">Chapter 11</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Arrays in C</h2>
              </div>

              {/* Definition */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-blue-500">
                <p className="text-2xl text-blue-100 leading-relaxed">
                  An <strong className="text-blue-300">array</strong> is a collection of elements of the <strong className="text-blue-300">same data type</strong> stored in <strong className="text-blue-300">contiguous memory locations</strong>. It allows storing multiple values under a single variable name.
                </p>
                <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                  <p className="text-blue-200">📌 <strong>Key Characteristics:</strong></p>
                  <ul className="list-disc list-inside mt-2 text-blue-200 text-sm">
                    <li>Fixed Size - Size must be declared at compile time</li>
                    <li>Homogeneous - All elements must be of same data type</li>
                    <li>Contiguous Memory - Elements stored in consecutive memory locations</li>
                    <li>Zero-based Indexing - First element at index 0, last at size-1</li>
                    <li>Direct Access - Any element can be accessed directly using index</li>
                  </ul>
                  <p className="text-yellow-300 text-sm mt-2">⚠️ Important: C does NOT perform bounds checking!</p>
                </div>
              </div>

              {/* Types of Arrays */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-3xl font-bold text-center text-blue-300 mb-8">Types of Arrays in C</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-blue-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">📊</div>
                    <div className="font-bold text-blue-300">1D Array</div>
                    <div className="text-xs text-blue-200">Single row</div>
                  </div>
                  <div className="bg-blue-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">📋</div>
                    <div className="font-bold text-blue-300">2D Array</div>
                    <div className="text-xs text-blue-200">Rows & Columns</div>
                  </div>
                  <div className="bg-blue-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🧊</div>
                    <div className="font-bold text-blue-300">3D Array</div>
                    <div className="text-xs text-blue-200">Depth, Rows, Cols</div>
                  </div>
                  <div className="bg-blue-900/40 rounded-lg p-3 text-center">
                    <div className="text-2xl">🏗️</div>
                    <div className="font-bold text-blue-300">Array of Structures</div>
                    <div className="text-xs text-blue-200">Records collection</div>
                  </div>
                </div>
              </div>

              {/* 1. One-Dimensional Array with Animation */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-pink-300 mb-4">📊 1. One-Dimensional Array</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> A linear list of elements accessed using a single index.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">data_type array_name[size];</code></p>
                    <p className="text-blue-200"><strong>Example:</strong> <code className="bg-black/50 px-2 py-1 rounded">int marks[5] = [85, 92, 78, 96, 88];</code></p>
                    <div className="mt-3 bg-blue-500/20 rounded-lg p-2">
                      <p className="text-blue-200 text-sm">💡 Access: <code className="bg-black/50 px-1">marks[0]</code> = 85 (first element)</p>
                      <p className="text-blue-200 text-sm">💡 Access: <code className="bg-black/50 px-1">marks[4]</code> = 88 (last element)</p>
                    </div>

                    {/* Animated 1D Array Visualization */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-pink-300 text-sm mb-2">1D Array Memory Visualization (Animated)</div>
                      <div className="flex gap-1 justify-center flex-wrap">
                        {[85, 92, 78, 96, 88].map((val, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2, duration: 0.4, type: "spring" }}
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="bg-blue-600 rounded-lg p-3 text-center min-w-[70px]"
                          >
                            <motion.div
                              animate={{ x: [0, 3, -3, 0] }}
                              transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                              className="text-xs text-blue-200"
                            >
                              [{i}]
                            </motion.div>
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                              className="text-white font-bold text-xl"
                            >
                              {val}
                            </motion.div>
                            <div className="text-xs text-blue-300">0x{100 + i * 4}</div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ x: [0, 50, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-center text-xs text-blue-300 mt-3"
                      >
                        ← Contiguous Memory Locations →
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-blue-300 text-sm">1d_array.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int scores[5] = {85, 92, 78, 96, 88};
    
    printf("First: %d\\n", scores[0]);   // 85
    printf("Third: %d\\n", scores[2]);   // 78
    printf("Last: %d\\n", scores[4]);    // 88
    
    int len = sizeof(scores) / sizeof(scores[0]);
    printf("Length: %d\\n", len);        // 5
    
    for(int i = 0; i < len; i++) {
        printf("%d ", scores[i]);
    }
    // Output: 85 92 78 96 88
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3 mt-3">
                      <span className="text-blue-200">Output:</span> First: 85<br />Third: 78<br />Last: 88<br />Length: 5<br />85 92 78 96 88
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Two-Dimensional Array with Animation */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-purple-300 mb-4">📋 2. Two-Dimensional Array</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> A matrix-like structure with rows and columns.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">data_type array_name[rows][columns];</code></p>
                    <p className="text-blue-200"><strong>Example:</strong> <code className="bg-black/50 px-2 py-1 rounded">int mat[2][3] = [[1,2,3],[4,5,6]];</code></p>
                    <div className="mt-3 bg-purple-500/20 rounded-lg p-2">
                      <p className="text-purple-200 text-sm">💡 Access: <code className="bg-black/50 px-1">mat[0][0]</code> = 1 (row 0, col 0)</p>
                      <p className="text-purple-200 text-sm">💡 Access: <code className="bg-black/50 px-1">mat[1][2]</code> = 6 (row 1, col 2)</p>
                    </div>

                    {/* Animated 2D Array Visualization */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto custom-scrollbar">
                      <div className="text-center text-purple-300 text-sm mb-4">2D Array Matrix Visualization (Animated)</div>
                      <div className="space-y-3 min-w-[300px]">
                        {[[1, 2, 3], [4, 5, 6]].map((row, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.3 }}
                            className="flex gap-2 justify-center"
                          >
                            <div className="bg-purple-800/50 px-2 py-1 rounded text-xs text-purple-300">Row {i}</div>
                            {row.map((val, j) => (
                              <motion.div
                                key={j}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.3 + j * 0.1, type: "spring" }}
                                whileHover={{ scale: 1.2, backgroundColor: '#8b5cf6' }}
                                className="bg-purple-600 rounded-lg p-2 text-center min-w-[50px]"
                              >
                                <div className="text-xs text-purple-200">[{i}][{j}]</div>
                                <div className="text-white font-bold text-lg">{val}</div>
                              </motion.div>
                            ))}
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="text-center text-xs text-purple-300 mt-3"
                      >
                        Rows → Columns ↓
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-blue-300 text-sm">2d_array.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int matrix[2][3] = {
        {1, 2, 3},     // Row 0
        {4, 5, 6}      // Row 1
    };
    
    printf("[0][0]: %d\\n", matrix[0][0]);  // 1
    printf("[0][2]: %d\\n", matrix[0][2]);  // 3
    printf("[1][1]: %d\\n", matrix[1][1]);  // 5
    
    for(int i = 0; i < 2; i++) {
        for(int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    /* Output:
    1 2 3
    4 5 6 */
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> [0][0]: 1<br />[0][2]: 3<br />[1][1]: 5<br />1 2 3<br />4 5 6
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Three-Dimensional Array with Animation */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">🧊 3. Three-Dimensional Array</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> A cube-like structure with depth, rows, and columns.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">data_type array_name[depth][rows][columns];</code></p>
                    <p className="text-blue-200"><strong>Example:</strong> <code className="bg-black/50 px-2 py-1 rounded">int cube[2][2][3] = [[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]];</code></p>
                    <div className="mt-3 bg-emerald-500/20 rounded-lg p-2">
                      <p className="text-emerald-200 text-sm">💡 Access: <code className="bg-black/50 px-1">cube[0][0][2]</code> = 3</p>
                      <p className="text-emerald-200 text-sm">💡 Access: <code className="bg-black/50 px-1">cube[1][1][1]</code> = 11</p>
                    </div>

                    {/* Animated 3D Array Visualization */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto custom-scrollbar">
                      <div className="text-center text-emerald-300 text-sm mb-4">3D Array Cube Visualization (Animated)</div>
                      <div className="space-y-4 min-w-[300px]">
                        {[0, 1].map((depth) => (
                          <motion.div
                            key={depth}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: depth * 0.4 }}
                            className="border border-emerald-500/30 rounded-lg p-2"
                          >
                            <div className="text-center text-emerald-400 text-xs mb-1">Depth {depth}</div>
                            <div className="flex gap-2 justify-center">
                              {[[1, 2, 3], [4, 5, 6]].map((row, i) => (
                                <div key={i} className="flex gap-1">
                                  {row.map((val, j) => (
                                    <motion.div
                                      key={j}
                                      whileHover={{ scale: 1.2, backgroundColor: '#10b981' }}
                                      className="bg-emerald-600 rounded p-1 text-center min-w-[35px]"
                                    >
                                      <div className="text-[10px] text-emerald-300">[{depth}][{i}][{j}]</div>
                                      <div className="text-white font-bold text-sm">{depth === 0 ? val : val + 6}</div>
                                    </motion.div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="text-center text-xs text-emerald-300 mt-2"
                      >
                        3D Cube Structure
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-blue-300 text-sm">3d_array.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int cube[2][2][3] = {
        {{{1,2,3}, {4,5,6}}},   // Depth 0
        {{{7,8,9}, {10,11,12}}} // Depth 1
    };
    
    printf("[0][0][2]: %d\\n", cube[0][0][2]);  // 3
    printf("[1][1][1]: %d\\n", cube[1][1][1]);  // 11
    
    printf("\\nDepth 0 (first layer):\\n");
    for(int i = 0; i < 2; i++) {
        for(int j = 0; j < 3; j++) {
            printf("%d ", cube[0][i][j]);
        }
        printf("\\n");
    }
    /* Output:
    1 2 3
    4 5 6 */
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> [0][0][2]: 3<br />[1][1][1]: 11<br /><br />Depth 0:<br />1 2 3<br />4 5 6
                    </div>
                  </div>
                </div>
              </div>

              {/* Array of Structures with Animation */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">🏗️ 4. Array of Structures</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="min-w-0">
                    <p className="text-blue-200 mb-2"><strong>Theory:</strong> Array that stores multiple structure variables.</p>
                    <p className="text-blue-200 mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">struct Student class[50];</code></p>
                    <p className="text-blue-200"><strong>Use:</strong> Managing collections of records like students, employees.</p>
                    <div className="mt-3 bg-orange-500/20 rounded-lg p-2">
                      <p className="text-orange-200 text-sm">💡 Access: <code className="bg-black/50 px-1">students[0].name</code> = "Alice"</p>
                      <p className="text-orange-200 text-sm">💡 Access: <code className="bg-black/50 px-1">students[2].marks</code> = 92.3</p>
                    </div>

                    {/* Animated Array of Structures Visualization */}
                    <div className="mt-4 bg-black/30 rounded-lg p-4 overflow-x-auto">
                      <div className="text-center text-orange-300 text-sm mb-2">Array of Structures (Animated)</div>
                      <div className="space-y-2">
                        {[
                          { id: 101, name: "Alice", marks: 85.5, color: "bg-pink-600" },
                          { id: 102, name: "Bob", marks: 78.0, color: "bg-blue-600" },
                          { id: 103, name: "Charlie", marks: 92.3, color: "bg-green-600" }
                        ].map((student, i) => (
                          <motion.div
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            className={`${student.color} rounded-lg p-2 flex items-center gap-2`}
                          >
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                              className="bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                            >
                              {i}
                            </motion.div>
                            <div className="flex-1 text-sm">
                              <span className="font-bold">{student.name}</span>
                              <span className="text-xs ml-2">ID: {student.id}</span>
                            </div>
                            <div className="text-sm font-bold">{student.marks}%</div>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-center text-xs text-orange-300 mt-2"
                      >
                        Array of Student Records
                      </motion.div>
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="bg-black/50 rounded-lg overflow-hidden">
                      <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                        <span className="text-blue-300 text-sm">array_structures.c</span>
                      </div>
                      <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                        {`#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    float marks;
};

int main() {
    struct Student students[3] = {
        {101, "Alice", 85.5},
        {102, "Bob", 78.0},
        {103, "Charlie", 92.3}
    };
    
    for(int i = 0; i < 3; i++) {
        printf("%d: %s - %.1f\\n", 
               students[i].id, 
               students[i].name, 
               students[i].marks);
    }
    /* Output:
    101: Alice - 85.5
    102: Bob - 78.0
    103: Charlie - 92.3 */
    
    students[1].marks = 82.5;
    printf("\\nUpdated Bob: %.1f", students[1].marks);
    
    return 0;
}`}
                      </pre>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3 mt-3">
                      <span className="text-green-400">Output:</span> 101: Alice - 85.5<br />102: Bob - 78.0<br />103: Charlie - 92.3<br /><br />Updated Bob: 82.5
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>
        {/* SLIDE 12 · LIBRARIES */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-purple-800/60 text-purple-200 backdrop-blur-md">Chapter 12</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">C Standard Libraries</h2>
              </div>

              {/* Definition */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-purple-500">
                <p className="text-2xl text-purple-100 leading-relaxed">
                  <strong className="text-purple-300">C Standard Libraries</strong> are collections of pre-written functions, macros, and type definitions that provide common functionality like input/output, string manipulation, memory management, and mathematics.
                </p>
                <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
                  <p className="text-purple-200 text-lg">📌 <strong>Usage:</strong> Include with <code className="bg-black/50 px-2 py-1 rounded text-base">#include &lt;library.h&gt;</code></p>
                </div>
              </div>

              {/* Input/Output Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">📂 Input/Output Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-blue-500/10 rounded-lg transition-all">
                    <code className="text-blue-300 font-mono text-lg min-w-[120px] w-fit">stdio.h</code>
                    <p className="text-blue-200 text-base">Standard Input/Output - provides printf, scanf, fopen, fclose, getchar, putchar</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-blue-500/10 rounded-lg transition-all">
                    <code className="text-blue-300 font-mono text-lg min-w-[120px] w-fit">conio.h</code>
                    <p className="text-blue-200 text-base">Console Input/Output - provides getch, getche, clrscr, gotoxy (DOS/Windows specific)</p>
                  </div>
                </div>
              </div>

              {/* String & Character Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-green-300 mb-4">📝 String & Character Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-green-500/10 rounded-lg transition-all">
                    <code className="text-green-300 font-mono text-lg min-w-[120px] w-fit">string.h</code>
                    <p className="text-green-200 text-base">String manipulation - provides strlen, strcpy, strcat, strcmp, strchr, strstr</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-green-500/10 rounded-lg transition-all">
                    <code className="text-green-300 font-mono text-lg min-w-[120px] w-fit">ctype.h</code>
                    <p className="text-green-200 text-base">Character handling - provides isalpha, isdigit, isspace, toupper, tolower</p>
                  </div>
                </div>
              </div>

              {/* Mathematics Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-orange-300 mb-4">📐 Mathematics Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-orange-500/10 rounded-lg transition-all">
                    <code className="text-orange-300 font-mono text-lg min-w-[120px] w-fit">math.h</code>
                    <p className="text-orange-200 text-base">Mathematical functions - provides sqrt, pow, sin, cos, tan, log, exp, floor, ceil</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-orange-500/10 rounded-lg transition-all">
                    <code className="text-orange-300 font-mono text-lg min-w-[120px] w-fit">complex.h</code>
                    <p className="text-orange-200 text-base">Complex number arithmetic - provides complex types and functions (C99)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-orange-500/10 rounded-lg transition-all">
                    <code className="text-orange-300 font-mono text-lg min-w-[120px] w-fit">tgmath.h</code>
                    <p className="text-orange-200 text-base">Type-generic math functions - automatically selects correct math function based on argument type</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-orange-500/10 rounded-lg transition-all">
                    <code className="text-orange-300 font-mono text-lg min-w-[120px] w-fit">fenv.h</code>
                    <p className="text-orange-200 text-base">Floating-point environment - controls rounding modes and floating-point exceptions</p>
                  </div>
                </div>
              </div>

              {/* Memory & Utility Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">💾 Memory & Utility Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">stdlib.h</code>
                    <p className="text-cyan-200 text-base">General utilities - provides malloc, free, rand, srand, atoi, exit, qsort, abs</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">stddef.h</code>
                    <p className="text-cyan-200 text-base">Common definitions - provides size_t, ptrdiff_t, NULL, offsetof</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">stdint.h</code>
                    <p className="text-cyan-200 text-base">Fixed-width integer types - provides int32_t, uint64_t, intptr_t (C99)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">inttypes.h</code>
                    <p className="text-cyan-200 text-base">Format conversion for fixed-width integers - provides PRId32, SCNd64 macros</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">limits.h</code>
                    <p className="text-cyan-200 text-base">Integer limits - provides constants for min/max values of char, int, long, etc.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-cyan-500/10 rounded-lg transition-all">
                    <code className="text-cyan-300 font-mono text-lg min-w-[120px] w-fit">float.h</code>
                    <p className="text-cyan-200 text-base">Floating-point limits - provides constants for float/double precision, range, and epsilon</p>
                  </div>
                </div>
              </div>

              {/* Date & Time Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-teal-300 mb-4">⏰ Date & Time Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-teal-500/10 rounded-lg transition-all">
                    <code className="text-teal-300 font-mono text-lg min-w-[120px] w-fit">time.h</code>
                    <p className="text-teal-200 text-base">Date and time functions - provides time, clock, difftime, localtime, gmtime, strftime</p>
                  </div>
                </div>
              </div>

              {/* Error & Diagnostics Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-rose-300 mb-4">⚠️ Error & Diagnostics Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-rose-500/10 rounded-lg transition-all">
                    <code className="text-rose-300 font-mono text-lg min-w-[120px] w-fit">assert.h</code>
                    <p className="text-rose-200 text-base">Runtime assertion checking - provides assert macro for debugging</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-rose-500/10 rounded-lg transition-all">
                    <code className="text-rose-300 font-mono text-lg min-w-[120px] w-fit">errno.h</code>
                    <p className="text-rose-200 text-base">Error number handling - provides errno variable and perror function</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-rose-500/10 rounded-lg transition-all">
                    <code className="text-rose-300 font-mono text-lg min-w-[120px] w-fit">setjmp.h</code>
                    <p className="text-rose-200 text-base">Non-local jumps - provides setjmp and longjmp for error handling and exception simulation</p>
                  </div>
                </div>
              </div>

              {/* Signal & Process Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-amber-300 mb-4">⚙️ Signal & Process Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-amber-500/10 rounded-lg transition-all">
                    <code className="text-amber-300 font-mono text-lg min-w-[120px] w-fit">signal.h</code>
                    <p className="text-amber-200 text-base">Signal handling - provides signal and raise for handling interrupts and events</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-amber-500/10 rounded-lg transition-all">
                    <code className="text-amber-300 font-mono text-lg min-w-[120px] w-fit">locale.h</code>
                    <p className="text-amber-200 text-base">Localization functions - provides setlocale and localeconv for regional settings</p>
                  </div>
                </div>
              </div>

              {/* Wide Character & Unicode Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-indigo-300 mb-4">🌐 Wide Character & Unicode Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-indigo-500/10 rounded-lg transition-all">
                    <code className="text-indigo-300 font-mono text-lg min-w-[120px] w-fit">wchar.h</code>
                    <p className="text-indigo-200 text-base">Wide character handling - provides wprintf, wcscpy, wcslen, wcscmp for Unicode strings</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-indigo-500/10 rounded-lg transition-all">
                    <code className="text-indigo-300 font-mono text-lg min-w-[120px] w-fit">wctype.h</code>
                    <p className="text-indigo-200 text-base">Wide character classification - provides iswalpha, towupper, towlower for wide characters</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-indigo-500/10 rounded-lg transition-all">
                    <code className="text-indigo-300 font-mono text-lg min-w-[120px] w-fit">uchar.h</code>
                    <p className="text-indigo-200 text-base">Unicode character handling - provides types and functions for 16/32-bit Unicode chars (C11)</p>
                  </div>
                </div>
              </div>

              {/* Boolean & Variadic Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-emerald-300 mb-4">🔧 Boolean & Variadic Libraries</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-emerald-500/10 rounded-lg transition-all">
                    <code className="text-emerald-300 font-mono text-lg min-w-[120px] w-fit">stdbool.h</code>
                    <p className="text-emerald-200 text-base">Boolean type - provides bool, true, false constants (C99)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-emerald-500/10 rounded-lg transition-all">
                    <code className="text-emerald-300 font-mono text-lg min-w-[120px] w-fit">stdarg.h</code>
                    <p className="text-emerald-200 text-base">Variable argument lists - provides va_start, va_arg, va_end for functions with variable arguments</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-emerald-500/10 rounded-lg transition-all">
                    <code className="text-emerald-300 font-mono text-lg min-w-[120px] w-fit">iso646.h</code>
                    <p className="text-emerald-200 text-base">Alternative operator spellings - provides 'and', 'or', 'not' keywords as macros</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-emerald-500/10 rounded-lg transition-all">
                    <code className="text-emerald-300 font-mono text-lg min-w-[120px] w-fit">stdalign.h</code>
                    <p className="text-emerald-200 text-base">Alignment specification - provides alignas and alignof for memory alignment (C11)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-emerald-500/10 rounded-lg transition-all">
                    <code className="text-emerald-300 font-mono text-lg min-w-[120px] w-fit">stdnoreturn.h</code>
                    <p className="text-emerald-200 text-base">Non-returning functions - provides noreturn specifier for functions that never return (C11)</p>
                  </div>
                </div>
              </div>

              {/* Atomic & Thread Libraries */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-6 mb-6">
                <h3 className="text-2xl font-bold text-pink-300 mb-4">🧵 Thread & Atomic Libraries (C11)</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-pink-500/10 rounded-lg transition-all">
                    <code className="text-pink-300 font-mono text-lg min-w-[120px] w-fit">threads.h</code>
                    <p className="text-pink-200 text-base">Thread management - provides thrd_create, mtx_lock, cnd_wait for multithreading (C11)</p>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-3 hover:bg-pink-500/10 rounded-lg transition-all">
                    <code className="text-pink-300 font-mono text-lg min-w-[120px] w-fit">stdatomic.h</code>
                    <p className="text-pink-200 text-base">Atomic operations - provides atomic types and operations for lock-free programming (C11)</p>
                  </div>
                </div>
              </div>

              {/* Summary Table */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-2xl font-bold text-center text-purple-300 mb-4">📋 Most Commonly Used Libraries</h3>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-purple-500/20">
                        <th className="border p-3 text-left text-purple-200 text-base">Library</th>
                        <th className="border p-3 text-left text-purple-200 text-base">Purpose</th>
                        <th className="border p-3 text-left text-purple-200 text-base">Common Functions</th></tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">stdio.h</td><td className="border p-2 text-blue-200 text-base">Input/Output</td><td className="border p-2 text-blue-200 text-base">printf, scanf, fopen, fclose</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">stdlib.h</td><td className="border p-2 text-blue-200 text-base">General utilities</td><td className="border p-2 text-blue-200 text-base">malloc, free, rand, atoi, qsort</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">string.h</td><td className="border p-2 text-blue-200 text-base">String handling</td><td className="border p-2 text-blue-200 text-base">strlen, strcpy, strcat, strcmp</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">math.h</td><td className="border p-2 text-blue-200 text-base">Mathematics</td><td className="border p-2 text-blue-200 text-base">sqrt, pow, sin, cos, log</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">ctype.h</td><td className="border p-2 text-blue-200 text-base">Character handling</td><td className="border p-2 text-blue-200 text-base">isalpha, isdigit, toupper, tolower</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">time.h</td><td className="border p-2 text-blue-200 text-base">Date & Time</td><td className="border p-2 text-blue-200 text-base">time, clock, localtime, difftime</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">assert.h</td><td className="border p-2 text-blue-200 text-base">Debugging</td><td className="border p-2 text-blue-200 text-base">assert</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">errno.h</td><td className="border p-2 text-blue-200 text-base">Error handling</td><td className="border p-2 text-blue-200 text-base">errno, perror</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">stdbool.h</td><td className="border p-2 text-blue-200 text-base">Boolean type</td><td className="border p-2 text-blue-200 text-base">bool, true, false</td></tr>
                      <tr className="border-b hover:bg-purple-500/10 transition-all"><td className="border p-2 font-mono text-purple-300 text-base">stdint.h</td><td className="border p-2 text-blue-200 text-base">Fixed-width integers</td><td className="border p-2 text-blue-200 text-base">int32_t, uint64_t, intptr_t</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </Slide>
        </div>

        {/* SLIDE 13 · FUNCTIONS */}
        <div className="slide-section">

          <div className="w-full max-w-6xl mx-auto py-12 px-6">

            {/* Header */}
            <div className="text-center mb-12">
              <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-pink-800/60 text-pink-200 backdrop-blur-md">Chapter 13</span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-white">Functions in C</h2>
            </div>

            {/* Definition */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-pink-500">
              <p className="text-2xl text-pink-100 leading-relaxed">
                A <strong className="text-pink-300">function</strong> is a <strong className="text-pink-300">reusable block of code</strong> that performs a specific task. It helps in modular programming, reduces code redundancy, and makes programs easier to debug and maintain.
              </p>
              <div className="mt-4 p-4 bg-pink-500/20 rounded-lg">
                <p className="text-pink-200 text-lg">📌 <strong>Key Concepts:</strong> Function Declaration (Prototype), Function Definition, Function Call</p>
              </div>
            </div>

            {/* Function Structure */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">📝 Function Structure</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <p className="text-blue-200 text-base mb-2"><strong>Function Declaration (Prototype):</strong> Tells compiler about function name, return type, and parameters.</p>
                  <p className="text-blue-200 text-base mb-2"><strong>Syntax:</strong> <code className="bg-black/50 px-2 py-1 rounded">return_type function_name(parameters);</code></p>
                  <p className="text-blue-200 text-base mb-2"><strong>Function Definition:</strong> Actual body of the function containing the code.</p>
                  <p className="text-blue-200 text-base"><strong>Function Call:</strong> Invoking the function to execute its code.</p>
                </div>
                <div className="min-w-0">
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                      <span className="text-pink-300 text-sm">function_structure.c</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`#include <stdio.h>

// 1. Function Declaration (Prototype)
int add(int a, int b);
void displayMessage(void);

int main() {
    // 3. Function Call
    int sum = add(10, 20);
    displayMessage();
    printf("Sum: %d\\n", sum);
    return 0;
}

// 2. Function Definition
int add(int a, int b) {
    return a + b;
}

void displayMessage(void) {
    printf("Hello from function!\\n");
}`}
                    </pre>
                  </div>
                  <div className="bg-black/50 rounded-lg p-3 mt-3">
                    <span className="text-green-400">Output:</span> Hello from function!<br />Sum: 30
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Functions */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-bold text-purple-300 mb-4">📊 Types of Functions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-900/40 rounded-lg p-3 text-center">
                  <div className="text-2xl">🔹</div>
                  <div className="font-bold text-purple-300">No Args, No Return</div>
                  <div className="text-xs text-blue-200">void func(void)</div>
                </div>
                <div className="bg-purple-900/40 rounded-lg p-3 text-center">
                  <div className="text-2xl">🔸</div>
                  <div className="font-bold text-purple-300">No Args, With Return</div>
                  <div className="text-xs text-blue-200">int func(void)</div>
                </div>
                <div className="bg-purple-900/40 rounded-lg p-3 text-center">
                  <div className="text-2xl">🔹</div>
                  <div className="font-bold text-purple-300">With Args, No Return</div>
                  <div className="text-xs text-blue-200">void func(int a)</div>
                </div>
                <div className="bg-purple-900/40 rounded-lg p-3 text-center">
                  <div className="text-2xl">🔸</div>
                  <div className="font-bold text-purple-300">With Args, With Return</div>
                  <div className="text-xs text-blue-200">int func(int a)</div>
                </div>
              </div>

              {/* Type 1: No Args, No Return */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-pink-300 mb-3">🔹 Type 1: No Arguments, No Return Value</h4>
                <div className="grid md:grid-cols-2 gap-4">

                  <p className="text-blue-200 text-sm"><strong>Theory:</strong> Performs a task but doesn't take any input or return any value. Used for simple operations like printing messages.</p>
                  <p className="text-blue-200 text-sm mt-2"><strong>Syntax:</strong> <code className="bg-black/50 px-1 rounded">void functionName(void) </code></p>

                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`void greet(void) {
    printf("Hello!\\n");
}

int main() {
    greet();  // Function call
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Type 2: No Args, With Return */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-blue-300 mb-3">🔸 Type 2: No Arguments, With Return Value</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-200 text-sm"><strong>Theory:</strong> Gets input from user or generates a value and returns it to the caller.</p>
                    <p className="text-blue-200 text-sm mt-2"><strong>Syntax:</strong> <code className="bg-black/50 px-1 rounded">int functionName(void)  return value; </code></p>
                  </div>
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`int getNumber(void) {
    int num;
    printf("Enter: ");
    scanf("%d", &num);
    return num;
}

int main() {
    int value = getNumber();
    printf("You entered: %d", value);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Type 3: With Args, No Return */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-green-300 mb-3">🔹 Type 3: With Arguments, No Return Value</h4>
                <div className="grid md:grid-cols-2 gap-4">

                  <p className="text-blue-200 text-sm"><strong>Theory:</strong> Takes input parameters, processes them, and displays output without returning anything.</p>
                  <p className="text-blue-200 text-sm mt-2"><strong>Syntax:</strong> <code className="bg-black/50 px-1 rounded">void functionName(int a, int b) <  code ></code></code></p>

                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`void printSum(int a, int b) {
    printf("Sum: %d\\n", a + b);
}

int main() {
    printSum(10, 20);
    printSum(50, 30);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Type 4: With Args, With Return */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-orange-300 mb-3">🔸 Type 4: With Arguments, With Return Value</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-200 text-sm"><strong>Theory:</strong> Takes input parameters, performs calculation, and returns the result.</p>
                    <p className="text-blue-200 text-sm mt-2"><strong>Syntax:</strong> <code className="bg-black/50 px-1 rounded">int functionName(int a, int b)  return a + b; </code></p>
                  </div>
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`int multiply(int x, int y) {
    return x * y;
}

int main() {
    int product = multiply(5, 6);
    printf("Product: %d\\n", product);
    printf("10 * 20 = %d\\n", multiply(10, 20));
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Call by Value vs Call by Reference */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-bold text-cyan-300 mb-4">🔄 Call by Value vs Call by Reference</h3>
              <div className="grid md:grid-cols-2 gap-6">

                {/* Call by Value */}
                <div className="min-w-0">
                  <h4 className="text-xl font-bold text-blue-300 mb-3">📤 Call by Value</h4>
                  <p className="text-blue-200 text-sm mb-3"><strong>Theory:</strong> A copy of the actual argument is passed. Changes inside function do NOT affect the original variable.</p>
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`void changeValue(int x) {
    x = 100;
    printf("Inside: %d\\n", x);
}

int main() {
    int num = 50;
    printf("Before: %d\\n", num);
    changeValue(num);
    printf("After: %d\\n", num);
    return 0;
}
// Output: Before: 50, Inside: 100, After: 50`}
                    </pre>
                  </div>
                </div>

                {/* Call by Reference */}
                <div className="min-w-0">
                  <h4 className="text-xl font-bold text-emerald-300 mb-3">📥 Call by Reference</h4>
                  <p className="text-blue-200 text-sm mb-3"><strong>Theory:</strong> Address of the variable is passed. Changes inside function DO affect the original variable using pointers.</p>
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <pre className="p-3 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`void changeValue(int *x) {
    *x = 100;
    printf("Inside: %d\\n", *x);
}

int main() {
    int num = 50;
    printf("Before: %d\\n", num);
    changeValue(&num);
    printf("After: %d\\n", num);
    return 0;
}
// Output: Before: 50, Inside: 100, After: 100`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Recursive Functions */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-bold text-orange-300 mb-4">🔄 Recursive Functions</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <p className="text-blue-200 text-base mb-2"><strong>Theory:</strong> A function that calls itself. Must have a base case to stop recursion and recursive case to continue.</p>
                  <p className="text-blue-200 text-base"><strong>Example:</strong> Factorial, Fibonacci, Tower of Hanoi</p>
                  <div className="mt-3 bg-orange-500/20 rounded-lg p-3">
                    <p className="text-orange-200 text-sm">💡 <strong>Base Case:</strong> if(n &lt;= 1) return 1;</p>
                    <p className="text-orange-200 text-sm">💡 <strong>Recursive Case:</strong> return n * factorial(n - 1);</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                      <span className="text-pink-300 text-sm">recursion.c</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`#include <stdio.h>

int factorial(int n) {
    if(n <= 1) return 1;  // Base case
    return n * factorial(n - 1);  // Recursive case
}

int fibonacci(int n) {
    if(n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Factorial 5: %d\\n", factorial(5));
    printf("Fibonacci 6: %d\\n", fibonacci(6));
    return 0;
}
// Output: Factorial 5: 120, Fibonacci 6: 8`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Inline Functions */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-4">⚡ Inline Functions (C99)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="min-w-0">
                  <p className="text-blue-200 text-base mb-2"><strong>Theory:</strong> Suggests compiler to insert function code at call point instead of function call overhead. Use for small, frequently called functions.</p>
                  <p className="text-blue-200 text-base"><strong>Benefits:</strong> No function call overhead, faster execution for small functions.</p>
                  <div className="mt-3 bg-emerald-500/20 rounded-lg p-3">
                    <p className="text-emerald-200 text-sm">⚠️ <strong>Note:</strong> Inline is a request, not a command. Compiler may ignore it for complex functions.</p>
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="bg-black/50 rounded-lg overflow-hidden">
                    <div className="bg-purple-800/30 px-3 py-1 border-b border-purple-500/30">
                      <span className="text-pink-300 text-sm">inline_function.c</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-blue-200 overflow-x-auto">
                      {`#include <stdio.h>

inline int square(int x) {
    return x * x;
}

inline int max(int a, int b) {
    return (a > b) ? a : b;
}

int main() {
    int a = 5, b = 10;
    printf("Square: %d\\n", square(a));
    printf("Max: %d\\n", max(a, b));
    return 0;
}
// Output: Square: 25, Max: 10`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Program */}
            <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 w-full flex flex-col items-center">
              <h3 className="text-3xl font-bold text-pink-300 mb-8 text-center w-full">💻 Complete Program - All Function Types</h3>
              <div className="bg-black/50 rounded-lg overflow-hidden w-full max-w-4xl mx-auto shadow-2xl">
                <div className="bg-pink-800/30 px-5 py-3 border-b border-pink-500/30">
                  <span className="text-pink-300 text-base font-mono">all_functions.c</span>
                </div>
                <pre className="p-8 text-lg font-mono text-blue-200 overflow-x-auto">
                  {`#include <stdio.h>

// Function declarations
void greet(void);
int getNumber(void);
void printSum(int a, int b);
int multiply(int x, int y);
int factorial(int n);

int main() {
    greet();
    int num = getNumber();
    printSum(10, 20);
    int product = multiply(5, 6);
    printf("Factorial of 5: %d\\n", factorial(5));
    return 0;
}

void greet(void) {
    printf("Welcome to C Programming!\\n");
}

int getNumber(void) {
    return 25; // Example return
}

void printSum(int a, int b) {
    printf("Sum: %d\\n", a + b);
}

int multiply(int x, int y) {
    return x * y;
}

int factorial(int n) {
    if(n <= 1) return 1;
    return n * factorial(n - 1);
}`}
                </pre>
              </div>
              <div className="bg-black/40 rounded-xl p-6 mt-8 w-full max-w-4xl mx-auto border border-white/5">
                <div className="text-green-400 font-mono text-lg leading-relaxed">
                  Welcome to C Programming!<br />
                  Sum of 10 and 20 is 30<br />
                  Product: 30<br />
                  Factorial of 5: 120
                </div>
              </div>
            </div>

          </div>

        </div>
        {/* SLIDE 14 · POINTERS */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-blue-800/60 text-blue-200 backdrop-blur-md">Chapter 14</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Pointers in C</h2>
              </div>

              {/* Definition */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-blue-500">
                <p className="text-2xl text-blue-100 leading-relaxed">
                  A <strong className="text-blue-300">pointer</strong> is a variable that stores the <strong className="text-blue-300">memory address</strong> of another variable. Pointers allow direct memory access, dynamic memory allocation, and efficient array/string manipulation.
                </p>
                <div className="mt-4 p-4 bg-blue-500/20 rounded-lg">
                  <p className="text-blue-200 text-xl">📌 <strong>Key Operators:</strong> &amp; (Address of) and * (Dereference)</p>
                </div>
              </div>

              {/* Types of Pointers */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-300 mb-6 text-center">📊 Types of Pointers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">📍</div>
                    <div className="font-bold text-purple-300 text-xl">Single Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Stores address of a variable</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">int *ptr;</code>
                  </div>
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">🔗</div>
                    <div className="font-bold text-purple-300 text-xl">Double Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Stores address of another pointer</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">int **ptr;</code>
                  </div>
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">🚫</div>
                    <div className="font-bold text-purple-300 text-xl">NULL Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Points to nothing (address 0)</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">int *ptr = NULL;</code>
                  </div>
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">🔲</div>
                    <div className="font-bold text-purple-300 text-xl">Void Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Generic pointer (any type)</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">void *ptr;</code>
                  </div>
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">⚡</div>
                    <div className="font-bold text-purple-300 text-xl">Function Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Points to a function</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">int (*ptr)(int,int);</code>
                  </div>
                  <div className="bg-purple-900/40 rounded-xl p-5 text-center hover:bg-purple-800/40 transition-all">
                    <div className="text-4xl mb-3">⚠️</div>
                    <div className="font-bold text-purple-300 text-xl">Dangling Pointer</div>
                    <div className="text-base text-blue-200 mt-2">Points to freed memory</div>
                    <code className="text-sm text-purple-300 block mt-3 bg-black/30 p-2 rounded">ptr after free()</code>
                  </div>
                </div>
              </div>

              {/* Pointer Declaration and Initialization */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-300 mb-5">📍 Pointer Declaration and Initialization</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-4 min-w-0">
                    <p className="text-blue-200 text-lg"><strong>Theory:</strong> A pointer is declared with * and initialized with the address of a variable using &amp; operator.</p>
                    <p className="text-blue-200 text-lg"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-sm sm:text-base">data_type *ptr = &variable;</code></p>

                    {/* Visual Diagram */}
                    <div className="mt-6 bg-black/40 rounded-xl p-5 overflow-x-auto">
                      <div className="text-center text-pink-300 text-base mb-3">📊 Memory Visualization</div>
                      <div className="flex justify-center items-center gap-4 sm:gap-6 min-w-max mx-auto px-2">
                        <div className="bg-blue-600 rounded-xl p-4 text-center min-w-[120px] sm:min-w-[140px]">
                          <div className="text-sm text-blue-200">Variable num</div>
                          <div className="text-3xl font-bold text-white">42</div>
                          <div className="text-xs text-blue-300 mt-1">Address: 0x7ffd</div>
                        </div>
                        <div className="text-2xl sm:text-3xl text-white">←</div>
                        <div className="bg-purple-600 rounded-xl p-4 text-center min-w-[140px] sm:min-w-[160px]">
                          <div className="text-sm text-purple-200">Pointer ptr</div>
                          <div className="text-xl font-mono text-white">0x7ffd</div>
                          <div className="text-xs text-purple-300 mt-1">Stores address of num</div>
                        </div>
                      </div>
                      <div className="mt-4 text-center text-sm text-blue-300 min-w-max">ptr = &num → ptr stores address of num</div>
                    </div>

                    <div className="mt-4 bg-blue-500/20 rounded-xl p-4">
                      <p className="text-blue-200 text-base">💡 <strong>&amp; operator:</strong> Gets memory address of a variable</p>
                      <p className="text-blue-200 text-base mt-2">💡 <strong>* operator:</strong> Accesses value at the address (dereference)</p>
                      <p className="text-blue-200 text-base mt-2">💡 Pointer size: 4 bytes (32-bit) or 8 bytes (64-bit)</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-black/50 rounded-xl overflow-hidden">
                      <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                        <span className="text-blue-300 text-base">pointer_declaration.c</span>
                      </div>
                      <pre className="p-5 text-sm font-mono text-blue-200 leading-relaxed overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int num = 42;
    int *ptr = &num;
    
    printf("Value: %d\\n", num);
    printf("Address: %p\\n", &num);
    printf("Ptr stores: %p\\n", ptr);
    printf("Value at ptr: %d\\n", *ptr);
    
    *ptr = 100;
    printf("After change: %d\\n", num);
    
    return 0;
}

/* OUTPUT:
Value: 42
Address: 0x7ffd1234
Ptr stores: 0x7ffd1234
Value at ptr: 42
After change: 100 */`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pointer Arithmetic */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-300 mb-5">➗ Pointer Arithmetic</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-4 min-w-0">
                    <p className="text-blue-200 text-lg"><strong>Theory:</strong> Adding 1 to a pointer moves it by <code className="bg-black/50 px-2 py-1 rounded">sizeof(data type)</code> bytes.</p>
                    <p className="text-blue-200 text-lg"><strong>Operations:</strong> ++, --, +, -, comparison between pointers</p>

                    {/* Visual Diagram */}
                    <div className="mt-6 bg-black/40 rounded-xl p-5 overflow-x-auto">
                      <div className="text-center text-green-300 text-base mb-3">📊 Array Memory Layout</div>
                      <div className="flex justify-center gap-2 min-w-max mx-auto px-2">
                        {[10, 20, 30, 40, 50].map((val, i) => (
                          <div key={i} className="bg-green-700 rounded-lg p-3 text-center min-w-[70px]">
                            <div className="text-xs text-green-300">[{i}]</div>
                            <div className="text-xl font-bold text-white">{val}</div>
                            <div className="text-[10px] text-green-400">0x{100 + i * 4}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center gap-4 mt-4 min-w-max mx-auto">
                        <div className="text-center">
                          <div className="text-green-400 text-sm">ptr (start)</div>
                          <div className="text-white">↓</div>
                          <div className="bg-green-600 px-3 py-1 rounded text-sm">ptr+1 → +4 bytes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 text-sm">ptr+2</div>
                          <div className="text-white">↓</div>
                          <div className="bg-green-600 px-3 py-1 rounded text-sm">+8 bytes</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-green-500/20 rounded-xl p-4">
                      <p className="text-green-200 text-base">📌 <strong>ptr+1</strong> → moves to next element (adds 4 bytes for int)</p>
                      <p className="text-green-200 text-base mt-2">📌 <strong>ptr-1</strong> → moves to previous element</p>
                      <p className="text-green-200 text-base mt-2">📌 <strong>ptr2 - ptr1</strong> → gives number of elements between</p>
                      <p className="text-green-200 text-base mt-2">📌 Pointers can be compared using &lt;, &gt;, ==, !=</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-black/50 rounded-xl overflow-hidden">
                      <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                        <span className="text-blue-300 text-base">pointer_arithmetic.c</span>
                      </div>
                      <pre className="p-5 text-sm font-mono text-blue-200 leading-relaxed overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *ptr = arr;
    
    printf("*ptr = %d\\n", *ptr);
    ptr++;
    printf("After ptr++: %d\\n", *ptr);
    ptr += 2;
    printf("After ptr+=2: %d\\n", *ptr);
    ptr--;
    printf("After ptr--: %d\\n", *ptr);
    
    int *start = arr;
    int *end = &arr[4];
    int elements = end - start;
    printf("Elements: %d\\n", elements);
    
    return 0;
}

/* OUTPUT:
*ptr = 10
After ptr++: 20
After ptr+=2: 40
After ptr--: 30
Elements: 4 */`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Double Pointers */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 mb-8">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-300 mb-5">🔗 Double Pointers (Pointers to Pointers)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-4">
                    <p className="text-blue-200 text-lg"><strong>Theory:</strong> A pointer that stores the address of another pointer. Used in dynamic memory allocation, 2D arrays, and modifying pointer arguments.</p>
                    <p className="text-blue-200 text-lg"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-base">data_type **ptr;</code></p>

                    {/* Visual Diagram */}
                    <div className="mt-6 bg-black/40 rounded-xl p-5 overflow-x-auto">
                      <div className="text-center text-orange-300 text-base mb-3">📊 Double Pointer Visualization</div>
                      <div className="flex justify-center items-center gap-4 min-w-max mx-auto px-2">
                        <div className="bg-blue-600 rounded-xl p-3 text-center min-w-[100px]">
                          <div className="text-xs text-blue-200">Variable num</div>
                          <div className="text-2xl font-bold text-white">100</div>
                          <div className="text-[10px] text-blue-300">0x100</div>
                        </div>
                        <div className="text-white text-xl">←</div>
                        <div className="bg-purple-600 rounded-xl p-3 text-center min-w-[120px]">
                          <div className="text-xs text-purple-200">Single ptr</div>
                          <div className="text-sm font-mono text-white">0x100</div>
                          <div className="text-[10px] text-purple-300">0x200</div>
                        </div>
                        <div className="text-white text-xl">←</div>
                        <div className="bg-orange-600 rounded-xl p-3 text-center min-w-[120px]">
                          <div className="text-xs text-orange-200">Double dptr</div>
                          <div className="text-sm font-mono text-white">0x200</div>
                          <div className="text-[10px] text-orange-300">0x300</div>
                        </div>
                      </div>
                      <div className="mt-3 text-center text-sm text-orange-300 min-w-max">dptr → ptr → num</div>
                    </div>

                    <div className="mt-4 bg-orange-500/20 rounded-xl p-4">
                      <p className="text-orange-200 text-base">📌 <strong>*ptr</strong> → gives address of the variable</p>
                      <p className="text-orange-200 text-base mt-2">📌 <strong>**ptr</strong> → gives actual value of the variable</p>
                      <p className="text-orange-200 text-base mt-2">📌 Used for 2D arrays: <code className="bg-black/50 px-1">int **matrix</code></p>
                      <p className="text-orange-200 text-base mt-2">📌 Used to modify pointer in functions</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-black/50 rounded-xl overflow-hidden">
                      <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                        <span className="text-blue-300 text-base">double_pointers.c</span>
                      </div>
                      <pre className="p-5 text-sm font-mono text-blue-200 leading-relaxed overflow-x-auto">
                        {`#include <stdio.h>

int main() {
    int num = 100;
    int *ptr = &num;
    int **dptr = &ptr;
    
    printf("Value: %d\\n", num);
    printf("Using ptr: %d\\n", *ptr);
    printf("Using dptr: %d\\n", **dptr);
    
    printf("\\nAddresses:\\n");
    printf("&num: %p\\n", &num);
    printf("ptr: %p\\n", ptr);
    printf("&ptr: %p\\n", &ptr);
    printf("dptr: %p\\n", dptr);
    
    **dptr = 200;
    printf("\\nAfter change: %d\\n", num);
    
    return 0;
}

/* OUTPUT:
Value: 100
Using ptr: 100
Using dptr: 100

Addresses:
&num: 0x7ffd1234
ptr: 0x7ffd1234
&ptr: 0x7ffd1238
dptr: 0x7ffd1238

After change: 200 */`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dangling Pointers */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-4 sm:p-6 md:p-8 mb-8 border-l-8 border-rose-500">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-rose-300 mb-5">⚠️ Dangling Pointers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-4">
                    <p className="text-blue-200 text-lg"><strong>Theory:</strong> A pointer that points to a memory location that has been freed or deallocated. Accessing a dangling pointer causes undefined behavior (programs crash or memory corruption).</p>
                    
                    <h4 className="text-rose-300 font-bold mt-4">Common Causes:</h4>
                    <ul className="list-disc list-inside text-blue-200 space-y-2 text-base">
                      <li>Freeing memory but pointer still holds the address</li>
                      <li>Local variable goes out of scope</li>
                      <li>Function returning address of local variable</li>
                    </ul>

                    {/* Visual Diagram */}
                    <div className="mt-6 bg-black/40 rounded-xl p-5 overflow-x-auto">
                      <div className="text-center text-rose-300 text-base mb-4">⚠️ Dangling Pointer Scenario</div>
                      <div className="flex justify-center items-center gap-6 min-w-max mx-auto px-2">
                        <div className="text-center">
                          <div className="bg-green-600 rounded-lg p-3 w-28">
                            <div className="text-xs text-green-200">Before free</div>
                            <div className="text-lg font-bold text-white">ptr → 0x100</div>
                            <div className="text-[10px] text-green-300">Valid memory</div>
                          </div>
                        </div>
                        <div className="text-white text-2xl">→</div>
                        <div className="bg-gray-600 rounded-xl p-3 text-center min-w-[120px] opacity-50">
                          <div className="text-xs text-gray-400">After free</div>
                          <div className="text-sm font-mono text-white">ptr → 0x100</div>
                          <div className="text-[10px] text-gray-500">Freed memory!</div>
                        </div>
                        <div className="text-red-500 text-2xl">⚠️</div>
                      </div>
                      <div className="mt-3 text-center text-sm text-rose-300">Pointer still holds address but memory is freed → DANGLING!</div>
                    </div>

                    <div className="mt-4 bg-rose-500/20 rounded-xl p-4">
                      <p className="text-rose-200 text-base">✅ <strong>Solution:</strong> Always set pointer to <code className="bg-black/50 px-2 py-1 rounded">NULL</code> after freeing!</p>
                      <p className="text-rose-200 text-base mt-2">✅ Check if pointer is NULL before dereferencing</p>
                      <p className="text-rose-200 text-base mt-2">✅ Never return address of local variables</p>
                    </div>
                  </div>
                  <div>
                    <div className="bg-black/50 rounded-xl overflow-hidden">
                      <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                        <span className="text-blue-300 text-base">dangling_pointers.c</span>
                      </div>
                      <pre className="p-5 text-sm font-mono text-blue-200 leading-relaxed overflow-x-auto">
                        {`#include <stdio.h>
#include <stdlib.h>

int* createDangling() {
    int local = 100;
    return &local;  // BAD: local destroyed!
}

int main() {
    // Case 1: Local variable
    int *dangling = createDangling();
    printf("Dangling addr: %p\\n", dangling);
    
    // Case 2: After free
    int *ptr = (int*)malloc(sizeof(int));
    *ptr = 50;
    printf("Before free: %d\\n", *ptr);
    
    free(ptr);  // ptr now dangling
    
    // SOLUTION: Set to NULL
    ptr = NULL;
    
    if(ptr == NULL)
        printf("Pointer NULL - safe\\n");
    
    return 0;
}

/* OUTPUT:
Dangling addr: 0x7ffd1234
Before free: 50
Pointer NULL - safe */`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>
        {/* SLIDE 15 · STRUCTURES */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-amber-800/60 text-amber-200 backdrop-blur-md">Chapter 15</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Structures & Unions</h2>
              </div>

              {/* ==================== STRUCTURE ==================== */}

              {/* 1. What is Structure? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-amber-500">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🏗️ What is a Structure?</h3>
                <p className="text-2xl text-amber-100 leading-relaxed">
                  A <strong className="text-amber-300">structure</strong> groups <strong>different data types</strong> under one name. Each member gets its own memory.
                </p>
                <div className="mt-4 p-4 bg-amber-500/20 rounded-lg">
                  <p className="text-amber-200 text-xl">📌 Size = Sum of all members + padding</p>
                  <p className="text-amber-200 text-xl mt-2">📌 Access using dot (.) operator</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="text-center text-amber-300 text-lg mb-3">Memory Layout</div>
                  <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <div className="bg-blue-600 rounded-lg p-3 text-center min-w-[100px]">
                      <div className="text-base text-blue-200">int rollNo</div>
                      <div className="text-2xl font-bold text-white">101</div>
                      <div className="text-sm text-blue-300">4 bytes</div>
                    </div>
                    <div className="bg-green-600 rounded-lg p-3 text-center min-w-[120px]">
                      <div className="text-base text-green-200">char name[50]</div>
                      <div className="text-xl font-mono text-white">"John"</div>
                      <div className="text-sm text-green-300">50 bytes</div>
                    </div>
                    <div className="bg-purple-600 rounded-lg p-3 text-center min-w-[100px]">
                      <div className="text-base text-purple-200">float marks</div>
                      <div className="text-2xl font-bold text-white">85.5</div>
                      <div className="text-sm text-purple-300">4 bytes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Structure Declaration & Code */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">📝 Structure Declaration</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">struct Student  int id; char name[50]; float marks; ;</code></p>
                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">structure.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

struct Student {
    int rollNo;
    char name[50];
    float marks;
};

int main() {
    struct Student s1 = {101, "John", 85.5};
    struct Student s2;
    
    s2.rollNo = 102;
    strcpy(s2.name, "Jane");
    s2.marks = 92.3;
    
    printf("%d %s %.1f\\n", s1.rollNo, s1.name, s1.marks);
    printf("%d %s %.1f\\n", s2.rollNo, s2.name, s2.marks);
    return 0;
}

// Output: 101 John 85.5
//         102 Jane 92.3`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. Dot Operator */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🔍 Dot Operator (.)</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">structure_variable.member</code></p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-blue-600 px-4 py-2 rounded text-base sm:text-lg">s1</div>
                      <div className="text-white text-2xl">.</div>
                      <div className="bg-green-600 px-4 py-2 rounded text-lg">rollNo</div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-purple-600 px-4 py-2 rounded text-lg">101</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">dot_operator.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`struct Point { int x, y; };
struct Point p1 = {10, 20};
p1.x = 30;        // Access and modify
printf("%d", p1.x); // Read value`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. Arrow Operator (Pointers) */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">➡️ Arrow Operator (-)</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">ptr-member</code> (same as <code className="bg-black/50 px-2">(*ptr).member</code>)</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-purple-600 px-4 py-2 rounded text-base sm:text-lg">ptr</div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-blue-600 px-4 py-2 rounded text-base sm:text-lg">id: 101</div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-green-600 px-4 py-2 rounded text-lg">ptr-id = 101</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">arrow_operator.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`struct Book { int id; char title[100]; };
struct Book book1 = {101, "C Programming"};
struct Book *ptr = &book1;

ptr->id = 102;      // Same as (*ptr).id
printf("%s", ptr->title);`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 5. typedef with Structure */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🔖 typedef with Structure</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Benefit:</strong> No need to write 'struct' keyword every time</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-red-900/50 p-3 rounded text-center">
                        <div className="text-red-300 text-base">Without typedef</div>
                        <code className="text-white text-base">struct Student s1;</code>
                      </div>
                      <div className="bg-green-900/50 p-3 rounded text-center">
                        <div className="text-green-300 text-base">With typedef</div>
                        <code className="text-white text-base">Student s1;</code>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">typedef_structure.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`typedef struct {
    int id;
    char name[50];
} Student;

Student s1 = {101, "Alice"};
Student s2;  // No 'struct' keyword needed!`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* ==================== UNION ==================== */}

              {/* 6. What is Union? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-emerald-500">
                <h3 className="text-4xl font-bold text-emerald-300 mb-4">🤝 What is a Union?</h3>
                <p className="text-2xl text-emerald-100 leading-relaxed">
                  A <strong className="text-emerald-300">union</strong> shares <strong>same memory</strong> among all members. Can hold only one member at a time.
                </p>
                <div className="mt-4 p-4 bg-emerald-500/20 rounded-lg">
                  <p className="text-emerald-200 text-xl">📌 Size = Size of largest member</p>
                  <p className="text-emerald-200 text-xl mt-2">📌 All members share same address</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="text-center text-emerald-300 text-lg mb-3">Union Memory (All share same space)</div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="border border-emerald-500 rounded-lg p-3 inline-block">
                      <div className="text-emerald-400 text-base">int i (4 bytes)</div>
                      <div className="text-white text-sm">↓ SAME ↓</div>
                      <div className="text-emerald-400 text-base mt-2">float f (4 bytes)</div>
                      <div className="text-white text-sm">↓ SAME ↓</div>
                      <div className="text-emerald-400 text-base mt-2">char str[20] (20 bytes)</div>
                    </div>
                    <div className="text-gray-400 text-base mt-3">Union Size = 20 bytes</div>
                  </div>
                </div>
              </div>

              {/* 7. Union Declaration & Code */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-emerald-300 mb-4">📝 Union Declaration</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">union Data  int i; float f; char str[20]; ;</code></p>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-emerald-300 text-lg">union.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

union Data {
    int i;
    float f;
    char str[20];
};

int main() {
    union Data data;
    printf("Size: %lu\\n", sizeof(union Data)); // 20
    
    data.i = 10;
    printf("int: %d\\n", data.i);
    
    data.f = 3.14;  // Overwrites previous value
    printf("float: %.2f\\n", data.f);
    printf("int: %d (garbage)\\n", data.i);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 8. Structure vs Union */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">📊 Structure vs Union</h3>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-900/30 rounded-xl p-5">
                    <h4 className="text-2xl font-bold text-blue-300 mb-3">Structure</h4>
                    <ul className="space-y-2 text-blue-200 text-lg">
                      <li>✓ Separate memory for each member</li>
                      <li>✓ Size = Sum of all members</li>
                      <li>✓ All members accessible at once</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/30 rounded-xl p-5">
                    <h4 className="text-2xl font-bold text-green-300 mb-3">Union</h4>
                    <ul className="space-y-2 text-green-200 text-lg">
                      <li>✓ Shared memory for all members</li>
                      <li>✓ Size = Largest member size</li>
                      <li>✓ Only one member at a time</li>
                    </ul>
                  </div>
                </div>

                {/* Visual Comparison */}
                <div className="bg-black/40 rounded-xl p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-blue-300 text-lg mb-2">Structure</div>
                      <div className="bg-blue-700 p-3 rounded">int a (4 bytes)</div>
                      <div className="bg-blue-700 p-3 rounded mt-1">char b (1 byte)</div>
                      <div className="bg-blue-700 p-3 rounded mt-1">float c (4 bytes)</div>
                      <div className="text-gray-400 text-base mt-2">Total: 9+ bytes</div>
                    </div>
                    <div>
                      <div className="text-green-300 text-lg mb-2">Union</div>
                      <div className="bg-green-700 p-4 rounded">Shared Memory (4 bytes)</div>
                      <div className="text-gray-400 text-base mt-2">All members share space</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 9. Memory Sharing */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-emerald-300 mb-4">💾 Memory Sharing</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black/40 rounded-xl p-5">
                    <div className="text-center text-emerald-300 text-lg mb-3">Same Address!</div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <div className="text-green-400 text-base">Address of u.c: 0x7ffd1234</div>
                      <div className="text-green-400 text-base mt-2">Address of u.i: 0x7ffd1234</div>
                      <div className="text-yellow-400 text-base mt-3">SAME ADDRESS!</div>
                    </div>
                  </div>
                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-emerald-300 text-lg">union_memory.c</span>
                    </div>
                    <pre className="p-4 text-base font-mono text-blue-200 overflow-x-auto">
                      {`union Shared { char c; int i; };
union Shared u;

u.i = 65;
printf("%c", u.c);  // Prints 'A'

u.c = 'B';
printf("%d", u.i);  // Prints 66`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 10. Complete Program */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">💻 Complete Example</h3>
                <div className="bg-black/50 rounded-xl overflow-hidden">
                  <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                    <span className="text-amber-300 text-lg">structure_union.c</span>
                  </div>
                  <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                    {`#include <stdio.h>

// Structure
typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

// Union
typedef union {
    int intVal;
    float floatVal;
} Variant;

int main() {
    Student s = {101, "John", 85.5};
    printf("Student: %d %s %.1f\\n", s.id, s.name, s.marks);
    
    Variant v;
    v.intVal = 100;
    printf("Union int: %d\\n", v.intVal);
    
    v.floatVal = 99.99;
    printf("Union float: %.2f\\n", v.floatVal);
    
    printf("\\nSize: Structure=%lu, Union=%lu\\n", 
           sizeof(Student), sizeof(Variant));
    return 0;
}

// Output:
// Student: 101 John 85.5
// Union int: 100
// Union float: 99.99
// Size: Structure=58, Union=4`}
                  </pre>
                </div>
              </div>

            </div>
          </Slide>
        </div>
        {/* SLIDE 16 · DYNAMIC MEMORY */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-cyan-800/60 text-cyan-200 backdrop-blur-md">Chapter 16</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Dynamic Memory Allocation</h2>
              </div>

              {/* 1. What is Dynamic Memory Allocation? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-cyan-500">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">💾 What is Dynamic Memory Allocation?</h3>
                <p className="text-2xl text-cyan-100 leading-relaxed">
                  Allocating memory at <strong className="text-cyan-300">runtime</strong> from the <strong className="text-cyan-300">HEAP</strong> segment. Memory persists until explicitly freed.
                </p>
                <div className="mt-4 p-4 bg-cyan-500/20 rounded-lg">
                  <p className="text-cyan-200 text-xl">📌 Stack: Local variables (auto freed)</p>
                  <p className="text-cyan-200 text-xl mt-2">📌 Heap: Dynamic memory (must free manually)</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="text-center text-cyan-300 text-lg mb-3">Memory Layout</div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="bg-blue-600 px-6 py-2 rounded text-lg">STACK (Local vars)</div>
                    <div className="text-white text-xl">↓ grows toward each other ↑</div>
                    <div className="bg-green-600 px-6 py-2 rounded text-lg">HEAP (Dynamic memory)</div>
                  </div>
                </div>
              </div>

              {/* 2. malloc() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">📦 malloc() - Memory Allocation</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">void* malloc(size_t size);</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Allocates <strong>size</strong> bytes (uninitialized) • Returns NULL on failure • Must typecast</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-green-700 rounded p-2 text-center w-12">
                          <div className="text-white text-sm">?</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-gray-400 text-sm mt-2">Uninitialized memory (garbage values)</div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-cyan-300 text-lg">malloc.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));
    
    if(arr == NULL) {
        printf("Allocation failed!\\n");
        return 1;
    }
    
    for(int i = 0; i < n; i++) {
        arr[i] = i * 10;
        printf("%d ", arr[i]);  // 0 10 20 30 40
    }
    
    free(arr);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. calloc() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">🔢 calloc() - Contiguous Allocation</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">void* calloc(size_t num, size_t size);</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Allocates for <strong>num</strong> elements • <strong>Initializes to zero</strong> • Returns NULL on failure</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      {[0, 1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-green-700 rounded p-2 text-center w-12">
                          <div className="text-white text-sm">0</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-gray-400 text-sm mt-2">Zero-initialized memory</div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-cyan-300 text-lg">calloc.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>
#include <stdlib.h>

int main() {
    int n = 5;
    int *arr = (int*)calloc(n, sizeof(int));
    
    if(arr == NULL) {
        printf("Allocation failed!\\n");
        return 1;
    }
    
    for(int i = 0; i < n; i++) {
        printf("%d ", arr[i]);  // 0 0 0 0 0
    }
    
    free(arr);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. realloc() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">🔄 realloc() - Reallocation</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">void* realloc(void* ptr, size_t new_size);</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Resizes memory • Preserves data • May move to new location • Returns NULL on failure</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      {[10, 20, 30].map((v, i) => (
                        <div key={i} className="bg-blue-700 rounded p-2 text-center w-12">
                          <div className="text-white text-sm">{v}</div>
                        </div>
                      ))}
                      <div className="text-white text-2xl">→</div>
                      {[10, 20, 30, 40, 50].map((v, i) => (
                        <div key={i} className="bg-green-700 rounded p-2 text-center w-12">
                          <div className="text-white text-sm">{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-gray-400 text-sm mt-2">Resize from 3 to 5 elements (data preserved)</div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-cyan-300 text-lg">realloc.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(3 * sizeof(int));
    arr[0] = 10; arr[1] = 20; arr[2] = 30;
    
    int *temp = (int*)realloc(arr, 5 * sizeof(int));
    
    if(temp == NULL) {
        free(arr);
        return 1;
    }
    arr = temp;
    
    arr[3] = 40; arr[4] = 50;
    
    for(int i = 0; i < 5; i++)
        printf("%d ", arr[i]);  // 10 20 30 40 50
    
    free(arr);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 5. free() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">🗑️ free() - Deallocation</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">void free(void* ptr);</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Releases memory back to heap • free(NULL) is safe • <strong className="text-red-300">Never use after free!</strong></p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-green-700 rounded p-3 text-center">
                        <div className="text-white">Allocated Memory</div>
                        <div className="text-sm text-green-300">ptr → 0x100</div>
                      </div>
                      <div className="text-white text-2xl">free() →</div>
                      <div className="bg-gray-700 rounded p-3 text-center">
                        <div className="text-white">Freed Memory</div>
                        <div className="text-sm text-gray-400">ptr still points to 0x100!</div>
                      </div>
                    </div>
                    <div className="text-center text-yellow-400 text-sm mt-2">⚠️ Set pointer to NULL after free to avoid dangling!</div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-cyan-300 text-lg">free.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = (int*)malloc(10 * sizeof(int));
    
    if(arr != NULL) {
        arr[0] = 100;
        printf("Value: %d\\n", arr[0]);
        
        free(arr);
        arr = NULL;  // Good practice!
        
        if(arr == NULL)
            printf("Pointer is NULL - safe\\n");
    }
    
    free(NULL);  // Safe - does nothing
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 6. malloc vs calloc Comparison */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">📊 malloc() vs calloc()</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-900/30 rounded-xl p-5">
                    <h4 className="text-2xl font-bold text-blue-300 mb-3">malloc()</h4>
                    <ul className="space-y-2 text-blue-200 text-lg">
                      <li>✓ <code className="bg-black/50 px-2">malloc(n * size)</code></li>
                      <li>✓ Uninitialized (garbage values)</li>
                      <li>✓ Faster (no initialization)</li>
                      <li>✓ Use when you'll initialize manually</li>
                    </ul>
                  </div>
                  <div className="bg-green-900/30 rounded-xl p-5">
                    <h4 className="text-2xl font-bold text-green-300 mb-3">calloc()</h4>
                    <ul className="space-y-2 text-green-200 text-lg">
                      <li>✓ <code className="bg-black/50 px-2">calloc(n, size)</code></li>
                      <li>✓ Zero-initialized</li>
                      <li>✓ Slightly slower</li>
                      <li>✓ Use when you need zeros</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>
        {/* SLIDE 17 · FILE HANDLING */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-slate-800/60 text-slate-200 backdrop-blur-md">Chapter 17</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">File Handling in C</h2>
              </div>

              {/* 1. What is File Handling? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-slate-500">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">📁 What is File Handling?</h3>
                <p className="text-2xl text-slate-100 leading-relaxed">
                  File handling is the process of <strong className="text-slate-300">storing and retrieving data</strong> from files on disk. Data persists beyond program execution.
                </p>
                <div className="mt-4 p-4 bg-slate-500/20 rounded-lg">
                  <p className="text-slate-200 text-xl">📌 Files are <strong>streams of bytes</strong> accessed via <strong>FILE*</strong> pointers</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="text-center text-slate-300 text-lg mb-3">File I/O Flow</div>
                  <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <div className="bg-blue-600 px-4 py-2 rounded text-base sm:text-lg">Program</div>
                    <div className="text-white text-2xl">↔</div>
                    <div className="bg-green-600 px-4 py-2 rounded text-lg">FILE*</div>
                    <div className="text-white text-2xl">↔</div>
                    <div className="bg-purple-600 px-4 py-2 rounded text-lg">Disk File</div>
                  </div>
                </div>
              </div>

              {/* 2. File Pointer (FILE*) */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">📍 File Pointer (FILE*)</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Declaration:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">FILE *fp;</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Handle to access file • Must check if NULL after opening</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex justify-center gap-2">
                      <div className="bg-purple-600 rounded p-3 text-center">
                        <div className="text-white text-base">FILE *fp</div>
                        <div className="text-sm text-purple-300">→ points to file structure</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">file_pointer.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "r");
    
    if(fp == NULL) {
        printf("Failed to open file!\\n");
        return 1;
    }
    
    // File operations...
    
    fclose(fp);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. File Opening Modes */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">🔓 File Opening Modes</h3>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-900/40 p-3 rounded text-center">
                      <code className="text-blue-300 text-lg">"r"</code>
                      <div className="text-gray-400 text-sm">Read only</div>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded text-center">
                      <code className="text-green-300 text-lg">"w"</code>
                      <div className="text-gray-400 text-sm">Write (creates/overwrites)</div>
                    </div>
                    <div className="bg-orange-900/40 p-3 rounded text-center">
                      <code className="text-orange-300 text-lg">"a"</code>
                      <div className="text-gray-400 text-sm">Append</div>
                    </div>
                    <div className="bg-purple-900/40 p-3 rounded text-center">
                      <code className="text-purple-300 text-lg">"r+"</code>
                      <div className="text-gray-400 text-sm">Read/Write</div>
                    </div>
                    <div className="bg-cyan-900/40 p-3 rounded text-center">
                      <code className="text-cyan-300 text-lg">"w+"</code>
                      <div className="text-gray-400 text-sm">Read/Write (overwrites)</div>
                    </div>
                    <div className="bg-pink-900/40 p-3 rounded text-center">
                      <code className="text-pink-300 text-lg">"a+"</code>
                      <div className="text-gray-400 text-sm">Read/Append</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">file_modes.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`FILE *fp;

fp = fopen("file.txt", "r");  // Read only
fp = fopen("file.txt", "w");  // Write (creates new)
fp = fopen("file.txt", "a");  // Append
fp = fopen("file.txt", "rb"); // Binary read
fp = fopen("file.txt", "wb"); // Binary write

// Add 'b' for binary files`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. fopen() & fclose() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">📂 fopen() & fclose()</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>fopen()</strong> - Opens file • Returns FILE* or NULL</p>
                  <p className="text-blue-200 text-xl mb-4"><strong>fclose()</strong> - Closes file • Flushes buffers • Returns 0 on success</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-green-400">fopen()</div>
                        <div className="text-white text-sm">Opens connection</div>
                      </div>
                      <div className="text-white text-2xl">→</div>
                      <div className="text-center">
                        <div className="text-red-400">fclose()</div>
                        <div className="text-white text-sm">Closes connection</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">fopen_fclose.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`FILE *fp = fopen("data.txt", "r");

if(fp == NULL) {
    perror("Error");
    return 1;
}

// File operations...

if(fclose(fp) != 0) {
    perror("Close error");
    return 1;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 5. fprintf() & fscanf() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">📝 fprintf() & fscanf()</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>fprintf()</strong> - Write formatted data to file</p>
                  <p className="text-blue-200 text-xl mb-4"><strong>fscanf()</strong> - Read formatted data from file</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <div className="text-blue-400">fprintf(fp, "%d", num)</div>
                        <div className="text-white text-sm">Writes to file</div>
                      </div>
                      <div className="text-white text-2xl">↔</div>
                      <div className="text-center">
                        <div className="text-green-400">fscanf(fp, "%d", &num)</div>
                        <div className="text-white text-sm">Reads from file</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">fprintf_fscanf.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

int main() {
    FILE *fp;
    int num = 100;
    char name[] = "John";
    
    // Write
    fp = fopen("data.txt", "w");
    fprintf(fp, "Name: %s, Age: %d\\n", name, num);
    fclose(fp);
    
    // Read
    fp = fopen("data.txt", "r");
    fscanf(fp, "Name: %s, Age: %d", name, &num);
    printf("Read: %s %d\\n", name, num);
    fclose(fp);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 6. fgetc() & fputc() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">🔤 fgetc() & fputc()</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>fgetc()</strong> - Reads single character • Returns EOF on end</p>
                  <p className="text-blue-200 text-xl mb-4"><strong>fputc()</strong> - Writes single character • Returns char or EOF</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex justify-center gap-2">
                      {['H', 'e', 'l', 'l', 'o'].map((c, i) => (
                        <div key={i} className="bg-green-700 rounded p-2 text-center w-10">
                          <div className="text-white text-lg">{c}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">fgetc_fputc.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

int main() {
    FILE *fp = fopen("file.txt", "w");
    fputc('A', fp);
    fputc('B', fp);
    fclose(fp);
    
    fp = fopen("file.txt", "r");
    int ch;
    while((ch = fgetc(fp)) != EOF) {
        printf("%c", ch);  // AB
    }
    fclose(fp);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 7. fgets() & fputs() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">📄 fgets() & fputs()</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>fgets()</strong> - Reads string (safe, includes newline)</p>
                  <p className="text-blue-200 text-xl mb-4"><strong>fputs()</strong> - Writes string (no newline added)</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="text-center">
                      <code className="text-green-400 text-base">fgets(buffer, 100, fp);</code>
                      <div className="text-gray-400 text-sm">Reads up to 99 chars + null terminator</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">fgets_fputs.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

int main() {
    FILE *fp = fopen("data.txt", "w");
    fputs("Hello\\n", fp);
    fputs("World\\n", fp);
    fclose(fp);
    
    char buffer[100];
    fp = fopen("data.txt", "r");
    
    while(fgets(buffer, 100, fp) != NULL) {
        printf("%s", buffer);
    }
    // Output: Hello
    //         World
    
    fclose(fp);
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 8. fread() & fwrite() */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-4xl font-bold text-slate-300 mb-4">💾 fread() & fwrite() - Binary I/O</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>fread()</strong> - Reads binary data from file</p>
                  <p className="text-blue-200 text-xl mb-4"><strong>fwrite()</strong> - Writes binary data to file</p>
                  <p className="text-blue-200 text-lg mb-4">✓ Used for structures, arrays, raw data • Returns number of items read/written</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="text-center">
                      <div className="bg-blue-700 inline-block p-3 rounded">
                        <code className="text-white">struct Student  int id; char name[50]; float marks; ;</code>
                      </div>
                      <div className="text-gray-400 text-sm mt-2">Write entire structure to file in one call</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-slate-300 text-lg">fread_fwrite.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

typedef struct {
    int id;
    char name[50];
    float salary;
} Employee;

int main() {
    Employee emp = {101, "John Doe", 50000.50};
    Employee readEmp;
    
    // Write binary
    FILE *fp = fopen("employee.dat", "wb");
    fwrite(&emp, sizeof(Employee), 1, fp);
    fclose(fp);
    
    // Read binary
    fp = fopen("employee.dat", "rb");
    fread(&readEmp, sizeof(Employee), 1, fp);
    fclose(fp);
    
    printf("ID: %d, Name: %s, Salary: %.2f\\n",
           readEmp.id, readEmp.name, readEmp.salary);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>

        {/* SLIDE 18 · PREPROCESSOR */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-purple-800/60 text-purple-200 backdrop-blur-md">Chapter 18</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Preprocessor Directives</h2>
              </div>

              {/* 1. What is Preprocessor? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-purple-500">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">⚙️ What is the Preprocessor?</h3>
                <p className="text-2xl text-purple-100 leading-relaxed">
                  The preprocessor processes source code <strong className="text-purple-300">before compilation</strong>. All directives start with <strong className="text-purple-300">#</strong>.
                </p>
                <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
                  <p className="text-purple-200 text-xl">📌 Runs BEFORE compilation • Performs text manipulation</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <div className="bg-blue-600 px-4 py-2 rounded text-base sm:text-lg">Source Code</div>
                    <div className="text-white text-2xl">→</div>
                    <div className="bg-purple-600 px-4 py-2 rounded text-lg">Preprocessor</div>
                    <div className="text-white text-2xl">→</div>
                    <div className="bg-green-600 px-4 py-2 rounded text-lg">Compiler</div>
                  </div>
                  <div className="text-center text-gray-400 text-sm mt-3">Expands macros, includes files, conditionally compiles</div>
                </div>
              </div>

              {/* 2. #define - Object-like Macros */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🔧 #define - Object-like Macros</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">#define NAME value</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Text substitution • No semicolon • No memory allocation</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-blue-700 rounded p-2"><code className="text-white text-sm sm:text-base">#define PI 3.14159</code></div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-green-700 rounded p-2"><code className="text-white text-sm sm:text-base">area = PI * r * r</code></div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-yellow-700 rounded p-2"><code className="text-white text-sm sm:text-base">area = 3.14159 * r * r</code></div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">object_macros.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

#define PI 3.14159
#define MAX 100
#define BUFFER_SIZE 1024

int main() {
    double radius = 5.0;
    double area = PI * radius * radius;
    
    printf("Area: %.2f\\n", area);
    printf("MAX: %d\\n", MAX);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. #define - Function-like Macros */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🔧 #define - Function-like Macros</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">#define MACRO(x) ((x)*(x))</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Accept parameters • Use parentheses to avoid precedence issues</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-blue-700 rounded p-2"><code className="text-white text-sm sm:text-base">#define SQUARE(x) ((x)*(x))</code></div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-green-700 rounded p-2"><code className="text-white text-sm sm:text-base">SQUARE(5)</code></div>
                      <div className="text-white text-2xl">→</div>
                      <div className="bg-yellow-700 rounded p-2"><code className="text-white text-sm sm:text-base">((5)*(5)) = 25</code></div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">function_macros.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

#define SQUARE(x) ((x)*(x))
#define MAX(a,b) ((a) > (b) ? (a) : (b))
#define MIN(a,b) ((a) < (b) ? (a) : (b))

int main() {
    int a = 5, b = 10;
    
    printf("Square of %d: %d\\n", a, SQUARE(a));
    printf("Max: %d\\n", MAX(a, b));
    printf("Min: %d\\n", MIN(a, b));
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. #include */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">📁 #include - File Inclusion</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">#include &lt;header.h&gt;  or  #include "header.h"</code></p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/40 rounded p-3">
                      <code className="text-blue-300 text-lg">&lt;header.h&gt;</code>
                      <p className="text-gray-400 text-sm mt-1">System headers • Searches system directories</p>
                    </div>
                    <div className="bg-green-900/40 rounded p-3">
                      <code className="text-green-300 text-lg">"header.h"</code>
                      <p className="text-gray-400 text-sm mt-1">User headers • Searches current directory first</p>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">include.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>   // Standard library
#include <stdlib.h>  // Standard library
#include "myheader.h" // User-defined header

// Header Guard Pattern
#ifndef MYHEADER_H
#define MYHEADER_H

// Header content goes here

#endif`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 5. Conditional Compilation - #if, #ifdef, #ifndef */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🔀 Conditional Compilation</h3>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-900/40 p-2 rounded text-center">
                      <code className="text-blue-300 text-lg">#if</code>
                      <div className="text-gray-400 text-xs">Conditional test</div>
                    </div>
                    <div className="bg-green-900/40 p-2 rounded text-center">
                      <code className="text-green-300 text-lg">#ifdef</code>
                      <div className="text-gray-400 text-xs">If macro defined</div>
                    </div>
                    <div className="bg-orange-900/40 p-2 rounded text-center">
                      <code className="text-orange-300 text-lg">#ifndef</code>
                      <div className="text-gray-400 text-xs">If macro not defined</div>
                    </div>
                    <div className="bg-purple-900/40 p-2 rounded text-center">
                      <code className="text-purple-300 text-lg">#else</code>
                      <div className="text-gray-400 text-xs">Alternative branch</div>
                    </div>
                    <div className="bg-cyan-900/40 p-2 rounded text-center">
                      <code className="text-cyan-300 text-lg">#elif</code>
                      <div className="text-gray-400 text-xs">Else if branch</div>
                    </div>
                    <div className="bg-pink-900/40 p-2 rounded text-center">
                      <code className="text-pink-300 text-lg">#endif</code>
                      <div className="text-gray-400 text-xs">End conditional block</div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="text-center text-purple-300 text-sm mb-2">Conditional Compilation Flow</div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="bg-blue-700 px-3 py-1 rounded text-sm">#ifdef DEBUG</div>
                      <div className="text-white">↓ TRUE → Debug code</div>
                      <div className="text-white">↓ FALSE → Skip</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">conditional.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

#define DEBUG 1
#define VERSION 2

int main() {
    #ifdef DEBUG
        printf("Debug mode enabled\\n");
    #endif
    
    #if VERSION == 2
        printf("Version 2.0\\n");
    #elif VERSION == 1
        printf("Version 1.0\\n");
    #else
        printf("Unknown version\\n");
    #endif
    
    #if defined(__linux__)
        printf("Linux platform\\n");
    #elif defined(_WIN32)
        printf("Windows platform\\n");
    #endif
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 6. #pragma Directives */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">📌 #pragma Directives</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4">Compiler-specific directives • Behavior varies by compiler</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-900/40 p-3 rounded">
                      <code className="text-blue-300 text-lg">#pragma once</code>
                      <p className="text-gray-400 text-sm">Include guard (non-standard but widely supported)</p>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded">
                      <code className="text-green-300 text-lg">#pragma pack(1)</code>
                      <p className="text-gray-400 text-sm">Control structure packing</p>
                    </div>
                    <div className="bg-orange-900/40 p-3 rounded">
                      <code className="text-orange-300 text-lg">#pragma warning(disable: 4996)</code>
                      <p className="text-gray-400 text-sm">Disable compiler warnings</p>
                    </div>
                    <div className="bg-purple-900/40 p-3 rounded">
                      <code className="text-purple-300 text-lg">#pragma message("Text")</code>
                      <p className="text-gray-400 text-sm">Display custom message during compilation</p>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">pragma.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#pragma once  // Header guard

// Control structure packing
#pragma pack(push, 1)
struct Packed {
    char c;
    int i;    // No padding
};
#pragma pack(pop)

// Display message
#pragma message("Compiling version 2.0")

// Disable warning (MSVC)
#pragma warning(disable: 4996)

int main() {
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 7. Predefined Macros */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🔖 Predefined Macros</h3>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-900/40 p-2 rounded text-center">
                      <code className="text-blue-300 text-base">__LINE__</code>
                      <div className="text-gray-400 text-xs">Current line number</div>
                    </div>
                    <div className="bg-green-900/40 p-2 rounded text-center">
                      <code className="text-green-300 text-base">__FILE__</code>
                      <div className="text-gray-400 text-xs">Current file name</div>
                    </div>
                    <div className="bg-orange-900/40 p-2 rounded text-center">
                      <code className="text-orange-300 text-base">__DATE__</code>
                      <div className="text-gray-400 text-xs">Compilation date</div>
                    </div>
                    <div className="bg-purple-900/40 p-2 rounded text-center">
                      <code className="text-purple-300 text-base">__TIME__</code>
                      <div className="text-gray-400 text-xs">Compilation time</div>
                    </div>
                    <div className="bg-cyan-900/40 p-2 rounded text-center">
                      <code className="text-cyan-300 text-base">__STDC__</code>
                      <div className="text-gray-400 text-xs">ANSI C compliance</div>
                    </div>
                    <div className="bg-pink-900/40 p-2 rounded text-center">
                      <code className="text-pink-300 text-base">__STDC_VERSION__</code>
                      <div className="text-gray-400 text-xs">C standard version</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">predefined_macros.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

int main() {
    printf("File: %s\\n", __FILE__);
    printf("Line: %d\\n", __LINE__);
    printf("Compiled on: %s at %s\\n", __DATE__, __TIME__);
    
    #ifdef __STDC__
        printf("ANSI C compliant\\n");
    #endif
    
    #if defined(__STDC_VERSION__)
        printf("C Standard: %ld\\n", __STDC_VERSION__);
        // 199901L = C99, 201112L = C11, 201710L = C17
    #endif
    
    // Debug macro with location
    #define DEBUG_MSG(msg) printf("[%s:%d] %s\\n", __FILE__, __LINE__, msg)
    
    DEBUG_MSG("Debug message");
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>

        {/* SLIDE 19 · ENUMS & TYPEDEF */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">

              {/* Header */}
              <div className="text-center mb-12">
                <span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-amber-800/60 text-amber-200 backdrop-blur-md">Chapter 19</span>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Enums & Typedef</h2>
              </div>

              {/* ==================== ENUM ==================== */}

              {/* 1. What is Enum? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-amber-500">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🔢 What is an Enumeration?</h3>
                <p className="text-2xl text-amber-100 leading-relaxed">
                  An <strong className="text-amber-300">enum</strong> is a user-defined type consisting of <strong className="text-amber-300">named integer constants</strong>. Makes code more readable.
                </p>
                <div className="mt-4 p-4 bg-amber-500/20 rounded-lg">
                  <p className="text-amber-200 text-xl">📌 Replaces magic numbers with meaningful names</p>
                  <p className="text-amber-200 text-xl mt-2">📌 Values auto-increment from 0 by default</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <div className="text-center">
                      <div className="text-amber-400 text-sm">Without enum</div>
                      <code className="text-white text-base">int day = 2; // Tuesday?</code>
                    </div>
                    <div className="text-white text-2xl">→</div>
                    <div className="text-center">
                      <div className="text-green-400 text-sm">With enum</div>
                      <code className="text-white text-base">enum Day [ MON, TUE, WED];</code>
                      <code className="text-white text-base block">enum Day today = TUE;</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Enum Declaration */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">📝 Enum Declaration</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">enum Name [ CONST1, CONST2, CONST3 ];</code></p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/40 p-3 rounded">
                      <div className="text-blue-300 text-lg">Default Values</div>
                      <code className="text-white text-base block">enum Day  [MON, TUE, WED ];</code>
                      <div className="text-gray-400 text-sm mt-1">MON=0, TUE=1, WED=2</div>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded">
                      <div className="text-green-300 text-lg">Explicit Values</div>
                      <code className="text-white text-base block">enum Status [ PENDING=1, APPROVED=2, REJECTED=3 ];</code>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">enum_declaration.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

// Basic enum (auto-increment)
enum Day { MON, TUE, WED, THU, FRI, SAT, SUN };
// MON=0, TUE=1, WED=2, THU=3, FRI=4, SAT=5, SUN=6

// Enum with explicit values
enum Status { 
    PENDING = 1, 
    APPROVED = 2, 
    REJECTED = 3 
};

// Non-sequential values (bit flags)
enum Flags {
    READ = 1,
    WRITE = 2,
    EXECUTE = 4,
    DELETE = 8
};

int main() {
    enum Day today = WED;
    enum Status order = APPROVED;
    
    printf("Day: %d\\n", today);      // 2
    printf("Status: %d\\n", order);   // 2
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 3. Enum Usage */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🎯 Enum Usage</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4">✓ Used in switch statements • Improves code readability</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      <div className="bg-blue-700 rounded p-2 text-center">
                        <div className="text-white">switch(day)</div>
                        <div className="text-white">case MON: ...</div>
                        <div className="text-white">case TUE: ...</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">enum_usage.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

enum Day { MON=1, TUE, WED, THU, FRI, SAT, SUN };
enum Error { SUCCESS=0, FILE_ERROR=1, MEMORY_ERROR=2 };

int main() {
    enum Day today = WED;
    
    // Using enum in switch
    switch(today) {
        case MON: printf("Monday\\n"); break;
        case TUE: printf("Tuesday\\n"); break;
        case WED: printf("Wednesday\\n"); break;
        case THU: printf("Thursday\\n"); break;
        case FRI: printf("Friday\\n"); break;
        default: printf("Weekend\\n");
    }
    
    // Error handling
    enum Error err = FILE_ERROR;
    if(err == FILE_ERROR) {
        printf("File not found!\\n");
    }
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 4. Enum with typedef */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-amber-300 mb-4">🔗 Enum with typedef</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">typedef enum [ RED, GREEN, BLUE ]Color;</code></p>

                  {/* Visual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-900/40 p-3 rounded text-center">
                      <div className="text-red-300 text-base">Without typedef</div>
                      <code className="text-white text-sm">enum Color c = RED;</code>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded text-center">
                      <div className="text-green-300 text-base">With typedef</div>
                      <code className="text-white text-sm">Color c = RED;</code>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-amber-300 text-lg">enum_typedef.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

// Enum with typedef - cleaner syntax
typedef enum {
    LOW,
    MEDIUM,
    HIGH
} Priority;

typedef enum {
    PENDING = 1,
    PROCESSING = 2,
    COMPLETED = 3,
    FAILED = 4
} TaskStatus;

int main() {
    Priority p = HIGH;
    TaskStatus status = COMPLETED;
    
    switch(p) {
        case LOW: printf("Low priority\\n"); break;
        case MEDIUM: printf("Medium priority\\n"); break;
        case HIGH: printf("High priority\\n"); break;
    }
    
    printf("Status code: %d\\n", status);  // 3
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* ==================== TYPEDEF ==================== */}

              {/* 5. What is typedef? */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-purple-500">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🔖 What is typedef?</h3>
                <p className="text-2xl text-purple-100 leading-relaxed">
                  <strong className="text-purple-300">typedef</strong> creates <strong className="text-purple-300">aliases</strong> for existing data types. Improves code readability and portability.
                </p>
                <div className="mt-4 p-4 bg-purple-500/20 rounded-lg">
                  <p className="text-purple-200 text-xl">📌 Does NOT create new types • Creates synonyms</p>
                </div>

                {/* Visual */}
                <div className="mt-6 bg-black/40 rounded-xl p-5">
                  <div className="flex flex-wrap justify-center items-center gap-4 overflow-x-auto custom-scrollbar pb-2">
                    <code className="text-white text-sm sm:text-base">unsigned int</code>
                    <div className="text-white text-2xl">→</div>
                    <code className="text-green-400 text-base">typedef unsigned int uint;</code>
                    <div className="text-white text-2xl">→</div>
                    <code className="text-white text-base">uint count = 100;</code>
                  </div>
                </div>
              </div>

              {/* 6. typedef with Basic Types */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">📝 typedef with Basic Types</h3>
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-900/40 p-2 rounded">
                      <code className="text-blue-300 text-base">typedef unsigned int uint;</code>
                      <div className="text-gray-400 text-xs">Unsigned integer alias</div>
                    </div>
                    <div className="bg-green-900/40 p-2 rounded">
                      <code className="text-green-300 text-base">typedef unsigned long ulong;</code>
                      <div className="text-gray-400 text-xs">Unsigned long alias</div>
                    </div>
                    <div className="bg-orange-900/40 p-2 rounded">
                      <code className="text-orange-300 text-base">typedef unsigned char byte;</code>
                      <div className="text-gray-400 text-xs">Byte type alias</div>
                    </div>
                    <div className="bg-purple-900/40 p-2 rounded">
                      <code className="text-purple-300 text-base">typedef const char* String;</code>
                      <div className="text-gray-400 text-xs">String type alias</div>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">typedef_basic.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

typedef unsigned int uint;
typedef unsigned long ulong;
typedef unsigned char byte;
typedef const char* String;

int main() {
    uint count = 100;
    ulong bigNum = 1000000;
    byte data = 0xFF;
    String message = "Hello World";
    
    printf("Count: %u\\n", count);
    printf("Big Number: %lu\\n", bigNum);
    printf("Data: %x\\n", data);
    printf("Message: %s\\n", message);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 7. typedef with Structures */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">🏗️ typedef with Structures</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Benefit:</strong> No need to write 'struct' keyword every time</p>

                  {/* Visual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-red-900/40 p-3 rounded text-center">
                      <div className="text-red-300 text-base">Without typedef</div>
                      <code className="text-white text-sm">struct Student s1;</code>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded text-center">
                      <div className="text-green-300 text-base">With typedef</div>
                      <code className="text-white text-sm">Student s1;</code>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">typedef_structure.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>
#include <string.h>

// Structure with typedef
typedef struct {
    int id;
    char name[50];
    float marks;
} Student;

// Nested structure with typedef
typedef struct {
    int day;
    int month;
    int year;
} Date;

typedef struct {
    char name[50];
    Date birthDate;
    float gpa;
} StudentRecord;

int main() {
    Student s1 = {101, "Alice", 85.5};
    Student s2;
    s2.id = 102;
    strcpy(s2.name, "Bob");
    s2.marks = 90.0;
    
    StudentRecord record = {
        "John Doe",
        {15, 5, 1990},
        3.8
    };
    
    printf("Student: %d %s %.1f\\n", s1.id, s1.name, s1.marks);
    printf("Birth: %d/%d/%d\\n", 
           record.birthDate.day, 
           record.birthDate.month, 
           record.birthDate.year);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 8. typedef with Arrays & Pointers */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8 mb-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">📦 typedef with Arrays & Pointers</h3>
                <div>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/40 p-3 rounded">
                      <div className="text-blue-300 text-lg">Array Aliases</div>
                      <code className="text-white text-sm block">typedef int Array10[10];</code>
                      <code className="text-white text-sm block">typedef float Matrix[3][3];</code>
                      <code className="text-white text-sm block mt-2">Array10 arr;</code>
                      <code className="text-white text-sm block">Matrix mat;</code>
                    </div>
                    <div className="bg-green-900/40 p-3 rounded">
                      <div className="text-green-300 text-lg">Pointer Aliases</div>
                      <code className="text-white text-sm block">typedef int* IntPtr;</code>
                      <code className="text-white text-sm block">typedef char* StringPtr;</code>
                      <code className="text-white text-sm block mt-2">IntPtr p = &x;</code>
                      <code className="text-white text-sm block">StringPtr s = "Hello";</code>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">typedef_array_pointer.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

// Array aliases
typedef int Array10[10];
typedef float Matrix3x3[3][3];

// Pointer aliases
typedef int* IntPtr;
typedef char* StringPtr;

int main() {
    Array10 arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    Matrix3x3 mat = {{1,2,3},{4,5,6},{7,8,9}};
    
    int x = 100;
    IntPtr ptr = &x;
    StringPtr str = "Hello World";
    
    printf("First element: %d\\n", arr[0]);
    printf("Matrix[1][1]: %.0f\\n", mat[1][1]);
    printf("Pointer value: %d\\n", *ptr);
    printf("String: %s\\n", str);
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* 9. typedef with Function Pointers */}
              <div className="bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 p-8">
                <h3 className="text-4xl font-bold text-purple-300 mb-4">⚡ typedef with Function Pointers</h3>
                <div>
                  <p className="text-blue-200 text-xl mb-4"><strong>Syntax:</strong> <code className="bg-black/50 px-3 py-1.5 rounded text-lg">typedef int (*Operation)(int, int);</code></p>
                  <p className="text-blue-200 text-lg mb-4">✓ Makes function pointers readable • Used for callbacks</p>

                  {/* Visual */}
                  <div className="bg-black/40 rounded-xl p-4 mb-4">
                    <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-auto custom-scrollbar pb-2">
                      <code className="text-white text-xs sm:text-sm">int (*func)(int, int);</code>
                      <div className="text-white text-2xl">→</div>
                      <code className="text-green-400 text-xs sm:text-sm">typedef int (*Operation)(int, int);</code>
                      <div className="text-white text-2xl">→</div>
                      <code className="text-white text-xs sm:text-sm">Operation add = &addition;</code>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded-xl overflow-hidden">
                    <div className="bg-purple-800/30 px-4 py-2 border-b border-purple-500/30">
                      <span className="text-purple-300 text-lg">typedef_function_pointer.c</span>
                    </div>
                    <pre className="p-5 text-base font-mono text-blue-200 leading-relaxed overflow-x-auto">
                      {`#include <stdio.h>

// Function pointer alias
typedef int (*Operation)(int, int);
typedef void (*Callback)(int);

int add(int a, int b) { return a + b; }
int subtract(int a, int b) { return a - b; }
int multiply(int a, int b) { return a * b; }

void display(int result) {
    printf("Result: %d\\n", result);
}

int calculate(int x, int y, Operation op, Callback cb) {
    int result = op(x, y);
    cb(result);
    return result;
}

int main() {
    Operation ops[] = {add, subtract, multiply};
    char* names[] = {"Add", "Subtract", "Multiply"};
    
    for(int i = 0; i < 3; i++) {
        printf("%s: ", names[i]);
        calculate(10, 5, ops[i], display);
    }
    
    return 0;
}`}
                    </pre>
                  </div>
                </div>
              </div>

            </div>
          </Slide>
        </div>

        {/* SLIDE 20 · RECURSION */}
        <div className="slide-section">
          <Slide>
            <div className="w-full max-w-6xl mx-auto py-12 px-6">
              <div className="text-center mb-12">
                <AnimCard><span className="inline-block px-5 py-2 rounded-full text-sm font-bold mb-6 bg-emerald-800/60 text-emerald-200 backdrop-blur-md">Chapter 20</span></AnimCard>
                <h2 className="text-5xl md:text-6xl font-extrabold text-white">Recursion in C</h2>
              </div>
              <AnimCard delay={0.1} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-8 mb-8 border-l-8 border-emerald-500">
                <p className="text-2xl text-blue-100">A function <strong className="text-emerald-300">calls itself</strong> to solve a problem by breaking it into smaller sub-problems. Must have a <strong className="text-rose-600">base case</strong> to stop!</p>
              </AnimCard>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: 'Factorial', color: 'text-pink-300', code: `int factorial(int n) {
    if(n <= 1) return 1; // base case
    return n * factorial(n - 1);
}
// factorial(5) = 120` },
                  {
                    title: 'Fibonacci', color: 'text-blue-300', code: `int fibonacci(int n) {
    if(n == 0) return 0; // base case
    if(n == 1) return 1; // base case
    return fibonacci(n-1) + fibonacci(n-2);
}
// fibonacci(6) = 8` },
                  {
                    title: 'Sum of N numbers', color: 'text-green-300', code: `int sum(int n) {
    if(n == 0) return 0; // base case
    return n + sum(n - 1);
}
// sum(10) = 55` },
                  {
                    title: 'Tower of Hanoi', color: 'text-purple-600', code: `void hanoi(int n, char from, char to, char aux) {
    if(n == 1) {
        printf("Disk 1: %c→%c\\n", from, to);
        return;
    }
    hanoi(n-1, from, aux, to);
    printf("Disk %d: %c→%c\\n", n, from, to);
    hanoi(n-1, aux, to, from);
}` },
                ].map(({ title, color, code }, i) => (
                  <AnimCard key={i} delay={i * 0.1} className="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md border border-white/10 p-6">
                    <h3 className={`text-xl font-bold ${color} mb-3`}>{title}</h3>
                    <div className="bg-gray-900 rounded-xl overflow-hidden">
                      <pre className="p-4 text-sm font-mono text-gray-300 overflow-x-auto">{code}</pre>
                    </div>
                  </AnimCard>
                ))}
              </div>
              <SlideItem delay={0.2} className="w-full flex justify-center">
                <Diagram type="recursion" />
              </SlideItem>
            </div>
          </Slide>
        </div>

        {/* SLIDE 21 · STRINGS */}

        {/* SLIDE 22 · FINAL */}
        <div className="slide-section">
          <Slide>
            <SlideItem>
              <motion.div
                animate={{ rotate: [0, 8, -8, 8, 0], scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 4 }}
                style={{ marginBottom: 24, filter: 'drop-shadow(0 0 40px rgba(14,165,233,0.60))' }}
              >
                <svg width="120" height="120" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#0ea5e9" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z" />
                  <path fill="#0369a1" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z" />
                  <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z" />
                </svg>
              </motion.div>
            </SlideItem>
            <SlideItem delay={0.2}>
              <h2 style={{
                fontSize: 'clamp(1.8rem, 8vw, 4rem)', fontWeight: 900, color: '#38bdf8', marginBottom: 24,
                textShadow: '0 0 40px rgba(14,165,233,0.70)', letterSpacing: '-0.02em', textAlign: 'center'
              }}>
                Congratulations! 🎉
              </h2>
            </SlideItem>
            <SlideItem delay={0.3}>
              <p style={{
                fontSize: 'clamp(1.05rem, 4.5vw, 1.4rem)', color: '#bae6fd', fontWeight: 500, maxWidth: '100%', width: 'auto',
                marginBottom: 32, lineHeight: 1.7, textAlign: 'center', padding: '0 16px'
              }}>
                You've mastered <strong style={{ color: '#38bdf8', fontWeight: 800 }}>22 C programming topics</strong> — from Hello World to Recursion! You now speak the language of operating systems! 🚀
              </p>
            </SlideItem>
            <SlideItem delay={0.4}>
              <div style={{ 
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, 
                marginBottom: 40, maxWidth: '100%', width: 'auto', padding: '0 16px' 
              }}>
                {['Variables ✓', 'Pointers ✓', 'Arrays ✓', 'Strings ✓', 'Functions ✓', 'Structs ✓', 'Memory ✓', 'Files ✓', 'Recursion ✓'].map(b => (
                  <motion.span key={b} whileHover={{ scale: 1.10, y: -3 }} whileTap={{ scale: 0.92 }}
                    style={{
                      padding: '6px 16px', borderRadius: 999,
                      background: 'rgba(14,165,233,0.15)',
                      border: '1px solid rgba(14,165,233,0.35)',
                      color: '#38bdf8', fontWeight: 700, fontSize: 13,
                      cursor: 'pointer', backdropFilter: 'blur(8px)',
                    }}>
                    {b}
                  </motion.span>
                ))}
              </div>
            </SlideItem>
            <SlideItem delay={0.5}>
              <p style={{ color: '#7dd3fc', fontSize: '1.05rem', marginBottom: 24 }}>
                🤖 Use the AI Tutor (right panel) to test your knowledge!
              </p>
            </SlideItem>
            <SlideItem delay={0.6}>
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 50px rgba(14,165,233,0.50)' }}
                whileTap={{ scale: 0.94 }}
                onClick={() => containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                  background: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
                  color: '#fff', fontSize: '1.4rem', fontWeight: 900,
                  padding: '18px 56px', borderRadius: 999,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(14,165,233,0.40)',
                  letterSpacing: '0.02em',
                }}
              >
                ↱ Start Again
              </motion.button>
            </SlideItem>
          </Slide>
        </div>
      </div>
    </div>
  );
}
