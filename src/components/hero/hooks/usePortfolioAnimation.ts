import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
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
  const portfoli = el.querySelector(".hero-cover-title-portfoli") as HTMLElement | null;
  const o = el.querySelector(".hero-cover-title-o") as HTMLElement | null;
  const line = el.querySelector(".hero-cover-title-line") as HTMLElement | null;
  if (!full || !portfoli || !o || !line) return null;
  return { full, portfoli, o, line };
}

// ── Restore the final state: fixed PORTFOLI + line from O + O (letter) at end ─
function restoreFinalState(
  headerRef: RefObject<HTMLDivElement | null>,
  data: PortfolioData,
) {
  const els = getHeaderElements(headerRef);
  if (!els) return;
  const { full, portfoli, o, line } = els;

  full.style.display = "none";
  portfoli.style.display = "inline";
  o.style.display = "inline";
  line.style.display = "block";

  gsap.set([portfoli, o], { display: "inline", opacity: 1, rotation: 0, x: 0 });
  Object.assign(line.style, {
    display: "block",
    opacity: "1",
    left: `${data.iOriginalPosition}px`,
    width: `${data.lineFinalWidth}px`,
  });
  gsap.set(line, { opacity: 1, width: data.lineFinalWidth });
}

// ── Attach drag-to-open/close for O when restored from cache (keeps O always draggable) ─
function attachODragAfterRestore(
  headerRef: RefObject<HTMLDivElement | null>,
  oDragWrapperRef: RefObject<HTMLDivElement | null> | undefined,
  data: PortfolioData,
  setIsComplete: (v: boolean) => void,
  onDragStart?: () => void,
): () => void {
  const els = getHeaderElements(headerRef);
  if (!els) return () => {};
  const { o: oEl, line: lineEl } = els;
  const dragTarget = (oDragWrapperRef?.current ?? oEl) as HTMLElement;
  const oFinalX = data.oFinalX;
  const finalLineWidth = data.lineFinalWidth;

  dragTarget.style.cursor = "grab";
  dragTarget.style.pointerEvents = "auto";
  dragTarget.style.position = "relative";
  dragTarget.style.zIndex = "15";
  dragTarget.style.touchAction = "none";

  const threshold = oFinalX * 0.6;
  const quickToX = gsap.quickTo(dragTarget, "x", { duration: 0.12, ease: "power2.out" });
  const quickToLineWidth = gsap.quickTo(lineEl as unknown as gsap.TweenTarget, "width", {
    duration: 0.12,
    ease: "power2.out",
    unit: "px",
  });
  const applyDrag = (x: number) => {
    const clamped = Math.max(0, Math.min(x, oFinalX));
    quickToX(clamped);
    const lineW = Math.max(0, Math.min(clamped, finalLineWidth));
    quickToLineWidth(lineW);
    if (clamped < threshold) setIsComplete(false); // hide links as soon as user drags back
  };

  let startClientX = 0;
  let startX = 0;

  const onPointerMove = (e: PointerEvent) => {
    const dx = e.clientX - startClientX;
    applyDrag(startX + dx);
  };

  const onPointerUp = (e?: PointerEvent) => {
    if (e) dragTarget.releasePointerCapture(e.pointerId);
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUpBound);
    document.removeEventListener("pointercancel", onPointerUpBound);
    dragTarget.style.cursor = "grab";
    const currentX = Number(gsap.getProperty(dragTarget, "x")) || 0;
    if (currentX >= threshold) {
      gsap.set(dragTarget, { x: oFinalX });
      lineEl.style.width = `${finalLineWidth}px`;
      gsap.set(lineEl, { width: finalLineWidth });
      dragTarget.style.pointerEvents = "auto";
      dragTarget.style.cursor = "grab";
      setIsComplete(true);
    } else {
      setIsComplete(false);
      gsap.to(dragTarget, { x: 0, duration: 0.3, ease: "power2.out" });
      gsap.to(lineEl, { width: 0, duration: 0.3, ease: "power2.out", onComplete: () => {
        const w = dragTarget.offsetWidth;
        dragTarget.style.minWidth = `${w}px`;
      }});
    }
  };

  const onPointerUpBound = (e: PointerEvent) => { onPointerUp(e); };

  const onPointerDown = (e: PointerEvent) => {
    e.preventDefault();
    onDragStart?.();
    startClientX = e.clientX;
    startX = Number(gsap.getProperty(dragTarget, "x")) || 0;
    dragTarget.style.cursor = "grabbing";
    dragTarget.setPointerCapture(e.pointerId);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUpBound);
    document.addEventListener("pointercancel", onPointerUpBound);
  };

  dragTarget.addEventListener("pointerdown", onPointerDown as EventListener);
  return () => {
    dragTarget.removeEventListener("pointerdown", onPointerDown as EventListener);
  };
}

// ── Hook ─────────────────────────────────────────────────────────────
export function usePortfolioAnimation(
  headerRef: RefObject<HTMLDivElement | null>,
  shouldAnimate: boolean,
  isActive: boolean,
  isMobile: boolean,
  onDragStart?: () => void,
  oDragWrapperRef?: RefObject<HTMLDivElement | null>,
  startAutoExpand?: boolean,
): { isPortfolioAnimationComplete: boolean } {
  const [isComplete, setIsComplete] = useState(false);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const pendingAutoTlRef = useRef<gsap.core.Timeline | null>(null);

  // ── Main animation effect ──────────────────────────────────────
  useEffect(() => {
    if (!headerRef.current) return;

    // ── Reset when hero becomes inactive ─────────────────────────
    if (!isActive) {
      if (dragCleanupRef.current) {
        dragCleanupRef.current();
        dragCleanupRef.current = null;
      }
      setIsComplete(false);
      if (!everCompleted) {
        const els = getHeaderElements(headerRef);
        if (els) {
          gsap.set(els.full, { opacity: 1, display: "block" });
          gsap.set([els.portfoli, els.o], { opacity: 0, display: "none", x: 0, y: 0, rotation: 0 });
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
          if (dragCleanupRef.current) dragCleanupRef.current();
          restoreFinalState(headerRef, cachedData!);
          if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: cachedData!.oFinalX });
          setIsComplete(true);
          dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, cachedData!, setIsComplete, onDragStart);
        });
      });
    }

    // ── Wait for dot animation to start ──────────────────────────
    if (!shouldAnimate) return;

    // ── Cached: jump to final state ──────────────────────────────
    if (cachedData && dataCalculated) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dragCleanupRef.current) dragCleanupRef.current();
          restoreFinalState(headerRef, cachedData!);
          if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: cachedData!.oFinalX });
          setIsComplete(true);
          dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, cachedData!, setIsComplete, onDragStart);
        });
      });
      return;
    }

    // ── Fresh animation ──────────────────────────────────────────
    setIsComplete(false);

    const els = getHeaderElements(headerRef);
    if (!els) return;
    const { full, portfoli, o: oEl, line: lineEl } = els;

    // ── Mobile: show O at end but keep it draggable (touch-friendly) ───
    if (isMobile) {
      full.style.display = "none";
      portfoli.style.display = "inline";
      portfoli.style.opacity = "1";
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
          void portfoli.offsetWidth;
          void oEl.offsetWidth;

          const oRect = oEl.getBoundingClientRect();
          const oWidth = oRect.width;
          const oFinalLeft = absoluteEnd - oWidth / 2;
          const oStartLeft = oRect.left - containerRect.left;
          const oFinalX = oFinalLeft - oStartLeft;
          const finalLineWidth = Math.max(0, oFinalLeft - oStartLeft - 8);

          const mobileWrapper = oDragWrapperRef?.current;
          if (mobileWrapper) {
            gsap.set(mobileWrapper, { x: oFinalX });
            (mobileWrapper as HTMLElement).style.touchAction = "none";
            (mobileWrapper as HTMLElement).style.pointerEvents = "auto";
            (mobileWrapper as HTMLElement).style.cursor = "grab";
          } else {
            gsap.set(oEl, { x: oFinalX, opacity: 1 });
          }
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

          const portfoliRect = portfoli.getBoundingClientRect();
          cachedData = {
            portfolWidth: portfoliRect.width,
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
          // Make O draggable on mobile too (drag back to start or re-expand)
          if (dragCleanupRef.current) dragCleanupRef.current();
          dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, cachedData, setIsComplete, onDragStart);
        });
      });
      return;
    }

    // ── Desktop: O and line revealed; expand immediately after step 1 ──
    let lineStartX = 0;
    let oFinalX = 0;
    let finalLineWidth = 0;

    const tl = gsap.timeline({ delay: 0 });

    // Single callback: show O and enable drag in the same frame so first touch works (no frame gap)
    tl.call(() => {
      // Step 1: Show fixed PORTFOLI + O (instant)
      const wrapper = oDragWrapperRef?.current;
      if (wrapper) {
        wrapper.style.minWidth = "";
        gsap.set(wrapper, { x: 0 });
      }
      full.style.display = "none";
      portfoli.style.display = "inline";
      oEl.style.display = "inline";
      lineEl.style.display = "none";
      gsap.set([portfoli, oEl], { display: "inline", opacity: 1, rotation: 0 });
      gsap.set(oEl, { position: "relative", x: 0 });
      gsap.set(lineEl, { display: "none", width: 0 });

      const cRect = headerRef.current?.getBoundingClientRect();
      if (!cRect) return;

      void oEl.offsetWidth; // force reflow after display change
      const dragTarget = (oDragWrapperRef?.current ?? oEl) as HTMLElement;
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
      gsap.set(oEl, { clearProps: "x" });

      const portfoliRect = portfoli.getBoundingClientRect();
      cachedData = {
        portfolWidth: portfoliRect.width,
        oFinalX,
        lineFinalWidth: finalLineWidth,
        iOriginalPosition: lineStartX,
        oStartX: oStartLeft,
        iWidth: 0,
        containerWidth: cRect.width,
      };
      dataCalculated = true;
      everCompleted = true;

      // Freeze wrapper width so O doesn't shift layout during drag
      const wrapperWidth = dragTarget.offsetWidth;
      (dragTarget as HTMLElement).style.minWidth = `${wrapperWidth}px`;

      // Draggable from the first frame; auto runs after delay only if user doesn't drag
      dragTarget.style.cursor = "grab";
      dragTarget.style.pointerEvents = "auto";
      dragTarget.style.position = "relative";
      dragTarget.style.zIndex = "15";
      dragTarget.style.touchAction = "none"; // so first touch starts drag, not scroll

      // Auto: after a short delay, one smooth motion 0→1/4→end (only if user hasn't dragged)
      const fps = 60;
      const pointingFrames = 42;
      const pointingDelay = pointingFrames / fps;
      const quarterX = oFinalX * 0.25;
      const quarterLine = finalLineWidth * 0.25;
      const durToQuarter = 0.8;
      const durQuarterToEnd = 2.2;
      const totalDuration = durToQuarter + durQuarterToEnd;
      const p1 = durToQuarter / totalDuration;

      const progressToX = (t: number): number => {
        if (t <= p1) return (t / p1) * quarterX;
        return quarterX + ((t - p1) / (1 - p1)) * (oFinalX - quarterX);
      };
      const progressToLine = (t: number): number => {
        if (t <= p1) return (t / p1) * quarterLine;
        return quarterLine + ((t - p1) / (1 - p1)) * (finalLineWidth - quarterLine);
      };

      const applyProgress = (t: number) => {
        const x = progressToX(t);
        const lineW = progressToLine(t);
        gsap.set(dragTarget, { x });
        (lineEl as HTMLElement).style.width = `${lineW}px`;
      };

      const finish = () => {
        gsap.set(dragTarget, { x: oFinalX });
        lineEl.style.width = `${finalLineWidth}px`;
        gsap.set(lineEl, { width: finalLineWidth });
        // Keep O draggable so user can always drag back to initial or re-expand
        dragTarget.style.pointerEvents = "auto";
        dragTarget.style.cursor = "grab";
        setIsComplete(true);
      };

      let startClientX = 0;
      let startX = 0;

      // Smooth follow so O and line feel like they're being dragged together
      const quickToX = gsap.quickTo(dragTarget, "x", { duration: 0.12, ease: "power2.out" });
      const quickToLineWidth = gsap.quickTo(lineEl as unknown as gsap.TweenTarget, "width", {
        duration: 0.12,
        ease: "power2.out",
        unit: "px",
      });
      const threshold = oFinalX * 0.6;
      const applyDrag = (x: number) => {
        const clamped = Math.max(0, Math.min(x, oFinalX));
        quickToX(clamped);
        const lineW = Math.max(0, Math.min(clamped, finalLineWidth));
        quickToLineWidth(lineW);
        if (clamped < threshold) setIsComplete(false); // hide links as soon as user drags back
      };

      const onPointerMove = (e: PointerEvent) => {
        const dx = e.clientX - startClientX;
        applyDrag(startX + dx);
      };

      const onPointerUp = (e?: PointerEvent) => {
        if (e) dragTarget.releasePointerCapture(e.pointerId);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUpWithEvent);
        document.removeEventListener("pointercancel", onPointerUpWithEvent);
        dragTarget.style.cursor = "grab";
        const currentX = Number(gsap.getProperty(dragTarget, "x")) || 0;
        if (currentX >= threshold) {
          const finishDrag = () => {
            gsap.set(dragTarget, { x: oFinalX });
            lineEl.style.width = `${finalLineWidth}px`;
            gsap.set(lineEl, { width: finalLineWidth });
            // Keep O draggable so user can always drag back to initial or re-expand
            dragTarget.style.pointerEvents = "auto";
            dragTarget.style.cursor = "grab";
            setIsComplete(true);
          };
          gsap.to(dragTarget, { x: oFinalX, duration: 0.35, ease: "power2.out" });
          gsap.to(lineEl, { width: finalLineWidth, duration: 0.35, ease: "power2.out", onComplete: finishDrag });
        } else {
          // Snap back so user can redrag to open; reverse to initial state
          setIsComplete(false);
          gsap.to(dragTarget, { x: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(lineEl, { width: 0, duration: 0.3, ease: "power2.out", onComplete: () => {
            const w = (dragTarget as HTMLElement).offsetWidth;
            (dragTarget as HTMLElement).style.minWidth = `${w}px`;
          }});
        }
      };

      const onPointerUpWithEvent = (e: PointerEvent) => {
        onPointerUp(e);
      };

      let autoTl: gsap.core.Timeline | null = null;
      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        if (autoTl) autoTl.kill();
        onDragStart?.();
        startClientX = e.clientX;
        startX = Number(gsap.getProperty(dragTarget, "x")) || 0;
        dragTarget.style.cursor = "grabbing";
        dragTarget.setPointerCapture(e.pointerId); // keep events on this element for touch
        document.addEventListener("pointermove", onPointerMove);
        document.addEventListener("pointerup", onPointerUpWithEvent);
        document.addEventListener("pointercancel", onPointerUpWithEvent);
      };

      // Attach drag so O is draggable from the first frame; auto timeline only plays when startAutoExpand becomes true
      dragTarget.addEventListener("pointerdown", onPointerDown as EventListener);

      const progressObj = { t: 0 };
      autoTl = gsap.timeline({
        delay: pointingDelay,
        paused: true,
        onComplete: finish,
      });
      autoTl.to(progressObj, {
        t: 1,
        duration: totalDuration,
        ease: "none",
        onUpdate: () => applyProgress(progressObj.t),
      });
      pendingAutoTlRef.current = autoTl;
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

        const targetEl = oDragWrapperRef?.current ?? oEl;
        gsap.set(targetEl, { x: oFinalX });
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
      pendingAutoTlRef.current = null;
      if (dragCleanupRef.current) {
        dragCleanupRef.current();
        dragCleanupRef.current = null;
      }
      tl.kill();
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isActive, shouldAnimate, isMobile, headerRef, oDragWrapperRef]);

  // When startAutoExpand becomes true (e.g. dot landed / Software Engineer appears), run auto animation only if user hasn't expanded yet
  useEffect(() => {
    if (!startAutoExpand || isComplete) return;
    const tl = pendingAutoTlRef.current;
    if (tl) tl.play();
  }, [startAutoExpand, isComplete]);

  const collapsePortfolio = useCallback(() => setIsComplete(false), []);

  return { isPortfolioAnimationComplete: isComplete, collapsePortfolio };
}
