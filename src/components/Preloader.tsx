"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const mariamFathiRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const gifRef = useRef<HTMLImageElement>(null);
  const gifContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !preloaderRef.current || !mariamFathiRef.current || !portfolioRef.current) return;

    const tl = gsap.timeline();

    // Get viewport width for positioning
    const viewportWidth = window.innerWidth;

    // Set initial positions for GIF - cinematic entrance
    if (gifRef.current && gifContainerRef.current) {
      gsap.set(gifRef.current, {
        scale: 0.8,
        opacity: 0,
        filter: "blur(20px)",
      });
      gsap.set(gifContainerRef.current, {
        opacity: 0,
      });
    }

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

    // Cinematic GIF entrance - fade in with scale and blur effect
    if (gifRef.current && gifContainerRef.current) {
      // Container fade in
      tl.to(gifContainerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      }, 0.2);

      // GIF cinematic reveal - scale up, fade in, blur out
      tl.to(gifRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }, 0.3);

      // Subtle breathing effect - continuous gentle scale animation
      tl.to(gifRef.current, {
        scale: 1.05,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      }, 1.5);
    }

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

    // GIF fade out before final preloader fade
    if (gifRef.current && gifContainerRef.current) {
      tl.to(gifRef.current, {
        scale: 0.95,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power2.in",
      }, 7.5);

      tl.to(gifContainerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      }, 7.5);
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
      <div className="absolute top-20 left-0 right-0 overflow-visible z-[25]">
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
          MARIAM'S
        </div>
      </div>

      {/* PORTFOLIO at bottom of screen */}
      <div className="absolute bottom-20 left-0 right-0 overflow-visible z-[25]">
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

      {/* Cinematic GIF Container - Center of screen */}
      <div 
        ref={gifContainerRef}
        className="absolute inset-0 flex items-center justify-center z-20"
        style={{
          willChange: "opacity",
        }}
      >
        <div className="relative">
          {/* Cinematic frame effect - letterbox bars */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1A281E] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A281E] to-transparent" />
          </div>

          {/* GIF with cinematic styling */}
          <div className="relative">
            <img
              ref={gifRef}
              src="/images/gifs/frog.jpeg"
              alt="Loading"
              className="w-auto h-[60vh] max-w-[90vw] md:h-[70vh] object-contain rounded-full shadow-2xl"
              style={{
                willChange: "transform, opacity, filter",
                imageRendering: "auto",
              }}
            />
            
            {/* Subtle glow effect around GIF */}
            <div 
              className="absolute inset-0 -z-10 blur-3xl opacity-30"
              style={{
                background: "radial-gradient(circle, rgba(158, 167, 147, 0.4) 0%, transparent 70%)",
                willChange: "opacity",
              }}
            />
          </div>
        </div>
      </div>

      {/* Progress bar at center */}
      <div className="relative z-30 mt-auto mb-20">
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

