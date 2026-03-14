import { useEffect, type RefObject } from "react";
import { setHeroNavigationY, setHeroLineData } from "@/utils/navigationPosition";

/**
 * After the portfolio animation completes, computes line/position data from the
 * header (PORTFOL / O / line) and stores it in the shared `navigationPosition`
 * module for other sections (e.g. SectionNavigation, SectionLineNavigation) to read.
 */
export function useHeroNavigation(
  portfolioHeaderRef: RefObject<HTMLDivElement | null>,
  isPortfolioAnimationComplete: boolean,
) {
  useEffect(() => {
    if (!isPortfolioAnimationComplete) return;

    const position = () => {
      const header = portfolioHeaderRef.current;
      if (!header) return;

      const portfolEl = header.querySelector(".hero-cover-title-portfoli") as HTMLElement | null;
      const oEl = header.querySelector(".hero-cover-title-o") as HTMLElement | null;
      const lineEl = header.querySelector(".hero-cover-title-line") as HTMLElement | null;
      if (!portfolEl || !oEl || !lineEl) {
        setTimeout(position, 100);
        return;
      }

      const containerRect = header.getBoundingClientRect();
      const lineRect = lineEl.getBoundingClientRect();
      const lineX = lineRect.left - containerRect.left;
      const lineEndX = lineX + lineRect.width;

      const lineCenterY = lineRect.top + lineRect.height / 2;
      const absoluteLineY = lineCenterY;

      setHeroNavigationY(absoluteLineY);

      const oRect = oEl.getBoundingClientRect();
      const oPositionX = oRect.left;
      const absoluteLineEndX = containerRect.left + lineEndX;

      setHeroLineData({
        lineY: absoluteLineY,
        lineEndX: absoluteLineEndX,
        lineWidth: lineRect.width,
        oPositionX,
      });
    };

    requestAnimationFrame(() => requestAnimationFrame(position));

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(position));
      }, 300);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isPortfolioAnimationComplete, portfolioHeaderRef]);
}
