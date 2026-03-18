"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getHeroLineData } from "@/utils/navigationPosition";
import { useHeroBreakpoints } from "@/components/hero/hooks/useHeroBreakpoints";
import { COLORS, FONTS, Z_LAYERS } from "@/components/hero/constants";

interface SectionLineNavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const sections = [
  { id: "hero", label: "home" },
  { id: "work", label: "projects" },
  { id: "certificates", label: "certificates" },
  { id: "contact", label: "contact" },
];

const SectionLineNavigation: React.FC<SectionLineNavigationProps> = ({ onNavigate, currentSection }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const oRef = useRef<HTMLSpanElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lineData, setLineData] = useState<{ lineY: number; lineEndX: number; lineWidth: number; oPositionX: number } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLg, isMd, isSm } = useHeroBreakpoints();

  // Track section changes to replay the line expansion animation
  const prevSectionRef = useRef(currentSection);

  // Reset animation when navigating to a different section
  useEffect(() => {
    if (prevSectionRef.current !== currentSection) {
      prevSectionRef.current = currentSection;
      // Kill any active animations on our elements
      if (lineRef.current) gsap.killTweensOf(lineRef.current);
      if (navRef.current) gsap.killTweensOf(navRef.current);
      if (oRef.current) gsap.killTweensOf(oRef.current);
      // Reset animation state to trigger re-animation
      setIsAnimationComplete(false);
      setHasAnimated(false);
    }
  }, [currentSection]);

  // Only need line data for lg (line + O + nav); md/sm use menu
  useEffect(() => {
    if (!isLg) return;
    const getData = () => {
      const data = getHeroLineData();
      if (data) {
        setLineData(data);
        return true;
      }
      return false;
    };
    if (!getData()) {
      let retries = 0;
      const maxRetries = 20;
      const interval = setInterval(() => {
        retries++;
        if (getData() || retries >= maxRetries) clearInterval(interval);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isLg]);

  useEffect(() => {
    if (!isLg || !lineData || !lineRef.current || !navRef.current || !oRef.current) {
      return;
    }

    // Use hero line end X position to expand line exactly like hero (before O)
    const targetLineWidth = lineData.lineEndX; // Line expands to this position (before O)
    const lineY = lineData.lineY;
    // Center links in the space between top of viewport and the line
    const navY = lineY / 2; // Center between top (0) and line (lineY)
    // Navigation should be at the right end of the line (where O is)
    // Use oPositionX if available, otherwise use lineEndX (line end position)
    const navFinalX = lineData.oPositionX || lineData.lineEndX; // O's position (where navigation should be)

    // If already animated, just ensure O and navigation are at final position
    if (hasAnimated) {
      gsap.set(oRef.current, {
        left: navFinalX,
        opacity: 1,
        display: "inline-flex",
        alignItems: "center",
        transform: "translateY(-50%)",
      });
      gsap.set(navRef.current, {
        opacity: 1,
        display: "flex",
        visibility: "visible",
        left: navFinalX,
        top: navY,
        transform: "translate(-100%, -50%)",
        pointerEvents: "auto",
      });
      gsap.set(lineRef.current, {
        opacity: 0.4,
        width: targetLineWidth,
        transform: "translateY(-50%)",
      });
      return;
    }

    // Position line at left edge, same Y as hero (exact same positioning as hero line)
    gsap.set(lineRef.current, {
      position: "fixed",
      left: 0,
      top: lineY,
      width: 0,
      height: "1px",
      backgroundColor: "#280B0B",
      opacity: 0,
      transform: "translateY(-50%)", // Center vertically like hero line (top: 50%, translateY(-50%))
      transformOrigin: "left center",
      zIndex: 10,
    });

    // Position O at start (left edge, where line begins) - will move along with line
    gsap.set(oRef.current, {
      position: "fixed",
      left: 0,
      top: lineY,
      transform: "translateY(-50%)",
      opacity: 1,
      display: "inline-flex",
      alignItems: "center",
      visibility: "visible",
      zIndex: 20,
      immediateRender: true,
    });

    // Position navigation at O's final position (hidden initially, appears after O reaches end)
    // Center links in the space between top of viewport and the line
    if (navRef.current) {
      navRef.current.style.position = "fixed";
      navRef.current.style.left = `${navFinalX}px`;
      navRef.current.style.top = `${navY}px`;
      navRef.current.style.transform = "translate(-100%, -50%)";
      navRef.current.style.opacity = "0"; // Force hidden during animation
      navRef.current.style.display = "flex";
      navRef.current.style.visibility = "visible";
      navRef.current.style.zIndex = "30";
      navRef.current.style.pointerEvents = "none"; // Disable during animation
      // Force opacity 0 to prevent any visibility during animation
      navRef.current.style.setProperty('opacity', '0', 'important');
    }
    
    gsap.set(navRef.current, {
      position: "fixed",
      left: navFinalX, // Position at O's final position (right end) - stays here, doesn't move
      top: navY, // Center between top of viewport and line
      transform: "translate(-100%, -50%)", // Align right edge to line end, center vertically (like hero)
      opacity: 0, // Hidden initially - appears after O reaches end
      display: "flex", // Ensure it's displayed
      visibility: "visible",
      zIndex: 30,
      pointerEvents: "none", // Disable during animation
      immediateRender: true, // Force immediate render
    });

    // Kill any existing animations
    gsap.killTweensOf([lineRef.current, navRef.current, oRef.current]);
    
    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimationComplete(true);
        setHasAnimated(true);
        if (navRef.current) {
          gsap.set(navRef.current, { 
            opacity: 1, 
            display: "flex",
            visibility: "visible"
          });
        }
      },
    });

    // Line expands right; O moves with it
    tl.to(lineRef.current, {
      width: targetLineWidth,
      opacity: 0.4,
      duration: 2.5,
      ease: "power2.out",
    });
    
    tl.to(oRef.current, {
      left: navFinalX,
      duration: 2.5,
      ease: "power2.out",
    }, 0);
    
    // Step 3: Navigation appears at O's position AFTER O reaches end
    // Just like hero: navigation appears after portfolio animation completes
    // Wait until line and O animation complete, then fade in navigation
    tl.to(navRef.current, {
      opacity: 1, // Fade in at final position
      top: navY, // Center between top of viewport and line
      duration: 0.6,
      ease: "power2.out",
      onStart: () => {
        // Enable pointer events when appearing
        if (navRef.current) {
          navRef.current.style.pointerEvents = "auto";
        }
      },
    }, "+=0.3"); // Start after line and O animation complete (2.5s + delay to ensure they're done)

    // Cleanup function
    return () => {
      if (!hasAnimated) {
        tl.kill();
      }
    };
  }, [isLg, lineData, hasAnimated]);

  // Update positions on window resize (lg only)
  useEffect(() => {
    if (!isLg || !lineData) return;

    const handleResize = () => {
      const updatedData = getHeroLineData();
      if (updatedData) {
        setLineData(updatedData);
      }
      
      // Update line and nav position on resize to match hero line
      if (lineRef.current && navRef.current && hasAnimated) {
        const updatedLineData = getHeroLineData();
        if (updatedLineData) {
          const targetLineWidth = updatedLineData.lineEndX;
          const navX = updatedLineData.oPositionX || updatedLineData.lineEndX;
          const navY = updatedLineData.lineY / 2;
          gsap.set(lineRef.current, { 
            width: targetLineWidth,
            transform: "translateY(-50%)"
          });
          gsap.set(navRef.current, { left: navX, top: navY });
          if (oRef.current) gsap.set(oRef.current, { left: navX });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLg, lineData, hasAnimated]);

  // Md/sm: menu button + overlay (same as hero)
  if (isMd || isSm) {
    return (
      <>
        <button
          type="button"
          className="section-menu-button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="section-menu-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </span>
        </button>
        {menuOpen && (
          <nav className="section-menu-overlay" aria-label="Main navigation">
            <button
              type="button"
              className="section-menu-close"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <ul className="section-menu-links">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onNavigate(section.id);
                    }}
                    className={currentSection === section.id ? "active" : ""}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <style jsx>{`
          .section-menu-button {
            position: fixed;
            top: clamp(0.5rem, 2vw, 1rem);
            right: clamp(1rem, 3vw, 1.5rem);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            padding: 0;
            border: none;
            background: transparent;
            color: ${COLORS.primary};
            cursor: pointer;
            z-index: ${Z_LAYERS.frame + 50};
          }
          .section-menu-icon {
            display: block;
            width: 24px;
            height: 24px;
          }
          .section-menu-icon svg {
            width: 100%;
            height: 100%;
          }
          .section-menu-overlay {
            position: fixed;
            inset: 0;
            z-index: ${Z_LAYERS.frame + 100};
            background: ${COLORS.heroBackground};
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .section-menu-close {
            position: absolute;
            top: clamp(1rem, 3vw, 1.5rem);
            right: clamp(1rem, 3vw, 1.5rem);
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            border: none;
            background: transparent;
            color: ${COLORS.primary};
            cursor: pointer;
          }
          .section-menu-close:hover { opacity: 0.85; }
          .section-menu-close svg { width: 28px; height: 28px; }
          .section-menu-links {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            align-items: center;
            font-family: ${FONTS.display};
          }
          .section-menu-links button {
            background: none;
            border: none;
            font-size: clamp(1rem, 4vw, 1.5rem);
            text-transform: lowercase;
            letter-spacing: 0.05em;
            color: ${COLORS.primary};
            cursor: pointer;
            opacity: 0.9;
            padding: 0;
          }
          .section-menu-links button:hover,
          .section-menu-links button.active { opacity: 1; }
        `}</style>
      </>
    );
  }

  if (!lineData) {
    return null;
  }

  return (
    <>
      {/* Lg: line + O + nav */}
      <div ref={lineRef} className="section-line" />
      <span ref={oRef} className="section-line-o" aria-label="Navigation menu toggle">O</span>
      <nav ref={navRef} className="section-line-navigation">
        <ul className="section-line-nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (currentSection === section.id) return;
                  if (navRef.current) {
                    navRef.current.style.pointerEvents = "none";
                    gsap.to(navRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
                  }
                  if (lineRef.current) {
                    gsap.to(lineRef.current, { width: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
                  }
                  if (oRef.current) {
                    gsap.to(oRef.current, { opacity: 0, duration: 0.3, ease: "power2.inOut" });
                  }
                  onNavigate(section.id);
                }}
                className={currentSection === section.id ? "active" : ""}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .section-line {
          pointer-events: none;
        }

        .section-line-o {
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
          font-size: clamp(2rem, 8vw, 6rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #280B0B;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          height: clamp(60px, 8vw, 100px);
          pointer-events: none;
          user-select: none;
        }
        
        @media (max-width: 768px) {
          .section-line-o {
            font-size: clamp(1.5rem, 6vw, 3rem);
            height: clamp(50px, 12vw, 80px);
          }
        }

        .section-line-navigation {
          display: flex;
          align-items: center;
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
          white-space: nowrap;
          pointer-events: auto;
        }

        .section-line-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          align-items: center;
        }

        .section-line-nav-links li {
          margin: 0;
          padding: 0;
        }

        .section-line-nav-links button {
          background: none;
          border: none;
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          font-weight: 400;
          text-transform: lowercase;
          letter-spacing: 0.05em;
          color: #280B0B;
          cursor: pointer;
          opacity: 0.8;
          transition: opacity 0.2s ease;
          padding: 0;
          text-align: left;
        }

        .section-line-nav-links button:hover {
          opacity: 1;
        }

        .section-line-nav-links button.active {
          opacity: 1;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .section-line-nav-links {
            gap: 0.75rem;
          }
          
          .section-line-nav-links button {
            font-size: clamp(0.4rem, 0.6vw, 0.55rem);
          }
        }
      `}</style>
    </>
  );
};

export default SectionLineNavigation;

