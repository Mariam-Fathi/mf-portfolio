import { useEffect, useState, type RefObject } from "react";
import gsap from "gsap";
import { COLORS, TIMING } from "../constants";
import { checkIsMobile } from "./useIsMobile";
import type { DotPositions } from "../types";

// ── Module-level cache (survives unmount / remount) ─────────────────
let cachedPositions: DotPositions | null = null;
let positionsCalculated = false;
let animationEverCompleted = false;

export function resetDotCache() {
  cachedPositions = null;
  positionsCalculated = false;
  animationEverCompleted = false;
}

export function hasDotAnimationEverCompleted() {
  return animationEverCompleted;
}

// ── Calculate dot positions from SVG tspan elements ──────────────────
function calculatePositions(
  svgI: SVGTSpanElement,
  svgA2: SVGTSpanElement,
  svgM2: SVGTSpanElement,
): DotPositions {
  const iRect = svgI.getBoundingClientRect();
  const a2Rect = svgA2.getBoundingClientRect();
  const m2Rect = svgM2.getBoundingClientRect();

  const isMobile = checkIsMobile();
  // Use height (proportional to font size) rather than width (narrow for "ı")
  const baseDotSize = iRect.height * 0.135;
  const dotSize = isMobile ? baseDotSize * 0.6 : baseDotSize;

  return {
    iScreenX: iRect.left + iRect.width / 2,
    iScreenY: iRect.top + iRect.height * 0.19,
    iCenterY: iRect.top + iRect.height / 2,
    a2ScreenX: a2Rect.left + a2Rect.width / 2,
    a2ScreenY: a2Rect.top + a2Rect.height / 2,
    m2ScreenX: m2Rect.left + m2Rect.width / 2,
    m2ScreenY: m2Rect.top + m2Rect.height / 2,
    dotSize,
    finalDotSize: dotSize,
  };
}

// ── Place dot at its resting position on "ı" ─────────────────────────
function setDotAtFinal(dot: HTMLDivElement, pos: DotPositions) {
  // finalDotSize is already mobile-adjusted from calculatePositions
  const size = pos.finalDotSize;

  Object.assign(dot.style, {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundColor: COLORS.accent,
    position: "fixed",
    top: "0px",
    left: "0px",
    opacity: "1",
    display: "block",
    visibility: "visible",
    pointerEvents: "none",
    transformOrigin: "center center",
  });

  gsap.set(dot, {
    x: pos.iScreenX - size / 2,
    y: pos.iScreenY,
    scale: 1,
    opacity: 1,
  });
}

// ── Color the "iam" letters in accent color ──────────────────────────
function colorLetters(
  svgI: SVGTSpanElement | null,
  svgA2: SVGTSpanElement | null,
  svgM2: SVGTSpanElement | null,
) {
  [svgI, svgA2, svgM2].forEach((el) => {
    if (el) gsap.set(el, { fill: COLORS.accent });
  });
}

// ── Build the bouncing-dot GSAP timeline ─────────────────────────────
// Narrative: dot starts on "ı", wiggles, breaks free across "a" & "m",
// falls off-screen; a new dot drops from above, lands on "ı", rests,
// then fades out — triggering the "software engineer" reveal.
//
// Physics model: gravity easing (power2.in = falling acceleration,
// power2/3.out = rising deceleration), volume-preserving squash/stretch,
// 3 diminishing bounces per landing, true parabolic arcs via separate
// x (linear) and y (gravity) tweens.
function buildDotTimeline(
  dot: HTMLDivElement,
  pos: DotPositions,
  svgI: SVGTSpanElement,
  svgA2: SVGTSpanElement,
  svgM2: SVGTSpanElement,
  onComplete: () => void,
  skipIntro = false,
): gsap.core.Timeline {
  const { iScreenX, iScreenY, a2ScreenX, a2ScreenY, m2ScreenX, m2ScreenY, finalDotSize } = pos;
  const d = finalDotSize;
  const half = d / 2;

  const dotBase = COLORS.accent;      // #6A0610
  const dotMotion = "#882430";        // slightly lighter during fast arcs
  const dotLand = "#7A1822";          // slightly lighter during impacts
  const dotGhost = "#F2DDD8";         // very light for ghost exit
  const dotFallLight = "#E8C4BC";     // light during new-dot fall
  const dotFallMid = "#D09890";       // mid during new-dot bounce

  if (!skipIntro) {
    Object.assign(dot.style, {
      width: `${d}px`,
      height: `${d}px`,
      borderRadius: "50%",
      backgroundColor: COLORS.primary,
      position: "fixed",
      top: "0px",
      left: "0px",
      opacity: "1",
      display: "block",
      visibility: "visible",
      pointerEvents: "none",
      transformOrigin: "center center",
    });
    gsap.set(dot, {
      x: iScreenX - half,
      y: iScreenY,
      rotation: 0,
      scale: 1,
      opacity: 1,
    });
  } else {
    dot.style.pointerEvents = "none";
  }

  const tl = gsap.timeline({ paused: true });

  if (!skipIntro) {
    tl.to(dot, { duration: 0.6 });

    tl.to(dot, {
      keyframes: [
        { y: iScreenY - 4, scaleY: 1.04, duration: 0.1, ease: "power2.out" },
        { y: iScreenY, scaleY: 0.96, duration: 0.08, ease: "power2.in" },
        { scaleY: 1, duration: 0.05, ease: "power1.out" },
      ],
    });
  } else {
    tl.to(dot, {
      keyframes: [
        { y: iScreenY - 5, scaleY: 1.06, scaleX: 0.94, duration: 0.08, ease: "power3.out" },
        { y: iScreenY + 2, scaleY: 0.92, scaleX: 1.08, duration: 0.06, ease: "power3.in" },
        { y: iScreenY - 3, scaleY: 1.03, scaleX: 0.97, duration: 0.06, ease: "power2.out" },
        { y: iScreenY, scaleY: 1, scaleX: 1, duration: 0.05, ease: "power1.out" },
      ],
    });
    tl.to(dot, {
      backgroundColor: COLORS.accent,
      duration: 0.15,
      ease: "power2.inOut",
    });
  }

  // ── Break free + parabolic arc to "a" ────────────────────────────
  // Parabolic path: x linear, y = start + dy·t − 4·h·t·(1−t)
  const iaH = 210;
  const iaDx = a2ScreenX - iScreenX;
  const iaDy = a2ScreenY - iScreenY;
  const iaX = (t: number) => iScreenX + iaDx * t - half;
  const iaY = (t: number) => iScreenY + iaDy * t - iaH * 4 * t * (1 - t);

  // Anticipation squash (on ground, before flight)
  tl.to(dot, {
    keyframes: [
      { y: iScreenY + 5, scaleX: 1.25, scaleY: 0.75, duration: 0.19, ease: "power2.in" },
      { y: iScreenY + 7, scaleX: 1.35, scaleY: 0.65, duration: 0.08, ease: "power1.in" },
    ],
  });

  // Full ballistic arc from "ı" to "a"
  tl.to(dot, {
    keyframes: [
      { x: iaX(0.08), y: iaY(0.08), scaleY: 1.2, scaleX: 0.84, backgroundColor: dotLand, duration: 0.1, ease: "power2.out" },
      { x: iaX(0.18), y: iaY(0.18), scaleY: 1.12, scaleX: 0.9, backgroundColor: dotMotion, duration: 0.11, ease: "sine.out" },
      { x: iaX(0.3), y: iaY(0.3), scaleY: 1.05, scaleX: 0.96, duration: 0.11, ease: "sine.out" },
      { x: iaX(0.42), y: iaY(0.42), scaleY: 1.01, scaleX: 0.99, backgroundColor: dotBase, duration: 0.1, ease: "sine.inOut" },
      { x: iaX(0.5), y: iaY(0.5), scaleY: 1, scaleX: 1, duration: 0.1, ease: "none" },
      { x: iaX(0.58), y: iaY(0.58), scaleY: 1.01, scaleX: 0.99, duration: 0.1, ease: "sine.inOut" },
      { x: iaX(0.7), y: iaY(0.7), scaleY: 1.05, scaleX: 0.96, backgroundColor: dotMotion, duration: 0.1, ease: "sine.in" },
      { x: iaX(0.82), y: iaY(0.82), scaleY: 1.1, scaleX: 0.92, duration: 0.11, ease: "power1.in" },
      { x: iaX(0.93), y: iaY(0.93), scaleY: 1.16, scaleX: 0.87, duration: 0.1, ease: "power1.in" },
      { x: a2ScreenX - half, y: a2ScreenY, scaleY: 1.2, scaleX: 0.84, duration: 0.08, ease: "power2.in" },
    ],
  });

  // ── Land on "a": reactive bounce — surface absorbs then fires ────
  // The "a" acts like a trampoline: deep compression stores energy,
  // then the surface launches the dot toward "m" with MORE force.
  tl.to(dot, {
    keyframes: [
      // Impact — surface absorbs kinetic energy
      {
        scaleY: 0.55, scaleX: 1.45, backgroundColor: dotLand, duration: 0.06, ease: "power3.in",
        onComplete: () => { gsap.to(svgA2, { fill: COLORS.accent, duration: 0.35, ease: "power2.out" }); },
      },
      // Maximum compression — surface fully loaded, slight sink
      { y: a2ScreenY + 5, scaleY: 0.45, scaleX: 1.55, duration: 0.08, ease: "power1.in" },
      // Surface fires back — explosive upward stretch into launch
      { y: a2ScreenY - 25, scaleY: 1.4, scaleX: 0.72, backgroundColor: dotMotion, duration: 0.1, ease: "power3.out" },
    ],
  });

  // ── Parabolic arc from "a" to "m" — powered by surface energy ───
  // Higher arc (260 vs 210) — the "a" surface gave the dot extra energy
  const amH = 260;
  const amDx = m2ScreenX - a2ScreenX;
  const amDy = m2ScreenY - a2ScreenY;
  const amX = (t: number) => a2ScreenX + amDx * t - half;
  const amY = (t: number) => a2ScreenY + amDy * t - amH * 4 * t * (1 - t);

  // Immediate arc — no pause, the surface energy propels directly
  tl.to(dot, {
    keyframes: [
      { x: amX(0.06), y: amY(0.06), scaleY: 1.3, scaleX: 0.78, duration: 0.06, ease: "power3.out" },
      { x: amX(0.14), y: amY(0.14), scaleY: 1.18, scaleX: 0.86, duration: 0.08, ease: "power2.out" },
      { x: amX(0.24), y: amY(0.24), scaleY: 1.08, scaleX: 0.93, duration: 0.09, ease: "sine.out" },
      { x: amX(0.36), y: amY(0.36), scaleY: 1.02, scaleX: 0.98, backgroundColor: dotBase, duration: 0.1, ease: "sine.out" },
      { x: amX(0.48), y: amY(0.48), scaleY: 1, scaleX: 1, duration: 0.09, ease: "none" },
      { x: amX(0.58), y: amY(0.58), scaleY: 1, scaleX: 1, duration: 0.09, ease: "none" },
      { x: amX(0.68), y: amY(0.68), scaleY: 1.03, scaleX: 0.97, backgroundColor: dotMotion, duration: 0.09, ease: "sine.in" },
      { x: amX(0.78), y: amY(0.78), scaleY: 1.08, scaleX: 0.93, duration: 0.09, ease: "power1.in" },
      { x: amX(0.87), y: amY(0.87), scaleY: 1.14, scaleX: 0.88, duration: 0.08, ease: "power1.in" },
      { x: amX(0.94), y: amY(0.94), scaleY: 1.2, scaleX: 0.84, duration: 0.07, ease: "power2.in" },
      { x: m2ScreenX - half, y: m2ScreenY, scaleY: 1.25, scaleX: 0.82, duration: 0.06, ease: "power2.in" },
    ],
  });

  // ── Land on "m": impact + immediate fall off ────────────────────
  tl.to(dot, {
    keyframes: [
      {
        scaleY: 0.6, scaleX: 1.35, backgroundColor: dotLand, duration: 0.05, ease: "power3.in",
        onComplete: () => { gsap.to(svgM2, { fill: COLORS.accent, duration: 0.35, ease: "power2.out" }); },
      },
      // Brief compression — surface doesn't hold, dot skids off
      { y: m2ScreenY + 3, scaleY: 0.5, scaleX: 1.45, duration: 0.06, ease: "power1.in" },
      // Weak rebound — not enough grip to stay
      { y: m2ScreenY - 12, scaleY: 1.15, scaleX: 0.88, backgroundColor: dotGhost, duration: 0.1, ease: "power2.out" },
    ],
  });

  // ── Fall off screen — continuous from the weak rebound ─────────
  tl.to(dot, {
    keyframes: [
      { y: m2ScreenY - 14, scaleY: 1, scaleX: 1, duration: 0.05, ease: "none" },
      { y: window.innerHeight + 100, scaleY: 1.2, scaleX: 0.84, opacity: 0, duration: 0.4, ease: "power2.in" },
    ],
  });

  tl.set(dot, { display: "none" }, "+=0.3");

  // ── New dot — teleport well above viewport ────────────────────
  tl.set(dot, {
    x: iScreenX - half,
    y: -(d + 100),
    opacity: 1,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    backgroundColor: dotBase,
    display: "block",
    visibility: "visible",
  });

  tl.to(dot, {
    keyframes: [
      { x: iScreenX - half - 5, duration: 0.2, ease: "power1.inOut" },
      { x: iScreenX - half + 5, duration: 0.2, ease: "power1.inOut" },
      { x: iScreenX - half, duration: 0.2, ease: "power1.inOut" },
    ],
  });

  tl.call(() => onComplete());

  // ── Drop onto "ı" with colour transitions ──────────────────────
  tl.to(dot, {
    keyframes: [
      {
        y: iScreenY + 60, backgroundColor: dotFallLight, duration: TIMING.dotFall, ease: "power2.in",
        onComplete: () => { gsap.to(svgI, { fill: COLORS.accent, duration: 0.25, ease: "power2.out" }); },
      },
      { y: iScreenY + 30, scaleY: 0.7, backgroundColor: dotFallMid, duration: TIMING.dotBounce, ease: "power2.out" },
      { y: iScreenY, scaleY: 1, backgroundColor: dotBase, duration: TIMING.dotSquash, ease: "power2.out" },
    ],
  });

  // ── Lock at final position on "ı" ─────────────────────────────
  tl.to(dot, {
    opacity: 1,
    scale: 1,
    duration: 0,
    ease: "none",
    onComplete: () => {
      setDotAtFinal(dot, pos);
      animationEverCompleted = true;
    },
  }, "+=0.5");

  return tl;
}

// ── Hook ─────────────────────────────────────────────────────────────
export function useDotAnimation(
  svgRef: RefObject<SVGSVGElement | null>,
  svgIRef: RefObject<SVGTSpanElement | null>,
  svgA2Ref: RefObject<SVGTSpanElement | null>,
  svgM2Ref: RefObject<SVGTSpanElement | null>,
  dotRef: RefObject<HTMLDivElement | null>,
  isActive: boolean,
  isMariamReady: boolean,
  isMobile: boolean,
  shouldAnimate: boolean,
): { isDotAnimationStarted: boolean; isDotAnimationComplete: boolean } {
  const [isDotStarted, setIsDotStarted] = useState(false);
  const [isDotComplete, setIsDotComplete] = useState(false);

  // ── Hide dots when hero is inactive ────────────────────────────
  useEffect(() => {
    if (!isActive && dotRef.current) {
      gsap.killTweensOf(dotRef.current);
      Object.assign(dotRef.current.style, {
        display: "none",
        opacity: "0",
        visibility: "hidden",
      });
    }
  }, [isActive, dotRef]);

  // ── Main animation trigger ─────────────────────────────────────
  useEffect(() => {
    if (!isActive || !isMariamReady) return;
    const svg = svgRef.current;
    const svgI = svgIRef.current;
    const svgA2 = svgA2Ref.current;
    const svgM2 = svgM2Ref.current;
    const dot = dotRef.current;
    if (!svg || !svgI || !svgA2 || !svgM2 || !dot) return;

    // ── Restore from cache (skip animation replay) ──────────────
    if (cachedPositions && positionsCalculated) {
      setDotAtFinal(dot, cachedPositions);
      // Fade in synced with the hero blur entrance on return visits
      gsap.set(dot, { opacity: 0, filter: "blur(15px)" });
      gsap.to(dot, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
      });
      colorLetters(svgI, svgA2, svgM2);
      setIsDotComplete(true);
      setIsDotStarted(true);
      return;
    }

    // ── Wait for user click ─────────────────────────────────────
    if (!shouldAnimate) return;

    // ── Calculate fresh positions ────────────────────────────────
    const pos = calculatePositions(svgI, svgA2, svgM2);
    cachedPositions = pos;
    positionsCalculated = true;

    // ── Mobile: skip to final state ──────────────────────────────
    if (isMobile) {
      const tid = setTimeout(() => {
        setDotAtFinal(dot, pos);
        colorLetters(svgI, svgA2, svgM2);
        setIsDotComplete(true);
        setIsDotStarted(true);
        animationEverCompleted = true;
      }, 200);
      return () => clearTimeout(tid);
    }

    // ── Desktop: play animation ──────────────────────────────────
    // If the dot is already visible (pre-shown as click target), skip
    // the intro hold/wiggle and blur — jump straight into the action.
    const dotAlreadyVisible =
      dot.style.display === "block" && parseFloat(dot.style.opacity || "0") > 0;
    const startDelay = dotAlreadyVisible ? 0 : 200;

    let activeTl: gsap.core.Timeline | null = null;

    const tid = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activeTl = buildDotTimeline(dot, pos, svgI, svgA2, svgM2, () => {
            setIsDotComplete(true);
          }, dotAlreadyVisible);
          if (!dotAlreadyVisible) {
            gsap.set(dot, { opacity: 0, filter: "blur(15px)" });
            gsap.to(dot, {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
            });
          }
          activeTl.play();
          setIsDotStarted(true);
        });
      });
    }, startDelay);

    return () => {
      clearTimeout(tid);
      if (activeTl) {
        activeTl.kill();
        activeTl = null;
      }
    };
  }, [isActive, isMariamReady, isMobile, shouldAnimate, svgRef, svgIRef, svgA2Ref, svgM2Ref, dotRef]);

  // ── Resize handler — recalculate positions after Mariam re-layouts ──
  useEffect(() => {
    if (!isActive || !isMariamReady) return;

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      // Wait for Mariam's 150ms debounce + 3-frame rAF chain to finish
      resizeTimer = setTimeout(() => {
        positionsCalculated = false;
        cachedPositions = null;

        if (animationEverCompleted && svgIRef.current && svgA2Ref.current && svgM2Ref.current && dotRef.current) {
          requestAnimationFrame(() => requestAnimationFrame(() => {
            const pos = calculatePositions(svgIRef.current!, svgA2Ref.current!, svgM2Ref.current!);
            cachedPositions = pos;
            positionsCalculated = true;
            setDotAtFinal(dotRef.current!, pos);
          }));
        }
      }, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isActive, isMariamReady, svgIRef, svgA2Ref, svgM2Ref, dotRef]);

  return { isDotAnimationStarted: isDotStarted, isDotAnimationComplete: isDotComplete };
}
