import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Youtube, MessageCircle, X, ExternalLink, Lock, Crown, Play } from 'lucide-react';
import VoiceOverPlayer from './VoiceOverPlayer';
import Chatbot from './Chatbot';

/* ── 2-colour theme: navy #001233 + cyan #0ea5e9 ── */
const T = {
  panel:   '#000e24',
  border:  'rgba(14,165,233,0.18)',
  accent1: '#0ea5e9',
  accent2: '#38bdf8',
  accent3: '#7dd3fc',
  navy:    '#001233',
  text:    '#bae6fd',
  muted:   '#3d6a8a',
};

/* ──────────────────────────────────────────────────────────
   CodingBoss C Programming Videos
   Channel: https://www.youtube.com/@codingboss-s7l
   4 tutorials free · rest premium (locked)
────────────────────────────────────────────────────────── */
const CHANNEL_URL = 'https://www.youtube.com/@codingboss-s7l/videos';

const C_VIDEOS = [
  {
    title: 'C Masterclass — Introduction',
    url: 'https://youtu.be/Wy0WCzVsTXA',
    dur: 'Watch Now',
    level: 'Beginner',
    desc: 'What is C? History, features and why you should learn it',
    thumb: '1️⃣',
    free: true,
  },
  {
    title: 'C Programming — Installation',
    url: 'https://youtu.be/lRzg5XZwzR4',
    dur: 'Watch Now',
    level: 'Beginner',
    desc: 'Setting up GCC compiler and IDE for C development',
    thumb: '2️⃣',
    free: true,
  },
  {
    title: 'Structure, Variables & Data Types',
    url: 'https://youtu.be/cTyAQyfJ7ds',
    dur: 'Watch Now',
    level: 'Beginner',
    desc: 'Program structure, variables, int/float/char and data types',
    thumb: '3️⃣',
    free: true,
  },
  {
    title: 'C Masterclass — Tutorial 4',
    url: 'https://youtu.be/wRr288fC21I',
    dur: 'Watch Now',
    level: 'Intermediate',
    desc: 'Operators, expressions, input & output in C',
    thumb: '4️⃣',
    free: true,
  },

  {
    title: 'Pointers & Dynamic Memory — Premium',
    url: CHANNEL_URL,
    dur: 'Premium',
    level: 'Intermediate',
    desc: 'Deep dive into malloc, calloc, realloc & free',
    thumb: '🔒',
    free: false,
  },
  {
    title: 'Structures & File I/O — Premium',
    url: CHANNEL_URL,
    dur: 'Premium',
    level: 'Advanced',
    desc: 'Structs, unions, file handling and binary I/O',
    thumb: '🔒',
    free: false,
  },
  {
    title: 'Data Structures in C — Premium',
    url: CHANNEL_URL,
    dur: 'Premium',
    level: 'Advanced',
    desc: 'Linked lists, stacks, queues and sorting in C',
    thumb: '🔒',
    free: false,
  },
  {
    title: 'Advanced C Projects — Premium',
    url: CHANNEL_URL,
    dur: 'Premium',
    level: 'Advanced',
    desc: 'Real-world C projects: mini compiler, shell & more',
    thumb: '🔒',
    free: false,
  },
];

const LEVEL_COLOR = {
  Beginner:     { bg: 'rgba(14,165,233,0.15)',  text: '#38bdf8' },
  Intermediate: { bg: 'rgba(251,191,36,0.15)',  text: '#fbbf24' },
  Advanced:     { bg: 'rgba(99,102,241,0.18)',   text: '#a5b4fc' },
};

/* ── VideoPanel Component ── */
function VideoPanel({ onClose }) {
  const [hovered, setHovered] = useState(null);
  const freeCount  = C_VIDEOS.filter(v => v.free).length;
  const lockCount  = C_VIDEOS.filter(v => !v.free).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 18 }}
      animate={{ opacity: 1, scale: 1,    y: 0  }}
      exit  ={{ opacity: 0, scale: 0.92, y: 18  }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      style={{
        position: 'fixed', bottom: 88, right: 20, zIndex: 400,
        width: 340,
        background: 'linear-gradient(160deg, #000e24 0%, #001a3a 100%)',
        backdropFilter: 'blur(18px)',
        borderRadius: 22,
        border: '1px solid rgba(14,165,233,0.20)',
        boxShadow: '0 28px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(14,165,233,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* ── Channel Header ── */}
      <div style={{
        padding: '14px 16px 12px',
        background: 'linear-gradient(135deg, rgba(14,165,233,0.18), rgba(0,18,51,0.30))',
        borderBottom: '1px solid rgba(14,165,233,0.15)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Channel Avatar */}
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #0ea5e9, #0369a1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(14,165,233,0.35)',
              border: '2px solid rgba(14,165,233,0.30)',
              fontWeight: 900, fontSize: 15, color: '#fff',
            }}>
              CB
            </div>
            <div>
              <div style={{ color: '#e0f2fe', fontWeight: 800, fontSize: 13 }}>CodingBoss</div>
              <a
                href="https://www.youtube.com/@codingboss-s7l"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: T.muted, fontSize: 10, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <Youtube size={9} color={T.muted} />
                @codingboss-s7l
              </a>
            </div>
          </div>
          <motion.button 
            onClick={onClose}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#fff' }}
            whileTap={{ scale: 0.9 }}
            style={{ 
              background: 'rgba(14,165,233,0.15)', 
              border: '1px solid rgba(14,165,233,0.3)', 
              cursor: 'pointer', 
              color: '#fff', 
              width: 32, height: 32, 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            }}>
            <X size={18} />
          </motion.button>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', gap: 10, marginTop: 10,
          padding: '7px 10px',
          background: 'rgba(14,165,233,0.08)',
          borderRadius: 10,
          border: '1px solid rgba(14,165,233,0.12)',
        }}>
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: 14 }}>{freeCount}</div>
            <div style={{ color: T.muted, fontSize: 9, fontWeight: 600 }}>FREE</div>
          </div>
          <div style={{ width: 1, background: 'rgba(14,165,233,0.15)' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: 14 }}>{lockCount}</div>
            <div style={{ color: T.muted, fontSize: 9, fontWeight: 600 }}>PREMIUM 🔒</div>
          </div>
          <div style={{ width: 1, background: 'rgba(14,165,233,0.15)' }} />
          <div style={{ textAlign: 'center', flex: 1 }}>
            <div style={{ color: '#a5b4fc', fontWeight: 800, fontSize: 14 }}>C</div>
            <div style={{ color: T.muted, fontSize: 9, fontWeight: 600 }}>LANGUAGE</div>
          </div>
        </div>
      </div>

      {/* ── Video List ── */}
      <div style={{ maxHeight: 390, overflowY: 'auto', padding: '8px 10px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>

        {/* Section labels */}
        <div style={{ fontSize: 9, fontWeight: 800, color: '#38bdf8', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '4px 2px 2px' }}>
          📺 Free Tutorials
        </div>

        {C_VIDEOS.filter(v => v.free).map((v, i) => {
          const lc = LEVEL_COLOR[v.level];
          return (
            <motion.a
              key={i}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              onHoverStart={() => setHovered('free-' + i)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ x: 3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 11px',
                background: hovered === 'free-' + i
                  ? 'rgba(14,165,233,0.14)'
                  : 'rgba(14,165,233,0.05)',
                borderRadius: 11,
                border: `1px solid ${hovered === 'free-' + i ? 'rgba(14,165,233,0.30)' : 'rgba(14,165,233,0.12)'}`,
                textDecoration: 'none',
                transition: 'all 2s ease',
              }}
            >
              {/* Thumbnail */}
              <div style={{
                width: 38, height: 38, borderRadius: 9, flexShrink: 0,
                background: 'rgba(14,165,233,0.12)',
                border: '1px solid rgba(14,165,233,0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>
                {v.thumb}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: T.text, fontSize: 11, fontWeight: 700,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 9, color: T.muted, marginTop: 1 }}>{v.desc}</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 4, alignItems: 'center' }}>
                  <span style={{ fontSize: 8, padding: '1px 6px', borderRadius: 5, fontWeight: 700, background: lc.bg, color: lc.text }}>{v.level}</span>
                  <span style={{ fontSize: 8, padding: '1px 6px', borderRadius: 5, fontWeight: 800,
                    background: 'rgba(34,197,94,0.15)', color: '#4ade80', letterSpacing: '0.04em' }}>FREE</span>
                  <span style={{ fontSize: 8, color: T.muted }}>{v.dur}</span>
                </div>
              </div>
              <Play size={11} color={T.muted} style={{ flexShrink: 0 }} />
            </motion.a>
          );
        })}

        {/* Premium label */}
        <div style={{ fontSize: 9, fontWeight: 800, color: '#fbbf24', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 2px 2px', display: 'flex', alignItems: 'center', gap: 5 }}>
          <Crown size={10} color="#fbbf24" /> Premium Content
        </div>

        {C_VIDEOS.filter(v => !v.free).map((v, i) => {
          const lc = LEVEL_COLOR[v.level];
          return (
            <div
              key={'lock-' + i}
              onMouseEnter={() => setHovered('lock-' + i)}
              onMouseLeave={() => setHovered(null)}
              className="premium-card-locked"
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px',
                background: 'linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(0,0,0,0.4) 100%)',
                borderRadius: 14,
                border: '1px solid rgba(251,191,36,0.15)',
                cursor: 'not-allowed',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Shimmer effect for premium cards */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(251,191,36,0.03), transparent)',
                  pointerEvents: 'none',
                }}
              />

              {/* Thumbnail with larger glass lock overlay */}
              <div style={{
                width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(251,191,36,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: 18, filter: 'blur(1.5px)', opacity: 0.35 }}>{v.thumb}</div>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(2px)',
                }}>
                  <Lock size={18} color="#fbbf24" style={{ filter: 'drop-shadow(0 0 8px rgba(251,191,36,0.6))' }} />
                </div>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: 'rgba(186,230,253,0.6)', fontSize: 12, fontWeight: 700,
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(186,230,253,0.35)', marginTop: 2 }}>{v.desc}</div>
                <div style={{ display: 'flex', gap: 6, marginTop: 5, alignItems: 'center' }}>
                  <span style={{ fontSize: 9, padding: '1px 7px', borderRadius: 5, fontWeight: 700, background: lc.bg, color: lc.text, opacity: 0.5 }}>{v.level}</span>
                  <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 5, fontWeight: 800,
                    background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(180,83,9,0.2))', 
                    color: '#fbbf24', letterSpacing: '0.04em', border: '1px solid rgba(251,191,36,0.2)' }}>
                    PREMIUM
                  </span>
                </div>
              </div>
              <Crown size={14} color="#fbbf24" style={{ flexShrink: 0, opacity: 0.7 }} />
            </div>
          );
        })}

        {/* ── New Prominent Close Button ── */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.02, background: 'rgba(14,165,233,0.2)' }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: 8,
            padding: '12px',
            borderRadius: 12,
            background: 'rgba(14,165,233,0.08)',
            border: '1px dashed rgba(14,165,233,0.3)',
            color: '#38bdf8',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.1em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
          }}
        >
          <X size={12} /> CLOSE VIDEO PANEL
        </motion.button>
      </div>

      {/* ── Footer ── */}
      <div style={{
        padding: '9px 14px',
        borderTop: '1px solid rgba(14,165,233,0.10)',
        background: 'rgba(14,165,233,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Crown size={11} color="#fbbf24" />
          <span style={{ fontSize: 9, color: T.muted, fontWeight: 600 }}>Unlock all with CodingBoss Premium</span>
        </div>
        <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer"
          style={{ fontSize: 9, color: '#38bdf8', fontWeight: 700, textDecoration: 'none',
            padding: '3px 8px', borderRadius: 5, background: 'rgba(14,165,233,0.12)',
            border: '1px solid rgba(14,165,233,0.20)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <Youtube size={9} color="#38bdf8" /> Visit
        </a>
      </div>
    </motion.div>
  );
}

/* ── Sidebar Button Definitions ── */
const BUTTONS = [
  {
    key: 'voice', label: 'Voice',
    icon: <Mic size={20} />,
    activeGrad: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
    idleColor: '#7dd3fc',
    border: '1px solid rgba(14,165,233,0.30)',
    glow: 'rgba(14,165,233,0.40)',
  },
  {
    key: 'video', label: 'Videos',
    icon: <Youtube size={20} />,
    activeGrad: 'linear-gradient(135deg,#0ea5e9,#075985)',
    idleColor: '#38bdf8',
    border: '1px solid rgba(14,165,233,0.28)',
    glow: 'rgba(14,165,233,0.38)',
  },
  {
    key: 'chat', label: 'AI Tutor',
    icon: <MessageCircle size={20} />,
    activeGrad: 'linear-gradient(135deg,#001a3a,#0a2a55)',
    idleColor: '#7dd3fc',
    border: '1px solid rgba(14,165,233,0.28)',
    glow: 'rgba(14,165,233,0.35)',
  },
];

export default function RightPanel({ currentSlide, videoPanelOpen, onVideoClose }) {
  const [active, setActive] = useState(null);

  React.useEffect(() => {
    if (videoPanelOpen) setActive('video');
  }, [videoPanelOpen]);

  const toggle = (k) => {
    setActive(p => {
      const next = p === k ? null : k;
      if (k === 'video' && next === null && onVideoClose) onVideoClose();
      return next;
    });
  };

  return (
    <>
      {/* Sidebar */}
      <div style={{
        position: 'fixed', right: 16, top: '50%', transform: 'translateY(-50%)',
        zIndex: 300, display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {BUTTONS.map(btn => {
          const on = active === btn.key;
          return (
            <motion.button key={btn.key} onClick={() => toggle(btn.key)}
              whileHover={{ scale: 1.10, x: -4 }}
              whileTap={{ scale: 0.93 }}
              title={btn.label}
              style={{
                width: 52, height: 52, borderRadius: 14,
                border: btn.border, cursor: 'pointer',
                background: on ? btn.activeGrad : 'rgba(0,18,51,0.70)',
                color: on ? '#fff' : btn.idleColor,
                boxShadow: on
                  ? `0 6px 22px ${btn.glow}, 0 0 0 1.5px ${btn.idleColor}33`
                  : '0 4px 14px rgba(0,0,0,0.55)',
                backdropFilter: 'blur(14px)',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
                transition: 'background 0.25s, color 0.25s, box-shadow 0.25s',
                position: 'relative',
              }}
            >
              {btn.icon}
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.03em', opacity: 0.85 }}>
                {btn.label}
              </span>
              {on && (
                <motion.span layoutId="rp-dot"
                  style={{ position: 'absolute', top: 5, right: 5, width: 7, height: 7,
                    borderRadius: '50%', background: '#38bdf8' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Panels */}
      <AnimatePresence>
        {active === 'voice' && (
          <VoiceOverPlayer key="vox" currentSlide={currentSlide} isOpen onToggle={() => setActive(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active === 'video' && (
          <VideoPanel key="vid" onClose={() => { setActive(null); if (onVideoClose) onVideoClose(); }} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active === 'chat' && (
          <Chatbot key="chat" isOpen onToggle={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
