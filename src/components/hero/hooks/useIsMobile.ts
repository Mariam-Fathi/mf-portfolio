import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants";

/**
 * Reactive hook — triggers re-render only when the breakpoint is crossed.
 * Uses `matchMedia` instead of a resize listener so the callback fires
 * once per threshold crossing, not on every pixel of resize.
 */
export function useIsMobile(breakpoint = BREAKPOINTS.lg): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Non-reactive check — reads the current viewport width at call time.
 * Use inside callbacks / GSAP onComplete where you don't want a re-render.
 */
export function checkIsMobile(breakpoint = BREAKPOINTS.lg): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth < breakpoint;
}
