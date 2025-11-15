"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
  
  // Navigation sections - these will become the navbar
  const coverSections = [
    { number: "01", label: "Experience", id: "experience", badgeColor: "#F7C945", badgeText: "#282828" },
    { number: "02", label: "Projects", id: "work", badgeColor: "#E45CA5", badgeText: "#282828" },
    { number: "03", label: "Certificates", id: "certificates", badgeColor: "#8ED457", badgeText: "#282828" },
    { number: "04", label: "Skills", id: "certificates", badgeColor: "#7B61FF", badgeText: "#282828" },
    { number: "05", label: "Contact", id: "contact", badgeColor: "#1283EB", badgeText: "#282828" },
  ];

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

      // Animate software engineer text with handwriting effect
      if (softwareEngineerRef.current) {
        const chars = softwareEngineerRef.current.querySelectorAll('.hero-char');
        nameEntrance.to(chars, {
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
        }, "-=0.3");
      }

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
      
        // Keep the dot visible permanently (no fade out)
        finalDotTimeline.to(finalDot, {
          duration: 1
        });
      
        dotTimeline.add(finalDotTimeline);
      
        return dotTimeline;
      };

      // Add dot animation to start in parallel with software engineer typing
      masterTimeline.add(() => {
        const dotTimeline = buildDotTimeline();
        if (dotTimeline) {
          const nameEntranceDuration = nameEntrance.duration();
          const softwareEngineerStartTime = Math.max(0, nameEntranceDuration - 0.3);
          masterTimeline.add(dotTimeline, softwareEngineerStartTime);
        }
      });

    }, headingRef);

    return () => {
      ctx.revert();
      // Remove any created dots
      document.querySelectorAll('.original-i-dot').forEach(dot => dot.remove());
      document.querySelectorAll('.final-i-dot').forEach(dot => dot.remove());
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center px-2 py-2 text-center text-[#006f49] sm:px-3 sm:py-3 lg:px-3 lg:py-4 xl:px-4 xl:py-5 relative overflow-hidden cursor-none"
      style={{
        backgroundColor: "#F5ECE1",
      }}
    >
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 opacity-0 scale-0"
        style={{
          background: "radial-gradient(circle, #DA451F 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(1px)",
          mixBlendMode: "difference",
          left: -12,
          top: -12,
        }}
      />

      <div className="hero-cover">
        <div className="hero-cover-header">
          <p className="hero-cover-title">Portfolio</p>
          <div className="hero-cover-line" />
        </div>

        <div className="hero-heading-wrapper">
          {/* Mariam Text */}
          <h1
            ref={headingRef}
            className="hero-heading font-black leading-[0.85] text-[clamp(6rem,18vw,18rem)]"
          >
            <span className="hero-name">
              <span className="hero-mar">
                <span className="hero-letter">M</span>
                <span ref={a1Ref} className="hero-letter">a</span>
                <span ref={rRef} className="hero-letter hero-letter-r">
                  r
                </span>
              </span>
              <span className="hero-iam-wrapper">
                <span className="hero-iam">
                  <span className="hero-i-wrapper">
                    <span ref={iRef} className="hero-letter hero-letter-i">
                      i
                    </span>
                  </span>
                  <span ref={amContainerRef} className="hero-am">
                    <span ref={a2mRef} className="hero-letter">a</span>
                    <span ref={mMariamRef} className="hero-letter">m</span>
                  </span>
                </span>
                <div ref={softwareEngineerRef} className="hero-software-engineer">
                  {"software engineer".split("").map((char, index) => (
                    <span key={index} className="hero-char" style={{ display: char === " " ? "inline" : "inline-block" }}>
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
              </span>
            </span>
          </h1>
        </div>

        {/* Navigation List - CLICKABLE */}
        <div className="hero-cover-list mt-10" role="list">
          {coverSections.map((section) => (
            <div 
              key={section.number} 
              className="hero-cover-item nav-link" 
              role="listitem"
              onClick={() => onNavigate(section.id)}
              style={{ cursor: 'pointer' }}
            >
              <span
                className="hero-cover-badge"
                style={{ backgroundColor: section.badgeColor, color: section.badgeText }}
              >
                {section.number}
              </span>
              <span className="hero-cover-text">{section.label}</span>
            </div>
          ))}
        </div>
      </div>

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
          gap: 1.5rem;
          height: 100%;
          justify-content: space-between;
          padding-bottom: 1rem;
        }

        @media (min-width: 1024px) {
          .hero-cover {
            gap: 2rem;
            padding-bottom: 1.5rem;
          }
        }

        .hero-cover-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: "Space Grotesk", "Inter", sans-serif;
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
          flex: 1;
          width: 100%;
        }

        .hero-cover-list {
          border-top: 2px solid #E2D5C5;
          border-bottom: 2px solid #E2D5C5;
          display: flex;
          flex-direction: column;
          width: 100%;
          padding-bottom: 1.5rem;
        }

        @media (min-width: 1024px) {
          .hero-cover-list {
            padding-bottom: 2rem;
          }
        }

        .hero-cover-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 0;
          border-bottom: 1px solid #E2D5C5;
          font-family: "Space Grotesk", "Inter", sans-serif;
          transition: all 0.3s ease;
        }

        .hero-cover-item:hover {
          background-color: rgba(218, 69, 31, 0.05);
          transform: translateX(10px);
        }

        .hero-cover-item:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .hero-cover-badge {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .hero-cover-item:hover .hero-cover-badge {
          transform: scale(1.1);
        }

        .hero-cover-text {
          font-size: clamp(1.1rem, 2.5vw, 2rem);
          text-transform: uppercase;
          font-weight: 600;
          color: #14110F;
          transition: all 0.3s ease;
        }

        .hero-cover-item:hover .hero-cover-text {
          color: #DA451F;
        }

        @media (max-width: 768px) {
          .hero-heading-wrapper {
            justify-content: center;
          }

          .hero-heading {
            text-align: center;
          }
        }

        @media (min-width: 1024px) {
          #hero {
            height: 100vh;
            height: 100dvh;
          }
        }

        .hero-name {
          display: inline-flex;
          align-items: flex-end;
          gap: 0.1em;
          position: relative;
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
          font-size: clamp(1.3rem, 3.5vw, 2.7rem);
          color: #DA451F;
          text-align: center;
          position: absolute;
          top: 100%;
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
      `}</style>
    </section>
  );
};

export default Hero;