import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { checkIsMobile } from "./useIsMobile";

// ── Module-level cache (survives unmount / remount) ─────────────────
let engineerTextEverShown = false;


/**
 * Animates the "Software Engineer" text with a write-on (clip reveal) effect
 * and positions it dynamically above the "am" portion of "Mariam".
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
  isDotAnimationComplete: boolean,
  isMariamReady: boolean,
) {
  // ── Write-on reveal ───────────────────────────────────────────
  useEffect(() => {
    if (!isDotAnimationComplete) return;
    const isMobile = checkIsMobile();

    // ── Mobile: set final state immediately ─────────────────────
    if (isMobile) {
      if (engineerRef.current) {
        const el = engineerRef.current;
        if (!el.textContent?.trim()) el.textContent = "Software  Engineer";
        gsap.set(el, { opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotation: 0, clipPath: "none" });
      }
      engineerTextEverShown = true;
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
        });
      }
      return;
    }

    // ── Desktop: write-on effect (first visit only) ──────────────
    const el = engineerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    // Start fully clipped (hidden) — reveal from left to right
    gsap.set(el, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: "blur(0px)",
      clipPath: "inset(-20% 100% -20% 0)",
    });

    const tid = setTimeout(() => {
      if (!el.parentElement) return;

      gsap.to(el, {
        clipPath: "inset(-20% 0% -20% 0)",
        duration: 2,
        ease: "power1.inOut",
        delay: 0.2,
        onComplete: () => {
          // Remove clipPath entirely so no sub-pixel clipping remains
          gsap.set(el, { clipPath: "none" });
          engineerTextEverShown = true;
        },
      });
    }, 150);

    return () => clearTimeout(tid);
  }, [isDotAnimationComplete, engineerRef]);

  // ── Position & scale relative to the "am" in Mariam ────────────
  // Uses getBBox() in SVG coordinates + viewBox transform to compute
  // precise screen positions. tspan.getBoundingClientRect() is unreliable
  // (includes ascender space), so we avoid it.
  useEffect(() => {
    if (!isMariamReady) return;
    const el = engineerRef.current;
    const svg = svgRef.current;
    const a2 = svgA2Ref.current;
    const m2 = svgM2Ref.current;
    if (!el || !svg || !a2 || !m2) return;

    // Ensure text content exists for measurement
    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    const position = () => {
      const iEl = svgIRef.current;
      if (!iEl || !a2 || !m2 || !el) return;

      // Width: use "iam" (ı + a + m) getBoundingClientRect
      const iRect = iEl.getBoundingClientRect();
      const a2Rect = a2.getBoundingClientRect();
      const m2Rect = m2.getBoundingClientRect();
      const iamWidth = m2Rect.right - iRect.left;

      // Vertical: use "ı" position — the same proven reference the dot uses.
      const dotY = iRect.top + iRect.height * 0.19;

      if (iamWidth <= 0) return;

      // Scale font so "Software Engineer" width matches iam width.
      const REF = 48;
      el.style.fontSize = `${REF}px`;
      const refWidth = el.getBoundingClientRect().width;
      if (refWidth <= 0) return;

      const targetFontSize = (iamWidth / refWidth) * REF * 0.95;
      const minFontSize = checkIsMobile() ? 14 : 20;
      el.style.fontSize = `${Math.max(minFontSize, targetFontSize)}px`;

      // Measure height after font resize (triggers sync reflow).
      const engRect = el.getBoundingClientRect();
      const descenderOffset = engRect.height * 0.4;

      // Center horizontally over "iam"
      const iamCenterX = iRect.left + iamWidth / 2;
      const engLeft = iamCenterX - engRect.width / 2;

      const shiftDown = 17;
      el.style.setProperty("top", `${dotY - engRect.height + descenderOffset + shiftDown}px`, "important");
      el.style.setProperty("bottom", "auto", "important");
      el.style.setProperty("left", `${engLeft}px`, "important");
      el.style.setProperty("right", "auto", "important");
    };

    // Position immediately, then retry to catch late font loads
    requestAnimationFrame(position);
    const t1 = setTimeout(position, 100);
    const t2 = setTimeout(position, 300);

    // Debounced resize handler — runs after Mariam's 150ms resize
    // completes its 3-frame rAF chain (~200ms total).
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
  }, [isMariamReady, isDotAnimationComplete, engineerRef, svgRef, svgIRef, svgA2Ref, svgM2Ref]);
}
