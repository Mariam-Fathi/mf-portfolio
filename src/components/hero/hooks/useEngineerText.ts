import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { checkIsMobile } from "./useIsMobile";

// ── Module-level cache (survives unmount / remount) ─────────────────
let engineerTextEverShown = false;


/**
 * Animates the "Software Engineer" text with a write-on (clip reveal) effect
 * and positions it dynamically above the "am" portion of "Mariam".
 * Reveal starts when the dot lands on "ı" (cause: the fall triggers the appearance).
 *
 * On mobile the final state is applied immediately — no animation.
 * On subsequent visits (cache hit), the final state is restored instantly.
 */
export function useEngineerText(
  engineerRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  svgIRef: RefObject<SVGTSpanElement | null>,
  svgA2Ref: RefObject<SVGTSpanElement | null>,
  svgM2Ref: RefObject<SVGTSpanElement | null>,
  startEngineerReveal: boolean,
  isMariamReady: boolean,
  onEngineerRevealComplete?: () => void,
) {
  const revealStartedRef = useRef(false);

  // ── Write-on reveal (starts when dot lands on "ı") ──────────────
  useEffect(() => {
    if (!startEngineerReveal) return;
    const isMobile = checkIsMobile();

    // ── Mobile: set final state immediately ─────────────────────
    if (isMobile) {
      if (engineerRef.current) {
        const el = engineerRef.current;
        if (!el.textContent?.trim()) el.textContent = "Software  Engineer";
        gsap.set(el, { opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotation: 0, clipPath: "none" });
      }
      engineerTextEverShown = true;
      onEngineerRevealComplete?.();
      return;
    }

    // ── Returning visit: fade in to match hero blur entrance ─────
    if (engineerTextEverShown) {
      const el = engineerRef.current;
      if (el) {
        el.textContent = "Software  Engineer";
        gsap.set(el, { opacity: 0, filter: "blur(15px)", x: 0, y: 0, rotation: 0, clipPath: "none" });
        gsap.to(el, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2,
          onComplete: () => onEngineerRevealComplete?.(),
        });
      }
      return;
    }

    // ── Desktop: write-on effect (first visit only) ──────────────
    const el = engineerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    // Start fully clipped (hidden) — reveal from left to right (no delay: starts at touch)
    gsap.set(el, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: "blur(0px)",
      clipPath: "inset(-20% 100% -20% 0)",
    });

    if (!el.parentElement) return;
    revealStartedRef.current = true;
    gsap.to(el, {
      clipPath: "inset(-20% 0% -20% 0)",
      duration: 2,
      ease: "power1.inOut",
      delay: 0,
      onComplete: () => {
        gsap.set(el, { clipPath: "none" });
        engineerTextEverShown = true;
        onEngineerRevealComplete?.();
      },
    });
    return () => {
      if (engineerRef.current) gsap.killTweensOf(engineerRef.current);
    };
  }, [startEngineerReveal, engineerRef]);

  // ── Position & scale relative to the "am" in Mariam ────────────
  // Run only when Mariam is ready (not when reveal starts) so the text never
  // re-positions mid-reveal — avoids "starts writing then shifts up".
  useEffect(() => {
    if (!isMariamReady) return;
    const el = engineerRef.current;
    const a2 = svgA2Ref.current;
    const m2 = svgM2Ref.current;
    if (!el || !a2 || !m2) return;

    // Ensure text content exists for measurement
    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    const position = () => {
      if (revealStartedRef.current && !engineerTextEverShown) return;
      const iEl = svgIRef.current;
      if (!iEl || !a2 || !m2 || !el) return;

      const iRect = iEl.getBoundingClientRect();
      const m2Rect = m2.getBoundingClientRect();
      const iamWidth = m2Rect.right - iRect.left;
      const dotY = iRect.top + iRect.height * 0.19;

      if (iamWidth <= 0) return;

      const REF = 48;
      el.style.fontSize = `${REF}px`;
      const refWidth = el.getBoundingClientRect().width;
      if (refWidth <= 0) return;

      const targetFontSize = (iamWidth / refWidth) * REF * 0.95;
      const minFontSize = checkIsMobile() ? 14 : 20;
      el.style.fontSize = `${Math.max(minFontSize, targetFontSize)}px`;

      const engRect = el.getBoundingClientRect();
      const descenderOffset = engRect.height * 0.4;
      const iamCenterX = iRect.left + iamWidth / 2;
      const engLeft = iamCenterX - engRect.width / 2;
      const shiftDown = 17;
      el.style.setProperty("top", `${dotY - engRect.height + descenderOffset + shiftDown}px`, "important");
      el.style.setProperty("bottom", "auto", "important");
      el.style.setProperty("left", `${engLeft}px`, "important");
      el.style.setProperty("right", "auto", "important");

      // Hide until reveal starts (so we don't re-run position when reveal starts)
      if (!engineerTextEverShown) {
        gsap.set(el, { opacity: 1, clipPath: "inset(-20% 100% -20% 0)" });
      }
    };

    requestAnimationFrame(position);
    const t1 = setTimeout(position, 100);
    const t2 = setTimeout(position, 300);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(position));
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [isMariamReady, engineerRef, svgIRef, svgA2Ref, svgM2Ref]);
}
