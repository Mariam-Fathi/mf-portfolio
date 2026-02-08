import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { TIMING } from "../constants";
import { checkIsMobile } from "./useIsMobile";

// ── Module-level cache (survives unmount / remount) ─────────────────
let engineerTextEverShown = false;

/**
 * Animates the "Software Engineer" text with a typewriter + blur-reveal effect.
 *
 * On mobile the final state is applied immediately — no animation.
 * On subsequent visits (cache hit), the final state is restored instantly.
 */
export function useEngineerText(
  engineerRef: RefObject<HTMLDivElement | null>,
  svgRef: RefObject<SVGSVGElement | null>,
  isDotAnimationComplete: boolean,
  isMariamReady: boolean,
) {
  // ── Typewriter + blur reveal ──────────────────────────────────
  useEffect(() => {
    if (!isDotAnimationComplete) return;
    const isMobile = checkIsMobile();

    // ── Mobile: set final state immediately ─────────────────────
    if (isMobile) {
      if (engineerRef.current) {
        const el = engineerRef.current;
        if (!el.textContent?.trim()) el.textContent = "Software  Engineer";
        gsap.set(el, { opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotation: 0 });
      }
      engineerTextEverShown = true;
      return;
    }

    // ── Returning visit: restore final state instantly ───────────
    if (engineerTextEverShown) {
      const el = engineerRef.current;
      if (el) {
        el.textContent = "Software  Engineer";
        gsap.set(el, { opacity: 1, filter: "blur(0px)", x: 0, y: 0, rotation: 0 });
      }
      return;
    }

    // ── Desktop: typewriter effect (first visit only) ────────────
    const el = engineerRef.current;
    if (!el) return;

    gsap.killTweensOf(el);
    const fullText = el.textContent || "Software  Engineer";
    const chars = fullText.split("");
    el.textContent = "";

    gsap.set(el, { opacity: 1, x: 0, y: 0, rotation: 0, filter: "blur(10px)" });

    const tid = setTimeout(() => {
      if (!el.parentElement) return;

      const tl = gsap.timeline({ delay: 0.2 });

      chars.forEach((char, idx) => {
        tl.call(
          () => { el.textContent += char; },
          null,
          idx * TIMING.typewriterPerChar,
        );
        const blur = Math.max(0, 10 - idx * 0.4);
        tl.to(el, { filter: `blur(${blur}px)`, duration: 0.08, ease: "power2.out" }, `-=${0.03}`);
      });

      tl.to(el, {
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => { engineerTextEverShown = true; },
      });
    }, 150);

    return () => clearTimeout(tid);
  }, [isDotAnimationComplete, engineerRef, svgRef]);

  // ── Position engineer text above Mariam on mobile ──────────────
  useEffect(() => {
    if (!checkIsMobile() || !isMariamReady) return;
    const engineerEl = engineerRef.current;
    const svg = svgRef.current;
    if (!engineerEl || !svg) return;

    const position = () => {
      const mariamText = svg.querySelector(".hero-mariam-text") as SVGTextElement | null;
      if (!mariamText) return;

      const svgRect = svg.getBoundingClientRect();
      let textBBox: DOMRect;
      try {
        textBBox = mariamText.getBBox();
      } catch {
        return;
      }

      const viewBox = svg.viewBox.baseVal;
      const scaleY = viewBox.height > 0 ? svgRect.height / viewBox.height : 1;
      const scaleX = viewBox.width > 0 ? svgRect.width / viewBox.width : 1;

      const mariamTop = svgRect.bottom - (viewBox.height - textBBox.y) * scaleY;
      const engHeight = engineerEl.getBoundingClientRect().height;
      const engTop = mariamTop - engHeight - 4;

      const mariamRight = svgRect.left + (textBBox.x + textBBox.width) * scaleX;
      const dist = window.innerWidth - mariamRight;
      const right = Math.max(0.3, dist * 0.15);

      engineerEl.style.setProperty("top", `${engTop}px`, "important");
      engineerEl.style.setProperty("bottom", "auto", "important");
      engineerEl.style.setProperty("right", `${right}rem`, "important");
      engineerEl.style.setProperty("transform", "translateY(0)", "important");
    };

    requestAnimationFrame(position);
    const t1 = setTimeout(position, 100);
    const t2 = setTimeout(position, 300);
    window.addEventListener("resize", position);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", position);
    };
  }, [isMariamReady, isDotAnimationComplete, engineerRef, svgRef]);
}

