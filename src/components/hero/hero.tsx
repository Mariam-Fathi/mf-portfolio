"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { setHeroNavigationY, setHeroLineData } from "@/utils/navigationPosition";

interface HeroProps {
  onNavigate: (section: string) => void;
  onReady?: () => void;
  isActive?: boolean;
}

// Module-level storage for positions that persist across component unmounts/remounts
// These will only be reset on hard reload (page refresh)
let memoizedPositions: {
  iScreenX: number;
  iScreenY: number;
  iCenterY: number;
  a2ScreenX: number;
  a2ScreenY: number;
  m2ScreenX: number;
  m2ScreenY: number;
  dotSize: number;
  finalDotSize: number;
} | null = null;

let positionsCalculated = false;
let animationEverCompleted = false;

// Module-level storage for portfolio positions and calculations
let memoizedPortfolioData: {
  portfolWidth: number;
  oFinalX: number;
  lineFinalWidth: number;
  iOriginalPosition: number;
  oStartX: number;
  iWidth: number;
  containerWidth: number;
} | null = null;

let portfolioCalculated = false;
let portfolioAnimationEverCompleted = false;

// Module-level storage for SVG Mariam positioning
let memoizedMariamSvgData: {
  fontSize: number;
  mariamWidth: number;
  mariamHeight: number;
  portfolBottom: number;
  portfolLeft: number;
  portfolFontSize: number;
  screenWidth: number;
  screenHeight: number;
} | null = null;

let mariamSvgCalculated = false;

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

  // Helper function to check if it's mobile/small screen
  const isMobileScreen = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 1024; // lg breakpoint
  };

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
    
    // Ensure engineer text is always on top layer above the dot
    const setEngineerZIndex = () => {
      if (engineerTextRef.current) {
        engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
        engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
      }
    };
    
    // Set immediately
    setEngineerZIndex();
    
    // Use MutationObserver to watch for when the dot is added/updated in the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // Watch for added nodes
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const element = node as HTMLElement;
            if (element.classList?.contains('final-i-dot-svg')) {
              // Dot was just added, ensure engineer text is above it
              requestAnimationFrame(() => {
                setEngineerZIndex();
                requestAnimationFrame(setEngineerZIndex);
              });
            }
          }
        });
        
        // Watch for attribute changes on the dot (when it becomes visible)
        if (mutation.type === 'attributes' && mutation.target) {
          const target = mutation.target as HTMLElement;
          if (target.classList?.contains('final-i-dot-svg')) {
            if (mutation.attributeName === 'style' || 
                target.style.display !== 'none' || 
                target.style.opacity !== '0') {
              // Dot visibility changed, ensure engineer text is above
              requestAnimationFrame(() => {
                setEngineerZIndex();
                requestAnimationFrame(setEngineerZIndex);
              });
            }
          }
        }
      });
    });
    
    // Observe body for added nodes and attribute changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });
    
    // Also watch for any dot elements that might already exist
    const checkExistingDot = () => {
      const existingDot = document.querySelector('.final-i-dot-svg') as HTMLElement;
      if (existingDot && existingDot.style.display !== 'none' && existingDot.style.opacity !== '0') {
        setEngineerZIndex();
      }
    };
    
    // Check immediately and periodically
    checkExistingDot();
    const interval = setInterval(() => {
      setEngineerZIndex();
      checkExistingDot();
    }, 50);
    
    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  // Hide dot when hero becomes inactive, restore when active again
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
    } else {
      // When hero becomes active again, restore dot if positions are calculated
      // Even if animation didn't complete, we should show elements at their final positions
      if (memoizedPositions && positionsCalculated) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (svgMariamTextRef.current && numberSevenRef.current && 
                svgIRef.current && svgA2Ref.current && svgM2Ref.current) {
              const pos = memoizedPositions;
              
              // Check if dot already exists in DOM, otherwise create it
              let finalDot = svgFinalDotRef.current;
              if (!finalDot) {
                // Try to find existing dot in DOM
                const existingDot = document.querySelector('.final-i-dot-svg') as HTMLDivElement;
                if (existingDot) {
                  svgFinalDotRef.current = existingDot;
                  finalDot = existingDot;
                } else {
                  // Create new dot element
                  finalDot = document.createElement("div");
                  finalDot.className = "final-i-dot-svg";
                  svgFinalDotRef.current = finalDot;
                  document.body.appendChild(finalDot);
                }
              }
              
            // Ensure dot is visible and positioned at final location
            if (pos) {
              // Apply mobile size reduction if on mobile
              const currentDotSize = isMobileScreen() ? Math.min(pos.finalDotSize * 0.6, 40) : pos.finalDotSize;
              finalDot.style.width = `${currentDotSize}px`;
              finalDot.style.height = `${currentDotSize}px`;
              finalDot.style.borderRadius = "50%";
              finalDot.style.backgroundColor = "#6B2138";
              finalDot.style.position = "fixed";
              finalDot.style.zIndex = "1";
              finalDot.style.setProperty('z-index', '1', 'important');
              finalDot.style.opacity = "1";
              finalDot.style.display = "block";
              finalDot.style.visibility = "visible";
              finalDot.style.pointerEvents = "none";
              finalDot.style.transformOrigin = "center center";
              
              // Position at final location immediately
              gsap.set(finalDot, {
                x: pos.iScreenX - (currentDotSize / 2),
                y: pos.iScreenY,
                scale: 1,
                opacity: 1,
                immediateRender: true,
                force3D: true
              });
              
                // Color the letters if they aren't already colored
                if (svgIRef.current) {
                  gsap.set(svgIRef.current, { fill: "#6B2138" });
                }
                if (svgA2Ref.current) {
                  gsap.set(svgA2Ref.current, { fill: "#6B2138" });
                }
                if (svgM2Ref.current) {
                  gsap.set(svgM2Ref.current, { fill: "#6B2138" });
                }
              
              // Ensure engineer text is always above the dot - set immediately after dot positioning
              requestAnimationFrame(() => {
                if (engineerTextRef.current) {
                  engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                  engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                }
                // Set again on next frame to be absolutely sure
                requestAnimationFrame(() => {
                  if (engineerTextRef.current) {
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                });
              });
              
              // Mark animation as complete so text animations can run
              setIsDotAnimationComplete(true);
              setIsDotAnimationStarted(true);
              
              // Also restore engineer text and SVG text elements to final visible state
              // This ensures they appear even if animation didn't complete before navigation
              if (!isMobileScreen()) {
                requestAnimationFrame(() => {
                  // Restore engineer text
                  if (engineerTextRef.current) {
                    gsap.set(engineerTextRef.current, {
                      opacity: 1,
                      filter: "blur(0px)",
                      immediateRender: true,
                    });
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                  
                  // Restore SVG text elements (TURNING, REAL LIFE PRODUCTS, IDEAS, INTO)
                  if (numberSevenRef.current) {
                    const svg = numberSevenRef.current;
                    const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
                    const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
                    const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
                    const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
                    
                    if (turningIdeas) {
                      gsap.set(turningIdeas, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (realLifeProducts) {
                      gsap.set(realLifeProducts, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (ideasText) {
                      gsap.set(ideasText, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (intoText) {
                      gsap.set(intoText, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                  }
                });
              }
              }
            }
          });
        });
      }
    }
  }, [isActive, isDotAnimationComplete]);

  // Function to animate dot along SVG Mariam letters
  const buildDotTimeline = () => {
    if (!svgMariamTextRef.current || !numberSevenRef.current) return undefined;
    
    const svg = numberSevenRef.current;
    const svgMariamText = svgMariamTextRef.current;
    const svgIRefEl = svgIRef.current;
    const svgA2RefEl = svgA2Ref.current;
    const svgM2RefEl = svgM2Ref.current;
    
    if (!svgIRefEl || !svgA2RefEl || !svgM2RefEl) return undefined;
    
    // Use memoized positions if available, otherwise calculate and store them
    let iScreenX: number;
    let iScreenY: number;
    let iCenterY: number;
    let a2ScreenX: number;
    let a2ScreenY: number;
    let m2ScreenX: number;
    let m2ScreenY: number;
    let dotSize: number;
    let finalDotSize: number;
    
    if (memoizedPositions && positionsCalculated) {
      // Use memoized positions
      const pos = memoizedPositions;
      iScreenX = pos.iScreenX;
      iScreenY = pos.iScreenY;
      iCenterY = pos.iCenterY;
      a2ScreenX = pos.a2ScreenX;
      a2ScreenY = pos.a2ScreenY;
      m2ScreenX = pos.m2ScreenX;
      m2ScreenY = pos.m2ScreenY;
      dotSize = pos.dotSize;
      finalDotSize = pos.finalDotSize;
      
      console.log('Using memoized positions:', pos);
    } else {
      // Calculate positions (only on first mount/hard reload)
      const textRect = svgMariamText.getBBox();
      const textX = parseFloat(svgMariamText.getAttribute("x") || "0");
      const textY = parseFloat(svgMariamText.getAttribute("y") || "0");
      const fontSize = parseFloat(svgMariamText.getAttribute("font-size") || window.getComputedStyle(svgMariamText).fontSize) || 200;
      const fontFamily = svgMariamText.getAttribute("font-family") || '"Momo Trust Display", "Stack Sans", sans-serif';
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
      iScreenX = iRect.left + iRect.width / 2;
      iScreenY = iRect.top + iRect.height * 0.19; // Dot position on "i"
      iCenterY = iRect.top + iRect.height / 2; // Center of "i" for jump calculations
      a2ScreenX = a2Rect.left + a2Rect.width / 2;
      a2ScreenY = a2Rect.top + a2Rect.height / 2;
      m2ScreenX = m2Rect.left + m2Rect.width / 2;
      m2ScreenY = m2Rect.top + m2Rect.height / 2;
      
      // Smaller dot size on mobile screens
      const baseDotSize = Math.max(iRect.width * 0.5, 64);
      dotSize = isMobileScreen() ? Math.min(baseDotSize * 0.6, 40) : baseDotSize;
      finalDotSize = dotSize;
      
      // Store positions in module-level variable for future use (persists across unmounts)
      memoizedPositions = {
        iScreenX,
        iScreenY,
        iCenterY,
        a2ScreenX,
        a2ScreenY,
        m2ScreenX,
        m2ScreenY,
        dotSize,
        finalDotSize
      };
      positionsCalculated = true;
      
      // Debug: Log positions to verify they're reasonable
      console.log('Position calculations (using tspan getBoundingClientRect) - STORED:', {
        iRect: { left: iRect.left, top: iRect.top, width: iRect.width, height: iRect.height },
        iScreen: { x: iScreenX, y: iScreenY },
        a2Screen: { x: a2ScreenX, y: a2ScreenY },
        m2Screen: { x: m2ScreenX, y: m2ScreenY },
        windowHeight: window.innerHeight,
        dotSize
      });
    }
    
    // Create timeline - original dot removed, only using final dot
    const dotTimeline = gsap.timeline({ immediateRender: true, paused: true });
    
    // Create final dot that lands on "i"
    const finalDot = document.createElement("div");
    finalDot.className = "final-i-dot-svg";
    svgFinalDotRef.current = finalDot;
    
    // Append to body to ensure it's above all other elements
    document.body.appendChild(finalDot);
    
    // Set initial final dot position and make it visible
    finalDot.style.width = `${finalDotSize}px`;
    finalDot.style.height = `${finalDotSize}px`;
    finalDot.style.borderRadius = "50%";
    finalDot.style.backgroundColor = "#6B2138";
    finalDot.style.position = "fixed";
    // Set dot z-index to be lower than engineer text
    finalDot.style.zIndex = "1";
    finalDot.style.setProperty('z-index', '1', 'important');
    
    // Ensure engineer text is always above the dot - set immediately after dot creation
    const forceEngineerAboveDot = () => {
      if (engineerTextRef.current) {
        engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
        engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
      }
      // Also ensure dot stays at lower z-index
      if (finalDot) {
        finalDot.style.setProperty('z-index', '100', 'important');
      }
    };
    
    requestAnimationFrame(() => {
      forceEngineerAboveDot();
      requestAnimationFrame(() => {
        forceEngineerAboveDot();
        requestAnimationFrame(forceEngineerAboveDot);
      });
    });
    
    // Also set after delays
    setTimeout(forceEngineerAboveDot, 10);
    setTimeout(forceEngineerAboveDot, 50);
    setTimeout(forceEngineerAboveDot, 100);
    finalDot.style.opacity = "1";
    finalDot.style.left = "0px";
    finalDot.style.top = "0px";
    finalDot.style.display = "block";
    
    // Force engineer text z-index after dot is fully set up
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (engineerTextRef.current) {
          engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
          engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
        }
      });
    });
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
          backgroundColor: "#6B2138", 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.in",
          onComplete: () => {
            // Color "i" when dot first hits
            if (svgIRefEl) {
              gsap.to(svgIRefEl, {
                fill: "#6B2138",
                duration: 0.3,
                ease: "power2.out",
              });
            }
          }
        },
        { 
          y: iScreenY + 30, 
          scaleY: 0.7, 
          backgroundColor: "#6B2138", 
          opacity: 1, 
          duration: 0.15, 
          ease: "power2.out"
        },
        { 
          y: iScreenY, 
          scaleY: 1, 
          backgroundColor: "#6B2138",
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
          backgroundColor: "#6B2138",
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
      backgroundColor: "#6B2138",
      opacity: 1,
      duration: 0.25,
      ease: "power2.in",
      force3D: true
    });
    
    finalDotTimeline.to(finalDot, {
      y: a2ScreenY,
      scaleY: 0.8,
      backgroundColor: "#6B2138",
      opacity: 1,
      duration: 0.15,
      ease: "bounce.out",
      force3D: true,
      onComplete: () => {
        if (svgA2RefEl) {
          gsap.to(svgA2RefEl, {
            fill: "#6B2138",
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
        { x: m2ScreenX - (finalDotSize / 2), y: m2ScreenY - 100, scaleY: 0.75, backgroundColor: "#6B2138", duration: 0.3, ease: "power2.out", force3D: true },
        { y: m2ScreenY - 120, duration: 0.2, ease: "sine.inOut", force3D: true },
        { y: m2ScreenY + 20, scaleY: 1.2, backgroundColor: "#6B2138", duration: 0.25, ease: "power2.in", force3D: true },
        {
          y: m2ScreenY,
          scaleY: 0.8,
          backgroundColor: "#6B2138",
          opacity: 1,
          duration: 0.15,
          ease: "bounce.out",
          force3D: true,
          onComplete: () => {
            if (svgM2RefEl) {
              gsap.to(svgM2RefEl, {
                fill: "#6B2138",
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
          backgroundColor: "#6B2138", 
          opacity: 1, 
          duration: 0.4, 
          ease: "power2.in",
          force3D: true
        },
        { 
          y: iScreenY + 30, 
          scaleY: 0.7, 
          backgroundColor: "#6B2138", 
          opacity: 1, 
          duration: 0.15, 
          ease: "power2.out",
          force3D: true
        },
        { 
          y: iScreenY, 
          scaleY: 1, 
          backgroundColor: "#6B2138",
          opacity: 1,
          duration: 0.2, 
          ease: "power2.out",
          force3D: true,
          onComplete: () => {
            // Change "i" color at the last fall
            if (svgIRefEl) {
              gsap.to(svgIRefEl, {
                fill: "#6B2138",
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
        animationEverCompleted = true;
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
    
    // Use memoized portfolWidth if available
    if (memoizedPortfolioData && portfolioCalculated && memoizedPortfolioData.portfolWidth > 0) {
      setPortfolWidth(memoizedPortfolioData.portfolWidth);
      return;
    }
    
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
          // Store in memoized data
          if (!memoizedPortfolioData) {
            memoizedPortfolioData = {
              portfolWidth: portfolWidthValue,
              oFinalX: 0,
              lineFinalWidth: 0,
              iOriginalPosition: 0,
              oStartX: 0,
              iWidth: 0,
              containerWidth: 0
            };
          } else {
            memoizedPortfolioData.portfolWidth = portfolWidthValue;
          }
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
      
      // Only reset Engineer text if animation wasn't completed (to allow restoration later)
      if (!animationEverCompleted && engineerTextRef.current) {
        gsap.set(engineerTextRef.current, {
          opacity: 0,
          filter: "blur(10px)",
        });
      }


      // Only reset SVG text elements if animation wasn't completed
      if (!animationEverCompleted && numberSevenRef.current) {
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
      
      // Only reset portfolio elements if animation wasn't completed (to allow restoration later)
      // Don't reset if animation was already completed - we'll restore it when active again
      if (!portfolioAnimationEverCompleted) {
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
      }
      // Reset dot animation started state when hero becomes inactive
      setIsDotAnimationStarted(false);
      return;
    }
    
    // When hero becomes active again, restore portfolio if animation was completed
    if (isActive && memoizedPortfolioData && portfolioCalculated && portfolioAnimationEverCompleted) {
      // Restore portfolio immediately when active
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const fullTextEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-full") as HTMLElement;
          const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol") as HTMLElement;
          const iEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-i") as HTMLElement;
          const oEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-o") as HTMLElement;
          const lineEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-line") as HTMLElement;
          
          if (fullTextEl && portfolEl && iEl && oEl && lineEl) {
            // Hide full text and show split elements
            fullTextEl.style.display = "none";
            portfolEl.style.display = "inline";
            iEl.style.display = "none"; // I is replaced by line
            oEl.style.display = "inline";
            lineEl.style.display = "block";
            
            // Restore final positions
            const data = memoizedPortfolioData;
            gsap.set([portfolEl, oEl], {
              display: "inline",
              opacity: 1,
            });
            gsap.set(iEl, {
              display: "none",
              opacity: 0,
              rotation: 90,
            });
            if (data) {
              gsap.set(oEl, {
                x: data.oFinalX,
              });
              gsap.set(lineEl, {
                display: "block",
                opacity: 1,
                x: data.iOriginalPosition,
                width: data.lineFinalWidth,
                transformOrigin: "left center",
              });
            }
            
            // Mark as complete immediately
            setIsPortfolioAnimationComplete(true);
          }
        });
      });
    }
    
    // Wait for dot animation to start before starting portfolio animation
    if (!isDotAnimationStarted) return;
    
    // If portfolio data is already calculated, restore final positions without replaying
    // Even if animation didn't complete, we should show elements at their final positions
    if (memoizedPortfolioData && portfolioCalculated) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const fullTextEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-full") as HTMLElement;
          const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol") as HTMLElement;
          const iEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-i") as HTMLElement;
          const oEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-o") as HTMLElement;
          const lineEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-line") as HTMLElement;
          
          if (fullTextEl && portfolEl && iEl && oEl && lineEl) {
            // Hide full text and show split elements
            fullTextEl.style.display = "none";
            portfolEl.style.display = "inline";
            iEl.style.display = "none"; // I is replaced by line
            oEl.style.display = "inline";
            lineEl.style.display = "block";
            
            // Restore final positions
            const data = memoizedPortfolioData;
            gsap.set([portfolEl, oEl], {
              display: "inline",
              opacity: 1,
            });
            gsap.set(iEl, {
              display: "none",
              opacity: 0,
              rotation: 90,
            });
            if (data) {
              gsap.set(oEl, {
                x: data.oFinalX,
              });
              gsap.set(lineEl, {
                display: "block",
                opacity: 1,
                x: data.iOriginalPosition,
                width: data.lineFinalWidth,
                transformOrigin: "left center",
              });
            }
            
            // Mark as complete immediately
            setIsPortfolioAnimationComplete(true);
          }
        });
      });
      return;
    }
    
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

      // Skip animations on mobile - set to final state immediately
      if (isMobileScreen()) {
        // Hide full text and show split text
        fullTextElement.style.display = "none";
        portfolElement.style.display = "inline";
        portfolElement.style.opacity = "1";
        portfolElement.style.visibility = "visible";
        iElement.style.display = "none"; // Hide I on mobile
        oEl.style.display = "inline";
        oEl.style.opacity = "1";
        oEl.style.visibility = "visible";
        lineEl.style.display = "block";
        lineEl.style.opacity = "1";
        lineEl.style.visibility = "visible";
        
        // Set final positions immediately - use multiple frames to ensure visibility
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const containerRect = portfolioHeaderRef.current?.getBoundingClientRect();
            if (containerRect) {
              const padding = window.innerWidth < 768 ? 16 : 32;
              const absoluteEndPosition = containerRect.width - padding;
              
              // Force reflow to ensure elements are measured
              void portfolElement.offsetWidth;
              void oEl.offsetWidth;
              
              // Get positions after elements are displayed
              const oRect = oEl.getBoundingClientRect();
              const oWidth = oRect.width;
              const oFinalLeftEdge = absoluteEndPosition - (oWidth / 2);
              
              // Get PORTFOL end position for line start
              const portfolRect = portfolElement.getBoundingClientRect();
              const lEndPosition = portfolRect.right - containerRect.left;
              
              // Line starts after PORTFOL and ends before O
              const lineStartX = lEndPosition + 8; // Small gap after PORTFOL
              const lineEndPosition = oFinalLeftEdge - 8; // Small gap before O
              const finalLineWidth = Math.max(0, lineEndPosition - lineStartX);
              
              // Position O at final location
              const oStartX = oRect.left - containerRect.left;
              const oFinalX = oFinalLeftEdge - oStartX;
              
              // Set styles directly to ensure visibility
              portfolElement.style.opacity = "1";
              portfolElement.style.visibility = "visible";
              portfolElement.style.display = "inline";
              
              oEl.style.opacity = "1";
              oEl.style.visibility = "visible";
              oEl.style.display = "inline";
              
              lineEl.style.opacity = "1";
              lineEl.style.visibility = "visible";
              lineEl.style.display = "block";
              
              gsap.set(oEl, { x: oFinalX, opacity: 1 });
              
              // Ensure line is positioned at 50% vertically (centered)
              // Use CSS for positioning to avoid conflicts
              lineEl.style.top = "50%";
              lineEl.style.position = "absolute";
              lineEl.style.left = `${lineStartX}px`;
              lineEl.style.width = `${finalLineWidth}px`;
              lineEl.style.opacity = "1";
              lineEl.style.display = "block";
              lineEl.style.transform = "translateY(-50%)";
              lineEl.style.zIndex = "1"; // Keep line below navigation
              
              // Use GSAP for opacity only
              gsap.set(lineEl, { 
                opacity: 1,
                display: "block"
              });
              
              // Ensure all elements are visible with GSAP as well
              gsap.set([portfolElement, oEl, lineEl], { 
                opacity: 1, 
                visibility: "visible",
                display: "auto"
              });
              
              // Mark as complete
              setIsPortfolioAnimationComplete(true);
              portfolioAnimationEverCompleted = true;
            }
          });
        });
        return;
      }

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
          
          // Store calculated positions in memoized data
          if (!memoizedPortfolioData) {
            memoizedPortfolioData = {
              portfolWidth: portfolWidthValue,
              oFinalX: oFinalX,
              lineFinalWidth: finalLineWidth,
              iOriginalPosition: iOriginalPosition,
              oStartX: oStartX,
              iWidth: iWidth,
              containerWidth: containerRect.width
            };
          } else {
            memoizedPortfolioData.oFinalX = oFinalX;
            memoizedPortfolioData.lineFinalWidth = finalLineWidth;
            memoizedPortfolioData.iOriginalPosition = iOriginalPosition;
            memoizedPortfolioData.oStartX = oStartX;
            memoizedPortfolioData.iWidth = iWidth;
            memoizedPortfolioData.containerWidth = containerRect.width;
            memoizedPortfolioData.portfolWidth = portfolWidthValue;
          }
          portfolioCalculated = true;
          
          // Animate O movement and line expansion simultaneously
          gsap.to(oEl, {
            x: oFinalX,
            duration: 2.5,
            ease: "power2.out",
            onComplete: () => {
              animationComplete = true;
              setIsPortfolioAnimationComplete(true);
              portfolioAnimationEverCompleted = true;
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
      
      // Line is at 50% of container height with translateY(-50%), so its center is at 50% of container
      // Get the actual center Y position of the line (lineRect.top + lineRect.height/2)
      const lineCenterY = lineRect.top + lineRect.height / 2; // Actual center of the line
      
      // Store navigation Y position (absolute position relative to viewport) for use in other sections
      // Use the actual line center position
      const absoluteLineY = lineCenterY;
      setHeroNavigationY(absoluteLineY);
      
      // Store line data for use in other sections (absolute viewport positions)
      const absoluteLineEndX = containerRect.left + lineEndX;
      
      // Get O's actual position (where navigation should be)
      const oElForPosition = portfolioHeaderRef.current?.querySelector('.hero-cover-title-o') as HTMLElement;
      let oPositionX = absoluteLineEndX; // Default to line end if O not found
      if (oElForPosition) {
        const oRect = oElForPosition.getBoundingClientRect();
        oPositionX = oRect.left; // O's left edge absolute position
      }
      
      setHeroLineData({
        lineY: absoluteLineY, // This is now the actual center Y position of the line
        lineEndX: absoluteLineEndX, // Line ends here (before O)
        lineWidth: lineWidth,
        oPositionX: oPositionX, // O's position (where navigation should be)
      });
      
      // Position navigation at the end of the line, aligned to the right with no gap
      // Hero nav uses position: absolute, so we calculate relative position from absolute
      // Other sections use position: fixed with absoluteLineY (absolute viewport position)
      // Center links in the space between top of viewport and the line
      // Calculate absolute Y position (center between 0 and lineY)
      const navAbsoluteY = absoluteLineY / 2; // Center between top (0) and line (absoluteLineY)
      // Convert to relative position for hero (absolute - container top)
      const navRelativeY = navAbsoluteY - containerRect.top;
      if (navRef.current) {
        navRef.current.style.top = `${navRelativeY}px`;
        navRef.current.style.left = `${lineEndX}px`;
        navRef.current.style.transform = 'translate(-100%, -50%)'; // Align to the right end of the line
        navRef.current.style.zIndex = '101'; // Ensure navigation is above the line
        navRef.current.style.marginLeft = '0'; // Ensure no gap
        navRef.current.style.paddingLeft = '0'; // Ensure no gap
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
    
    // Handle window resize - clear memoized positions to force recalculation
    const handleResize = () => {
      positionsCalculated = false;
      memoizedPositions = null;
      // Recalculate positions if animation was completed
      if (animationEverCompleted && svgMariamTextRef.current && numberSevenRef.current && 
          svgIRef.current && svgA2Ref.current && svgM2Ref.current) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Rebuild timeline to recalculate positions
            const dotTimeline = buildDotTimeline();
            if (dotTimeline && svgFinalDotRef.current && memoizedPositions) {
              const pos = memoizedPositions;
              // Apply mobile size reduction if on mobile
              const currentDotSize = isMobileScreen() ? Math.min(pos.finalDotSize * 0.6, 40) : pos.finalDotSize;
              // Update dot size and position
              svgFinalDotRef.current.style.width = `${currentDotSize}px`;
              svgFinalDotRef.current.style.height = `${currentDotSize}px`;
              gsap.set(svgFinalDotRef.current, {
                x: pos.iScreenX - (currentDotSize / 2),
                y: pos.iScreenY,
                scale: 1,
                opacity: 1,
                immediateRender: true,
                force3D: true,
                onComplete: () => {
                  // Force engineer text z-index after dot is positioned
                  if (engineerTextRef.current) {
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                }
              });
              
              // Also set immediately
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (engineerTextRef.current) {
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                });
              });
            }
          });
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // If positions are already calculated, just position the dot at final position
    // Even if animation didn't complete, we should show elements at their final positions
    if (memoizedPositions && positionsCalculated) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Restore dot at final position without replaying animation
          if (svgMariamTextRef.current && numberSevenRef.current && 
              svgIRef.current && svgA2Ref.current && svgM2Ref.current) {
            const pos = memoizedPositions;
            
            // Check if dot already exists in DOM, otherwise create it
            let finalDot = svgFinalDotRef.current;
            if (!finalDot) {
              // Try to find existing dot in DOM
              const existingDot = document.querySelector('.final-i-dot-svg') as HTMLDivElement;
              if (existingDot) {
                svgFinalDotRef.current = existingDot;
                finalDot = existingDot;
              } else {
                // Create new dot element
                finalDot = document.createElement("div");
                finalDot.className = "final-i-dot-svg";
                svgFinalDotRef.current = finalDot;
                document.body.appendChild(finalDot);
              }
            }
            
            // Ensure dot is visible and positioned at final location
            if (pos) {
              // Apply mobile size reduction if on mobile
              const currentDotSize = isMobileScreen() ? Math.min(pos.finalDotSize * 0.6, 40) : pos.finalDotSize;
              finalDot.style.width = `${currentDotSize}px`;
              finalDot.style.height = `${currentDotSize}px`;
              finalDot.style.borderRadius = "50%";
              finalDot.style.backgroundColor = "#6B2138";
              finalDot.style.position = "fixed";
              finalDot.style.zIndex = "1";
              finalDot.style.setProperty('z-index', '1', 'important');
              finalDot.style.opacity = "1";
              finalDot.style.display = "block";
              finalDot.style.visibility = "visible";
              finalDot.style.pointerEvents = "none";
              finalDot.style.transformOrigin = "center center";
              
              // Position at final location immediately
              gsap.set(finalDot, {
                x: pos.iScreenX - (currentDotSize / 2),
                y: pos.iScreenY,
                scale: 1,
                opacity: 1,
                immediateRender: true,
                force3D: true
              });
              
              // Color the letters if they aren't already colored
              if (svgIRef.current) {
                gsap.set(svgIRef.current, { fill: "#6B2138" });
              }
              if (svgA2Ref.current) {
                gsap.set(svgA2Ref.current, { fill: "#6B2138" });
              }
              if (svgM2Ref.current) {
                gsap.set(svgM2Ref.current, { fill: "#6B2138" });
              }
              
              // Ensure engineer text is always above the dot - set immediately after dot positioning
              requestAnimationFrame(() => {
                if (engineerTextRef.current) {
                  engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                  engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                }
                // Set again on next frame to be absolutely sure
                requestAnimationFrame(() => {
                  if (engineerTextRef.current) {
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                });
              });
              
              // Mark animation as complete so text animations can run
              setIsDotAnimationComplete(true);
              setIsDotAnimationStarted(true);
              
              // Also restore engineer text and SVG text elements to final visible state
              // This ensures they appear even if animation didn't complete before navigation
              if (!isMobileScreen()) {
                requestAnimationFrame(() => {
                  // Restore engineer text
                  if (engineerTextRef.current) {
                    gsap.set(engineerTextRef.current, {
                      opacity: 1,
                      filter: "blur(0px)",
                      immediateRender: true,
                    });
                    engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
                    engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
                  }
                  
                  // Restore SVG text elements (TURNING, REAL LIFE PRODUCTS, IDEAS, INTO)
                  if (numberSevenRef.current) {
                    const svg = numberSevenRef.current;
                    const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
                    const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
                    const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
                    const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
                    
                    if (turningIdeas) {
                      gsap.set(turningIdeas, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (realLifeProducts) {
                      gsap.set(realLifeProducts, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (ideasText) {
                      gsap.set(ideasText, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                    if (intoText) {
                      gsap.set(intoText, {
                        opacity: 0.6,
                        filter: "blur(0px)",
                        immediateRender: true,
                      });
                    }
                  }
                });
              }
            }
          }
        });
      });
      return;
    }
    
    // Skip animations on mobile - set to final state immediately
    if (isMobileScreen()) {
      const timeoutId = setTimeout(() => {
        if (svgMariamTextRef.current && numberSevenRef.current && 
            svgIRef.current && svgA2Ref.current && svgM2Ref.current) {
          // Build timeline to calculate positions (but don't play it)
          const dotTimeline = buildDotTimeline();
          if (dotTimeline && memoizedPositions) {
            const pos = memoizedPositions;
            
            // Get the final dot (created by buildDotTimeline)
            let finalDot = svgFinalDotRef.current;
            if (!finalDot) {
              finalDot = document.createElement("div");
              finalDot.className = "final-i-dot-svg";
              svgFinalDotRef.current = finalDot;
              document.body.appendChild(finalDot);
            }
            
            // Set dot to final state immediately - ensure smaller size on mobile
            const mobileDotSize = isMobileScreen() ? Math.min(pos.finalDotSize * 0.6, 40) : pos.finalDotSize;
            finalDot.style.width = `${mobileDotSize}px`;
            finalDot.style.height = `${mobileDotSize}px`;
            finalDot.style.borderRadius = "50%";
            finalDot.style.backgroundColor = "#6B2138";
            finalDot.style.position = "fixed";
            finalDot.style.zIndex = "1";
            finalDot.style.opacity = "1";
            finalDot.style.display = "block";
            finalDot.style.visibility = "visible";
            finalDot.style.pointerEvents = "none";
            
            gsap.set(finalDot, {
              x: pos.iScreenX - (mobileDotSize / 2),
              y: pos.iScreenY,
              scale: 1,
              opacity: 1,
              immediateRender: true,
              force3D: true
            });
            
            // Color the letters immediately
            if (svgIRef.current) gsap.set(svgIRef.current, { fill: "#6B2138" });
            if (svgA2Ref.current) gsap.set(svgA2Ref.current, { fill: "#6B2138" });
            if (svgM2Ref.current) gsap.set(svgM2Ref.current, { fill: "#6B2138" });
            
            // Ensure engineer text is above dot
            if (engineerTextRef.current) {
              engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
              engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
            }
            
            // Mark as complete
            setIsDotAnimationComplete(true);
            setIsDotAnimationStarted(true);
            animationEverCompleted = true;
          }
        }
      }, 200);
      
      return () => {
        clearTimeout(timeoutId);
      };
    }

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

  // Ensure engineer text is always above dot whenever dot animation completes or starts
  useEffect(() => {
    if (!isDotAnimationComplete && !isDotAnimationStarted) return;
    
    const forceEngineerAbove = () => {
      // First, ensure dot is at lower z-index
      const dot = document.querySelector('.final-i-dot-svg') as HTMLElement;
      if (dot) {
        dot.style.setProperty('z-index', '1', 'important');
      }
      
      // Then ensure engineer text is above
      if (engineerTextRef.current) {
        engineerTextRef.current.style.setProperty('z-index', '10000', 'important');
        engineerTextRef.current.style.setProperty('position', 'fixed', 'important');
      }
    };
    
    // Set immediately and multiple times
    forceEngineerAbove();
    requestAnimationFrame(() => {
      forceEngineerAbove();
      requestAnimationFrame(() => {
        forceEngineerAbove();
        requestAnimationFrame(forceEngineerAbove);
      });
    });
    
    // Set after delays to catch any late updates
    setTimeout(forceEngineerAbove, 10);
    setTimeout(forceEngineerAbove, 50);
    setTimeout(forceEngineerAbove, 100);
    setTimeout(forceEngineerAbove, 200);
    setTimeout(forceEngineerAbove, 500);
    setTimeout(forceEngineerAbove, 1000);
    
    // Also set up an interval to continuously ensure it
    const interval = setInterval(forceEngineerAbove, 100);
    
    return () => clearInterval(interval);
  }, [isDotAnimationComplete, isDotAnimationStarted]);

  // Animate Engineer text and text on M strokes to appear with glitch effect after dot animation completes
  useEffect(() => {
    if (!isDotAnimationComplete) return;

    // Skip animations on mobile - set to final state immediately
    if (isMobileScreen()) {
      // Restore Engineer text immediately on mobile - ensure it shows full text
      if (engineerTextRef.current) {
        const engineerText = engineerTextRef.current;
        // Ensure text is fully displayed (restore from typewriter animation)
        if (!engineerText.textContent || engineerText.textContent.trim() === '') {
          engineerText.textContent = "Software  Engineer";
        }
        // Ensure engineer text is always on top layer above the dot
        const forceZIndex = () => {
          engineerText.style.setProperty('z-index', '10000', 'important');
          engineerText.style.setProperty('position', 'fixed', 'important');
          // Also ensure dot is below
          const dot = document.querySelector('.final-i-dot-svg') as HTMLElement;
          if (dot) {
            dot.style.setProperty('z-index', '1', 'important');
          }
        };
        
        forceZIndex();
        requestAnimationFrame(() => {
          forceZIndex();
          requestAnimationFrame(forceZIndex);
        });
        
        gsap.set(engineerText, {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          y: 0,
          rotation: 0,
        });
      }


      // Restore SVG text elements immediately
      if (numberSevenRef.current) {
        const svg = numberSevenRef.current;
        const turningIdeas = svg.querySelector(".hero-turning-ideas") as SVGTextElement;
        const realLifeProducts = svg.querySelector(".hero-real-life-products") as SVGTextElement;
        const ideasText = svg.querySelector(".hero-ideas-text") as SVGTextElement;
        const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;

        if (turningIdeas) {
          turningIdeas.setAttribute("opacity", "0.6");
          turningIdeas.style.filter = "blur(0px)";
        }

        if (realLifeProducts) {
          realLifeProducts.setAttribute("opacity", "0.6");
          realLifeProducts.style.filter = "blur(0px)";
        }

        if (ideasText) {
          ideasText.setAttribute("opacity", "0.6");
          ideasText.style.filter = "blur(0px)";
        }

        if (intoText) {
          intoText.setAttribute("opacity", "0.6");
          intoText.style.filter = "blur(0px)";
        }
      }
      return; // Skip animation on mobile
    }

    // Animate Engineer text with typewriter effect (always run on desktop)
    if (engineerTextRef.current) {
      const engineerText = engineerTextRef.current;
      
      // Force engineer text to be above dot - set aggressively before animation
      const forceZIndex = () => {
        // First ensure dot is below
        const dot = document.querySelector('.final-i-dot-svg') as HTMLElement;
        if (dot) {
          dot.style.setProperty('z-index', '1', 'important');
        }
        // Then ensure engineer text is above
        engineerText.style.setProperty('z-index', '10000', 'important');
        engineerText.style.setProperty('position', 'fixed', 'important');
      };
      
      // Set immediately and multiple times BEFORE animation starts
      forceZIndex();
      requestAnimationFrame(() => {
        forceZIndex();
        requestAnimationFrame(() => {
          forceZIndex();
          requestAnimationFrame(forceZIndex);
        });
      });
      
      // Set again after delays
      setTimeout(forceZIndex, 10);
      setTimeout(forceZIndex, 50);
      setTimeout(forceZIndex, 100);
      
      // Move engineer text to body to ensure it's on top (z-index handles stacking)
      if (engineerText.parentElement !== document.body) {
        try {
          // Remove from current parent first to avoid conflicts
          if (engineerText.parentElement) {
            engineerText.parentElement.removeChild(engineerText);
          }
          // Append to body
          document.body.appendChild(engineerText);
        } catch (error) {
          // If removal fails, try to append anyway (might already be detached)
          try {
            document.body.appendChild(engineerText);
          } catch (e) {
            // Element might already be in body or detached, just set z-index
            console.warn('Could not move engineer text to body:', e);
          }
        }
      }
      
      // Kill any existing animations on this element first
      gsap.killTweensOf(engineerText);
      
      // Get the text content
      const fullText = engineerText.textContent || "Software  Engineer";
      const textArray = fullText.split('');
      
      // Clear the text initially
      engineerText.textContent = '';
      engineerText.style.opacity = "1"; // Make container visible
      
      // Ensure initial state with blur
      gsap.set(engineerText, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        filter: "blur(10px)", // Start with blur
      });
      
      // Small delay to ensure element is ready
      setTimeout(() => {
        // Verify element exists and is ready
        if (!engineerText || !engineerText.parentElement) {
          console.warn('Engineer text element not ready for animation');
          return;
        }
        
        // Create typewriter animation timeline
        const engineerTimeline = gsap.timeline({ delay: 0.2 });
        
        // Set z-index BEFORE animation
        engineerTimeline.call(forceZIndex);
        
        // Typewriter effect with blur - reveal each character one by one
        textArray.forEach((char, index) => {
          // Add character
          engineerTimeline.call(() => {
            // Add the next character
            engineerText.textContent += char;
            forceZIndex();
          }, null, index * 0.05); // 0.05 seconds per character
          
          // Gradually reduce blur as more characters are typed
          const blurAmount = Math.max(0, 10 - (index * 0.4)); // Reduce blur progressively
          engineerTimeline.to(engineerText, {
            filter: `blur(${blurAmount}px)`,
            duration: 0.08,
            ease: "power2.out",
          }, `-=${0.03}`); // Overlap slightly with character addition
        });
        
        // Final blur removal to ensure it's completely sharp
        engineerTimeline.to(engineerText, {
          filter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            forceZIndex();
            // Animation complete
            requestAnimationFrame(() => {
              forceZIndex();
              requestAnimationFrame(forceZIndex);
            });
          },
        });
      }, 150);
      
      // Also set during and after animation
      setTimeout(forceZIndex, 300);
      setTimeout(forceZIndex, 600);
      setTimeout(forceZIndex, 1500);
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

  // Position engineer text at top of Mariam on mobile
  useEffect(() => {
    if (!isMobileScreen() || !isMariamReady || !engineerTextRef.current || !numberSevenRef.current) return;
    
    const positionEngineerText = () => {
      if (!engineerTextRef.current || !numberSevenRef.current) return;
      
      const svg = numberSevenRef.current;
      const mariamTextElement = svg.querySelector('.hero-mariam-text') as SVGTextElement;
      
      if (!mariamTextElement) return;
      
      // Get SVG's screen position (it's positioned at bottom: 0)
      const svgRect = svg.getBoundingClientRect();
      
      // Get text's bounding box in SVG coordinates
      let textBBox;
      try {
        textBBox = mariamTextElement.getBBox();
      } catch (e) {
        return; // Can't get bbox, skip
      }
      
      // Get SVG viewBox for coordinate conversion
      const viewBox = svg.viewBox.baseVal;
      const svgHeight = svgRect.height;
      const scaleY = viewBox.height > 0 ? svgHeight / viewBox.height : 1;
      
      // SVG is positioned at bottom: 0, so svgRect.bottom = window.innerHeight
      // textBBox.y is the top of the text in SVG coordinates (relative to viewBox top)
      // textBBox.y + textBBox.height is the bottom of the text
      // The text's baseline is at the bottom of the SVG (y = mariamHeight in SVG)
      // So: text top in screen = SVG bottom - (viewBox.height - textBBox.y) * scaleY
      const mariamTopInScreen = svgRect.bottom - ((viewBox.height - textBBox.y) * scaleY);
      
      // Get engineer text height to position it directly above Mariam
      const engineerTextHeight = engineerTextRef.current ? engineerTextRef.current.getBoundingClientRect().height : 0;
      
      // Position engineer text directly above Mariam with minimal gap
      const engineerTopInScreen = mariamTopInScreen - engineerTextHeight - 4; // 4px minimal gap
      
      // Calculate the right edge of Mariam text (where "m" ends) to shift engineer text towards it
      const scaleX = viewBox.width > 0 ? svgRect.width / viewBox.width : 1;
      const mariamTextRight = svgRect.left + ((textBBox.x + textBBox.width) * scaleX);
      const screenWidth = window.innerWidth;
      // Shift slightly towards the "m" - position closer to the right edge of Mariam
      // Use a small percentage (15%) for a subtle shift
      const distanceFromRight = screenWidth - mariamTextRight;
      const rightPosition = Math.max(0.3, distanceFromRight * 0.15); // Shift 15% of the way towards "m", min 0.3rem
      
      // Position engineer text directly above Mariam, shifted towards "m"
      if (engineerTextRef.current) {
        engineerTextRef.current.style.setProperty('top', `${engineerTopInScreen}px`, 'important');
        engineerTextRef.current.style.setProperty('bottom', 'auto', 'important');
        engineerTextRef.current.style.setProperty('right', `${rightPosition}rem`, 'important');
        engineerTextRef.current.style.setProperty('transform', 'translateY(0)', 'important');
      }
    };
    
    // Position immediately and on resize
    requestAnimationFrame(() => {
      positionEngineerText();
      // Also position after delays to ensure SVG is fully rendered
      setTimeout(positionEngineerText, 100);
      setTimeout(positionEngineerText, 300);
      setTimeout(positionEngineerText, 500);
    });
    
    window.addEventListener('resize', positionEngineerText);
    
    return () => {
      window.removeEventListener('resize', positionEngineerText);
    };
  }, [isMariamReady, isDotAnimationComplete]);

  // Prevent body scrolling on mobile
  useEffect(() => {
    if (!isMobileScreen()) return;
    
    // Prevent scrolling on body and html
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyOverflowY = document.body.style.overflowY;
    const originalBodyHeight = document.body.style.height;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalHtmlOverflowY = document.documentElement.style.overflowY;
    const originalHtmlHeight = document.documentElement.style.height;
    
    document.body.style.overflow = 'hidden';
    document.body.style.overflowY = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';
    document.body.style.left = '0';
    
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overflowY = 'hidden';
    document.documentElement.style.height = '100vh';
    
    // Prevent scroll with touch events
    const preventScroll = (e: TouchEvent) => {
      // Allow scrolling within the hero section if needed, but prevent body scroll
      const target = e.target as HTMLElement;
      if (target.closest('#hero')) {
        // Allow touch events within hero
        return;
      }
      e.preventDefault();
    };
    
    // Prevent scroll with wheel events
    const preventWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('wheel', preventWheel, { passive: false });
    
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.overflowY = originalBodyOverflowY;
      document.body.style.height = originalBodyHeight;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.documentElement.style.overflowY = originalHtmlOverflowY;
      document.documentElement.style.height = originalHtmlHeight;
      
      document.removeEventListener('touchmove', preventScroll);
      document.removeEventListener('wheel', preventWheel);
    };
  }, []);

  // Position and size the SVG number 7 directly below PORTFOL
  useEffect(() => {
    if (!numberSevenRef.current || portfolWidth === 0 || !portfolioHeaderRef.current) return;

    const svg = numberSevenRef.current;
    const portfolElement = portfolioHeaderRef.current.querySelector('.hero-cover-title-portfol') as HTMLElement;
    
    if (!portfolElement) return;
    
    // Use memoized SVG data if available
    let fontSize: number = 0;
    let mariamWidth: number = 0;
    let mariamHeight: number = 0;
    let portfolBottom: number = 0;
    let portfolLeft: number = 0;
    let portfolFontSize: number = 0;
    let screenWidth: number = 0;
    let screenHeight: number = 0;
    
    // Calculate mobile bottom padding to prevent cropping
    // Use visual viewport height on mobile to account for browser UI
    const getViewportHeight = () => {
      if (isMobileScreen() && typeof window !== 'undefined' && (window as any).visualViewport) {
        return (window as any).visualViewport.height;
      }
      return window.innerHeight;
    };
    const mobileBottomPadding = isMobileScreen() ? 40 : 0; // Increased padding for mobile browser UI
    
    if (memoizedMariamSvgData && mariamSvgCalculated) {
      // Use memoized values, but on mobile always recalculate when hero becomes active
      // to ensure correct positioning with current viewport
      const currentScreenHeight = getViewportHeight();
      const currentScreenWidth = window.innerWidth;
      
      // On mobile, always recalculate when hero is active to ensure correct positioning
      // On desktop, use memoized if screen size hasn't changed significantly
      // Force recalculation on mobile when returning to hero to get fresh viewport measurements
      const shouldRecalculate = isMobileScreen() && isActive;
      
      if (!shouldRecalculate && (
        Math.abs(currentScreenHeight - memoizedMariamSvgData.screenHeight) <= 50 &&
        Math.abs(currentScreenWidth - memoizedMariamSvgData.screenWidth) <= 50
      )) {
        // Use memoized values directly
        fontSize = memoizedMariamSvgData.fontSize;
        mariamWidth = memoizedMariamSvgData.mariamWidth;
        mariamHeight = memoizedMariamSvgData.mariamHeight;
        portfolBottom = memoizedMariamSvgData.portfolBottom;
        portfolLeft = memoizedMariamSvgData.portfolLeft;
        portfolFontSize = memoizedMariamSvgData.portfolFontSize;
        screenWidth = memoizedMariamSvgData.screenWidth;
        screenHeight = memoizedMariamSvgData.screenHeight;
        
        // Apply memoized values directly
        const padding = 10;
        svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
        svg.setAttribute("width", `${mariamWidth}px`);
        svg.setAttribute("height", `${mariamHeight}px`);
        svg.style.position = "fixed";
        svg.style.left = "0px";
        svg.style.top = "auto";
        // On mobile, add bottom padding to prevent cropping by browser UI
        const bottomOffset = isMobileScreen() ? mobileBottomPadding : 0;
        svg.style.bottom = `${bottomOffset}px`;
        svg.style.margin = "0";
        svg.style.padding = "0";
        svg.style.height = `${mariamHeight}px`;
        svg.style.width = `${mariamWidth}px`;
        svg.style.overflow = "visible";
        
        // Update text element with memoized values
        const textElement = svg.querySelector(".hero-mariam-text");
        if (textElement) {
          textElement.setAttribute("x", "0");
          textElement.setAttribute("y", `${mariamHeight}px`);
          textElement.setAttribute("dominant-baseline", "baseline");
          textElement.setAttribute("text-anchor", "start");
          textElement.setAttribute("dx", "0");
          textElement.setAttribute("font-size", `${fontSize}px`);
          textElement.setAttribute("font-family", '"Momo Trust Display", "Stack Sans", sans-serif');
          textElement.setAttribute("font-weight", "700");
          textElement.setAttribute("letter-spacing", "0");
        }
        
        return; // Skip recalculation
      }
      // If screen size changed, fall through to recalculate below
    }
    
    // Calculate values (first time only)
    // Get PORTFOL element position and styling
    const portfolRect = portfolElement.getBoundingClientRect();
    portfolBottom = portfolRect.bottom;
    portfolLeft = portfolRect.left;
    const portfolStyle = window.getComputedStyle(portfolElement);
    portfolFontSize = parseFloat(portfolStyle.fontSize);
    
    // Calculate the required height: from PORTFOL bottom to screen bottom
    // Use visual viewport on mobile to get accurate height
    screenHeight = getViewportHeight();
    screenWidth = window.innerWidth;
    
    // On mobile, always position Mariam at the bottom of the screen regardless of PORTFOL position
    // On desktop, use the space from PORTFOL to screen bottom
    let availableHeight: number;
    if (isMobileScreen()) {
      // On mobile: always position Mariam at the bottom with a responsive height
      // Use a percentage of screen height that adapts to different screen sizes
      // Smaller screens get more space, larger mobile screens get less
      const mobileBottomSpace = Math.min(screenHeight * 0.3, 200); // Max 200px or 30% of screen, whichever is smaller
      availableHeight = mobileBottomSpace;
    } else {
      // Desktop: use full height from PORTFOL to screen bottom
      availableHeight = screenHeight - portfolBottom - mobileBottomPadding;
    }
    
    // Use canvas to measure text and find font size where horizontal stroke of "7" matches portfolWidth
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set font properties to match PORTFOL exactly
    context.font = `700 ${portfolFontSize}px "Momo Trust Display", "Stack Sans", sans-serif`;
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
    tempText.setAttribute("font-family", '"Momo Trust Display", "Stack Sans", sans-serif');
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
    const targetWidth = screenWidth - 2; // Small margin to prevent clipping of last "m"
    const widthPerFontSize = baseTextWidth / baseFontSize;
    fontSize = targetWidth / widthPerFontSize;
    
    // Get final text metrics
    context.font = `700 ${fontSize}px "Space Grotesk", "Inter", sans-serif`;
    context.letterSpacing = "0"; // No letter spacing
    const finalMetrics = context.measureText("Mariam");
    const textWidth = finalMetrics.width;
    
    // Calculate SVG dimensions - make it span the full screen width
    // Add small padding to viewBox to prevent clipping of the last letter
    const padding = 10; // Small padding to prevent clipping
    mariamWidth = screenWidth;
    mariamHeight = availableHeight;
    
    // Set SVG viewBox with padding to prevent clipping, but keep width at full screen
    svg.setAttribute("viewBox", `-${padding} 0 ${mariamWidth + padding * 2} ${mariamHeight}`);
    svg.setAttribute("width", `${mariamWidth}px`);
    svg.setAttribute("height", `${mariamHeight}px`);
    
      // Position SVG at bottom of screen
      svg.style.position = "fixed";
      svg.style.left = "0px";
      svg.style.top = "auto";
      // On mobile, always position at bottom with padding to prevent cropping
      // On desktop, position relative to PORTFOL
      const bottomOffset = isMobileScreen() ? mobileBottomPadding : 0;
      svg.style.bottom = `${bottomOffset}px`; // Anchor SVG at bottom of screen
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
      textElement.setAttribute("font-family", '"Momo Trust Display", "Stack Sans", sans-serif');
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
          
          // We want text bottom to be slightly above the bottom of SVG to prevent clipping
          // Account for mobile browser UI by leaving some space
          const bottomMargin = isMobileScreen() ? 5 : 0;
          const targetBottom = mariamHeight - bottomMargin;
          if (Math.abs(textBottom - targetBottom) > 0.1) {
            const yAdjustment = targetBottom - (textBbox.y + textBbox.height);
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
          const targetWidthForScale = screenWidth - 2; // Small margin to prevent clipping
          const widthScaleFactor = targetWidthForScale / actualTextWidth;
          const heightScaleFactor = mariamHeight / actualTextHeight;
          
          // Prioritize width (edge to edge) but ensure height fits too
          // Use the smaller scale factor to ensure text fits within bounds
          const finalScaleFactor = Math.min(widthScaleFactor, heightScaleFactor);
          
          if (finalScaleFactor > 1.01 || finalScaleFactor < 0.99) { // Only adjust if significantly different
            const adjustedFontSize = fontSize * finalScaleFactor;
            fontSize = adjustedFontSize; // Update fontSize with adjusted value
            textElement.setAttribute("font-size", `${adjustedFontSize}px`);
            
            // Store memoized SVG data after final fontSize is determined
            memoizedMariamSvgData = {
              fontSize: adjustedFontSize,
              mariamWidth,
              mariamHeight,
              portfolBottom,
              portfolLeft,
              portfolFontSize,
              screenWidth,
              screenHeight
            };
            mariamSvgCalculated = true;
            
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
                
                // We want the bottom of the text to be slightly above bottom to prevent clipping
                const bottomMargin = isMobileScreen() ? 5 : 0;
                const targetBottom = mariamHeight - bottomMargin;
                if (Math.abs(newTextBottom - targetBottom) > 0.1) {
                  const yBottomAdjustment = targetBottom - (newBbox.y + newBbox.height);
                  textElement.setAttribute("y", yBottomAdjustment.toString());
                }
              } catch (e) {
                // Ignore
              }
            });
          } else {
            // Font size is correct, just ensure positioning
            textElement.setAttribute("x", "0");
            
            // Store memoized SVG data
            memoizedMariamSvgData = {
              fontSize,
              mariamWidth,
              mariamHeight,
              portfolBottom,
              portfolLeft,
              portfolFontSize,
              screenWidth,
              screenHeight
            };
            mariamSvgCalculated = true;
            
            // Ensure bottom alignment
            requestAnimationFrame(() => {
              try {
                const bbox = (textElement as SVGTextElement).getBBox();
                const currentY = parseFloat(textElement.getAttribute("y") || mariamHeight.toString());
                const textBottom = currentY + bbox.y + bbox.height;
                const bottomMargin = isMobileScreen() ? 5 : 0;
                const targetBottom = mariamHeight - bottomMargin;
                if (Math.abs(textBottom - targetBottom) > 0.1) {
                  const yAdjustment = targetBottom - (bbox.y + bbox.height);
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
        tempM.setAttribute("font-family", '"Momo Trust Display", "Stack Sans", sans-serif');
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
          intoText.setAttribute("fill", "#6B2138");
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
          ideasText.setAttribute("fill", "#6B2138");
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
          turningIdeas.setAttribute("fill", "#6B2138");
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
          realLifeProducts.setAttribute("fill", "#6B2138");
          realLifeProducts.style.filter = "blur(10px)";
        }
        
      } catch (e) {
        // Ignore errors
      }
    };
    
    // buildDotTimeline is now defined outside this useEffect
    
    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout | null = null;
    
    const handleResize = () => {
      // Clear previous timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      // Debounce resize handler (300ms delay)
      resizeTimeout = setTimeout(() => {
        // Skip recalculation on mobile - use memoized data if available
        if (isMobileScreen()) {
          // On mobile, only recalculate if screen size actually changed significantly
          if (memoizedMariamSvgData) {
            const currentWidth = window.innerWidth;
            const currentHeight = window.innerHeight;
            // Only recalculate if screen size changed by more than 100px (to avoid scroll artifacts)
            if (Math.abs(currentWidth - memoizedMariamSvgData.screenWidth) < 100 &&
                Math.abs(currentHeight - memoizedMariamSvgData.screenHeight) < 100) {
              return; // Skip recalculation for small changes (likely scroll artifacts)
            }
          } else {
            // If no memoized data, allow calculation but only once
            // This will be handled by the main calculation logic
          }
        }
        
        if (portfolWidth > 0 && portfolElement) {
          const svg = numberSevenRef.current;
          if (!svg) return;
          
          // Clear memoized data on resize to force recalculation
          mariamSvgCalculated = false;
          memoizedMariamSvgData = null;
          
          const newPortfolRect = portfolElement.getBoundingClientRect();
          const newScreenHeight = window.innerHeight;
          const newScreenWidth = window.innerWidth;
          // No bottom frame, so use full height from PORTFOL to screen bottom
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
          newTempText.setAttribute("font-family", '"Momo Trust Display", "Stack Sans", sans-serif');
          newTempText.setAttribute("font-weight", "700");
          newTempText.setAttribute("letter-spacing", "0"); // No letter spacing
          newTempText.textContent = "Mariam"; // Only first letter capital
          newTempSvg.appendChild(newTempText);
          
          const newTempBbox = newTempText.getBBox();
          const newBaseTextWidth = newTempBbox.width;
          const newBaseFontSize = 200;
          const newWidthPerFontSize = newBaseTextWidth / newBaseFontSize;
          
          // Use the newScreenWidth already calculated above
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
          svg.style.bottom = "0px"; // Anchor SVG at bottom of screen
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
        }
      }, 300); // 300ms debounce delay
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
    };
  }, [portfolWidth, isActive]); // Recalculate when hero becomes active (especially on mobile)

  return (
    <section
      id="hero"
      className="flex h-screen w-full flex-col items-center justify-center text-center text-[#280B0B] relative overflow-hidden"
      style={{
        backgroundColor: "#F9E7C9",
        ...(isMobileScreen() && {
          overflowY: 'hidden',
          height: '100vh',
          maxHeight: '100vh',
        }),
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
            fontFamily='"Momo Trust Display", "Stack Sans", sans-serif'
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
        </svg>
      )}

      {/* Engineer text - bottom right, white, on top layer - rendered via Portal to body */}
      {typeof document !== 'undefined' && createPortal(
        <div
          ref={(el) => {
            engineerTextRef.current = el;
            // Set z-index immediately when element is mounted
            if (el) {
              requestAnimationFrame(() => {
                el.style.setProperty('z-index', '10000', 'important');
                el.style.setProperty('position', 'fixed', 'important');
                
                // Also ensure dot is below
                const dot = document.querySelector('.final-i-dot-svg');
                if (dot) {
                  (dot as HTMLElement).style.setProperty('z-index', '1', 'important');
                }
                
                // Set again on next frame to be sure
                requestAnimationFrame(() => {
                  el.style.setProperty('z-index', '10000', 'important');
                  el.style.setProperty('position', 'fixed', 'important');
                });
              });
            }
          }}
          className="hero-engineer-text"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "clamp(0.5rem, 2vw, 2rem)",
            color: "#280B0B",
            fontFamily: '"Miserable Emillia", cursive',
            fontSize: isMobileScreen() ? "clamp(1.5rem, 5vw, 3.5rem)" : "clamp(2rem, 15vw, 11rem)",
            zIndex: 10000,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            opacity: 0,
            filter: "blur(0px)",
          }}
        >
         Software  Engineer
        </div>,
        document.body
      )}
      

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
          padding: clamp(1rem, 8vw, 6.25rem) 0 0 clamp(1rem, 8vw, 6.25rem);
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
            padding: clamp(1rem, 5vw, 3rem) 0 0 clamp(1rem, 5vw, 3rem);
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
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
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
            gap: 0.75rem;
          }
          
          .hero-nav-links a {
            font-size: clamp(0.4rem, 0.6vw, 0.55rem);
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
          background-color: #6B2138;
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
          height: clamp(60px, 8vw, 100px);
          border-radius: 0;
          padding-right: clamp(1rem, 2vw, 2rem);
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


        /* Portfolio Header in Top Frame */
        .hero-frame-marquee-top .hero-cover-header {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 0.5rem;
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
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
          font-size: clamp(2rem, 8vw, 6rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #280B0B;
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
          line-height: 1;
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          height: clamp(60px, 8vw, 100px);
        }
        
        @media (max-width: 768px) {
          .hero-cover-title-full,
          .hero-cover-title-portfol,
          .hero-cover-title-i,
          .hero-cover-title-o {
            font-size: clamp(1.5rem, 6vw, 3rem);
            height: clamp(50px, 12vw, 80px);
          }
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
          color: #280B0B;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          user-select: none;
          z-index: 10000 !important;
          position: fixed !important;
          isolation: isolate;
        }
        
        /* Ensure engineer text is always above dot - higher specificity */
        div.hero-engineer-text[style*="position"] {
          z-index: 10000 !important;
          position: fixed !important;
        }
        
        /* Override any inline styles that might interfere */
        div.hero-engineer-text {
          z-index: 10000 !important;
        }

        @media (max-width: 768px) {
          .hero-engineer-text {
            bottom: auto !important;
            font-size: clamp(1.5rem, 5vw, 3.5rem) !important;
            /* top and right will be set by JavaScript */
          }
        }
        
        @media (max-width: 480px) {
          .hero-engineer-text {
            font-size: clamp(1.2rem, 4.5vw, 2.8rem) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;