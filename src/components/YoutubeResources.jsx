import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, X, ExternalLink, Play } from 'lucide-react';

const YOUTUBE_RESOURCES = [
  {
    topic: 'Java for Beginners',
    channel: 'Bro Code',
    url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
    thumbnail: '🎯',
    duration: '12 hours',
    description: 'Complete Java course from scratch — perfect for absolute beginners',
    level: 'Beginner',
    color: 'bg-red-50 border-red-200 text-red-900',
    badge: 'bg-red-100 text-red-700',
  },
  {
    topic: 'OOP in Java',
    channel: 'Telusko',
    url: 'https://www.youtube.com/watch?v=bSrm9T6TB9U',
    thumbnail: '🏗️',
    duration: '2.5 hours',
    description: 'Master Object-Oriented Programming concepts with real examples',
    level: 'Intermediate',
    color: 'bg-blue-50 border-blue-200 text-blue-900',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    topic: 'Java Data Structures',
    channel: 'Java Brains',
    url: 'https://www.youtube.com/watch?v=92S4zgXN17o',
    thumbnail: '📊',
    duration: '3 hours',
    description: 'Arrays, ArrayList, HashMap, HashSet and more Collections explained',
    level: 'Intermediate',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-900',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    topic: 'Exception Handling',
    channel: 'Programming with Mosh',
    url: 'https://www.youtube.com/watch?v=1XAfapkBQjk',
    thumbnail: '🛡️',
    duration: '45 mins',
    description: 'Learn try, catch, finally and how to handle Java errors properly',
    level: 'Beginner',
    color: 'bg-purple-50 border-purple-200 text-purple-900',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    topic: 'Java Loops & Arrays',
    channel: 'Alex Lee',
    url: 'https://www.youtube.com/watch?v=IFYTr9bHN8g',
    thumbnail: '🔄',
    duration: '1 hour',
    description: 'Deep dive into for loops, while loops, and working with arrays',
    level: 'Beginner',
    color: 'bg-amber-50 border-amber-200 text-amber-900',
    badge: 'bg-amber-100 text-amber-700',
  },
  {
    topic: 'Java Full Course',
    channel: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=A74TOX803D0',
    thumbnail: '🚀',
    duration: '9 hours',
    description: 'Free full Java course — from basics to advanced, all in one video',
    level: 'All Levels',
    color: 'bg-indigo-50 border-indigo-200 text-indigo-900',
    badge: 'bg-indigo-100 text-indigo-700',
  },
];

export default function YoutubeResources() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      {/* Floating YouTube button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-xl font-bold text-white text-sm"
        style={{ background: 'linear-gradient(135deg, #ff0000, #cc0000)' }}
        title="YouTube Resources"
      >
        <Youtube size={18} />
        <span>Resources</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #ff0000, #cc0000)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Youtube size={26} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white">YouTube Resources 🎬</h2>
                    <p className="text-red-100 text-sm">Didn't understand? Watch and learn!</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Resources list */}
              <div className="overflow-y-auto p-6 space-y-4">
                {YOUTUBE_RESOURCES.map((res, i) => (
                  <motion.a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${res.color} cursor-pointer group transition-all`}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                      {res.thumbnail}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-black text-base">{res.topic}</h3>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${res.badge}`}>{res.level}</span>
                      </div>
                      <p className="text-sm opacity-70 font-medium mb-1">{res.description}</p>
                      <div className="flex items-center gap-3 text-xs font-bold opacity-60">
                        <span>📺 {res.channel}</span>
                        <span>⏱️ {res.duration}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ x: hoveredIndex === i ? 4 : 0 }}
                      className="flex-shrink-0"
                    >
                      <div className="w-10 h-10 rounded-full bg-white/60 flex items-center justify-center">
                        <Play size={16} className="opacity-60" />
                      </div>
                    </motion.div>
                  </motion.a>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 text-center">
                <p className="text-slate-400 text-xs font-medium">
                  📌 Tip: Watch these videos after reading each slide for best results!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
