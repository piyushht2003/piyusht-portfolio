"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
  align = "left",
}: SectionHeadingProps) {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  const lineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={`
        flex flex-col gap-4
        ${align === "center" ? "items-center text-center" : "items-start text-left"}
        ${className}
      `}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Decorative line */}
      <motion.div
        variants={lineVariants}
        className="h-[1px] w-12 origin-left bg-[#6c3fc7]"
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          variants={childVariants}
          className="font-[family-name:var(--font-body)] text-xs font-medium uppercase tracking-[0.2em] text-[#5e5480]"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Title */}
      <motion.h2
        variants={childVariants}
        className="font-[family-name:var(--font-heading)] text-5xl font-bold leading-[0.95] tracking-tight text-[#ece8f4] md:text-7xl"
      >
        {title}
      </motion.h2>
    </motion.div>
  );
}
