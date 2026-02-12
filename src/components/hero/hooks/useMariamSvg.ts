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

// ── Viewport height accounting for mobile browser chrome ────────────
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

// ── Measure base text width ratio (cached — font is deterministic) ──
let cachedWidthPerFontSize: number | null = null;

function getWidthPerFontSize(): number {
  if (cachedWidthPerFontSize !== null) return cachedWidthPerFontSize;

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

  cachedWidthPerFontSize = tempText.getBBox().width / 200;
  document.body.removeChild(tempSvg);
  return cachedWidthPerFontSize;
}

// ── Bottom-align the text inside the SVG viewBox ────────────────────
function alignTextToBottom(
  textEl: SVGTextElement,
  mariamHeight: number,
  isMobile: boolean,
) {
  try {
    const bbox = textEl.getBBox();
    const bottomMargin = isMobile ? 5 : 0;
    const target = mariamHeight - bottomMargin;
    const yAdjustment = target - (bbox.y + bbox.height);
    textEl.setAttribute("y", yAdjustment.toString());
  } catch {
    // Ignore — getBBox can throw if element is not rendered
  }
}

// ── Core layout calculation ─────────────────────────────────────────
// Extracted so it can be called from both the initial effect and the
// resize handler without duplicating logic.
function layoutMariam(
  svg: SVGSVGElement,
  portfolioHeaderRef: RefObject<HTMLDivElement | null>,
  isMobile: boolean,
  onDone?: () => void,
) {
  const portfolEl = portfolioHeaderRef.current?.querySelector(
    ".hero-cover-title-portfol",
  ) as HTMLElement | null;
  if (!portfolEl) { onDone?.(); return; }

  const screenHeight = getViewportHeight();
  const screenWidth = window.innerWidth;
  const portfolRect = portfolEl.getBoundingClientRect();
  const mobileBottomPadding = isMobile ? 40 : 0;

  const availableHeight = isMobile
    ? Math.min(screenHeight * 0.3, 200)
    : screenHeight - portfolRect.bottom - mobileBottomPadding;

  const widthPerFontSize = getWidthPerFontSize();
  let fontSize = (screenWidth - 2) / widthPerFontSize;
  const mariamWidth = screenWidth;
  const mariamHeight = availableHeight;
  const padding = 10;

  // Apply SVG container dimensions
  svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
  svg.setAttribute("width", `${mariamWidth}px`);
  svg.setAttribute("height", `${mariamHeight}px`);
  Object.assign(svg.style, {
    position: "fixed",
    left: "0px",
    top: "auto",
    bottom: `${mobileBottomPadding}px`,
    margin: "0",
    padding: "0",
    height: `${mariamHeight}px`,
    width: `${mariamWidth}px`,
    overflow: "visible",
  });

  const textEl = svg.querySelector(".hero-mariam-text") as SVGTextElement | null;
  if (!textEl) { onDone?.(); return; }

  // Apply text attributes
  textEl.setAttribute("x", "0");
  textEl.setAttribute("y", `${mariamHeight}px`);
  textEl.setAttribute("dominant-baseline", "baseline");
  textEl.setAttribute("text-anchor", "start");
  textEl.setAttribute("dx", "0");
  textEl.setAttribute("font-size", `${fontSize}px`);
  textEl.setAttribute("font-family", FONTS.display);
  textEl.setAttribute("font-weight", "700");
  textEl.setAttribute("letter-spacing", "0");

  // Measure → scale → align → cache → done (3 rAF frames)
  requestAnimationFrame(() => {
    alignTextToBottom(textEl, mariamHeight, isMobile);

    requestAnimationFrame(() => {
      try {
        const bbox = textEl.getBBox();
        const widthScale = (screenWidth - 2) / bbox.width;
        const heightScale = mariamHeight / bbox.height;
        const scale = Math.min(widthScale, heightScale);

        if (scale > 1.01 || scale < 0.99) {
          fontSize *= scale;
          textEl.setAttribute("font-size", `${fontSize}px`);
        }

        cachedSvgData = {
          fontSize,
          mariamWidth,
          mariamHeight,
          portfolBottom: portfolRect.bottom,
          portfolLeft: portfolRect.left,
          portfolFontSize: parseFloat(window.getComputedStyle(portfolEl).fontSize),
          screenWidth,
          screenHeight,
        };
        svgDataCalculated = true;

        requestAnimationFrame(() => {
          alignTextToBottom(textEl, mariamHeight, isMobile);
          onDone?.();
        });
      } catch {
        onDone?.();
      }
    });
  });
}

// ── Apply cached data for instant restore ───────────────────────────
function applyCachedLayout(svg: SVGSVGElement, data: MariamSvgData, isMobile: boolean) {
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

    const isMobile = checkIsMobile();

    // ── Quick restore from cache (same screen size) ─────────────
    if (cachedSvgData && svgDataCalculated) {
      const screenH = getViewportHeight();
      const screenW = window.innerWidth;
      if (
        Math.abs(screenH - cachedSvgData.screenHeight) <= 50 &&
        Math.abs(screenW - cachedSvgData.screenWidth) <= 50
      ) {
        applyCachedLayout(svg, cachedSvgData, isMobile);
        setIsMariamReady(true);
        // Still attach resize handler below
      } else {
        // Screen changed — recalculate
        svgDataCalculated = false;
        cachedSvgData = null;
        layoutMariam(svg, portfolioHeaderRef, isMobile, () => {
          setIsMariamReady(true);
        });
      }
    } else {
      // ── Fresh calculation ──────────────────────────────────────
      layoutMariam(svg, portfolioHeaderRef, isMobile, () => {
        setIsMariamReady(true);
      });
    }

    // ── Resize handler — actually recalculates ──────────────────
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Skip tiny changes on mobile (virtual keyboard, etc.)
        if (checkIsMobile() && cachedSvgData) {
          const w = window.innerWidth;
          const h = getViewportHeight();
          if (
            Math.abs(w - cachedSvgData.screenWidth) < 100 &&
            Math.abs(h - cachedSvgData.screenHeight) < 100
          ) {
            return;
          }
        }

        svgDataCalculated = false;
        cachedSvgData = null;
        layoutMariam(svg, portfolioHeaderRef, checkIsMobile());
      }, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [portfolWidth, isActive, svgRef, portfolioHeaderRef]);

  return { isMariamReady };
}
