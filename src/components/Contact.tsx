"use client";

import { motion } from "motion/react";
import AnimatedText from "./AnimatedText";
import { personalInfo } from "@/lib/data";
import { FiMapPin, FiMail } from "react-icons/fi";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full min-h-screen flex flex-col items-center justify-center py-32 md:py-40 px-8 md:px-16 lg:px-24 xl:px-32 bg-[var(--color-bg-primary)] overflow-hidden text-center">
      {/* Decorative Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-24 h-px bg-[var(--color-border-hover)] mb-20 origin-center"
      />

      <div className="flex flex-col items-center gap-12 z-10 w-full max-w-4xl">
        <div className="flex flex-col items-center font-heading font-bold text-[12vw] md:text-[9vw] leading-[0.9] tracking-tighter text-[var(--color-text-primary)] uppercase">
          <AnimatedText text="LET'S WORK" type="words" delay={0.2} stagger={0.1} />
          <AnimatedText text="TOGETHER" type="words" delay={0.4} stagger={0.1} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-8 mt-8"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="group relative text-lg md:text-2xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-3"
          >
            <FiMail className="opacity-50 group-hover:opacity-100 transition-opacity" />
            <span>{personalInfo.email}</span>
            <span className="absolute -bottom-2 left-0 w-0 h-px bg-[var(--color-text-primary)] transition-all duration-300 group-hover:w-full" />
          </a>

          <div className="flex items-center gap-4 text-[var(--color-text-tertiary)] text-sm md:text-base">
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} className="hover:text-[var(--color-text-primary)] transition-colors">
              {personalInfo.phone}
            </a>
            <span>/</span>
            <div className="flex items-center gap-1">
              <FiMapPin size={14} />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 text-[var(--color-text-secondary)] uppercase tracking-widest text-sm font-medium mt-8">
            {personalInfo.socials.map((social, index) => (
              <div key={social.label} className="flex items-center gap-4">
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {social.label}
                </a>
                {index < personalInfo.socials.length - 1 && (
                  <span className="text-[var(--color-text-tertiary)] opacity-30">/</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
