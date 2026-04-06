import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Pause, Play, StopCircle, Send, User, Youtube, ChevronRight, ExternalLink, Mic, Sparkles } from 'lucide-react';
import { SLIDE_TEXTS } from '../data/slideContent';

/* ─── C Logo ─────────────────────────────────────────────── */
const CLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <path fill="#659AD3" d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"/>
    <path fill="#03599C" d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"/>
    <path fill="#fff" d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"/>
  </svg>
);

/* ─── Message formatter ──────────────────────────────────── */
const formatMessage = (text) => {
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
  text = text.replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre class="bg-slate-900 text-green-400 p-3 rounded-xl text-xs mt-2 mb-1 overflow-x-auto whitespace-pre font-mono leading-relaxed border border-slate-700">$1</pre>');
  text = text.replace(/`([^`]+)`/g, '<code class="bg-slate-800 text-cyan-300 px-1.5 py-0.5 rounded font-mono text-xs">$1</code>');
  text = text.replace(/\n/g, '<br/>');
  return text;
};

/* ─── YouTube resources ──────────────────────────────────── */
const YT = [
  { topic: 'C Full Course', channel: 'Bro Code', url: 'https://www.youtube.com/watch?v=87SH2Cn0s9A', emoji: '🎯', level: 'Beginner', color: 'bg-red-50 border-red-200 text-red-900' },
  { topic: 'Pointers in C', channel: 'mycodeschool', url: 'https://www.youtube.com/watch?v=h-HBipu_1P0', emoji: '👆', level: 'Intermediate', color: 'bg-blue-50 border-blue-200 text-blue-900' },
  { topic: 'Dynamic Memory', channel: 'Jacob Sorber', url: 'https://www.youtube.com/watch?v=_8-ht2AKyH4', emoji: '🧠', level: 'Intermediate', color: 'bg-emerald-50 border-emerald-200 text-emerald-900' },
  { topic: 'Data Structures in C', channel: "Jenny's Lectures", url: 'https://www.youtube.com/watch?v=AT14lCXuMKI', emoji: '📊', level: 'Advanced', color: 'bg-purple-50 border-purple-200 text-purple-900' },
  { topic: 'C Programming 10hr', channel: 'freeCodeCamp', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', emoji: '🚀', level: 'All Levels', color: 'bg-indigo-50 border-indigo-200 text-indigo-900' },
];

/* ─── Chat quick suggestions ─────────────────────────────── */
const SUGGESTIONS = ['What is a pointer?','Explain malloc and free','What is a struct?','How does recursion work?','Difference: array vs pointer','malloc vs calloc','Explain typedef','What is a preprocessor?'];

/* ─── Local AI Knowledge Base ────────────────────────────── */
const C_KNOWLEDGE = {
  greetings: { keys: ['hello','hi','hey','good morning','good evening','namaste','vanakkam'], answer: `Hello! 👋 I'm your **C Programming AI Tutor**!\n\nAsk me **anything** about C — pointers, memory management, structs, recursion, file I/O, or any concept from the course! 🚀` },
  whatIsC: { keys: ['what is c','about c','c language','c programming language','who created c','dennis ritchie','history of c','origin of c'], answer: `**C** is a general-purpose, procedural programming language created by **Dennis Ritchie** at Bell Labs in **1972**.\n\n🏛️ **Why C matters:**\n- Unix OS was rewritten in C (1973)\n- Linux kernel, Windows core, Python, Java are all built on C\n- Standardized as **ANSI C (C89)**, then C99, C11, C17\n\n**Key philosophy:** C trusts the programmer completely — no garbage collection, no bounds checking. Total power, total responsibility! ⚡` },
  compile: { keys: ['gcc','compile','compiler','how to run','build c','run c program','compile c'], answer: `**Compiling and Running C with GCC:**\n\n\`\`\`c\n#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}\n\`\`\`\n\n\`\`\`\ngcc hello.c -o hello\n./hello\n\`\`\`\n\n**Useful GCC flags:**\n- \`-Wall\` — show all warnings\n- \`-g\` — add debug info\n- \`-O2\` — optimize code` },
  pointers: { keys: ['pointer','pointers','address','dereference','null pointer','void pointer','dangling pointer'], answer: `**Pointers in C** — variables that store memory addresses! ⚡\n\n\`\`\`c\nint age = 21;\nint *ptr = &age;  // & = address-of\n\nprintf("%p\\n", ptr);   // prints address\nprintf("%d\\n", *ptr);  // * dereferences → 21\n\n*ptr = 25;             // modifies original!\n\`\`\`\n\n🔑 **Key operators:**\n- \`&var\` → get address of var\n- \`*ptr\` → get/set value at address\n\n⚠️ Always initialize: \`int *ptr = NULL;\`\nNever dereference NULL — it crashes your program!` },
  malloc: { keys: ['malloc','calloc','realloc','free','memory','dynamic','heap','allocation'], answer: `**Dynamic Memory Allocation in C:**\n\n\`\`\`c\n#include <stdlib.h>\n\n// malloc — uninitialized memory\nint *arr = (int*)malloc(5 * sizeof(int));\nif (arr == NULL) { /* handle failure */ }\n\n// calloc — zero-initialized\nint *arr2 = (int*)calloc(5, sizeof(int));\n\n// realloc — resize\narr = (int*)realloc(arr, 10 * sizeof(int));\n\n// ALWAYS free!\nfree(arr);\narr = NULL;  // prevent dangling pointer\n\`\`\`\n\n⚠️ **Golden rules:** Always free what you malloc. Set to NULL after free. Never access after free!` },
  structs: { keys: ['struct','structure','union','typedef struct','arrow operator','dot operator'], answer: `**Structures in C:**\n\n\`\`\`c\ntypedef struct {\n    int id;\n    char name[50];\n    float marks;\n} Student;\n\nStudent s1 = {101, "Alice", 95.5};\nprintf("%s: %.1f\\n", s1.name, s1.marks);\n\n// Pointer to struct — use arrow operator\nStudent *ptr = &s1;\nprintf("%s\\n", ptr->name);  // arrow operator\n\`\`\`\n\n📌 Use **dot** (.) for direct access, **arrow** (->) for pointer access.` },
  recursion: { keys: ['recursion','recursive','factorial','fibonacci','base case','stack overflow'], answer: `**Recursion in C:**\n\n\`\`\`c\nint factorial(int n) {\n    if (n <= 1) return 1;  // Base case — CRITICAL!\n    return n * factorial(n - 1);  // Recursive case\n}\n\nint fibonacci(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\`\`\`\n\n🔑 **Always have a base case** or you'll get a stack overflow!\n\n📌 Recursion = function calls itself with smaller input until base case.` },
  arrays: { keys: ['array','arrays','2d array','index','subscript'], answer: `**Arrays in C:**\n\n\`\`\`c\nint scores[5] = {85, 92, 78, 96, 88};\nscores[0];  // 85 — first element (index 0!)\nscores[4];  // 88 — last element\n\n// Get length\nint len = sizeof(scores) / sizeof(scores[0]); // 5\n\n// 2D array\nint grid[2][3] = {{1,2,3},{4,5,6}};\ngrid[1][2]; // 6 — row 1, column 2\n\`\`\`\n\n⚠️ **C does NOT check bounds!** Accessing out of range = undefined behavior.` },
  loops: { keys: ['loop','for loop','while loop','do while','break','continue'], answer: `**Loops in C:**\n\n\`\`\`c\n// for — known iterations\nfor (int i = 1; i <= 5; i++) printf("%d ", i);\n\n// while — condition-driven\nint n = 1;\nwhile (n <= 5) { printf("%d ", n); n++; }\n\n// do-while — runs at least ONCE\ndo {\n    printf("%d ", n); n++;\n} while (n <= 5);\n\n// Control\nbreak;    // exit loop\ncontinue; // skip to next iteration\n\`\`\`` },
  functions: { keys: ['function','prototype','return type','parameter','argument','pass by value','call by reference'], answer: `**Functions in C:**\n\n\`\`\`c\n// Prototype — declare before main\nint add(int a, int b);\n\nint main() {\n    printf("%d\\n", add(10, 5));  // 15\n    return 0;\n}\n\n// Definition\nint add(int a, int b) {\n    return a + b;\n}\n\`\`\`\n\n📦 **Pass by Value** — copy is made; changes don't affect original.\n\n\`\`\`c\nvoid increment(int *n) { (*n)++; }  // pass by pointer\nint x = 5;\nincrement(&x);  // x is now 6!\n\`\`\`` },
  files: { keys: ['file','fopen','fclose','fprintf','fscanf','fgets','fputs','fread','fwrite'], answer: `**File Handling in C:**\n\n\`\`\`c\n#include <stdio.h>\n\n// Write to file\nFILE *fp = fopen("data.txt", "w");\nif (fp == NULL) { perror("Error"); return 1; }\nfprintf(fp, "Hello, File!\\n");\nfclose(fp);\n\n// Read from file\nfp = fopen("data.txt", "r");\nchar buf[100];\nwhile (fgets(buf, sizeof(buf), fp) != NULL)\n    printf("%s", buf);\nfclose(fp);\n\`\`\`\n\n📌 **Modes:** \`r\` read, \`w\` write, \`a\` append, \`rb/wb\` binary\n⚠️ Always check NULL and always fclose!` },
  preprocessor: { keys: ['preprocessor','define','macro','ifdef','ifndef','pragma','include guard'], answer: `**Preprocessor Directives in C:**\n\n\`\`\`c\n#include <stdio.h>       // include library\n#define PI 3.14159        // constant macro\n#define SQUARE(x) ((x)*(x)) // function macro\n\n// Conditional compilation\n#ifdef DEBUG\n    printf("Debug mode\\n");\n#endif\n\n// Header guard\n#ifndef MYHEADER_H\n#define MYHEADER_H\n// header content\n#endif\n\`\`\`\n\n📌 Preprocessor runs **before** compilation — pure text substitution!` },
};

const askAI = (question) => {
  const q = question.toLowerCase();
  for (const key in C_KNOWLEDGE) {
    if (C_KNOWLEDGE[key].keys.some(k => q.includes(k))) return C_KNOWLEDGE[key].answer;
  }
  return `Great question about **"${question}"**! 🤔\n\nHere's what I know about C programming related to this:\n\nC is a powerful systems programming language. For specific topics, try asking about:\n- **Pointers** — memory addresses and dereferencing\n- **malloc/free** — dynamic memory allocation  \n- **Structs** — custom data types\n- **Recursion** — functions calling themselves\n- **Arrays** — contiguous memory collections\n- **File I/O** — reading and writing files\n\nFeel free to ask any specific C programming question! 💡`;
};

/* ─── Time formatter ─────────────────────────────────────── */
const fmt = (s) => {
  if (!isFinite(s) || s < 0) return '0:00';
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
};

/* ─── Slide titles for voice tab ─────────────────────────── */
const SLIDE_TITLES = [
  'Welcome — C Masterclass','Ch 1 — Introduction to C','Ch 2 — History of C',
  'Ch 3 — Features of C','Ch 4 — Program Structure','Ch 5 — Hello World',
  'Ch 6 — Variables','Ch 7 — Data Types','Ch 8 — Operators',
  'Ch 9 — Conditionals','Ch 10 — Loops','Ch 11 — Arrays',
  'Ch 12 — Libraries','Ch 13 — Functions','Ch 14 — Pointers',
  'Ch 15 — Structures','Ch 16 — Dynamic Memory','Ch 17 — File Handling',
  'Ch 18 — Preprocessor','Ch 19 — Enums & Typedef',
];

const TOTAL_AUDIO = 20; // slides 0–19 have audio

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
export default function SidePanel({ currentSlide }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('voice');

  /* Voice state */
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [readingSlide, setReadingSlide] = useState(null);
  const prevSlideRef = useRef(-1);

  /* Chat state */
  const [messages, setMessages] = useState([{
    id: 1, role: 'bot',
    text: "Hello! 👋 I'm your **C Programming AI Tutor**.\n\nAsk me **anything** about C — pointers, memory management, structs, recursion, file I/O, or any concept!\n\nI give clear explanations with code examples. 🚀"
  }]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);

  /* ── Stop audio ─────────────────────────────────────────── */
  const stopAudio = useCallback(() => {
    const a = audioRef.current;
    if (a) { a.pause(); a.src = ''; audioRef.current = null; }
    setIsPlaying(false); setIsPaused(false);
    setCurrentTime(0); setDuration(0); setReadingSlide(null);
  }, []);

  /* ── Play a slide's OGG file ────────────────────────────── */
  const playSlide = useCallback((idx) => {
    stopAudio();
    if (idx >= TOTAL_AUDIO) return;

    const audio = new Audio(`/audio/slide${idx}.ogg`);
    audio.volume = 1.0;   // MAX VOLUME
    audio.preload = 'auto';

    audio.onloadedmetadata = () => setDuration(audio.duration || 0);
    audio.ontimeupdate = () => setCurrentTime(audio.currentTime || 0);
    audio.onplay = () => { setIsPlaying(true); setIsPaused(false); setReadingSlide(idx); };
    audio.onpause = () => { if (!audio.ended) setIsPaused(true); };
    audio.onended = () => { setIsPlaying(false); setIsPaused(false); setCurrentTime(0); setReadingSlide(null); };
    audio.onerror = () => { setIsPlaying(false); setIsPaused(false); setReadingSlide(null); };

    audioRef.current = audio;
    audio.play().catch(() => {});
  }, [stopAudio]);

  /* ── Auto-play on slide change ──────────────────────────── */
  useEffect(() => {
    if (currentSlide === prevSlideRef.current) return;
    prevSlideRef.current = currentSlide;
    if (!autoPlay) return;
    const t = setTimeout(() => playSlide(currentSlide), 500);
    return () => clearTimeout(t);
  }, [currentSlide, autoPlay, playSlide]);

  /* ── Pause / Resume ─────────────────────────────────────── */
  const pauseResume = useCallback(() => {
    const a = audioRef.current;
    if (!a) return;
    if (isPaused) { a.play().catch(() => {}); setIsPaused(false); }
    else { a.pause(); setIsPaused(true); }
  }, [isPaused]);

  /* ── Seek ───────────────────────────────────────────────── */
  const seek = (e) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  /* ── Chat ───────────────────────────────────────────────── */
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isThinking]);

  const sendMessage = (question) => {
    const q = (question || input).trim();
    if (!q || isThinking) return;
    setInput('');
    setMessages(p => [...p, { id: Date.now(), role: 'user', text: q }]);
    setIsThinking(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now() + 1, role: 'bot', text: askAI(q) }]);
      setIsThinking(false);
    }, 600 + Math.random() * 400);
  };

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const curTitle = SLIDE_TITLES[currentSlide] || `Slide ${currentSlide + 1}`;

  return (
    <>
      {/* ── Toggle Tab ──────────────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        className="fixed z-50 flex flex-col items-center justify-center gap-1.5 shadow-2xl"
        style={{
          top: '50%', transform: 'translateY(-50%)',
          right: isOpen ? 368 : 0,
          transition: 'right 0.35s cubic-bezier(0.4,0,0.2,1)',
          background: 'linear-gradient(160deg,#0ea5e9,#6366f1)',
          borderRadius: '16px 0 0 16px',
          width: 46, padding: '18px 6px',
        }}
        whileHover={{ width: 54 }} whileTap={{ scale: 0.95 }}
        title={isOpen ? 'Close panel' : 'Open panel'}
      >
        {/* Pulse dot when closed & playing */}
        {!isOpen && isPlaying && (
          <motion.span animate={{ scale:[1,1.5,1], opacity:[1,0.4,1] }} transition={{ repeat:Infinity, duration:1.2 }}
            style={{ position:'absolute', top:8, right:8, width:9, height:9, borderRadius:'50%', background:'#4ade80', border:'1.5px solid white', writingMode:'horizontal-tb' }}
          />
        )}
        {!isOpen && !isPlaying && (
          <motion.span animate={{ scale:[1,1.4,1], opacity:[1,0.5,1] }} transition={{ repeat:Infinity, duration:1.4 }}
            style={{ position:'absolute', top:8, right:8, width:9, height:9, borderRadius:'50%', background:'#facc15', border:'1.5px solid white', writingMode:'horizontal-tb' }}
          />
        )}

        <motion.span
          animate={!isOpen ? { rotate:[0,-15,15,-10,10,0] } : {}}
          transition={{ repeat:Infinity, duration:2.5, repeatDelay:1 }}
          style={{ fontSize:22, writingMode:'horizontal-tb', lineHeight:1 }}
        >
          {isOpen ? '✕' : '🎙️'}
        </motion.span>

        <span style={{
          fontSize:'0.6rem', fontWeight:800, color:'white', letterSpacing:'0.08em',
          textTransform:'uppercase', writingMode:'vertical-rl', textOrientation:'mixed',
          transform:'rotate(180deg)', lineHeight:1.2, whiteSpace:'nowrap',
        }}>
          {isOpen ? 'Close' : 'Voice · Chat · Videos'}
        </span>

        <motion.div animate={{ rotate: isOpen ? 0 : 180 }} style={{ writingMode:'horizontal-tb' }}>
          <ChevronRight size={14} className="text-white opacity-80" />
        </motion.div>
      </motion.button>

      {/* ── Side Panel ──────────────────────────────────────── */}
      <motion.div
        initial={{ x: 368 }} animate={{ x: isOpen ? 0 : 368 }}
        transition={{ type:'spring', stiffness:300, damping:35 }}
        className="fixed right-0 top-0 h-full z-40 flex flex-col shadow-2xl"
        style={{ width:368, background:'#ffffff', borderLeft:'1px solid #e2e8f0' }}
      >
        {/* Header */}
        <div className="flex-shrink-0 p-4 pb-0" style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <CLogo size={34}/>
              <div>
                <h2 className="font-black text-white text-base leading-tight tracking-wide">C Masterclass</h2>
                {isPlaying && (
                  <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-sky-200 text-xs flex items-center gap-1 mt-0.5">
                    <motion.span animate={{ scale:[1,1.4,1] }} transition={{ repeat:Infinity, duration:0.6 }} className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"/>
                    🎙️ {isPaused ? 'Paused' : 'Playing'}: {curTitle}
                  </motion.p>
                )}
              </div>
            </div>
            {/* Auto-play toggle */}
            <button
              onClick={() => { setAutoPlay(a => !a); if (isPlaying && autoPlay) stopAudio(); }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all ${autoPlay ? 'bg-green-400 text-white border-green-300' : 'bg-white/20 text-white border-white/30'}`}
            >
              {autoPlay ? <Volume2 size={11}/> : <VolumeX size={11}/>}
              {autoPlay ? 'Auto ON' : 'Auto OFF'}
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white/10 rounded-xl p-1 mb-0">
            {[
              { id:'voice', icon:<Mic size={13}/>, label:'Voice Over' },
              { id:'chat',  icon:<Sparkles size={13}/>, label:'AI Chat' },
              { id:'videos', icon:<Youtube size={13}/>, label:'Videos' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab===tab.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══ VOICE OVER TAB ════════════════════════════════════ */}
        {activeTab === 'voice' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {/* Now Playing card */}
            <div className="p-4 rounded-2xl border-2 border-sky-100 bg-gradient-to-br from-sky-50 to-indigo-50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                  {isPlaying
                    ? <motion.span animate={{ scale:[1,1.2,1] }} transition={{ repeat:Infinity, duration:0.7 }} style={{ fontSize:16 }}>🎙️</motion.span>
                    : <span style={{ fontSize:16 }}>🎙️</span>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Slide {currentSlide+1} / {TOTAL_AUDIO}</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{curTitle}</p>
                </div>
              </div>

              {/* Waveform */}
              {isPlaying && (
                <div className="flex gap-0.5 items-end h-7 mb-3 justify-center">
                  {Array.from({length:14}).map((_,i)=>(
                    <motion.div key={i}
                      style={{ width:4, borderRadius:2, background: isPaused ? '#94a3b8' : '#0ea5e9' }}
                      animate={!isPaused ? { height:[4, 8+Math.sin(i)*6+8, 4] } : { height:4 }}
                      transition={{ repeat:Infinity, duration:0.35+i*0.04, delay:i*0.03 }}
                    />
                  ))}
                </div>
              )}

              {/* Progress bar */}
              <div
                className="h-2 rounded-full bg-slate-200 mb-2 cursor-pointer overflow-hidden"
                onClick={seek}
              >
                <motion.div className="h-full rounded-full" style={{ width:`${pct}%`, background:'linear-gradient(90deg,#0ea5e9,#6366f1)' }}/>
              </div>
              <div className="flex justify-between text-xs text-slate-400 font-mono mb-3">
                <span>{fmt(currentTime)}</span>
                <span>{fmt(duration)}</span>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                {/* Restart */}
                <motion.button whileTap={{ scale:0.9 }}
                  onClick={() => playSlide(currentSlide)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  title="Restart"
                >
                  ⏮
                </motion.button>

                {/* Play / Pause */}
                {!isPlaying ? (
                  <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                    onClick={() => playSlide(currentSlide)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-md text-sm"
                    style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)' }}
                  >
                    <Play size={16}/> Play Voice
                  </motion.button>
                ) : (
                  <motion.button whileTap={{ scale:0.96 }}
                    onClick={pauseResume}
                    className="flex-1 py-2.5 rounded-xl font-bold text-white flex items-center justify-center gap-2 text-sm"
                    style={{ background: isPaused ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#f59e0b,#d97706)' }}
                  >
                    {isPaused ? <><Play size={14}/> Resume</> : <><Pause size={14}/> Pause</>}
                  </motion.button>
                )}

                {/* Stop */}
                {isPlaying && (
                  <motion.button whileTap={{ scale:0.9 }}
                    onClick={stopAudio}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                    title="Stop"
                  >
                    <StopCircle size={18}/>
                  </motion.button>
                )}
              </div>
            </div>

            {/* Auto-play toggle card */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${autoPlay ? 'bg-green-500' : 'bg-slate-400'}`}/>
                  <span className="font-bold text-slate-700 text-xs">Auto-Play {autoPlay ? 'ON' : 'OFF'}</span>
                </div>
                <button onClick={() => setAutoPlay(a => !a)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${autoPlay ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                >
                  {autoPlay ? '🔇 Turn Off' : '🔊 Turn On'}
                </button>
              </div>
              <p className="text-xs text-slate-400">
                {autoPlay ? '✅ Voice plays automatically on each slide.' : '⏸️ Click Play to listen manually.'}
              </p>
            </div>

            {/* All slides list */}
            <div>
              <h4 className="font-bold text-slate-500 text-xs uppercase tracking-wider mb-2">All Voice Slides</h4>
              <div className="space-y-0.5 max-h-56 overflow-y-auto pr-1">
                {SLIDE_TITLES.map((title, i) => (
                  <button key={i}
                    onClick={() => { stopAudio(); setTimeout(() => playSlide(i), 80); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                      readingSlide===i ? 'bg-sky-100 text-sky-800 font-bold' :
                      currentSlide===i ? 'bg-sky-50 text-sky-700 font-semibold' :
                      'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black ${readingSlide===i ? 'bg-sky-600 text-white' : 'bg-slate-200 text-slate-500'}`}>{i+1}</span>
                    <span className="flex-1 truncate">{title}</span>
                    {readingSlide===i && <Volume2 size={9} className="text-sky-600 flex-shrink-0"/>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ AI CHAT TAB ═══════════════════════════════════════ */}
        {activeTab === 'chat' && (
          <>
            <div className="flex-shrink-0 px-4 py-2.5 border-b border-slate-100 bg-gradient-to-r from-sky-50 to-indigo-50 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                <Sparkles size={13} className="text-white"/>
              </div>
              <div>
                <p className="text-xs font-black text-slate-800">C Programming AI Tutor</p>
                <p className="text-xs text-slate-400">Ask anything about C programming</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"/>
                <span className="text-xs text-green-600 font-bold">Online</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ background:'#f8fafc' }}>
              {messages.map(msg => (
                <motion.div key={msg.id} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                  className={`flex gap-2 ${msg.role==='user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${msg.role==='bot' ? 'bg-gradient-to-br from-sky-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-400 to-teal-500'}`}>
                    {msg.role==='bot' ? <Sparkles size={12} className="text-white"/> : <User size={12} className="text-white"/>}
                  </div>
                  <div className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role==='user' ? 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white rounded-tr-sm' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'}`}
                    dangerouslySetInnerHTML={{ __html: msg.role==='bot' ? formatMessage(msg.text) : msg.text }}/>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-sky-500 to-indigo-600 mt-0.5">
                    <Sparkles size={12} className="text-white"/>
                  </div>
                  <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 shadow-sm">
                    <div className="flex gap-1">
                      {[0,1,2].map(i=><motion.div key={i} animate={{ y:[0,-6,0], opacity:[0.4,1,0.4] }} transition={{ repeat:Infinity, duration:0.7, delay:i*0.15 }} className="w-2 h-2 bg-sky-400 rounded-full"/>)}
                    </div>
                    <span className="text-xs text-slate-400 font-medium">Thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef}/>
            </div>
            <div className="flex-shrink-0 px-3 py-2 border-t border-slate-100 bg-white">
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => sendMessage(s)} disabled={isThinking}
                    className="flex-shrink-0 text-xs px-2.5 py-1.5 bg-sky-50 text-sky-700 rounded-full border border-sky-200 font-medium hover:bg-sky-100 transition-colors disabled:opacity-40 whitespace-nowrap">
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 p-3 border-t border-slate-100 bg-white">
              <div className="flex gap-2 items-end">
                <textarea value={input} onChange={e=>setInput(e.target.value)}
                  onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){ e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask any C programming question..." rows={1}
                  style={{ resize:'none', minHeight:40, maxHeight:100 }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:outline-none focus:border-sky-400 text-sm bg-slate-50 transition-colors"/>
                <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                  onClick={() => sendMessage()}
                  disabled={!input.trim()||isThinking}
                  className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-40 flex-shrink-0 shadow-md"
                  style={{ background:'linear-gradient(135deg,#0ea5e9,#6366f1)' }}>
                  <Send size={15} className="text-white"/>
                </motion.button>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 px-1">Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        )}

        {/* ══ VIDEOS TAB ════════════════════════════════════════ */}
        {activeTab === 'videos' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-center mb-3">
              <p className="text-sm font-bold text-slate-700">📌 Curated C Resources</p>
              <p className="text-xs text-slate-400">Watch these for deeper understanding</p>
            </div>
            {YT.map((res, i) => (
              <motion.a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.06 }}
                whileHover={{ scale:1.02, x:3 }}
                className={`flex items-center gap-3 p-3.5 rounded-2xl border-2 ${res.color} cursor-pointer group`}>
                <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">{res.emoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm leading-tight truncate">{res.topic}</h3>
                  <p className="text-xs opacity-60 font-medium mt-0.5">📺 {res.channel}</p>
                  <span className="text-xs font-bold opacity-40">{res.level}</span>
                </div>
                <ExternalLink size={13} className="opacity-40 group-hover:opacity-70 flex-shrink-0"/>
              </motion.a>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
