import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../constants";

/**
 * Hero-specific breakpoints:
 * - isLg: >= 1024px — full animations, dot click, O drag
 * - isMd: 768px to <1024px — final state only, no animation, no drag, line + nav + O visible
 * - isSm: < 768px — "PORTFOLIO" full word, menu icon with nav, no line/O in header
 */
export function useHeroBreakpoints(): {
  isLg: boolean;
  isMd: boolean;
  isSm: boolean;
} {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return { isLg: false, isMd: false, isSm: false };
    const w = window.innerWidth;
    return {
      isLg: w >= BREAKPOINTS.lg,
      isMd: w >= BREAKPOINTS.md && w < BREAKPOINTS.lg,
      isSm: w < BREAKPOINTS.md,
    };
  });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setState({
        isLg: w >= BREAKPOINTS.lg,
        isMd: w >= BREAKPOINTS.md && w < BREAKPOINTS.lg,
        isSm: w < BREAKPOINTS.md,
      });
    };

    update();
    const mqLg = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`);
    const mqMd = window.matchMedia(`(min-width: ${BREAKPOINTS.md}px)`);

    const onChange = () => update();
    mqLg.addEventListener("change", onChange);
    mqMd.addEventListener("change", onChange);
    // NOTE: No window "resize" listener here — matchMedia fires exactly once per
    // threshold crossing, which is all we need. A resize listener would fire on
    // every pixel of resize and cause redundant re-renders.

    return () => {
      mqLg.removeEventListener("change", onChange);
      mqMd.removeEventListener("change", onChange);
    };
  }, []);

  return state;
}
