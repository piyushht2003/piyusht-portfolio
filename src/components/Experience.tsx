"use client";

import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="relative w-full min-h-screen flex flex-col justify-center py-32 md:py-40 bg-[var(--color-bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionHeading title="Experience" subtitle="Career Journey" align="center" />

        <div className="relative mt-24 max-w-5xl mx-auto">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-border)] transform md:-translate-x-1/2" />

          <div className="flex flex-col gap-20 md:gap-28">
            {experience.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""} w-full`}>

                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-8 transform -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[var(--color-border-hover)] bg-[var(--color-bg-secondary)] z-10" />

                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
                    className={`w-full md:w-[calc(50%-3rem)] pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                  >
                    <GlowCard className="p-10 md:p-12 h-full">
                      <div className={`flex flex-col gap-2 mb-6 ${isEven ? "md:items-end" : "items-start"}`}>
                        <div className="text-[var(--color-text-tertiary)] font-mono text-sm tracking-wider">
                          {item.startDate} — {item.endDate}
                        </div>
                        <h3 className="text-2xl font-bold font-heading text-[var(--color-text-primary)]">
                          {item.role}
                        </h3>
                        <div className="text-[var(--color-text-secondary)] font-medium">
                          {item.company}{item.location ? ` · ${item.location}` : ""}
                        </div>
                      </div>

                      <ul className={`flex flex-col gap-3 mb-8 text-[var(--color-text-secondary)] text-sm md:text-base ${isEven ? "md:text-right md:items-end" : "text-left items-start"}`}>
                        {item.description.map((bullet, i) => (
                          <li key={i} className="flex gap-2">
                            {!isEven && <span className="text-[var(--color-text-tertiary)] mt-1 shrink-0">—</span>}
                            <p>{bullet}</p>
                            {isEven && <span className="text-[var(--color-text-tertiary)] mt-1 shrink-0 hidden md:inline">—</span>}
                          </li>
                        ))}
                      </ul>

                      <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                        {item.techStack.map((t, i) => (
                          <span
                            key={i}
                            className="bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] px-3 py-1 rounded-full text-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </GlowCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
