import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, X } from 'lucide-react';

/* ── colour tokens – same as page ── */
const T = {
  panel:  '#080e22',
  border: 'rgba(101,154,211,0.22)',
  accent1:'#0b67c9',
  accent2:'#659AD3',
  accent3:'#42a5f5',
  purple: '#6366f1',
  text:   '#c9dff7',
  muted:  '#4a6fa8',
};

const SLIDE_TITLES = [
  'Welcome — C Masterclass','Ch 1 — Introduction','Ch 2 — History of C',
  'Ch 3 — Features of C','Ch 4 — Program Structure','Ch 5 — Hello World',
  'Ch 6 — Variables','Ch 7 — Data Types','Ch 8 — Operators',
  'Ch 9 — Conditionals','Ch 10 — Loops','Ch 11 — Arrays',
  'Ch 12 — C Libraries','Ch 13 — Functions','Ch 14 — Pointers',
  'Ch 15 — Structures','Ch 16 — Dynamic Memory','Ch 17 — File Handling',
  'Ch 18 — Preprocessor','Ch 19 — Enums & Typedef','Ch 20 — Recursion',
  'Ch 21 — Strings','Ch 22 — Complete!',
];
const TOTAL = 23;

const fmt = (s) => {
  if (!isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
};

export default function VoiceOverPlayer({ currentSlide, isOpen, onToggle }) {
  const audioRef  = useRef(null);
  const autoRef   = useRef(false);
  const [playing, setPlaying]  = useState(false);
  const [duration, setDuration]= useState(0);
  const [current,  setCurrent] = useState(0);
  const [volume,   setVolume]  = useState(1.0);
  const [hasAudio, setHasAudio]= useState(false);
  const [loaded,   setLoaded]  = useState(false);

  const src = currentSlide < TOTAL ? `/audio/slide${currentSlide}.ogg` : null;

  useEffect(() => {
    setPlaying(false); setCurrent(0); setDuration(0); setLoaded(false);
    autoRef.current = true;
    if (!src) { setHasAudio(false); return; }
    setHasAudio(true);
    const a = audioRef.current;
    if (!a) return;
    a.pause(); a.src = src; a.volume = volume; a.load();
  }, [currentSlide]); // eslint-disable-line

  useEffect(() => { if (audioRef.current) audioRef.current.volume = volume; }, [volume]);

  const onMeta = () => {
    const a = audioRef.current; if (!a) return;
    setDuration(a.duration || 0); setLoaded(true);
    if (autoRef.current) {
      autoRef.current = false;
      a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  };

  const togglePlay = useCallback(() => {
    const a = audioRef.current; if (!a || !hasAudio) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  }, [playing, hasAudio]);

  const seek = (e) => {
    const a = audioRef.current; if (!a || !duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * duration;
    setCurrent(a.currentTime);
  };

  const restart = () => {
    const a = audioRef.current; if (!a) return;
    a.currentTime = 0; setCurrent(0);
    a.play().catch(() => {}); setPlaying(true);
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;
  const title = SLIDE_TITLES[currentSlide] || `Slide ${currentSlide + 1}`;

  return (
    <>
      <audio ref={audioRef}
        onLoadedMetadata={onMeta}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime || 0)}
        onEnded={() => {
          setPlaying(false);
          setCurrent(0);
          const slides = document.querySelectorAll('.slide-section');
          if (currentSlide + 1 < slides.length) {
            slides[currentSlide + 1].scrollIntoView({ behavior: 'smooth' });
          }
        }}
        preload="auto"
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit  ={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            style={{
              position: 'fixed', bottom: 88, right: 20, zIndex: 400,
              width: 280,
              background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(16px)',
              borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 72px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
              padding: '16px', display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* Animated waveform */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 18 }}>
                  {[1,2,3,4,5].map((_, i) => (
                    <motion.span key={i}
                      style={{ display:'inline-block', width:3, borderRadius:2,
                        background: playing ? T.accent3 : 'rgba(101,154,211,0.3)' }}
                      animate={playing ? { height:[3, 14+i*2, 3] } : { height: 3 }}
                      transition={playing ? { repeat:Infinity, duration:0.42+i*0.07, delay:i*0.07 } : {}}
                    />
                  ))}
                </div>
                <span style={{ color: T.accent3, fontWeight: 700, fontSize: 13 }}>Voice Over</span>
              </div>
              <button onClick={onToggle}
                style={{ background:'none', border:'none', cursor:'pointer', color: T.muted, padding:2 }}>
                <X size={15} />
              </button>
            </div>

            {/* Slide title */}
            <div style={{
              color: T.text, fontSize: 11, textAlign: 'center', padding: '5px 10px',
              background: 'rgba(101,154,211,0.07)', borderRadius: 8,
              border: `1px solid ${T.border}`,
            }}>
              🎙️ {title}
            </div>

            {/* Progress bar */}
            <div onClick={hasAudio ? seek : undefined}
              style={{ height:4, borderRadius:2, background:'rgba(101,154,211,0.12)',
                cursor: hasAudio ? 'pointer' : 'default', position:'relative', overflow:'hidden' }}>
              <motion.div style={{
                position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`,
                background:`linear-gradient(90deg,${T.accent1},${T.purple})`, borderRadius:2,
              }} transition={{ duration:0.1 }} />
            </div>

            {/* Time */}
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:10, color: T.muted }}>
              <span>{fmt(current)}</span><span>{fmt(duration)}</span>
            </div>

            {/* Controls */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
              <button onClick={restart} disabled={!hasAudio} style={{
                background:'rgba(101,154,211,0.10)', border:`1px solid ${T.border}`,
                borderRadius:10, width:36, height:36, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color: T.accent2, opacity: hasAudio ? 1 : 0.35,
              }}><RotateCcw size={14} /></button>

              <button onClick={togglePlay} disabled={!hasAudio || !loaded} style={{
                background: hasAudio && loaded
                  ? `linear-gradient(135deg,${T.accent1},${T.purple})`
                  : 'rgba(101,154,211,0.10)',
                border:'none', borderRadius:14, width:50, height:50, cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'#fff', opacity: hasAudio && loaded ? 1 : 0.35,
                boxShadow: hasAudio && loaded ? `0 4px 18px rgba(11,103,201,0.45)` : 'none',
              }}>
                {playing ? <Pause size={22} /> : <Play size={22} style={{ marginLeft:2 }} />}
              </button>

              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <Volume2 size={12} color={T.muted} />
                <input type="range" min={0} max={1} step={0.02} value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  style={{ width:50, height:3, accentColor: T.accent3, cursor:'pointer' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
