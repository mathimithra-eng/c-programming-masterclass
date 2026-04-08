import React, { useState } from 'react';
import { motion } from 'motion/react';

export const SlideItem = ({ children, className = '', delay = 0 }) => {
  const [blown, setBlown] = useState(false);

  const handleClick = () => {
    setBlown(true);
    setTimeout(() => setBlown(false), 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 55, scale: 0.91, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: false, margin: '-10%' }}
      transition={{ duration: 0.75, delay, type: 'spring', bounce: 0.38 }}
      animate={
        blown
          ? {
              scale: [1, 1.10, 0.93, 1.05, 1],
              rotate: [0, -4, 4, -1.5, 0],
              y: [0, -22, 6, -9, 0],
              transition: { duration: 0.6, ease: 'easeInOut' }
            }
          : {
              y: [0, -7, 0],
              transition: {
                y: {
                  duration: 3.8 + delay * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay * 0.35,
                },
              },
            }
      }
      whileHover={{
        scale: 1.035,
        y: -11,
        boxShadow: '0 22px 64px rgba(99,160,255,0.20)',
        transition: { duration: 0.22, ease: 'easeOut' },
      }}
      whileTap={{
        scale: 0.96,
        transition: { duration: 0.1 },
      }}
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default function Slide({ children, className = '', id, style }) {
  return (
    <section
      id={id}
      style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      className={`p-4 sm:p-8 md:p-12 lg:p-24 relative overflow-hidden ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 px-0 sm:px-4">
        {children}
      </div>
    </section>
  );
}

