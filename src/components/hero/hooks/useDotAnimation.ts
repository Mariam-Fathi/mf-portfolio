import { useEffect, useState, useCallback, type RefObject } from "react";
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

// ── Measure an individual SVG letter for positioning ─────────────────
function measureLetterPosition(
  svg: SVGSVGElement,
  letter: string,
  index: number,
  textX: number,
  textY: number,
  fontSize: number,
  fontFamily: string,
  dominantBaseline: string,
) {
  const letters = ["M", "a", "r", "i", "a", "m"];
  let cumulativeX = 0;

  for (let i = 0; i < index; i++) {
    const temp = document.createElementNS("http://www.w3.org/2000/svg", "text");
    temp.setAttribute("font-size", `${fontSize}px`);
    temp.setAttribute("font-family", fontFamily);
    temp.setAttribute("font-weight", "700");
    temp.setAttribute("letter-spacing", "0");
    temp.setAttribute("x", textX.toString());
    temp.setAttribute("y", textY.toString());
    temp.setAttribute("dominant-baseline", dominantBaseline);
    temp.setAttribute("text-anchor", "start");
    temp.textContent = letters[i];
    temp.style.visibility = "hidden";
    svg.appendChild(temp);
    cumulativeX += temp.getBBox().width;
    svg.removeChild(temp);
  }

  return { x: textX + cumulativeX };
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
  const baseDotSize = Math.max(iRect.width * 0.5, 64);
  const dotSize = isMobile ? Math.min(baseDotSize * 0.6, 40) : baseDotSize;

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
  const isMobile = checkIsMobile();
  const size = isMobile ? Math.min(pos.finalDotSize * 0.6, 40) : pos.finalDotSize;

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
function buildDotTimeline(
  dot: HTMLDivElement,
  pos: DotPositions,
  svgI: SVGTSpanElement,
  svgA2: SVGTSpanElement,
  svgM2: SVGTSpanElement,
  onComplete: () => void,
): gsap.core.Timeline {
  const { iScreenX, iScreenY, a2ScreenX, a2ScreenY, m2ScreenX, m2ScreenY, finalDotSize } = pos;
  const d = finalDotSize;

  // Subtle colour variants for organic visual motion feedback
  const dotBase = COLORS.accent;      // #6A0610
  const dotMotion = "#882430";        // slightly lighter during fast arcs
  const dotLand = "#7A1822";          // slightly lighter during impacts
  const dotGhost = "#F2DDD8";         // very light for ghost exit
  const dotFallLight = "#E8C4BC";     // light during new-dot fall
  const dotFallMid = "#D09890";       // mid during new-dot bounce

  // Prepare the dot element — starts in the primary (text) colour
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

  // Start ON the "ı" position (the dot is already sitting on the letter)
  gsap.set(dot, {
    x: iScreenX - d / 2,
    y: iScreenY,
    rotation: 0,
    scale: 1,
    opacity: 1,
  });

  // Single flat timeline — no nesting, no immediateRender (matches old code)
  const tl = gsap.timeline({ paused: true });

  // ── Phase 1: Hold steady on "ı" in original colour ──────────────
  tl.to(dot, { duration: 0.6 });

  // ── Phase 2: Wiggle on "ı" (elastic snap creates spring wobble) ──
  tl.to(dot, {
    keyframes: [
      { x: iScreenX - d / 2, duration: 0.15, ease: "elastic" },
    ],
  });

  // ── Phase 3: Break free — compress then explosive jump to "a" ──
  tl.to(dot, {
    keyframes: [
      // Compression — building energy (still original colour)
      { scaleX: 1.2, scaleY: 0.7, duration: 0.2, ease: "power2.out" },
      // Explosive launch upward — colour shifts to accent mid-air
      { y: iScreenY - 80, scaleY: 0.9, scaleX: 1.1, duration: TIMING.dotJump, ease: "power4.out" },
      // Arc smoothly to "a" position — now fully accent
      { x: a2ScreenX - d / 2, y: a2ScreenY - 50, scaleY: 0.75, scaleX: 1, backgroundColor: dotBase, duration: TIMING.dotArc, ease: "sine.inOut" },
    ],
  });

  // ── Phase 3: Land on "a" ───────────────────────────────────────
  tl.to(dot, { y: a2ScreenY - 70, duration: 0.2, ease: "sine.inOut" });
  tl.to(dot, { y: a2ScreenY + 10, scaleY: 1.2, backgroundColor: dotLand, duration: 0.25, ease: "power2.in" });
  tl.to(dot, {
    y: a2ScreenY, scaleY: 0.8, backgroundColor: dotBase, duration: 0.15, ease: "bounce.out",
    onComplete: () => gsap.to(svgA2, { fill: COLORS.accent, duration: 0.3, ease: "power2.out" }),
  });
  tl.to(dot, { scaleY: 1, duration: 0.1 });

  // ── Phase 4: Jump to "m" ──────────────────────────────────────
  tl.to(dot, {
    keyframes: [
      { x: m2ScreenX - d / 2, y: m2ScreenY - 100, scaleY: 0.75, backgroundColor: dotMotion, duration: 0.3, ease: "power2.out" },
      { y: m2ScreenY - 120, duration: 0.2, ease: "sine.inOut" },
      { y: m2ScreenY + 20, scaleY: 1.2, backgroundColor: dotLand, duration: 0.25, ease: "power2.in" },
      {
        y: m2ScreenY, scaleY: 0.8, backgroundColor: dotBase, duration: 0.15, ease: "bounce.out",
        onComplete: () => gsap.to(svgM2, { fill: COLORS.accent, duration: 0.3, ease: "power2.out" }),
      },
      { scaleY: 1, duration: 0.1 },
    ],
  }, "+=0.3");

  // ── Phase 5: Rise then fall off screen (ghost colour fade) ─────
  tl.to(dot, {
    keyframes: [
      { backgroundColor: dotGhost, y: m2ScreenY - 40, scaleY: 0.75, duration: 0.2, ease: "power2.out" },
      { y: window.innerHeight + 100, scaleY: 1.2, opacity: 0, duration: 0.5, ease: "power2.in" },
    ],
  }, "+=0.3");

  // Hide original dot and brief pause before new dot
  tl.set(dot, { display: "none" }, "+=0.3");

  // ── Phase 6: New dot — teleport well above viewport ────────────
  tl.set(dot, {
    x: iScreenX - d / 2,
    y: -(d + 100),
    opacity: 1,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    backgroundColor: dotBase,
    display: "block",
    visibility: "visible",
  });

  // Wiggle before dropping (same pattern as old code's finalDot)
  tl.to(dot, {
    keyframes: [
      { x: iScreenX - d / 2 - 5, duration: 0.2, ease: "power1.inOut" },
      { x: iScreenX - d / 2 + 5, duration: 0.2, ease: "power1.inOut" },
      { x: iScreenX - d / 2, duration: 0.2, ease: "power1.inOut" },
    ],
  });

  // Signal engineer text to start (synced with the drop, not after)
  tl.call(() => onComplete());

  // Drop and land on "ı" with colour transitions
  tl.to(dot, {
    keyframes: [
      { y: iScreenY + 60, backgroundColor: dotFallLight, duration: TIMING.dotFall, ease: "power2.in" },
      { y: iScreenY + 30, scaleY: 0.7, backgroundColor: dotFallMid, duration: TIMING.dotBounce, ease: "power2.out" },
      {
        y: iScreenY, scaleY: 1, backgroundColor: dotBase, duration: TIMING.dotSquash, ease: "power2.out",
        onComplete: () => gsap.to(svgI, { fill: COLORS.accent, duration: 0.3, ease: "power2.out" }),
      },
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
      // Fade in to match the hero blur entrance on return visits
      gsap.set(dot, { opacity: 0, filter: "blur(15px)" });
      gsap.to(dot, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });
      colorLetters(svgI, svgA2, svgM2);
      setIsDotComplete(true);
      setIsDotStarted(true);
      return;
    }

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
    const tid = setTimeout(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const tl = buildDotTimeline(dot, pos, svgI, svgA2, svgM2, () => {
            setIsDotComplete(true);
          });
          // Match the hero section's blur-to-clear entrance so the
          // dot (a portal on document.body) doesn't pop in abruptly.
          // No extra delay — the surrounding setTimeout(200) already
          // accounts for the same ~0.2 s offset the hero uses.
          gsap.set(dot, { opacity: 0, filter: "blur(15px)" });
          gsap.to(dot, {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          });
          setTimeout(() => {
            tl.play();
            setIsDotStarted(true);
          }, 100);
        });
      });
    }, 200);

    return () => clearTimeout(tid);
  }, [isActive, isMariamReady, isMobile, svgRef, svgIRef, svgA2Ref, svgM2Ref, dotRef]);

  // ── Resize handler — recalculate positions ─────────────────────
  useEffect(() => {
    if (!isActive || !isMariamReady) return;

    const handleResize = () => {
      positionsCalculated = false;
      cachedPositions = null;

      if (animationEverCompleted && svgIRef.current && svgA2Ref.current && svgM2Ref.current && dotRef.current) {
        requestAnimationFrame(() => {
          const pos = calculatePositions(svgIRef.current!, svgA2Ref.current!, svgM2Ref.current!);
          cachedPositions = pos;
          positionsCalculated = true;
          setDotAtFinal(dotRef.current!, pos);
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isActive, isMariamReady, svgIRef, svgA2Ref, svgM2Ref, dotRef]);

  return { isDotAnimationStarted: isDotStarted, isDotAnimationComplete: isDotComplete };
}
