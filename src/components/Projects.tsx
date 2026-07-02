"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { projects, Project } from "@/lib/data";
import { FiExternalLink } from "react-icons/fi";

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Categorize projects
  const frontendIds = ["vrtx-concept", "vespera-home"];
  const frontendProjects = projects.filter(p => frontendIds.includes(p.id));
  const fullstackProjects = projects.filter(p => !frontendIds.includes(p.id));

  // Find the hovered project data for the cursor
  const hoveredProjectData = projects.find(p => p.id === hoveredProject);

  useEffect(() => {
    // GSAP quickTo for highly performant cursor tracking
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Center the custom cursor on the mouse
      xTo(e.clientX - 150); // half of width (300)
      yTo(e.clientY - 200); // half of height (400)
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    // Hide cursor when scrolling (since onMouseLeave doesn't fire when elements scroll out from under a stationary cursor)
    const handleScroll = () => setHoveredProject(null);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (hoveredProject !== null) {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
    } else {
      gsap.to(cursorRef.current, { scale: 0.8, opacity: 0, duration: 0.4, ease: "power2.out" });
    }
  }, [hoveredProject]);

  const renderProjectRow = (project: Project, index: number) => {
    const num = `00-${index + 1}`;
    
    return (
      <div
        key={project.id}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        className="group relative w-full border-b border-[var(--color-border)] py-12 md:py-20 px-4 md:px-12 transition-colors duration-500 hover:bg-[#050505]"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-16 relative z-10 pointer-events-none">
          
          {/* Left Column: Number & Title */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-24 md:w-2/3">
            <span className="text-[var(--color-text-tertiary)] font-body text-xs md:text-sm uppercase tracking-[0.2em] mt-2 block">
              {num} PREVIEW
            </span>
            
            <h3 
              className="font-body font-bold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tighter text-[var(--color-text-primary)] group-hover:text-white transition-colors duration-500 pointer-events-auto inline-block"
              onMouseEnter={() => setHoveredProject(null)}
              onMouseLeave={() => setHoveredProject(project.id)}
            >
              {project.name}
            </h3>
          </div>

          {/* Right Column: Description & Link */}
          <div className="md:w-1/3 flex flex-col gap-8 md:mt-2">
            <p 
              className="font-heading italic text-xl md:text-2xl text-[var(--color-text-secondary)] leading-relaxed pointer-events-auto inline-block"
              onMouseEnter={() => setHoveredProject(null)}
              onMouseLeave={() => setHoveredProject(project.id)}
            >
              {project.tagline}. {project.description}
            </p>

            <div 
              className="pointer-events-auto inline-block"
              onMouseEnter={() => setHoveredProject(null)}
              onMouseLeave={() => setHoveredProject(project.id)}
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-xs md:text-sm font-body uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] hover:text-white transition-colors duration-300 relative z-50"
                >
                  View Live <FiExternalLink />
                </a>
              )}
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  return (
    <section
      ref={containerRef}
      id="projects"
      className="relative w-full min-h-screen py-32 md:py-40 bg-transparent text-white overflow-hidden"
    >
      {/* Custom Cursor Image Reveal */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[300px] h-[400px] bg-[#111] border border-[#222] pointer-events-none z-50 overflow-hidden hidden md:flex items-center justify-center opacity-0 scale-80"
        style={{ transformOrigin: "center center" }}
      >
        {hoveredProjectData && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-[var(--color-text-tertiary)]">
            <span className="font-heading italic text-2xl mb-2">
              {hoveredProjectData.name}
            </span>
            <span className="text-xs uppercase tracking-widest font-body">
              Preview
            </span>
          </div>
        )}
      </div>

      <div className="max-w-[90vw] mx-auto w-full flex flex-col gap-48 md:gap-64">
        
        {/* Category 1: Frontend & Creative */}
        <div>
          <div className="mb-16 px-4 md:px-12">
            <h2 className="font-heading italic text-5xl md:text-7xl text-[var(--color-text-secondary)]">
              Frontend & UI
            </h2>
            <div className="w-full h-px bg-[var(--color-border)] mt-8"></div>
          </div>
          <div className="flex flex-col border-t border-[var(--color-border)]">
            {frontendProjects.map((project, index) => renderProjectRow(project, index))}
          </div>
        </div>

        {/* Category 2: Software & SaaS */}
        <div>
          <div className="mb-16 px-4 md:px-12">
            <h2 className="font-heading italic text-5xl md:text-7xl text-[var(--color-text-secondary)]">
              Software & SaaS
            </h2>
            <div className="w-full h-px bg-[var(--color-border)] mt-8"></div>
          </div>
          <div className="flex flex-col border-t border-[var(--color-border)]">
            {fullstackProjects.map((project, index) => renderProjectRow(project, index))}
          </div>
        </div>

      </div>
    </section>
  );
}
