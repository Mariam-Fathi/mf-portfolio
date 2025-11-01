"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CuriositySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const curiosityRef = useRef<HTMLHeadingElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !curiosityRef.current || !backgroundRef.current) return;

      // Initial states - blurred and zoomed out
      gsap.set(curiosityRef.current, {
        scale: 0.3,
        opacity: 0,
        filter: "blur(40px)",
      });

      gsap.set(backgroundRef.current, {
        opacity: 0,
        filter: "blur(20px)",
      });

      // Find the reading section to coordinate fade transition
      const readingSection = document.querySelector('[data-reading-section]') as HTMLElement;
      
      if (!readingSection) return;
      
      // Get the reading section's scroll distance
      const readingWords = readingSection.querySelectorAll('span');
      const scrollDistance = readingWords.length * 60;
      
      // Position curiosity section to overlay the reading section initially (fixed)
      gsap.set(sectionRef.current, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 100,
        opacity: 0,
        pointerEvents: "none",
      });
      
      let curiosityTrigger: ScrollTrigger | null = null;
      
      // Create a scroll trigger based on reading section's progress
      // Start fading in when reading section reaches 80% (when it starts fading out)
      curiosityTrigger = ScrollTrigger.create({
        trigger: readingSection,
        start: "top top",
        end: () => `top top-=${scrollDistance}`,
        scrub: 1,
        onUpdate: (self) => {
          const readingProgress = self.progress; // Reading section's progress (0 to 1)
          
          // Calculate curiosity section progress
          // Fade in: 80%-90% of reading progress
          // Stay visible: 90%-95% of reading progress
          // Fade out: 95%-100% of reading progress (BEFORE reading section ends)
          let curiosityProgress = 0;
          let fadeOutProgress = 1;
          
          if (readingProgress >= 0.8) {
            if (readingProgress <= 0.9) {
              // Fade in from 0.8 to 0.9 of reading progress
              curiosityProgress = (readingProgress - 0.8) / 0.1; // 0 to 1 (fade in)
            } else if (readingProgress <= 0.95) {
              // Stay fully visible from 90% to 95%
              curiosityProgress = 1;
            } else {
              // Fade out from 95% to 100% (BEFORE reading section ends)
              curiosityProgress = 1; // Keep at 1 for scale/blur
              const fadeOutLocal = (readingProgress - 0.95) / 0.05; // 0 to 1
              fadeOutProgress = 1 - fadeOutLocal; // 1 to 0 (opacity fade)
            }
          }
          
          // Zoom in from 0.3 to 1.0
          const scale = gsap.utils.interpolate(0.3, 1.0, curiosityProgress);
          
          // Blur from 40px to 0px (only during fade in), then back to blur during fade out
          let blur = gsap.utils.interpolate(40, 0, curiosityProgress);
          if (readingProgress >= 0.95) {
            // Add blur back during fade out
            const fadeOutLocal = (readingProgress - 0.95) / 0.05;
            blur = gsap.utils.interpolate(0, 20, fadeOutLocal);
          }
          
          // Apply opacity with fade out
          const overallOpacity = curiosityProgress * fadeOutProgress;
          
          // Fade in the entire section
          gsap.set(sectionRef.current, {
            opacity: overallOpacity,
            pointerEvents: overallOpacity > 0.1 ? "auto" : "none",
          });

          gsap.set(curiosityRef.current, {
            scale: readingProgress >= 0.95 ? 
              gsap.utils.interpolate(1.0, 1.2, 1 - fadeOutProgress) : 
              scale,
            opacity: fadeOutProgress,
            filter: `blur(${blur}px)`,
          });

          // Background blur effect
          const bgBlur = readingProgress >= 0.95 ? 
            gsap.utils.interpolate(0, 20, 1 - fadeOutProgress) : 
            gsap.utils.interpolate(20, 0, curiosityProgress);
          gsap.set(backgroundRef.current, {
            opacity: overallOpacity * 0.3,
            filter: `blur(${bgBlur}px)`,
          });
        },
        onLeaveBack: () => {
          // Fade out curiosity section when scrolling back up (before reading section becomes visible)
          // This happens when reading progress goes below 0.8
          gsap.set(sectionRef.current, {
            opacity: 0,
            pointerEvents: "none",
          });
          
          gsap.set(curiosityRef.current, {
            scale: 0.3,
            opacity: 0,
            filter: "blur(40px)",
          });

          gsap.set(backgroundRef.current, {
            opacity: 0,
            filter: "blur(20px)",
          });
        },
      });
      
      // Additional trigger to ensure section is hidden and doesn't block after scroll
      ScrollTrigger.create({
        trigger: readingSection,
        start: () => {
          const endPoint = curiosityTrigger?.end || 0;
          return `${endPoint} top`;
        },
        end: () => {
          const endPoint = curiosityTrigger?.end || 0;
          return `${endPoint + 100} top`;
        },
        onEnter: () => {
          // Convert from fixed to relative so it doesn't block subsequent sections
          gsap.set(sectionRef.current, {
            position: "relative",
            opacity: 0,
            pointerEvents: "none",
            zIndex: 1,
            height: "0px",
            minHeight: "0px",
          });
        },
        onLeaveBack: () => {
          // Restore when scrolling back up
          gsap.set(sectionRef.current, {
            position: "fixed",
            opacity: 1,
            pointerEvents: "auto",
            zIndex: 100,
            height: "100vh",
            minHeight: "100vh",
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #000000 100%)",
        }}
      >
        {/* Background blur effect */}
        <div
          ref={backgroundRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(217, 119, 6, 0.1) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 ml-24 md:ml-32">
          <div className="flex items-center justify-center min-h-screen">
            <h1
              ref={curiosityRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] font-light text-white tracking-tight text-center"
              style={{
                transformOrigin: "center center",
                color: "#d97706",
              }}
            >
              CURIOSITY
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CuriositySection;
