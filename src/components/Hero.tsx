"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { personalInfo } from "@/lib/data";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 2.4 });

      // Title 1
      const chars1 = title1Ref.current?.querySelectorAll(".char");
      if (chars1) {
        gsap.set(chars1, { yPercent: 100, opacity: 0 });
        tl.to(chars1, {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
        });
      }

      // Title 2
      const chars2 = title2Ref.current?.querySelectorAll(".char");
      if (chars2) {
        gsap.set(chars2, { yPercent: 100, opacity: 0 });
        tl.to(
          chars2,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.7"
        );
      }

      // Role
      if (roleRef.current) {
        gsap.set(roleRef.current, { opacity: 0, x: 20 });
        tl.to(
          roleRef.current,
          { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        );
      }

      // Socials
      const socials = socialRef.current?.querySelectorAll("a, span");
      if (socials) {
        gsap.set(socials, { opacity: 0, y: 10 });
        tl.to(
          socials,
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
          "-=0.5"
        );
      }
    },
    { scope: container }
  );

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
      ref={container}
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-black pt-20 pb-10"
    >
      {/* Subtle Purple Tease Glow */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-25"
        style={{
          background: "radial-gradient(circle at center, #2e2245 0%, transparent 50%)"
        }}
      />

      {/* 3D Wireframe Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto opacity-40">
        <Scene3D />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-col justify-center flex-grow pointer-events-none">
        
        {/* Name First Line (Serif Italic) */}
        <div
          ref={title1Ref}
          className="overflow-hidden pb-[4vw] mb-[-6vw]"
        >
          <h1 className="font-heading italic text-[14vw] md:text-[12vw] leading-[0.8] text-[#e5e5e5] tracking-tight">
            {splitText("Piyush")}
          </h1>
        </div>

        {/* Name Second Line (Sans-Serif) & Role */}
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full mt-4 md:mt-0">
          
          <div ref={title2Ref} className="overflow-hidden mix-blend-difference z-10 relative">
            <h1 className="font-body font-bold text-[11vw] md:text-[10vw] leading-[0.8] text-white uppercase tracking-tighter">
              {splitText("Thakur")}
            </h1>
          </div>

          <div
            ref={roleRef}
            className="mt-8 md:mt-0 md:text-right max-w-xs md:max-w-sm pointer-events-auto"
          >
            <p className="font-body text-[var(--color-text-secondary)] uppercase tracking-[0.25em] text-xs md:text-sm leading-relaxed">
              Creative Developer & Frontend Engineer crafting premium digital experiences.
            </p>
          </div>

        </div>
      </div>

      {/* Footer Socials */}
      <div
        ref={socialRef}
        className="relative z-10 w-full px-8 md:px-16 lg:px-24 flex flex-wrap justify-between items-center text-[10px] sm:text-xs font-body tracking-[0.2em] text-[var(--color-text-secondary)] uppercase pointer-events-auto mt-auto"
      >
        <div className="flex gap-6 sm:gap-10">
          {personalInfo.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300 block"
            >
              {social.label}
            </a>
          ))}
        </div>
        <div className="hidden sm:block">
          <span className="block">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
