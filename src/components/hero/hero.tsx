"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import localFont from "next/font/local";
import gsap from "gsap";
import { useLottie } from "lottie-react";
import { COLORS, FONTS, Z_LAYERS } from "./constants";

const pouitiesFont = localFont({
  src: "../../../public/fonts/pouities/Pouities.ttf",
  display: "swap",
});
import { NAV_SECTIONS } from "./types";
import type { HeroProps } from "./types";
import { useIsMobile, checkIsMobile } from "./hooks/useIsMobile";
import { useMariamSvg } from "./hooks/useMariamSvg";
import { useDotAnimation } from "./hooks/useDotAnimation";
import { usePortfolWidth } from "./hooks/usePortfolWidth";
import { usePortfolioAnimation, hasPortfolioEverCompleted } from "./hooks/usePortfolioAnimation";
import { hasDotAnimationEverCompleted } from "./hooks/useDotAnimation";
import { useEngineerText } from "./hooks/useEngineerText";
import { useHeroNavigation } from "./hooks/useHeroNavigation";

// Hand larger than default for visibility (bigger than native cursor)
const HAND_CURSOR_HEIGHT = 108;
const HAND_CURSOR_WIDTH = 162; // 3:2 aspect (Lottie)

function HeroDragHandLottie({ animationData, loop = true }: { animationData: object; loop?: boolean }) {
  const { View } = useLottie(
    { animationData, loop, autoplay: true },
    { height: `${HAND_CURSOR_HEIGHT}px`, width: `${HAND_CURSOR_WIDTH}px` }
  );
  return (
    <span
      className="hero-drag-hand"
      style={{
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translate(50%, -50%) rotate(-90deg)",
        display: "inline-block",
        pointerEvents: "none",
      }}
      aria-hidden
    >
      {View}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Hero Component
// ─────────────────────────────────────────────────────────────────────
const Hero: React.FC<HeroProps> = ({ onNavigate, onReady, isActive = true }) => {
  // ── Refs ────────────────────────────────────────────────────────
  const portfolioHeaderRef = useRef<HTMLDivElement>(null);
  const numberSevenRef = useRef<SVGSVGElement>(null);
  const svgMariamTextRef = useRef<SVGTextElement>(null);
  const svgMRef = useRef<SVGTSpanElement>(null);
  const svgA1Ref = useRef<SVGTSpanElement>(null);
  const svgRRef = useRef<SVGTSpanElement>(null);
  const svgIRef = useRef<SVGTSpanElement>(null);
  const svgA2Ref = useRef<SVGTSpanElement>(null);
  const svgM2Ref = useRef<SVGTSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const liquidDropsRef = useRef<HTMLDivElement>(null);
  const engineerTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [portfolioRevealReady, setPortfolioRevealReady] = useState(false);
  const [engineerRevealComplete, setEngineerRevealComplete] = useState(false);
  const oDragWrapperRef = useRef<HTMLSpanElement>(null);
  const [dragHandData, setDragHandData] = useState<object | null>(null);
  const [userStartedDrag, setUserStartedDrag] = useState(false);
  const [isDotClicked, setIsDotClicked] = useState(false);
  const isDotClickedRef = useRef(false);
  const dotPreShownRef = useRef(false);
  const [showDotClickPrompt, setShowDotClickPrompt] = useState(false);
  const [dotClickPos, setDotClickPos] = useState<{ x: number; y: number; size: number } | null>(null);
  const dotClickSvgRef = useRef<SVGSVGElement>(null);
  const dotClickTlRef = useRef<gsap.core.Timeline | null>(null);
  const isMobile = useIsMobile();

  // Flip once on the client so portals are never rendered during SSR
  useEffect(() => setIsMounted(true), []);

  // ── Hooks — each owns one animation phase ──────────────────────
  //
  // Dependency chain (no circular deps):
  //   usePortfolWidth → portfolWidth
  //   useMariamSvg(portfolWidth) → isMariamReady
  //   useDotAnimation(isMariamReady) → isDotAnimationStarted / isDotAnimationComplete
  //   usePortfolioAnimation(portfolioRevealReady) → isPortfolioAnimationComplete (user drags O to right)
  //   useEngineerText(isDotAnimationComplete)
  //   useHeroNavigation(isPortfolioAnimationComplete)

  const portfolWidth = usePortfolWidth(portfolioHeaderRef);

  const { isMariamReady } = useMariamSvg(
    numberSevenRef,
    portfolWidth,
    portfolioHeaderRef,
    isActive,
  );

  const onDotLandedOnI = useCallback(() => setPortfolioRevealReady(true), []);
  const { isDotAnimationStarted, isDotAnimationComplete, isDotFallenFromM } = useDotAnimation(
    numberSevenRef,
    svgIRef,
    svgA2Ref,
    svgM2Ref,
    dotRef,
    liquidDropsRef,
    isActive,
    isMariamReady,
    isMobile,
    isDotClicked,
    portfolioHeaderRef,
    onDotLandedOnI,
  );

  const handleDragStart = useCallback(() => setUserStartedDrag(true), []);
  const { isPortfolioAnimationComplete, showDragHint } = usePortfolioAnimation(
    portfolioHeaderRef,
    engineerRevealComplete,
    isActive,
    isMobile,
    handleDragStart,
    oDragWrapperRef as React.RefObject<HTMLDivElement | null>,
  );

  // Drag phase starts after "Software Engineer" is fully revealed (not when dot touches)

  // Load hand Lottie for hero drag hint
  useEffect(() => {
    fetch("/animations/drag-hand.json")
      .then((r) => r.json())
      .then(setDragHandData)
      .catch(() => {});
  }, []);

  useEngineerText(
    engineerTextRef,
    numberSevenRef,
    svgIRef,
    svgA2Ref,
    svgM2Ref,
    portfolioRevealReady || isDotAnimationComplete,
    isMariamReady,
    useCallback(() => setEngineerRevealComplete(true), []),
  );
  useHeroNavigation(navRef, portfolioHeaderRef, isPortfolioAnimationComplete);

  // ── Dot click prompt on "ı" ─────────────────────────────────
  // Calculate "ı" dot position after Mariam SVG is ready.
  // Debounced on resize to avoid layout thrash on every pixel.
  useEffect(() => {
    if (!isMariamReady || !svgIRef.current) return;
    const updatePos = () => {
      const iRect = svgIRef.current?.getBoundingClientRect();
      if (!iRect) return;
      const mobile = checkIsMobile();
      const baseDotSize = iRect.height * 0.135;
      const dotSize = mobile ? baseDotSize * 0.6 : baseDotSize;
      setDotClickPos({
        x: iRect.left + iRect.width / 2,
        y: iRect.top + iRect.height * 0.19,
        size: dotSize,
      });
    };
    updatePos();

    // Debounce > Mariam's 150ms + 3-frame rAF chain so "ı" position
    // is fresh after the SVG re-layouts.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const debouncedUpdate = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        requestAnimationFrame(() => requestAnimationFrame(updatePos));
      }, 250);
    };
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      window.removeEventListener("resize", debouncedUpdate);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }, [isMariamReady]);

  // Pre-show the actual dot at "ı" position before click.
  // Separates the one-time blur-in entrance from resize repositioning
  // so the dot doesn't flash/re-animate whenever dotClickPos updates.
  useEffect(() => {
    if (!isMariamReady || isDotClicked || !dotRef.current || !dotClickPos) return;
    if (hasDotAnimationEverCompleted()) return;

    const dot = dotRef.current;
    const size = dotClickPos.size;
    const baseY = dotClickPos.y;
    const baseX = dotClickPos.x - size / 2;

    // Always keep size/position up-to-date (covers resize)
    Object.assign(dot.style, {
      display: "block",
      visibility: "visible",
      position: "fixed",
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: COLORS.primary,
      top: "0px",
      left: "0px",
      pointerEvents: "auto",
      cursor: "pointer",
      transformOrigin: "center center",
    });

    if (!dotPreShownRef.current) {
      // First time: blur-in to match the hero container's entrance
      // (page.tsx: 0.8s duration, 0.2s delay on first load).
      gsap.set(dot, {
        x: baseX,
        y: baseY,
        opacity: 0,
        filter: "blur(15px)",
        rotation: 0,
        scale: 1,
      });
      gsap.to(dot, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        onComplete: () => { dotPreShownRef.current = true; },
      });
    } else {
      // Resize: snap to new position/size without re-animating
      gsap.set(dot, {
        x: baseX,
        y: baseY,
        rotation: 0,
        scale: 1,
      });
    }

    // Hover: expand down (sag toward ı) + dot and "ı" match accent (touching).
    const hoverDrop = 8;
    const svgI = svgIRef.current;
    let hoverTl: gsap.core.Timeline | null = null;
    const onMouseEnter = () => {
      if (hoverTl) hoverTl.kill();
      dot.style.transformOrigin = "50% 0%";
      if (svgI) gsap.to(svgI, { fill: COLORS.accent, duration: 0.22, ease: "sine.out" });
      hoverTl = gsap.timeline();
      hoverTl.to(dot, {
        y: baseY + hoverDrop,
        scaleX: 0.96,
        scaleY: 1.08,
        backgroundColor: COLORS.accent,
        duration: 0.22,
        ease: "sine.out",
      });
    };
    const onMouseLeave = () => {
      if (hoverTl) hoverTl.kill();
      dot.style.transformOrigin = "center center";
      if (svgI) gsap.to(svgI, { fill: COLORS.primary, duration: 0.24, ease: "sine.out" });
      gsap.to(dot, {
        y: baseY,
        scaleX: 1,
        scaleY: 1,
        backgroundColor: COLORS.primary,
        duration: 0.24,
        ease: "sine.out",
      });
    };

    dot.addEventListener("mouseenter", onMouseEnter);
    dot.addEventListener("mouseleave", onMouseLeave);

    return () => {
      dot.removeEventListener("mouseenter", onMouseEnter);
      dot.removeEventListener("mouseleave", onMouseLeave);
      if (hoverTl) hoverTl.kill();
      // Don't hide on resize re-runs (dotPreShownRef stays true).
      // Don't hide when isDotClicked transitions (animation takes over).
      // Only hide if the dot was never fully shown (e.g. early unmount).
      if (!isDotClickedRef.current && !hasDotAnimationEverCompleted() && !dotPreShownRef.current) {
        Object.assign(dot.style, {
          display: "none",
          opacity: "0",
          visibility: "hidden",
          pointerEvents: "none",
          cursor: "default",
        });
      }
    };
  }, [isMariamReady, isDotClicked, dotClickPos]);

  // Show dot click prompt
  useEffect(() => {
    if (isMariamReady && !isDotClicked && isActive && !hasDotAnimationEverCompleted() && dotClickPos) {
      const timer = setTimeout(() => setShowDotClickPrompt(true), 1200);
      return () => clearTimeout(timer);
    }
    if (isDotClicked || hasDotAnimationEverCompleted()) setShowDotClickPrompt(false);
  }, [isMariamReady, isDotClicked, isActive, dotClickPos]);

  // Animate dot click SVG: draw once, then sway
  useEffect(() => {
    if (!showDotClickPrompt || !dotClickSvgRef.current) return;
    const svgEl = dotClickSvgRef.current;

    gsap.set(svgEl, {
      rotation: 0,
      transformOrigin: "50% 100%",
      opacity: 0,
    });

    // Fade in then sway
    gsap.to(svgEl, { opacity: 1, duration: 0.4, ease: "power2.out" });

    const swayTl = gsap.timeline({ repeat: -1, yoyo: true, delay: 0.4 });
    dotClickTlRef.current = swayTl;
    swayTl.fromTo(svgEl, { rotation: -4 }, { rotation: 4, duration: 1, ease: "sine.inOut" });

    return () => {
      if (dotClickTlRef.current) dotClickTlRef.current.kill();
      gsap.killTweensOf(svgEl);
    };
  }, [showDotClickPrompt]);

  // Handle dot click
  const handleDotClick = useCallback(() => {
    if (isDotClicked) return;
    // Set ref synchronously BEFORE state — prevents the pre-show
    // cleanup from hiding the dot during the React commit phase
    isDotClickedRef.current = true;
    if (dotClickTlRef.current) dotClickTlRef.current.kill();
    if (dotClickSvgRef.current) {
      gsap.to(dotClickSvgRef.current, { opacity: 0, scale: 0.8, duration: 0.3, ease: "power2.in" });
    }
    // Remove click interactivity from the dot
    if (dotRef.current) {
      Object.assign(dotRef.current.style, {
        pointerEvents: "none",
        cursor: "default",
      });
    }
    setIsDotClicked(true);
    setShowDotClickPrompt(false);
  }, [isDotClicked]);

  // ── Call onReady when Mariam is positioned ─────────────────────
  useEffect(() => {
    if (isMariamReady && onReady) {
      requestAnimationFrame(() => requestAnimationFrame(onReady));
    }
  }, [isMariamReady, onReady]);

  // ── Lock scroll on mobile ──────────────────────────────────────
  useEffect(() => {
    if (!isMobile) return;
    const saved = {
      bodyOverflow: document.body.style.overflow,
      bodyHeight: document.body.style.height,
      htmlOverflow: document.documentElement.style.overflow,
    };
    Object.assign(document.body.style, {
      overflow: "hidden",
      overflowY: "hidden",
      height: "100vh",
      position: "fixed",
      width: "100%",
      top: "0",
      left: "0",
    });
    Object.assign(document.documentElement.style, {
      overflow: "hidden",
      overflowY: "hidden",
      height: "100vh",
    });

    const prevent = (e: Event) => e.preventDefault();
    document.addEventListener("touchmove", prevent, { passive: false });
    document.addEventListener("wheel", prevent, { passive: false });

    return () => {
      Object.assign(document.body.style, {
        overflow: saved.bodyOverflow,
        height: saved.bodyHeight,
        position: "",
        width: "",
        top: "",
        left: "",
      });
      document.documentElement.style.overflow = saved.htmlOverflow;
      document.removeEventListener("touchmove", prevent);
      document.removeEventListener("wheel", prevent);
    };
  }, [isMobile]);


  // ── Render ─────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      className="hero-section"
      style={{ backgroundColor: COLORS.heroBackground }}
    >
      {/* SVG filter for glass effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves={2} seed={92} result="noise" />
            <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale={110} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* ── PORTFOLIO header ───────────────────────────────────── */}
      <div className="hero-yellow-frame">
        <div className="hero-frame-marquee hero-frame-marquee-top">
          <div className="hero-cover-header">
            <div className="hero-cover-header-line" ref={portfolioHeaderRef}>
              <span className="hero-cover-title-full" aria-label="Portfolio">{"PORTFOLI"}
                <span className="hero-o-trigger" aria-hidden="true">{"O"}</span>
              </span>
              <span className="hero-cover-title-portfol" style={{ display: "none" }} aria-hidden="true">PORTFOL</span>
              <span className="hero-cover-title-i" style={{ display: "none", opacity: 1 }} aria-hidden="true">I</span>
              <span ref={oDragWrapperRef} className="hero-o-drag-wrapper" style={{ position: "relative", display: "inline-flex", alignItems: "center", contain: "layout" }}>
                <span className="hero-cover-title-o" style={{ display: "none", opacity: 1 }} aria-label="Drag to expand navigation">O</span>
                {showDragHint && dragHandData && (
                  <HeroDragHandLottie animationData={dragHandData} loop={false} />
                )}
              </span>
              <div
                className="hero-cover-title-line"
                style={{
                  display: "none",
                  height: "1px",
                  backgroundColor: COLORS.line,
                  opacity: 0.4,
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
                aria-hidden="true"
              />

              {/* Navigation links — rendered after portfolio animation */}
              {isPortfolioAnimationComplete && (
                <nav ref={navRef} className="hero-site-navigation">
                  <ul className="hero-nav-links">
                    {NAV_SECTIONS.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          onClick={(e) => { e.preventDefault(); onNavigate(s.id); }}
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mariam SVG ─────────────────────────────────────────── */}
      {portfolWidth > 0 && (
        <svg
          ref={numberSevenRef}
          className="hero-number-seven"
          style={{ position: "fixed", zIndex: Z_LAYERS.mariamSvg, pointerEvents: "none", margin: 0, padding: 0 }}
        >
          <text
            ref={svgMariamTextRef}
            className="hero-mariam-text"
            x="0"
            y="0"
            fill={COLORS.primary}
            fontFamily={FONTS.display}
            textAnchor="start"
            dominantBaseline="hanging"
            style={{ letterSpacing: "0" }}
          >
            <tspan ref={svgMRef}>M</tspan>
            <tspan ref={svgA1Ref}>a</tspan>
            <tspan ref={svgRRef}>r</tspan>
            <tspan ref={svgIRef}>ı</tspan>
            <tspan ref={svgA2Ref}>a</tspan>
            <tspan ref={svgM2Ref}>m</tspan>
          </text>

        </svg>
      )}

      {/* ── Dot overlay (React Portal — proper lifecycle & z-index) */}
      {isMounted &&
        createPortal(
          <div
            ref={dotRef}
            className="hero-dot-overlay"
            onClick={!isDotClicked && showDotClickPrompt ? handleDotClick : undefined}
            role={!isDotClicked && showDotClickPrompt ? "button" : undefined}
            tabIndex={!isDotClicked && showDotClickPrompt ? 0 : undefined}
            onKeyDown={!isDotClicked && showDotClickPrompt ? (e: React.KeyboardEvent) => { if (e.key === "Enter") handleDotClick(); } : undefined}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              display: "none",
              zIndex: !isDotClicked && showDotClickPrompt ? Z_LAYERS.frame + 50 : Z_LAYERS.dot,
              pointerEvents: "none",
            }}
          />,
          document.body,
        )}

      {/* ── Three liquid drops (fall into O, get absorbed, fuel O motion) */}
      {isMounted &&
        createPortal(
          <div
            ref={liquidDropsRef}
            className="hero-liquid-drops"
            aria-hidden
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              display: "none",
              zIndex: Z_LAYERS.dot,
            }}
          >
            <div className="hero-liquid-drop" />
            <div className="hero-liquid-drop" />
            <div className="hero-liquid-drop" />
          </div>,
          document.body,
        )}

      {/* ── Engineer text (React Portal) ──────────────────────── */}
      {isMounted &&
        createPortal(
          <div
            ref={engineerTextRef}
            className={`hero-engineer-text ${pouitiesFont.className}`}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              color: COLORS.primary,
              fontFamily: pouitiesFont.style.fontFamily,
              fontSize: "clamp(2rem, 6vw, 6rem)", // initial — overridden by useEngineerText
              zIndex: Z_LAYERS.engineerText,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              overflow: "visible",
              opacity: 0,
              filter: "blur(0px)",
            }}
          >
            Software  Engineer
          </div>,
          document.body,
        )}

      {/* ── Dot click SVG (React Portal) ───────────────────────── */}
      {isMounted && showDotClickPrompt && dotClickPos && !isDotClicked &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: `${dotClickPos.x}px`,
              top: `${dotClickPos.y - 4}px`,
              transform: "translateX(-50%) translateY(-100%)",
              zIndex: Z_LAYERS.dot + 10,
              pointerEvents: "none",
            }}
          >
            <svg
              ref={dotClickSvgRef}
              viewBox="0 0 100 70"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              style={{
                width: "clamp(55px, 7vw, 90px)",
                height: "auto",
                display: "block",
                color: COLORS.primary,
                opacity: 0,
                overflow: "visible",
              }}
            >
              <g>
                {/* Arrow — at bottom, head points down toward dot */}
                <g transform="matrix(1.554,0.136,-0.136,1.554,9.843,38)">
                  <g transform="translate(4.016,8)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2" d="M2.016,-6C1.235,-5.932,0.736,-5.403,0.158,-4.91C-0.567,-4.288,-1.054,-3.599,-1.346,-2.694C-1.559,-2.053,-1.76,-1.413,-1.888,-0.748C-2.016,-0.083,-1.986,0.545,-1.973,1.185C-1.949,2.454,-1.486,3.968,-0.409,4.732C-0.153,4.91,0.145,5.021,0.413,5.175C0.657,5.317,0.865,5.514,1.12,5.625C1.284,5.692,1.327,5.723,1.454,5.822C1.582,5.92,1.655,5.982,1.839,6" />
                  </g>
                  <g transform="translate(4.74,13.192)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2" d="M-2.506,2.443C-2.506,2.443,-2.57,2.451,-2.57,2.451C-1.515,2.31,-0.466,2.249,0.589,2.108L1.696,1.959C1.878,1.935,2.265,1.958,2.396,1.828C2.57,1.656,2.357,0.978,2.328,0.764C2.294,0.508,2.226,0.241,2.24,-0.016C2.255,-0.252,2.281,-0.494,2.276,-0.733C2.268,-1.067,2.274,-1.381,2.229,-1.715C2.196,-1.96,2.164,-2.206,2.13,-2.451" />
                  </g>
                </g>
                {/* Click text — at top, near the arrow tail */}
                <g transform="matrix(1.272,-0.27,0.27,1.272,18,27)">
                  <g transform="translate(51.831,5.275)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M0.35,-2.47C0.028,-1.519,-0.195,-0.803,-0.175,0.175C-0.167,0.561,-0.183,0.939,-0.175,1.317C-0.167,1.69,-0.35,2.104,-0.211,2.47" />
                  </g>
                  <g transform="translate(51.162,12.575)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M0.193,0.304C0.109,0.081,-0.034,-0.13,-0.193,-0.304C-0.157,-0.169,-0.125,-0.029,-0.098,0.11" />
                  </g>
                  <g transform="translate(5.635,7.245)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M2.218,-3.88C1.904,-3.8,1.737,-4.134,1.453,-4.226C1.013,-4.373,0.674,-4.214,0.253,-4.146C-0.253,-4.063,-0.709,-4.15,-1.159,-3.84C-1.497,-3.605,-1.784,-3.196,-2.075,-2.905C-2.273,-2.71,-2.471,-2.524,-2.635,-2.301C-2.813,-2.058,-2.964,-1.796,-3.016,-1.497C-3.135,-0.833,-2.651,-0.376,-2.779,0.248C-2.901,0.857,-3.089,1.35,-2.826,1.963C-2.508,2.706,-2.026,2.933,-1.422,3.414C-1.112,3.661,-0.781,3.884,-0.416,4.039C-0.188,4.134,0.169,4.373,0.407,4.341C0.781,4.289,1.151,3.983,1.513,3.864C1.974,3.709,2.679,3.486,3.135,3.438" />
                  </g>
                  <g transform="translate(41.164,7.61)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M-0.428,5.047C-0.448,4.12,-0.463,3.19,-0.487,2.263C-0.503,1.655,-0.515,1.106,-0.392,0.505C-0.3,0.056,-0.181,-0.326,-0.181,-0.783C-0.181,-1.487,-0.121,-2.092,0.002,-2.788C0.073,-3.186,0.141,-3.599,0.244,-3.993C0.34,-4.351,0.515,-4.661,0.455,-5.047" />
                  </g>
                  <g transform="translate(43.777,6.097)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M-2.153,1.74C-2.027,0.944,-0.944,0.475,-0.371,0.022C-0.017,-0.261,0.403,-0.42,0.741,-0.71C1.191,-1.096,1.616,-1.442,2.153,-1.74C2.137,-1.609,2.066,-1.509,1.931,-1.446" />
                  </g>
                  <g transform="translate(43.497,9.02)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M-1.606,-2.253C-1.535,-1.807,-1.293,-1.211,-1.09,-0.801C-0.704,-0.034,-0.004,0.253,0.656,0.666C1.142,0.969,1.363,1.772,1.606,2.253" />
                  </g>
                  <g transform="translate(24.172,2.806)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M0.062,0.115L0.062,0.012C0.062,0.095,0.013,0.259,0.141,0.239C0.268,0.219,0.26,-0.004,0.193,-0.072C-0.054,-0.306,-0.268,0.306,0.053,0.167C0.086,0.032,-0.13,0.016,-0.125,0.175" />
                  </g>
                  <g transform="translate(24.518,9.215)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M0.093,2.746C0.149,2.535,0.193,2.242,0.157,2.018C0.113,1.745,-0.014,1.565,-0.026,1.283C-0.038,1.036,0.018,0.798,-0.026,0.551C-0.074,0.268,-0.169,0.065,-0.181,-0.224C-0.193,-0.514,-0.161,-0.81,-0.157,-1.099C-0.157,-1.664,0.038,-2.158,0.061,-2.746" />
                  </g>
                  <g transform="translate(16.343,7.284)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M-1.579,-4.2C-1.948,-3.929,-1.758,-3.141,-1.833,-2.744C-1.953,-2.119,-2.188,-1.598,-2.195,-0.954C-2.203,-0.318,-2.227,0.322,-2.232,0.959C-2.235,1.468,-2.351,1.846,-2.414,2.343C-2.477,2.839,-2.282,3.373,-2.112,3.85C-1.977,3.695,-1.571,4.161,-1.396,4.149C-0.713,4.109,-0.044,4.097,0.645,4.113C0.982,4.12,1.32,4.124,1.654,4.137C1.921,4.145,2.216,4.2,2.477,4.128" />
                  </g>
                  <g transform="translate(32.644,7.785)">
                    <path strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth="2.5" d="M2.663,-3.592C2.642,-3.815,2.105,-3.798,1.954,-3.794C1.791,-3.794,1.628,-3.783,1.465,-3.794C1.27,-3.811,1.091,-3.882,0.9,-3.918C0.168,-4.044,-0.233,-3.656,-0.746,-3.281C-1.295,-2.884,-1.617,-2.431,-1.852,-1.822C-2.051,-1.309,-2.11,-0.76,-2.357,-0.263C-2.428,-0.116,-2.516,0.023,-2.56,0.178C-2.587,0.279,-2.6,0.382,-2.604,0.486C-2.62,0.755,-2.623,1.03,-2.635,1.301C-2.639,1.384,-2.663,1.491,-2.635,1.574C-2.604,1.671,-2.508,1.762,-2.456,1.845C-2.297,2.091,-2.138,2.335,-1.987,2.585C-1.876,2.768,-1.78,2.966,-1.637,3.125C-1.51,3.266,-1.359,3.388,-1.224,3.52C-1.128,3.615,-1.037,3.698,-0.913,3.754C-0.834,3.79,-0.75,3.814,-0.671,3.833C-0.516,3.874,-0.361,3.889,-0.201,3.901C0.141,3.93,0.475,4.044,0.822,4.04C1.107,4.04,1.37,4.029,1.652,3.982" />
                  </g>
                </g>
              </g>
            </svg>
          </div>,
          document.body,
        )}

      {/* ── Styles ─────────────────────────────────────────────── */}
      <style jsx>{`
        /* ── Section ────────────────────────────────────────────── */
        .hero-section {
          display: flex;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: ${COLORS.primary};
          position: relative;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 768px) {
          .hero-section { padding: 0.5rem; }
        }

        /* ── Yellow frame (auto so O is clickable; dot raises z when it needs clicks) ─ */
        .hero-yellow-frame {
          position: fixed;
          inset: 0;
          pointer-events: auto;
          z-index: ${Z_LAYERS.frame};
          overflow: hidden;
          margin: 0;
          padding: 0;
        }

        /* ── Frame marquee (top bar) ───────────────────────────── */
        .hero-frame-marquee {
          position: absolute;
          background-color: transparent;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }
        .hero-frame-marquee::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          pointer-events: none;
        }
        .hero-frame-marquee::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          isolation: isolate;
          pointer-events: none;
        }
        .hero-frame-marquee-top {
          top: 0;
          left: 0;
          right: 0;
          height: clamp(60px, 8vw, 100px);
          position: relative;
          overflow: visible;
          box-shadow: none;
          padding-right: clamp(1rem, 2vw, 2rem);
        }
        .hero-frame-marquee-top::before,
        .hero-frame-marquee-top::after {
          display: none;
        }

        /* ── Header ────────────────────────────────────────────── */
        .hero-cover-header {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 0.5rem;
          font-family: ${FONTS.display};
          width: 100%;
          padding: 0 1rem;
          z-index: 10;
          pointer-events: auto;
          overflow: visible;
        }
        .hero-cover-header-line {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          gap: 0;
          position: relative;
        }

        /* ── PORTFOLIO title elements ──────────────────────────── */
        .hero-cover-title-full,
        .hero-cover-title-portfol,
        .hero-cover-title-i,
        .hero-cover-title-o {
          font-size: clamp(2rem, 8vw, 6rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: ${COLORS.primary};
          font-family: ${FONTS.display};
          line-height: 1;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          height: clamp(60px, 8vw, 100px);
        }
        @media (max-width: 768px) {
          .hero-cover-title-full,
          .hero-cover-title-portfol,
          .hero-cover-title-i,
          .hero-cover-title-o {
            font-size: clamp(1.5rem, 6vw, 3rem);
            height: clamp(50px, 12vw, 80px);
          }
        }
        .hero-cover-title-i {
          display: inline;
          transform-origin: center center;
          will-change: transform, opacity;
        }
        .hero-cover-title-o {
          will-change: transform;
        }
        .hero-cover-title-line {
          will-change: width, transform;
          transform-origin: left center;
          position: absolute;
          height: 1px;
          background-color: ${COLORS.line};
          opacity: 0.4;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }

        /* ── O click trigger ──────────────────────────────────── */
        .hero-o-trigger {
          position: relative;
          cursor: pointer;
          display: inline;
          pointer-events: auto;
          transition: color 0.3s ease;
          outline: none;
        }
        .hero-o-trigger:hover {
          color: ${COLORS.accent};
        }
        .hero-o-trigger:focus-visible {
          color: ${COLORS.accent};
        }
        .hero-click-svg {
          position: absolute;
          top: 70%;
          left: 50%;
          width: clamp(55px, 7vw, 90px);
          height: auto;
          pointer-events: none;
          color: ${COLORS.primary};
          opacity: 0;
          z-index: 20;
        }
        @media (max-width: 768px) {
          .hero-click-svg {
            width: clamp(40px, 10vw, 60px);
          }
        }

        /* ── Navigation ────────────────────────────────────────── */
        .hero-site-navigation {
          position: absolute;
          display: flex;
          align-items: center;
          font-family: ${FONTS.display};
          opacity: 0;
          z-index: 30;
          white-space: nowrap;
          pointer-events: auto;
          transition: opacity 0.3s ease;
        }
        .hero-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          align-items: center;
        }
        .hero-nav-links li { margin: 0; padding: 0; }
        .hero-nav-links a {
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          font-weight: 400;
          text-transform: lowercase;
          letter-spacing: 0.05em;
          color: ${COLORS.primary};
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }
        .hero-nav-links a:hover { opacity: 1; }
        @media (max-width: 768px) {
          .hero-nav-links { gap: 0.75rem; }
          .hero-nav-links a { font-size: clamp(0.4rem, 0.6vw, 0.55rem); }
        }

        /* ── Engineer text (Pouities via next/font localFont) ─────── */
        :global(.hero-engineer-text) {
          color: ${COLORS.primary};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          user-select: none;
          z-index: ${Z_LAYERS.engineerText} !important;
          position: fixed !important;
          overflow: visible;
        }
        @media (max-width: 768px) {
          :global(.hero-engineer-text) {
            bottom: auto !important;
            font-size: clamp(1.5rem, 5vw, 3.5rem) !important;
          }
        }
        @media (max-width: 480px) {
          :global(.hero-engineer-text) {
            font-size: clamp(1.2rem, 4.5vw, 2.8rem) !important;
          }
        }

        /* ── Dot overlay ───────────────────────────────────────── */
        :global(.hero-dot-overlay) {
          z-index: ${Z_LAYERS.dot} !important;
          position: fixed !important;
          border-radius: 50%;
          background-color: ${COLORS.accent};
          pointer-events: none;
        }
      `}</style>
    </section>
  );
};

export default Hero;
