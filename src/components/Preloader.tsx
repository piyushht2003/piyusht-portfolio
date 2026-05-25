"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

const NAME_CHARS = "PIYUSH SINGH THAKUR".split("");

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
        setTimeout(() => setIsVisible(false), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1] as any,
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ backgroundColor: "#050505" }}
        >
          {/* Name — character stagger */}
          <div className="flex flex-wrap justify-center gap-x-[2px] md:gap-x-[4px] px-4">
            {NAME_CHARS.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.04,
                  ease: [0.215, 0.61, 0.355, 1] as any,
                }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-[0.15em] inline-block"
                style={{
                  color: "#e5e5e5",
                  fontFamily: "var(--font-heading), sans-serif",
                  minWidth: char === " " ? "0.35em" : undefined,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.0,
              ease: [0.215, 0.61, 0.355, 1] as any,
            }}
            className="mt-4 md:mt-6 text-sm md:text-base tracking-[0.35em] uppercase"
            style={{
              color: "#777777",
              fontFamily: "var(--font-body), sans-serif",
            }}
          >
            Frontend Engineer
          </motion.p>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="fixed bottom-8 right-8 md:bottom-12 md:right-12"
          >
            <span
              className="text-6xl md:text-8xl font-light tabular-nums"
              style={{
                color: "#555555",
                fontFamily: "var(--font-mono, 'Geist Mono'), monospace",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(count).padStart(3, "0")}
            </span>
          </motion.div>

          {/* Subtle line animation at bottom */}
          <motion.div
            className="fixed bottom-0 left-0 h-[1px]"
            style={{ backgroundColor: "#2a2a2a" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2.0,
              ease: "linear",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
