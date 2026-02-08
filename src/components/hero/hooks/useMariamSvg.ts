import { useEffect, useState, type RefObject } from "react";
import { FONTS } from "../constants";
import { checkIsMobile } from "./useIsMobile";
import type { MariamSvgData } from "../types";

// ── Module-level cache (survives unmount / remount) ─────────────────
let cachedSvgData: MariamSvgData | null = null;
let svgDataCalculated = false;

export function resetMariamCache() {
  cachedSvgData = null;
  svgDataCalculated = false;
}

// ── Utility: get viewport height accounting for mobile browser chrome ─
function getViewportHeight(): number {
  if (
    checkIsMobile() &&
    typeof window !== "undefined" &&
    (window as any).visualViewport
  ) {
    return (window as any).visualViewport.height;
  }
  return window.innerHeight;
}

// ── Utility: measure base text width at a reference font size ────────
function measureBaseTextWidth(): { widthPerFontSize: number } {
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  tempSvg.style.cssText = "position:absolute;visibility:hidden;width:2000px;height:2000px";
  document.body.appendChild(tempSvg);

  const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
  tempText.setAttribute("font-size", "200px");
  tempText.setAttribute("font-family", FONTS.display);
  tempText.setAttribute("font-weight", "700");
  tempText.setAttribute("letter-spacing", "0");
  tempText.textContent = "Mariam";
  tempSvg.appendChild(tempText);

  const bbox = tempText.getBBox();
  const widthPerFontSize = bbox.width / 200;
  document.body.removeChild(tempSvg);
  return { widthPerFontSize };
}


// ── Apply cached or freshly-calculated SVG data ──────────────────────
function applySvgLayout(
  svg: SVGSVGElement,
  data: MariamSvgData,
  isMobile: boolean,
) {
  const { fontSize, mariamWidth, mariamHeight } = data;
  const padding = 10;
  const bottomOffset = isMobile ? 40 : 0;

  svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
  svg.setAttribute("width", `${mariamWidth}px`);
  svg.setAttribute("height", `${mariamHeight}px`);
  Object.assign(svg.style, {
    position: "fixed",
    left: "0px",
    top: "auto",
    bottom: `${bottomOffset}px`,
    margin: "0",
    padding: "0",
    height: `${mariamHeight}px`,
    width: `${mariamWidth}px`,
    overflow: "visible",
  });

  const textEl = svg.querySelector(".hero-mariam-text");
  if (textEl) {
    textEl.setAttribute("x", "0");
    textEl.setAttribute("y", `${mariamHeight}px`);
    textEl.setAttribute("dominant-baseline", "baseline");
    textEl.setAttribute("text-anchor", "start");
    textEl.setAttribute("dx", "0");
    textEl.setAttribute("font-size", `${fontSize}px`);
    textEl.setAttribute("font-family", FONTS.display);
    textEl.setAttribute("font-weight", "700");
    textEl.setAttribute("letter-spacing", "0");
  }
}

// ── Bottom-align the text inside the SVG viewBox ─────────────────────
function alignTextToBottom(
  textEl: SVGTextElement,
  mariamHeight: number,
  isMobile: boolean,
) {
  try {
    const bbox = textEl.getBBox();
    const bottomMargin = isMobile ? 5 : 0;
    const target = mariamHeight - bottomMargin;
    const textBottom = bbox.y + bbox.height;
    if (Math.abs(textBottom - target) > 0.1) {
      textEl.setAttribute("y", (target - bbox.y - bbox.height + parseFloat(textEl.getAttribute("y") || "0")).toString());
      // Simpler recalc: set y = target - (bbox.y + bbox.height) keeps bottom at target
      const yAdjustment = target - (bbox.y + bbox.height);
      textEl.setAttribute("y", yAdjustment.toString());
    }
  } catch {
    // Ignore
  }
}

// ── Hook ─────────────────────────────────────────────────────────────
export function useMariamSvg(
  svgRef: RefObject<SVGSVGElement | null>,
  portfolWidth: number,
  portfolioHeaderRef: RefObject<HTMLDivElement | null>,
  isActive: boolean,
): { isMariamReady: boolean } {
  const [isMariamReady, setIsMariamReady] = useState(false);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || portfolWidth === 0 || !portfolioHeaderRef.current) return;

    const portfolEl = portfolioHeaderRef.current.querySelector(
      ".hero-cover-title-portfol",
    ) as HTMLElement | null;
    if (!portfolEl) return;

    const isMobile = checkIsMobile();
    const mobileBottomPadding = isMobile ? 40 : 0;
    const screenHeight = getViewportHeight();
    const screenWidth = window.innerWidth;

    // ── Use cache when screen size hasn't changed significantly ──
    if (cachedSvgData && svgDataCalculated) {
      const shouldRecalculate = isMobile && isActive;
      if (
        !shouldRecalculate &&
        Math.abs(screenHeight - cachedSvgData.screenHeight) <= 50 &&
        Math.abs(screenWidth - cachedSvgData.screenWidth) <= 50
      ) {
        applySvgLayout(svg, cachedSvgData, isMobile);
        setIsMariamReady(true);
        return;
      }
    }

    // ── Fresh calculation ────────────────────────────────────────
    const portfolRect = portfolEl.getBoundingClientRect();
    const portfolBottom = portfolRect.bottom;
    const portfolLeft = portfolRect.left;
    const portfolFontSize = parseFloat(window.getComputedStyle(portfolEl).fontSize);

    let availableHeight: number;
    if (isMobile) {
      availableHeight = Math.min(screenHeight * 0.3, 200);
    } else {
      availableHeight = screenHeight - portfolBottom - mobileBottomPadding;
    }

    const { widthPerFontSize } = measureBaseTextWidth();
    const targetWidth = screenWidth - 2;
    let fontSize = targetWidth / widthPerFontSize;

    const mariamWidth = screenWidth;
    const mariamHeight = availableHeight;
    const padding = 10;

    svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
    svg.setAttribute("width", `${mariamWidth}px`);
    svg.setAttribute("height", `${mariamHeight}px`);
    Object.assign(svg.style, {
      position: "fixed",
      left: "0px",
      top: "auto",
      bottom: `${isMobile ? 40 : 0}px`,
      margin: "0",
      padding: "0",
      height: `${mariamHeight}px`,
      width: `${mariamWidth}px`,
      overflow: "visible",
    });

    const textElement = svg.querySelector(".hero-mariam-text") as SVGTextElement | null;
    if (!textElement) {
      setTimeout(() => setIsMariamReady(true), 100);
      return;
    }

    textElement.setAttribute("x", "0");
    textElement.setAttribute("y", `${mariamHeight}px`);
    textElement.setAttribute("dominant-baseline", "baseline");
    textElement.setAttribute("text-anchor", "start");
    textElement.setAttribute("dx", "0");
    textElement.setAttribute("font-size", `${fontSize}px`);
    textElement.setAttribute("font-family", FONTS.display);
    textElement.setAttribute("font-weight", "700");
    textElement.setAttribute("letter-spacing", "0");

    // Measure → scale → align bottom → position M-texts → mark ready
    requestAnimationFrame(() => {
      alignTextToBottom(textElement, mariamHeight, isMobile);

      requestAnimationFrame(() => {
        try {
          const bbox = textElement.getBBox();
          const widthScale = (screenWidth - 2) / bbox.width;
          const heightScale = mariamHeight / bbox.height;
          const scale = Math.min(widthScale, heightScale);

          if (scale > 1.01 || scale < 0.99) {
            fontSize *= scale;
            textElement.setAttribute("font-size", `${fontSize}px`);
          }

          // Cache calculated data
          cachedSvgData = {
            fontSize,
            mariamWidth,
            mariamHeight,
            portfolBottom,
            portfolLeft,
            portfolFontSize,
            screenWidth,
            screenHeight,
          };
          svgDataCalculated = true;

          // Final bottom alignment after font-size adjustment
          requestAnimationFrame(() => {
            alignTextToBottom(textElement, mariamHeight, isMobile);

            setIsMariamReady(true);
          });
        } catch {
          setIsMariamReady(true);
        }
      });
    });

    // ── Resize handler ──────────────────────────────────────────
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (isMobile && cachedSvgData) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          if (
            Math.abs(w - cachedSvgData.screenWidth) < 100 &&
            Math.abs(h - cachedSvgData.screenHeight) < 100
          ) {
            return;
          }
        }
        svgDataCalculated = false;
        cachedSvgData = null;
        // Re-run the effect by toggling state — not ideal but simple
      }, 300);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [portfolWidth, isActive, svgRef, portfolioHeaderRef]);

  return { isMariamReady };
}
