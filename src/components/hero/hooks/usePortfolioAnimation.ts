import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { COLORS, TIMING } from "../constants";
import { checkIsMobile } from "./useIsMobile";
import type { PortfolioData } from "../types";
import {
  portfolioCache,
  resetPortfolioCache as resetPortfolioCacheImpl,
  hasPortfolioEverCompleted as hasPortfolioEverCompletedImpl,
} from "../portfolioCache";

// Re-export so Hero can keep importing from this hook
export { resetPortfolioCacheImpl as resetPortfolioCache, hasPortfolioEverCompletedImpl as hasPortfolioEverCompleted };

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

// ── Restore to collapsed: PORTFOLI + O with O at start, line at 0 (e.g. after resize lg→md when not expanded) ─
function restoreCollapsedState(
  headerRef: RefObject<HTMLDivElement | null>,
  data: PortfolioData,
  oDragWrapperRef: RefObject<HTMLDivElement | null> | undefined,
  setIsComplete: (v: boolean) => void,
  onDragStart?: () => void,
  onUserExpandChange?: (expanded: boolean) => void,
) {
  const els = getHeaderElements(headerRef);
  if (!els) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[usePortfolioAnimation] restoreCollapsedState: header sub-elements not found — drag not attached. The portfolio header may not have rendered yet.");
    }
    return;
  }
  const { full, portfoli, o, line } = els;

  full.style.display = "none";
  portfoli.style.display = "inline";
  o.style.display = "inline";
  line.style.display = "block";

  const target = (oDragWrapperRef?.current ?? o) as HTMLElement;
  gsap.set([portfoli, o], { display: "inline", opacity: 1, rotation: 0, x: 0 });
  gsap.set(target, { x: 0 });
  Object.assign(line.style, {
    display: "block",
    opacity: "1",
    left: `${data.iOriginalPosition}px`,
    width: "0px",
  });
  gsap.set(line, { opacity: 1, width: 0 });

  setIsComplete(false);
  return attachODragAfterRestore(headerRef, oDragWrapperRef, data, setIsComplete, onDragStart, onUserExpandChange);
}

// ── Resize handler: reposition O and line when expanded so they stay in view (shared by desktop & mobile) ─
// Returns both the handler (to add/remove from the event) and a cancel function
// (to clear any pending debounce timeout on unmount, preventing stale callbacks
// from firing after the component has been torn down).
function createResizeHandler(
  headerRef: RefObject<HTMLDivElement | null>,
  oDragWrapperRef: RefObject<HTMLDivElement | null> | undefined,
): { handler: () => void; cancel: () => void } {
  let resizeTimer: ReturnType<typeof setTimeout> | null = null;
  const handler = () => {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      if (!portfolioCache.everCompleted || !portfolioCache.cachedData) return;
      const els = getHeaderElements(headerRef);
      if (!els) return;
      const { o: oEl, line: lineEl } = els;

      const targetEl = (oDragWrapperRef?.current ?? oEl) as HTMLElement;
      const currentOGsapX = Number(gsap.getProperty(targetEl, "x")) || 0;
      const threshold = portfolioCache.cachedData.oFinalX * 0.6;
      const isCurrentlyExpanded = currentOGsapX >= threshold;
      if (!isCurrentlyExpanded) return;

      const cRect = headerRef.current?.getBoundingClientRect();
      if (!cRect) return;

      const padding = window.innerWidth < 768 ? 16 : 32;
      const viewportRight = window.innerWidth - padding;
      const absoluteEnd = Math.min(cRect.width - padding, viewportRight - cRect.left);

      const oWidth = oEl.getBoundingClientRect().width;
      const oFinalLeft = Math.min(absoluteEnd - oWidth / 2, viewportRight - cRect.left - oWidth / 2);

      const targetRect = targetEl.getBoundingClientRect();
      const currentOLeft = targetRect.left - cRect.left;
      const lineStartX = currentOLeft - currentOGsapX;
      const oFinalX = Math.max(0, oFinalLeft - lineStartX);
      const finalLineWidth = Math.max(0, Math.min(oFinalLeft - lineStartX - 8, cRect.width - lineStartX - 8));

      gsap.set(targetEl, { x: oFinalX });
      lineEl.style.left = `${lineStartX}px`;
      lineEl.style.width = `${finalLineWidth}px`;
      gsap.set(lineEl, { width: finalLineWidth });

      portfolioCache.cachedData = {
        ...portfolioCache.cachedData,
        oFinalX,
        lineFinalWidth: finalLineWidth,
        iOriginalPosition: lineStartX,
        oStartX: lineStartX,
        containerWidth: cRect.width,
      };
    }, 150);
  };
  const cancel = () => {
    if (resizeTimer) {
      clearTimeout(resizeTimer);
      resizeTimer = null;
    }
  };
  return { handler, cancel };
}

// ── Recalculate line/O positions from current layout and apply (for restore after resize or return to hero) ─
function recalculateAndApplyExpandedState(
  headerRef: RefObject<HTMLDivElement | null>,
  oDragWrapperRef: RefObject<HTMLDivElement | null> | undefined,
): boolean {
  const els = getHeaderElements(headerRef);
  if (!els || !portfolioCache.cachedData) return false;
  const { portfoli, o: oEl, line: lineEl } = els;
  const targetEl = (oDragWrapperRef?.current ?? oEl) as HTMLElement;

  const cRect = headerRef.current?.getBoundingClientRect();
  if (!cRect) return false;

  void portfoli.offsetWidth;
  void oEl.offsetWidth;
  const oWidth = oEl.getBoundingClientRect().width;
  const padding = window.innerWidth < 768 ? 16 : 32;
  const viewportRight = window.innerWidth - padding;
  const absoluteEnd = Math.min(cRect.width - padding, viewportRight - cRect.left);
  const oFinalLeft = Math.min(absoluteEnd - oWidth / 2, viewportRight - cRect.left - oWidth / 2);
  const oStartLeft = oEl.getBoundingClientRect().left - cRect.left;
  const lineStartX = oStartLeft;
  const oFinalX = Math.max(0, oFinalLeft - lineStartX);
  const finalLineWidth = Math.max(0, Math.min(oFinalLeft - lineStartX - 8, cRect.width - lineStartX - 8));

  gsap.set(targetEl, { x: oFinalX });
  Object.assign(lineEl.style, {
    display: "block",
    opacity: "1",
    left: `${lineStartX}px`,
    width: `${finalLineWidth}px`,
  });
  gsap.set(lineEl, { opacity: 1, width: finalLineWidth });

  portfolioCache.cachedData = {
    ...portfolioCache.cachedData,
    oFinalX,
    lineFinalWidth: finalLineWidth,
    iOriginalPosition: lineStartX,
    oStartX: lineStartX,
    containerWidth: cRect.width,
  };
  return true;
}

// ── Attach drag-to-open/close for O when restored from cache (keeps O always draggable) ─
function attachODragAfterRestore(
  headerRef: RefObject<HTMLDivElement | null>,
  oDragWrapperRef: RefObject<HTMLDivElement | null> | undefined,
  data: PortfolioData,
  setIsComplete: (v: boolean) => void,
  onDragStart?: () => void,
  onUserExpandChange?: (expanded: boolean) => void,
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
    const expanded = currentX >= threshold;
    onUserExpandChange?.(expanded);
    if (expanded) {
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
  /** When true (md range): show final state immediately, no drag/click on O */
  staticExpand?: boolean,
): { isPortfolioAnimationComplete: boolean } {
  const [isComplete, setIsComplete] = useState(false);
  const dragCleanupRef = useRef<(() => void) | null>(null);
  const pendingAutoTlRef = useRef<gsap.core.Timeline | null>(null);
  const wasExpandedRef = useRef(false);
  /** True only when the user manually dragged the O to expand (not auto-expand or static layout). Used so resize lg→md→lg doesn’t show links if user never dragged. */
  const userExpandedRef = useRef(false);
  const mobileResizeCleanupRef = useRef<(() => void) | null>(null);
  const restoreResizeCleanupRef = useRef<(() => void) | null>(null);
  const hasSeenExpandedThisMountRef = useRef(false);

  useEffect(() => {
    wasExpandedRef.current = isComplete;
    if (process.env.NODE_ENV !== "production") {
      console.log("[portfolio] tracking effect: isComplete=", isComplete, "isActive=", isActive, "→ wasExpandedRef=", wasExpandedRef.current);
    }
    if (!isActive) return;
    if (isComplete && !staticExpand) hasSeenExpandedThisMountRef.current = true;
    // Persist whether the portfolio is currently expanded, regardless of whether
    // it was expanded by the user dragging or by the auto-expand animation.
    // Guard: only write when isActive, so the setIsComplete(false) called inside
    // the !isActive branch can't race and overwrite the value we just saved.
    if (!staticExpand) portfolioCache.lastExpandedWhenLeavingHero = isComplete;
  }, [isComplete, isActive, staticExpand]);

  // ── Main animation effect ──────────────────────────────────────
  useEffect(() => {
    const saveExpandedStateOnCleanup = () => {
      if (!staticExpand) {
        if (process.env.NODE_ENV !== "production") {
          console.log("[portfolio] saveExpandedStateOnCleanup: wasExpandedRef.current=", wasExpandedRef.current);
        }
        portfolioCache.lastExpandedWhenLeavingHero = wasExpandedRef.current;
      }
    };
    const onUserExpandChange = (expanded: boolean) => {
      userExpandedRef.current = expanded;
    };

    if (!headerRef.current) return saveExpandedStateOnCleanup;

    // ── Reset when hero becomes inactive ─────────────────────────
    if (!isActive) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[portfolio] !isActive: saving wasExpandedRef.current=", wasExpandedRef.current, "isComplete state at this point is stale in closure — wasExpandedRef is the source of truth");
      }
      portfolioCache.lastExpandedWhenLeavingHero = wasExpandedRef.current;
      if (dragCleanupRef.current) {
        dragCleanupRef.current();
        dragCleanupRef.current = null;
      }
      restoreResizeCleanupRef.current?.();
      restoreResizeCleanupRef.current = null;
      setIsComplete(false);
      if (!portfolioCache.everCompleted) {
        const els = getHeaderElements(headerRef);
        if (els) {
          gsap.set(els.full, { opacity: 1, display: "block" });
          gsap.set([els.portfoli, els.o], { opacity: 0, display: "none", x: 0, y: 0, rotation: 0 });
          gsap.set(els.line, { opacity: 0, display: "none", width: 0 });
          els.line.style.left = "";
        }
      }
      return saveExpandedStateOnCleanup;
    }

    // ── Restore cached state when returning to hero or after resize (e.g. lg→md → lg) ──────────────
    // Use portfolioCache.lastExpandedWhenLeavingHero so we restore the same state (expanded vs collapsed) the user had when they left.
    if (isActive && portfolioCache.cachedData && portfolioCache.dataCalculated && portfolioCache.everCompleted) {
      if (process.env.NODE_ENV !== "production") {
        console.log("[portfolio] restore branch: lastExpandedWhenLeavingHero=", portfolioCache.lastExpandedWhenLeavingHero);
      }
      const { handler: handleResize, cancel: cancelResize } = createResizeHandler(headerRef, oDragWrapperRef);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dragCleanupRef.current) dragCleanupRef.current();
          dragCleanupRef.current = null;
          restoreResizeCleanupRef.current?.();
          restoreResizeCleanupRef.current = null;

          if (staticExpand) {
            restoreFinalState(headerRef, portfolioCache.cachedData!);
            if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: portfolioCache.cachedData!.oFinalX });
            setIsComplete(true);
            return;
          }
          if (!portfolioCache.lastExpandedWhenLeavingHero) {
            userExpandedRef.current = false;
            dragCleanupRef.current = restoreCollapsedState(headerRef, portfolioCache.cachedData!, oDragWrapperRef, setIsComplete, onDragStart, onUserExpandChange) ?? null;
            return;
          }
          userExpandedRef.current = true;
          restoreFinalState(headerRef, portfolioCache.cachedData!);
          recalculateAndApplyExpandedState(headerRef, oDragWrapperRef);
          if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: portfolioCache.cachedData!.oFinalX });
          setIsComplete(true);
          dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, portfolioCache.cachedData!, setIsComplete, onDragStart, onUserExpandChange);
          window.addEventListener("resize", handleResize);
          restoreResizeCleanupRef.current = () => {
            cancelResize();
            window.removeEventListener("resize", handleResize);
          };
        });
      });
      return () => {
        saveExpandedStateOnCleanup();
        restoreResizeCleanupRef.current?.();
        restoreResizeCleanupRef.current = null;
        if (dragCleanupRef.current) {
          dragCleanupRef.current();
          dragCleanupRef.current = null;
        }
      };
    }

    // ── Wait for dot animation to start ──────────────────────────
    if (!shouldAnimate) return saveExpandedStateOnCleanup;

    // ── Cached: jump to final state (e.g. same session, effect re-ran after resize) ──────────────────────────────
    if (portfolioCache.cachedData && portfolioCache.dataCalculated) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (dragCleanupRef.current) dragCleanupRef.current();
          if (staticExpand) {
            restoreFinalState(headerRef, portfolioCache.cachedData!);
            if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: portfolioCache.cachedData!.oFinalX });
            setIsComplete(true);
            return;
          }
          if (!wasExpandedRef.current) {
            userExpandedRef.current = false;
            dragCleanupRef.current = restoreCollapsedState(headerRef, portfolioCache.cachedData!, oDragWrapperRef, setIsComplete, onDragStart, onUserExpandChange) ?? null;
            return;
          }
          userExpandedRef.current = true;
          restoreFinalState(headerRef, portfolioCache.cachedData!);
          recalculateAndApplyExpandedState(headerRef, oDragWrapperRef);
          if (oDragWrapperRef?.current) gsap.set(oDragWrapperRef.current, { x: portfolioCache.cachedData!.oFinalX });
          setIsComplete(true);
          dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, portfolioCache.cachedData!, setIsComplete, onDragStart, onUserExpandChange);
        });
      });
      return saveExpandedStateOnCleanup;
    }

    // ── Fresh animation ──────────────────────────────────────────
    setIsComplete(false);

    const els = getHeaderElements(headerRef);
    if (!els) return saveExpandedStateOnCleanup;
    const { full, portfoli, o: oEl, line: lineEl } = els;

    // ── Mobile or static (md): show final state immediately; only attach drag when mobile and not static ───
    if (isMobile || staticExpand) {
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
          const viewportRight = window.innerWidth - padding;
          const absoluteEnd = Math.min(containerRect.width - padding, viewportRight - containerRect.left);
          void portfoli.offsetWidth;
          void oEl.offsetWidth;

          const oRect = oEl.getBoundingClientRect();
          const oWidth = oRect.width;
          const oFinalLeft = Math.min(absoluteEnd - oWidth / 2, viewportRight - containerRect.left - oWidth / 2);
          const oStartLeft = oRect.left - containerRect.left;
          const oFinalX = oFinalLeft - oStartLeft;
          const finalLineWidth = Math.max(0, oFinalLeft - oStartLeft - 8);

          const mobileWrapper = oDragWrapperRef?.current;
          if (mobileWrapper) {
            gsap.set(mobileWrapper, { x: oFinalX });
            if (!staticExpand) {
              (mobileWrapper as HTMLElement).style.touchAction = "none";
              (mobileWrapper as HTMLElement).style.pointerEvents = "auto";
              (mobileWrapper as HTMLElement).style.cursor = "grab";
            } else {
              (mobileWrapper as HTMLElement).style.pointerEvents = "none";
              (mobileWrapper as HTMLElement).style.cursor = "default";
            }
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
          portfolioCache.cachedData = {
            portfolWidth: portfoliRect.width,
            oFinalX,
            lineFinalWidth: finalLineWidth,
            iOriginalPosition: oStartLeft,
            oStartX: oStartLeft,
            iWidth: 0,
            containerWidth: containerRect.width,
          };
          portfolioCache.dataCalculated = true;
          portfolioCache.everCompleted = true;
          setIsComplete(true);
          if (!staticExpand) {
            if (dragCleanupRef.current) dragCleanupRef.current();
            dragCleanupRef.current = attachODragAfterRestore(headerRef, oDragWrapperRef, portfolioCache.cachedData, setIsComplete, onDragStart, onUserExpandChange);
          }
          // Resize handler so O and line stay in view when user resizes after expansion
          const { handler: handleResizeMobile, cancel: cancelResizeMobile } = createResizeHandler(headerRef, oDragWrapperRef);
          window.addEventListener("resize", handleResizeMobile);
          mobileResizeCleanupRef.current = () => {
            cancelResizeMobile();
            window.removeEventListener("resize", handleResizeMobile);
          };
        });
      });
      return () => {
        saveExpandedStateOnCleanup();
        if (dragCleanupRef.current) {
          dragCleanupRef.current();
          dragCleanupRef.current = null;
        }
        mobileResizeCleanupRef.current?.();
        mobileResizeCleanupRef.current = null;
      };
    }


    // ── Desktop: arrow-hunt animation → draggable O ──────────────────────
    // Sequence:
    //   1. PORTFOLI + O appear instantly
    //   2. Arrow fires from right; dashed thread trails from viewport-right to its tail
    //   3. Arrow strikes O → O squash/recoil; arrow quivers; thread vanishes on impact
    //   4. Arrow lodges briefly, then reels the O rightward (nav line grows as the thread)
    //   5. Arrow dissolves; O locks at final position; drag active throughout

    // Refs to injected SVGs — declared here so the effect cleanup closure can reach them
    let arrowSvgEl: SVGSVGElement | null = null;
    let threadSvgEl: SVGSVGElement | null = null;

    // Layout values computed inside tl.call, needed by cleanup
    let oFinalX = 0;
    let finalLineWidth = 0;

    const tl = gsap.timeline();

    tl.call(() => {
      // ── Reveal PORTFOLI + O instantly ───────────────────────────
      const wrapper = oDragWrapperRef?.current;
      if (wrapper) { wrapper.style.minWidth = ""; gsap.set(wrapper, { x: 0 }); }
      full.style.display     = "none";
      portfoli.style.display = "inline";
      oEl.style.display      = "inline";
      lineEl.style.display   = "none";
      gsap.set([portfoli, oEl], { display: "inline", opacity: 1, rotation: 0 });
      gsap.set(oEl,   { position: "relative", x: 0, scaleX: 1, scaleY: 1 });
      gsap.set(lineEl, { display: "none", width: 0 });

      const cRect = headerRef.current?.getBoundingClientRect();
      if (!cRect) return;

      void oEl.offsetWidth; // force reflow so getBoundingClientRect is accurate
      const dragTarget  = (oDragWrapperRef?.current ?? oEl) as HTMLElement;
      const oRect       = oEl.getBoundingClientRect();
      const oWidth      = oRect.width;
      const oCenterY    = oRect.top + oRect.height / 2;
      const oScreenLeft = oRect.left;
      const padding     = window.innerWidth < 768 ? 16 : 32;
      const vpRight     = window.innerWidth - padding;
      const absEnd      = Math.min(cRect.width - padding, vpRight - cRect.left);
      const oFinalLeft  = Math.min(absEnd - oWidth / 2, vpRight - cRect.left - oWidth / 2);
      const oStartLeft  = oScreenLeft - cRect.left;

      oFinalX        = oFinalLeft - oStartLeft;
      finalLineWidth = Math.max(0, oFinalLeft - oStartLeft - 8);

      // Line starts at O position with zero width; grows rightward during pull
      Object.assign(lineEl.style, { display: "block", left: `${oStartLeft}px`, width: "0px", opacity: "1" });
      gsap.set(lineEl, { opacity: 1, width: 0 });
      gsap.set(oEl, { clearProps: "x" });

      const portfoliRect = portfoli.getBoundingClientRect();
      portfolioCache.cachedData = {
        portfolWidth:     portfoliRect.width,
        oFinalX,
        lineFinalWidth:   finalLineWidth,
        iOriginalPosition: oStartLeft,
        oStartX:          oStartLeft,
        iWidth:           0,
        containerWidth:   cRect.width,
      };
      portfolioCache.dataCalculated = true;
      portfolioCache.everCompleted  = true;

      // Lock wrapper width so layout stays stable during animation and drag
      dragTarget.style.minWidth = `${dragTarget.offsetWidth}px`;

      // ── Arrow SVG (portalled into body to escape overflow:hidden) ─────
      // Geometry: tip points LEFT (x=0), nock/tail at x=62.
      // GSAP x = screen position of the tip.
      const NS  = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg") as SVGSVGElement;
      svg.setAttribute("viewBox", "0 0 66 16");
      svg.setAttribute("width",   "66");
      svg.setAttribute("height",  "16");
      svg.setAttribute("aria-hidden", "true");
      Object.assign(svg.style, {
        position: "fixed", top: "0", left: "0",
        pointerEvents: "none", zIndex: "250",
        overflow: "visible", opacity: "0",
      });
      // shaft
      const svgShaft = document.createElementNS(NS, "line");
      svgShaft.setAttribute("x1", "2");  svgShaft.setAttribute("y1", "8");
      svgShaft.setAttribute("x2", "50"); svgShaft.setAttribute("y2", "8");
      svgShaft.setAttribute("stroke", COLORS.primary);
      svgShaft.setAttribute("stroke-width", "1.5");
      svgShaft.setAttribute("stroke-linecap", "round");
      // arrowhead tip pointing left
      const svgTip = document.createElementNS(NS, "polygon");
      svgTip.setAttribute("points", "0,8 11,3 11,13");
      svgTip.setAttribute("fill", COLORS.primary);
      // fletching top
      const svgF1 = document.createElementNS(NS, "line");
      svgF1.setAttribute("x1","50"); svgF1.setAttribute("y1","8");
      svgF1.setAttribute("x2","62"); svgF1.setAttribute("y2","2");
      svgF1.setAttribute("stroke", COLORS.accent);
      svgF1.setAttribute("stroke-width","2");
      svgF1.setAttribute("stroke-linecap","round");
      // fletching bottom
      const svgF2 = document.createElementNS(NS, "line");
      svgF2.setAttribute("x1","50"); svgF2.setAttribute("y1","8");
      svgF2.setAttribute("x2","62"); svgF2.setAttribute("y2","14");
      svgF2.setAttribute("stroke", COLORS.accent);
      svgF2.setAttribute("stroke-width","2");
      svgF2.setAttribute("stroke-linecap","round");
      // nock dot
      const svgNock = document.createElementNS(NS, "circle");
      svgNock.setAttribute("cx","64"); svgNock.setAttribute("cy","8"); svgNock.setAttribute("r","2");
      svgNock.setAttribute("fill", COLORS.primary);
      svg.append(svgShaft, svgTip, svgF1, svgF2, svgNock);
      document.body.appendChild(svg);
      arrowSvgEl = svg;

      // Arrow starts off-screen right; GSAP x = tip screen-X position
      const arrowStartX = window.innerWidth + 30;
      const arrowHitX   = oScreenLeft + oWidth * 0.35; // tip buries slightly into O
      const arrowBaseY  = oCenterY - 8;                // 8 = half of SVG height

      gsap.set(svg, { x: arrowStartX, y: arrowBaseY, rotation: 0, opacity: 1, scaleY: 1 });

      // ── Thread SVG (full-viewport overlay, x2 updated per-frame during flight) ──
      const tsvg = document.createElementNS(NS, "svg") as SVGSVGElement;
      Object.assign(tsvg.style, {
        position: "fixed", top: "0", left: "0",
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: "249",
        overflow: "visible", opacity: "0",
      });
      const tLine = document.createElementNS(NS, "line");
      tLine.setAttribute("stroke",           COLORS.primary);
      tLine.setAttribute("stroke-width",     "1");
      tLine.setAttribute("stroke-dasharray", "3 5");
      tLine.setAttribute("stroke-linecap",   "round");
      tLine.setAttribute("opacity",          "0.45");
      const vpEdgeStr = String(window.innerWidth);
      tLine.setAttribute("x1", vpEdgeStr); tLine.setAttribute("y1", String(oCenterY));
      tLine.setAttribute("x2", vpEdgeStr); tLine.setAttribute("y2", String(oCenterY));
      tsvg.appendChild(tLine);
      document.body.appendChild(tsvg);
      threadSvgEl = tsvg;

      // ── Hunt timeline (paused — started by the startAutoExpand effect) ──
      const huntTl = gsap.timeline({ paused: true });

      // Phase 1 — FLIGHT (0 → 0.40s)
      // x accelerates leftward; y dips slightly mid-flight (gravity arc) then recovers
      huntTl.to(svg, {
        x: arrowHitX,
        duration: 0.40,
        ease: "power3.in",
        onStart() { gsap.set(tsvg, { opacity: 1 }); },
        onUpdate() {
          // Thread tail (x2) tracks the nock at svg-x + 66 (full width)
          const ax = gsap.getProperty(svg, "x") as number;
          tLine.setAttribute("x1", String(window.innerWidth));
          tLine.setAttribute("y1", String(oCenterY));
          tLine.setAttribute("x2", String(ax + 66));
          tLine.setAttribute("y2", String(oCenterY));
        },
      }, 0);
      huntTl.to(svg, {
        keyframes: [
          { y: arrowBaseY + 5, duration: 0.20, ease: "sine.in"  },
          { y: arrowBaseY,     duration: 0.20, ease: "sine.out" },
        ],
      }, 0);

      // Phase 2 — IMPACT (0.40s)
      // Arrow: shaft vibrates (scaleY wobble = rapid oscillation)
      // O: squash on X, stretch on Y, then spring back; accent flash
      // Thread: fades out on contact
      huntTl.to(svg, {
        keyframes: [
          { scaleY: 1.5, duration: 0.05, ease: "power3.out" },
          { scaleY: 0.6, duration: 0.06, ease: "sine.inOut" },
          { scaleY: 1.3, duration: 0.05, ease: "sine.inOut" },
          { scaleY: 0.8, duration: 0.05, ease: "sine.inOut" },
          { scaleY: 1.0, duration: 0.07, ease: "sine.out"   },
        ],
        transformOrigin: "0% 50%",
      }, 0.40);
      huntTl.to(oEl, {
        keyframes: [
          { scaleX: 1.22, scaleY: 0.78, x: -5, duration: 0.06, ease: "power3.out" },
          { scaleX: 0.86, scaleY: 1.16, x:  2, duration: 0.08, ease: "power2.inOut" },
          { scaleX: 1.06, scaleY: 0.95, x:  0, duration: 0.10, ease: "power2.out"  },
          { scaleX: 1.00, scaleY: 1.00, x:  0, duration: 0.10, ease: "back.out(3)" },
        ],
        onStart() { gsap.to(oEl, { color: COLORS.accent, duration: 0.07 }); },
      }, 0.40);
      huntTl.to(tsvg, {
        opacity: 0, duration: 0.10, ease: "power2.in",
        onComplete() {
          if (tsvg.parentNode) tsvg.parentNode.removeChild(tsvg);
          threadSvgEl = null;
        },
      }, 0.40);

      // Phase 3 — LODGE (0.68s → 0.90s)
      // Arrow tilts slightly downward as if it caught the O's weight
      huntTl.to(svg, {
        rotation: -4, duration: 0.20, ease: "power2.out",
        transformOrigin: "0% 50%",
      }, 0.68);

      // Phase 4 — PULL (0.90s → 2.20s)
      // O + embedded arrow travel right; nav line grows proportionally as the thread.
      // ease: back.out for subtle overshoot — O pulls free with slight momentum snap.
      huntTl.to(dragTarget, {
        x: oFinalX,
        duration: 1.30,
        ease: "back.out(0.5)",
        onUpdate() {
          const cx = gsap.getProperty(dragTarget, "x") as number;
          lineEl.style.width = `${Math.max(0, Math.min(cx, finalLineWidth))}px`;
          // Arrow tip tracks O — keep it pinned to the O's left face
          const r = oEl.getBoundingClientRect();
          gsap.set(svg, { x: r.left + r.width * 0.35 });
        },
      }, 0.90);
      // Arrow straightens as O accelerates free
      huntTl.to(svg, {
        rotation: 0, duration: 0.45, ease: "power2.out",
        transformOrigin: "0% 50%",
      }, 0.90);
      // O colour returns to normal mid-pull
      huntTl.to(oEl, { color: COLORS.primary, duration: 0.35, ease: "power2.out" }, 1.05);

      // Phase 5 — DISSOLVE (2.10s → 2.45s)
      // Arrow fades and slides further right, as if released
      huntTl.to(svg, {
        opacity: 0, x: "+=55", duration: 0.35, ease: "power2.in",
        onComplete() {
          if (svg.parentNode) svg.parentNode.removeChild(svg);
          arrowSvgEl = null;
        },
      }, 2.10);

      // Phase 6 — LOCK IN (2.20s): snap final state, mark expansion complete
      huntTl.call(() => {
        gsap.set(dragTarget, { x: oFinalX, scaleX: 1, scaleY: 1 });
        gsap.set(oEl, { scaleX: 1, scaleY: 1, color: COLORS.primary });
        lineEl.style.width = `${finalLineWidth}px`;
        gsap.set(lineEl, { width: finalLineWidth });
        dragTarget.style.cursor        = "grab";
        dragTarget.style.pointerEvents = "auto";
        setIsComplete(true);
      }, [], 2.20);

      pendingAutoTlRef.current = huntTl;

      // ── Drag (active from frame 1 — user can grab O at any moment) ──────
      dragTarget.style.cursor        = "grab";
      dragTarget.style.pointerEvents = "auto";
      dragTarget.style.position      = "relative";
      dragTarget.style.zIndex        = "15";
      dragTarget.style.touchAction   = "none";

      const quickX    = gsap.quickTo(dragTarget, "x", { duration: 0.12, ease: "power2.out" });
      const quickLine = gsap.quickTo(
        lineEl as unknown as gsap.TweenTarget, "width",
        { duration: 0.12, ease: "power2.out", unit: "px" }
      );
      const threshold = oFinalX * 0.6;

      const applyDrag = (x: number) => {
        const c = Math.max(0, Math.min(x, oFinalX));
        quickX(c);
        quickLine(Math.max(0, Math.min(c, finalLineWidth)));
        if (c < threshold) setIsComplete(false);
      };

      let startCX = 0, startX2 = 0;

      const onMove = (e: PointerEvent) => applyDrag(startX2 + (e.clientX - startCX));

      const onUp = (e?: PointerEvent) => {
        if (e) dragTarget.releasePointerCapture(e.pointerId);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerup",    onUpE);
        document.removeEventListener("pointercancel", onUpE);
        dragTarget.style.cursor = "grab";
        const cx = (gsap.getProperty(dragTarget, "x") as number) || 0;
        userExpandedRef.current = cx >= threshold;
        if (cx >= threshold) {
          gsap.to(dragTarget, { x: oFinalX, duration: 0.35, ease: "power2.out" });
          gsap.to(lineEl, {
            width: finalLineWidth, duration: 0.35, ease: "power2.out",
            onComplete() {
              gsap.set(dragTarget, { x: oFinalX });
              lineEl.style.width             = `${finalLineWidth}px`;
              dragTarget.style.cursor        = "grab";
              dragTarget.style.pointerEvents = "auto";
              setIsComplete(true);
            },
          });
        } else {
          setIsComplete(false);
          gsap.to(dragTarget, { x: 0, duration: 0.3, ease: "power2.out" });
          gsap.to(lineEl, {
            width: 0, duration: 0.3, ease: "power2.out",
            onComplete() { dragTarget.style.minWidth = `${dragTarget.offsetWidth}px`; },
          });
        }
      };
      const onUpE = (e: PointerEvent) => onUp(e);

      const onDown = (e: PointerEvent) => {
        e.preventDefault();
        // User grabs O — kill hunt animation and clean up overlay SVGs
        if (huntTl.isActive()) {
          huntTl.kill();
          pendingAutoTlRef.current = null;
          if (arrowSvgEl?.parentNode)  arrowSvgEl.parentNode.removeChild(arrowSvgEl);
          if (threadSvgEl?.parentNode) threadSvgEl.parentNode.removeChild(threadSvgEl);
          arrowSvgEl = threadSvgEl = null;
          gsap.set(oEl, { scaleX: 1, scaleY: 1, x: 0, color: COLORS.primary });
        }
        onDragStart?.();
        startCX  = e.clientX;
        startX2  = (gsap.getProperty(dragTarget, "x") as number) || 0;
        dragTarget.style.cursor = "grabbing";
        dragTarget.setPointerCapture(e.pointerId);
        document.addEventListener("pointermove", onMove);
        document.addEventListener("pointerup",    onUpE);
        document.addEventListener("pointercancel", onUpE);
      };

      dragTarget.addEventListener("pointerdown", onDown as EventListener);
    });

    // Resize handler — repositions O + line when already expanded after a viewport resize
    const { handler: handleResize, cancel: cancelResize } = createResizeHandler(headerRef, oDragWrapperRef);
    window.addEventListener("resize", handleResize);

    return () => {
      saveExpandedStateOnCleanup();
      cancelResize();
      window.removeEventListener("resize", handleResize);
      if (pendingAutoTlRef.current) { pendingAutoTlRef.current.kill(); pendingAutoTlRef.current = null; }
      if (arrowSvgEl?.parentNode)  arrowSvgEl.parentNode.removeChild(arrowSvgEl);
      if (threadSvgEl?.parentNode) threadSvgEl.parentNode.removeChild(threadSvgEl);
      arrowSvgEl = threadSvgEl = null;
      if (dragCleanupRef.current) { dragCleanupRef.current(); dragCleanupRef.current = null; }
      tl.kill();
    };
  }, [isActive, shouldAnimate, isMobile, staticExpand, headerRef, oDragWrapperRef]);

  // When startAutoExpand becomes true (e.g. dot landed / Software Engineer appears), run auto animation only if user hasn't expanded yet
  useEffect(() => {
    if (!startAutoExpand || isComplete) return;
    const tl = pendingAutoTlRef.current;
    if (tl) tl.play();
  }, [startAutoExpand, isComplete]);

  const collapsePortfolio = useCallback(() => setIsComplete(false), []);

  return { isPortfolioAnimationComplete: isComplete, collapsePortfolio };
}
