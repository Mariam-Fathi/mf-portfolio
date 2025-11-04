"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MinimalCinematicHero = () => {
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null); // Final: MARIAM FATHI
  const mariamFullRef = useRef<HTMLHeadingElement>(null); // Stage 1: Full MARIAM at left top
  const marPartRef = useRef<HTMLSpanElement>(null); // The "MAR" part to be erased
  const iamPartRef = useRef<HTMLSpanElement>(null); // The "IAM" part that shifts left
  const iamRef = useRef<HTMLHeadingElement>(null); // Stage 2: IAM only (after MAR erased)
  const engineerZoomRef = useRef<HTMLHeadingElement>(null); // Stage 3: ENGINEER below IAM
  const fathiRef = useRef<HTMLHeadingElement>(null); // FATHI that appears while ENGINEER erases
  const softwareRef = useRef<HTMLHeadingElement>(null);
  const engineerRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Match GIF width to title width
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const matchWidths = () => {
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleStyle = window.getComputedStyle(titleRef.current);
        const titlePaddingLeft = parseFloat(titleStyle.paddingLeft) || 0;
        const titlePaddingRight = parseFloat(titleStyle.paddingRight) || 0;
        
        const titleWidth = titleRect.width + titlePaddingLeft + titlePaddingRight;
        
        // No image container needed for this design
      }
    };

    const initialTimer = setTimeout(matchWidths, 100);
    const animationTimer = setTimeout(matchWidths, 2500);
    
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(matchWidths, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimer);
      clearTimeout(animationTimer);
      clearTimeout(resizeTimer);
    };
  }, []);

  useGSAP(
    () => {
      // Ensure we're in the browser
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      if (!heroSectionRef.current || !titleRef.current || !mariamFullRef.current || 
          !marPartRef.current || !iamPartRef.current || !iamRef.current || !engineerZoomRef.current || 
          !fathiRef.current || !softwareRef.current || !engineerRef.current || !contentRef.current) return;

      // Dispatch event to hide navbar
      window.dispatchEvent(new CustomEvent('heroAnimationStart'));

      // Initial states - all elements hidden except MARIAM
      gsap.set([titleRef.current, iamRef.current, engineerZoomRef.current, fathiRef.current, softwareRef.current, engineerRef.current], {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
      });

      // Position MARIAM at top left with proper spacing from navbar and browser edges
      // Navbar is w-20 (5rem = 80px) on mobile, so we need space from left
      // Add top padding to avoid navbar overlap and browser edge
      gsap.set(mariamFullRef.current, {
        left: "7rem", // Space from navbar (80px + 32px padding)
        top: "3rem", // Space from top of viewport
        xPercent: 0,
        yPercent: 0,
        opacity: 0, // Start hidden - will be written in
        clipPath: "inset(0 100% 0 0%)", // Start completely hidden (typed from left to right)
      });

      // Set initial states for MAR and IAM parts
      gsap.set(marPartRef.current, {
        opacity: 0, // Start hidden
        clipPath: "inset(0 100% 0 0%)", // Start hidden
        x: 0,
      });

      gsap.set(iamPartRef.current, {
        opacity: 0, // Start hidden
        clipPath: "inset(0 100% 0 0%)", // Start hidden
        x: 0, // Start at original position
      });

      // Create cinematic timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Stage 0: Write MARIAM letter by letter (true typing effect)
      // Animate clipPath progressively to reveal each letter
      if (mariamFullRef.current) {
        // Set initial state - fully hidden
        gsap.set(mariamFullRef.current, {
          opacity: 1,
          clipPath: "inset(0 100% 0 0%)", // Start fully hidden from right
        });
        
        // Create letter-by-letter reveal
        // Use short durations with immediate transitions for typing effect
        const letterDelay = 0.3; // Delay between each letter
        
        // Animate from 100% hidden to 0% visible in 6 steps
        // Use call() to set each step immediately for typing feel
        tl.call(function() {
          gsap.set(mariamFullRef.current, { clipPath: "inset(0 83.33% 0 0%)" }); // M
        }, [], 0);
        
        tl.call(function() {
          gsap.set(mariamFullRef.current, { clipPath: "inset(0 66.67% 0 0%)" }); // MA
        }, [], letterDelay);
        
        tl.call(function() {
          gsap.set(mariamFullRef.current, { clipPath: "inset(0 50% 0 0%)" }); // MAR
        }, [], letterDelay * 2);
        
        tl.call(function() {
          gsap.set(mariamFullRef.current, { clipPath: "inset(0 33.33% 0 0%)" }); // MARI
        }, [], letterDelay * 3);
        
        tl.call(function() {
          gsap.set(mariamFullRef.current, { clipPath: "inset(0 16.67% 0 0%)" }); // MARIA
        }, [], letterDelay * 4);
        
        tl.call(function() {
          gsap.set(mariamFullRef.current, { 
            clipPath: "inset(0 0% 0 0%)" // MARIAM - fully visible
          });
          // After MARIAM is fully written, show MAR and IAM parts
          if (marPartRef.current && iamPartRef.current) {
            gsap.set(marPartRef.current, {
              opacity: 1,
              clipPath: "inset(0 0% 0 0%)",
            });
            gsap.set(iamPartRef.current, {
              opacity: 1,
              clipPath: "inset(0 0% 0 0%)",
            });
          }
        }, [], letterDelay * 5);
      }

      // Stage 2: Erase "MAR" part - animate it out with motion (like erasing)
      // Start after MARIAM is fully written (1.8s typing + 0.3s pause = 2.1s)
      // Use clipPath to create erasing effect from right to left
      tl.to(marPartRef.current, {
        clipPath: "inset(0 0% 0 100%)", // Clip from right to left (erasing effect)
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onStart: function() {
          // Calculate MAR width when animation starts (ensures accurate measurement)
          if (marPartRef.current && iamPartRef.current) {
            const marWidth = marPartRef.current.offsetWidth;
            // Shift IAM left by MAR's width to fill the erased space
            gsap.to(iamPartRef.current, {
              x: -marWidth,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        },
      }, 2.1); // Start 0.3s after MARIAM typing completes (1.8s typing + 0.3s pause)

      // Stage 3: Shift IAM up and show ENGINEER below with same font
      tl.to(mariamFullRef.current, {
        y: "-4rem", // Shift up (adjust based on line height)
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: function() {
          // After IAM shifts up, position ENGINEER below it (same size as IAM)
          if (mariamFullRef.current && engineerZoomRef.current && contentRef.current) {
            const iamRect = mariamFullRef.current.getBoundingClientRect();
            const containerRect = contentRef.current.getBoundingClientRect();
            
            // Calculate position relative to container
            const iamBottomRelative = iamRect.bottom - containerRect.top;
            const iamLeftRelative = iamRect.left - containerRect.left;
            
            // Get IAM's computed font size and all font properties to match exactly
            const iamStyle = window.getComputedStyle(mariamFullRef.current);
            const iamFontSize = iamStyle.fontSize;
            const iamFontWeight = iamStyle.fontWeight;
            const iamLetterSpacing = iamStyle.letterSpacing;
            const iamLineHeight = iamStyle.lineHeight;
            
            // Set ENGINEER to EXACTLY same font properties as IAM initially
            // Position it at same left as IAM (which already has proper spacing from navbar)
            gsap.set(engineerZoomRef.current, {
              left: `${iamLeftRelative}px`, // Same horizontal position as IAM (already has navbar spacing)
              top: `${iamBottomRelative + 20}px`, // Position below IAM with small gap
              xPercent: 0,
              yPercent: 0,
              textAlign: "left",
              fontSize: iamFontSize, // Same size as IAM
              fontWeight: iamFontWeight, // Same weight
              letterSpacing: iamLetterSpacing, // Same letter spacing
              lineHeight: iamLineHeight, // Same line height
              opacity: 1,
              clipPath: "inset(0 100% 0 0%)", // Start fully clipped (hidden from left)
            });

            // Write ENGINEER slowly from left to right
            gsap.to(engineerZoomRef.current, {
              clipPath: "inset(0 0% 0 0%)", // Reveal from left to right
              duration: 1.2, // Slower duration for gradual reveal
              ease: "power2.inOut",
            });
          }
        },
      }, 3.5);

      // Stage 4: Simultaneously erase ENGINEER while rewriting "MAR"
      // First, prepare for FATHI positioning (get ENGINEER position before erasing)
      tl.call(function() {
        if (engineerZoomRef.current && fathiRef.current && contentRef.current) {
          // Get ENGINEER's current position and font properties before erasing
          const engineerRect = engineerZoomRef.current.getBoundingClientRect();
          const containerRect = contentRef.current.getBoundingClientRect();
          const engineerLeft = engineerRect.left - containerRect.left;
          const engineerTop = engineerRect.top - containerRect.top;
          
          // Get ENGINEER's computed font properties
          const engineerStyle = window.getComputedStyle(engineerZoomRef.current);
          const engineerFontSize = engineerStyle.fontSize;
          const engineerFontWeight = engineerStyle.fontWeight;
          const engineerLetterSpacing = engineerStyle.letterSpacing;
          const engineerLineHeight = engineerStyle.lineHeight;
          
          // Position FATHI at the same location as ENGINEER with same font
          gsap.set(fathiRef.current, {
            left: `${engineerLeft}px`,
            top: `${engineerTop}px`,
            xPercent: 0,
            yPercent: 0,
            fontSize: engineerFontSize,
            fontWeight: engineerFontWeight,
            letterSpacing: engineerLetterSpacing,
            lineHeight: engineerLineHeight,
            textAlign: "left",
            opacity: 0,
            clipPath: "inset(0 100% 0 0%)", // Start fully clipped (hidden)
          });
          
          // Ensure ENGINEER starts with visible clipPath for erasing
          gsap.set(engineerZoomRef.current, {
            clipPath: "inset(0 0% 0 0%)", // Fully visible
          });
        }
      }, [], 5);

      // Stage 4a: Shift IAM back to its original position (to make room for MAR)
      tl.to(iamPartRef.current, {
        x: 0, // Shift back to original position (to the right of MAR)
        duration: 0.8,
        ease: "power2.inOut",
      }, 5);

      // Stage 4b: Simultaneously - Erase ENGINEER and Restore MAR visibility
      // Erase ENGINEER from left to right (slower)
      tl.to(engineerZoomRef.current, {
        clipPath: "inset(0 0% 0 100%)", // Erase from left to right
        opacity: 0,
        duration: 1.5, // Slower erasing duration
        ease: "power2.inOut",
        onComplete: function() {
          // Hide ENGINEER completely
          if (engineerZoomRef.current) {
            gsap.set(engineerZoomRef.current, {
              opacity: 0,
              visibility: "hidden",
            });
          }
        }
      }, 5.2);

      // Restore MAR visibility - happens simultaneously with ENGINEER erasing
      tl.to(marPartRef.current, {
        clipPath: "inset(0 0% 0 0%)", // Restore MAR visibility
        opacity: 1,
        duration: 1.5, // Match ENGINEER erasing duration for synchronization
        ease: "power2.out",
      }, 5.2); // Start at same time as ENGINEER erasing

      // Stage 5: After ENGINEER is erased and MAR is rewritten, type FATHI
      tl.to(fathiRef.current, {
        clipPath: "inset(0 0% 0 0%)", // Reveal from left to right
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut",
      }, 6.9); // Start after both ENGINEER erasing and MAR rewriting complete (5.2 + 1.5 = 6.7, then 0.2s delay)

      // Stage 6: Move FATHI up beside MARIAM immediately after typing (start while typing completes)
      // FATHI typing completes at 6.9 + 0.8 = 7.7
      tl.call(function() {
        if (fathiRef.current && mariamFullRef.current && contentRef.current) {
          // First, clear ALL transforms to get accurate position measurements
          gsap.set(fathiRef.current, {
            x: 0,
            y: 0,
            xPercent: 0,
            yPercent: 0,
            clearProps: "transform",
          });
          
          // Force reflow to ensure transforms are cleared
          void fathiRef.current.offsetHeight;
          void mariamFullRef.current.offsetHeight;
          
          // Get positions using getBoundingClientRect for accurate visual positions
          const mariamRect = mariamFullRef.current.getBoundingClientRect();
          const containerRect = contentRef.current.getBoundingClientRect();
          
          // Calculate final position relative to container
          const mariamRight = mariamRect.right - containerRect.left;
          const mariamTop = mariamRect.top - containerRect.top;
          
          // Get FATHI's current position (after clearing transforms, should match CSS)
          const fathiRect = fathiRef.current.getBoundingClientRect();
          
          // Calculate final position: to the right of MARIAM, aligned on the same line
          const spacing = parseFloat(window.getComputedStyle(mariamFullRef.current).fontSize) * 0.1;
          const finalLeft = mariamRight + spacing;
          const finalTop = mariamTop; // Align with MARIAM's top for same-line alignment
          
          // Animate FATHI directly to final position - one smooth transition, no corrections
          tl.to(fathiRef.current, {
            left: `${finalLeft}px`,
            top: `${finalTop}px`,
            duration: 0.8,
            ease: "power1.out",
            onComplete: function() {
              // Finalize position - set once, no verification loops
              if (fathiRef.current) {
                gsap.set(fathiRef.current, {
                  left: `${finalLeft}px`,
                  top: `${finalTop}px`,
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  clearProps: "transform",
                });
              }
            }
          }, ">");
        }
      }, [], 7.7); // Start immediately when FATHI typing completes (6.9 + 0.8 = 7.7)

      // Stage 7: Shift both MARIAM and FATHI down together (after FATHI is beside MARIAM)
      // Use y transform for MARIAM, sync FATHI's top in real-time to stay on same line
      tl.call(function() {
        if (fathiRef.current && mariamFullRef.current && contentRef.current) {
          // Shift MARIAM using transform (for smooth animation)
          tl.to(mariamFullRef.current, {
            y: "+=4rem",
            duration: 1,
            ease: "power2.inOut",
            onUpdate: function(this: any) {
              // Sync FATHI's top with MARIAM's vertical position in real-time
              if (mariamFullRef.current && fathiRef.current && contentRef.current) {
                const currentMariamRect = mariamFullRef.current.getBoundingClientRect();
                const currentContainerRect = contentRef.current.getBoundingClientRect();
                const mariamCurrentTop = currentMariamRect.top - currentContainerRect.top;
                
                // Update FATHI's top to match MARIAM's current top position exactly
                gsap.set(fathiRef.current, {
                  top: `${mariamCurrentTop}px`,
                });
              }
            },
            onComplete: function() {
              // Lock FATHI's final position
              if (fathiRef.current && mariamFullRef.current && contentRef.current) {
                const finalMariamRect = mariamFullRef.current.getBoundingClientRect();
                const finalContainerRect = contentRef.current.getBoundingClientRect();
                const finalTop = finalMariamRect.top - finalContainerRect.top;
                
                gsap.set(fathiRef.current, {
                  top: `${finalTop}px`,
                  clearProps: "transform",
                });
              }
            }
          }, ">");
        }
      }, [], 8.7); // Start slightly after FATHI completes to ensure position is locked (7.7 + 0.8 + 0.2 = 8.7)

      // Stage 8: Transition MARIAM FATHI to bottom position while writing ENGINEER and SOFTWARE
      tl.call(function() {
        if (mariamFullRef.current && fathiRef.current && engineerRef.current && softwareRef.current && contentRef.current && heroSectionRef.current) {
          // Force reflow
          void mariamFullRef.current.offsetHeight;
          void fathiRef.current.offsetHeight;
          
          // Get current positions
          // First, get the actual rendered positions (accounting for any transforms)
          const mariamRect = mariamFullRef.current.getBoundingClientRect();
          const fathiRect = fathiRef.current.getBoundingClientRect();
          const containerRect = contentRef.current.getBoundingClientRect();
          const heroRect = heroSectionRef.current.getBoundingClientRect();
          
          // Calculate final bottom position - full width from navbar end with equal padding
          const heroHeight = heroRect.height;
          const mariamHeight = mariamRect.height;
          const finalTop = heroHeight - mariamHeight - 80; // 80px from bottom
          
          // Get current positions (from getBoundingClientRect which includes transforms)
          const currentMariamTop = mariamRect.top - containerRect.top;
          const currentMariamLeft = mariamRect.left - containerRect.left;
          const currentFathiTop = fathiRect.top - containerRect.top;
          const currentFathiLeft = fathiRect.left - containerRect.left;
          
          // Calculate spacing between MARIAM and FATHI (from actual rendered positions)
          // Use the right edge of MARIAM and left edge of FATHI
          const mariamRight = mariamRect.right - containerRect.left;
          const fathiLeft = fathiRect.left - containerRect.left;
          const currentSpacing = fathiLeft - mariamRight; // Actual visual spacing
          
          // Calculate total width needed (MARIAM + spacing + FATHI)
          const totalWidth = mariamRect.width + currentSpacing + fathiRect.width;
          
          // Navbar width is w-20 = 80px (5rem)
          const navbarWidth = 80;
          const viewportWidth = window.innerWidth;
          
          // Calculate available width: full viewport minus navbar (padding will be calculated after)
          const availableWidth = viewportWidth - navbarWidth;
          
          // Also consider available height to prevent cropping
          const viewportHeight = window.innerHeight;
          const availableHeight = viewportHeight - finalTop - 80; // 80px bottom padding
          
          // Calculate scale factors for both width and height
          // For width, account for minimum padding (32px on each side = 64px total)
          const widthScaleFactor = (availableWidth - 64) / totalWidth; // Reserve 64px for minimum padding
          const heightScaleFactor = availableHeight / mariamHeight;
          
          // Use the smaller scale factor to ensure it fits both dimensions
          // Also add a maximum scale limit (e.g., 1.0) to prevent it from being too large
          const scaleFactor = Math.min(widthScaleFactor, heightScaleFactor, 1.0);
          
          // Calculate scaled content dimensions
          const scaledMariamWidth = mariamRect.width * scaleFactor;
          const scaledFathiWidth = fathiRect.width * scaleFactor;
          const finalSpacing = currentSpacing < 0 ? 10 : currentSpacing; // Use original spacing, not scaled
          
          // Calculate total content width after scaling
          const totalContentWidth = scaledMariamWidth + finalSpacing + scaledFathiWidth;
          
          // Calculate available space (viewport width minus navbar)
          const availableSpace = viewportWidth - navbarWidth;
          
          // Calculate equal padding on both sides to center the content
          const remainingSpace = availableSpace - totalContentWidth;
          const equalPadding = Math.max(32, remainingSpace / 2); // Minimum 32px, or equal split
          
          // Calculate centered final positions
          const finalMariamLeft = navbarWidth + equalPadding;
          const finalMariamTop = finalTop;
          const finalFathiLeft = finalMariamLeft + scaledMariamWidth + finalSpacing;
          const finalFathiTop = finalTop;
          
          // Recalculate FATHI's position after alignment (to get accurate deltas)
          // Force reflow and get updated position
          void fathiRef.current.offsetHeight;
          const updatedFathiRect = fathiRef.current.getBoundingClientRect();
          const updatedFathiLeft = updatedFathiRect.left - containerRect.left;
          const updatedFathiTop = updatedFathiRect.top - containerRect.top;
          
          // Calculate deltas from aligned position
          const deltaMariamX = finalMariamLeft - currentMariamLeft;
          const deltaMariamY = finalMariamTop - currentMariamTop;
          const deltaFathiX = finalFathiLeft - updatedFathiLeft;
          const deltaFathiY = finalFathiTop - updatedFathiTop; // Should be same as deltaMariamY now
          
          // Set up ENGINEER and SOFTWARE with small font, initially hidden
          const smallFontSize = "1rem"; // Increased from 0.875rem (text-sm) to 1rem (text-base)
          
          // Store smallFontSize for use in onComplete callback
          const fontSizeForFallback = parseFloat(smallFontSize);
          
          // Calculate scale factor FIRST (needed for position calculations) - reuse variables from above
          // These are already calculated above, just reuse them
          const scaleFactorForPosition = Math.min(widthScaleFactor, heightScaleFactor, 1.0);
          
          // Position ENGINEER aligned with "IAM" in MARIAM
          // Calculate position based on FINAL position to avoid cropping
          if (iamPartRef.current && marPartRef.current && typeof document !== 'undefined') {
            // Calculate final MARIAM bottom position (after scaling and positioning)
            const scaledMariamHeight = mariamHeight * scaleFactorForPosition;
            const finalMariamBottom = finalTop + scaledMariamHeight;
            
            // Get position of "IAM" span to calculate its center (use current position for initial setup)
            const iamRect = iamPartRef.current.getBoundingClientRect();
            const iamCenter = iamRect.left - containerRect.left + (iamRect.width / 2);
            
            // Calculate ENGINEER top based on FINAL MARIAM position to prevent cropping
            const engineerTop = finalMariamBottom - containerRect.top + 20; // 20px below final MARIAM position
              
              // Calculate total width of "SOFTWARE ENGINEER" for centering
              const fontSize = parseFloat(smallFontSize);
              const softwareEstimatedWidth = 8 * fontSize * 0.75; // Approximate width for "SOFTWARE"
              const engineerEstimatedWidth = 8 * fontSize * 0.75; // Approximate width for "ENGINEER"
              const softwareEngineerSpacing = 10; // Spacing between SOFTWARE and ENGINEER
              const totalSoftwareEngineerWidth = softwareEstimatedWidth + softwareEngineerSpacing + engineerEstimatedWidth;
              
              // Position SOFTWARE ENGINEER centered under "IAM"
              // Calculate left position so that the center of SOFTWARE ENGINEER aligns with center of IAM
              const softwareEngineerLeft = iamCenter - (totalSoftwareEngineerWidth / 2);
              const softwareLeft = softwareEngineerLeft;
              const softwareTop = engineerTop; // Same vertical position as ENGINEER
              
              // Position ENGINEER right after SOFTWARE
              const engineerLeft = softwareLeft + softwareEstimatedWidth + softwareEngineerSpacing;
              
              gsap.set(softwareRef.current, {
                left: `${softwareLeft}px`,
                top: `${softwareTop}px`,
                fontSize: smallFontSize,
                fontWeight: "bold",
                letterSpacing: "0.15em",
                textAlign: "left",
                opacity: 0,
                clipPath: "inset(0 100% 0 0%)", // Start hidden
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
              });
              
              gsap.set(engineerRef.current, {
                left: `${engineerLeft}px`,
                top: `${engineerTop}px`,
                fontSize: smallFontSize,
                fontWeight: "bold",
                letterSpacing: "0.15em",
                textAlign: "left",
                opacity: 0,
                clipPath: "inset(0 100% 0 0%)", // Start hidden
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
              });
              
              // Animate MARIAM and FATHI to bottom position with scaling
              // scaleFactor already calculated above
              
              // Animate MARIAM and FATHI separately to keep FATHI's CSS positioning
              // MARIAM uses transforms, FATHI uses left/top CSS properties
              // Both must stay on the same line throughout the animation
              tl.to(mariamFullRef.current, {
                x: deltaMariamX,
                y: deltaMariamY,
                scale: scaleFactor,
                duration: 1.5,
                ease: "power2.inOut",
                onStart: function() {
                  // IMMEDIATELY align FATHI with MARIAM before animation begins
                  if (mariamFullRef.current && fathiRef.current && contentRef.current) {
                    const mariamStartRect = mariamFullRef.current.getBoundingClientRect();
                    const containerStartRect = contentRef.current.getBoundingClientRect();
                    const mariamStartTop = mariamStartRect.top - containerStartRect.top;
                    
                    // Set FATHI's top to match MARIAM's top immediately
                    gsap.set(fathiRef.current, {
                      top: `${mariamStartTop}px`,
                      clearProps: "transform",
                    });
                    // Force immediate render
                    void fathiRef.current.offsetHeight;
                  }
                },
                onUpdate: function(this: any) {
                  // Update positions for ENGINEER and SOFTWARE during animation
                  const progress = this.progress();
                  
                  // Synchronize FATHI's top position with MARIAM's vertical position in real-time
                  // This ensures they stay on the same line throughout the entire animation
                  if (mariamFullRef.current && fathiRef.current && contentRef.current) {
                    const currentMariamRect = mariamFullRef.current.getBoundingClientRect();
                    const currentContainerRect = contentRef.current.getBoundingClientRect();
                    const mariamCurrentTop = currentMariamRect.top - currentContainerRect.top;
                    
                    // Update FATHI's top to match MARIAM's current top position exactly
                    gsap.set(fathiRef.current, {
                      top: `${mariamCurrentTop}px`,
                    });
                  }
                  
                  // Update SOFTWARE and ENGINEER positions (aligned with "IAM" span as MARIAM moves)
                  if (softwareRef.current && engineerRef.current && iamPartRef.current && contentRef.current) {
                    const currentContainerRect = contentRef.current.getBoundingClientRect();
                    
                    // Recalculate "IAM" span position (left edge)
                    const currentIamRect = iamPartRef.current.getBoundingClientRect();
                    const currentMariamRect = mariamFullRef.current?.getBoundingClientRect();
                    if (!currentMariamRect) return;
                    
                    // Center SOFTWARE ENGINEER under "IAM"
                    // Calculate center of IAM
                    const currentIamCenter = currentIamRect.left - currentContainerRect.left + (currentIamRect.width / 2);
                    // Use interpolated position between start and final to prevent cropping
                    const startEngineerTop = mariamRect.bottom - containerRect.top + 20;
                    const finalEngineerTop = finalMariamTop + (mariamHeight * scaleFactorForPosition) - currentContainerRect.top + 20;
                    // Interpolate based on progress
                    const currentEngineerTop = startEngineerTop + (finalEngineerTop - startEngineerTop) * progress;
                    
                    // Get SOFTWARE and ENGINEER widths for centering
                    let softwareWidth = 0;
                    let engineerWidth = 0;
                    if (softwareRef.current) {
                      try {
                        const softwareRect = softwareRef.current.getBoundingClientRect();
                        softwareWidth = softwareRect.width || 0;
                      } catch (e) {
                        // Fallback to estimated width if measurement fails
                        softwareWidth = 8 * fontSizeForFallback * 0.75;
                      }
                    }
                    if (engineerRef.current) {
                      try {
                        const engineerRect = engineerRef.current.getBoundingClientRect();
                        engineerWidth = engineerRect.width || 0;
                      } catch (e) {
                        engineerWidth = 8 * fontSizeForFallback * 0.75;
                      }
                    }
                    
                    const softwareEngineerSpacing = 10;
                    const totalSoftwareEngineerWidth = softwareWidth + softwareEngineerSpacing + engineerWidth;
                    
                    // Calculate left position so that the center of SOFTWARE ENGINEER aligns with center of IAM
                    const currentSoftwareEngineerLeft = currentIamCenter - (totalSoftwareEngineerWidth / 2);
                    const currentSoftwareLeft = currentSoftwareEngineerLeft;
                    const currentEngineerLeft = currentSoftwareLeft + softwareWidth + softwareEngineerSpacing;
                    
                    // Update SOFTWARE position
                    gsap.set(softwareRef.current, {
                      left: `${currentSoftwareLeft}px`,
                      top: `${currentEngineerTop}px`,
                    });
                    
                    // Update ENGINEER position
                    gsap.set(engineerRef.current, {
                      left: `${currentEngineerLeft}px`,
                      top: `${currentEngineerTop}px`,
                    });
                    
                    // Write SOFTWARE ENGINEER from left to right as MARIAM moves
                    // Both reveal together, synchronized
                    gsap.set(softwareRef.current, {
                      clipPath: `inset(0 ${100 - progress * 100}% 0 0%)`,
                      opacity: Math.min(progress * 1.5, 1),
                    });
                    
                    gsap.set(engineerRef.current, {
                      clipPath: `inset(0 ${100 - progress * 100}% 0 0%)`,
                      opacity: Math.min(progress * 1.5, 1),
                    });
                    
                    // Animate IAM color synchronized with SOFTWARE ENGINEER reveal
                    // Use a gradient mask to reveal color from left to right
                    const revealPercent = progress * 100;
                    if (iamPartRef.current) {
                      // Target color (sage green) - transitions to sage green
                      const targetColor = '#9EA793';
                      // Starting color (darker/muted)
                      const startColor = '#888888';
                      
                      // Create a linear gradient that reveals the target color from left to right
                      // This creates a "painting" effect synchronized with SOFTWARE ENGINEER reveal
                      gsap.set(iamPartRef.current, {
                        backgroundImage: `linear-gradient(to right, ${targetColor} 0%, ${targetColor} ${revealPercent}%, ${startColor} ${revealPercent}%, ${startColor} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      });
                    }
                    
                    // Also transition SOFTWARE ENGINEER to sage green during animation
                    const sageGreen = '#9EA793';
                    if (softwareRef.current && engineerRef.current) {
                      // Transition color to sage green as progress increases
                      gsap.set(softwareRef.current, {
                        color: sageGreen,
                      });
                      gsap.set(engineerRef.current, {
                        color: sageGreen,
                      });
                    }
                  }
                },
                onComplete: function() {
                  // Finalize positions
                  if (mariamFullRef.current && fathiRef.current && contentRef.current) {
                    // Recalculate scale and positions
                    const navbarWidth = 80;
                    const viewportWidth = window.innerWidth;
                    const viewportHeight = window.innerHeight;
                    const availableWidth = viewportWidth - navbarWidth;
                    const availableHeight = viewportHeight - finalTop - 80;
                    
                    // Final scale factor - consider both width and height
                    // Account for minimum padding (32px on each side = 64px total)
                    const widthScale = (availableWidth - 64) / (mariamRect.width + currentSpacing + fathiRect.width);
                    const heightScale = availableHeight / mariamHeight;
                    const finalScaleFactor = Math.min(widthScale, heightScale, 1.0);
                    
                    // Set MARIAM position and scale first (temporary position for measurement)
                    const tempMariamLeftPos = navbarWidth + 32; // Temporary position
                    
                    gsap.set(mariamFullRef.current, {
                      left: `${tempMariamLeftPos}px`,
                      top: `${finalMariamTop}px`,
                      x: 0,
                      y: 0,
                      xPercent: 0,
                      yPercent: 0,
                      scale: finalScaleFactor,
                      transformOrigin: "left top",
                    });
                    
                    // Force reflow to get actual scaled dimensions
                    void mariamFullRef.current.offsetHeight;
                    
                    // Get the ACTUAL dimensions of MARIAM after scaling is applied
                    const actualMariamRect = mariamFullRef.current.getBoundingClientRect();
                    const actualMariamWidth = actualMariamRect.width;
                    
                    // Calculate FATHI position temporarily to get its actual width after scaling
                    const finalSpacing = currentSpacing < 0 ? 10 : currentSpacing; // Use original visual spacing, not scaled
                    const tempFathiLeftPos = tempMariamLeftPos + actualMariamWidth + finalSpacing;
                    
                    // Set FATHI temporarily to get its actual width after scaling
                    gsap.set(fathiRef.current, {
                      left: `${tempFathiLeftPos}px`,
                      top: `${finalFathiTop}px`,
                      x: 0,
                      y: 0,
                      xPercent: 0,
                      yPercent: 0,
                      scale: finalScaleFactor,
                      transformOrigin: "left top",
                    });
                    
                    // Force reflow to get actual scaled FATHI dimensions
                    void fathiRef.current.offsetHeight;
                    
                    // Get actual scaled dimensions of both elements
                    const actualFathiRect = fathiRef.current.getBoundingClientRect();
                    const actualFathiWidth = actualFathiRect.width;
                    
                    // Calculate total content width (MARIAM + spacing + FATHI) after scaling
                    const totalContentWidth = actualMariamWidth + finalSpacing + actualFathiWidth;
                    
                    // Calculate available space (viewport width minus navbar)
                    const availableSpace = viewportWidth - navbarWidth;
                    
                    // Calculate equal padding on both sides to center the content
                    const remainingSpace = availableSpace - totalContentWidth;
                    const equalPadding = Math.max(32, remainingSpace / 2); // Minimum 32px, or equal split
                    
                    // Calculate centered positions
                    const centeredMariamLeft = navbarWidth + equalPadding;
                    const centeredFathiLeft = centeredMariamLeft + actualMariamWidth + finalSpacing;
                    
                    // Update positions to be centered
                    gsap.set(mariamFullRef.current, {
                      left: `${centeredMariamLeft}px`,
                      top: `${finalMariamTop}px`,
                    x: 0,
                    y: 0,
                    xPercent: 0,
                    yPercent: 0,
                      scale: finalScaleFactor,
                      transformOrigin: "left top",
                    });
                    
                    gsap.set(fathiRef.current, {
                      left: `${centeredFathiLeft}px`,
                      top: `${finalFathiTop}px`,
                      x: 0,
                      y: 0,
                      xPercent: 0,
                      yPercent: 0,
                      scale: finalScaleFactor,
                      transformOrigin: "left top",
                    });
                  }
                  
                  // Finalize ENGINEER and SOFTWARE
                  if (engineerRef.current && softwareRef.current && iamPartRef.current && marPartRef.current && mariamFullRef.current && contentRef.current) {
                    const finalMariamRect = mariamFullRef.current.getBoundingClientRect();
                    const finalContainerRect = contentRef.current.getBoundingClientRect();
                    
                    // Final SOFTWARE ENGINEER position - centered under "IAM"
                    const finalIamRect = iamPartRef.current.getBoundingClientRect();
                    const iamCenter = finalIamRect.left - finalContainerRect.left + (finalIamRect.width / 2);
                    const engineerTop = (finalMariamRect?.bottom || 0) - finalContainerRect.top + 20;
                    
                    // Get SOFTWARE and ENGINEER widths for centering
                    let softwareWidth = 0;
                    let engineerWidth = 0;
                    if (softwareRef.current) {
                      try {
                        const softwareRect = softwareRef.current.getBoundingClientRect();
                        softwareWidth = softwareRect.width || 0;
                      } catch (e) {
                        // Fallback to estimated width if measurement fails
                        softwareWidth = 8 * fontSizeForFallback * 0.75;
                      }
                    }
                    if (engineerRef.current) {
                      try {
                        const engineerRect = engineerRef.current.getBoundingClientRect();
                        engineerWidth = engineerRect.width || 0;
                      } catch (e) {
                        engineerWidth = 8 * fontSizeForFallback * 0.75;
                      }
                    }
                    
                    const softwareEngineerSpacing = 10;
                    const totalSoftwareEngineerWidth = softwareWidth + softwareEngineerSpacing + engineerWidth;
                    
                    // Calculate left position so that the center of SOFTWARE ENGINEER aligns with center of IAM
                    const softwareEngineerLeft = iamCenter - (totalSoftwareEngineerWidth / 2);
                    const softwareLeft = softwareEngineerLeft;
                    const engineerLeft = softwareLeft + softwareWidth + softwareEngineerSpacing;
                    
                    // Set SOFTWARE ENGINEER to sage green when settled at bottom
                    const sageGreen = '#9EA793';
                    gsap.set(softwareRef.current, {
                      left: `${softwareLeft}px`,
                      top: `${engineerTop}px`,
                      clipPath: "inset(0 0% 0 0%)",
                      opacity: 1,
                      color: sageGreen,
                    });
                    
                    gsap.set(engineerRef.current, {
                      left: `${engineerLeft}px`,
                      top: `${engineerTop}px`,
                      clipPath: "inset(0 0% 0 0%)",
                      opacity: 1,
                      color: sageGreen,
                    });
                    }
                    
                    // Finalize IAM color - sage green when settled at bottom
                    if (iamPartRef.current) {
                      const sageGreen = '#9EA793';
                      gsap.set(iamPartRef.current, {
                        backgroundImage: `linear-gradient(to right, ${sageGreen} 0%, ${sageGreen} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        WebkitTextFillColor: 'transparent',
                      });
                    }
                    
                    // Dispatch navbar appearance event AFTER content has settled at final bottom position
                    window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
                }
              }, ">");
              
              // FATHI uses left/top CSS properties and must stay on same line as MARIAM
              // FATHI's top position is synchronized in MARIAM's onUpdate callback above
              // Animate FATHI's left position and scale in parallel with MARIAM
              tl.to(fathiRef.current, {
                left: `${finalFathiLeft}px`,
                scale: scaleFactor,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: function() {
                  // Lock FATHI's final position
                  if (fathiRef.current) {
                    gsap.set(fathiRef.current, {
                      left: `${finalFathiLeft}px`,
                      top: `${finalFathiTop}px`, // Final top will be set by MARIAM's onUpdate
                      x: 0,
                      y: 0,
                      clearProps: "transform",
                    });
                  }
                }
              }, "<"); // Start at same time as MARIAM
            }
          }
      }, [], 10.3); // Start 0.4s after Stage 7 completes (9.9 + 0.4 = 10.3)

      // Navbar appearance is now dispatched after content settles at final bottom position (Stage 8 onComplete)
      // This ensures navbar appears only after all animations are complete and content is in final position

      // SOFTWARE and ENGINEER final positioning will be handled later if needed
      // For now, the animation ends with IAM and ENGINEER at bottom left

    },
    { scope: heroSectionRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-start overflow-visible"
        style={{
          background: "#1A281E",
        }}
      >
        {/* Content Container - Text on Emerald Background */}
        <div
          ref={contentRef}
          className="absolute z-10"
        >
          <div className="w-full relative">
            {/* Software - positioned above MARIAM, aligned with M */}
            <h2
              ref={softwareRef}
              className="font-bold uppercase text-sm md:text-base lg:text-lg tracking-wider"
              style={{
                letterSpacing: '0.15em',
                color: '#FEFCE0',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                position: 'absolute',
              }}
            >
              SOFTWARE
            </h2>

            {/* Stage 1: MARIAM at left top - will erase MAR part, then shift IAM */}
            <h1
              ref={mariamFullRef}
              className="font-bold uppercase text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] tracking-tight leading-none"
              style={{
                letterSpacing: '-0.02em',
                textAlign: 'left',
                lineHeight: '0.9',
                color: '#FEFCE0',
                position: 'absolute',
              }}
            >
              <span ref={marPartRef} style={{ display: 'inline-block' }}>MAR</span>
              <span ref={iamPartRef} style={{ display: 'inline-block' }}>IAM</span>
            </h1>

            {/* Stage 2: IAM (after MAR erased) */}
            <h1
              ref={iamRef}
              className="font-bold uppercase text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] tracking-tight leading-none"
              style={{
                letterSpacing: '-0.02em',
                textAlign: 'left',
                lineHeight: '0.9',
                color: '#FEFCE0',
                position: 'absolute',
              }}
            >
              IAM
            </h1>

            {/* Stage 3: ENGINEER below IAM (during zoom) */}
            <h2
              ref={engineerZoomRef}
              className="font-bold uppercase tracking-wider"
              style={{
                letterSpacing: '0.15em',
                color: '#FEFCE0',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                position: 'absolute',
              }}
            >
              ENGINEER
            </h2>

            {/* FATHI - appears while ENGINEER erases */}
            <h2
              ref={fathiRef}
              className="font-bold uppercase tracking-wider"
              style={{
                letterSpacing: '0.15em',
                color: '#FEFCE0',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                position: 'absolute',
              }}
            >
              FATHI
            </h2>

            {/* Final Title - MARIAM FATHI */}
            <h1
              ref={titleRef}
              className="font-bold uppercase text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] tracking-tight leading-none"
              style={{
                letterSpacing: '-0.02em',
                textAlign: 'center',
                lineHeight: '0.9',
                color: '#FEFCE0',
              }}
            >
              MARIAM FATHI
            </h1>

            {/* Engineer - positioned below MARIAM, aligned with I in IAM */}
            <h2
              ref={engineerRef}
              className="font-bold uppercase text-sm md:text-base lg:text-lg tracking-wider"
              style={{
                letterSpacing: '0.15em',
                color: '#FEFCE0',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                position: 'absolute',
              }}
            >
              ENGINEER
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MinimalCinematicHero;