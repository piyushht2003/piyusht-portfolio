"use client";

import { useMemo } from "react";
import { motion } from "motion/react";

type AnimationType = "chars" | "words" | "lines";

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: AnimationType;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  type = "words",
  delay = 0,
  stagger = 0.03,
  once = true,
}: AnimatedTextProps) {
  const units = useMemo(() => {
    switch (type) {
      case "chars":
        return text.split("");
      case "words":
        return text.split(" ");
      case "lines":
        return text.split("\n");
      default:
        return text.split(" ");
    }
  }, [text, type]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const unitVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          variants={unitVariants}
          className="inline-block"
          style={{
            marginRight: type === "chars" ? "0" : "0.3em",
            whiteSpace: type === "lines" ? "pre-wrap" : "normal",
          }}
        >
          {type === "chars" && unit === " " ? "\u00A0" : unit}
        </motion.span>
      ))}
    </motion.div>
  );
}
