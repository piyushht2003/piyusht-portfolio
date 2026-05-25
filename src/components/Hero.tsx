"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "./MagneticButton";
import { FiArrowDown } from "react-icons/fi";

// Dynamically import Scene3D to disable SSR since Three.js relies on window
const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay animation to allow preloader to finish (2.5s)
    const timer = setTimeout(() => setMounted(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const name = "PIYUSH".split("");
  const surname = "SINGH THAKUR".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number], // cubic-bezier for smooth slide up
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-bg-primary)] pt-20"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Scene3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col items-center justify-center text-center pointer-events-none">
        <AnimatePresence>
          {mounted && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center pointer-events-auto"
            >
              {/* Name */}
              <div className="flex flex-col items-center font-heading font-bold text-[#e5e5e5] leading-none mb-6">
                <div className="flex overflow-hidden pb-2 text-[12vw] md:text-[8vw] tracking-tighter">
                  {name.map((char, index) => (
                    <motion.span key={`name-${index}`} variants={letterVariants} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </div>
                <div className="flex overflow-hidden pb-4 text-[10vw] md:text-[7vw] tracking-tight">
                  {surname.map((char, index) => (
                    <motion.span key={`surname-${index}`} variants={letterVariants} className="inline-block">
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                className="text-[var(--color-text-tertiary)] uppercase tracking-[0.3em] text-sm md:text-base font-body mb-12"
              >
                Frontend Engineer
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="flex flex-wrap items-center justify-center gap-6 pointer-events-auto"
              >
                <MagneticButton className="px-8 py-4 rounded-full text-[var(--color-text-primary)] text-sm uppercase tracking-wider font-medium">
                  <a href="#projects" className="block w-full h-full">View Work</a>
                </MagneticButton>
                <MagneticButton className="px-8 py-4 rounded-full text-[var(--color-text-secondary)] text-sm uppercase tracking-wider font-medium border border-transparent hover:border-[var(--color-border)]">
                  <a href="#contact" className="block w-full h-full">Contact</a>
                </MagneticButton>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            style={{ animation: "bounce-slow 2s ease-in-out infinite" }}
          >
            <a href="#about" aria-label="Scroll to About">
              <span className="text-xs uppercase tracking-widest font-body opacity-50 block mb-2">Scroll</span>
              <FiArrowDown size={20} className="mx-auto" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
