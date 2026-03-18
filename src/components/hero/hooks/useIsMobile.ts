import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants";

/**
 * Reactive hook — triggers re-render only when the breakpoint is crossed.
 * Uses `matchMedia` instead of a resize listener so the callback fires
 * once per threshold crossing, not on every pixel of resize.
 */
export function useIsMobile(breakpoint: number = BREAKPOINTS.md): boolean {
  // Lazy initializer reads the real viewport on first render (client only).
  // Falls back to false during SSR so the server render always matches the
  // "desktop" default — the effect below corrects it before first paint.
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= breakpoint;
  });

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    // Sync in case the breakpoint prop changed between renders
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
export function checkIsMobile(breakpoint: number = BREAKPOINTS.md): boolean {
  if (typeof window === "undefined") return false;
  return window.innerWidth <= breakpoint;
}
