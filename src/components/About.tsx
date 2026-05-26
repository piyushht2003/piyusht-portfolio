"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import SectionHeading from "./SectionHeading";
import AnimatedText from "./AnimatedText";
import GlowCard from "./GlowCard";
import { stats, bio, bioShort } from "@/lib/data";

const techMarquee = [
  "TypeScript", "JavaScript", "Next.js", "React", "Node.js",
  "Redux", "Tailwind CSS", "Framer Motion", "Git", "Vercel", "Firebase",
];

const Counter = ({ value, label }: { value: string; label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const targetNumber = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const isFloat = value.includes(".");

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentCount = easeProgress * targetNumber;
        setCount(isFloat ? parseFloat(currentCount.toFixed(1)) : Math.floor(currentCount));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(targetNumber);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, targetNumber, isFloat]);

  return (
    <GlowCard className="p-8 md:p-10 flex flex-col items-center justify-center text-center h-full">
      <div ref={ref} className="text-4xl md:text-5xl font-bold font-heading text-[var(--color-text-primary)] mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm font-body text-[var(--color-text-secondary)] uppercase tracking-wider">
        {label}
      </div>
    </GlowCard>
  );
};

export default function About() {
  return (
    <section id="about" className="relative w-full min-h-screen flex flex-col justify-center py-32 md:py-40 bg-gradient-to-b from-[var(--color-bg-primary)] to-[var(--color-bg-secondary)] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full px-8 md:px-16 lg:px-24 xl:px-32">
        <SectionHeading title="About" subtitle="Who I Am" align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16 lg:mt-24">
          {/* Left Column - Bio */}
          <div className="flex flex-col gap-8 text-[var(--color-text-secondary)] text-lg md:text-xl leading-relaxed">
            <AnimatedText
              text={bio}
              type="words"
              className="font-light"
              stagger={0.02}
            />
            <AnimatedText
              text={bioShort}
              type="words"
              className="font-light"
              delay={0.4}
              stagger={0.02}
            />
          </div>

          {/* Right Column - Stats Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Counter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <div className="mt-32 border-y border-[var(--color-border)] py-8 relative overflow-hidden flex w-full">
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {techMarquee.map((tech, i) => (
            <div key={`tech1-${i}`} className="flex items-center">
              <span className="text-[var(--color-text-tertiary)] text-xl uppercase tracking-widest px-8">
                {tech}
              </span>
              <span className="text-[var(--color-text-tertiary)] opacity-30">•</span>
            </div>
          ))}
        </div>
        <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite]" aria-hidden="true">
          {techMarquee.map((tech, i) => (
            <div key={`tech2-${i}`} className="flex items-center">
              <span className="text-[var(--color-text-tertiary)] text-xl uppercase tracking-widest px-8">
                {tech}
              </span>
              <span className="text-[var(--color-text-tertiary)] opacity-30">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
