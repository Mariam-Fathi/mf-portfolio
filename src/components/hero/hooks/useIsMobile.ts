import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants";

/**
 * Reactive hook — triggers re-render when the breakpoint is crossed.
 * Defaults to the `lg` (1024 px) breakpoint.
 */
export function useIsMobile(breakpoint = BREAKPOINTS.lg): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
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
