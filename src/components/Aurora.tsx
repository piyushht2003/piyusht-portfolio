"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Aurora() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const blobs = container.current?.querySelectorAll(".aurora-blob");
      if (!blobs) return;

      blobs.forEach((blob, i) => {
        gsap.to(blob, {
          x: () => `${gsap.utils.random(-20, 20)}vw`,
          y: () => `${gsap.utils.random(-20, 20)}vh`,
          scale: () => gsap.utils.random(0.8, 1.4),
          duration: () => gsap.utils.random(8, 15),
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * -2, // Start at different times
        });
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
    >
      <div className="absolute inset-0 opacity-30 mix-blend-screen filter blur-[80px] md:blur-[140px] transform-gpu">
        {/* Midnight Blue Blob */}
        <div className="aurora-blob absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-[100%] bg-[#1e3a8a] mix-blend-screen opacity-70" />
        
        {/* Royal Blue Blob */}
        <div className="aurora-blob absolute top-[10%] right-[-10%] w-[70vw] h-[70vh] rounded-[100%] bg-[#4169e1] mix-blend-screen opacity-60" />
        
        {/* Deep Cyan Blob */}
        <div className="aurora-blob absolute bottom-[-20%] left-[10%] w-[80vw] h-[60vh] rounded-[100%] bg-[#0e7490] mix-blend-screen opacity-50" />
      </div>
    </div>
  );
}
