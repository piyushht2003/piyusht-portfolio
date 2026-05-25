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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 lg:mt-24">
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
                <GlowCard disableTilt className="h-full relative overflow-hidden group p-8 md:p-12 transition-colors duration-500 hover:bg-[rgba(255,255,255,0.05)] hover:border-[#2a2a2a] flex flex-col gap-8">

                  {/* Large faded number in background */}
                  <div className="absolute top-4 right-6 text-8xl md:text-9xl font-bold font-heading text-[var(--color-bg-tertiary)] opacity-30 select-none z-0 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                    0{index + 1}
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 w-full">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-text-primary)] mb-2">
                        {project.name}
                      </h3>
                      <div className="text-[var(--color-text-secondary)] font-medium uppercase tracking-widest text-sm mb-6">
                        {project.tagline}
                      </div>
                      <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.techStack.map((t, i) => (
                        <span
                          key={i}
                          className="bg-[var(--color-bg-primary)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] px-3 py-1 rounded-full text-xs transition-colors hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex flex-col gap-6 w-full pt-4 border-t border-[var(--color-border)]">
                    <ul className="flex flex-col gap-3 text-[var(--color-text-secondary)] text-sm md:text-base">
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

                    <div className="flex gap-6 mt-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                          Live Demo <FiExternalLink />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                          GitHub <FiGithub />
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
