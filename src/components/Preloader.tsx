"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const mariamFathiRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !preloaderRef.current || !mariamFathiRef.current || !portfolioRef.current) return;

    const tl = gsap.timeline();

    // Get viewport width for positioning
    const viewportWidth = window.innerWidth;

    // Set initial positions
    // MARIAM starts from LEFT (outside viewport) and moves to RIGHT (exit right)
    gsap.set(mariamFathiRef.current, {
      x: -viewportWidth, // Start from left side (outside viewport)
      opacity: 1,
    });

    // PORTFOLIO starts from RIGHT (outside viewport) and moves to LEFT (exit left)
    gsap.set(portfolioRef.current, {
      x: viewportWidth, // Start from right side (outside viewport)
      opacity: 1,
    });

    // Animate both texts moving horizontally - slow motion for readability
    // MARIAM: left to right (moves from left edge to right edge)
    tl.to(mariamFathiRef.current, {
      x: viewportWidth, // Exit to right side - ready to continue in hero section
      duration: 8, // Very slow motion - 8 seconds for easy readability
      ease: "none", // Linear movement
    }, 0);

    // PORTFOLIO: right to left (moves from right edge to left edge)
    tl.to(portfolioRef.current, {
      x: -viewportWidth, // Exit to left side
      duration: 8, // Very slow motion - 8 seconds for easy readability
      ease: "none", // Linear movement
    }, 0); // Start at same time as MARIAM

    // Progress bar with smooth animation
    if (progressRef.current) {
      tl.to(progressRef.current, {
        width: "100%",
        duration: 8,
        ease: "power1.inOut",
      }, 0);
    }

    // Final fade out - always complete the full animation timeline
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
      onComplete: () => {
        // Ensure animation is fully complete before hiding
        if (preloaderRef.current) {
          preloaderRef.current.style.display = "none";
        }
        // Only call onComplete after animation fully finishes (~8.6s total)
        onComplete();
      },
    }, 8.0);

  }, { scope: preloaderRef, dependencies: [mounted] });

  if (!mounted) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ 
        willChange: "opacity",
        background: "#1A281E",
      }}
    >

      {/* MARIAM at top of screen */}
      <div className="absolute top-20 left-0 right-0 overflow-visible">
        {/* MARIAM - moves from left to right */}
        <div
          ref={mariamFathiRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight whitespace-nowrap"
          style={{
            color: "#FEFCE0",
            fontFamily: "Mona Sans, sans-serif",
            textShadow: "0 0 30px rgba(158, 167, 147, 0.3)",
          }}
        >
          MARIAM
        </div>
      </div>

      {/* PORTFOLIO at bottom of screen */}
      <div className="absolute bottom-20 left-0 right-0 overflow-visible">
        {/* PORTFOLIO - moves from right to left */}
        <div
          ref={portfolioRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight whitespace-nowrap"
          style={{
            color: "#FEFCE0",
            fontFamily: "Mona Sans, sans-serif",
            textShadow: "0 0 30px rgba(158, 167, 147, 0.3)",
          }}
        >
          PORTFOLIO
        </div>
      </div>

      {/* Progress bar at center */}
      <div className="relative z-10 mt-auto mb-20">
        <div className="w-72 md:w-96 h-0.5 bg-[#9EA793]/10 rounded-full overflow-hidden relative">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-[#9EA793] to-[#FEFCE0] rounded-full relative"
            style={{ 
              width: "0%",
              boxShadow: "0 0 10px rgba(158, 167, 147, 0.5)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse glow-overlay" style={{ opacity: 0 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

