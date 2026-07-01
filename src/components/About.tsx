"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { stats, bio, bioShort } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const techMarquee = [
  "TypeScript", "JavaScript", "Next.js", "React", "Node.js",
  "Redux", "Tailwind CSS", "GSAP", "Git", "WebGL", "Figma",
];

// GSAP Counter component
const Counter = ({ value, label }: { value: string; label: string }) => {
  const targetNumber = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const isFloat = value.includes(".");
  
  const [displayValue, setDisplayValue] = useState("0");
  const counterRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!counterRef.current) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetNumber,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        const current = isFloat ? obj.val.toFixed(1) : Math.floor(obj.val);
        setDisplayValue(current.toString());
      },
    });
  }, { scope: counterRef });

  return (
    <div ref={counterRef} className="flex flex-col gap-2">
      <div className="font-heading italic text-5xl md:text-7xl text-[var(--color-text-primary)]">
        {displayValue}{suffix}
      </div>
      <div className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
        {label}
      </div>
    </div>
  );
};

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Bio text fade in
    gsap.fromTo(
      ".about-text",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 80%",
        },
      }
    );

    // Stats fade in
    gsap.fromTo(
      ".stat-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-32 md:py-48 bg-black text-white overflow-hidden border-t border-[var(--color-border)]"
    >
      <div className="max-w-[90vw] mx-auto w-full">
        
        {/* Editorial Heading */}
        <div className="mb-16 md:mb-32 flex flex-col items-start px-4 md:px-12">
          <p className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--color-text-secondary)] mb-6">
            Who I Am
          </p>
          <h2 className="font-heading italic text-5xl md:text-7xl lg:text-8xl text-white leading-tight">
            About <span className="font-body not-italic font-bold uppercase tracking-tighter">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 px-4 md:px-12">
          
          {/* Bio Section */}
          <div className="lg:col-span-7 about-text-container flex flex-col gap-8 md:gap-12">
            <p className="about-text font-heading text-2xl md:text-4xl lg:text-5xl leading-tight text-[var(--color-text-primary)]">
              {bioShort}
            </p>
            <p className="about-text font-body text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
              {bio}
            </p>
          </div>

          {/* Stats Section */}
          <div className="lg:col-span-5 stats-container grid grid-cols-2 gap-x-8 gap-y-16">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <Counter value={stat.value} label={stat.label} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-32 md:mt-48 py-8 relative overflow-hidden flex w-full border-y border-[var(--color-border)] opacity-60">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {techMarquee.map((tech, i) => (
            <div key={`tech1-${i}`} className="flex items-center">
              <span className="font-body text-[var(--color-text-secondary)] text-lg md:text-xl uppercase tracking-[0.2em] px-8">
                {tech}
              </span>
              <span className="text-[var(--color-text-tertiary)] opacity-50">•</span>
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]" aria-hidden="true">
          {techMarquee.map((tech, i) => (
            <div key={`tech2-${i}`} className="flex items-center">
              <span className="font-body text-[var(--color-text-secondary)] text-lg md:text-xl uppercase tracking-[0.2em] px-8">
                {tech}
              </span>
              <span className="text-[var(--color-text-tertiary)] opacity-50">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
