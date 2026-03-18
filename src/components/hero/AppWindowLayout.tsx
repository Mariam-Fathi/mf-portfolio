"use client";

import React, { useState } from "react";
import localFont from "next/font/local";
import { COLORS, FONTS, Z_LAYERS } from "./constants";
import { NAV_SECTIONS } from "./types";

const goAroundFont = localFont({
  src: "../../../public/fonts/go_around_the_books/Go around the books 2022.ttf",
  display: "swap",
});

export interface AppWindowLayoutProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
  children: React.ReactNode;
}

/**
 * Same app window chrome as hero (title bar + nav in bar, no borders). Use when showing
 * a section so the frame stays and only the content area is replaced.
 */
export default function AppWindowLayout({ onNavigate, activeSection, children }: AppWindowLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="hero-yellow-frame hero-window app-window-layout">
        {/* Title bar: same as hero — PORTFOLIO (clickable = back to hero) + nav links on right; mobile: menu icon */}
        <div className="hero-window-title-bar">
          <div className="hero-cover-header hero-cover-header-in-title-bar">
            <div
              className="hero-cover-header-line"
              role="button"
              tabIndex={0}
              aria-label="Back to home"
              onClick={() => onNavigate("hero")}
              onKeyDown={(e) => e.key === "Enter" && onNavigate("hero")}
              style={{ cursor: "pointer" }}
            >
              <span className={`hero-cover-title-whole ${goAroundFont.className}`} aria-label="Portfolio">PORTFOLIO</span>
            </div>
          </div>
          <nav className="hero-window-title-nav" aria-label="Main navigation">
            <ul className="hero-window-title-nav-links">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeSection === s.id ? "active" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(s.id);
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            type="button"
            className="hero-window-menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            <span className="hero-window-menu-btn-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </span>
          </button>
        </div>
      {mobileMenuOpen && (
        <div
          className="hero-window-mobile-menu-overlay"
          role="dialog"
          aria-label="Navigation menu"
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav className="hero-window-mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="hero-window-mobile-menu-close"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <ul className="hero-window-mobile-menu-links">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeSection === s.id ? "active" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(s.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

        {/* Content frame — no margin/borders, same as hero */}
        <div className="app-window-layout-content">
          <div className="app-window-content-frame">
            {children}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-yellow-frame {
          position: fixed;
          inset: 0;
          pointer-events: auto;
          z-index: ${Z_LAYERS.frame};
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        .hero-window {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          background: ${COLORS.heroBackground};
          margin: 0;
          overflow: hidden;
          height: 100%;
          box-shadow: 2px 2px 0 #1a1a1a;
        }
        .hero-window-title-bar {
          flex-shrink: 0;
          background: ${COLORS.primary};
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          padding: clamp(0.5rem, 1.5vw, 0.75rem) 10px;
          font-family: ${FONTS.display};
          color: ${COLORS.heroBackground};
          overflow: visible;
        }
        .hero-window-title-bar .hero-cover-header.hero-cover-header-in-title-bar {
          position: relative !important;
          inset: auto !important;
          flex: 1 1 auto;
          min-width: 0;
          width: auto;
          height: 100%;
          min-height: clamp(40px, 5vw, 56px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
        }
        .hero-window-title-bar .hero-cover-header-line {
          height: 100%;
          min-height: clamp(40px, 5vw, 56px);
          justify-content: flex-start;
        }
        .hero-window-title-bar .hero-cover-title-whole {
          font-size: clamp(1rem, 1.6vw, 1.55rem);
          letter-spacing: 0.14em;
          height: clamp(40px, 5vw, 56px);
          color: ${COLORS.heroBackground};
          font-family: ${goAroundFont.style.fontFamily}, sans-serif;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-window-title-bar .hero-cover-title-whole {
            font-size: clamp(1.25rem, 5vw, 2.25rem);
            height: clamp(36px, 10vw, 52px);
          }
        }
        .hero-window-title-nav {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          min-height: clamp(40px, 5vw, 56px);
          padding-left: 0.75rem;
        }
        .hero-window-title-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: clamp(0.65rem, 1.5vw, 1.1rem);
          white-space: nowrap;
        }
        .hero-window-title-nav-links a {
          color: ${COLORS.heroBackground};
          text-decoration: none;
          font-family: ${goAroundFont.style.fontFamily}, sans-serif;
          font-size: clamp(0.72rem, 1.05vw, 0.92rem);
          text-transform: lowercase;
          letter-spacing: 0.06em;
          line-height: 1;
          opacity: 0.92;
          padding: 0.35rem 0.25rem;
        }
        .hero-window-title-nav-links a:hover,
        .hero-window-title-nav-links a.active {
          opacity: 1;
          font-weight: 700;
        }
        @media (max-width: 768px) {
          .hero-window-title-nav-links {
            gap: clamp(0.6rem, 2.4vw, 0.9rem);
          }
          .hero-window-title-nav-links a {
            font-size: clamp(0.66rem, 2.2vw, 0.85rem);
            letter-spacing: 0.055em;
          }
        }
        @media (max-width: 768px) {
          .hero-window-title-nav { display: none !important; }
        }
        .hero-window-menu-btn {
          display: none;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          padding: 0;
          border: none;
          background: transparent;
          color: ${COLORS.heroBackground};
          cursor: pointer;
          border-radius: 6px;
        }
        .hero-window-menu-btn:hover { opacity: 0.9; }
        .hero-window-menu-btn-icon { display: flex; align-items: center; justify-content: center; }
        .hero-window-menu-btn-icon svg { width: 24px; height: 24px; }
        @media (max-width: 768px) {
          .hero-window-menu-btn { display: flex; }
        }
        .hero-window-mobile-menu-overlay {
          position: fixed;
          inset: 0;
          z-index: ${Z_LAYERS.frame + 10};
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0;
        }
        .hero-window-mobile-menu {
          width: min(280px, 85vw);
          height: 100%;
          background: ${COLORS.primary};
          color: ${COLORS.heroBackground};
          padding: 1.25rem 1rem;
          box-shadow: -2px 0 12px rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .hero-window-mobile-menu-close {
          align-self: flex-end;
          width: 44px;
          height: 44px;
          padding: 0;
          border: none;
          background: transparent;
          color: ${COLORS.heroBackground};
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-window-mobile-menu-close:hover { opacity: 0.9; }
        .hero-window-mobile-menu-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .hero-window-mobile-menu-links a {
          color: ${COLORS.heroBackground};
          text-decoration: none;
          font-family: ${goAroundFont.style.fontFamily}, sans-serif;
          font-size: 1rem;
          text-transform: lowercase;
          letter-spacing: 0.06em;
          padding: 0.6rem 0.5rem;
          display: block;
          opacity: 0.92;
        }
        .hero-window-mobile-menu-links a:hover,
        .hero-window-mobile-menu-links a.active { opacity: 1; font-weight: 700; }

        .app-window-layout-content {
          flex: 1;
          min-height: 0;
          position: relative;
          display: flex;
          overflow: hidden;
          background: ${COLORS.heroBackground};
        }
        .app-window-content-frame {
          flex: 1;
          min-height: 0;
          margin: 0;
          background: ${COLORS.heroBackground};
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
