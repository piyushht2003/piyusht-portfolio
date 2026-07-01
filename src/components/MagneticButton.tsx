"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`
        relative cursor-pointer rounded-full
        px-8 py-4
        text-sm font-medium tracking-wide uppercase
        text-[#ece8f4]
        bg-transparent
        border border-[#1e1530]
        transition-all duration-500 ease-out
        ${isHovered ? "border-[#2e2245] bg-[rgba(120,60,220,0.05)] backdrop-blur-xl shadow-[0_0_30px_rgba(108,63,199,0.08)]" : ""}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
