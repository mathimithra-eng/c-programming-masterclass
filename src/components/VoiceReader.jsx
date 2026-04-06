import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Pause, Play, StopCircle } from 'lucide-react';

export default function VoiceReader() {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const utteranceRef = useRef(null);

  const getPageText = () => {
    const elements = document.querySelectorAll('.slide-section h1, .slide-section h2, .slide-section p, .slide-section .real-world-text');
    let text = '';
    elements.forEach(el => {
      text += el.innerText + '. ';
    });
    return text || 'Welcome to Java Programming Masterclass. Scroll through the slides to learn Java from basics to advanced concepts.';
  };

  const startReading = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = getPageText();
      setCurrentText(text.substring(0, 50) + '...');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || 
                           voices.find(v => v.lang.startsWith('en')) || voices[0];
      if (englishVoice) utterance.voice = englishVoice;
      utterance.onend = () => { setIsReading(false); setIsPaused(false); setCurrentText(''); };
      utterance.onerror = () => { setIsReading(false); setIsPaused(false); };
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    } else {
      alert('Your browser does not support text-to-speech. Please try Chrome or Edge.');
    }
  };

  const pauseResume = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
    setCurrentText('');
  };

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        title="Voice Reader"
      >
        {isReading ? (
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
            <Volume2 size={24} className="text-white" />
          </motion.div>
        ) : (
          <VolumeX size={24} className="text-white" />
        )}
      </motion.button>

      {/* Voice panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 w-72"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Volume2 size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Voice Reader</h3>
                <p className="text-slate-500 text-sm">Text-to-speech</p>
              </div>
            </div>

            {isReading && currentText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 p-3 bg-indigo-50 rounded-2xl"
              >
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-indigo-500 rounded-full"
                      animate={{ height: [8, 24, 8] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-indigo-700 font-medium line-clamp-2">{currentText}</p>
              </motion.div>
            )}

            <div className="flex gap-2">
              {!isReading ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startReading}
                  className="flex-1 py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                >
                  <Play size={18} />
                  Read Page
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pauseResume}
                    className="flex-1 py-3 rounded-2xl font-bold text-white flex items-center justify-center gap-2"
                    style={{ background: isPaused ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #f59e0b, #d97706)' }}
                  >
                    {isPaused ? <><Play size={16} /> Resume</> : <><Pause size={16} /> Pause</>}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={stop}
                    className="py-3 px-4 rounded-2xl bg-rose-100 text-rose-600 font-bold flex items-center gap-1"
                  >
                    <StopCircle size={18} />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
