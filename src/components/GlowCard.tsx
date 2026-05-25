"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  disableTilt?: boolean;
}

export default function GlowCard({ children, className = "", disableTilt = false }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 30, stiffness: 200, mass: 0.8 };

  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const percentX = (e.clientX - centerX) / (rect.width / 2);
    const percentY = (e.clientY - centerY) / (rect.height / 2);

    if (!disableTilt) {
      rotateX.set(-percentY * 8);
      rotateY.set(percentX * 8);
    }

    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={disableTilt ? undefined : {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={`
        relative overflow-hidden rounded-2xl
        bg-[rgba(255,255,255,0.03)] backdrop-blur-xl
        border border-[#1a1a1a]
        transition-[border-color] duration-500 ease-out
        ${isHovered ? "border-[#2a2a2a]" : ""}
        ${className}
      `}
    >
      {/* Inner gradient that follows the mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 0.6 : 0,
          background: `radial-gradient(
            600px circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(255, 255, 255, 0.04),
            transparent 40%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
