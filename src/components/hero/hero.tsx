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
  const portfolioHeaderRef = useRef<HTMLDivElement | null>(null);

  
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
                ease: "power2.out",
                onComplete: function() {
                  // Color is handled by GSAP
                }
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
                    ease: "power2.out",
                    onComplete: function() {
                      // Color is handled by GSAP
                    }
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
                    ease: "power2.out",
                    onComplete: function() {
                      // Color is handled by GSAP
                    }
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

  // Animate portfolio header on mount
  useEffect(() => {
    if (!portfolioHeaderRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    let oElement: HTMLElement | null = null;
    let lineElement: HTMLElement | null = null;
    let animationComplete = false;
    let iOriginalPosition = 0;

    // Helper function to safely query elements with retry logic
    const getElements = (retries = 3, delay = 100): Promise<{
      fullTextElement: HTMLElement;
      portfolElement: HTMLElement;
      iElement: HTMLElement;
      oElement: HTMLElement;
      lineElement: HTMLElement;
    } | null> => {
      return new Promise((resolve) => {
        const attempt = (attemptNumber: number) => {
          const fullTextEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-full");
          const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol");
          const iEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-i");
          const oEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-o");
          const lineEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-line");

          if (fullTextEl && portfolEl && iEl && oEl && lineEl) {
            resolve({
              fullTextElement: fullTextEl as HTMLElement,
              portfolElement: portfolEl as HTMLElement,
              iElement: iEl as HTMLElement,
              oElement: oEl as HTMLElement,
              lineElement: lineEl as HTMLElement,
            });
          } else if (attemptNumber < retries) {
            setTimeout(() => attempt(attemptNumber + 1), delay);
          } else {
            console.warn("Portfolio header elements not found after retries");
            resolve(null);
          }
        };
        attempt(0);
      });
    };

    // Calculate responsive end position for O
    const calculateEndPosition = (): number => {
      const container = portfolioHeaderRef.current;
      if (!container) return 0;
      
      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      
      // Calculate end position within the container (frame width)
      // Leave some padding from the right edge (around 1-2rem)
      const padding = window.innerWidth < 768 ? 16 : 32;
      
      // Position O at the right edge of the container minus padding
      // This ensures O stays within the frame bounds
      return containerWidth - padding;
    };

    getElements().then((elements) => {
      if (!elements) return;

      const {
        fullTextElement,
        portfolElement,
        iElement,
        oElement: oEl,
        lineElement: lineEl,
      } = elements;

      oElement = oEl; // Store for resize handler
      lineElement = lineEl; // Store for resize handler

      // Create smooth motion graphics timeline
      tl = gsap.timeline({ delay: 0.8 });

      // Step 1: Hide full text and show split text with O in its original position
      let iWidth = 0; // Store I width for later use
      
      tl.to(fullTextElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          fullTextElement.style.display = "none";
          portfolElement.style.display = "inline";
          iElement.style.display = "inline";
          oEl.style.display = "inline";
          lineEl.style.display = "none";
          
          // Set initial positions for animation
          gsap.set([portfolElement, iElement, oEl], {
            display: "inline",
            opacity: 1,
          });
          gsap.set(lineEl, {
            display: "none",
            width: 0,
            transformOrigin: "left center",
          });
          gsap.set(oEl, { position: "static", x: 0 });
          
          // Measure I width after it's displayed (force reflow)
          void iElement.offsetWidth;
          const iRect = iElement.getBoundingClientRect();
          iWidth = iRect.width;
        },
      });

      // Step 2: Animate I rotating 90 degrees while simultaneously pushing O
      // The O should shift by the width of I to simulate the push effect
      let oStartX = 0; // Store O's starting position relative to container
      tl.call(() => {
        // Get O's starting position before any transforms
        const oRect = oEl.getBoundingClientRect();
        const containerRect = portfolioHeaderRef.current?.getBoundingClientRect();
        if (containerRect) {
          oStartX = oRect.left - containerRect.left;
        }
      });
      
      tl.to(iElement, {
        rotation: 90,
        duration: 0.8,
        ease: "power2.inOut",
        transformOrigin: "center center",
        onStart: () => {
          // Simultaneously move O by the width of I (creating push effect)
          if (iWidth > 0) {
            gsap.to(oEl, {
              x: iWidth,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        },
      }, "-=0.2");

      // Step 4: Replace I with line
      // Store the original position of I before rotation for line positioning
      tl.to(iElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onStart: () => {
          // Get the original position of I relative to container
          const iRect = iElement.getBoundingClientRect();
          const containerRect = portfolioHeaderRef.current?.getBoundingClientRect();
          if (containerRect) {
            iOriginalPosition = iRect.left - containerRect.left;
          }
        },
        onComplete: () => {
          iElement.style.display = "none";
          lineEl.style.display = "block";
          
          // Position line to start from where I originally was (relative to container)
          gsap.set(lineEl, {
            opacity: 1,
            x: iOriginalPosition,
            width: 0,
            transformOrigin: "left center",
          });
        },
      }, "-=0.3");

      // Step 5: Expand line while moving O to the end position
      tl.call(() => {
        // Wait a frame to ensure all previous animations have applied their transforms
        requestAnimationFrame(() => {
          const containerRect = portfolioHeaderRef.current?.getBoundingClientRect();
          if (!containerRect) return;
          
          // Get O's current width and position after being pushed by I
          const oRect = oEl.getBoundingClientRect();
          const oWidth = oRect.width;
          
          // Get O's current absolute position after I push (relative to container)
          const oCurrentAbsoluteX = oRect.left - containerRect.left;
          
          // Calculate absolute end position within container (with padding from right edge)
          // This is where O's CENTER should be positioned
          const padding = window.innerWidth < 768 ? 16 : 32;
          const absoluteEndPosition = containerRect.width - padding;
          
          // Calculate where O's LEFT EDGE should be (center at endPosition, so left edge is center - half width)
          const oFinalLeftEdge = absoluteEndPosition - (oWidth / 2);
          
          // Calculate gap between L and I to match the gap before O
          const portfolRect = portfolElement.getBoundingClientRect();
          const lEndPosition = portfolRect.right - containerRect.left;
          
          // Gap is the space between L's end and I's start
          const gapBeforeI = iOriginalPosition - lEndPosition;
          
          // Ensure gap is positive
          const gap = Math.max(0, gapBeforeI);
          
          // Line should end BEFORE O's left edge with the same gap as between L and I
          // Line ends at: O's left edge position minus the gap
          const lineEndPosition = oFinalLeftEdge - gap - 10;
          
          // Calculate O's final x transform value
          // GSAP x is always relative to element's initial position (oStartX)
          // To position O's left edge at oFinalLeftEdge, we need: x = oFinalLeftEdge - oStartX
          const oFinalX = oFinalLeftEdge - oStartX + 40;
          
          // Calculate final line width: from I's original position to line end position (before O)
          // This ensures the line stops before O with the gap
          const lineFinalWidth = lineEndPosition - iOriginalPosition;
          const maxWidth = containerRect.width - iOriginalPosition;
          
          // Ensure line width is positive and doesn't exceed container
          const finalLineWidth = Math.max(0, Math.min(lineFinalWidth, maxWidth));
          
          // Animate O movement and line expansion simultaneously
          gsap.to(oEl, {
            x: oFinalX,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              animationComplete = true;
            },
          });
          
          gsap.to(lineEl, {
            width: finalLineWidth,
            duration: 1.2,
            ease: "power2.out",
          });
        });
      });

      // Handle window resize to recalculate positions
      const handleResize = () => {
        if (animationComplete && oElement && lineElement) {
          const newEndPosition = calculateEndPosition();
          gsap.set(oElement, { x: newEndPosition });
          
          // Also update line width - use stored iOriginalPosition or get from line's x
          const lineStartX = iOriginalPosition || (gsap.getProperty(lineElement, "x") as number);
          const lineFinalWidth = newEndPosition - lineStartX;
          gsap.set(lineElement, { width: Math.max(0, lineFinalWidth) });
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center text-center text-[#1e140b] relative overflow-hidden"
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

      {/* Yellow Frame with Repeating Text - Marquee Style */}
      <div className="hero-yellow-frame">
        {/* Top marquee - Portfolio Header only */}
        <div className="hero-frame-marquee hero-frame-marquee-top">
          {/* Portfolio Header */}
          <div className="hero-cover-header">
            <div className="hero-cover-header-line" ref={portfolioHeaderRef}>
              <span className="hero-cover-title-full" aria-label="Portfolio">PORTFOLIO</span>
              <span className="hero-cover-title-portfol" style={{ display: "none" }} aria-hidden="true">PORTFOL</span>
              <span className="hero-cover-title-i" style={{ display: "none", opacity: 1 }} aria-hidden="true">I</span>
              <span className="hero-cover-title-o" style={{ display: "none", opacity: 1 }} aria-label="Navigation menu toggle">O</span>
              <div className="hero-cover-title-line" style={{ display: "none", height: "1px", backgroundColor: "#1e140b", opacity: 0.4, position: "absolute", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true"></div>
            </div>
          </div>
        </div>
        {/* Right marquee */}
        <div className="hero-frame-marquee hero-frame-marquee-right">
          <div className="hero-frame-marquee-content hero-frame-marquee-content-vertical">
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
          </div>
        </div>
        {/* Bottom marquee */}
        <div className="hero-frame-marquee hero-frame-marquee-bottom">
          <div className="hero-frame-marquee-content">
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
          </div>
        </div>
        {/* Left marquee */}
        <div className="hero-frame-marquee hero-frame-marquee-left">
          <div className="hero-frame-marquee-content hero-frame-marquee-content-vertical">
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
            <span className="hero-frame-marquee-text">New Episodes Every Thursday New Ep</span>
          </div>
        </div>
      </div>

      {/* Marquee below Mariam - outside hero-cover to overlay full width */}
      <div className="hero-marquee">
        <div className="hero-marquee-content">
          <span className="hero-marquee-text">Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll</span>
          <span className="hero-marquee-text">Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll</span>
          <span className="hero-marquee-text">Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll • Scroll</span>
        </div>
      </div>

      <style jsx>{`
        .hero-heading {
          font-family: "Space Grotesk", "Inter", sans-serif;
          letter-spacing: normal;
          text-align: center;
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
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 100px;
          position: absolute;
          inset: 0;
          z-index: 200;
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
            align-items: center;
            padding: 100px;
            width: 100%;
            height: 100%;
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

        @media (max-width: 768px) {
          .hero-panel::before {
            border-radius: 1.5rem;
          }
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

        @media (max-width: 768px) {
          .hero-panel::after {
            border-radius: 1.5rem;
          }
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
          font-size: clamp(0.875rem, 2vw, 2rem);
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
            align-items: center;
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
          color: #1e140b;
          font-family: "Space Grotesk", "Inter", sans-serif;
        }
        
        /* When GSAP sets color, update the color */
        .hero-letter[style*="color"] {
          color: currentColor;
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

        .hero-marquee {
          width: 100vw;
          height: 100px;
          background-color: #FFD7DF;
          overflow: hidden;
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          padding-right: 2rem;
        }

        .hero-marquee-content {
          display: flex;
          width: fit-content;
          animation: marquee-scroll 30s linear infinite;
          white-space: nowrap;
          align-items: center;
          will-change: transform;
          gap: 4rem;
        }

        .hero-marquee-text {
          display: inline-block;
          padding: 0 2rem;
          padding-right: 6rem;
          color: #1A5632;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          font-family: "Space Grotesk", "Inter", sans-serif;
          letter-spacing: 0.1em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          vertical-align: baseline;
          flex-shrink: 0;
        }

        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .hero-yellow-frame {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 200;
          overflow: hidden;
          border-radius: 0;
          margin: 0;
          padding: 0;
        }

        .hero-frame-marquee {
          position: absolute;
          background-color: #FFE500;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .hero-frame-marquee-top {
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          border-radius: 0;
          padding-right: 2rem;
          position: relative;
        }
        
        .hero-frame-marquee-top .hero-frame-marquee-content {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-frame-marquee-bottom {
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          border-radius: 0;
          padding-right: 2rem;
        }

        .hero-frame-marquee-right {
          right: 0;
          top: 100px;
          bottom: 100px;
          width: 100px;
          border-radius: 0;
          justify-content: center;
          padding-bottom: 2rem;
        }

        .hero-frame-marquee-left {
          left: 0;
          top: 100px;
          bottom: 100px;
          width: 100px;
          border-radius: 0;
          justify-content: center;
          padding-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .hero-frame-marquee-top,
          .hero-frame-marquee-bottom {
            height: 100px;
            border-radius: 0;
          }
          .hero-frame-marquee-right {
            top: 100px;
            bottom: 100px;
            width: 100px;
          }
          .hero-frame-marquee-left {
            top: 100px;
            bottom: 100px;
            width: 100px;
          }
        }

        .hero-frame-marquee-content {
          display: flex;
          width: fit-content;
          animation: frame-marquee-scroll-horizontal 30s linear infinite;
          white-space: nowrap;
          align-items: center;
          will-change: transform;
          gap: 4rem;
        }

        .hero-frame-marquee-content-vertical {
          flex-direction: column;
          height: fit-content;
          animation: frame-marquee-scroll-vertical 30s linear infinite;
        }

        .hero-frame-marquee-text {
          display: inline-block;
          padding: 0 2rem;
          padding-right: 6rem;
          color: #1A5632;
          font-size: clamp(1.5rem, 3vw, 2.5rem);
          font-weight: 700;
          font-family: "Space Grotesk", "Inter", sans-serif;
          letter-spacing: 0.1em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          vertical-align: baseline;
          flex-shrink: 0;
          writing-mode: horizontal-tb;
        }

        .hero-frame-marquee-content-vertical .hero-frame-marquee-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          padding: 2rem 0;
          padding-bottom: 6rem;
        }

        @keyframes frame-marquee-scroll-horizontal {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes frame-marquee-scroll-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }

        /* Portfolio Header in Top Frame */
        .hero-frame-marquee-top .hero-cover-header {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 0.5rem;
          font-family: "Space Grotesk", "Inter", sans-serif;
          width: 100%;
          padding: 0 1rem;
          margin: 0;
          z-index: 10;
          pointer-events: auto;
        }

        .hero-cover-header-line {
          display: flex;
          align-items: center;
          width: 100%;
          height: 100%;
          gap: 0;
          position: relative;
        }

        .hero-cover-title-full,
        .hero-cover-title-portfol,
        .hero-cover-title-i,
        .hero-cover-title-o {
          font-size: clamp(3.5rem, 10vw, 6rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #1e140b;
          font-family: "Space Grotesk", "Inter", sans-serif;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          height: 100px;
        }

        .hero-cover-title-i {
          display: inline;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .hero-cover-title-o {
          will-change: transform;
        }

        .hero-cover-title-line {
          will-change: width, transform;
          transform-origin: left center;
          position: absolute;
          height: 1px;
          background-color: #1e140b;
          opacity: 0.4;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>
    </section>
  );
};

export default Hero;