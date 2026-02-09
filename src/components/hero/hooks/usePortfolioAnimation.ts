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

// ── Restore the final state of the PORTFOLIO animation ───────────────
function restoreFinalState(
  headerRef: RefObject<HTMLDivElement | null>,
  data: PortfolioData,
) {
  const els = getHeaderElements(headerRef);
  if (!els) return;
  const { full, portfol, i, o, line } = els;

  full.style.display = "none";
  portfol.style.display = "inline";
  i.style.display = "none";
  o.style.display = "inline";
  line.style.display = "block";

  gsap.set([portfol, o], { display: "inline", opacity: 1 });
  gsap.set(i, { display: "none", opacity: 0, rotation: 90 });
  gsap.set(o, { x: data.oFinalX });
  gsap.set(line, {
    display: "block",
    opacity: 1,
    x: data.iOriginalPosition,
    width: data.lineFinalWidth,
    transformOrigin: "left center",
  });
}

// ── Hook ─────────────────────────────────────────────────────────────
export function usePortfolioAnimation(
  headerRef: RefObject<HTMLDivElement | null>,
  isDotAnimationStarted: boolean,
  isActive: boolean,
  isMobile: boolean,
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
          gsap.set([els.portfol, els.i, els.o], { opacity: 0, display: "none", x: 0, rotation: 0 });
          gsap.set(els.line, { opacity: 0, display: "none", width: 0, x: 0 });
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
    if (!isDotAnimationStarted) return;

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

    // ── Mobile: skip animation ───────────────────────────────────
    if (isMobile) {
      full.style.display = "none";
      portfol.style.display = "inline";
      portfol.style.opacity = "1";
      iEl.style.display = "none";
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

          const portfolRect = portfol.getBoundingClientRect();
          const lEnd = portfolRect.right - containerRect.left;
          const lineStartX = lEnd + 8;
          const lineEndPos = oFinalLeft - 8;
          const finalLineWidth = Math.max(0, lineEndPos - lineStartX);

          const oStartX = oRect.left - containerRect.left;
          const oFinalX = oFinalLeft - oStartX;

          gsap.set(oEl, { x: oFinalX, opacity: 1 });
          Object.assign(lineEl.style, {
            top: "50%",
            position: "absolute",
            left: `${lineStartX}px`,
            width: `${finalLineWidth}px`,
            opacity: "1",
            display: "block",
            transform: "translateY(-50%)",
            zIndex: "1",
          });

          // Cache data
          const pWidth = portfolRect.width;
          cachedData = {
            portfolWidth: pWidth,
            oFinalX,
            lineFinalWidth: finalLineWidth,
            iOriginalPosition: lineStartX,
            oStartX,
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

    // ── Desktop animation ────────────────────────────────────────
    let iOriginalPosition = 0;
    let oStartX = 0;
    let iWidth = 0;

    const tl = gsap.timeline({ delay: 0 });

    // Step 1: Fade out full text, show split parts
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
        gsap.set([portfol, iEl, oEl], { display: "inline", opacity: 1 });
        gsap.set(lineEl, { display: "none", width: 0, transformOrigin: "left center" });
        gsap.set(oEl, { position: "static", x: 0 });
        void iEl.offsetWidth;
        iWidth = iEl.getBoundingClientRect().width;
      },
    });

    // Step 2: Capture O start, anticipation + rotate I, push O
    tl.call(() => {
      const oRect = oEl.getBoundingClientRect();
      const cRect = headerRef.current?.getBoundingClientRect();
      if (cRect) oStartX = oRect.left - cRect.left;
    });

    // Anticipation: subtle squash-stretch wind-up (synced with dot wiggle)
    tl.to(iEl, {
      scaleX: 0.92,
      scaleY: 1.08,
      duration: 0.12,
      ease: "power2.out",
      delay: 0.35,
    });

    // Rotation with organic overshoot + O pushes simultaneously
    tl.to(iEl, {
      scaleX: 1,
      scaleY: 1,
      rotation: 90,
      duration: TIMING.portfolioRotate,
      ease: "back.out(1.4)",
      transformOrigin: "center center",
      onStart: () => {
        if (iWidth > 0) {
          gsap.to(oEl, {
            x: iWidth,
            duration: TIMING.portfolioRotate * 0.85,
            ease: "power3.inOut",
          });
        }
      },
    });

    // Step 3: I fades + morphs into line (crossfade)
    tl.to(iEl, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onStart: () => {
        const iRect = iEl.getBoundingClientRect();
        const cRect = headerRef.current?.getBoundingClientRect();
        if (cRect) iOriginalPosition = iRect.left - cRect.left;
      },
      onComplete: () => {
        iEl.style.display = "none";
        lineEl.style.display = "block";
        gsap.set(lineEl, { opacity: 0, x: iOriginalPosition, width: 0, transformOrigin: "left center" });
        gsap.to(lineEl, { opacity: 1, duration: 0.2, ease: "power2.out" });
      },
    }, "-=0.4");

    // Step 4: Expand line + slide O to end
    tl.call(() => {
      requestAnimationFrame(() => {
        const cRect = headerRef.current?.getBoundingClientRect();
        if (!cRect) return;

        const oRect = oEl.getBoundingClientRect();
        const oWidth = oRect.width;
        const padding = window.innerWidth < 768 ? 16 : 32;
        const absoluteEnd = cRect.width - padding;
        const oFinalLeft = absoluteEnd - oWidth / 2;

        const portfolRect = portfol.getBoundingClientRect();
        const pWidth = portfolRect.width;
        const lEnd = portfolRect.right - cRect.left;
        const gap = Math.max(0, iOriginalPosition - lEnd);

        const lineEndPos = oFinalLeft - gap - 10;
        const oFinalX = oFinalLeft - oStartX + 40;
        const finalLineWidth = Math.max(0, Math.min(lineEndPos - iOriginalPosition, cRect.width - iOriginalPosition));

        cachedData = {
          portfolWidth: pWidth,
          oFinalX,
          lineFinalWidth: finalLineWidth,
          iOriginalPosition,
          oStartX,
          iWidth,
          containerWidth: cRect.width,
        };
        dataCalculated = true;

        gsap.to(oEl, {
          x: oFinalX,
          duration: 2.2,
          ease: "expo.out",
          onComplete: () => {
            everCompleted = true;
            setIsComplete(true);
          },
        });
        gsap.to(lineEl, {
          width: finalLineWidth,
          duration: 2.2,
          ease: "expo.out",
        });
      });
    });

    // Resize handler
    let animationDone = false;
    const onComplete = () => { animationDone = true; };
    const handleResize = () => {
      if (animationDone && oEl && lineEl) {
        const cRect = headerRef.current?.getBoundingClientRect();
        if (!cRect) return;
        const padding = window.innerWidth < 768 ? 16 : 32;
        const newEnd = cRect.width - padding;
        gsap.set(oEl, { x: newEnd });
        const lineStart = iOriginalPosition || (gsap.getProperty(lineEl, "x") as number);
        gsap.set(lineEl, { width: Math.max(0, newEnd - lineStart) });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      tl.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, [isActive, isDotAnimationStarted, isMobile, headerRef]);

  return { isPortfolioAnimationComplete: isComplete };
}
