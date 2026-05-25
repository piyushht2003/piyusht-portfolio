"use client";

import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { skills } from "@/lib/data";

export default function Skills() {
  const allSkills = skills.flatMap((category) => category.skills);

  return (
    <section id="skills" className="relative w-full min-h-screen flex flex-col justify-center py-32 md:py-40 bg-[var(--color-bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full relative z-10 px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionHeading title="Skills" subtitle="Tech Arsenal" align="left" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-24">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
            >
              <GlowCard className="p-6 md:p-8 h-full">
                <div className="mb-8">
                  <h3 className="text-[var(--color-text-secondary)] text-sm uppercase tracking-widest font-bold mb-4">
                    {category.category}
                  </h3>
                  <div className="w-8 h-px bg-[var(--color-border-hover)]" />
                </div>

                <ul className="flex flex-col gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: categoryIndex * 0.15 + skillIndex * 0.05 }}
                      className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 flex items-center gap-2 cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] opacity-50" />
                      {skill}
                    </motion.li>
                  ))}
                </ul>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dramatic Background Marquee */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <div className="flex whitespace-nowrap animate-[marquee_60s_linear_infinite]">
          {allSkills.map((skill, i) => (
            <span key={`bg1-${i}`} className="text-8xl md:text-[10vw] font-bold font-heading px-8 text-[var(--color-text-primary)]">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-[marquee_70s_linear_infinite_reverse] mt-4">
          {allSkills.map((skill, i) => (
            <span key={`bg2-${i}`} className="text-8xl md:text-[10vw] font-bold font-heading px-8 text-[var(--color-text-primary)]">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
