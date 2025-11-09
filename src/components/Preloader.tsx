"use client";

import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const mariamFathiRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle video loading
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setVideoLoaded(true);
        // Start playing the video
        video.play().catch((err) => {
          console.log("Video autoplay prevented:", err);
        });
      };

      const handleCanPlay = () => {
        setVideoLoaded(true);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('canplay', handleCanPlay);
      
      // Try to load the video
      video.load();

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [mounted]);

  useGSAP(() => {
    if (!mounted || !preloaderRef.current || !mariamFathiRef.current || !portfolioRef.current) return;

    const tl = gsap.timeline();

    // Get viewport width for positioning
    const viewportWidth = window.innerWidth;

    // Set initial positions for Video - dramatic cinematic entrance
    if (videoRef.current && videoContainerRef.current && overlayRef.current) {
      gsap.set(videoRef.current, {
        scale: 1.2,
        opacity: 0,
        filter: "blur(30px) brightness(0.3)",
      });
      gsap.set(videoContainerRef.current, {
        opacity: 0,
      });
      gsap.set(overlayRef.current, {
        opacity: 1, // Start with dark overlay
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

    // Dramatic Video entrance - cinematic reveal
    if (videoRef.current && videoContainerRef.current && overlayRef.current) {
      // Container fade in
      tl.to(videoContainerRef.current, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.out",
      }, 0.2);

      // Dramatic video reveal - zoom out, fade in, blur out, brightness up
      tl.to(videoRef.current, {
        scale: 1,
        opacity: 1,
        filter: "blur(0px) brightness(0.6)",
        duration: 2.0,
        ease: "power3.out",
      }, 0.5);

      // Gradually reduce overlay darkness for dramatic effect
      tl.to(overlayRef.current, {
        opacity: 0.7,
        duration: 1.5,
        ease: "power2.inOut",
      }, 1.0);

      // Further reduce overlay for more visibility
      tl.to(overlayRef.current, {
        opacity: 0.5,
        duration: 2.0,
        ease: "power1.inOut",
      }, 2.5);

      // Subtle continuous zoom effect for cinematic feel
      tl.to(videoRef.current, {
        scale: 1.05,
        duration: 4,
        ease: "power1.inOut",
      }, 2.0);
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

    // Dramatic video fade out before final preloader fade
    if (videoRef.current && videoContainerRef.current && overlayRef.current) {
      // Increase overlay darkness
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.in",
      }, 7.3);

      // Video fade out with blur and zoom
      tl.to(videoRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(20px) brightness(0.2)",
        duration: 0.6,
        ease: "power2.in",
      }, 7.5);

      tl.to(videoContainerRef.current, {
        opacity: 0,
        duration: 0.6,
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
        background: "transparent",
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
            fontFamily: "Dosis, sans-serif",
            textShadow: "0 0 30px rgba(158, 167, 147, 0.3)",
          }}
        >
          MARIAM'S
        </div>
      </div>

      {/* PORTFOLIO at bottom of screen */}
      <div className="absolute top-64 left-0 right-0 overflow-visible z-[25]">
        {/* PORTFOLIO - moves from right to left */}
        <div
          ref={portfolioRef}
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold uppercase tracking-tight whitespace-nowrap"
          style={{
            color: "#FEFCE0",
            fontFamily: "Dosis, sans-serif",
            textShadow: "0 0 30px rgba(158, 167, 147, 0.3)",
          }}
        >
          PORTFOLIO
        </div>
      </div>

      {/* Cinematic Video Background - Full Screen */}
      <div 
        ref={videoContainerRef}
        className="absolute inset-0 z-10 overflow-hidden"
        style={{
          willChange: "opacity",
        }}
      >
        {/* Full-screen background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            willChange: "transform, opacity, filter",
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/images/gifs/preloader.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for dramatic effect and text readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black/70"
          style={{
            willChange: "opacity",
            background: "radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)",
          }}
        />

        {/* Cinematic vignette effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.5) 100%)",
            willChange: "opacity",
          }}
        />

        {/* Additional dramatic gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(26, 40, 30, 0.3) 0%, transparent 20%, transparent 80%, rgba(26, 40, 30, 0.3) 100%)",
          }}
        />
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

