"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const iRef = useRef<HTMLSpanElement | null>(null);
  const rRef = useRef<HTMLSpanElement | null>(null);
  const a1Ref = useRef<HTMLSpanElement | null>(null);
  const a2mRef = useRef<HTMLSpanElement | null>(null);
  const mMariamRef = useRef<HTMLSpanElement | null>(null);
  const amContainerRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

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
      
        const dotSize = Math.max(iMariamRect.width * 0.25, 35) + 7;
      
        gsap.set(originalDot, {
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: "#FEF0EB", // Light variant of #DA451F
          position: "absolute",
          zIndex: 1000,
          opacity: 1,
          left: 0,
          top: 0,
          x: iMariamCenterX - (dotSize / 2),
          y: iMariamCenterY - (dotSize / 2),
          rotation: 0,
          scale: 1
        });
      
        const dotTimeline = gsap.timeline();
      
        dotTimeline.set(iRef.current, {
          textContent: "ı",
          transformOrigin: "bottom center"
        });
      
        // Wiggle animation on the "i" position
        dotTimeline.to(originalDot, {
          keyframes: [
            { x: iMariamCenterX - (dotSize / 2) - 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (dotSize / 2) + 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (dotSize / 2), duration: 0.2, ease: "power1.inOut" }
          ]
        });
      
        // STUCK JUMP from "i" to "a" - gets stuck, struggles, then jumps
        dotTimeline.to(originalDot, {
          keyframes: [
            { 
              // Try to jump but get stuck - small upward movement
              y: iMariamCenterY - 20 ,
              scaleX: 1.4,
              scaleY: 1,              
              duration: .2,
              backgroundColor: "#E9D8D4", // Darker variant
              ease: "power2.inOut"
            },

            { 
              // Try to jump but get stuck - small upward movement
              y: iMariamCenterY - 20 ,
              scaleX: 1.4,
              scaleY: 1.3,              
              duration: .2,
              backgroundColor: "#E9D8D4", // Darker variant
              ease: "power2.inOut"
            },
        
            { 
              // Struggle - small vibration while stuck
              x: iMariamCenterX - (dotSize / 2) - 2,
              duration: 0.1,
              ease: "power1.inOut"
            },
            { 
              x: iMariamCenterX - (dotSize / 2) + 2,
              duration: 0.1,
              ease: "power1.inOut"
            },
            { 
              x: iMariamCenterX - (dotSize / 2),
              duration: 0.1,
              ease: "power1.inOut"
            },
            { 
              // Build up energy for the real jump - compression
              scaleX: 1.2,
              scaleY: 0.7,
              duration: 0.15,
              ease: "power2.out"
            },
            { 
              // EXPLOSIVE BREAK FREE JUMP!
              y: iMariamCenterY - 80,
              scaleY: 0.9,
              scaleX: 1.1,
              duration: 0.2,
              ease: "power4.out"
            },
            { 
              // Arc smoothly to "a" position
              x: a2CenterX - (dotSize / 2),
              y: a2CenterY - 50,
              scaleY: 0.75,
              scaleX: 1,
              backgroundColor: "#E55A3A", // Darker variant
              duration: 0.4,
              ease: "sine.inOut"
            }
          ]
        });
      
        // Continue with the existing "a" landing animation
        dotTimeline.to(originalDot, { 
          y: a2CenterY - 70, 
          duration: 0.2, 
          ease: "sine.inOut" 
        });
        
        dotTimeline.to(originalDot, {
          y: a2CenterY + 10,
          scaleY: 1.2,
          backgroundColor: "#DF4A2A", // Even darker variant
          duration: 0.25,
          ease: "power2.in"
        });
        
        dotTimeline.to(originalDot, {
          y: a2CenterY,
          scaleY: 0.8,
          backgroundColor: "#DA451F", // Target color
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
            { x: mCenterX - (dotSize / 2), y: mCenterY - 100, scaleY: 0.75, backgroundColor: "#E55A3A", duration: 0.3, ease: "power2.out" }, // Darker variant
            { y: mCenterY - 120, duration: 0.2, ease: "sine.inOut" },
            { y: mCenterY + 20, scaleY: 1.2, backgroundColor: "#DF4A2A", duration: 0.25, ease: "power2.in" }, // Even darker variant
            {
              y: mCenterY,
              scaleY: 0.8,
              backgroundColor: "#DA451F", // Target color
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
            { backgroundColor: "#FEF0EB", y: mCenterY - 40, scaleY: 0.75, duration: 0.2, ease: "power2.out" }, // Light variant
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
          backgroundColor: "#DA451F", // Target color
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
            { y: iMariamCenterY + 60, backgroundColor: "#F9D5CC", duration: 0.4, ease: "power2.in" }, // Lighter variant
            { y: iMariamCenterY + 30, scaleY: 0.7, backgroundColor: "#F4BAA8", duration: 0.15, ease: "power2.out" }, // Medium-light variant
            { 
              y: iMariamCenterY, 
              scaleY: 1, 
              backgroundColor: "#DA451F", // Target color
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
          duration: 1 // Just wait, don't animate anything
        });
      
        dotTimeline.add(finalDotTimeline);
      
        return dotTimeline;
      };

      masterTimeline.add(() => {
        const dotTimeline = buildDotTimeline();
        if (dotTimeline) {
          masterTimeline.add(dotTimeline, "+=0");
        }
      }, "+=0.15");

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
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 text-center text-[#006f49] sm:px-12 lg:px-24 relative overflow-hidden cursor-none"
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

      {/* Mariam Text - Centered and Bigger */}
      <h1
        ref={headingRef}
        className="hero-heading font-black leading-[0.85] text-[clamp(8rem,20vw,24rem)] text-center"
      >
        <span className="hero-name">
          <span className="hero-mar">
            <span className="hero-letter">M</span>
            <span ref={a1Ref} className="hero-letter">a</span>
            <span ref={rRef} className="hero-letter hero-letter-r">
              r
            </span>
          </span>
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
        </span>
      </h1>

      <style jsx>{`
        .hero-heading {
          font-family: "Momo Trust Display", sans-serif;
          letter-spacing: normal;
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