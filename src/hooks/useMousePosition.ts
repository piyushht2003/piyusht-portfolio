"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ── Types ─────────────────────────────────────────────────── */

export interface MousePosition {
  /** Raw pixel X position */
  x: number;
  /** Raw pixel Y position */
  y: number;
  /** Normalised X (-1 left … 0 centre … 1 right) */
  normalizedX: number;
  /** Normalised Y (-1 top … 0 centre … 1 bottom) */
  normalizedY: number;
}

const DEFAULT_POSITION: MousePosition = {
  x: 0,
  y: 0,
  normalizedX: 0,
  normalizedY: 0,
};

/* ── Hook ──────────────────────────────────────────────────── */

/**
 * Tracks the mouse position using `requestAnimationFrame` so the
 * value updates at display refresh rate without layout thrashing.
 *
 * Returns both raw pixel coords and normalised values
 * in the range `[-1, 1]` relative to the viewport centre.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>(DEFAULT_POSITION);

  // Store raw values in a ref so the rAF callback always reads the
  // latest coords without depending on React state.
  const rawRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const updatePosition = useCallback(() => {
    const { x, y } = rawRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    setPosition({
      x,
      y,
      normalizedX: w > 0 ? (x / w) * 2 - 1 : 0,
      normalizedY: h > 0 ? (y / h) * 2 - 1 : 0,
    });

    rafRef.current = 0; // mark frame as consumed
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      rawRef.current = { x: e.clientX, y: e.clientY };

      // Coalesce multiple events into a single rAF tick
      if (rafRef.current === 0) {
        rafRef.current = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updatePosition]);

  return position;
}

export default useMousePosition;
