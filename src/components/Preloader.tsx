"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2000;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= steps) {
        clearInterval(timer);
        // Small pause at 100 before exit
        setTimeout(() => {
          setIsVisible(false);
          // Fallback just in case onExitComplete fails
          setTimeout(onComplete, 1200);
        }, 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          // Cinematic "sliding doors" exit
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1], // premium custom easing
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          
          {/* Subtle Purple Tease Glow (Matches Hero for blending) */}
          <div 
            className="absolute inset-0 z-0 pointer-events-none opacity-25"
            style={{
              background: "radial-gradient(circle at center, #2e2245 0%, transparent 50%)"
            }}
          />
          
          {/* Central Typographic Lockup */}
          <div className="flex flex-col items-center z-10 pointer-events-none">
            <div className="overflow-hidden pb-[4vw] mb-[-6vw] px-4">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="font-heading italic text-[14vw] md:text-[12vw] leading-[0.8] text-[#e5e5e5] tracking-tight"
              >
                Piyush
              </motion.h1>
            </div>
            
            <div className="overflow-hidden mt-4 md:mt-0 px-4 mix-blend-difference z-10 relative">
              <motion.h1
                initial={{ y: "-100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                className="font-body font-bold uppercase text-[11vw] md:text-[10vw] leading-[0.8] text-white tracking-tighter"
              >
                Thakur
              </motion.h1>
            </div>
          </div>

          {/* Bottom Loading Bar & Counter */}
          <div className="absolute bottom-12 md:bottom-16 w-full px-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-4 z-10">
            
            {/* Loading Label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-text-tertiary)]"
            >
              Loading Experience
            </motion.div>

            {/* Center Bar */}
            <div className="relative w-full md:w-1/3 h-[2px] bg-[#222] overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${count}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-heading italic text-3xl md:text-5xl text-white"
            >
              {String(count).padStart(3, "0")}<span className="text-xl md:text-2xl text-[var(--color-text-secondary)]">%</span>
            </motion.div>

          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
