"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { COLORS, FONTS, Z_LAYERS } from "./constants";
import { NAV_SECTIONS } from "./types";
import type { HeroProps } from "./types";
import { useIsMobile, checkIsMobile } from "./hooks/useIsMobile";
import { useMariamSvg } from "./hooks/useMariamSvg";
import { useDotAnimation } from "./hooks/useDotAnimation";
import { usePortfolWidth } from "./hooks/usePortfolWidth";
import { usePortfolioAnimation } from "./hooks/usePortfolioAnimation";
import { useEngineerText } from "./hooks/useEngineerText";
import { useHeroNavigation } from "./hooks/useHeroNavigation";

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
  const engineerTextRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile();

  // Flip once on the client so portals are never rendered during SSR
  useEffect(() => setIsMounted(true), []);

  // ── Hooks — each owns one animation phase ──────────────────────
  //
  // Dependency chain (no circular deps):
  //   usePortfolWidth → portfolWidth
  //   useMariamSvg(portfolWidth) → isMariamReady
  //   useDotAnimation(isMariamReady) → isDotAnimationStarted / isDotAnimationComplete
  //   usePortfolioAnimation(isDotAnimationStarted) → isPortfolioAnimationComplete
  //   useEngineerText(isDotAnimationComplete)
  //   useHeroNavigation(isPortfolioAnimationComplete)

  const portfolWidth = usePortfolWidth(portfolioHeaderRef);

  const { isMariamReady } = useMariamSvg(
    numberSevenRef,
    portfolWidth,
    portfolioHeaderRef,
    isActive,
  );

  const { isDotAnimationStarted, isDotAnimationComplete } = useDotAnimation(
    numberSevenRef,
    svgIRef,
    svgA2Ref,
    svgM2Ref,
    dotRef,
    isActive,
    isMariamReady,
    isMobile,
  );

  const { isPortfolioAnimationComplete } = usePortfolioAnimation(
    portfolioHeaderRef,
    isDotAnimationStarted,
    isActive,
    isMobile,
  );

  useEngineerText(engineerTextRef, numberSevenRef, isDotAnimationComplete, isMariamReady);
  useHeroNavigation(navRef, portfolioHeaderRef, isPortfolioAnimationComplete);

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
              <span className="hero-cover-title-full" aria-label="Portfolio">PORTFOLIO</span>
              <span className="hero-cover-title-portfol" style={{ display: "none" }} aria-hidden="true">PORTFOL</span>
              <span className="hero-cover-title-i" style={{ display: "none", opacity: 1 }} aria-hidden="true">I</span>
              <span className="hero-cover-title-o" style={{ display: "none", opacity: 1 }} aria-label="Navigation menu toggle">O</span>
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
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              display: "none",
              zIndex: Z_LAYERS.dot,
              pointerEvents: "none",
            }}
          />,
          document.body,
        )}

      {/* ── Engineer text (React Portal) ──────────────────────── */}
      {isMounted &&
        createPortal(
          <div
            ref={engineerTextRef}
            className="hero-engineer-text"
            style={{
              position: "fixed",
              bottom: "220px",
              right: "clamp(0.5rem, 2vw, 2rem)",
              color: COLORS.primary,
              fontFamily: FONTS.script,
              fontSize: checkIsMobile() ? "clamp(1.5rem, 5vw, 3.5rem)" : "clamp(2rem, 6vw, 6rem)",
              zIndex: Z_LAYERS.engineerText,
              pointerEvents: "none",
              whiteSpace: "nowrap",
              opacity: 0,
              filter: "blur(0px)",
            }}
          >
            Software  Engineer
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

        /* ── Yellow frame ──────────────────────────────────────── */
        .hero-yellow-frame {
          position: fixed;
          inset: 0;
          pointer-events: none;
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

        /* ── Engineer text ─────────────────────────────────────── */
        :global(.hero-engineer-text) {
          font-family: ${FONTS.script};
          color: ${COLORS.primary};
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          user-select: none;
          z-index: ${Z_LAYERS.engineerText} !important;
          position: fixed !important;
          isolation: isolate;
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
