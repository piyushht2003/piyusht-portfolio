"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/* ── Types ─────────────────────────────────────────────────── */

export interface UseSmoothScrollOptions {
  /** Scroll duration multiplier (default: 1.2) */
  duration?: number;
  /** Easing function — receives t in [0,1], returns eased value */
  easing?: (t: number) => number;
  /** Touch-device multiplier (default: 2) */
  touchMultiplier?: number;
  /** Infinite scrolling (default: false) */
  infinite?: boolean;
}

export interface UseSmoothScrollReturn {
  /** The Lenis instance — use for programmatic `.scrollTo()`, `.stop()`, etc. */
  lenis: Lenis | null;
}

/* ── Default easing — matches CSS `ease-out` feel ──────────── */

const defaultEasing = (t: number): number =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

/* ── Hook ──────────────────────────────────────────────────── */

/**
 * Initialises Lenis smooth scrolling on mount and tears it
 * down on unmount. Uses `requestAnimationFrame` internally
 * for frame-perfect scroll interpolation.
 *
 * ```tsx
 * const { lenis } = useSmoothScroll();
 * // programmatic scroll:
 * lenis?.scrollTo("#contact", { offset: -80 });
 * ```
 */
export function useSmoothScroll(
  options: UseSmoothScrollOptions = {}
): UseSmoothScrollReturn {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const {
      duration = 1.2,
      easing = defaultEasing,
      touchMultiplier = 2,
      infinite = false,
    } = options;

    const lenis = new Lenis({
      duration,
      easing,
      touchMultiplier,
      infinite,
    });

    lenisRef.current = lenis;

    // rAF loop — drives scroll interpolation every frame
    const raf = (time: number) => {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
    // We intentionally run this effect only once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lenis: lenisRef.current };
}

export default useSmoothScroll;
