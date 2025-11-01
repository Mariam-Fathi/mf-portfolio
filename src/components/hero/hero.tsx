"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MinimalCinematicHero = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const lightBeamRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Match GIF width to title width
  useEffect(() => {
    const matchWidths = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleStyle = window.getComputedStyle(titleRef.current);
        const titlePaddingLeft = parseFloat(titleStyle.paddingLeft) || 0;
        const titlePaddingRight = parseFloat(titleStyle.paddingRight) || 0;
        
        const titleWidth = titleRect.width + titlePaddingLeft + titlePaddingRight;
        
        // No image container needed for this design
      }
    };

    const initialTimer = setTimeout(matchWidths, 100);
    const animationTimer = setTimeout(matchWidths, 2500);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(matchWidths, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimer);
      clearTimeout(animationTimer);
      clearTimeout(resizeTimer);
    };
  }, []);

  useGSAP(
    () => {
      if (!heroSectionRef.current || !lightBeamRef.current || !titleRef.current || !subtitleRef.current) return;

      // Initial states
      gsap.set(lightBeamRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        y: 50,
      });

      // Create cinematic timeline
      const tl = gsap.timeline({ delay: 0.5 });

      // Light beam animation
      tl.to(lightBeamRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 2.5,
        ease: "power3.out",
      }, 0);

      // Title animation
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      }, 1);

      // Subtitle animation
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }, 1.5);

      // Scroll-triggered light beam extension
      ScrollTrigger.create({
        trigger: heroSectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (lightBeamRef.current) {
            const progress = self.progress;
            gsap.to(lightBeamRef.current, {
              scaleX: 1 + progress * 0.3,
              opacity: 1 - progress * 0.5,
              duration: 0.1,
            });
          }
        },
      });

    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-end bg-black overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #0a0a0a 0%, #1a0f0a 50%, #000000 100%)",
        }}
      >
        {/* Dark Green Volumetric Light Beam - Autumn Aesthetic */}
        <div
          ref={lightBeamRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(26, 77, 46, 0.8) 0%, rgba(45, 80, 22, 0.6) 20%, rgba(67, 120, 45, 0.3) 50%, rgba(100, 150, 80, 0.1) 80%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 120% 60% at left center, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 120% 60% at left center, black 0%, transparent 70%)",
          }}
        >
          {/* Additional volumetric layers for depth - autumn orange glow */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 50% at 30% center, rgba(217, 119, 6, 0.15) 0%, rgba(234, 88, 12, 0.1) 30%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />
          
          {/* Main light core - dark green */}
          <div
            className="absolute left-0 top-1/2 w-full h-1/3 -translate-y-1/2"
            style={{
              background: "linear-gradient(90deg, rgba(26, 77, 46, 0.7) 0%, rgba(45, 80, 22, 0.4) 40%, transparent 100%)",
              filter: "blur(30px)",
            }}
          />

          {/* Distant figure silhouette */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-32 bg-white/30"
            style={{
              transform: "translate(-50%, -50%)",
              filter: "blur(3px)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
            }}
          />
        </div>

        {/* Content Container - Bottom Black Bar with Text */}
        <div
          ref={contentRef}
          className="relative z-10 w-full bg-black pt-8 pb-12 px-6 md:px-12 lg:px-16 ml-24 md:ml-32"
        >
          <div className="max-w-7xl mx-auto">
            {/* Subtitle - Right aligned */}
            <h2
              ref={subtitleRef}
              className="font-bold uppercase text-sm md:text-base lg:text-lg mb-3 md:mb-4 text-right tracking-wider"
              style={{
                letterSpacing: '0.15em',
                color: '#d97706',
              }}
            >
              SOFTWARE ENGINEER
            </h2>

            {/* Main Title - Left aligned, very large */}
            <h1
              ref={titleRef}
              className="font-bold uppercase text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] tracking-tight leading-none"
              style={{
                letterSpacing: '-0.02em',
                textAlign: 'left',
                lineHeight: '0.9',
                color: '#d97706',
              }}
            >
              MARIAM FATHI SIAM
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalCinematicHero;