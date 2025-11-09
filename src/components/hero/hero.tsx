"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const iRef = useRef<HTMLSpanElement | null>(null);
  const rRef = useRef<HTMLSpanElement | null>(null);
  const iFathiRef = useRef<HTMLSpanElement | null>(null);
  const a1Ref = useRef<HTMLSpanElement | null>(null);
  const a2Ref = useRef<HTMLSpanElement | null>(null);
  const hRef = useRef<HTMLSpanElement | null>(null);
  const a2mRef = useRef<HTMLSpanElement | null>(null);
  const mMariamRef = useRef<HTMLSpanElement | null>(null);
  const softwareEngineerRef = useRef<HTMLDivElement | null>(null);
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

      // Create main timeline
      const masterTimeline = gsap.timeline({
        onComplete: () => setIsAnimationComplete(true)
      });

      // STEP 1: Playful text entrance animation for "Mariam Fathi"
      const textEntrance = gsap.timeline();
      
      // Animate "Mar" letters with stagger
      textEntrance.to('.hero-mar .hero-letter', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Animate "iam" letters with different easing
      textEntrance.to('.hero-iam .hero-letter', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "elastic.out(1.2, 0.8)"
      }, "-=0.3");

      // Animate "Fathi" letters with wave effect
      textEntrance.to('.hero-fathi .hero-letter', {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.7,
        stagger: {
          each: 0.1,
          from: "start",
          ease: "power2.out"
        },
        onComplete: () => {
          // Small celebratory bounce when all letters are in place
          gsap.to('.hero-letter', {
            y: -10,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            stagger: 0.05
          });
        }
      }, "-=0.2");

      // Add to master timeline
      masterTimeline.add(textEntrance);

      // STEP 2: Dot animation (existing code)
      masterTimeline.add(() => {
        // Get the elements for dot animation
        const iMariam = iRef.current;
        const rLetter = rRef.current;
        const a2Letter = a2mRef.current;
        const mMariam = mMariamRef.current;
        const amContainer = amContainerRef.current;

        if (!iMariam || !rLetter || !a2Letter || !mMariam || !amContainer) return;

        const iMariamRect = iMariam.getBoundingClientRect();
        const rRect = rLetter.getBoundingClientRect();
        const a2Rect = a2Letter.getBoundingClientRect();
        const mMariamRect = mMariam.getBoundingClientRect();
        const amContainerRect = amContainer.getBoundingClientRect();

        // Get hero section position for relative positioning
        const heroSection = document.getElementById("hero");
        const heroRect = heroSection?.getBoundingClientRect() || { left: 0, top: 0 };

        // Calculate positions
        const iMariamCenterX = iMariamRect.left - heroRect.left + iMariamRect.width / 2;
        const iMariamCenterY = iMariamRect.top - heroRect.top + (iMariamRect.height * 0.25);
        
        const a2CenterX = a2Rect.left - heroRect.left + a2Rect.width / 2;
        const a2CenterY = a2Rect.top - heroRect.top + a2Rect.height / 2;
        
        const mCenterX = mMariamRect.left - heroRect.left + mMariamRect.width / 2;
        const mCenterY = mMariamRect.top - heroRect.top + mMariamRect.height / 2;

        // Calculate position for software engineer text above "am" - CLOSER
        const amLeft = amContainerRect.left - heroRect.left;
        const amTop = amContainerRect.top - heroRect.top;
        const amWidth = amContainerRect.width;

        // CREATE THE DOT AS THE ACTUAL DOT FROM THE "i" - BIGGER SIZE
        const originalDot = document.createElement("div");
        originalDot.className = "original-i-dot";
        
        if (heroSection) {
          heroSection.appendChild(originalDot);
        }

        const dotSize = Math.max(iMariamRect.width * 0.25, 35);
        
        gsap.set(originalDot, {
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          borderRadius: "50%",
          backgroundColor: "#ffffff", // START WHITE
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

        // Step 1: REMOVE THE VISUAL DOT FROM THE "i" BUT KEEP OUR DOT VISIBLE
        dotTimeline.set(iRef.current, {
          textContent: "ı" // i without dot
        });

        // Step 2: SOMEONE HOLDING IT - slight wobble as if being held
        dotTimeline.to(originalDot, {
          keyframes: [
            {
              x: iMariamCenterX - (dotSize / 2) - 5,
              duration: 0.2,
              ease: "power1.inOut"
            },
            {
              x: iMariamCenterX - (dotSize / 2) + 5,
              duration: 0.2,
              ease: "power1.inOut"
            },
            {
              x: iMariamCenterX - (dotSize / 2),
              duration: 0.2,
              ease: "power1.inOut"
            }
          ]
        });

        // Step 3: RELEASE IT - starts falling and BEGIN COLOR CHANGE
        dotTimeline.to(originalDot, {
          keyframes: [
            {
              y: iMariamCenterY + 60,
              backgroundColor: "#ffd1d1",
              duration: 0.4,
              ease: "power2.in"
            },
            {
              y: iMariamCenterY + 30,
              scaleY: 0.7,
              backgroundColor: "#ffb8b8",
              duration: 0.15,
              ease: "power2.out"
            },
            {
              y: iMariamCenterY - 15,
              scaleY: 1,
              backgroundColor: "#ff9d9d",
              duration: 0.2,
              ease: "bounce.out"
            }
          ]
        });

        // Step 4: JUMP OUT TO THE RIGHT ON "a" AND CHANGE "a" COLOR
        dotTimeline.to(originalDot, {
          y: a2CenterY - 50,
          x: a2CenterX - (dotSize / 2),
          scaleY: 0.75,
          backgroundColor: "#ff8585",
          duration: 0.3,
          ease: "power2.out"
        });
        dotTimeline.to(originalDot, {
          y: a2CenterY - 70,
          duration: 0.2,
          ease: "sine.inOut"
        });
        dotTimeline.to(originalDot, {
          y: a2CenterY + 10,
          scaleY: 1.2,
          backgroundColor: "#ff7070",
          duration: 0.25,
          ease: "power2.in"
        });
        dotTimeline.to(originalDot, {
          y: a2CenterY,
          scaleY: 0.8,
          backgroundColor: "#ff6b6b",
          duration: 0.15,
          ease: "bounce.out",
          onComplete: function() {
            if (a2mRef.current) {
              gsap.to(a2mRef.current, {
                color: "#ff6b6b",
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

        // Step 5: HIT "i" FROM THE RIGHT SIDE
        dotTimeline.to(originalDot, {
          keyframes: [
            {
              x: iMariamCenterX - (dotSize / 2) + 40,
              y: iMariamCenterY - (dotSize / 2) - 10,
              scale: 1.1,
              duration: 0.2,
              ease: "power2.in"
            },
            {
              x: iMariamCenterX - (dotSize / 2),
              y: iMariamCenterY - (dotSize / 2),
              scale: 0.6,
              duration: 0.08,
              ease: "power2.out",
              onComplete: function() {
                if (iRef.current) {
                  gsap.to(iRef.current, {
                    rotation: -16,
                    x: -8,
                    y: -6,
                    color: "#ff6b6b",
                    duration: 0.8,
                    ease: "elastic.out(1.2, 0.6)"
                  });
                }
              }
            },
            {
              scale: 1,
              duration: 0.15,
              ease: "bounce.out"
            }
          ]
        }, "+=0.3");

        // Step 6: DIRECT JUMP TO "m"
        dotTimeline.to(originalDot, {
          keyframes: [
            {
              x: mCenterX - (dotSize / 2),
              y: mCenterY - 100,
              scaleY: 0.75,
              duration: 0.3,
              ease: "power2.out"
            },
            {
              y: mCenterY - 120,
              duration: 0.2,
              ease: "sine.inOut"
            },
            {
              y: mCenterY + 20,
              scaleY: 1.2,
              duration: 0.25,
              ease: "power2.in"
            },
            {
              y: mCenterY,
              scaleY: 0.8,
              duration: 0.15,
              ease: "bounce.out",
              onComplete: function() {
                if (mMariamRef.current) {
                  gsap.to(mMariamRef.current, {
                    color: "#ff6b6b",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              }
            },
            {
              scaleY: 1,
              duration: 0.1
            }
          ]
        }, "+=0.3");

        // Step 7: TURN DOT WHITE AND JUMP DOWN FROM "m" POSITION
        dotTimeline.to(originalDot, {
          keyframes: [
            {
              backgroundColor: "#ffffff",
              y: mCenterY - 40,
              scaleY: 0.75,
              duration: 0.2,
              ease: "power2.out"
            },
            {
              y: heroRect.height + 100,
              scaleY: 1.2,
              opacity: 0,
              duration: 0.5,
              ease: "power2.in"
            }
          ]
        }, "+=0.3");

        // Step 8: SLOWER HANDWRITING ANIMATION FOR "SOFTWARE ENGINEER"
        dotTimeline.call(() => {
          if (softwareEngineerRef.current) {
            gsap.set(softwareEngineerRef.current, {
              left: amLeft,
              top: amTop - 15,
              width: amWidth,
              opacity: 1
            });

            const text = "software engineer";
            softwareEngineerRef.current.textContent = "";
            
            const chars = text.split("");
            let currentText = "";
            
            chars.forEach((char, index) => {
              setTimeout(() => {
                currentText += char;
                if (softwareEngineerRef.current) {
                  softwareEngineerRef.current.textContent = currentText;
                }
                
                if (index % 2 === 0 && softwareEngineerRef.current) {
                  gsap.to(softwareEngineerRef.current, {
                    y: -1,
                    duration: 0.08,
                    yoyo: true,
                    repeat: 1
                  });
                }
              }, index * 120);
            });
          }
        }, null, "-=0.3");

        // Clean up
        dotTimeline.set(originalDot, { display: "none" }, "+=0.5");

        return dotTimeline;
      }, "+=1"); // Wait 1 second after text entrance

    }, headingRef);

    return () => {
      ctx.revert();
      document.querySelectorAll('.original-i-dot').forEach(dot => dot.remove());
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex min-h-screen w-full flex-col items-center justify-center px-6 py-12 text-center text-neutral-50 sm:px-12 lg:px-24 relative overflow-hidden cursor-none"
      style={{
        backgroundImage:
          'linear-gradient(rgba(10, 16, 14, 0.82), rgba(10, 16, 14, 0.9)), url("/images/BG.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Add the font link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap"
        rel="stylesheet"
      />
      
      {/* Cursor Follower */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 pointer-events-none z-50 opacity-0 scale-0"
        style={{
          background: "radial-gradient(circle, #ff6b6b 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(1px)",
          mixBlendMode: "difference",
          left: -12,
          top: -12,
        }}
      />

      <h1
        ref={headingRef}
        className="hero-heading w-full font-black leading-[0.85] text-[clamp(4.5rem,14vw,18rem)] text-center"
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
          <span className="hero-fathi">
            {" "}
            <span className="hero-letter">F</span>
            <span className="hero-letter">a</span>
            <span className="hero-letter">t</span>
            <span ref={hRef} className="hero-letter">h</span>
            <span ref={iFathiRef} className="hero-letter">i</span>
          </span>
        </span>
      </h1>

      {/* Software Engineer Text */}
      <div 
        ref={softwareEngineerRef}
        className="software-engineer-text absolute text-center"
        style={{
          fontFamily: '"Nothing You Could Do", cursive, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.8rem)',
          color: '#ff6b6b',
          fontWeight: '400',
          letterSpacing: '0.05em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 1001,
          lineHeight: 1,
          opacity: 0
        }}
      >
        {/* Text will be populated by animation */}
      </div>

      <style jsx>{`
        .hero-heading {
          position: relative;
          font-family: "Momo Trust Display", sans-serif;
          letter-spacing: normal;
        }

        .hero-name {
          display: inline-flex;
          align-items: flex-end;
          gap: 0.1em;
          position: relative;
          width: 100%;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-mar,
        .hero-iam,
        .hero-fathi {
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

        /* Original i-dot styles - BIGGER */
        :global(.original-i-dot) {
          border-radius: 50%;
          background-color: #ffffff;
          position: absolute;
          zIndex: 1000;
          pointer-events: none;
        }

        /* Software Engineer text styles */
        .software-engineer-text {
          filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
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