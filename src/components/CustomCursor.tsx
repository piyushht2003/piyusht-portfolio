"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Dot — fast, snappy spring
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 60, mass: 0.2 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 60, mass: 0.2 });

  // Ring — slower, lagging spring
  const ringX = useSpring(mouseX, { stiffness: 250, damping: 35, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 250, damping: 35, mass: 0.5 });

  // Detect touch device
  useEffect(() => {
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [mouseX, mouseY, isVisible]
  );

  // Mouse leave / enter viewport
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Hover detection on interactive elements
  useEffect(() => {
    if (isTouchDevice) return;

    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")) {
        setIsHovering(true);
      }
    };

    const handleOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")) {
        setIsHovering(false);
      }
    };

    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: 20,
          height: 20,
          border: "1px solid #3a3a3a",
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          transition: "opacity 0.2s ease, scale 0.3s ease",
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: 4,
          height: 4,
          backgroundColor: "#e5e5e5",
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible && !isHovering ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      />
    </>
  );
}
