"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { getHeroLineData } from "@/utils/navigationPosition";

interface SectionLineNavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const SectionLineNavigation: React.FC<SectionLineNavigationProps> = ({ onNavigate, currentSection }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const oRef = useRef<HTMLSpanElement>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lineData, setLineData] = useState<{ lineY: number; lineEndX: number; lineWidth: number; oPositionX: number } | null>(null);

  const sections = [
    { id: "hero", label: "home" },
    { id: "experience", label: "experience" },
    { id: "work", label: "projects" },
    { id: "certificates", label: "certificates" },
    { id: "contact", label: "contact" },
  ];

  useEffect(() => {
    // Get line data from hero
    const getData = () => {
      const data = getHeroLineData();
      if (data) {
        setLineData(data);
        return true;
      }
      return false;
    };
    
    if (!getData()) {
      // Retry if data not available yet - keep retrying until we get it
      let retries = 0;
      const maxRetries = 20; // Try for 2 seconds
      const interval = setInterval(() => {
        retries++;
        if (getData() || retries >= maxRetries) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (!lineData || !lineRef.current || !navRef.current || !oRef.current) {
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

    // If already animated, just ensure O and navigation are visible at final position
    if (hasAnimated) {
      gsap.set(oRef.current, {
        left: navFinalX, // O at final position
        opacity: 1,
        display: "inline-flex", // Match hero
        alignItems: "center", // Match hero
        transform: "translateY(-50%)", // Center vertically with line (exact alignment)
      });
      gsap.set(navRef.current, { 
        opacity: 1, 
        display: "flex",
        visibility: "visible",
        left: navFinalX, // At final position (where O is)
        top: navY, // Center between top of viewport and line
        transform: "translate(-100%, -50%)", // Align right edge like hero
      });
      gsap.set(lineRef.current, { 
        opacity: 0.4, 
        width: targetLineWidth,
        transform: "translateY(-50%)" // Maintain vertical centering
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
    // Match hero O exactly: same font size, same alignment with line
    gsap.set(oRef.current, {
      position: "fixed",
      left: 0, // Start at left edge (where line starts)
      top: lineY,
      transform: "translateY(-50%)", // Center vertically - same as line (exact alignment)
      opacity: 1, // O is visible from start (like hero)
      display: "inline-flex", // Match hero: inline-flex
      alignItems: "center", // Match hero: align-items center
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
        // Keep navigation visible after animation
        if (navRef.current) {
          gsap.set(navRef.current, { 
            opacity: 1, 
            display: "flex",
            visibility: "visible"
          });
        }
      },
    });

    // Step 1: Line expands from left edge to end (exactly like hero, 2.5 seconds)
    // Step 2: O moves along with line expansion (same duration, simultaneous)
    tl.to(lineRef.current, {
      width: targetLineWidth,
      opacity: 0.4,
      duration: 2.5,
      ease: "power2.out",
    });
    
    // O moves along with line expansion (like hero)
    tl.to(oRef.current, {
      left: navFinalX, // Move to final position (where O should be)
      duration: 2.5,
      ease: "power2.out",
    }, 0); // Start at same time as line expansion
    
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
  }, [lineData, hasAnimated]); // Only animate once

  // Update positions on window resize
  useEffect(() => {
    if (!lineData) return;

    const handleResize = () => {
      const updatedData = getHeroLineData();
      if (updatedData) {
        setLineData(updatedData);
      }
      
      // Update line width and navigation position on resize to match hero line
      if (lineRef.current && navRef.current && hasAnimated) {
        const updatedLineData = getHeroLineData();
        if (updatedLineData) {
          const targetLineWidth = updatedLineData.lineEndX;
          const navX = updatedLineData.oPositionX || updatedLineData.lineEndX;
          const navY = updatedLineData.lineY / 2; // Center between top of viewport and line
          gsap.set(lineRef.current, { 
            width: targetLineWidth,
            transform: "translateY(-50%)" // Maintain vertical centering
          });
          gsap.set(navRef.current, { 
            left: navX,
            top: navY // Center between top of viewport and line
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lineData, hasAnimated]);

  if (!lineData) {
    return null; // Don't render until we have line data
  }

  return (
    <>
      {/* Line expanding from left */}
      <div ref={lineRef} className="section-line" />

      {/* O letter - moves along with line expansion */}
      <span ref={oRef} className="section-line-o" aria-label="Navigation menu toggle">O</span>

      {/* Navigation menu */}
      <nav ref={navRef} className="section-line-navigation">
        <ul className="section-line-nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
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

