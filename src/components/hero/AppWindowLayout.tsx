"use client";

import React from "react";
import { COLORS, FONTS, Z_LAYERS, APP_WINDOW_INSET_PX } from "./constants";
import { NAV_SECTIONS } from "./types";

export interface AppWindowLayoutProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
  children: React.ReactNode;
}

/**
 * Same app window chrome as hero (title bar + menu bar). Use when showing
 * a section so the frame stays and only the content area is replaced.
 */
export default function AppWindowLayout({ onNavigate, activeSection, children }: AppWindowLayoutProps) {
  return (
    <>
      <div className="hero-yellow-frame hero-window app-window-layout">
        {/* Title bar: same as hero — PORTFOLIO (clickable = back to hero) + traffic lights */}
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
              <span className="hero-cover-title-whole" aria-label="Portfolio">PORTFOLIO</span>
            </div>
          </div>
          <div className="hero-window-traffic" aria-hidden="true">
            <span className="hero-window-traffic-dot hero-window-traffic-red" />
            <span className="hero-window-traffic-dot hero-window-traffic-yellow" />
            <span className="hero-window-traffic-dot hero-window-traffic-green" />
          </div>
        </div>

        {/* Menu bar: nav links */}
        <div className="hero-window-menu-bar">
          <nav className="hero-window-menu-nav" aria-label="Main navigation">
            <ul className="hero-window-menu-nav-links">
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

        {/* Fixed frame for all sections — same inset + border; only content inside changes */}
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
        }
        .hero-window-title-bar {
          flex-shrink: 0;
          min-height: clamp(60px, 8vw, 100px);
          background: ${COLORS.primary};
          border-top: 6px solid ${COLORS.heroBackground};
          border-right: 6px solid ${COLORS.heroBackground};
          border-bottom: 6px solid ${COLORS.heroBackground};
          border-left: 6px solid ${COLORS.heroBackground};
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.08);
          border-radius: 18px;
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem 0 1rem;
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
          min-height: clamp(60px, 8vw, 100px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0;
        }
        .hero-window-title-bar .hero-cover-header-line {
          height: 100%;
          min-height: clamp(60px, 8vw, 100px);
          justify-content: flex-start;
        }
        .hero-window-title-bar .hero-cover-title-whole {
          font-size: clamp(2rem, 8vw, 6rem);
          letter-spacing: 0.15em;
          height: clamp(60px, 8vw, 100px);
          color: ${COLORS.heroBackground};
          font-family: ${FONTS.display};
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-window-title-bar .hero-cover-title-whole {
            font-size: clamp(1.5rem, 6vw, 3rem);
            height: clamp(50px, 12vw, 80px);
          }
        }
        .hero-window-traffic {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-window-traffic-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid ${COLORS.heroBackground};
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 1px 1px rgba(0,0,0,0.2);
        }
        .hero-window-traffic-red,
        .hero-window-traffic-yellow,
        .hero-window-traffic-green {
          background: ${COLORS.heroBackground};
        }
        .hero-window-menu-bar {
          flex-shrink: 0;
          min-height: clamp(36px, 5.5vw, 44px);
          background: transparent;
          margin-left: 6px;
          margin-right: 6px;
          border-top: 2px solid ${COLORS.primary};
          border-right: 2px solid ${COLORS.primary};
          border-bottom: 2px solid ${COLORS.primary};
          border-left: 2px solid ${COLORS.primary};
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.08);
          border-radius: 0;
          display: flex;
          align-items: stretch;
          padding: 0 1.25rem;
          gap: 0;
          font-family: ${FONTS.display};
          font-size: clamp(0.65rem, 1vw, 0.75rem);
          color: ${COLORS.primary};
        }
        .hero-window-menu-nav {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-self: stretch;
          min-height: 0;
        }
        .hero-window-menu-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          gap: 0;
          height: 100%;
          min-height: 100%;
          width: 100%;
        }
        .hero-window-menu-nav-links li {
          display: flex;
          align-items: stretch;
          flex: 1;
          min-width: 0;
        }
        .hero-window-menu-nav-links a {
          color: ${COLORS.primary};
          text-decoration: none;
          font-size: clamp(0.6rem, 1.1vw, 0.75rem);
          text-transform: lowercase;
          letter-spacing: 0.04em;
          line-height: 1;
          opacity: 0.9;
          border-top: none;
          border-bottom: none;
          border-right: 2px solid ${COLORS.primary};
          border-left: none;
          border-radius: 0;
          padding: 0.5em 0.9em;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
          box-sizing: border-box;
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.08);
        }
        .hero-window-menu-nav-links li:first-child a {
          border-left: none;
        }
        .hero-window-menu-nav-links li:last-child a {
          border-right: none;
        }
        .hero-window-menu-nav-links a:hover,
        .hero-window-menu-nav-links a.active {
          opacity: 1;
          font-weight: 700;
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
          margin: -2px ${APP_WINDOW_INSET_PX}px ${APP_WINDOW_INSET_PX}px ${APP_WINDOW_INSET_PX}px;
          border-left: 2px solid ${COLORS.primary};
          border-right: 2px solid ${COLORS.primary};
          border-bottom: 2px solid ${COLORS.primary};
          border-top: none;
          border-radius: 0;
          background: ${COLORS.heroBackground};
          box-shadow: inset 1px 1px 0 rgba(255,255,255,0.08);
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
