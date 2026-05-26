"use client";

import { motion } from "motion/react";
import SectionHeading from "./SectionHeading";
import GlowCard from "./GlowCard";
import { projects } from "@/lib/data";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default function Projects() {
  return (
    <section id="projects" className="relative w-full min-h-screen flex flex-col justify-center py-32 md:py-40 bg-[var(--color-bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionHeading title="Projects" subtitle="Selected Work" align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-12 lg:mt-24">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="lg:col-span-1"
              >
                <GlowCard disableTilt className="h-full relative overflow-hidden group p-5 sm:p-8 md:p-14 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.05)] hover:border-[#2a2a2a] flex flex-col gap-6 sm:gap-10">

                  {/* Large faded number in background */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-8 text-6xl sm:text-8xl md:text-9xl font-bold font-heading text-[var(--color-bg-tertiary)] opacity-30 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 sm:gap-8 w-full flex-1">
                    <div>
                      <h3 className="text-xl sm:text-3xl md:text-4xl font-bold font-heading text-[var(--color-text-primary)] mb-2 sm:mb-3">
                        {project.name}
                      </h3>
                      <div className="text-[var(--color-text-secondary)] font-medium uppercase tracking-widest text-xs sm:text-sm mb-3 sm:mb-6">
                        {project.tagline}
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-xs sm:text-sm md:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2.5 mt-auto">
                      {project.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] px-2 py-0.5 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs transition-colors hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-4 sm:gap-6 w-full pt-4 sm:pt-6 border-t border-[var(--color-border)]">
                    <ul className="flex flex-col gap-2 sm:gap-4 text-[var(--color-text-secondary)] text-xs sm:text-sm md:text-base">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-[var(--color-text-tertiary)] mt-1 shrink-0">—</span>
                          <span>
                            <strong className="font-medium text-[var(--color-text-primary)]">{feature.title}:</strong>{" "}
                            {feature.description}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-[var(--color-border-hover)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent-active)] transition-all duration-300 text-xs sm:text-sm font-medium tracking-wide uppercase"
                        >
                          Live Demo <FiExternalLink size={14} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 sm:gap-2.5 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 text-xs sm:text-sm font-medium tracking-wide uppercase"
                        >
                          GitHub <FiGithub size={14} />
                        </a>
                      )}
                    </div>
                  </div>

                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
