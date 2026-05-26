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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mt-16 lg:mt-24">
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
                <GlowCard disableTilt className="h-full relative overflow-hidden group p-10 md:p-14 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.05)] hover:border-[#2a2a2a] flex flex-col gap-10">

                  {/* Large faded number in background */}
                  <div className="absolute top-6 right-8 text-8xl md:text-9xl font-bold font-heading text-[var(--color-bg-tertiary)] opacity-30 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 flex flex-col gap-8 w-full flex-1">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-text-primary)] mb-3">
                        {project.name}
                      </h3>
                      <div className="text-[var(--color-text-secondary)] font-medium uppercase tracking-widest text-sm mb-6">
                        {project.tagline}
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 mt-auto">
                      {project.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] px-4 py-1.5 rounded-full text-xs transition-colors hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 w-full pt-6 border-t border-[var(--color-border)]">
                    <ul className="flex flex-col gap-4 text-[var(--color-text-secondary)] text-sm md:text-base">
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

                    <div className="flex gap-4 mt-6">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--color-border-hover)] bg-[rgba(255,255,255,0.04)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent-active)] transition-all duration-300 text-sm font-medium tracking-wide uppercase"
                        >
                          Live Demo <FiExternalLink size={14} />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.04)] transition-all duration-300 text-sm font-medium tracking-wide uppercase"
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
