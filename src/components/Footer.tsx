"use client";

import { motion } from "motion/react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="w-full py-8 bg-[var(--color-bg-primary)] border-t border-[var(--color-bg-tertiary)]"
    >
      <div className="max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-[var(--color-text-tertiary)] font-medium uppercase tracking-widest">
        <div>© {currentYear} PIYUSH SINGH THAKUR</div>
        <div>BUILT WITH NEXT.JS & MOTION</div>
      </div>
    </motion.footer>
  );
}
