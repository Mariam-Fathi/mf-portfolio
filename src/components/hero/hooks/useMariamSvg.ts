import { useEffect, useState, type RefObject } from "react";
import { FONTS } from "../constants";
import { checkIsMobile } from "./useIsMobile";
import type { MariamSvgData } from "../types";

// ── Module-level cache (survives unmount / remount) ─────────────────
// IMPORTANT – React 18 Strict Mode double-invokes effects in development.
// The first invocation may set svgDataCalculated = true, causing the second
// invocation to skip the layout calculation and use cached (possibly stale)
// data. This is expected in development only; production builds are unaffected.
let cachedSvgData: MariamSvgData | null = null;
let svgDataCalculated = false;
const MARIAM_LAYOUT_VERSION = 11;

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
    // Keep a small inset from the SVG bottom edge to avoid glyph antialias clipping.
    const bottomMargin = isMobile ? 6 : 8;
    const target = mariamHeight - bottomMargin;
    const yAdjustment = target - (bbox.y + bbox.height);
    textEl.setAttribute("y", yAdjustment.toString());
  } catch (err) {
    // getBBox can throw if the element is not yet rendered (e.g. display:none parent).
    if (process.env.NODE_ENV !== "production") {
      console.warn("[useMariamSvg] alignTextToBottom: getBBox failed — text may render at y=0. Cause:", err);
    }
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
  // When SKIP_PORTFOLIO_ANIMATION we have .hero-cover-title-whole; otherwise .hero-cover-title-portfoli
  const portfolEl =
    (portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfoli") as HTMLElement | null) ??
    (portfolioHeaderRef.current?.querySelector(".hero-cover-title-whole") as HTMLElement | null);
  if (!portfolEl) { onDone?.(); return; }

  const screenHeight = getViewportHeight();
  const screenWidth = window.innerWidth;
  const portfolRect = portfolEl.getBoundingClientRect();
  const stripEl = document.querySelector("[data-hero-contact-strip]") as HTMLElement | null;
  const reserveBottom =
    stripEl?.dataset.noBottomReserve !== "true";
  const bottomReservePx =
    stripEl && reserveBottom ? Math.ceil(stripEl.getBoundingClientRect().height) : 0;

  // The Mariam SVG lives inside the hero grid (right column).
  // Measure the actual container so width/height never "overfit" the viewport.
  const contactsNoBottomReserve = stripEl?.dataset.noBottomReserve === "true";
  const mariamSlotEl = svg.closest(".hero-mariam-slot") as HTMLElement | null;
  const mariamSlotRect = mariamSlotEl?.getBoundingClientRect();
  const mariamSlotWidth = mariamSlotRect?.width ?? 0;
  const mariamSlotHeight = mariamSlotRect?.height ?? 0;

  // If the slot hasn't stretched yet, measure the parent grid's 3fr column directly.
  const gridEl = mariamSlotEl?.closest(".hero-inner-grid") as HTMLElement | null;
  const gridRect = gridEl?.getBoundingClientRect();
  // 3fr out of 4fr total = 75% of grid width (minus column gap).
  const columnGap = gridEl ? parseFloat(getComputedStyle(gridEl).columnGap) || 0 : 0;
  const fallbackSlotWidth = gridRect
    ? Math.max(240, (gridRect.width - columnGap) * 0.75)
    : Math.max(240, screenWidth * 0.75);
  const resolvedSlotWidth = mariamSlotWidth > 10 ? mariamSlotWidth : fallbackSlotWidth;

  const rightPaddingPx =
    contactsNoBottomReserve && mariamSlotEl
      ? Math.ceil(parseFloat(getComputedStyle(mariamSlotEl).paddingRight || "0")) || 0
      : 0;

  const availableSvgWidth = Math.max(1, resolvedSlotWidth - rightPaddingPx);
  const mariamWidth = availableSvgWidth; // always fill the full column
  const sidebarOffsetPx = 0;

  const rawMobileH = Math.min(screenHeight * 0.3, 200);
  const availableHeight = isMobile
    ? Math.max(40, rawMobileH - bottomReservePx)
    : Math.max(40, screenHeight - portfolRect.bottom - bottomReservePx);

  const widthPerFontSize = getWidthPerFontSize();
  let fontSize = (mariamWidth - 2) / widthPerFontSize;

  const contactsHeight = stripEl ? stripEl.getBoundingClientRect().height : 0;
  const contactsHeightForCap =
    contactsNoBottomReserve && contactsHeight > 0
      ? Math.max(40, contactsHeight - 24)
      : contactsHeight;

  const slotBasedHeight =
    mariamSlotHeight > 0
      ? Math.max(40, mariamSlotHeight - 6)
      : availableHeight;

  const cappedAvailableHeight =
    contactsNoBottomReserve && contactsHeight > 0
      ? Math.max(40, Math.min(slotBasedHeight, contactsHeightForCap))
      : slotBasedHeight;

  // Use full available height — width drives the size, not height cap
  const mariamHeight = Math.max(40, cappedAvailableHeight);
  const padding = 10;

  // Apply SVG container dimensions
  svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
  svg.setAttribute("width", `${mariamWidth}px`);
  svg.setAttribute("height", `${mariamHeight}px`);
  Object.assign(svg.style, {
    // Rendered inside a grid row, so we let layout flow place it.
    position: "relative",
    left: `${sidebarOffsetPx}px`,
    bottom: "0px",
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
        // Scale to fill the full available width — height will overflow
        // below the frame which is fine (Mariam is a decorative bleed element).
        const widthScale = (mariamWidth - 2) / bbox.width;
        const scale = widthScale; // width-only — don't cap by height

        if (scale > 1.01 || scale < 0.99) {
          fontSize *= scale;
          textEl.setAttribute("font-size", `${fontSize}px`);
        }

        cachedSvgData = {
          fontSize,
          mariamWidth,
          mariamHeight,
          sidebarOffsetPx,
          bottomReservePx,
          portfolBottom: portfolRect.bottom,
          portfolLeft: portfolRect.left,
          portfolFontSize: parseFloat(window.getComputedStyle(portfolEl).fontSize),
          screenWidth,
          screenHeight,
          layoutVersion: MARIAM_LAYOUT_VERSION,
        };
        svgDataCalculated = true;

        requestAnimationFrame(() => {
          alignTextToBottom(textEl, mariamHeight, isMobile);
          // Extra rAF so isMariamReady fires after the browser has painted
          // the final SVG position — prevents dot landing in wrong spot on first load.
          requestAnimationFrame(() => onDone?.());
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
  const stripEl = document.querySelector("[data-hero-contact-strip]") as HTMLElement | null;
  const shouldReserveBottom =
    stripEl?.dataset.noBottomReserve !== "true";
  const measuredBottom =
    stripEl && shouldReserveBottom ? Math.ceil(stripEl.getBoundingClientRect().height) : 0;
  const fallbackBottom = shouldReserveBottom ? (data.bottomReservePx ?? 0) : 0;
  const bottomReservePx = measuredBottom > 0 ? measuredBottom : fallbackBottom;
  const sidebarOffsetPx = isMobile ? 0 : data.sidebarOffsetPx;

  svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
  svg.setAttribute("width", `${mariamWidth}px`);
  svg.setAttribute("height", `${mariamHeight}px`);
  Object.assign(svg.style, {
    // Rendered inside a grid row, so we let layout flow place it.
    position: "relative",
    left: `${sidebarOffsetPx}px`,
    bottom: "0px",
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
    requestAnimationFrame(() => alignTextToBottom(textEl as SVGTextElement, mariamHeight, isMobile));
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
      const stripEl = document.querySelector("[data-hero-contact-strip]") as HTMLElement | null;
      const curBottomReserve = stripEl ? Math.ceil(stripEl.getBoundingClientRect().height) : 0;
      const sidebarEl = !isMobile
        ? (document.querySelector('[data-app-sidebar="left"]') as HTMLElement | null)
        : null;
      const curSidebarOffset = !isMobile && sidebarEl ? sidebarEl.getBoundingClientRect().width : 0;
      const cacheBottom = cachedSvgData.bottomReservePx ?? 0;
      const cacheSidebar = cachedSvgData.sidebarOffsetPx ?? 0;
      if (
        cachedSvgData.layoutVersion === MARIAM_LAYOUT_VERSION &&
        Math.abs(screenH - cachedSvgData.screenHeight) <= 50 &&
        Math.abs(screenW - cachedSvgData.screenWidth) <= 50 &&
        Math.abs(curBottomReserve - cacheBottom) <= 4 &&
        Math.abs(curSidebarOffset - cacheSidebar) <= 2
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
        // Skip tiny changes on mobile (virtual keyboard, URL bar resize, etc.).
        // Uses a 100px delta threshold — coarse but sufficient for most devices.
        // NOTE: On some tablets a portrait↔landscape flip changes width by exactly
        // ~100px, which could cause this guard to skip a needed recalculation.
        // A more robust solution would check `screen.orientation` instead.
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
