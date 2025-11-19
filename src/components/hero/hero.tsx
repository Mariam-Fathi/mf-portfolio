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
  const softwareEngineerRef = useRef<SVGTextElement | null>(null);
  const iamWrapperRef = useRef<HTMLSpanElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const finalDotRef = useRef<HTMLDivElement | null>(null);
  const [linkPositions, setLinkPositions] = useState<Array<{ x: number; y: number }>>([]);
  const heroCoverRef = useRef<HTMLDivElement | null>(null);

  
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

  // Calculate random positions for links (fixed across reloads)
  useEffect(() => {
    const calculatePositions = () => {
      if (!heroCoverRef.current) return;

      const container = heroCoverRef.current;
      const headingWrapper = container.querySelector('.hero-heading-wrapper');
      
      if (!headingWrapper) {
        // Retry after a short delay if heading wrapper isn't ready
        setTimeout(calculatePositions, 100);
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const headingRect = (headingWrapper as HTMLElement).getBoundingClientRect();
      
      // Calculate available space above the heading
      const availableHeight = headingRect.top - containerRect.top;
      const availableWidth = containerRect.width;

      // Responsive values based on screen size
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      // Create a key for localStorage based on screen size category
      const screenSizeKey = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
      const storageKey = `hero-link-positions-v8-${screenSizeKey}`;
      
      // Try to load existing positions from localStorage
      const storedPositions = localStorage.getItem(storageKey);
      if (storedPositions) {
        try {
          const parsed = JSON.parse(storedPositions);
          // Verify the stored positions are valid
          if (Array.isArray(parsed) && parsed.length === coverSections.length) {
            setLinkPositions(parsed);
            return;
          }
        } catch (e) {
          // If parsing fails, continue to generate new positions
        }
      }
      
      // Minimum distance between links to prevent overlap (responsive)
      // On mobile, links are smaller but we need more spacing to account for their width
      const minDistance = isMobile ? 200 : isTablet ? 220 : 250;
      const padding = isMobile ? 60 : isTablet ? 80 : 120;
      const minX = padding;
      const maxX = availableWidth - padding;
      const minY = padding;
      const maxY = Math.max(availableHeight - padding, padding + (isMobile ? 60 : 100));

      // Helper function to check if two positions are too close
      const isTooClose = (pos1: { x: number; y: number }, pos2: { x: number; y: number }) => {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
      };

      // Calculate positions for each link with collision detection
      const positions: Array<{ x: number; y: number }> = [];
      
      for (let i = 0; i < coverSections.length; i++) {
        let attempts = 0;
        // Increase attempts on mobile to ensure we find non-overlapping positions
        const maxAttempts = isMobile ? 200 : 100;
        let position: { x: number; y: number } | null = null;
        let isValid = false;

        // Try to find a position that doesn't overlap with existing positions
        while (!isValid && attempts < maxAttempts) {
          position = {
            x: Math.random() * (maxX - minX) + minX,
            y: Math.random() * (maxY - minY) + minY
          };

          // Check if this position is too close to any existing position
          isValid = !positions.some(existingPos => isTooClose(position!, existingPos));
          attempts++;
        }

        // If we couldn't find a non-overlapping position, find the best available position
        if (!isValid && position) {
          // Try to find the best available position by checking all existing positions
          let bestPosition = position;
          let minDistanceToNearest = 0;
          
          // Try more random positions on mobile to ensure better spacing
          const fallbackAttempts = isMobile ? 50 : 20;
          for (let j = 0; j < fallbackAttempts; j++) {
            const testPos = {
              x: Math.random() * (maxX - minX) + minX,
              y: Math.random() * (maxY - minY) + minY
            };
            
            const distances = positions.map(p => {
              const dx = testPos.x - p.x;
              const dy = testPos.y - p.y;
              return Math.sqrt(dx * dx + dy * dy);
            });
            
            const minDist = Math.min(...distances);
            if (minDist > minDistanceToNearest) {
              minDistanceToNearest = minDist;
              bestPosition = testPos;
            }
          }
          
          position = bestPosition;
        }

        // Fallback: if somehow position is still null, use a default position
        if (!position) {
          position = {
            x: minX + (maxX - minX) / 2,
            y: minY + (maxY - minY) / 2
          };
        }

        positions.push(position);
      }

      // Store positions in localStorage for future reloads
      localStorage.setItem(storageKey, JSON.stringify(positions));
      setLinkPositions(positions);
    };

    // Calculate on mount and window resize
    const timeoutId = setTimeout(calculatePositions, 100);
    
    // Only recalculate on resize if screen size category changes
    let lastScreenSize = window.innerWidth < 768 ? 'mobile' : window.innerWidth >= 768 && window.innerWidth < 1024 ? 'tablet' : 'desktop';
    const handleResize = () => {
      const currentScreenSize = window.innerWidth < 768 ? 'mobile' : window.innerWidth >= 768 && window.innerWidth < 1024 ? 'tablet' : 'desktop';
      if (currentScreenSize !== lastScreenSize) {
        lastScreenSize = currentScreenSize;
        calculatePositions();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // (reverted) no auto-fit logic

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
      
        // Keep the dot visible for a moment, then fade it out
        finalDotTimeline.to(finalDot, {
          duration: 0.5
        });
        
        // Hide the final dot after it finishes its motion
        finalDotTimeline.to(finalDot, {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            if (finalDot && finalDot.parentNode) {
              finalDot.style.display = "none";
            }
          }
        });
        
        // Add "software engineer" handwriting animation after dot finishes
        finalDotTimeline.call(() => {
          const svgText = softwareEngineerRef.current;
          
          if (!svgText) {
            console.warn("softwareEngineerRef is null");
            return;
          }
          
          // Wait a bit for the SVG to render, then convert text to path for DrawSVG effect
          setTimeout(() => {
            const svg = svgText.ownerSVGElement;
            if (!svg) {
              console.warn("SVG element not found");
              return;
            }
            
            // Get the text element's bounding box first (while hidden)
            let bbox;
            try {
              // Temporarily make it visible to get bbox, then hide again
              gsap.set(svgText, { opacity: 0.01, strokeOpacity: 0.01 });
              bbox = svgText.getBBox();
              // If bbox is empty or invalid, use fallback
              if (!bbox || bbox.width === 0) {
                throw new Error("Empty bbox");
              }
            } catch (e) {
              console.warn("Could not get BBox, using fallback", e);
              // Fallback: estimate based on text content
              const textContent = svgText.textContent || "software engineer";
              const fontSize = parseFloat(window.getComputedStyle(svgText).fontSize) || 24;
              const estimatedWidth = textContent.length * fontSize * 0.6; // rough estimate
              bbox = { width: estimatedWidth, height: fontSize };
            }
            
            // Estimate path length based on text width
            // Multiply by 1.8 to account for curves and letter complexity
            const estimatedPathLength = bbox.width * 1.8;
            
            // Make SVG visible
            gsap.set(svg, {
              opacity: 1
            });
            
            // Set initial stroke-dasharray and stroke-dashoffset for DrawSVG effect
            gsap.set(svgText, {
              strokeDasharray: estimatedPathLength,
              strokeDashoffset: estimatedPathLength,
              fillOpacity: 0,
              strokeOpacity: 1,
              opacity: 1
            });
            
            // Animate the stroke-dashoffset to create handwriting drawing effect
            gsap.to(svgText, {
              strokeDashoffset: 0,
              duration: 3,
              ease: "power1.inOut", // Linear ease for more natural handwriting feel
              onComplete: () => {
                // After drawing completes, fade in the fill and fade out the stroke
                gsap.to(svgText, {
                  fillOpacity: 1,
                  strokeOpacity: 0,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
            });
          }, 300); // Small delay to ensure SVG is rendered and font is loaded
        }, [], "+=0.3");
        
        dotTimeline.add(finalDotTimeline);
        
        return dotTimeline;
      };

      // Add dot animation
      masterTimeline.add(() => {
        const dotTimeline = buildDotTimeline();
        if (dotTimeline) {
          const nameEntranceDuration = nameEntrance.duration();
          const dotStartTime = Math.max(0, nameEntranceDuration - 0.3);
          masterTimeline.add(dotTimeline, dotStartTime);
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
      className="flex h-screen w-full flex-col items-center justify-center text-center text-[#0C5446] relative overflow-hidden"
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

      <div ref={heroCoverRef} className="hero-cover">
        {/* Navigation Panels - randomly positioned */}
        {coverSections.map((section, index) => {
          const position = linkPositions[index] || { x: 0, y: 0 };
          return (
            <div
              key={section.id}
              role="listitem"
              className="hero-panel collapsed"
              style={{ 
                backgroundColor: section.badgeColor,
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: 'translate(-50%, -50%)'
              }}
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

        {/* Mariam at Bottom */}
        <div className="hero-heading-wrapper">
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
              <span ref={iamWrapperRef} className="hero-iam-wrapper">
                <span className="hero-iam">
                  {/* Software Engineer Text - positioned above "iam" */}
                  <div
                    className="software-engineer-wrapper"
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "2%",
                      width: "auto",
                      height: "auto",
                      marginBottom: "0.2rem"
                    }}
                  >
                    <svg
                      className="software-engineer-svg"
                      width="700"
                      height="120"
                      style={{
                        fontFamily: '"Floralis Couture", cursive',
                        fontSize: "clamp(3rem, 6vw, 5rem)",
                        overflow: "visible",
                        pointerEvents: "none",
                        opacity: 0
                      }}
                    >
                      <text
                        ref={softwareEngineerRef}
                        x="0"
                        y="85"
                        fill="#1e140b"
                        fillOpacity="0"
                        stroke="#1e140b"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0"
                        style={{
                          fontFamily: '"Floralis Couture", cursive',
                          fontSize: "clamp(3rem, 6vw, 5rem)",
                          letterSpacing: "0.05em",
                          fontWeight: "normal"
                        }}
                      >
                        software engineer
                      </text>
                    </svg>
                  </div>
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
            </span>
          </h1>
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
          height: 100%;
          justify-content: space-between; /* Links at top, Mariam at bottom */
          margin: 0;
          padding: 0;
          position: relative;
        }

        @media (max-width: 768px) {
          .hero-cover {
            padding: 0 0.5rem;
          }
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
          align-items: flex-end;
          width: 100%;
          margin-top: auto; /* push to bottom */
          padding: 1rem;
          position: relative;
        }

        .software-engineer-wrapper {
          position: absolute;
          top: -1.5rem;
          right: 0;
          z-index: 10;
        }

        @media (max-width: 768px) {
          .software-engineer-wrapper {
            top: -1rem;
          }
        }

        .software-engineer-svg {
          width: auto;
          height: auto;
        }

        @media (max-width: 768px) {
          .hero-heading-wrapper {
            justify-content: center;
            padding: 0.5rem;
            width: 100%;
            overflow: hidden;
          }

          .hero-heading {
            text-align: center;
            font-size: clamp(2.5rem, 12vw, 5rem) !important;
            line-height: 0.9;
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            max-width: 100vw;
          }

          .hero-name {
            white-space: nowrap;
            display: inline-flex;
            max-width: 100%;
          }

          .hero-mar,
          .hero-iam {
            white-space: nowrap;
          }
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

        @media (max-width: 768px) {
          .hero-panel {
            height: 3rem;
            border-radius: 1.5rem;
          }
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

        @media (max-width: 768px) {
          .hero-panel-inner {
            padding: 0 1rem;
            gap: 0.5rem;
          }
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
          font-size: clamp(0.875rem, 1.3vw, 1.3rem);
        }

        @media (max-width: 768px) {
          .hero-panel-text.horizontal {
            font-size: clamp(0.75rem, 2.5vw, 0.875rem);
          }
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
          .hero-panel-arrow {
            transform: scale(0.8);
          }

          .hero-panel-arrow svg {
            width: 20px;
            height: 20px;
          }

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
          min-height: 100vh;
          min-height: 100dvh;
        }

        @media (max-width: 768px) {
          #hero {
            padding: 0.5rem;
          }
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

        .hero-iam {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .software-engineer-wrapper {
          position: absolute;
          bottom: 100%;
          right: 0;
          z-index: 10;
          margin-bottom: 0.2rem;
        }

        @media (max-width: 768px) {
          .software-engineer-wrapper {
            margin-bottom: 0.15rem;
          }
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
      `}</style>
    </section>
  );
};

export default Hero;