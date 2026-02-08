import { useEffect, useState, type RefObject } from "react";

/**
 * Measures the width of the PORTFOL element on mount.
 * This is separated from the animation hook to break the circular dependency:
 *   portfolWidth → useMariamSvg → useDotAnimation → usePortfolioAnimation
 */
export function usePortfolWidth(
  headerRef: RefObject<HTMLDivElement | null>,
): number {
  const [portfolWidth, setPortfolWidth] = useState(0);

  useEffect(() => {
    if (!headerRef.current) return;

    const measure = () => {
      const el = headerRef.current?.querySelector(
        ".hero-cover-title-portfol",
      ) as HTMLElement | null;
      if (!el) return;
      const orig = el.style.display;
      el.style.display = "inline";
      const w = el.getBoundingClientRect().width;
      el.style.display = orig;
      if (w > 0) setPortfolWidth(w);
    };

    measure();
    const t = setTimeout(measure, 100);
    return () => clearTimeout(t);
  }, [headerRef]);

  return portfolWidth;
}
