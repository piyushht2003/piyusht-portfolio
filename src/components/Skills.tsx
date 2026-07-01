"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { skills } from "@/lib/data";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".skill-item");

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  // Re-map the existing skills data to our 3 new editorial columns
  // or define them statically for the new layout format.
  const editorialSkills = [
    {
      title: "Capabilities",
      items: [
        "Frontend Architecture",
        "Creative Development",
        "Performance Tuning",
        "WebGL & 3D Math",
      ],
    },
    {
      title: "Expertise",
      items: [
        "React & Next.js",
        "TypeScript",
        "GSAP & Animation",
        "Tailwind CSS",
      ],
    },
    {
      title: "Inspiration",
      items: [
        "Editorial Layouts",
        "Swiss Typography",
        "Minimalism",
        "Interactive Art",
      ],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="skills"
      className="relative w-full py-32 md:py-48 bg-[#000000] text-white overflow-hidden"
    >
      <div className="max-w-[90vw] mx-auto w-full">
        
        {/* Editorial Heading */}
        <div className="mb-24 md:mb-40 flex flex-col items-start px-4 md:px-12">
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-6">
            Focus Areas
          </p>
          <h2 className="font-heading italic text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
            Key <span className="font-body not-italic font-bold uppercase tracking-tighter">Skills</span>
          </h2>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 px-4 md:px-12">
          {editorialSkills.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Column Title */}
              <div className="pb-8 border-b border-[var(--color-border)] mb-12">
                <span className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                  0{idx + 1} — {col.title}
                </span>
              </div>

              {/* Huge typographic list items */}
              <div className="flex flex-col gap-12 md:gap-16">
                {col.items.map((item, i) => (
                  <h3
                    key={i}
                    className="skill-item font-body font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tighter text-[var(--color-text-primary)] hover:text-white transition-colors duration-300"
                  >
                    {item}
                  </h3>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
