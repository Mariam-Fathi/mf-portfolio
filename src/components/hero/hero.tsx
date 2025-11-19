"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const iRef = useRef<HTMLSpanElement | null>(null);
  const rRef = useRef<HTMLSpanElement | null>(null);
  const a1Ref = useRef<HTMLSpanElement | null>(null);
  const a2mRef = useRef<HTMLSpanElement | null>(null);
  const mMariamRef = useRef<HTMLSpanElement | null>(null);
  const amContainerRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const softwareEngineerRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const finalDotRef = useRef<HTMLDivElement | null>(null);

  
  // Navigation sections - these will become the navbar
  const coverSections = [
    { number: "01", label: "Experience", id: "experience", badgeColor: "#F5ECE1", badgeText: "#014421" },
    { number: "02", label: "Projects", id: "work", badgeColor: "#F5ECE1", badgeText: "#014421" },
    { number: "03", label: "Certificates", id: "certificates", badgeColor: "#F5ECE1", badgeText: "#014421" },
    { number: "04", label: "Skills", id: "skills", badgeColor: "#F5ECE1", badgeText: "#014421" },
    { number: "05", label: "Contact", id: "contact", badgeColor: "#F5ECE1", badgeText: "#014421" },
  ];

  // Handler to hide dot before navigation
  const handleNavigate = (section: string) => {
    // Hide the final dot if it exists
    if (finalDotRef.current && finalDotRef.current.style.display !== "none") {
      gsap.to(finalDotRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (finalDotRef.current) {
            finalDotRef.current.style.display = "none";
          }
        }
      });
    }
    // Also hide any original dots that might still be visible
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      const dots = heroSection.querySelectorAll('.original-i-dot, .final-i-dot');
      dots.forEach((dot) => {
        const htmlDot = dot as HTMLElement;
        if (htmlDot.style.display !== "none") {
          gsap.to(htmlDot, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
              htmlDot.style.display = "none";
            }
          });
        }
      });
    }
    onNavigate(section);
  };

  // Cursor follower effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // (reverted) no auto-fit logic

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hide all letters
      const letters = document.querySelectorAll('.hero-letter');
      gsap.set(letters, { opacity: 0, y: 100, rotationX: 90 });

      // Initial hide software engineer text characters
      if (softwareEngineerRef.current) {
        const chars = softwareEngineerRef.current.querySelectorAll('.hero-char');
        gsap.set(chars, { 
          opacity: 0, 
          y: 20,
          scale: 0.5,
          rotation: -5
        });
      }

      const nameEntrance = gsap.timeline();

      nameEntrance.fromTo('.hero-mar .hero-letter', {
        opacity: 0,
        y: 100,
        rotationX: 90
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        immediateRender: false
      });

      nameEntrance.fromTo('.hero-iam .hero-letter', {
        opacity: 0,
        y: 100,
        rotationX: 90
      }, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "elastic.out(1.2, 0.8)",
        immediateRender: false
      }, "-=0.3");

      const masterTimeline = gsap.timeline({
        onComplete: () => setIsAnimationComplete(true)
      });

      masterTimeline.add(nameEntrance);
      
      const buildDotTimeline = () => {
        // Get the elements for dot animation
        const iMariam = iRef.current;
        const rLetter = rRef.current;
        const a2Letter = a2mRef.current;
        const mMariam = mMariamRef.current;
        const amContainer = amContainerRef.current;
      
        if (!iMariam || !rLetter || !a2Letter || !mMariam || !amContainer) return undefined;
      
        const iMariamRect = iMariam.getBoundingClientRect();
        const a2Rect = a2Letter.getBoundingClientRect();
        const mMariamRect = mMariam.getBoundingClientRect();
      
        const heroSection = document.getElementById("hero");
        if (!heroSection) return undefined;
        const heroRect = heroSection.getBoundingClientRect();
      
        const iMariamCenterX = iMariamRect.left - heroRect.left + iMariamRect.width / 2;
        const iMariamCenterY = iMariamRect.top - heroRect.top + (iMariamRect.height * 0.25);
        const a2CenterX = a2Rect.left - heroRect.left + a2Rect.width / 2;
        const a2CenterY = a2Rect.top - heroRect.top + a2Rect.height / 2;
        const mCenterX = mMariamRect.left - heroRect.left + mMariamRect.width / 2;
        const mCenterY = mMariamRect.top - heroRect.top + mMariamRect.height / 2;
      
        const originalDot = document.createElement("div");
        originalDot.className = "original-i-dot";
      
        heroSection.appendChild(originalDot);
      
        const dotSize = Math.max(iMariamRect.width * 0.25, 35);
      
        gsap.set(originalDot, {
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: "#DA451F",
          position: "absolute",
          zIndex: 1000,
          opacity: 1,
          left: 0,
          top: 0,
          x: iMariamCenterX - (dotSize / 2),
          y: iMariamCenterY - (dotSize / 2),
          rotation: 0,
        });
      
        const dotTimeline = gsap.timeline();
      
        dotTimeline.set(iRef.current, {
          textContent: "ı",
          transformOrigin: "bottom center"
        });
      
        // Wiggle animation on the "i" position
        dotTimeline.to(originalDot, {
          keyframes: [
            { x: iMariamCenterX - (dotSize / 2), duration: .15, ease: "elastic" },
          ]
        });
    
        // STUCK JUMP from "i" to "a" - gets stuck, struggles, then jumps
        dotTimeline.to(originalDot, {
          keyframes: [
            { 
              // Build up energy for the real jump - compression
              scaleX: 1.2,
              scaleY: 0.7,
              duration: 0.2,
              ease: "power2.out"
            },
            { 
              // EXPLOSIVE BREAK FREE JUMP!
              y: iMariamCenterY - 80,
              scaleY: 0.9,
              scaleX: 1.1,
              duration: 0.7,
              ease: "power4.out"
            },
            { 
              // Arc smoothly to "a" position
              x: a2CenterX - (dotSize / 2),
              y: a2CenterY - 50,
              scaleY: 0.75,
              scaleX: 1,
              backgroundColor: "#E55A3A",
              duration: 0.4,
              ease: "sine.inOut"
            }
          ]
        });
        dotTimeline.to(iRef.current, {
          color: "#DA451F",
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.7");
      
        // Continue with the existing "a" landing animation
        dotTimeline.to(originalDot, { 
          y: a2CenterY - 70, 
          duration: 0.2, 
          ease: "sine.inOut" 
        });
        
        dotTimeline.to(originalDot, {
          y: a2CenterY + 10,
          scaleY: 1.2,
          backgroundColor: "#DF4A2A",
          duration: 0.25,
          ease: "power2.in"
        });
        
        dotTimeline.to(originalDot, {
          y: a2CenterY,
          scaleY: 0.8,
          backgroundColor: "#DA451F",
          duration: 0.15,
          ease: "bounce.out",
          onComplete: () => {
            if (a2mRef.current) {
              gsap.to(a2mRef.current, {
                color: "#DA451F",
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        });
        
        dotTimeline.to(originalDot, { 
          scaleY: 1, 
          duration: 0.1 
        });
      
        // Continue with the rest of the animation to "m"
        dotTimeline.to(originalDot, {
          keyframes: [
            { x: mCenterX - (dotSize / 2), y: mCenterY - 100, scaleY: 0.75, backgroundColor: "#E55A3A", duration: 0.3, ease: "power2.out" },
            { y: mCenterY - 120, duration: 0.2, ease: "sine.inOut" },
            { y: mCenterY + 20, scaleY: 1.2, backgroundColor: "#DF4A2A", duration: 0.25, ease: "power2.in" },
            {
              y: mCenterY,
              scaleY: 0.8,
              backgroundColor: "#DA451F",
              duration: 0.15,
              ease: "bounce.out",
              onComplete: () => {
                if (mMariamRef.current) {
                  gsap.to(mMariamRef.current, {
                    color: "#DA451F",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }
            },
            { scaleY: 1, duration: 0.1 }
          ]
        }, "+=0.3");
      
        dotTimeline.to(originalDot, {
          keyframes: [
            { backgroundColor: "#FEF0EB", y: mCenterY - 40, scaleY: 0.75, duration: 0.2, ease: "power2.out" },
            { y: heroRect.height + 100, scaleY: 1.2, opacity: 0, duration: 0.5, ease: "power2.in" }
          ]
        }, "+=0.3");
      
        dotTimeline.set(originalDot, { display: "none" }, "+=0.5");
      
        const finalDot = document.createElement("div");
        finalDot.className = "final-i-dot";
        finalDotRef.current = finalDot;

        heroSection.appendChild(finalDot);
      
        const finalDotSize = dotSize;
      
        gsap.set(finalDot, {
          width: `${finalDotSize}px`,
          height: `${finalDotSize}px`,
          borderRadius: "50%",
          backgroundColor: "#DA451F",
          position: "absolute",
          zIndex: 1000,
          opacity: 1,
          left: 0,
          top: 0,
          x: iMariamCenterX - (finalDotSize / 2),
          y: -50,
          rotation: 0,
          scale: 1
        });
      
        const finalDotTimeline = gsap.timeline();
      
        // EXACT SAME MOTION as the original dot's first movement on "i"
        finalDotTimeline.to(finalDot, {
          keyframes: [
            { x: iMariamCenterX - (finalDotSize / 2) - 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (finalDotSize / 2) + 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (finalDotSize / 2), duration: 0.2, ease: "power1.inOut" }
          ]
        });
      
        finalDotTimeline.to(finalDot, {
          keyframes: [
            { y: iMariamCenterY + 60, backgroundColor: "#F9D5CC", duration: 0.4, ease: "power2.in" },
            { y: iMariamCenterY + 30, scaleY: 0.7, backgroundColor: "#F4BAA8", duration: 0.15, ease: "power2.out" },
            { 
              y: iMariamCenterY, 
              scaleY: 1, 
              backgroundColor: "#DA451F",
              duration: 0.2, 
              ease: "power2.out",
              onComplete: () => {
                // Land permanently on "i" - change the "i" color and make it stay
                if (iRef.current) {
                  gsap.to(iRef.current, {
                    color: "#DA451F",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }
            }
          ]
        });
      
        // Fade out the final dot before showing software engineer text
        finalDotTimeline.to(finalDot, {
          opacity: 0,
          scale: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (finalDot && finalDot.parentNode) {
              finalDot.style.display = "none";
            }
          }
        });
        
        dotTimeline.add(finalDotTimeline);
        
        return { timeline: dotTimeline, finalDot: finalDot };
      };

      // Add dot animation
      masterTimeline.add(() => {
        const result = buildDotTimeline();
        if (result && result.timeline) {
          const dotTimeline = result.timeline;
          const nameEntranceDuration = nameEntrance.duration();
          const softwareEngineerStartTime = Math.max(0, nameEntranceDuration - 0.3);
          masterTimeline.add(dotTimeline, softwareEngineerStartTime);
          
          // Animate software engineer text AFTER final dot disappears
          if (softwareEngineerRef.current) {
            const chars = softwareEngineerRef.current.querySelectorAll('.hero-char');
            const dotEndTime = softwareEngineerStartTime + dotTimeline.duration();
            masterTimeline.to(chars, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.3,
              stagger: {
                amount: 1.5,
                from: "start",
                ease: "power2.out"
              },
              ease: "back.out(1.2)",
              immediateRender: false
            }, dotEndTime);
          }
        }
      });

    }, headingRef);

    return () => {
      ctx.revert();
      // Remove any created dots
      document.querySelectorAll('.original-i-dot').forEach(dot => dot.remove());
      document.querySelectorAll('.final-i-dot').forEach(dot => dot.remove());
      finalDotRef.current = null;
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center text-center text-[#0C5446] relative overflow-hidden cursor-none"
      style={{
        backgroundColor: "#F5ECE1",
      }}
    >
      {/* SVG Filter for Liquid Glass Effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.02 0.02"
              numOctaves="2" 
              seed="92" 
              result="noise" 
            />
            <feGaussianBlur 
              in="noise" 
              stdDeviation="2" 
              result="blurred" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="blurred" 
              scale="110"
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <div className="hero-cover">
        {/* Mariam at Top */}
        
        {/* Navigation Panels - horizontal at bottom */}
        <div className="hero-panel-strip" role="list">
          {coverSections.map((section) => {
            return (
              <div
                key={section.id}
                role="listitem"
                className="hero-panel collapsed"
                style={{ backgroundColor: section.badgeColor }}
                onClick={() => handleNavigate(section.id)}
                tabIndex={0}
              >
                <div className="hero-panel-inner">
                  <span className="hero-panel-text horizontal" style={{ color: section.badgeText }}>
                    {section.label}
                  </span>
                  <span className="hero-panel-arrow" aria-hidden="true" style={{ color: section.badgeText }}>
                    <ArrowUpRight size={27} strokeWidth={2} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />

      <style jsx>{`
        .hero-heading {
          font-family: "Momo Trust Display", sans-serif;
          letter-spacing: normal;
          text-align: right;
        }

        .hero-cover {
          width: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between; /* Mariam at top, panels at bottom */
          margin: 0;
          padding: 0;
        }

        @media (min-width: 1280px) {
          .hero-cover {
            padding: 0 1rem;
          }
        }

        .hero-cover-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: "Space Grotesk", "Inter", sans-serif;
          width: 100%;
          padding-top: 0;
          margin: 0;
        }

        .hero-cover-title {
          font-size: clamp(1rem, 2vw, 1.25rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #1e140b;
          margin: 0;
        }

        .hero-cover-line {
          width: 100%;
          height: 4px;
          background-color: #DA451F;
        }

        .hero-heading-wrapper {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
          width: 100%;
          margin-top: 1rem;
        }

        /* Panel Strip - horizontal row with auto-fit panels */
        .hero-panel-strip {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: auto; /* push to bottom */
          padding: 1rem;
          justify-content: flex-start;
          align-items: center;
        }

        .hero-panel {
          position: relative;
          cursor: pointer;
          border-radius: 2rem;
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 4rem; /* fixed height for horizontal panels */
          width: auto;
          min-width: fit-content;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        /* Tint and inner shadow layer */
        .hero-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 2rem;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        /* Backdrop blur and distortion layer */
        .hero-panel::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 2rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          isolation: isolate;
          pointer-events: none;
        }

        .hero-panel-inner {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between; /* text left, icon right */
          padding: 0 1.5rem;
          gap: 0.75rem;
          white-space: nowrap;
        }

        .hero-panel-code {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          font-weight: 800;
          font-size: 0.9rem;
          color: rgba(20, 17, 15, 0.7);
          background: rgba(255,255,255,0.3);
          border-radius: 999px;
          padding: 0.25rem 0.6rem;
        }

        .hero-panel-text {
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #14110F;
          transition: transform 0.3s ease, writing-mode 0.3s ease, opacity 0.3s ease;
          white-space: nowrap;
        }

        .hero-panel-text.vertical {
          writing-mode: vertical-rl;
          transform: none; /* start from the top, natural order */
          opacity: 0.9;
          font-size: clamp(1.1rem, 1.6vw, 1.35rem);
          line-height: 1.1;
        }

        .hero-panel-text.horizontal {
          writing-mode: horizontal-tb;
          transform: none;
          opacity: 1;
          font-size: clamp(1rem, 1.3vw, 1.3rem);
        }

        .hero-panel-arrow {
          /* color inherits from inline style matching text color */
          display: inline-flex;
          align-items: center;
          justify-content: center;
          opacity: 0.85;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .hero-heading-wrapper {
            justify-content: center;
          }

          .hero-heading {
            text-align: center;
          }
        }

        #hero {
          margin: 0;
          padding: 0;
        }

        @media (min-width: 1024px) {
          #hero {
            height: 100vh;
            height: 100dvh;
          }
        }

        .hero-name {
          display: inline-block; /* allow precise scaling */
          align-items: flex-end;
          position: relative;
          transform-origin: left bottom;
        }

        .hero-mar,
        .hero-iam {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .hero-iam-wrapper {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .hero-software-engineer {
          font-family: "Rock Salt", cursive;
          font-size: clamp(1.3rem, 3.6vw, 2.8rem);
          color: #DA451F;
          text-align: center;
          position: absolute;
          top: 0%;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          z-index: 10;
          line-height: 1.2;
        }

        .hero-software-engineer .hero-char {
          display: inline-block;
          transform-origin: bottom center;
        }

        .hero-am {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .hero-letter {
          display: inline-block;
          position: relative;
          transform-origin: bottom center;
        }

        .hero-letter-r {
          transform-origin: bottom right;
        }

        .hero-i-wrapper {
          display: inline-flex;
          position: relative;
          margin-right: 0.04em;
        }

        .hero-letter-i {
          transform-origin: bottom left;
        }

        /* Original i-dot styles */
        :global(.original-i-dot),
        :global(.final-i-dot) {
          border-radius: 50%;
          position: absolute;
          zIndex: 1000;
          pointer-events: none;
        }

        /* Final dot specific style */
        :global(.final-i-dot) {
          background-color: #DA451F;
        }

        /* Hide default cursor when custom cursor is active */
        .cursor-none {
          cursor: none;
        }

        /* visible custom cursor that follows the mouse */
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 18px;
          height: 18px;
          border: 2px solid #DA451F;
          border-radius: 9999px;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          opacity: 0; /* will be revealed by gsap on mouseenter */
        }
      `}</style>
    </section>
  );
};

export default Hero;