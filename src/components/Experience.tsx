"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { experience } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".experience-item");

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
              start: "top 85%",
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative w-full py-32 md:py-48 bg-transparent text-white overflow-hidden border-t border-[var(--color-border)]"
    >
      <div className="max-w-[90vw] mx-auto w-full">
        
        {/* Editorial Heading */}
        <div className="mb-24 md:mb-40 flex flex-col items-start px-4 md:px-12">
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-6">
            Career Journey
          </p>
          <h2 className="font-heading italic text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
            Work <span className="font-body not-italic font-bold uppercase tracking-tighter">Experience</span>
          </h2>
        </div>

        {/* Experience List */}
        <div className="flex flex-col">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="experience-item group relative w-full border-t border-[var(--color-border)] py-16 md:py-24 px-4 md:px-12 transition-colors duration-500 hover:bg-[#050505]"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-24">
                
                {/* Left Column: Dates & Company */}
                <div className="flex flex-col lg:w-1/3 gap-4">
                  <span className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
                    {item.startDate} — {item.endDate}
                  </span>
                  
                  <h3 className="font-body font-bold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[var(--color-text-primary)]">
                    {item.company}
                  </h3>
                  
                  {item.location && (
                    <span className="font-heading italic text-lg text-[var(--color-text-secondary)]">
                      {item.location}
                    </span>
                  )}
                </div>

                {/* Right Column: Role & Details */}
                <div className="lg:w-2/3 flex flex-col gap-10">
                  <h4 className="font-heading italic text-4xl md:text-6xl text-[var(--color-text-secondary)] leading-tight group-hover:text-white transition-colors duration-500">
                    {item.role}
                  </h4>
                  
                  <ul className="flex flex-col gap-4 max-w-2xl">
                    {item.description.map((bullet, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="text-[var(--color-text-tertiary)] mt-1.5 shrink-0">—</span>
                        <p className="font-body text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">
                          {bullet}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="font-body text-[10px] md:text-xs uppercase tracking-[0.1em] text-[var(--color-text-tertiary)] border border-[var(--color-border)] px-3 py-1.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
          {/* Bottom Border for the last item */}
          <div className="w-full border-t border-[var(--color-border)]"></div>
        </div>

      </div>
    </section>
  );
}
