"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { personalInfo } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    // Animate lines
    const lines = gsap.utils.toArray<HTMLElement>(".contact-line");
    lines.forEach((line) => {
      const chars = line.querySelectorAll(".char");
      gsap.set(chars, { yPercent: 100, opacity: 0 });
      tl.to(chars, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power3.out",
      }, "-=0.6"); // overlap slightly
    });

    // Animate details
    tl.fromTo(
      ".contact-detail",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.4"
    );

  }, { scope: containerRef });

  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className={`char inline-block ${char === " " ? "w-[0.3em]" : ""}`}
      >
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative w-full min-h-screen flex flex-col justify-between py-32 md:py-40 bg-[#000000] text-white overflow-hidden border-t border-[var(--color-border)]"
    >
      <div className="max-w-[90vw] mx-auto w-full flex-grow flex flex-col justify-center items-center text-center">
        
        {/* Massive Typography */}
        <div className="flex flex-col items-center pointer-events-none mb-16 md:mb-24">
          <div className="contact-line overflow-hidden pb-[4vw] mb-[-6vw]">
            <h2 className="font-heading italic text-[12vw] md:text-[10vw] leading-[0.8] text-[#e5e5e5] tracking-tight">
              {splitText("Let's Work")}
            </h2>
          </div>
          <div className="contact-line overflow-hidden pb-[2vw] mb-[-2vw] mt-4 md:mt-0 mix-blend-difference z-10 relative">
            <h2 className="font-body font-bold uppercase text-[10vw] md:text-[9vw] leading-[0.8] text-white tracking-tighter">
              {splitText("Together")}
            </h2>
          </div>
        </div>

        {/* Contact Details */}
        <div className="flex flex-col items-center gap-8 contact-detail">
          <a
            href={`mailto:${personalInfo.email}`}
            className="group relative font-heading italic text-[6.5vw] sm:text-3xl md:text-5xl lg:text-6xl text-[var(--color-text-secondary)] hover:text-white transition-colors duration-500"
          >
            {personalInfo.email}
            <span className="absolute -bottom-2 md:-bottom-4 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full" />
          </a>

          <div className="flex items-center gap-6 mt-8 font-body text-xs md:text-sm uppercase tracking-[0.2em] text-[var(--color-text-tertiary)] contact-detail">
            <a href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors duration-300">
              {personalInfo.phone}
            </a>
            <span className="opacity-30">/</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>

      </div>

      {/* Footer Details */}
      <div className="w-full max-w-[90vw] mx-auto mt-auto pt-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[var(--color-border)] contact-detail font-body text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--color-text-tertiary)]">
        <div>
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {personalInfo.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
