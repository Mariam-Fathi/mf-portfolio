"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface HeroProps {
  onNavigate: (section: string) => void;
  onReady?: () => void;
  isActive?: boolean;
}

const Hero: React.FC<HeroProps> = ({ onNavigate, onReady, isActive = true }) => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const iRef = useRef<HTMLSpanElement | null>(null);
  const rRef = useRef<HTMLSpanElement | null>(null);
  const a1Ref = useRef<HTMLSpanElement | null>(null);
  const a2mRef = useRef<HTMLSpanElement | null>(null);
  const mMariamRef = useRef<HTMLSpanElement | null>(null);
  const amContainerRef = useRef<HTMLSpanElement | null>(null);
  const iamWrapperRef = useRef<HTMLSpanElement | null>(null);
  const iamRef = useRef<HTMLSpanElement | null>(null);
  const mLetterRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isPortfolioAnimationComplete, setIsPortfolioAnimationComplete] = useState(false);
  const [isDotAnimationComplete, setIsDotAnimationComplete] = useState(false);
  const [isDotAnimationStarted, setIsDotAnimationStarted] = useState(false);
  const [portfolWidth, setPortfolWidth] = useState<number>(0);
  const [isMariamReady, setIsMariamReady] = useState(false);
  const finalDotRef = useRef<HTMLDivElement | null>(null);
  const heroCoverRef = useRef<HTMLDivElement | null>(null);
  const portfolioHeaderRef = useRef<HTMLDivElement | null>(null);
  const numberSevenRef = useRef<SVGSVGElement | null>(null);
  // Refs for SVG Mariam letters
  const svgMRef = useRef<SVGTSpanElement | null>(null);
  const svgA1Ref = useRef<SVGTSpanElement | null>(null);
  const svgRRef = useRef<SVGTSpanElement | null>(null);
  const svgIRef = useRef<SVGTSpanElement | null>(null);
  const svgA2Ref = useRef<SVGTSpanElement | null>(null);
  const svgM2Ref = useRef<SVGTSpanElement | null>(null);
  const svgMariamTextRef = useRef<SVGTextElement | null>(null);
  const svgFinalDotRef = useRef<HTMLDivElement | null>(null);
  const engineerTextRef = useRef<HTMLDivElement | null>(null);

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
    // Hide SVG final dot if it exists
    if (svgFinalDotRef.current && svgFinalDotRef.current.style.display !== "none") {
      gsap.to(svgFinalDotRef.current, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
          if (svgFinalDotRef.current) {
            svgFinalDotRef.current.style.display = "none";
            }
        }
      });
    }
    // Also hide any original dots that might still be visible
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      const dots = heroSection.querySelectorAll('.original-i-dot, .final-i-dot, .original-i-dot-svg, .final-i-dot-svg, .original-i-dot-se, .final-i-dot-se');
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

  useEffect(() => {
    // Set animation complete immediately since we removed HTML Mariam
    setIsAnimationComplete(true);
  }, []);

  // Hide dot when hero becomes inactive
  useEffect(() => {
    if (!isActive) {
      // Immediately hide all dots without animation
      // Kill any GSAP animations on the dots first
      // Hide the final dot if it exists
      if (finalDotRef.current) {
        gsap.killTweensOf(finalDotRef.current);
        finalDotRef.current.style.setProperty('display', 'none', 'important');
        finalDotRef.current.style.setProperty('opacity', '0', 'important');
        finalDotRef.current.style.setProperty('visibility', 'hidden', 'important');
        finalDotRef.current.style.setProperty('z-index', '-1', 'important');
      }
      // Hide SVG final dot if it exists
      if (svgFinalDotRef.current) {
        gsap.killTweensOf(svgFinalDotRef.current);
        svgFinalDotRef.current.style.setProperty('display', 'none', 'important');
        svgFinalDotRef.current.style.setProperty('opacity', '0', 'important');
        svgFinalDotRef.current.style.setProperty('visibility', 'hidden', 'important');
        svgFinalDotRef.current.style.setProperty('z-index', '-1', 'important');
      }
      // Also hide any dots that might still be visible in the DOM
      const dots = document.querySelectorAll('.original-i-dot, .final-i-dot, .original-i-dot-svg, .final-i-dot-svg, .original-i-dot-se, .final-i-dot-se');
      dots.forEach((dot) => {
        const htmlDot = dot as HTMLElement;
        if (htmlDot) {
          gsap.killTweensOf(htmlDot);
          htmlDot.style.setProperty('display', 'none', 'important');
          htmlDot.style.setProperty('opacity', '0', 'important');
          htmlDot.style.setProperty('visibility', 'hidden', 'important');
          htmlDot.style.setProperty('z-index', '-1', 'important');
        }
      });
    }
  }, [isActive]);

  // Function to animate dot along SVG Mariam letters
  const buildDotTimeline = () => {
    if (!svgMariamTextRef.current || !numberSevenRef.current) return undefined;
    
    const svg = numberSevenRef.current;
    const svgMariamText = svgMariamTextRef.current;
    const svgIRefEl = svgIRef.current;
    const svgA2RefEl = svgA2Ref.current;
    const svgM2RefEl = svgM2Ref.current;
    
    if (!svgIRefEl || !svgA2RefEl || !svgM2RefEl) return undefined;
    
    // Get the text element's position and font properties
    const textRect = svgMariamText.getBBox();
    const textX = parseFloat(svgMariamText.getAttribute("x") || "0");
    const textY = parseFloat(svgMariamText.getAttribute("y") || "0");
    const fontSize = parseFloat(svgMariamText.getAttribute("font-size") || window.getComputedStyle(svgMariamText).fontSize) || 200;
    const fontFamily = svgMariamText.getAttribute("font-family") || '"Space Grotesk", "Inter", sans-serif';
    const dominantBaseline = svgMariamText.getAttribute("dominant-baseline") || "baseline";
    
    // Get actual letter positions by measuring with temporary text elements
    // that match the exact positioning of the tspan elements
    const measureLetter = (letter: string, index: number) => {
      const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
      tempText.setAttribute("font-size", `${fontSize}px`);
      tempText.setAttribute("font-family", fontFamily);
      tempText.setAttribute("font-weight", "700");
      tempText.setAttribute("letter-spacing", "0");
      tempText.setAttribute("x", textX.toString());
      tempText.setAttribute("y", textY.toString());
      tempText.setAttribute("dominant-baseline", dominantBaseline);
      tempText.setAttribute("text-anchor", "start");
      tempText.textContent = letter;
      tempText.style.visibility = "hidden";
      svg.appendChild(tempText);
      
      const bbox = tempText.getBBox();
      // Calculate cumulative x position by measuring all previous letters
      let cumulativeX = 0;
      for (let i = 0; i < index; i++) {
        const prevLetter = ["M", "a", "r", "i", "a", "m"][i];
        const prevTemp = document.createElementNS("http://www.w3.org/2000/svg", "text");
        prevTemp.setAttribute("font-size", `${fontSize}px`);
        prevTemp.setAttribute("font-family", fontFamily);
        prevTemp.setAttribute("font-weight", "700");
        prevTemp.setAttribute("letter-spacing", "0");
        prevTemp.setAttribute("x", textX.toString());
        prevTemp.setAttribute("y", textY.toString());
        prevTemp.setAttribute("dominant-baseline", dominantBaseline);
        prevTemp.setAttribute("text-anchor", "start");
        prevTemp.textContent = prevLetter;
        prevTemp.style.visibility = "hidden";
        svg.appendChild(prevTemp);
        const prevBbox = prevTemp.getBBox();
        cumulativeX += prevBbox.width;
        svg.removeChild(prevTemp);
      }
      
      svg.removeChild(tempText);
      
      return {
        x: textX + cumulativeX,
        y: textY + bbox.y,
        width: bbox.width,
        height: bbox.height,
        centerX: textX + cumulativeX + bbox.width / 2,
        centerY: textY + bbox.y + bbox.height / 2
      };
    };
    
    // Measure positions for i, a, m (letters 3, 4, 5 in "Mariam")
    const iPos = measureLetter("i", 3);
    const a2Pos = measureLetter("a", 4);
    const m2Pos = measureLetter("m", 5);
    
    if (!iPos || !a2Pos || !m2Pos) return undefined;
    
    // Use the actual tspan elements' getBoundingClientRect() for accurate screen positions
    // This is much simpler and more accurate than manual coordinate conversion
    const iRect = svgIRefEl.getBoundingClientRect();
    const a2Rect = svgA2RefEl.getBoundingClientRect();
    const m2Rect = svgM2RefEl.getBoundingClientRect();
    
    // Calculate screen positions directly from the tspan elements
    // For "i", the dot should be at 25% from top of the letter (where it starts)
    const iScreenX = iRect.left + iRect.width / 2;
    const iScreenY = iRect.top + iRect.height * 0.25; // Dot position on "i"
    const iCenterY = iRect.top + iRect.height / 2; // Center of "i" for jump calculations
    const a2ScreenX = a2Rect.left + a2Rect.width / 2;
    const a2ScreenY = a2Rect.top + a2Rect.height / 2;
    const m2ScreenX = m2Rect.left + m2Rect.width / 2;
    const m2ScreenY = m2Rect.top + m2Rect.height / 2;
    
    const dotSize = Math.max(iRect.width * 0.35, 48);
    
    // Debug: Log positions to verify they're reasonable
    console.log('Position calculations (using tspan getBoundingClientRect):', {
      iRect: { left: iRect.left, top: iRect.top, width: iRect.width, height: iRect.height },
      iScreen: { x: iScreenX, y: iScreenY },
      a2Screen: { x: a2ScreenX, y: a2ScreenY },
      m2Screen: { x: m2ScreenX, y: m2ScreenY },
      windowHeight: window.innerHeight,
      dotSize
    });
    
    // Create timeline - original dot removed, only using final dot
    const dotTimeline = gsap.timeline({ immediateRender: true, paused: true });
    
    // Create final dot that lands on "i"
    const finalDot = document.createElement("div");
    finalDot.className = "final-i-dot-svg";
    svgFinalDotRef.current = finalDot;
    
    // Append to body to ensure it's above all other elements
    document.body.appendChild(finalDot);
    
    const finalDotSize = dotSize;
    
    // Set initial final dot position and make it visible
    finalDot.style.width = `${finalDotSize}px`;
    finalDot.style.height = `${finalDotSize}px`;
    finalDot.style.borderRadius = "50%";
    finalDot.style.backgroundColor = "#C92924";
    finalDot.style.position = "fixed";
    finalDot.style.zIndex = "999999";
    finalDot.style.setProperty('z-index', '999999', 'important');
    finalDot.style.opacity = "1";
    finalDot.style.left = "0px";
    finalDot.style.top = "0px";
    finalDot.style.display = "block";
    finalDot.style.visibility = "visible";
    finalDot.style.pointerEvents = "none";
    finalDot.style.transformOrigin = "center center";
    finalDot.style.willChange = "transform, opacity";
    finalDot.style.border = "none";
    finalDot.style.boxShadow = "none";
    
    // Force a reflow to ensure element is in DOM
    void finalDot.offsetHeight;
    
    gsap.set(finalDot, {
      x: iScreenX - (finalDotSize / 2),
      y: -50,
      rotation: 0,
      scale: 1,
      opacity: 1,
      immediateRender: true,
      force3D: true
    });
    
    // Force another reflow after GSAP set
    void finalDot.offsetHeight;
    
    // Double-check the element is visible
    if (finalDot.style.opacity !== "1" || finalDot.style.visibility !== "visible") {
      finalDot.style.opacity = "1";
      finalDot.style.visibility = "visible";
    }
    
    const finalDotTimeline = gsap.timeline({ immediateRender: true });
    
    // Fall from top to "ı" position (already dotless from start)
    const finalInitialX = iScreenX - (finalDotSize / 2);
    const finalInitialY = iScreenY - (finalDotSize / 2);
    
    finalDotTimeline.to(finalDot, {
      keyframes: [
        { 
          y: iScreenY + 60, 
          backgroundColor: "#C92924", 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.in",
          onComplete: () => {
            // Color "i" when dot first hits
            if (svgIRefEl) {
              gsap.to(svgIRefEl, {
                fill: "#C92924",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        },
        { 
          y: iScreenY + 30, 
          scaleY: 0.7, 
          backgroundColor: "#C92924", 
          opacity: 1, 
          duration: 0.15, 
          ease: "power2.out"
        },
        { 
          y: iScreenY, 
          scaleY: 1, 
          backgroundColor: "#C92924",
          opacity: 1,
          duration: 0.2, 
          ease: "power2.out"
        }
      ],
      immediateRender: true
    });
    
    // STUCK JUMP from "i" to "a"
    finalDotTimeline.to(finalDot, {
      keyframes: [
        { 
          // Build up energy for the real jump - compression
          y: iScreenY, // Keep at current position during compression
          scaleX: 1.2,
          scaleY: 0.7,
          duration: 0.2,
          ease: "power2.out",
          force3D: true
        },
        { 
          // EXPLOSIVE BREAK FREE JUMP!
          y: iScreenY - 80, // Jump up from current position (iScreenY)
          scaleY: 0.9,
          scaleX: 1.1,
          duration: 0.7,
          ease: "power4.out",
          force3D: true
        },
        { 
          // Arc smoothly to "a" position
          x: a2ScreenX - (finalDotSize / 2),
          y: a2ScreenY - 50,
          scaleY: 0.75,
          scaleX: 1,
          backgroundColor: "#C92924",
          duration: 0.4,
          ease: "sine.inOut",
          force3D: true
        }
      ]
    });
    
    // Continue with the "a" landing animation
    finalDotTimeline.to(finalDot, { 
      y: a2ScreenY - 70, 
      duration: 0.2, 
      ease: "sine.inOut",
      force3D: true
    });
    
    finalDotTimeline.to(finalDot, {
      y: a2ScreenY + 10,
      scaleY: 1.2,
      backgroundColor: "#C92924",
      opacity: 1,
      duration: 0.25,
      ease: "power2.in",
      force3D: true
    });
    
    finalDotTimeline.to(finalDot, {
      y: a2ScreenY,
      scaleY: 0.8,
      backgroundColor: "#C92924",
      opacity: 1,
      duration: 0.15,
      ease: "bounce.out",
      force3D: true,
      onComplete: () => {
        if (svgA2RefEl) {
          gsap.to(svgA2RefEl, {
            fill: "#C92924",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      }
    });
    
    finalDotTimeline.to(finalDot, { 
      scaleY: 1,
      duration: 0.1,
      force3D: true
    });
    
    // Continue with the rest of the animation to "m"
    finalDotTimeline.to(finalDot, {
      keyframes: [
        { x: m2ScreenX - (finalDotSize / 2), y: m2ScreenY - 100, scaleY: 0.75, backgroundColor: "#C92924", duration: 0.3, ease: "power2.out", force3D: true },
        { y: m2ScreenY - 120, duration: 0.2, ease: "sine.inOut", force3D: true },
        { y: m2ScreenY + 20, scaleY: 1.2, backgroundColor: "#C92924", duration: 0.25, ease: "power2.in", force3D: true },
        {
          y: m2ScreenY,
          scaleY: 0.8,
          backgroundColor: "#C92924",
          opacity: 1,
          duration: 0.15,
          ease: "bounce.out",
          force3D: true,
          onComplete: () => {
            if (svgM2RefEl) {
              gsap.to(svgM2RefEl, {
                fill: "#C92924",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        },
        { scaleY: 1, duration: 0.1, force3D: true }
      ]
    }, "+=0.3");
    
    // Fall to bottom after landing on "m" - keep x position, just fall down
    finalDotTimeline.to(finalDot, {
      y: window.innerHeight + 100, 
      scaleY: 1.1, 
      opacity: 1,
      duration: 0.5, 
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        // Ensure dot stays visible when off screen
        if (finalDot) {
          finalDot.style.setProperty('opacity', '1', 'important');
          finalDot.style.setProperty('visibility', 'visible', 'important');
          finalDot.style.setProperty('display', 'block', 'important');
        }
      }
    }, "+=0.3");
    
    // Move to top and position at "i" x coordinate (return to start position)
    finalDotTimeline.to(finalDot, {
      x: iScreenX - (finalDotSize / 2),
      y: -50,
      opacity: 1,
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      duration: 0.1,
      ease: "none",
      force3D: true,
      onComplete: () => {
        // Ensure dot is visible at top
        if (finalDot) {
          finalDot.style.setProperty('opacity', '1', 'important');
          finalDot.style.setProperty('visibility', 'visible', 'important');
          finalDot.style.setProperty('display', 'block', 'important');
        }
      }
    });
    
    // Fall from top on "i" (same as initial fall animation)
    finalDotTimeline.to(finalDot, {
      keyframes: [
        { 
          y: iScreenY + 60, 
          backgroundColor: "#C92924", 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.in",
          force3D: true
        },
        { 
          y: iScreenY + 30, 
          scaleY: 0.7, 
          backgroundColor: "#C92924", 
          opacity: 1, 
          duration: 0.15, 
          ease: "power2.out",
          force3D: true
        },
        { 
          y: iScreenY, 
          scaleY: 1, 
          backgroundColor: "#C92924",
          opacity: 1,
          duration: 0.2, 
          ease: "power2.out",
          force3D: true,
          onComplete: () => {
            // Change "i" color at the last fall
            if (svgIRefEl) {
              gsap.to(svgIRefEl, {
                fill: "#C92924",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        }
      ]
    });
    
    // Keep dot fixed at final position instead of vanishing
    finalDotTimeline.to(finalDot, {
      opacity: 1,
      scale: 1,
      duration: 0,
      ease: "none",
      force3D: true,
      onComplete: () => {
        // Ensure dot stays visible and fixed at final position on "i"
        if (finalDot) {
          finalDot.style.opacity = "1";
          finalDot.style.visibility = "visible";
          finalDot.style.display = "block";
          // Keep it fixed at the final position on "i"
          gsap.set(finalDot, {
            x: iScreenX - (finalDotSize / 2),
            y: iScreenY,
            scale: 1,
            opacity: 1,
            immediateRender: true
          });
        }
        // Mark dot animation as complete
        setIsDotAnimationComplete(true);
      }
    }, "+=0.5");
    
    // Add final dot timeline at the start (replacing original dot)
    dotTimeline.add(finalDotTimeline, 0);
    
    return dotTimeline;
  };

  // Call onReady when all calculations are complete (not waiting for animations)
  useEffect(() => {
    // Only need Mariam calculations to be ready
    // Portfolio animation can happen after onReady is called
    if (isMariamReady && onReady) {
      // Small delay to ensure all DOM updates are complete
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          onReady();
        });
      });
    }
  }, [isMariamReady, onReady]);


  // Removed HTML Mariam animations - now using only SVG Mariam

  // Removed font size calculation for HTML "iam" - now using SVG only

  // Calculate portfolWidth immediately on mount (needed for Mariam calculations)
  useEffect(() => {
    if (!portfolioHeaderRef.current) return;
    
    const calculatePortfolWidth = () => {
      const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol") as HTMLElement;
      if (portfolEl) {
        // Force display to measure width
        const originalDisplay = portfolEl.style.display;
        portfolEl.style.display = "inline";
        const portfolRect = portfolEl.getBoundingClientRect();
        const portfolWidthValue = portfolRect.width;
        portfolEl.style.display = originalDisplay;
        
        if (portfolWidthValue > 0) {
          setPortfolWidth(portfolWidthValue);
        }
      }
    };
    
    // Try to calculate immediately
    calculatePortfolWidth();
    
    // Also try after a short delay in case elements aren't ready
    const timeout = setTimeout(calculatePortfolWidth, 100);
    
    return () => clearTimeout(timeout);
  }, []);

  // Animate portfolio header when dot animation starts
  useEffect(() => {
    if (!portfolioHeaderRef.current) return;
    
    if (!isActive) {
      // Reset state and visual elements when hero becomes inactive
      setIsPortfolioAnimationComplete(false);
      setIsDotAnimationComplete(false);
      setIsDotAnimationStarted(false);
      
      // Reset Engineer text to hidden state
      if (engineerTextRef.current) {
        gsap.set(engineerTextRef.current, {
          opacity: 0,
          filter: "blur(10px)",
        });
      }

      // Reset TURNING, REAL LIFE PRODUCTS, IDEAS, and INTO text to hidden state
      if (numberSevenRef.current) {
        const svg = numberSevenRef.current;
        const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
        const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
        const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
        const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;

        if (turningIdeas) {
          turningIdeas.setAttribute("opacity", "0");
          turningIdeas.style.filter = "blur(10px)";
        }

        if (realLifeProducts) {
          realLifeProducts.setAttribute("opacity", "0");
          realLifeProducts.style.filter = "blur(10px)";
        }

        if (ideasText) {
          ideasText.setAttribute("opacity", "0");
          ideasText.style.filter = "blur(10px)";
        }

        if (intoText) {
          intoText.setAttribute("opacity", "0");
          intoText.style.filter = "blur(10px)";
        }
      }
      
      // Reset portfolio elements to initial state
      const fullTextEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-full") as HTMLElement;
      const portfolEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-portfol") as HTMLElement;
      const iEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-i") as HTMLElement;
      const oEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-o") as HTMLElement;
      const lineEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-line") as HTMLElement;
      
      if (fullTextEl && portfolEl && iEl && oEl && lineEl) {
        // Reset to initial state
        gsap.set(fullTextEl, { opacity: 1, display: "block" });
        gsap.set([portfolEl, iEl, oEl], { opacity: 0, display: "none", x: 0, rotation: 0 });
        gsap.set(lineEl, { opacity: 0, display: "none", width: 0, x: 0 });
      }
      // Reset dot animation started state when hero becomes inactive
      setIsDotAnimationStarted(false);
      return;
    }
    
    // Wait for dot animation to start before starting portfolio animation
    if (!isDotAnimationStarted) return;
    
    // Reset portfolio animation state when hero becomes active
    setIsPortfolioAnimationComplete(false);

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
      tl = gsap.timeline({ delay: 0 });

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
        delay: 1.1, // Slight delay before I starts its motion
        onStart: () => {
          // Simultaneously move O by the width of I (creating push effect)
          if (iWidth > 0) {
            gsap.to(oEl, {
              x: iWidth,
              duration: 0.8,
              ease: "power2.inOut",
              delay: 0.3, // Same delay for O movement to stay synchronized
            });
          }
        },
      });

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
          const portfolWidthValue = portfolRect.width;
          console.log("PORTFOL width:", portfolWidthValue, "px");
          setPortfolWidth(portfolWidthValue);
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
            duration: 2.5,
            ease: "power2.out",
            onComplete: () => {
              animationComplete = true;
              setIsPortfolioAnimationComplete(true);
            },
          });
          
          gsap.to(lineEl, {
            width: finalLineWidth,
            duration: 2.5,
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
  }, [isActive, isDotAnimationStarted]);

  // Position navigation at the end of the line between PORTFOL and O
  useEffect(() => {
    const positionNavigation = () => {
      if (!navRef.current || !portfolioHeaderRef.current || !isPortfolioAnimationComplete) return;

      // Find the PORTFOL element, O element, and the line
      const portfolElement = portfolioHeaderRef.current.querySelector('.hero-cover-title-portfol') as HTMLElement;
      const oElement = portfolioHeaderRef.current.querySelector('.hero-cover-title-o') as HTMLElement;
      const lineElement = portfolioHeaderRef.current.querySelector('.hero-cover-title-line') as HTMLElement;
      
      if (!portfolElement || !oElement || !lineElement) {
        // Retry after a short delay if elements aren't ready
        setTimeout(positionNavigation, 100);
        return;
      }

      // Get positions relative to the header-line container
      const container = portfolioHeaderRef.current;
      const containerRect = container.getBoundingClientRect();
      
      // Get line's position and width to find where it ends
      const lineRect = lineElement.getBoundingClientRect();
      const lineX = lineRect.left - containerRect.left;
      const lineWidth = lineRect.width;
      const lineEndX = lineX + lineWidth; // End of the line
      
      // Line is at 50% of container height, position navigation vertically centered on the line
      const lineY = containerRect.height * 0.5 - 24; // 50% of container
      
      // Position navigation at the end of the line, aligned to the right
      if (navRef.current) {
        navRef.current.style.top = `${lineY}px`;
        navRef.current.style.left = `${lineEndX}px`;
        navRef.current.style.transform = 'translate(-100%, -50%)'; // Align to the right end of the line
        // Fade in after positioning
        navRef.current.style.opacity = '1';
      }
    };

    if (isPortfolioAnimationComplete) {
      // Initially hide and position the nav to prevent flash
      if (navRef.current) {
        navRef.current.style.opacity = '0';
        // Set initial position off-screen or at a safe position
        navRef.current.style.top = '50%';
        navRef.current.style.left = '100%';
        navRef.current.style.transform = 'translate(-100%, -50%)';
      }
      
      // Position immediately on next frame to avoid layout shift
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          positionNavigation();
        });
      });
      
      window.addEventListener('resize', positionNavigation);

      return () => {
        window.removeEventListener('resize', positionNavigation);
      };
    }
  }, [isPortfolioAnimationComplete]);

  // Trigger dot animation when Mariam is ready (not waiting for portfolio)
  useEffect(() => {
    if (!isActive || !isMariamReady) return;
    
    // Wait a bit to ensure all refs are ready and DOM is fully rendered
    const timeoutId = setTimeout(() => {
      // Double-check that all required refs are available
      if (svgMariamTextRef.current && numberSevenRef.current && 
          svgIRef.current && svgA2Ref.current && svgM2Ref.current) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const dotTimeline = buildDotTimeline();
            if (dotTimeline) {
              // Small delay to ensure dot is rendered before animation starts
              setTimeout(() => {
                dotTimeline.play();
                setIsDotAnimationStarted(true);
              }, 100);
            }
          });
        });
      } else {
        // Retry after a short delay if refs aren't ready
        setTimeout(() => {
          requestAnimationFrame(() => {
            const dotTimeline = buildDotTimeline();
            if (dotTimeline) {
              setTimeout(() => {
                dotTimeline.play();
                setIsDotAnimationStarted(true);
              }, 50);
            }
          });
        }, 200);
      }
    }, 200);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isActive, isMariamReady]);

  // Animate Engineer text and text on M strokes to appear with blur effect after dot animation completes
  useEffect(() => {
    if (!isDotAnimationComplete) return;

    // Animate Engineer text with blur fade-in effect
    if (engineerTextRef.current) {
      const engineerText = engineerTextRef.current;
      gsap.to(engineerText, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3,
      });
    }

    // Animate TURNING, REAL LIFE PRODUCTS, IDEAS, and INTO text with blur fade-in effect
    if (numberSevenRef.current) {
      const svg = numberSevenRef.current;
      const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
      const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
      const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
      const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;

      if (turningIdeas) {
        gsap.to(turningIdeas, {
          opacity: 0.6,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      if (realLifeProducts) {
        gsap.to(realLifeProducts, {
          opacity: 0.6,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      if (ideasText) {
        gsap.to(ideasText, {
          opacity: 0.6,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      if (intoText) {
        gsap.to(intoText, {
          opacity: 0.6,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.3,
        });
      }
    }
  }, [isDotAnimationComplete]);


  // Position and size the SVG number 7 directly below PORTFOL
  useEffect(() => {
    if (!numberSevenRef.current || portfolWidth === 0 || !portfolioHeaderRef.current) return;

    const svg = numberSevenRef.current;
    const portfolElement = portfolioHeaderRef.current.querySelector('.hero-cover-title-portfol') as HTMLElement;
    
    if (!portfolElement) return;
    
    // Get PORTFOL element position and styling
    const portfolRect = portfolElement.getBoundingClientRect();
    const portfolBottom = portfolRect.bottom;
    const portfolLeft = portfolRect.left;
    const portfolStyle = window.getComputedStyle(portfolElement);
    const portfolFontSize = parseFloat(portfolStyle.fontSize);
    
    // Calculate the required height: from PORTFOL bottom to screen bottom
    const screenHeight = window.innerHeight;
    const availableHeight = screenHeight - portfolBottom;
    
    // Use canvas to measure text and find font size where horizontal stroke of "7" matches portfolWidth
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set font properties to match PORTFOL exactly
    context.font = `700 ${portfolFontSize}px "Space Grotesk", "Inter", sans-serif`;
    context.letterSpacing = "0.15em";
    
    // Measure "Mariam" to calculate font size that spans edge to edge of screen
    // Create a temporary SVG to measure "Mariam" dimensions
    const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tempSvg.style.position = "absolute";
    tempSvg.style.visibility = "hidden";
    tempSvg.style.width = "2000px";
    tempSvg.style.height = "2000px";
    document.body.appendChild(tempSvg);
    
    const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    tempText.setAttribute("font-size", "200px");
    tempText.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
    tempText.setAttribute("font-weight", "700");
    tempText.setAttribute("letter-spacing", "0"); // No letter spacing
    tempText.textContent = "Mariam"; // Only first letter capital
    tempSvg.appendChild(tempText);
    
    // Get bounding box to measure actual width
    const tempBbox = tempText.getBBox();
    const baseTextWidth = tempBbox.width;
    const baseFontSize = 200;
    
    document.body.removeChild(tempSvg);
    
    // Calculate font size so "Mariam" spans edge to edge of screen
    // Use slightly smaller target to ensure last letter isn't cut off
    const screenWidth = window.innerWidth;
    const targetWidth = screenWidth - 2; // Small margin to prevent clipping of last "m"
    const widthPerFontSize = baseTextWidth / baseFontSize;
    let fontSize = targetWidth / widthPerFontSize;
    
    // Get final text metrics
    context.font = `700 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;
    context.letterSpacing = "0"; // No letter spacing
    const finalMetrics = context.measureText("Mariam");
    const textWidth = finalMetrics.width;
    
    // Calculate SVG dimensions - make it span the full screen width
    // Add small padding to viewBox to prevent clipping of the last letter
    const padding = 10; // Small padding to prevent clipping
    const mariamWidth = screenWidth;
    const mariamHeight = availableHeight;
    
    // Set SVG viewBox with padding to prevent clipping, but keep width at full screen
    svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
    svg.setAttribute("width", `${mariamWidth}px`);
    svg.setAttribute("height", `${mariamHeight}px`);
    
    // Position SVG so its BOTTOM edge is at screen bottom
    // This ensures Mariam is anchored at the bottom of the viewport
    svg.style.position = "fixed";
    svg.style.left = "0px";
    svg.style.top = "auto";
    svg.style.bottom = "0px"; // Anchor SVG at bottom of viewport
    svg.style.margin = "0";
    svg.style.padding = "0";
    svg.style.height = `${mariamHeight}px`; // Explicit height
    svg.style.width = `${mariamWidth}px`; // Full screen width
    svg.style.overflow = "visible"; // Ensure no clipping
    
    // Update text element - Mariam
    const textElement = svg.querySelector(".hero-mariam-text");
    if (textElement) {
      // Position x at left edge (edge to edge, no padding)
      textElement.setAttribute("x", "0");
      
      // Position y at bottom of SVG (Mariam anchored at bottom of viewport)
      // We'll adjust this after measuring to ensure bottom alignment
      textElement.setAttribute("y", `${mariamHeight}px`);
      textElement.setAttribute("dominant-baseline", "baseline");
      textElement.setAttribute("text-anchor", "start");
      textElement.setAttribute("dx", "0");
      
      // Apply font styling - NO letter-spacing, only first letter capital
      textElement.setAttribute("font-size", `${fontSize}px`);
      textElement.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
      textElement.setAttribute("font-weight", "700");
      textElement.setAttribute("letter-spacing", "0"); // No letter spacing
      // No text-transform - keep "Mariam" as is (only first letter capital)
      
      // Measure and adjust y position to align bottom of text with bottom of SVG
      requestAnimationFrame(() => {
        try {
          const textBbox = (textElement as SVGTextElement).getBBox();
          const currentY = parseFloat(textElement.getAttribute("y") || mariamHeight.toString());
          
          // Calculate bottom of text in SVG coordinates
          const textBottom = currentY + textBbox.y + textBbox.height;
          
          // We want text bottom to be exactly at mariamHeight (bottom of SVG = bottom of viewport)
          if (Math.abs(textBottom - mariamHeight) > 0.1) {
            const yAdjustment = mariamHeight - (textBbox.y + textBbox.height);
            textElement.setAttribute("y", yAdjustment.toString());
          }
        } catch (e) {
          // If measurement fails, keep y at mariamHeight
        }
      });
      
      // After text renders, adjust to ensure it spans edge to edge and bottom-left reaches screen bottom-left
      requestAnimationFrame(() => {
        try {
          const bbox = (textElement as SVGTextElement).getBBox();
          const actualTextHeight = bbox.height;
          const actualTextWidth = bbox.width;
          
          // Calculate scale factors for both width (edge to edge) and height (to bottom)
          // Use a slightly smaller target width to ensure the last letter isn't cut off
          const targetWidth = screenWidth - 2; // Small margin to prevent clipping
          const widthScaleFactor = targetWidth / actualTextWidth;
          const heightScaleFactor = mariamHeight / actualTextHeight;
          
          // Prioritize width (edge to edge) but ensure height fits too
          // Use the smaller scale factor to ensure text fits within bounds
          const finalScaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
          
          if (finalScaleFactor > 1.01 || finalScaleFactor < 0.99) { // Only adjust if significantly different
            const adjustedFontSize = fontSize * finalScaleFactor;
            textElement.setAttribute("font-size", `${adjustedFontSize}px`);
            
            // Re-measure after font size adjustment
            requestAnimationFrame(() => {
              try {
                const newBbox = (textElement as SVGTextElement).getBBox();
                const newTextWidth = newBbox.width;
                
                // Ensure text starts at x=0 (left edge) for edge to edge spanning
                // If text is slightly smaller than screen, center it or keep at 0
                textElement.setAttribute("x", "0");
                
                // Ensure bottom of text is aligned with bottom of SVG (bottom of viewport)
                const newCurrentY = parseFloat(textElement.getAttribute("y") || mariamHeight.toString());
                const newTextBottom = newCurrentY + newBbox.y + newBbox.height;
                
                // We want the bottom of the text to be exactly at mariamHeight (bottom of SVG)
                if (Math.abs(newTextBottom - mariamHeight) > 0.1) {
                  const yBottomAdjustment = mariamHeight - (newBbox.y + newBbox.height);
                  textElement.setAttribute("y", yBottomAdjustment.toString());
                }
              } catch (e) {
                // Ignore
              }
            });
          } else {
            // Font size is correct, just ensure positioning
            textElement.setAttribute("x", "0");
            // Ensure bottom alignment
            requestAnimationFrame(() => {
              try {
                const bbox = (textElement as SVGTextElement).getBBox();
                const currentY = parseFloat(textElement.getAttribute("y") || mariamHeight.toString());
                const textBottom = currentY + bbox.y + bbox.height;
                if (Math.abs(textBottom - mariamHeight) > 0.1) {
                  const yAdjustment = mariamHeight - (bbox.y + bbox.height);
                  textElement.setAttribute("y", yAdjustment.toString());
                }
              } catch (e) {
                // Ignore
              }
            });
          }
          
          // Position "TURNING", "IDEAS", and "REAL LIFE PRODUCTS" on the M strokes
          // Wait for Mariam text to be fully rendered and positioned
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              try {
                positionTextsOnM(textElement as SVGTextElement, svg, fontSize);
                
                // Mark Mariam as ready after positioning
                setIsMariamReady(true);
              } catch (e) {
                // Ignore
                setIsMariamReady(true); // Mark ready even on error
              }
            });
          });
        } catch (e) {
          // BBox might not be available immediately
          setIsMariamReady(true); // Mark ready even on error
        }
      });
    } else {
      // If portfolWidth is 0, mark as ready after a short delay
      setTimeout(() => {
        setIsMariamReady(true);
      }, 100);
    }
    
    // Function to position "TURNING", "IDEAS", and "REAL LIFE PRODUCTS" on the M strokes
    const positionTextsOnM = (mariamTextElement: SVGTextElement, svg: SVGSVGElement, mariamFontSize: number) => {
      try {
        // Get the actual "Mariam" text bbox
        const mariamBbox = mariamTextElement.getBBox();
        const mX = mariamBbox.x; // X position of "M" (left edge - left vertical stroke)
        
        // Measure the "M" character dimensions in the same SVG context
        // Create a temporary text element with the same attributes as the Mariam text
        // Place it in the actual SVG to get accurate measurements
        const tempM = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tempM.setAttribute("font-size", `${mariamFontSize}px`);
        tempM.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
        tempM.setAttribute("font-weight", "700");
        tempM.setAttribute("letter-spacing", "0");
        tempM.setAttribute("x", mariamTextElement.getAttribute("x") || "0");
        tempM.setAttribute("y", mariamTextElement.getAttribute("y") || "0");
        tempM.setAttribute("dominant-baseline", mariamTextElement.getAttribute("dominant-baseline") || "hanging");
        tempM.setAttribute("text-anchor", "start");
        tempM.textContent = "M";
        tempM.style.visibility = "hidden";
        svg.appendChild(tempM);
        
        // getBBox() will force a measurement
        const mBbox = tempM.getBBox();
        const mWidth = mBbox.width;
        // Get the actual visual bounds of the M character
        const mActualTop = mBbox.y; // Actual top of M character
        const mActualBottom = mBbox.y + mBbox.height; // Actual bottom of M character
        const mActualHeight = mBbox.height; // Actual visual height of M
        
        // Remove the temporary element
        svg.removeChild(tempM);
        
        // Calculate M's position - use the actual measured bounds
        const mY = mActualTop; // Actual top of M character (visual top of strokes)
        const mBottom = mActualBottom; // Actual bottom of M character (visual bottom of strokes)
        const mCenterY = mY + mActualHeight / 2; // Center of the M (vertically centered on actual visual bounds)
        const mCenterX = mX + mWidth / 2; // Center of the M (horizontally centered on the M character)
        const mRightX = mX + mWidth; // Right edge of M (right vertical stroke)
        
        // Bottom of the entire "Mariam" text bounding box
        const mariamBottom = mariamBbox.y + mariamBbox.height;
        
        // Position "INTO" on the horizontal stroke at the top right of M
        const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
        if (intoText) {
          // Position on the top horizontal stroke, on the right side
          // Offset from the right edge to position it along the horizontal stroke
          const offsetFromRight = -24; // pixels offset from the right edge
          intoText.setAttribute("x", (mRightX + offsetFromRight).toString());
          intoText.setAttribute("y", (mY + 100).toString());
          intoText.setAttribute("text-anchor", "end"); // Align to the right
          intoText.setAttribute("dominant-baseline", "hanging"); // Align to the top
          intoText.setAttribute("opacity", "0");
          intoText.setAttribute("fill", "#C92924");
          intoText.style.filter = "blur(10px)";
          // No rotation - keep it horizontal
          intoText.setAttribute("transform", "");
        }
        
        // Calculate exact stroke dimensions for the M
        // The vertical strokes of M go from top to bottom
        const leftStrokeStartY = mY; // Top of left vertical stroke
        const leftStrokeEndY = mActualBottom; // Bottom of left vertical stroke
        const leftStrokeHeight = mActualHeight; // Full height of the stroke
        const leftStrokeX = mX; // X position of left vertical stroke
        
        // Position "IDEAS" on the horizontal stroke at the top left of M (mirroring INTO)
        const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
        if (ideasText) {
          // Position on the top horizontal stroke, on the left side
          // Offset from the left edge to position it along the horizontal stroke (mirroring INTO)
          const offsetFromLeft = 24; // pixels offset from the left edge (mirroring the right offset)
          ideasText.setAttribute("x", (leftStrokeX + offsetFromLeft).toString());
          ideasText.setAttribute("y", (mY + 100).toString());
          ideasText.setAttribute("text-anchor", "start"); // Align to the left
          ideasText.setAttribute("dominant-baseline", "hanging"); // Align to the top
          ideasText.setAttribute("opacity", "0");
          ideasText.setAttribute("fill", "#C92924");
          ideasText.style.filter = "blur(10px)";
          // No rotation - keep it horizontal
          ideasText.setAttribute("transform", "");
        }
        
        const rightStrokeStartY = mY; // Top of right vertical stroke
        const rightStrokeEndY = mActualBottom; // Bottom of right vertical stroke
        const rightStrokeHeight = mActualHeight; // Full height of the stroke
        const rightStrokeX = mRightX; // X position of right vertical stroke
        
        // Position "TURNING" on the left stroke of M
        const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
        if (turningIdeas) {
          // Measure the text height (width when rotated -90 degrees)
          // First, set it temporarily to measure
          turningIdeas.setAttribute("x", "0");
          turningIdeas.setAttribute("y", "0");
          turningIdeas.setAttribute("opacity", "0");
          const turningIdeasBbox = turningIdeas.getBBox();
          const turningIdeasTextHeight = turningIdeasBbox.height; // This will be the vertical height when rotated
          
          // Calculate offset from stroke (small gap to prevent overlap)
          const offsetFromStroke = -16; // pixels offset from the actual stroke
          
          // Calculate center point of the stroke for rotation
          const strokeCenterY = leftStrokeStartY + (leftStrokeHeight / 2);
          
          // Position text to span exactly along the stroke height
          // X position: left edge of stroke minus offset
          // Y position: center of stroke (so when rotated, it spans the full height)
          turningIdeas.setAttribute("x", (leftStrokeX + offsetFromStroke + 150).toString());
          turningIdeas.setAttribute("y", strokeCenterY.toString());
          turningIdeas.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
          turningIdeas.setAttribute("dominant-baseline", "middle"); // Center vertically
          // Rotate -90 degrees around the center of the stroke to make it vertical
          turningIdeas.setAttribute("transform", `rotate(-90 ${leftStrokeX - offsetFromStroke} ${strokeCenterY})`);
          turningIdeas.setAttribute("opacity", "0");
          turningIdeas.setAttribute("fill", "#C92924");
          turningIdeas.style.filter = "blur(10px)";
        }
        
        // Position "REAL LIFE PRODUCTS" on the right stroke of M (mirrored)
        const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
        if (realLifeProducts) {
          // Measure the text height (width when rotated 90 degrees)
          // First, set it temporarily to measure
          realLifeProducts.setAttribute("x", "0");
          realLifeProducts.setAttribute("y", "0");
          realLifeProducts.setAttribute("opacity", "0");
          const realLifeProductsBbox = realLifeProducts.getBBox();
          const realLifeProductsTextHeight = realLifeProductsBbox.height; // This will be the vertical height when rotated
          
          // Calculate offset from stroke (small gap to prevent overlap)
          const offsetFromStroke = -16; // pixels offset from the actual stroke
          
          // Calculate center point of the stroke for rotation
          const strokeCenterY = rightStrokeStartY + (rightStrokeHeight / 2);
          
          // Position text to span exactly along the stroke height
          // X position: right edge of stroke plus offset
          // Y position: center of stroke (so when rotated, it spans the full height)
          realLifeProducts.setAttribute("x", (rightStrokeX + offsetFromStroke - 70).toString());
          realLifeProducts.setAttribute("y", strokeCenterY.toString() );
          realLifeProducts.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
          realLifeProducts.setAttribute("dominant-baseline", "middle"); // Center vertically
          // Rotate 90 degrees around the center of the stroke to make it vertical
          realLifeProducts.setAttribute("transform", `rotate(90 ${rightStrokeX + offsetFromStroke} ${strokeCenterY})`);
          realLifeProducts.setAttribute("opacity", "0");
          realLifeProducts.setAttribute("fill", "#C92924");
          realLifeProducts.style.filter = "blur(10px)";
        }
        
      } catch (e) {
        // Ignore errors
      }
    };
    
    // buildDotTimeline is now defined outside this useEffect
    
    // Handle window resize
    const handleResize = () => {
      if (portfolWidth > 0 && portfolElement) {
        const svg = numberSevenRef.current;
        if (!svg) return;
        
        const newPortfolRect = portfolElement.getBoundingClientRect();
        const newScreenHeight = window.innerHeight;
        const newAvailableHeight = newScreenHeight - newPortfolRect.bottom;
        
        // Recalculate font size for MARIAM to span screen width
        const newTempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newTempSvg.style.position = "absolute";
        newTempSvg.style.visibility = "hidden";
        newTempSvg.style.width = "2000px";
        newTempSvg.style.height = "2000px";
        document.body.appendChild(newTempSvg);
        
        const newTempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        newTempText.setAttribute("font-size", "200px");
        newTempText.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
        newTempText.setAttribute("font-weight", "700");
        newTempText.setAttribute("letter-spacing", "0"); // No letter spacing
        newTempText.textContent = "Mariam"; // Only first letter capital
        newTempSvg.appendChild(newTempText);
        
        const newTempBbox = newTempText.getBBox();
        const newBaseTextWidth = newTempBbox.width;
        const newBaseFontSize = 200;
        const newWidthPerFontSize = newBaseTextWidth / newBaseFontSize;
        
        const newScreenWidth = window.innerWidth;
        const newTargetWidth = newScreenWidth - 2; // Small margin to prevent clipping of last "m"
        const newFontSize = newTargetWidth / newWidthPerFontSize;
        
        document.body.removeChild(newTempSvg);
        
        context.font = `700 ${newFontSize}px "Space Grotesk", "Inter", sans-serif`;
        context.letterSpacing = "0"; // No letter spacing
        const newFinalMetrics = context.measureText("Mariam");
        const newTextWidth = newFinalMetrics.width;
        const newMariamWidth = newScreenWidth;
        
        // Update dimensions with padding to prevent clipping
        const newPadding = 10;
        svg.setAttribute("height", `${newAvailableHeight}px`);
        svg.setAttribute("width", `${newMariamWidth}px`);
        svg.setAttribute("viewBox", `-${newPadding} 0 ${newMariamWidth + newPadding * 2} ${newAvailableHeight}`);
        svg.style.width = `${newMariamWidth}px`;
        
        // Update position - top of SVG at PORTFOL bottom (no gap)
        svg.style.top = "auto";
        svg.style.bottom = "0px"; // Keep anchored at bottom of viewport
        svg.style.height = `${newAvailableHeight}px`;
        
        // Update Mariam text
        const textEl = svg.querySelector(".hero-mariam-text");
        if (textEl) {
          // Position x at left edge (edge to edge, no padding)
          textEl.setAttribute("x", "0");
          textEl.setAttribute("y", `${newAvailableHeight}px`); // Start at bottom, will adjust
          textEl.setAttribute("dominant-baseline", "baseline");
          textEl.setAttribute("text-anchor", "start");
          textEl.setAttribute("font-size", `${newFontSize}px`);
          textEl.setAttribute("letter-spacing", "0"); // No letter spacing
          // No text-transform - keep "Mariam" as is
          
          // Adjust to ensure bottom of text aligns with bottom of SVG (bottom of viewport)
          requestAnimationFrame(() => {
            try {
              const bbox = (textEl as SVGTextElement).getBBox();
              const actualTextHeight = bbox.height;
              
              if (actualTextHeight < newAvailableHeight) {
                const scaleFactor = newAvailableHeight / actualTextHeight;
                const adjustedFontSize = newFontSize * scaleFactor;
                textEl.setAttribute("font-size", `${adjustedFontSize}px`);
                
                // Re-measure and adjust y to align bottom with bottom of SVG
                requestAnimationFrame(() => {
                  try {
                    const newBbox = (textEl as SVGTextElement).getBBox();
                    const textBottom = newBbox.y + newBbox.height;
                    if (Math.abs(textBottom - newAvailableHeight) > 0.1) {
                      const yAdjustment = newAvailableHeight - (newBbox.y + newBbox.height);
                      textEl.setAttribute("y", yAdjustment.toString());
                    }
                } catch (e) {
                  // Ignore
                }
              });
            }
            
            // Position "TURNING", "IDEAS", and "REAL LIFE PRODUCTS" on the M strokes
            requestAnimationFrame(() => {
              try {
                positionTextsOnM(textEl as SVGTextElement, svg, newFontSize);
              } catch (e) {
                // Ignore
              }
            });
          } catch (e) {
            // BBox might not be available immediately
          }
        });
      }
      
      // Function to position "TURNING", "IDEAS", and "REAL LIFE PRODUCTS" on the M strokes (for resize handler)
      const positionTextsOnM = (mariamTextElement: SVGTextElement, svg: SVGSVGElement, mariamFontSize: number) => {
        try {
          // Get the actual "Mariam" text bbox
          const mariamBbox = mariamTextElement.getBBox();
          const mX = mariamBbox.x; // X position of "M" (left edge - left vertical stroke)
          
          // Measure the "M" character dimensions in the same SVG context
          // Create a temporary text element with the same attributes as the Mariam text
          // Place it in the actual SVG to get accurate measurements
          const tempM = document.createElementNS("http://www.w3.org/2000/svg", "text");
          tempM.setAttribute("font-size", `${mariamFontSize}px`);
          tempM.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
          tempM.setAttribute("font-weight", "700");
          tempM.setAttribute("letter-spacing", "0");
          tempM.setAttribute("x", mariamTextElement.getAttribute("x") || "0");
          tempM.setAttribute("y", mariamTextElement.getAttribute("y") || "0");
          tempM.setAttribute("dominant-baseline", mariamTextElement.getAttribute("dominant-baseline") || "hanging");
          tempM.setAttribute("text-anchor", "start");
          tempM.textContent = "M";
          tempM.style.visibility = "hidden";
          svg.appendChild(tempM);
          
          // getBBox() will force a measurement
          const mBbox = tempM.getBBox();
          const mWidth = mBbox.width;
          // Get the actual visual bounds of the M character
          const mActualTop = mBbox.y; // Actual top of M character
          const mActualBottom = mBbox.y + mBbox.height; // Actual bottom of M character
          const mActualHeight = mBbox.height; // Actual visual height of M
          
          // Remove the temporary element
          svg.removeChild(tempM);
          
          // Calculate M's position - use the actual measured bounds
          const mY = mActualTop; // Actual top of M character (visual top of strokes)
          const mBottom = mActualBottom; // Actual bottom of M character (visual bottom of strokes)
          const mCenterY = mY + mActualHeight / 2; // Center of the M (vertically centered on actual visual bounds)
          const mCenterX = mX + mWidth / 2; // Center of the M (horizontally centered on the M character)
          const mRightX = mX + mWidth; // Right edge of M (right vertical stroke)
          
          // Bottom of the entire "Mariam" text bounding box
          const mariamBottom = mariamBbox.y + mariamBbox.height;
          
          // Position "INTO" on the horizontal stroke at the top right of M
          const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
          if (intoText) {
            // Position on the top horizontal stroke, on the right side
            // Offset from the right edge to position it along the horizontal stroke
            const offsetFromRight = -24; // pixels offset from the right edge
            intoText.setAttribute("x", (mRightX + offsetFromRight).toString());
            intoText.setAttribute("y", (mY + 100).toString());
            intoText.setAttribute("text-anchor", "end"); // Align to the right
            intoText.setAttribute("dominant-baseline", "hanging"); // Align to the top
            intoText.setAttribute("opacity", "0");
            intoText.setAttribute("fill", "#C92924");
            intoText.style.filter = "blur(10px)";
            // No rotation - keep it horizontal
            intoText.setAttribute("transform", "");
          }
          
          // Calculate exact stroke dimensions for the M
          // The vertical strokes of M go from top to bottom
          const leftStrokeStartY = mY; // Top of left vertical stroke
          const leftStrokeEndY = mActualBottom; // Bottom of left vertical stroke
          const leftStrokeHeight = mActualHeight; // Full height of the stroke
          const leftStrokeX = mX; // X position of left vertical stroke
          
          // Position "IDEAS" on the horizontal stroke at the top left of M (mirroring INTO)
          const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
          if (ideasText) {
            // Position on the top horizontal stroke, on the left side
            // Offset from the left edge to position it along the horizontal stroke (mirroring INTO)
            const offsetFromLeft = 24; // pixels offset from the left edge (mirroring the right offset)
            ideasText.setAttribute("x", (leftStrokeX + offsetFromLeft).toString());
            ideasText.setAttribute("y", (mY + 100).toString());
            ideasText.setAttribute("text-anchor", "start"); // Align to the left
            ideasText.setAttribute("dominant-baseline", "hanging"); // Align to the top
            ideasText.setAttribute("opacity", "0");
            ideasText.setAttribute("fill", "#C92924");
            ideasText.style.filter = "blur(10px)";
            // No rotation - keep it horizontal
            ideasText.setAttribute("transform", "");
          }
          
          const rightStrokeStartY = mY; // Top of right vertical stroke
          const rightStrokeEndY = mActualBottom; // Bottom of right vertical stroke
          const rightStrokeHeight = mActualHeight; // Full height of the stroke
          const rightStrokeX = mRightX; // X position of right vertical stroke
          
          // Position "TURNING" on the left stroke of M
          const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
          if (turningIdeas) {
            // Measure the text height (width when rotated -90 degrees)
            // First, set it temporarily to measure
            turningIdeas.setAttribute("x", "0");
            turningIdeas.setAttribute("y", "0");
            turningIdeas.setAttribute("opacity", "0");
            const turningIdeasBbox = turningIdeas.getBBox();
            const turningIdeasTextHeight = turningIdeasBbox.height; // This will be the vertical height when rotated
            
            // Calculate offset from stroke (small gap to prevent overlap)
            const offsetFromStroke = -16; // pixels offset from the actual stroke
            
            // Calculate center point of the stroke for rotation
            const strokeCenterY = leftStrokeStartY + (leftStrokeHeight / 2);
            
            // Position text to span exactly along the stroke height
            // X position: left edge of stroke minus offset
            // Y position: center of stroke (so when rotated, it spans the full height)
            turningIdeas.setAttribute("x", (leftStrokeX - offsetFromStroke + 150).toString());
            turningIdeas.setAttribute("y", strokeCenterY.toString());
            turningIdeas.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
            turningIdeas.setAttribute("dominant-baseline", "middle"); // Center vertically
            // Rotate -90 degrees around the center of the stroke to make it vertical
            turningIdeas.setAttribute("transform", `rotate(-90 ${leftStrokeX - offsetFromStroke} ${strokeCenterY})`);
            turningIdeas.setAttribute("opacity", "0");
            turningIdeas.setAttribute("fill", "#C92924");
            turningIdeas.style.filter = "blur(10px)";
          }
          
          // Position "REAL LIFE PRODUCTS" on the right stroke of M (mirrored)
          const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
          if (realLifeProducts) {
            // Measure the text height (width when rotated 90 degrees)
            // First, set it temporarily to measure
            realLifeProducts.setAttribute("x", "0");
            realLifeProducts.setAttribute("y", "0");
            realLifeProducts.setAttribute("opacity", "0");
            const realLifeProductsBbox = realLifeProducts.getBBox();
            const realLifeProductsTextHeight = realLifeProductsBbox.height; // This will be the vertical height when rotated
            
            // Calculate offset from stroke (small gap to prevent overlap)
            const offsetFromStroke = -16; // pixels offset from the actual stroke
            
            // Calculate center point of the stroke for rotation
            const strokeCenterY = rightStrokeStartY + (rightStrokeHeight / 2);
            
            // Position text to span exactly along the stroke height
            // X position: right edge of stroke plus offset
            // Y position: center of stroke (so when rotated, it spans the full height)
            realLifeProducts.setAttribute("x", (rightStrokeX + offsetFromStroke).toString());
            realLifeProducts.setAttribute("y", strokeCenterY.toString());
            realLifeProducts.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
            realLifeProducts.setAttribute("dominant-baseline", "middle"); // Center vertically
            // Rotate 90 degrees around the center of the stroke to make it vertical
            realLifeProducts.setAttribute("transform", `rotate(90 ${rightStrokeX + offsetFromStroke} ${strokeCenterY})`);
            realLifeProducts.setAttribute("opacity", "0");
            realLifeProducts.setAttribute("fill", "#C92924");
            realLifeProducts.style.filter = "blur(10px)";
          }
        } catch (e) {
          // Ignore errors
        }
      };
        
        // Recalculate if portfolWidth changes
        if (newPortfolRect.width !== portfolWidth) {
          setPortfolWidth(newPortfolRect.width);
        }
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [portfolWidth]);

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center text-center text-[#280B0B] relative overflow-hidden"
      style={{
        backgroundColor: "#F9E7C9",
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
              <div className="hero-cover-title-line" style={{ display: "none", height: "1px", backgroundColor: "#280B0B", opacity: 0.4, position: "absolute", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true"></div>
              {/* Site Navigation - appears after portfolio animation, centered on the line */}
              {isPortfolioAnimationComplete && (
                <nav ref={navRef} className="hero-site-navigation">
                  <ul className="hero-nav-links">
                    <li><a href="#experience" onClick={(e) => { e.preventDefault(); onNavigate('experience'); }}>experience</a></li>
                    <li><a href="#work" onClick={(e) => { e.preventDefault(); onNavigate('work'); }}>projects</a></li>
                    <li><a href="#certificates" onClick={(e) => { e.preventDefault(); onNavigate('certificates'); }}>certificates</a></li>
                    <li><a href="#contact" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>contact</a></li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>

        {/* Left marquee */}
   

      </div>

      {/* SVG Number 7 - positioned directly below PORTFOL */}
      {portfolWidth > 0 && (
        <svg
          ref={numberSevenRef}
          className="hero-number-seven"
          style={{
            position: "fixed",
            zIndex: 300,
            pointerEvents: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {/* Mariam text - spans entire screen edge to edge */}
          <text
            ref={svgMariamTextRef}
            className="hero-mariam-text"
            x="0"
            y="0"
            fill="#280B0B"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="start"
            dominantBaseline="hanging"
            style={{ letterSpacing: "0" }}
          >
            <tspan ref={svgMRef}>M</tspan>
            <tspan ref={svgA1Ref}>a</tspan>
            <tspan ref={svgRRef}>r</tspan>
            <tspan ref={svgIRef}>ı</tspan>
            <tspan ref={svgA2Ref}>a</tspan>
            <tspan ref={svgM2Ref}>m</tspan>
          </text>
          
          {/* TURNING text on left stroke of M */}
          <text
            className="hero-turning-ideas"
            x="0"
            y="0"
            fill="#C92924"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0"
            style={{ letterSpacing: "0.4em", filter: "blur(10px)" }}
          >
            TURNING
          </text>
          
          {/* IDEAS text on horizontal stroke of M (mirroring INTO) */}
          <text
            className="hero-ideas-text"
            x="0"
            y="0"
            fill="#C92924"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="start"
            dominantBaseline="hanging"
            fontSize="12px"
            fontWeight="500"
            opacity="0"
            style={{ letterSpacing: "0.4em", filter: "blur(10px)" }}
          >
            IDEAS
          </text>
          
          {/* REAL LIFE PRODUCTS text on right stroke of M */}
          <text
            className="hero-real-life-products"
            x="0"
            y="0"
            fill="#C92924"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0"
            style={{ letterSpacing: "0.4em", filter: "blur(10px)" }}
          >
            REAL LIFE PRODUCTS
          </text>
          
          {/* INTO text at center of M */}
          <text
            className="hero-into-text"
            x="0"
            y="0"
            fill="#C92924"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0"
            style={{ letterSpacing: "0.4em", filter: "blur(10px)" }}
          >
            INTO
          </text>
        </svg>
      )}

      {/* Engineer text - bottom right, white, on top layer */}    
      <div
        ref={engineerTextRef}
        className="hero-engineer-text"
        style={{
          position: "fixed",
          bottom: "0rem",
          right: "2rem",
          color: "#280B0B",
          fontFamily: '"Miserable Emillia", cursive',
          fontSize: "clamp(3rem, 22vw, 22rem)",
          zIndex: 400,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          opacity: 0,
          filter: "blur(10px)",
        }}
      >
         Engineer
      </div>
      

      <style jsx>{`
        .hero-heading {
          font-family: "Space Grotesk", "Inter", sans-serif;
          letter-spacing: normal;
          text-align: right;
          margin: 0;
          margin-bottom: 0;
          padding: 0;
          padding-bottom: 0;
          line-height: 0.7;
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
          color: #280B0B;
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
          height: 100%;
          padding: 100px 0 0 100px;
          padding-bottom: 0;
          position: absolute;
          inset: 0;
          z-index: 200;
          overflow: visible;
        }


        @media (max-width: 768px) {
          .hero-heading-wrapper {
            justify-content: flex-end;
            align-items: flex-end;
            padding: 100px 0 0 100px;
            padding-bottom: 0;
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
          color: #280B0B;
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
          margin-bottom: 0;
          padding-bottom: 0;
          vertical-align: bottom;
        }

        .hero-about-me {
          position: absolute;
          right: 100%;
          bottom: 0;
          margin-right: -1rem;
          margin-bottom: .2rem;
          padding-bottom: 0;
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: clamp(0.7rem, 1vw, 0.7rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #280B0B;
          opacity: 0.6;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          white-space: nowrap;
          line-height: 1.2;
          align-self: flex-end;
        }

        @media (max-width: 768px) {
          .hero-about-me {
            margin-right: 1.5rem;
            font-size: clamp(0.6rem, 0.9vw, 0.75rem);
            letter-spacing: 0.3em;
          }
        }

        .hero-about-me-up {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%) translateY(-50%);
          padding-bottom: 0;
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: clamp(0.7rem, 1vw, 0.7rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #280B0B;
          opacity: 0.6;
          white-space: nowrap;
          line-height: 1.2;
          text-align: center;
        }

        .hero-about-me-right {
          position: absolute;
          left: 100%;
          bottom: 0;
          margin-left: -1rem;
          // margin-bottom: .2rem;
          padding-bottom: 0;
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: clamp(0.7rem, 1vw, 0.7rem);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          color: #280B0B;
          opacity: 0.6;
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(0deg);
          white-space: nowrap;
          line-height: 1.2;
          align-self: flex-end;
        }

        @media (max-width: 768px) {
          .hero-about-me-right {
            margin-left: 1.5rem;
            font-size: clamp(0.6rem, 0.9vw, 0.75rem);
            letter-spacing: 0.3em;
          }
        }

        .hero-cover-header {
          position: relative;
        }

        .hero-site-navigation {
          position: absolute;
          display: flex;
          align-items: center;
          font-family: "Space Grotesk", "Inter", monospace;
          opacity: 0;
          z-index: 30;
          white-space: nowrap;
          pointer-events: auto;
          transition: opacity 0.3s ease;
        }

        .hero-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          gap: 1.5rem;
          align-items: center;
        }

        .hero-nav-links li {
          margin: 0;
          padding: 0;
        }

        .hero-nav-links a {
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          font-weight: 400;
          text-transform: lowercase;
          letter-spacing: 0.05em;
          color: #280B0B;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.2s ease;
        }

        .hero-nav-links a:hover {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .hero-nav-links {
            gap: 1rem;
          }
          
          .hero-nav-links a {
            font-size: clamp(0.5rem, 0.7vw, 0.65rem);
          }
        }

        .hero-left-text {
          position: absolute;
          right: 100%;
          bottom: 0;
          max-width: 300px;
          margin-right: 2rem;
          z-index: 10;
          rotate: 90deg;
          text-align: right;
        }

        .hero-left-paragraph {
          font-family: "Space Grotesk", "Inter", sans-serif;
          font-size: clamp(0.75rem, 1.2vw, 0.95rem);
          font-weight: 400;
          line-height: 1.6;
          color: #280B0B;
          margin: 0;
          padding: 0;
          text-align: left;
        }

        @media (max-width: 768px) {
          .hero-left-text {
            max-width: 200px;
            margin-right: 1.5rem;
          }
          
          .hero-left-paragraph {
            font-size: clamp(0.65rem, 1vw, 0.8rem);
            line-height: 1.5;
          }
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
          overflow: visible;
        }

        .hero-iam {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .hero-iam-wrapper {
          position: relative;
        }



        .hero-am {
          display: inline-flex;
          align-items: flex-end;
          position: relative;
        }

        .hero-m-wrapper {
          display: inline-block;
          position: relative;
        }

        .hero-letter {
          display: inline-block;
          position: relative;
          transform-origin: bottom center;
          color: #280B0B;
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
          background-color: #C92924;
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
          color: #280B0B;
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
          background-color: transparent;
          overflow: hidden;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        /* Tint and inner shadow layer */
        .hero-frame-marquee::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        /* Backdrop blur and distortion layer */
        .hero-frame-marquee::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          isolation: isolate;
          pointer-events: none;
        }

        .hero-frame-marquee-top {
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          border-radius: 0;
          padding-right: 2rem;
          position: relative;
          overflow: visible;
        }

        /* Remove liquid glass effect from top marquee (Portfolio header) */
        .hero-frame-marquee-top {
          box-shadow: none;
        }

        .hero-frame-marquee-top::before,
        .hero-frame-marquee-top::after {
          display: none;
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
          bottom: 0px;
          width: 50px;
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
          position: relative;
          z-index: 10;
        }

        .hero-frame-marquee-content-vertical {
          flex-direction: column;
          height: fit-content;
          animation: frame-marquee-scroll-vertical 30s linear infinite;
        }

        .hero-frame-marquee-text {
          display: inline-block;
          padding: 0 2rem;
          padding-right: 2rem;
          color: #280B0B;
          font-size: clamp(1.5rem, 1.5vw, 1.5rem);
          font-weight: 700;
          font-family: "Space Grotesk", "Inter", sans-serif;
          letter-spacing: 0.1em;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          vertical-align: baseline;
          flex-shrink: 0;
          writing-mode: horizontal-tb;
          position: relative;
          z-index: 10;
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
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
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
          overflow: visible;
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
          color: #280B0B;
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
          background-color: #280B0B;
          opacity: 0.4;
          top: 50%;
          transform: translateY(-50%);
        }

        .hero-engineer-text {
          font-family: "Miserable Emillia", cursive;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          user-select: none;
        }

        @media (max-width: 768px) {
          .hero-engineer-text {
            bottom: 1rem;
            right: 1rem;
            font-size: clamp(2.5rem, 6vw, 4rem);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;