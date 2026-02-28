import { useEffect, useState, type RefObject } from "react";
import gsap from "gsap";
import { TIMING } from "../constants";
import { checkIsMobile } from "./useIsMobile";
import type { PortfolioData } from "../types";

// ── Module-level cache ──────────────────────────────────────────────
let cachedData: PortfolioData | null = null;
let dataCalculated = false;
let everCompleted = false;

export function resetPortfolioCache() {
  cachedData = null;
  dataCalculated = false;
  everCompleted = false;
}

export function hasPortfolioEverCompleted() {
  return everCompleted;
}

// ── Helper: query header sub-elements ────────────────────────────────
function getHeaderElements(headerRef: RefObject<HTMLDivElement | null>) {
  const el = headerRef.current;
  if (!el) return null;
  const full = el.querySelector(".hero-cover-title-full") as HTMLElement | null;
  const portfol = el.querySelector(".hero-cover-title-portfol") as HTMLElement | null;
  const i = el.querySelector(".hero-cover-title-i") as HTMLElement | null;
  const o = el.querySelector(".hero-cover-title-o") as HTMLElement | null;
  const line = el.querySelector(".hero-cover-title-line") as HTMLElement | null;
  if (!full || !portfol || !i || !o || !line) return null;
  return { full, portfol, i, o, line };
}

// ── Restore the final state: line from O, I stays, O (letter) at end ─
function restoreFinalState(
  headerRef: RefObject<HTMLDivElement | null>,
  data: PortfolioData,
) {
  const els = getHeaderElements(headerRef);
  if (!els) return;
  const { full, portfol, i, o, line } = els;

  full.style.display = "none";
  portfol.style.display = "inline";
  i.style.display = "inline";
  o.style.display = "inline";
  line.style.display = "block";

  gsap.set([portfol, i, o], { display: "inline", opacity: 1, rotation: 0 });
  gsap.set(o, { x: data.oFinalX });
  Object.assign(line.style, {
    display: "block",
    opacity: "1",
    left: `${data.iOriginalPosition}px`,
    width: `${data.lineFinalWidth}px`,
  });
  gsap.set(line, { opacity: 1, width: data.lineFinalWidth });
}

// ── Hook ─────────────────────────────────────────────────────────────
export function usePortfolioAnimation(
  headerRef: RefObject<HTMLDivElement | null>,
  shouldAnimate: boolean,
  isActive: boolean,
  isMobile: boolean,
  onDragStart?: () => void,
): { isPortfolioAnimationComplete: boolean } {
  const [isComplete, setIsComplete] = useState(false);

  // ── Main animation effect ──────────────────────────────────────
  useEffect(() => {
    if (!headerRef.current) return;

    // ── Reset when hero becomes inactive ─────────────────────────
    if (!isActive) {
      setIsComplete(false);
      if (!everCompleted) {
        const els = getHeaderElements(headerRef);
        if (els) {
          gsap.set(els.full, { opacity: 1, display: "block" });
          gsap.set([els.portfol, els.i, els.o], { opacity: 0, display: "none", x: 0, y: 0, rotation: 0 });
          gsap.set(els.line, { opacity: 0, display: "none", width: 0 });
          els.line.style.left = "";
        }
      }
      return;
    }

    // ── Restore cached state when returning to hero ──────────────
    if (isActive && cachedData && dataCalculated && everCompleted) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restoreFinalState(headerRef, cachedData!);
          setIsComplete(true);
        });
      });
    }

    // ── Wait for dot animation to start ──────────────────────────
    if (!shouldAnimate) return;

    // ── Cached: jump to final state ──────────────────────────────
    if (cachedData && dataCalculated) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          restoreFinalState(headerRef, cachedData!);
          setIsComplete(true);
        });
      });
      return;
    }

    // ── Fresh animation ──────────────────────────────────────────
    setIsComplete(false);

    const els = getHeaderElements(headerRef);
    if (!els) return;
    const { full, portfol, i: iEl, o: oEl, line: lineEl } = els;

    // ── Mobile: skip animation — line from O, thread ball at end ───
    if (isMobile) {
      full.style.display = "none";
      portfol.style.display = "inline";
      portfol.style.opacity = "1";
      iEl.style.display = "inline";
      iEl.style.opacity = "1";
      oEl.style.display = "inline";
      oEl.style.opacity = "1";
      lineEl.style.display = "block";
      lineEl.style.opacity = "1";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const containerRect = headerRef.current?.getBoundingClientRect();
          if (!containerRect) return;

          const padding = window.innerWidth < 768 ? 16 : 32;
          const absoluteEnd = containerRect.width - padding;
          void portfol.offsetWidth;
          void oEl.offsetWidth;

          const oRect = oEl.getBoundingClientRect();
          const oWidth = oRect.width;
          const oFinalLeft = absoluteEnd - oWidth / 2;
          const oStartLeft = oRect.left - containerRect.left;
          const oFinalX = oFinalLeft - oStartLeft;
          const finalLineWidth = Math.max(0, oFinalLeft - oStartLeft - 8);

          gsap.set(oEl, { x: oFinalX, opacity: 1 });
          Object.assign(lineEl.style, {
            top: "50%",
            position: "absolute",
            left: `${oStartLeft}px`,
            width: `${finalLineWidth}px`,
            opacity: "1",
            display: "block",
            transform: "translateY(-50%)",
            zIndex: "1",
          });

          const portfolRect = portfol.getBoundingClientRect();
          cachedData = {
            portfolWidth: portfolRect.width,
            oFinalX,
            lineFinalWidth: finalLineWidth,
            iOriginalPosition: oStartLeft,
            oStartX: oStartLeft,
            iWidth: 0,
            containerWidth: containerRect.width,
          };
          dataCalculated = true;
          everCompleted = true;
          setIsComplete(true);
        });
      });
      return;
    }

    // ── Desktop: O and line revealed; expand immediately after step 1 ──
    let lineStartX = 0;
    let oFinalX = 0;
    let finalLineWidth = 0;

    const tl = gsap.timeline({ delay: 0 });

    // Step 1: Fade out full text, show PORTFOL + I + O (I stays as letter)
    tl.to(full, {
      opacity: 0,
      duration: TIMING.portfolioFade,
      ease: "power2.in",
      onComplete: () => {
        full.style.display = "none";
        portfol.style.display = "inline";
        iEl.style.display = "inline";
        oEl.style.display = "inline";
        lineEl.style.display = "none";
        gsap.set([portfol, iEl, oEl], { display: "inline", opacity: 1, rotation: 0 });
        gsap.set(oEl, { position: "static", x: 0 });
        gsap.set(lineEl, { display: "none", width: 0 });
      },
    });

    // Step 2: O and line ready; capture positions; expand immediately (one click total)
    tl.call(() => {
      const cRect = headerRef.current?.getBoundingClientRect();
      if (!cRect) return;

      void oEl.offsetWidth; // force reflow after step 1 display change
      const oRect = oEl.getBoundingClientRect();
      const oWidth = oRect.width;
      const padding = window.innerWidth < 768 ? 16 : 32;
      const absoluteEnd = cRect.width - padding;
      const oFinalLeft = absoluteEnd - oWidth / 2;
      const oStartLeft = oRect.left - cRect.left;

      lineStartX = oStartLeft;
      oFinalX = oFinalLeft - oStartLeft;
      finalLineWidth = Math.max(0, oFinalLeft - oStartLeft - 8);

      lineEl.style.display = "block";
      lineEl.style.left = `${lineStartX}px`;
      lineEl.style.width = "0px";
      lineEl.style.opacity = "1";
      gsap.set(lineEl, { opacity: 1, width: 0 });
      gsap.set(oEl, { x: 0 });

      const portfolRect = portfol.getBoundingClientRect();
      cachedData = {
        portfolWidth: portfolRect.width,
        oFinalX,
        lineFinalWidth: finalLineWidth,
        iOriginalPosition: lineStartX,
        oStartX: oStartLeft,
        iWidth: 0,
        containerWidth: cRect.width,
      };
      dataCalculated = true;
      everCompleted = true;

      onDragStart?.();
      oEl.style.pointerEvents = "none";
      oEl.style.cursor = "";

      // Expand immediately: animate O and line to final position
      const expandDuration = 1.6;
      const expandEase = "sine.inOut";
      gsap.to(oEl, { x: oFinalX, duration: expandDuration, ease: expandEase });
      gsap.to(lineEl, { width: finalLineWidth, duration: expandDuration, ease: expandEase, onComplete: () => {
        gsap.set(oEl, { x: oFinalX });
        lineEl.style.width = `${finalLineWidth}px`;
        gsap.set(lineEl, { width: finalLineWidth });
        setIsComplete(true);
      }});
    });

    // Resize handler — line from O start, O at end (thread ball)
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!everCompleted || !oEl || !lineEl) return;
        const cRect = headerRef.current?.getBoundingClientRect();
        if (!cRect) return;

        const padding = window.innerWidth < 768 ? 16 : 32;
        const absoluteEnd = cRect.width - padding;
        const oWidth = oEl.getBoundingClientRect().width;
        const oFinalLeft = absoluteEnd - oWidth / 2;

        const currentOGsapX = Number(gsap.getProperty(oEl, "x")) || 0;
        const currentOLeft = oEl.getBoundingClientRect().left - cRect.left;
        const lineStartX = currentOLeft - currentOGsapX;
        const oFinalX = oFinalLeft - lineStartX;
        const finalLineWidth = Math.max(0, oFinalLeft - lineStartX - 8);

        gsap.set(oEl, { x: oFinalX });
        lineEl.style.left = `${lineStartX}px`;
        gsap.set(lineEl, { width: finalLineWidth });

        if (cachedData) {
          cachedData = {
            ...cachedData,
            oFinalX,
            lineFinalWidth: finalLineWidth,
            iOriginalPosition: lineStartX,
            oStartX: lineStartX,
            containerWidth: cRect.width,
          };
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tl.kill();
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isActive, shouldAnimate, isMobile, headerRef]);

  return { isPortfolioAnimationComplete: isComplete };
}
