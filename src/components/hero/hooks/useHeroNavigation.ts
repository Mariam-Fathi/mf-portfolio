import { useEffect, type RefObject } from "react";
import { setHeroNavigationY, setHeroLineData } from "@/utils/navigationPosition";

/**
 * After the portfolio animation completes, positions the hero navigation
 * at the end of the line between PORTFOL and O, and stores the positions
 * in the shared `navigationPosition` module for other sections to read.
 */
export function useHeroNavigation(
  navRef: RefObject<HTMLElement | null>,
  portfolioHeaderRef: RefObject<HTMLDivElement | null>,
  isPortfolioAnimationComplete: boolean,
) {
  useEffect(() => {
    if (!isPortfolioAnimationComplete) return;

    const position = () => {
      const nav = navRef.current;
      const header = portfolioHeaderRef.current;
      if (!nav || !header) return;

      const portfolEl = header.querySelector(".hero-cover-title-portfol") as HTMLElement | null;
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

      const navAbsoluteY = absoluteLineY / 2;
      const navRelativeY = navAbsoluteY - containerRect.top;

      nav.style.top = `${navRelativeY}px`;
      nav.style.left = `${lineEndX}px`;
      nav.style.transform = "translate(-100%, -50%)";
      nav.style.zIndex = "101";
      nav.style.marginLeft = "0";
      nav.style.paddingLeft = "0";
      nav.style.opacity = "1";
    };

    // Hide initially to prevent flash, then position
    if (navRef.current) {
      navRef.current.style.opacity = "0";
      navRef.current.style.top = "50%";
      navRef.current.style.left = "100%";
      navRef.current.style.transform = "translate(-100%, -50%)";
    }

    requestAnimationFrame(() => requestAnimationFrame(position));

    // Debounced — waits for usePortfolioAnimation's resize handler
    // to finish repositioning O and the line first.
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
  }, [isPortfolioAnimationComplete, navRef, portfolioHeaderRef]);
}
