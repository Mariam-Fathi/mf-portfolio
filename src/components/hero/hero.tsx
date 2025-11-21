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
  const softwareEngineerRef = useRef<SVGTextElement | null>(null);
  const softwareRef = useRef<SVGTextElement | null>(null);
  const engineerRef = useRef<SVGTextElement | null>(null);
  const iamWrapperRef = useRef<HTMLSpanElement | null>(null);
  const iamRef = useRef<HTMLSpanElement | null>(null);
  const mLetterRef = useRef<HTMLSpanElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isPortfolioAnimationComplete, setIsPortfolioAnimationComplete] = useState(false);
  const [softwareEngineerFontSize, setSoftwareEngineerFontSize] = useState<string>("clamp(3rem, 6vw, 5rem)");
  const [softwareEngineerTransform, setSoftwareEngineerTransform] = useState<string>("");
  const [portfolWidth, setPortfolWidth] = useState<number>(0);
  const softwareEngineerWrapperRef = useRef<HTMLDivElement | null>(null);
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
  // Refs for Software Engineer SVG letters
  const softwareEngineerSvgRef = useRef<SVGSVGElement | null>(null);
  const seSRef = useRef<SVGTSpanElement | null>(null);
  const seORef = useRef<SVGTSpanElement | null>(null);
  const seFRef = useRef<SVGTSpanElement | null>(null);
  const seTRef = useRef<SVGTSpanElement | null>(null);
  const seWRef = useRef<SVGTSpanElement | null>(null);
  const seA1Ref = useRef<SVGTSpanElement | null>(null);
  const seR1Ref = useRef<SVGTSpanElement | null>(null);
  const seERef = useRef<SVGTSpanElement | null>(null);
  const seE1Ref = useRef<SVGTSpanElement | null>(null);
  const seN1Ref = useRef<SVGTSpanElement | null>(null);
  const seGRef = useRef<SVGTSpanElement | null>(null);
  const seIRef = useRef<SVGTSpanElement | null>(null);
  const seN2Ref = useRef<SVGTSpanElement | null>(null);
  const seE2Ref = useRef<SVGTSpanElement | null>(null);
  const seE3Ref = useRef<SVGTSpanElement | null>(null);
  const seR2Ref = useRef<SVGTSpanElement | null>(null);
  const seSoftwareTextRef = useRef<SVGTextElement | null>(null);
  const seEngineerTextRef = useRef<SVGTextElement | null>(null);
  const seFinalDotRef = useRef<HTMLDivElement | null>(null);

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
    // Hide Software Engineer final dot if it exists
    if (seFinalDotRef.current && seFinalDotRef.current.style.display !== "none") {
      gsap.to(seFinalDotRef.current, {
        opacity: 0,
        scale: 0,
                duration: 0.3,
        ease: "power2.in",
              onComplete: () => {
          if (seFinalDotRef.current) {
            seFinalDotRef.current.style.display = "none";
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

  // Removed HTML Mariam animations - now using only SVG Mariam

  // Removed font size calculation for HTML "iam" - now using SVG only

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
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              animationComplete = true;
              setIsPortfolioAnimationComplete(true);
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
          
          // Position "TURNING IDEAS" and "REAL LIFE PRODUCTS" on the M strokes
          // Wait for Mariam text to be fully rendered and positioned
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              try {
                positionTextsOnM(textElement as SVGTextElement, svg, fontSize);
                
                // Start dot animation after positioning is complete
                // Wait a bit longer to ensure text is fully rendered and positioned
                setTimeout(() => {
                  const svgDotTimeline = buildSvgDotTimeline();
                  if (svgDotTimeline) {
                    // Start animation with a slight delay after positioning
                    svgDotTimeline.play();
                  }
                }, 800);
              } catch (e) {
                // Ignore
              }
            });
          });
        } catch (e) {
          // BBox might not be available immediately
        }
      });
    }
    
    // Function to position "TURNING IDEAS" and "REAL LIFE PRODUCTS" on the M strokes
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
        
        // Position "INTO" at the center of M
        const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
        if (intoText) {
          intoText.setAttribute("x", mCenterX.toString());
          intoText.setAttribute("y", mCenterY.toString());
          intoText.setAttribute("text-anchor", "middle");
          intoText.setAttribute("dominant-baseline", "middle");
          intoText.setAttribute("opacity", "0.6");
          intoText.setAttribute("fill", "#280B0B");
        }
        
        // Calculate exact stroke dimensions for the M
        // The vertical strokes of M go from top to bottom
        const leftStrokeStartY = mY; // Top of left vertical stroke
        const leftStrokeEndY = mActualBottom; // Bottom of left vertical stroke
        const leftStrokeHeight = mActualHeight; // Full height of the stroke
        const leftStrokeX = mX; // X position of left vertical stroke
        
        const rightStrokeStartY = mY; // Top of right vertical stroke
        const rightStrokeEndY = mActualBottom; // Bottom of right vertical stroke
        const rightStrokeHeight = mActualHeight; // Full height of the stroke
        const rightStrokeX = mRightX; // X position of right vertical stroke
        
        // Position "TURNING IDEAS" on the left stroke of M
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
          turningIdeas.setAttribute("x", (leftStrokeX + offsetFromStroke).toString());
          turningIdeas.setAttribute("y", strokeCenterY.toString());
          turningIdeas.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
          turningIdeas.setAttribute("dominant-baseline", "middle"); // Center vertically
          // Rotate -90 degrees around the center of the stroke to make it vertical
          turningIdeas.setAttribute("transform", `rotate(-90 ${leftStrokeX - offsetFromStroke} ${strokeCenterY})`);
          turningIdeas.setAttribute("opacity", "0.6");
          turningIdeas.setAttribute("fill", "#280B0B");
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
          realLifeProducts.setAttribute("opacity", "0.6");
          realLifeProducts.setAttribute("fill", "#280B0B");
        }
        
        // Position "software engineer" above the "iam" part (i-a-m letters)
        const softwareText = seSoftwareTextRef.current;
        const engineerText = seEngineerTextRef.current;
        
        if (softwareText && engineerText) {
          // Measure the "iam" part (i-a-m letters) of Mariam
          const measureIam = () => {
            const tempIam = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tempIam.setAttribute("font-size", `${mariamFontSize}px`);
            tempIam.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
            tempIam.setAttribute("font-weight", "700");
            tempIam.setAttribute("letter-spacing", "0");
            tempIam.setAttribute("x", mariamTextElement.getAttribute("x") || "0");
            tempIam.setAttribute("y", mariamTextElement.getAttribute("y") || "0");
            tempIam.setAttribute("dominant-baseline", mariamTextElement.getAttribute("dominant-baseline") || "hanging");
            tempIam.setAttribute("text-anchor", "start");
            tempIam.textContent = "iam";
            tempIam.style.visibility = "hidden";
            svg.appendChild(tempIam);
            
            const iamBbox = tempIam.getBBox();
            svg.removeChild(tempIam);
            
            // Calculate position of "iam" relative to "Mariam"
            // "iam" starts after "Mar" (M-a-r)
            const measureMar = () => {
              const tempMar = document.createElementNS("http://www.w3.org/2000/svg", "text");
              tempMar.setAttribute("font-size", `${mariamFontSize}px`);
              tempMar.setAttribute("font-family", '"Space Grotesk", "Inter", sans-serif');
              tempMar.setAttribute("font-weight", "700");
              tempMar.setAttribute("letter-spacing", "0");
              tempMar.setAttribute("x", mariamTextElement.getAttribute("x") || "0");
              tempMar.setAttribute("y", mariamTextElement.getAttribute("y") || "0");
              tempMar.setAttribute("dominant-baseline", mariamTextElement.getAttribute("dominant-baseline") || "hanging");
              tempMar.setAttribute("text-anchor", "start");
              tempMar.textContent = "Mar";
              tempMar.style.visibility = "hidden";
              svg.appendChild(tempMar);
              
              const marBbox = tempMar.getBBox();
              svg.removeChild(tempMar);
              return marBbox;
            };
            
            const marBbox = measureMar();
            const iamStartX = marBbox.x + marBbox.width;
            const iamCenterX = iamStartX + iamBbox.width / 2;
            const iamTop = iamBbox.y;
            
            return {
              centerX: iamCenterX,
              top: iamTop,
              width: iamBbox.width,
              height: iamBbox.height
            };
          };
          
          const iamPos = measureIam();
          
          // Calculate font size for software engineer to match iam width (60% of iam width)
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (context) {
            context.font = '100px "Floralis Couture", cursive';
            const softwareMetrics = context.measureText("software");
            const engineerMetrics = context.measureText("engineer");
            const baseWidth = Math.max(softwareMetrics.width, engineerMetrics.width);
            const ratio = (iamPos.width / baseWidth) * 0.6;
            const targetFontSize = 100 * ratio;
            
            // Set font size
            const fontSizeInRem = targetFontSize / 16;
            const minSize = Math.max(1.5, fontSizeInRem * 0.7);
            const maxSize = Math.min(6, fontSizeInRem * 1.3);
            const vwSize = (targetFontSize / window.innerWidth) * 100;
            const fontSizeValue = `clamp(${minSize.toFixed(2)}rem, ${vwSize.toFixed(2)}vw, ${maxSize.toFixed(2)}rem)`;
            
            setSoftwareEngineerFontSize(fontSizeValue);
            
            // Position software engineer exactly on top of "iam" with rotation
            const fixedRotation = 0; // -8 degree slope
            
            // Get the actual bounding box of "iam" to position exactly above it
            const iamActualTop = iamPos.top; // Top of "iam" letters
            const iamActualBottom = iamPos.top + iamPos.height; // Bottom of "iam" letters
            
            // Measure software text to center it
            const tempSoftware = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tempSoftware.setAttribute("font-size", `${targetFontSize}px`);
            tempSoftware.setAttribute("font-family", '"Floralis Couture", cursive');
            tempSoftware.setAttribute("letter-spacing", "0.05em");
            tempSoftware.textContent = "software";
            tempSoftware.style.visibility = "hidden";
            svg.appendChild(tempSoftware);
            const softwareBbox = tempSoftware.getBBox();
            svg.removeChild(tempSoftware);
            
            const tempEngineer = document.createElementNS("http://www.w3.org/2000/svg", "text");
            tempEngineer.setAttribute("font-size", `${targetFontSize}px`);
            tempEngineer.setAttribute("font-family", '"Floralis Couture", cursive');
            tempEngineer.setAttribute("letter-spacing", "0.05em");
            tempEngineer.textContent = "engineer";
            tempEngineer.style.visibility = "hidden";
            svg.appendChild(tempEngineer);
            const engineerBbox = tempEngineer.getBBox();
            svg.removeChild(tempEngineer);
            
            // Calculate total height of both lines
            const totalHeight = softwareBbox.height + engineerBbox.height;
            
            // Position exactly on top of "iam" - align bottom of "engineer" with top of "iam"
            // Use negative spacing to achieve exact positioning (can overlap if needed)
            const spacing = -120; // Negative spacing for exact positioning (adjust as needed for overlap)
            const engineerY = iamActualTop - spacing;
            const softwareY = engineerY - engineerBbox.height +200;
            
            // Position software text
            softwareText.setAttribute("x", iamPos.centerX.toString());
            softwareText.setAttribute("y", softwareY.toString());
            softwareText.setAttribute("font-size", fontSizeValue);
            softwareText.setAttribute("text-anchor", "middle");
            softwareText.setAttribute("dominant-baseline", "hanging");
            softwareText.setAttribute("transform", `rotate(${fixedRotation} ${iamPos.centerX} ${softwareY})`);
            
            // Position engineer text
            engineerText.setAttribute("x", (iamPos.centerX+100).toString());
            engineerText.setAttribute("y", engineerY.toString());
            engineerText.setAttribute("font-size", fontSizeValue);
            engineerText.setAttribute("text-anchor", "middle");
            engineerText.setAttribute("dominant-baseline", "hanging");
            engineerText.setAttribute("transform", `rotate(${fixedRotation} ${iamPos.centerX} ${engineerY})`);
            
            // Start handwriting animation after positioning
            setTimeout(() => {
              // Helper function to animate a text element
              const animateText = (textElement: SVGTextElement, delay: number = 0) => {
                let bbox;
                try {
                  gsap.set(textElement, { opacity: 0.01, strokeOpacity: 0.01 });
                  bbox = textElement.getBBox();
                  if (!bbox || bbox.width === 0) {
                    throw new Error("Empty bbox");
                  }
                } catch (e) {
                  console.warn("Could not get BBox, using fallback", e);
                  const textContent = textElement.textContent || "";
                  const fontSize = parseFloat(window.getComputedStyle(textElement).fontSize) || 24;
                  const estimatedWidth = textContent.length * fontSize * 0.6;
                  bbox = { width: estimatedWidth, height: fontSize };
                }
                
                const estimatedPathLength = bbox.width * 1.8;
                
                gsap.set(textElement, {
                  strokeDasharray: estimatedPathLength,
                  strokeDashoffset: estimatedPathLength,
                  fillOpacity: 0,
                  strokeOpacity: 1,
                  opacity: 1
                });
                
                gsap.to(textElement, {
                  strokeDashoffset: 0,
                  duration: 2.5,
                  delay: delay,
                  ease: "power1.inOut",
                  onComplete: () => {
                    gsap.to(textElement, {
                      fillOpacity: 1,
                      strokeOpacity: 0,
                      duration: 0.6,
                      ease: "power2.out"
                    });
                  }
                });
              };
              
              animateText(softwareText, 0);
              animateText(engineerText, 0.3);
            }, 300);
          }
        }
      } catch (e) {
        // Ignore errors
      }
    };
    
    // Function to animate dot along SVG Mariam letters (same as HTML Mariam)
    const buildSvgDotTimeline = () => {
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
      
      // Get positions relative to the SVG
      const svgRect = svg.getBoundingClientRect();
      
      // Calculate positions relative to SVG viewport
      // For "i", the dot should be at 25% from top of the letter
      const iCenterX = iPos.centerX;
      const iCenterY = iPos.y + (iPos.height * 0.25);
      const a2CenterX = a2Pos.centerX;
      const a2CenterY = a2Pos.centerY;
      const m2CenterX = m2Pos.centerX;
      const m2CenterY = m2Pos.centerY;
      
      // Create dot element
      const originalDot = document.createElement("div");
      originalDot.className = "original-i-dot-svg";
      
      // Append to SVG's parent or body
      const heroSection = document.getElementById("hero");
      if (!heroSection) return undefined;
      heroSection.appendChild(originalDot);
      
      const dotSize = Math.max(iPos.width * 0.25, 35);
      
      // Position dot relative to viewport (since SVG is fixed)
      // The SVG coordinates need to be converted to screen coordinates
      // Since the SVG uses a viewBox, we need to account for the transform
      const svgViewBox = svg.viewBox.baseVal;
      const svgWidth = svgRect.width;
      const svgHeight = svgRect.height;
      const viewBoxWidth = svgViewBox.width || svgWidth;
      const viewBoxHeight = svgViewBox.height || svgHeight;
      const scaleX = svgWidth / viewBoxWidth;
      const scaleY = svgHeight / viewBoxHeight;
      
      // Account for viewBox origin if it exists
      const viewBoxX = svgViewBox.x || 0;
      const viewBoxY = svgViewBox.y || 0;
      
      // Convert SVG coordinates to screen coordinates
      // SVG coordinates are relative to the viewBox, so we need to account for the viewBox origin and scale
      const iScreenX = svgRect.left + ((iCenterX - viewBoxX) * scaleX);
      const iScreenY = svgRect.top + ((iCenterY - viewBoxY) * scaleY);
      const a2ScreenX = svgRect.left + ((a2CenterX - viewBoxX) * scaleX);
      const a2ScreenY = svgRect.top + ((a2CenterY - viewBoxY) * scaleY);
      const m2ScreenX = svgRect.left + ((m2CenterX - viewBoxX) * scaleX);
      const m2ScreenY = svgRect.top + ((m2CenterY - viewBoxY) * scaleY);
      
      // Calculate initial position
      const initialX = iScreenX - (dotSize / 2);
      const initialY = iScreenY - (dotSize / 2);
      
      // Set initial styles directly on the element to ensure visibility
      originalDot.style.width = `${dotSize}px`;
      originalDot.style.height = `${dotSize}px`;
      originalDot.style.borderRadius = "50%";
      originalDot.style.backgroundColor = "#C92924";
      originalDot.style.position = "fixed";
      originalDot.style.zIndex = "1001";
      originalDot.style.opacity = "1";
      originalDot.style.left = "0px";
      originalDot.style.top = "0px";
      originalDot.style.display = "block";
      originalDot.style.visibility = "visible";
      originalDot.style.pointerEvents = "none";
      originalDot.style.transformOrigin = "center center";
      originalDot.style.willChange = "transform, opacity";
      originalDot.style.border = "none";
      originalDot.style.boxShadow = "none";
      
      // Force a reflow to ensure element is in DOM
      void originalDot.offsetHeight;
      
      // Use GSAP to set initial position and visibility - do this BEFORE creating timeline
      // Ensure maximum visibility
      originalDot.style.zIndex = "99999";
      originalDot.style.backgroundColor = "#C92924";
      
      gsap.set(originalDot, {
        x: initialX,
        y: initialY,
        rotation: 0,
        scale: 1,
        opacity: 1,
        immediateRender: true,
        force3D: true,
        overwrite: "auto"
      });
      
      // Force another reflow after GSAP set to ensure it's applied
      void originalDot.offsetHeight;
      
      // Double-check the element is visible - force it with !important equivalent
      originalDot.setAttribute('style', 
        originalDot.getAttribute('style') + 
        '; opacity: 1 !important; visibility: visible !important; display: block !important;'
      );
      
      // Also set directly
      originalDot.style.setProperty('opacity', '1', 'important');
      originalDot.style.setProperty('visibility', 'visible', 'important');
      originalDot.style.setProperty('display', 'block', 'important');
      
      // Create timeline - it should start with dot already visible
      const dotTimeline = gsap.timeline({ immediateRender: true });
      
      // Explicitly set visibility at timeline start (position 0) to ensure it stays visible
      dotTimeline.set(originalDot, {
        opacity: 1,
        display: "block",
        visibility: "visible",
        x: initialX,
        y: initialY,
        scale: 1,
        rotation: 0,
        backgroundColor: "#C92924",
        immediateRender: true
      }, 0);
      
      // Change "i" to "ı" (dotless i) - at same time
      dotTimeline.set(svgIRefEl, {
        textContent: "ı",
      }, 0);
      
      // First visible animation - use to since we've already set initial state
      dotTimeline.to(originalDot, {
        keyframes: [
          { x: initialX - 2, y: initialY, opacity: 1, scale: 1, backgroundColor: "#C92924", duration: .08, ease: "power1.out" },
          { x: initialX + 2, y: initialY, opacity: 1, scale: 1, backgroundColor: "#C92924", duration: .08, ease: "power1.out" },
          { x: initialX, y: initialY, opacity: 1, scale: 1, backgroundColor: "#C92924", duration: .08, ease: "power1.out" },
        ],
        immediateRender: true,  // Ensure dot is visible during transitions
        onStart: () => {
          // Force visibility on animation start with important flags
          originalDot.style.setProperty('opacity', '1', 'important');
          originalDot.style.setProperty('visibility', 'visible', 'important');
          originalDot.style.setProperty('display', 'block', 'important');
        }
      });
      
      // STUCK JUMP from "i" to "a" - same as HTML version
      dotTimeline.to(originalDot, {
        keyframes: [
          { 
            scaleX: 1.2,
            scaleY: 0.7,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
          },
          { 
            y: iScreenY - 80,
            scaleY: 0.9,
            scaleX: 1.1,
            opacity: 1,
            duration: 0.7,
            ease: "power4.out"
          },
          { 
            x: a2ScreenX - (dotSize / 2),
            y: a2ScreenY - 50,
            scaleY: 0.75,
            scaleX: 1,
            backgroundColor: "#E55A3A",
            opacity: 1,
            duration: 0.4,
            ease: "sine.inOut"
          }
        ],
        immediateRender: true
      });
      
      dotTimeline.to(svgIRefEl, {
        fill: "#C92924",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.7");
      
      // Continue with "a" landing animation
      dotTimeline.to(originalDot, { 
        y: a2ScreenY - 70,
        opacity: 1,
        duration: 0.2, 
        ease: "sine.inOut",
        immediateRender: true
      });
      
      dotTimeline.to(originalDot, {
        y: a2ScreenY + 10,
        scaleY: 1.2,
        backgroundColor: "#E55A3A",
        opacity: 1,
        duration: 0.25,
        ease: "power2.in",
        immediateRender: true
      });
      
      dotTimeline.to(originalDot, {
        y: a2ScreenY,
        scaleY: 0.8,
        backgroundColor: "#C92924",
        opacity: 1,
        duration: 0.15,
        ease: "bounce.out",
        immediateRender: true,
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
      
      dotTimeline.to(originalDot, { 
        scaleY: 1,
        opacity: 1,
        duration: 0.1,
        immediateRender: true
      });
      
      // Continue with animation to "m"
      dotTimeline.to(originalDot, {
        keyframes: [
          { x: m2ScreenX - (dotSize / 2), y: m2ScreenY - 100, scaleY: 0.75, backgroundColor: "#E55A3A", opacity: 1, duration: 0.3, ease: "power2.out" },
          { y: m2ScreenY - 120, opacity: 1, duration: 0.2, ease: "sine.inOut" },
          { y: m2ScreenY + 20, scaleY: 1.2, backgroundColor: "#E55A3A", opacity: 1, duration: 0.25, ease: "power2.in" },
          {
            y: m2ScreenY,
            scaleY: 0.8,
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.15,
            ease: "bounce.out",
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
          { scaleY: 1, opacity: 1, duration: 0.1 }
        ],
        immediateRender: true
      }, "+=0.3");
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { 
            backgroundColor: "#FEF0EB", 
            y: m2ScreenY - 40, 
            scaleY: 0.75, 
            opacity: 1, 
            duration: 0.2, 
            ease: "power2.out",
            onStart: () => {
              originalDot.style.border = "2px solid #C92924";
              originalDot.style.boxShadow = "0 0 4px rgba(201, 41, 36, 0.5)";
            }
          },
          { y: window.innerHeight + 100, scaleY: 1.2, opacity: 0, duration: 0.5, ease: "power2.in" }
        ],
        immediateRender: true
      }, "+=0.3");
      
      dotTimeline.set(originalDot, { display: "none" }, "+=0.5");
      
      // Create final dot that lands on "i"
      const finalDot = document.createElement("div");
      finalDot.className = "final-i-dot-svg";
      svgFinalDotRef.current = finalDot;
      
      heroSection.appendChild(finalDot);
      
      const finalDotSize = dotSize;
      
      // Set initial final dot position and make it visible
      finalDot.style.width = `${finalDotSize}px`;
      finalDot.style.height = `${finalDotSize}px`;
      finalDot.style.borderRadius = "50%";
      finalDot.style.backgroundColor = "#C92924";
      finalDot.style.position = "fixed";
      finalDot.style.zIndex = "1001";
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
      
      // Same motion as original dot's first movement on "i"
      finalDotTimeline.to(finalDot, {
        keyframes: [
          { x: iScreenX - (finalDotSize / 2) - 5, opacity: 1, duration: 0.2, ease: "power1.inOut" },
          { x: iScreenX - (finalDotSize / 2) + 5, opacity: 1, duration: 0.2, ease: "power1.inOut" },
          { x: iScreenX - (finalDotSize / 2), opacity: 1, duration: 0.2, ease: "power1.inOut" }
        ],
        immediateRender: true
      });
      
      finalDotTimeline.to(finalDot, {
        keyframes: [
          { 
            y: iScreenY + 60, 
            backgroundColor: "#F9D5CC", 
            opacity: 1, 
            duration: 0.4, 
            ease: "power2.in",
            onStart: () => {
              finalDot.style.border = "2px solid #C92924";
              finalDot.style.boxShadow = "0 0 4px rgba(201, 41, 36, 0.5)";
            }
          },
          { 
            y: iScreenY + 30, 
            scaleY: 0.7, 
            backgroundColor: "#E55A3A", 
            opacity: 1, 
            duration: 0.15, 
            ease: "power2.out",
            onStart: () => {
              finalDot.style.border = "none";
              finalDot.style.boxShadow = "none";
            }
          },
          { 
            y: iScreenY, 
            scaleY: 1, 
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.2, 
            ease: "power2.out",
            onComplete: () => {
              if (svgIRefEl) {
                gsap.to(svgIRefEl, {
                  fill: "#C92924",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          }
        ],
        immediateRender: true
      });
      
      // Keep the dot visible for a moment, then fade it out
      finalDotTimeline.to(finalDot, {
        duration: 0.5
      });
      
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
      
      dotTimeline.add(finalDotTimeline);
      
      return dotTimeline;
    };
    
    // Function to animate dot along Software Engineer letters
    const buildSoftwareEngineerDotTimeline = () => {
      if (!seEngineerTextRef.current || !numberSevenRef.current) return undefined;
      
      const svg = numberSevenRef.current;
      const engineerText = seEngineerTextRef.current;
      const seE1RefEl = seE1Ref.current;
      const seN1RefEl = seN1Ref.current;
      const seGRefEl = seGRef.current;
      const seIRefEl = seIRef.current;
      const seN2RefEl = seN2Ref.current;
      const seE2RefEl = seE2Ref.current;
      const seE3RefEl = seE3Ref.current;
      const seR2RefEl = seR2Ref.current;
      
      if (!seE1RefEl || !seN1RefEl || !seGRefEl || !seIRefEl || !seN2RefEl || !seE2RefEl || !seE3RefEl || !seR2RefEl) return undefined;
      
      const svgRect = svg.getBoundingClientRect();
      const engineerTextRect = engineerText.getBoundingClientRect();
      const textX = parseFloat(engineerText.getAttribute("x") || "0");
      const textY = parseFloat(engineerText.getAttribute("y") || "0");
      const fontSize = parseFloat(engineerText.getAttribute("font-size") || window.getComputedStyle(engineerText).fontSize) || 50;
      const fontFamily = engineerText.getAttribute("font-family") || '"Floralis Couture", cursive';
      const letterSpacing = 0.05;
      
      const measureLetter = (letter: string, index: number) => {
        const tempText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        tempText.setAttribute("font-size", `${fontSize}px`);
        tempText.setAttribute("font-family", fontFamily);
        tempText.setAttribute("letter-spacing", `${letterSpacing}em`);
        tempText.setAttribute("x", textX.toString());
        tempText.setAttribute("y", textY.toString());
        tempText.setAttribute("text-anchor", "middle");
        tempText.setAttribute("dominant-baseline", "middle");
        tempText.textContent = letter;
        tempText.style.visibility = "hidden";
        svg.appendChild(tempText);
        
        const bbox = tempText.getBBox();
        
        let cumulativeX = 0;
        const letters = ["e", "n", "g", "i", "n", "e", "e", "r"];
        for (let i = 0; i < index; i++) {
          const prevTemp = document.createElementNS("http://www.w3.org/2000/svg", "text");
          prevTemp.setAttribute("font-size", `${fontSize}px`);
          prevTemp.setAttribute("font-family", fontFamily);
          prevTemp.setAttribute("letter-spacing", `${letterSpacing}em`);
          prevTemp.textContent = letters[i];
          prevTemp.style.visibility = "hidden";
          svg.appendChild(prevTemp);
          const prevBbox = prevTemp.getBBox();
          cumulativeX += prevBbox.width + (fontSize * letterSpacing);
          svg.removeChild(prevTemp);
        }
        
        svg.removeChild(tempText);
        
        return {
          x: textX + cumulativeX - (engineerTextRect.width / 2),
          y: textY,
          width: bbox.width,
          height: bbox.height,
          centerX: textX + cumulativeX - (engineerTextRect.width / 2) + bbox.width / 2,
          centerY: textY
        };
      };
      
      const e1Pos = measureLetter("e", 0);
      const n1Pos = measureLetter("n", 1);
      const gPos = measureLetter("g", 2);
      const iPos = measureLetter("i", 3);
      const n2Pos = measureLetter("n", 4);
      const e2Pos = measureLetter("e", 5);
      const e3Pos = measureLetter("e", 6);
      const rPos = measureLetter("r", 7);
      
      // Get SVG transform to convert coordinates
      const svgTransform = svg.getScreenCTM();
      const scaleX = svgTransform ? svgTransform.a : 1;
      const scaleY = svgTransform ? svgTransform.d : 1;
      
      const e1ScreenX = svgRect.left + (e1Pos.centerX * scaleX);
      const e1ScreenY = svgRect.top + (e1Pos.centerY * scaleY);
      const n1ScreenX = svgRect.left + (n1Pos.centerX * scaleX);
      const n1ScreenY = svgRect.top + (n1Pos.centerY * scaleY);
      const gScreenX = svgRect.left + (gPos.centerX * scaleX);
      const gScreenY = svgRect.top + (gPos.centerY * scaleY);
      const iScreenX = svgRect.left + (iPos.centerX * scaleX);
      const iScreenY = svgRect.top + (iPos.centerY * scaleY);
      const n2ScreenX = svgRect.left + (n2Pos.centerX * scaleX);
      const n2ScreenY = svgRect.top + (n2Pos.centerY * scaleY);
      const e2ScreenX = svgRect.left + (e2Pos.centerX * scaleX);
      const e2ScreenY = svgRect.top + (e2Pos.centerY * scaleY);
      const e3ScreenX = svgRect.left + (e3Pos.centerX * scaleX);
      const e3ScreenY = svgRect.top + (e3Pos.centerY * scaleY);
      const rScreenX = svgRect.left + (rPos.centerX * scaleX);
      const rScreenY = svgRect.top + (rPos.centerY * scaleY);
      
      const originalDot = document.createElement("div");
      originalDot.className = "original-i-dot-se";
      
      const heroSection = document.getElementById("hero");
      if (!heroSection) return undefined;
      heroSection.appendChild(originalDot);
      
      const dotSize = Math.max(iPos.width * 0.25, 20);
      
      // Set initial styles directly on the element to ensure visibility
      originalDot.style.width = `${dotSize}px`;
      originalDot.style.height = `${dotSize}px`;
      originalDot.style.borderRadius = "50%";
      originalDot.style.backgroundColor = "#C92924";
      originalDot.style.position = "fixed";
      originalDot.style.zIndex = "1001";
      originalDot.style.opacity = "1";
      originalDot.style.left = "0px";
      originalDot.style.top = "0px";
      originalDot.style.display = "block";
      originalDot.style.visibility = "visible";
      originalDot.style.pointerEvents = "none";
      originalDot.style.transformOrigin = "center center";
      originalDot.style.willChange = "transform, opacity";
      originalDot.style.border = "none";
      originalDot.style.boxShadow = "none";
      
      // Force a reflow to ensure element is in DOM
      void originalDot.offsetHeight;
      
      gsap.set(originalDot, {
        x: iScreenX - (dotSize / 2),
        y: iScreenY - (dotSize / 2),
        rotation: 0,
        scale: 1,
        opacity: 1,
        immediateRender: true,
        force3D: true,  // Use 3D transforms for better performance and visibility
        overwrite: "auto"
      });
      
      // Force another reflow after GSAP set to ensure it's applied
      void originalDot.offsetHeight;
      
      // Double-check the element is visible
      if (originalDot.style.opacity !== "1" || originalDot.style.visibility !== "visible") {
        originalDot.style.opacity = "1";
        originalDot.style.visibility = "visible";
      }
      
      const dotTimeline = gsap.timeline({ immediateRender: true });
      
      dotTimeline.set(seIRefEl, {
        textContent: "ı",
      });
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { 
            scaleX: 1.2,
            scaleY: 0.7,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
          },
          { 
            y: iScreenY - 40,
            scaleY: 0.9,
            scaleX: 1.1,
            opacity: 1,
            duration: 0.5,
            ease: "power4.out"
          },
          { 
            x: n2ScreenX - (dotSize / 2),
            y: n2ScreenY - 20,
            scaleY: 0.75,
            scaleX: 1,
            backgroundColor: "#E55A3A",
            opacity: 1,
            duration: 0.3,
            ease: "sine.inOut"
          }
        ],
        immediateRender: true
      });
      
      dotTimeline.to(seIRefEl, {
        fill: "#C92924",
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.5");
      
      dotTimeline.to(originalDot, {
        y: n2ScreenY + 5,
        scaleY: 1.2,
        backgroundColor: "#E55A3A",
        opacity: 1,
        duration: 0.2,
        ease: "power2.in",
        immediateRender: true
      });
      
      dotTimeline.to(originalDot, {
        y: n2ScreenY,
        scaleY: 0.8,
        backgroundColor: "#C92924",
        opacity: 1,
        duration: 0.15,
        ease: "bounce.out",
        immediateRender: true,
        onComplete: () => {
          if (seN2RefEl) {
            gsap.to(seN2RefEl, {
              fill: "#C92924",
              duration: 0.3,
              ease: "power2.out",
            });
          }
        }
      });
      
      dotTimeline.to(originalDot, { 
        scaleY: 1,
        opacity: 1,
        duration: 0.1,
        immediateRender: true
      });
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { x: e2ScreenX - (dotSize / 2), y: e2ScreenY - 30, scaleY: 0.75, backgroundColor: "#E55A3A", opacity: 1, duration: 0.25, ease: "power2.out" },
          { y: e2ScreenY + 5, scaleY: 1.2, backgroundColor: "#E55A3A", opacity: 1, duration: 0.2, ease: "power2.in" },
          {
            y: e2ScreenY,
            scaleY: 0.8,
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.15,
            ease: "bounce.out",
            onComplete: () => {
              if (seE2RefEl) {
                gsap.to(seE2RefEl, {
                  fill: "#C92924",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          },
          { scaleY: 1, opacity: 1, duration: 0.1 }
        ],
        immediateRender: true
      }, "+=0.2");
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { x: e3ScreenX - (dotSize / 2), y: e3ScreenY - 30, scaleY: 0.75, backgroundColor: "#E55A3A", opacity: 1, duration: 0.25, ease: "power2.out" },
          { y: e3ScreenY + 5, scaleY: 1.2, backgroundColor: "#E55A3A", opacity: 1, duration: 0.2, ease: "power2.in" },
          {
            y: e3ScreenY,
            scaleY: 0.8,
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.15,
            ease: "bounce.out",
            onComplete: () => {
              if (seE3RefEl) {
                gsap.to(seE3RefEl, {
                  fill: "#C92924",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          },
          { scaleY: 1, opacity: 1, duration: 0.1 }
        ],
        immediateRender: true
      }, "+=0.2");
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { x: rScreenX - (dotSize / 2), y: rScreenY - 30, scaleY: 0.75, backgroundColor: "#E55A3A", opacity: 1, duration: 0.25, ease: "power2.out" },
          { y: rScreenY + 5, scaleY: 1.2, backgroundColor: "#E55A3A", opacity: 1, duration: 0.2, ease: "power2.in" },
          {
            y: rScreenY,
            scaleY: 0.8,
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.15,
            ease: "bounce.out",
            onComplete: () => {
              if (seR2RefEl) {
                gsap.to(seR2RefEl, {
                  fill: "#C92924",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          },
          { scaleY: 1, opacity: 1, duration: 0.1 }
        ],
        immediateRender: true
      }, "+=0.2");
      
      dotTimeline.to(originalDot, {
        keyframes: [
          { 
            backgroundColor: "#FEF0EB", 
            y: rScreenY - 20, 
            scaleY: 0.75, 
            opacity: 1, 
            duration: 0.2, 
            ease: "power2.out",
            onStart: () => {
              originalDot.style.border = "2px solid #C92924";
              originalDot.style.boxShadow = "0 0 4px rgba(201, 41, 36, 0.5)";
            }
          },
          { y: window.innerHeight + 100, scaleY: 1.2, opacity: 0, duration: 0.5, ease: "power2.in" }
        ],
        immediateRender: true
      }, "+=0.3");
      
      dotTimeline.set(originalDot, { display: "none" }, "+=0.5");
      
      const finalDot = document.createElement("div");
      finalDot.className = "final-i-dot-se";
      seFinalDotRef.current = finalDot;
      
      heroSection.appendChild(finalDot);
      
      const finalDotSize = dotSize;
      
      // Set initial styles directly on the element to ensure visibility
      finalDot.style.width = `${finalDotSize}px`;
      finalDot.style.height = `${finalDotSize}px`;
      finalDot.style.borderRadius = "50%";
      finalDot.style.backgroundColor = "#C92924";
      finalDot.style.position = "fixed";
      finalDot.style.zIndex = "1001";
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
      
      finalDotTimeline.to(finalDot, {
        keyframes: [
          { x: iScreenX - (finalDotSize / 2) - 3, opacity: 1, duration: 0.15, ease: "power1.inOut" },
          { x: iScreenX - (finalDotSize / 2) + 3, opacity: 1, duration: 0.15, ease: "power1.inOut" },
          { x: iScreenX - (finalDotSize / 2), opacity: 1, duration: 0.15, ease: "power1.inOut" }
        ],
        immediateRender: true
      });
      
      finalDotTimeline.to(finalDot, {
        keyframes: [
          { 
            y: iScreenY + 40, 
            backgroundColor: "#F9D5CC", 
            opacity: 1, 
            duration: 0.3, 
            ease: "power2.in",
            onStart: () => {
              finalDot.style.border = "2px solid #C92924";
              finalDot.style.boxShadow = "0 0 4px rgba(201, 41, 36, 0.5)";
            }
          },
          { 
            y: iScreenY + 20, 
            scaleY: 0.7, 
            backgroundColor: "#E55A3A", 
            opacity: 1, 
            duration: 0.12, 
            ease: "power2.out",
            onStart: () => {
              finalDot.style.border = "none";
              finalDot.style.boxShadow = "none";
            }
          },
          { 
            y: iScreenY, 
            scaleY: 1, 
            backgroundColor: "#C92924",
            opacity: 1,
            duration: 0.18, 
            ease: "power2.out",
            onComplete: () => {
              if (seIRefEl) {
                gsap.to(seIRefEl, {
                  fill: "#C92924",
                  duration: 0.3,
                  ease: "power2.out",
                });
              }
            }
          }
        ],
        immediateRender: true
      });
      
      finalDotTimeline.to(finalDot, {
        duration: 0.4
      });
      
      finalDotTimeline.to(finalDot, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (finalDot && finalDot.parentNode) {
            finalDot.style.display = "none";
          }
        }
      });
      
      dotTimeline.add(finalDotTimeline);
      
      return dotTimeline;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (portfolWidth > 0 && portfolElement) {
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
            
            // Position "TURNING IDEAS" and "REAL LIFE PRODUCTS" on the M strokes
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
      
      // Function to position "TURNING IDEAS" and "REAL LIFE PRODUCTS" on the M strokes (for resize handler)
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
          
          // Position "INTO" at the center of M
          const intoText = svg.querySelector(".hero-into-text") as SVGTextElement;
          if (intoText) {
            intoText.setAttribute("x", mCenterX.toString());
            intoText.setAttribute("y", mCenterY.toString());
            intoText.setAttribute("text-anchor", "middle");
            intoText.setAttribute("dominant-baseline", "middle");
            intoText.setAttribute("opacity", "0.6");
            intoText.setAttribute("fill", "#280B0B");
          }
          
          // Calculate exact stroke dimensions for the M
          // The vertical strokes of M go from top to bottom
          const leftStrokeStartY = mY; // Top of left vertical stroke
          const leftStrokeEndY = mActualBottom; // Bottom of left vertical stroke
          const leftStrokeHeight = mActualHeight; // Full height of the stroke
          const leftStrokeX = mX; // X position of left vertical stroke
          
          const rightStrokeStartY = mY; // Top of right vertical stroke
          const rightStrokeEndY = mActualBottom; // Bottom of right vertical stroke
          const rightStrokeHeight = mActualHeight; // Full height of the stroke
          const rightStrokeX = mRightX; // X position of right vertical stroke
          
          // Position "TURNING IDEAS" on the left stroke of M
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
            turningIdeas.setAttribute("x", (leftStrokeX - offsetFromStroke).toString());
            turningIdeas.setAttribute("y", strokeCenterY.toString());
            turningIdeas.setAttribute("text-anchor", "middle"); // Center horizontally when rotated
            turningIdeas.setAttribute("dominant-baseline", "middle"); // Center vertically
            // Rotate -90 degrees around the center of the stroke to make it vertical
            turningIdeas.setAttribute("transform", `rotate(-90 ${leftStrokeX - offsetFromStroke} ${strokeCenterY})`);
            turningIdeas.setAttribute("opacity", "0.6");
            turningIdeas.setAttribute("fill", "#280B0B");
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
            realLifeProducts.setAttribute("opacity", "0.6");
            realLifeProducts.setAttribute("fill", "#280B0B");
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
                    <li><a href="#skills" onClick={(e) => { e.preventDefault(); onNavigate('skills'); }}>skills</a></li>
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
            <tspan ref={svgIRef}>i</tspan>
            <tspan ref={svgA2Ref}>a</tspan>
            <tspan ref={svgM2Ref}>m</tspan>
          </text>
          
          {/* Software Engineer Text - positioned above "iam" part */}
          <text
            ref={seSoftwareTextRef}
            className="hero-software-text"
            x="0"
            y="0"
            fill="#280B0B"
            fillOpacity="0"
            stroke="#280B0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0"
            fontFamily='"Floralis Couture", cursive'
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              letterSpacing: "0.05em",
              fontWeight: "normal"
            }}
          >
            <tspan ref={seSRef}>s</tspan>
            <tspan ref={seORef}>o</tspan>
            <tspan ref={seFRef}>f</tspan>
            <tspan ref={seTRef}>t</tspan>
            <tspan ref={seWRef}>w</tspan>
            <tspan ref={seA1Ref}>a</tspan>
            <tspan ref={seR1Ref}>r</tspan>
            <tspan ref={seERef}>e</tspan>
          </text>
          <text
            ref={seEngineerTextRef}
            className="hero-engineer-text"
            x="0"
            y="0"
            fill="#280B0B"
            fillOpacity="0"
            stroke="#280B0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0"
            fontFamily='"Floralis Couture", cursive'
            textAnchor="middle"
            dominantBaseline="middle"
            style={{
              letterSpacing: "0.05em",
              fontWeight: "normal"
            }}
          >
            <tspan ref={seE1Ref}>e</tspan>
            <tspan ref={seN1Ref}>n</tspan>
            <tspan ref={seGRef}>g</tspan>
            <tspan ref={seIRef}>i</tspan>
            <tspan ref={seN2Ref}>n</tspan>
            <tspan ref={seE2Ref}>e</tspan>
            <tspan ref={seE3Ref}>e</tspan>
            <tspan ref={seR2Ref}>r</tspan>
          </text>
          
          {/* TURNING IDEAS text on left stroke of M */}
          <text
            className="hero-turning-ideas"
            x="0"
            y="0"
            fill="#280B0B"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0.6"
            style={{ letterSpacing: "0.4em" }}
          >
            TURNING IDEAS
          </text>
          
          {/* REAL LIFE PRODUCTS text on right stroke of M */}
          <text
            className="hero-real-life-products"
            x="0"
            y="0"
            fill="#280B0B"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0.6"
            style={{ letterSpacing: "0.4em" }}
          >
            REAL LIFE PRODUCTS
          </text>
          
          {/* INTO text at center of M */}
          <text
            className="hero-into-text"
            x="0"
            y="0"
            fill="#280B0B"
            fontFamily='"Space Grotesk", "Inter", sans-serif'
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12px"
            fontWeight="500"
            opacity="0.6"
            style={{ letterSpacing: "0.4em" }}
          >
            INTO
          </text>
        </svg>
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
          padding: 100px 0 0 100px;
          padding-bottom: 0;
          position: absolute;
          inset: 0;
          z-index: 200;
          overflow: visible;
        }

        .software-engineer-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          z-index: 10;
          transform-origin: center center;
          pointer-events: none;
          overflow: visible;
        }

        @media (max-width: 768px) {
          .software-engineer-wrapper {
            /* Keep same positioning on mobile */
          }
        }

        .software-engineer-svg {
          width: auto;
          height: auto;
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

        .software-engineer-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: auto;
          height: auto;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          z-index: 10;
          transform-origin: center center;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .software-engineer-wrapper {
            /* Keep same positioning on mobile */
          }
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
      `}</style>
    </section>
  );
};

export default Hero;