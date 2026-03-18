"use client";

import React from "react";
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
  return (
    <>
      <div className="hero-yellow-frame hero-window app-window-layout">
        {/* Title bar: same as hero — PORTFOLIO (clickable = back to hero) + nav links on right */}
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
        </div>

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
