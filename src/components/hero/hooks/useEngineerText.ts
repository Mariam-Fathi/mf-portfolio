import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { checkIsMobile } from "./useIsMobile";
import { ENGINEER_TEXT } from "../constants";

// ── Module-level cache (survives unmount / remount) ─────────────────
// IMPORTANT – React 18 Strict Mode double-invokes effects in development.
// The first invocation may set engineerTextEverShown = true, causing the
// second invocation to skip to the blur-in path instead of the write-on.
// This is expected in development only and does NOT happen in production.
let engineerTextEverShown = false;

// ── Cached width-per-font-size ratio (font is deterministic, measure once) ──
// Avoids two forced reflows per position() call by pre-computing how wide the
// text is at a reference size and scaling from that ratio.
let cachedWidthRatio: number | null = null;

function getWidthRatio(el: HTMLDivElement): number {
  if (cachedWidthRatio !== null) return cachedWidthRatio;
  const REF = 48;
  el.style.fontSize = `${REF}px`;
  const refWidth = el.getBoundingClientRect().width;
  cachedWidthRatio = refWidth > 0 ? refWidth / REF : null;
  return cachedWidthRatio ?? 1;
}

/**
 * Animates the "Software Engineer" text with a write-on (clip reveal) effect
 * and positions it dynamically above the "ıam" portion of "Mariam".
 * Reveal starts when the dot lands on "ı" (cause: the fall triggers the appearance).
 *
 * On mobile the final state is applied immediately — no animation.
 * On subsequent visits (cache hit), the final state is restored instantly.
 *
 * Positioning note: this hook owns ALL positional inline styles on the element
 * (top, left, bottom, right, fontSize). The portal in hero.tsx sets only
 * non-positional defaults (opacity, filter, zIndex) so there is no specificity
 * conflict — no !important needed.
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

  // ── Always kill tweens on cleanup, regardless of which branch ran ──
  // Separate effect so the cleanup always registers even when the reveal
  // effect exits early (mobile path, cache-hit path, !startEngineerReveal).
  useEffect(() => {
    return () => {
      if (engineerRef.current) gsap.killTweensOf(engineerRef.current);
    };
  }, [engineerRef]);

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
    if (!el || !el.parentElement) return;

    gsap.killTweensOf(el);
    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    // Start fully clipped (hidden) — reveal left-to-right, no delay (starts at dot touch)
    gsap.set(el, {
      opacity: 1,
      x: 0,
      y: 0,
      rotation: 0,
      filter: "blur(0px)",
      clipPath: "inset(-20% 100% -20% 0)",
    });

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
  // onEngineerRevealComplete is stable (useCallback [] deps in hero.tsx).
  // Listed here to satisfy exhaustive-deps without causing extra re-runs.
  }, [startEngineerReveal, engineerRef, onEngineerRevealComplete]);

  // ── Position & scale relative to the "ıam" in Mariam ───────────
  // Runs only when Mariam is ready (not when reveal starts) so the text never
  // re-positions mid-reveal — avoids "starts writing then jumps".
  //
  // This hook owns the element's positional styles (top/left/bottom/right/
  // fontSize) via direct assignment. No !important is needed because the
  // portal in hero.tsx intentionally sets only non-positional defaults.
  useEffect(() => {
    if (!isMariamReady) return;
    const el = engineerRef.current;
    const a2 = svgA2Ref.current;
    const m2 = svgM2Ref.current;
    if (!el || !a2 || !m2) return;

    if (!el.textContent?.trim()) el.textContent = "Software  Engineer";

    const position = () => {
      // Don't reposition while the write-on is mid-reveal on first visit.
      // revealStartedRef is instance-level (resets on remount);
      // engineerTextEverShown is module-level (survives remount).
      // Together they cover both cases: in-progress first visit, and returning visit.
      if (revealStartedRef.current && !engineerTextEverShown) return;
      const iEl = svgIRef.current;
      if (!iEl || !a2 || !m2 || !el) return;

      const iRect = iEl.getBoundingClientRect();
      const m2Rect = m2.getBoundingClientRect();
      const iamWidth = m2Rect.right - iRect.left;
      const dotY = iRect.top + iRect.height * 0.19;

      if (iamWidth <= 0) return;

      // Single reflow: use cached ratio to compute target fontSize, then set once.
      // getWidthRatio() measures at 48px the first time and caches the px-per-px ratio.
      const ratio = getWidthRatio(el);
      const targetFontSize = (iamWidth / ratio) * 0.95;
      const minFontSize = checkIsMobile() ? 14 : 20;
      el.style.fontSize = `${Math.max(minFontSize, targetFontSize)}px`;

      const engRect = el.getBoundingClientRect();
      const descenderOffset = engRect.height * 0.4;
      const iamCenterX = iRect.left + iamWidth / 2;
      const engLeft = iamCenterX - engRect.width / 2;

      // ENGINEER_TEXT.VERTICAL_NUDGE_PX compensates for the gap between the SVG
      // baseline and the rendered top of the descender-adjusted text block.
      // Value is Pouities-font-specific; derived empirically across all tested sizes.
      const top = dotY - engRect.height + descenderOffset + ENGINEER_TEXT.VERTICAL_NUDGE_PX;

      el.style.top = `${top}px`;
      el.style.bottom = "auto";
      el.style.left = `${engLeft}px`;
      el.style.right = "auto";

      // Keep hidden until reveal starts (clip-path covers the text from the right)
      if (!engineerTextEverShown) {
        gsap.set(el, { opacity: 1, clipPath: "inset(-20% 100% -20% 0)" });
      }
    };

    // Three staggered calls defend against SVG not being fully painted yet:
    // rAF fires before paint, 100ms catches post-font-load shifts, 300ms
    // catches any remaining async layout from useMariamSvg's rAF chain.
    // TODO: replace with a shared "mariamLayoutReady" signal from useMariamSvg
    // so this hook doesn't need to guess the right delay after resize.
    requestAnimationFrame(position);
    const t1 = setTimeout(position, 100);
    const t2 = setTimeout(position, 300);

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      // 250ms > useMariamSvg's 150ms debounce + 3-frame rAF chain so SVG
      // rects are stable before we re-measure.
      // TODO: replace once a shared mariamLayoutReady signal exists.
      resizeTimer = setTimeout(() => {
        resizeTimer = null;
        cachedWidthRatio = null; // invalidate — fontSize changes on resize
        requestAnimationFrame(() => requestAnimationFrame(position));
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (resizeTimer) {
        clearTimeout(resizeTimer);
        resizeTimer = null;
      }
      window.removeEventListener("resize", onResize);
    };
  }, [isMariamReady, engineerRef, svgIRef, svgA2Ref, svgM2Ref]);
}
