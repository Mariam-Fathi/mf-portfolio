"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const iRef = useRef<HTMLSpanElement | null>(null);
  const rRef = useRef<HTMLSpanElement | null>(null);
  const a1Ref = useRef<HTMLSpanElement | null>(null);
  const a2mRef = useRef<HTMLSpanElement | null>(null);
  const mMariamRef = useRef<HTMLSpanElement | null>(null);
  const softwareEngineerRef = useRef<HTMLDivElement | null>(null);
  const peaceImageRef = useRef<HTMLDivElement | null>(null);
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

      const softwareText = "software";
      const engineerText = "Engineer";

      const playSoftwareEngineerWriting = () => {
        if (!softwareEngineerRef.current) return;

        const heroSection = document.getElementById("hero");
        const iamSubsection = document.querySelector('.hero-iam');

        if (!heroSection || !iamSubsection) return;

        const heroRect = heroSection.getBoundingClientRect();
        const iamRect = iamSubsection.getBoundingClientRect();

        const iamLeft = iamRect.left - heroRect.left;
        const iamWidth = iamRect.width;
        const offsetBelowIam = Math.max(Math.min(iamRect.height * 0.25, 48), 16);

        gsap.set(softwareEngineerRef.current, {
          left: iamLeft,
          top: iamRect.bottom - heroRect.top + offsetBelowIam,
          bottom: "auto",
          width: iamWidth,
          opacity: 1
        });

        softwareEngineerRef.current.innerHTML = `
          <div class="software-line">${softwareText}</div>
          <div class="engineer-line">${engineerText}</div>
        `;

        if (peaceImageRef.current) {
          gsap.set(peaceImageRef.current, { opacity: 0, display: "none" });
        }

        const softwareLine = softwareEngineerRef.current.querySelector('.software-line');
        const engineerLine = softwareEngineerRef.current.querySelector('.engineer-line');

        if (!softwareLine || !engineerLine) return;

        const placePeaceIllustration = () => {
          const heroSectionEl = document.getElementById("hero");
          const peaceWrapper = peaceImageRef.current;
          if (!heroSectionEl || !peaceWrapper) return;

          const heroRectLocal = heroSectionEl.getBoundingClientRect();
          const softwareRect = softwareLine.getBoundingClientRect();

          const targetWidth = Math.min(Math.max(softwareRect.width * 0.28, 110), 220);
          const verticalOffset = Math.max(softwareRect.height * 0.85, 54);
          const leftPosition = softwareRect.right - heroRectLocal.left - targetWidth * 0.78;
          const topPosition = softwareRect.top - heroRectLocal.top - verticalOffset;

          gsap.set(peaceWrapper, {
            width: targetWidth,
            left: leftPosition,
            top: topPosition,
            rotation: 30,
            display: "block"
          });

          if (peaceImageRef.current) {
            gsap.to(peaceImageRef.current, {
              opacity: 1,
              duration: 0.45,
              ease: "power2.out"
            });
          }
        };

        const softwareChars = softwareText.split("");
        let currentSoftwareText = "";

        softwareChars.forEach((char, index) => {
          setTimeout(() => {
            currentSoftwareText += char;
            softwareLine.textContent = currentSoftwareText;

            if (index % 2 === 0) {
              gsap.to(softwareLine, {
                y: -1,
                duration: 0.08,
                yoyo: true,
                repeat: 1
              });
            }

            if (index === softwareChars.length - 1) {
              placePeaceIllustration();
            }
          }, index * 120);
        });

        setTimeout(() => {
          const engineerChars = engineerText.split("");
          let currentEngineerText = "";

          engineerChars.forEach((char, index) => {
            setTimeout(() => {
              currentEngineerText += char;
              engineerLine.textContent = currentEngineerText;

              if (index % 2 === 0) {
                gsap.to(engineerLine, {
                  y: -1,
                  duration: 0.08,
                  yoyo: true,
                  repeat: 1
                });
              }
            }, index * 120);
          });
        }, softwareText.length * 120 + 300);
      };

      const softwareWritingDurationSec = ((softwareText.length + engineerText.length) * 120 + 300) / 1000;

      masterTimeline.add(nameEntrance);
      masterTimeline.call(playSoftwareEngineerWriting, undefined, "+=0.1");
      masterTimeline.to({}, { duration: softwareWritingDurationSec });

      const buildDotTimeline = () => {
        // Get the elements for dot animation
        const iMariam = iRef.current;
        const rLetter = rRef.current;
        const a2Letter = a2mRef.current;
        const mMariam = mMariamRef.current;
        const amContainer = amContainerRef.current;
      
        if (!iMariam || !rLetter || !a2Letter || !mMariam || !amContainer) return undefined;
      
        const iMariamRect = iMariam.getBoundingClientRect();
        const rRect = rLetter.getBoundingClientRect();
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
          backgroundColor: "#E9F4E3",
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
      
        dotTimeline.to(originalDot, {
          keyframes: [
            { x: iMariamCenterX - (dotSize / 2) - 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (dotSize / 2) + 5, duration: 0.2, ease: "power1.inOut" },
            { x: iMariamCenterX - (dotSize / 2), duration: 0.2, ease: "power1.inOut" }
          ]
        });
      
        dotTimeline.to(originalDot, {
          keyframes: [
            { y: iMariamCenterY + 60, backgroundColor: "#DCEFD0", duration: 0.4, ease: "power2.in" },
            { y: iMariamCenterY + 30, scaleY: 0.7, backgroundColor: "#CBE6BB", duration: 0.15, ease: "power2.out" },
            { y: iMariamCenterY - 15, scaleY: 1, backgroundColor: "#BADDA6", duration: 0.2, ease: "bounce.out" }
          ]
        });
      
        dotTimeline.to(originalDot, {
          y: a2CenterY - 50,
          x: a2CenterX - (dotSize / 2),
          scaleY: 0.75,
          backgroundColor: "#AAD491",
          duration: 0.3,
          ease: "power2.out"
        });
        dotTimeline.to(originalDot, { y: a2CenterY - 70, duration: 0.2, ease: "sine.inOut" });
        dotTimeline.to(originalDot, {
          y: a2CenterY + 10,
          scaleY: 1.2,
          backgroundColor: "#9BCB7D",
          duration: 0.25,
          ease: "power2.in"
        });
        dotTimeline.to(originalDot, {
          y: a2CenterY,
          scaleY: 0.8,
          backgroundColor: "#ABCD9B",
          duration: 0.15,
          ease: "bounce.out",
          onComplete: () => {
            if (a2mRef.current) {
              gsap.to(a2mRef.current, {
                color: "#ABCD9B",
                duration: 0.3,
                ease: "power2.out"
              });
            }
          }
        });
        dotTimeline.to(originalDot, { scaleY: 1, duration: 0.1 });
      
        dotTimeline.to(originalDot, {
          keyframes: [
            { x: mCenterX - (dotSize / 2), y: mCenterY - 100, scaleY: 0.75, duration: 0.3, ease: "power2.out" },
            { y: mCenterY - 120, duration: 0.2, ease: "sine.inOut" },
            { y: mCenterY + 20, scaleY: 1.2, duration: 0.25, ease: "power2.in" },
            {
              y: mCenterY,
              scaleY: 0.8,
              duration: 0.15,
              ease: "bounce.out",
              onComplete: () => {
                if (mMariamRef.current) {
                  gsap.to(mMariamRef.current, {
                    color: "#ABCD9B",
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
            { backgroundColor: "#E9F4E3", y: mCenterY - 40, scaleY: 0.75, duration: 0.2, ease: "power2.out" },
            { y: heroRect.height + 100, scaleY: 1.2, opacity: 0, duration: 0.5, ease: "power2.in" }
          ]
        }, "+=0.3");
      
        dotTimeline.set(originalDot, { display: "none" }, "+=0.5");
      
        const finalDot = document.createElement("div");
        finalDot.className = "final-i-dot";
      
        heroSection.appendChild(finalDot);
      
        const finalDotSize = dotSize ;
      
        gsap.set(finalDot, {
          width: `${finalDotSize}px`,
          height: `${finalDotSize}px`,
          borderRadius: "50%",
          backgroundColor: "#ABCD9B",
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
            { y: iMariamCenterY + 60, backgroundColor: "#DCEFD0", duration: 0.4, ease: "power2.in" },
            { y: iMariamCenterY + 30, scaleY: 0.7, backgroundColor: "#CBE6BB", duration: 0.15, ease: "power2.out" },
            { 
              y: iMariamCenterY , 
              scaleY: 1, 
              backgroundColor: "#ABCD9B", 
              duration: 0.2, 
              ease: "bounce.out",
              onComplete: () => {
                // Land permanently on "i" - change the "i" color and make it stay
                if (iRef.current) {
                  gsap.to(iRef.current, {
                    color: "#ABCD9B",
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
      if (peaceImageRef.current) {
        peaceImageRef.current.style.opacity = "0";
        peaceImageRef.current.style.display = "none";
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-start px-6 py-12 text-center text-[#E2E6E7] sm:px-12 lg:px-24 relative overflow-hidden cursor-none"
      style={{
        backgroundColor: "#F5ECE1",
        paddingTop: "clamp(48px, 10vh, 160px)",
        paddingBottom: "clamp(80px, 14vh, 200px)",
      }}
    >
      {/* Add the font link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playwrite+HU:wght@400&display=swap"
        rel="stylesheet"
      />
      
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 opacity-0 scale-0"
        style={{
          background: "radial-gradient(circle, #ABCD9B 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(1px)",
          mixBlendMode: "difference",
          left: -12,
          top: -12,
        }}
      />

      {/* Mariam Text - Positioned Left Center */}
      <h1
        ref={headingRef}
        className="hero-heading absolute left-10 font-black leading-[0.85] text-[clamp(4.5rem,14vw,18rem)] text-left"
        style={{
          top: "clamp(6vh, 14vw, 22vh)"
        }}
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

      {/* Software Engineer Text - Positioned below "iam" subsection */}
      <div 
        ref={softwareEngineerRef}
        className="software-engineer-text absolute"
        style={{
          pointerEvents: 'none',
          zIndex: 1001,
          lineHeight: 1,
          opacity: 0
        }}
      >
        {/* Text will be populated by animation */}
      </div>
      <div ref={peaceImageRef} className="software-peace-wrapper">
        <Image
          src="/images/peace.png"
          alt="Peace illustration"
          width={240}
          height={240}
          priority
        />
      </div>

      <style jsx>{`
        .hero-heading {
          position: absolute;
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

        .software-peace-wrapper {
          position: absolute;
          pointer-events: none;
          z-index: 1002;
          opacity: 0;
          display: none;
        }

        .software-peace-wrapper :global(img) {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Software Engineer text styles */
        .software-engineer-text {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          text-align: left;
          gap: clamp(4px, 0.8vw, 16px);
        }

        /* Software line - Playwrite HU font but BIGGER to match "iam" space */
        :global(.software-line) {
          font-family: "Playwrite HU", sans-serif;
          font-size: clamp(3rem, 8vw, 10rem);
          color: #E6A9C8;
          font-weight: 400;
          letter-spacing: 0.05em;
          white-space: nowrap;
          margin-bottom: 0.1em;
          line-height: 0.9;
        }

        /* Engineer line - Momo Trust Display font (same as Mariam) */
        :global(.engineer-line) {
          font-family: "Momo Trust Display", sans-serif;
          font-size: clamp(4.5rem, 14vw, 18rem);
          color: #ABCD9B;
          font-weight: 900;
          letter-spacing: normal;
          white-space: nowrap;
          line-height: 1.05;
        }

        /* Original i-dot styles - BIGGER */
        :global(.original-i-dot),
        :global(.final-i-dot) {
          border-radius: 50%;
          background-color: #E9F4E3;
          position: absolute;
          zIndex: 1000;
          pointer-events: none;
        }

        /* Final dot specific style */
        :global(.final-i-dot) {
          background-color: #ABCD9B;
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