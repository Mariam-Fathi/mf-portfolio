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
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [lineData, setLineData] = useState<{ lineY: number; lineEndX: number; lineWidth: number } | null>(null);

  const sections = [
    { id: "hero", label: "home" },
    { id: "experience", label: "experience" },
    { id: "work", label: "projects" },
    { id: "certificates", label: "certificates" },
    { id: "contact", label: "contact" },
  ];

  useEffect(() => {
    // Get line data from hero
    const data = getHeroLineData();
    if (data) {
      setLineData(data);
    } else {
      // Retry if data not available yet
      const timeout = setTimeout(() => {
        const retryData = getHeroLineData();
        if (retryData) {
          setLineData(retryData);
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (!lineData || !lineRef.current || !navRef.current) return;

    // If already animated, just ensure navigation is visible
    if (hasAnimated) {
      gsap.set(navRef.current, { opacity: 1, display: "flex" });
      gsap.set(lineRef.current, { opacity: 0.4, width: 150 });
      return;
    }

    // Set initial positions
    const lineY = lineData.lineY;
    const targetLineWidth = 150; // Slightly expand the line (enough to be visible, but not too much)
    const gap = 10; // Small gap between line end and navigation
    const navX = targetLineWidth + gap;

    // Position line at left edge, same Y as hero
    gsap.set(lineRef.current, {
      position: "fixed",
      left: 0,
      top: lineY,
      width: 0,
      height: "1px",
      backgroundColor: "#280B0B",
      opacity: 0,
      transformOrigin: "left center",
      zIndex: 10,
    });

    // Position navigation at the end of the line (initially hidden)
    gsap.set(navRef.current, {
      position: "fixed",
      left: navX,
      top: lineY,
      transform: "translate(0, -50%)", // Align left edge, center vertically
      opacity: 0,
      zIndex: 30,
    });

    // Kill any existing animations
    gsap.killTweensOf([lineRef.current, navRef.current]);

    // Create animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimationComplete(true);
        setHasAnimated(true);
        // Keep navigation visible after animation
        if (navRef.current) {
          gsap.set(navRef.current, { opacity: 1, display: "flex" });
        }
      },
    });

    // Step 1: Line expands from left edge (same animation style as hero)
    tl.to(lineRef.current, {
      width: targetLineWidth,
      opacity: 0.4,
      duration: 2.5,
      ease: "power2.out",
    });

    // Step 2: Navigation appears at the end of the line (slightly before line completes)
    tl.to(navRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.8"); // Start before line completes

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
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [lineData]);

  if (!lineData) {
    return null; // Don't render until we have line data
  }

  return (
    <>
      {/* Line expanding from left */}
      <div ref={lineRef} className="section-line" />

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
            gap: 1rem;
          }
          
          .section-line-nav-links button {
            font-size: clamp(0.5rem, 0.7vw, 0.65rem);
          }
        }
      `}</style>
    </>
  );
};

export default SectionLineNavigation;

