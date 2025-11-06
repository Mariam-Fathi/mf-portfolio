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
  const apostropheSRef = useRef<HTMLSpanElement>(null); // The "'S" part that drops cinematically
  const iamRef = useRef<HTMLHeadingElement>(null); // Stage 2: IAM only (after MAR erased)
  const engineerZoomRef = useRef<HTMLHeadingElement>(null); // Stage 3: ENGINEER below IAM
  const fathiRef = useRef<HTMLHeadingElement>(null); // FATHI that appears while ENGINEER erases
  const fathiLettersRef = useRef<(HTMLSpanElement | null)[]>([]); // Individual letters for letter-by-letter animation
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
          !marPartRef.current || !iamPartRef.current || !apostropheSRef.current || !iamRef.current || !engineerZoomRef.current || 
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

      // Position MARIAM - starts from LEFT (off-screen) and slides into position
      // This creates seamless transition from preloader where MARIAM exits to the right
      // Match preloader's top position: top-20 = 5rem (80px)
      const viewportWidth = window.innerWidth;
      const finalLeft = "7rem"; // Final position: Space from navbar (80px + 32px padding)
      const finalTop = "5rem"; // Match preloader's top-20 position (same top position)
      
      // Set MARIAM to start from left side (off-screen) - continuing from preloader
      gsap.set(mariamFullRef.current, {
        left: finalLeft,
        top: finalTop,
        x: -viewportWidth, // Start from left side (off-screen) - as if continuing from preloader
        y: 0,
        xPercent: 0,
        yPercent: 0,
        opacity: 1, // Fully visible from the start
        clipPath: "inset(0 0% 0 0%)", // Fully visible
      });

      // Set initial states for MAR and IAM parts - visible from start
      gsap.set(marPartRef.current, {
        opacity: 1, // Visible from start
        clipPath: "inset(0 0% 0 0%)", // Fully visible
        x: 0,
      });

      gsap.set(iamPartRef.current, {
        opacity: 1, // Visible from start
        clipPath: "inset(0 0% 0 0%)", // Fully visible
        x: 0, // Start at original position
      });

      gsap.set(apostropheSRef.current, {
        opacity: 1, // Visible from start
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      });

      // Create cinematic timeline - NO delay to ensure immediate appearance after preloader
      const tl = gsap.timeline({ delay: 0 });

      // Stage 0: Slide MARIAM in from the left (continuing from preloader animation)
      // Match preloader's motion: linear movement, same speed
      // Preloader: moves 2*viewportWidth in 8s (from -vw to +vw)
      // Hero: moves viewportWidth in 4s (from -vw to 0) - same speed, half the distance
      tl.to(mariamFullRef.current, {
        x: 0, // Slide to final position
        duration: 4, // Match preloader speed: 4s for viewportWidth distance (same velocity as 8s for 2*viewportWidth)
        ease: "none", // Linear movement - same as preloader for seamless connectivity
      }, 0);

      // Stage 2: Erase "MAR" part - animate it out with motion (like erasing)
      // Start after MARIAM slides into position (4s slide-in + 0.3s pause = 4.3s)
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
      }, 4.3); // Start 0.3s after MARIAM slide-in completes (4s + 0.3s pause)

      // Stage 2.5: Drop 'S cinematically when MAR is erased - REALISTIC PHYSICS-BASED DROP
      // Start simultaneously with MAR erasing for dramatic effect
      tl.call(function() {
        if (apostropheSRef.current && heroSectionRef.current) {
          // Force reflow to get accurate position
          void apostropheSRef.current.offsetHeight;
          
          // Get 'S current position in viewport (before any transforms)
          const apostropheSRect = apostropheSRef.current.getBoundingClientRect();
          
          // Calculate random rotation values once for consistency
          const initialRotation = 180 + Math.random() * 180; // 180-360 degrees
          const midRotation = 360 + Math.random() * 180; // 360-540 degrees
          const finalRotation = 540 + Math.random() * 180; // 540-720 degrees
          
          // Extract 'S from parent flow and position fixed for drop (escape all transforms)
          gsap.set(apostropheSRef.current, {
            position: 'fixed', // Use fixed to escape all parent transforms
            left: `${apostropheSRect.left}px`, // Use viewport coordinates
            top: `${apostropheSRect.top}px`, // Use viewport coordinates
            x: 0, // Reset any existing transforms
            y: 0,
            transformOrigin: 'center center',
            zIndex: 10000, // Very high z-index to stay above everything
            filter: 'blur(0px)', // Start with no blur
            margin: 0,
            padding: 0,
            willChange: 'transform, opacity, filter',
          });
        }
      }, [], 4.3); // Start at same time as MAR erasing
      
      // REALISTIC DROP ANIMATION - Physics-based with acceleration
      // Phase 1: Initial drop with acceleration (gravity pulling it down)
      tl.to(apostropheSRef.current, {
        y: 300, // Drop much further down (300px)
        x: 20, // Slight horizontal drift (like real falling)
        rotation: 180 + Math.random() * 180, // Spin 180-360 degrees
        scale: 0.8, // Slight shrink
        filter: 'blur(3px)', // Motion blur during fast fall
        duration: 0.8,
        ease: "power2.in", // Accelerating (gravity pulling faster)
      }, 4.3); // Start at same time as MAR erasing
      
      // Phase 2: Continue falling with more acceleration and fade
      tl.to(apostropheSRef.current, {
        y: 600, // Continue falling further (relative to start)
        x: 40, // More horizontal drift
        rotation: 360 + Math.random() * 180, // Continue spinning
        scale: 0.4, // Shrink more as it falls away
        filter: 'blur(8px)', // More motion blur
        opacity: 0.3, // Start fading
        duration: 0.6,
        ease: "power3.in", // Even faster acceleration
      }, 5.1); // Continue from phase 1 (4.3 + 0.8 = 5.1)
      
      // Phase 3: Final drop with fade out
      tl.to(apostropheSRef.current, {
        y: 1000, // Final drop position (off screen)
        x: 60, // Final horizontal position
        rotation: 540 + Math.random() * 180, // Keep spinning
        scale: 0.2, // Very small
        filter: 'blur(15px)', // Heavy blur
        opacity: 0, // Fully fade out
        duration: 0.4,
        ease: "power4.in", // Maximum acceleration
      }, 5.7); // Continue from phase 2 (5.1 + 0.6 = 5.7)

      // Stage 3: Shift IAM up and show ENGINEER below with same font
      // Also position FATHI directly beside MARIAM at the same time
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
      }, 5.3); // Start after Stage 2 completes (4.3 + 1.0 = 5.3)

      // Stage 4: Simultaneously erase ENGINEER while rewriting "MAR"
      // Ensure ENGINEER starts with visible clipPath for erasing
      tl.call(function() {
        if (engineerZoomRef.current) {
          gsap.set(engineerZoomRef.current, {
            clipPath: "inset(0 0% 0 0%)", // Fully visible
          });
        }
      }, [], 7.3); // Start after ENGINEER typing completes (6.1 + 1.2 = 7.3)

      // Stage 4a: Shift IAM back to its original position (to make room for MAR)
      tl.to(iamPartRef.current, {
        x: 0, // Shift back to original position (to the right of MAR)
        duration: 0.8,
        ease: "power2.inOut",
      }, 7.3);

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
      }, 7.5); // Start slightly after Stage 4a

      // Restore MAR visibility - happens simultaneously with ENGINEER erasing
      tl.to(marPartRef.current, {
        clipPath: "inset(0 0% 0 0%)", // Restore MAR visibility
        opacity: 1,
        duration: 1.5, // Match ENGINEER erasing duration for synchronization
        ease: "power2.out",
      }, 7.5); // Start at same time as ENGINEER erasing

      // Stage 5: After MAR restoration completes, write SOFTWARE ENGINEER with IAM color change synced
      // This happens immediately after MARIAM is complete (at 9.0s)
      // FATHI will be written AFTER everything moves to bottom
      gsap.set(fathiRef.current, {
        opacity: 0,
        visibility: "hidden",
        clipPath: "inset(0 100% 0 0%)", // Start hidden
      });

      // Stage 6: Write SOFTWARE ENGINEER with IAM color change synced (immediately after MARIAM is complete)
      tl.call(function() {
        if (mariamFullRef.current && softwareRef.current && engineerRef.current && iamPartRef.current && contentRef.current) {
          // Get MARIAM's current position to position SOFTWARE ENGINEER
          const mariamRect = mariamFullRef.current.getBoundingClientRect();
          const containerRect = contentRef.current.getBoundingClientRect();
          const iamRect = iamPartRef.current.getBoundingClientRect();
          
          // Calculate IAM center for centering SOFTWARE ENGINEER
          const iamCenter = iamRect.left - containerRect.left + (iamRect.width / 2);
          const engineerTop = mariamRect.bottom - containerRect.top + 20; // 20px below MARIAM
          
          // Measure SOFTWARE and ENGINEER widths
          const smallFontSize = "1rem";
          const fontSize = parseFloat(smallFontSize);
          let softwareWidth = 8 * fontSize * 0.75; // Estimate
          let engineerWidth = 8 * fontSize * 0.75; // Estimate
          
          // Set SOFTWARE and ENGINEER to measure actual widths
            gsap.set(softwareRef.current, {
              fontSize: smallFontSize,
              fontWeight: "bold",
              letterSpacing: "0.15em",
            opacity: 0,
            clipPath: "inset(0 100% 0 0%)",
              visibility: "visible",
            position: "absolute",
            });
          
            gsap.set(engineerRef.current, {
              fontSize: smallFontSize,
              fontWeight: "bold",
              letterSpacing: "0.15em",
            opacity: 0,
            clipPath: "inset(0 100% 0 0%)",
              visibility: "visible",
            position: "absolute",
            });
            
          // Force reflow
            void softwareRef.current.offsetHeight;
            void engineerRef.current.offsetHeight;
            
          // Get actual widths
            try {
              const softwareRect = softwareRef.current.getBoundingClientRect();
            softwareWidth = softwareRect.width || softwareWidth;
          } catch (e) {}
          
          try {
              const engineerRect = engineerRef.current.getBoundingClientRect();
            engineerWidth = engineerRect.width || engineerWidth;
          } catch (e) {}
          
          const softwareEngineerSpacing = 10;
          const totalSoftwareEngineerWidth = softwareWidth + softwareEngineerSpacing + engineerWidth;
          const softwareEngineerLeft = iamCenter - (totalSoftwareEngineerWidth / 2);
          const softwareLeft = softwareEngineerLeft;
          const engineerLeft = softwareLeft + softwareWidth + softwareEngineerSpacing;
          
          // Position SOFTWARE and ENGINEER
            gsap.set(softwareRef.current, {
            left: `${softwareLeft}px`,
            top: `${engineerTop}px`,
            x: 0,
            y: 0,
          });
          
            gsap.set(engineerRef.current, {
            left: `${engineerLeft}px`,
            top: `${engineerTop}px`,
            x: 0,
            y: 0,
          });
        }
      }, [], 9.0); // Start immediately after MAR restoration completes (7.5 + 1.5 = 9.0s)
      
      // Write SOFTWARE ENGINEER and change IAM color simultaneously
      tl.call(function() {
        if (softwareRef.current && engineerRef.current && iamPartRef.current) {
          const limeGreen = '#CEF17B';
          
          // Write SOFTWARE ENGINEER from left to right
          tl.to([softwareRef.current, engineerRef.current], {
            clipPath: "inset(0 0% 0 0%)",
            opacity: 1,
            color: limeGreen,
            duration: 1.2,
            ease: "power2.inOut",
          }, ">");
          
          // Simultaneously change IAM color - synced with SOFTWARE ENGINEER reveal
          tl.to(iamPartRef.current, {
            backgroundImage: `linear-gradient(to right, ${limeGreen} 0%, ${limeGreen} 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            duration: 1.2,
            ease: "power2.inOut",
          }, "<"); // Start at same time as SOFTWARE ENGINEER
        }
      }, [], ">");

      // Stage 7: Immediately after SOFTWARE ENGINEER is written, move ALL to bottom position together
      // MARIAM + SOFTWARE ENGINEER move together smoothly to final bottom position
      tl.call(function() {
        if (mariamFullRef.current && engineerRef.current && softwareRef.current && contentRef.current && heroSectionRef.current && iamPartRef.current) {
          // Force reflow
          void mariamFullRef.current.offsetHeight;
          
          // Get viewport dimensions
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          
          // Get current positions
          const mariamRect = mariamFullRef.current.getBoundingClientRect();
          const containerRect = contentRef.current.getBoundingClientRect();
          const iamRect = iamPartRef.current.getBoundingClientRect();
          
          // Measure SOFTWARE ENGINEER height
          const smallFontSize = "1rem";
          let actualSoftwareEngineerHeight = parseFloat(smallFontSize) * 1.5;
          try {
            const softwareRect = softwareRef.current.getBoundingClientRect();
            const engineerRect = engineerRef.current.getBoundingClientRect();
            actualSoftwareEngineerHeight = Math.max(softwareRect.height, engineerRect.height) || actualSoftwareEngineerHeight;
          } catch (e) {}
          
          const mariamHeight = mariamRect.height;
          const spacingBetweenMariamAndEngineer = 20;
          
          // Calculate scale and final position
          const isMobile = viewportWidth < 768;
          const navbarWidth = isMobile ? 80 : 48;
          const minPadding = 32;
          const availableWidth = viewportWidth - navbarWidth - minPadding;
          const mariamWidth = mariamRect.width;
          const widthScaleFactor = (availableWidth) / mariamWidth;
          
          let scaleFactor = Math.min(widthScaleFactor, 1.0);
          let finalTop = 0;
          let iterations = 0;
          const maxIterations = 5;
          
          while (iterations < maxIterations) {
            const scaledMariamHeight = mariamHeight * scaleFactor;
            const totalContentHeight = scaledMariamHeight + spacingBetweenMariamAndEngineer + actualSoftwareEngineerHeight;
            finalTop = viewportHeight - totalContentHeight;
            const availableHeight = viewportHeight - finalTop;
            const heightScaleFactor = availableHeight / totalContentHeight;
            const newScaleFactor = Math.min(widthScaleFactor, heightScaleFactor, 1.0);
            
            if (Math.abs(newScaleFactor - scaleFactor) < 0.001) {
              scaleFactor = newScaleFactor;
              break;
            }
            scaleFactor = newScaleFactor;
            iterations++;
          }
          
          const scaledMariamHeight = mariamHeight * scaleFactor;
          const totalContentHeightEstimate = scaledMariamHeight + spacingBetweenMariamAndEngineer + actualSoftwareEngineerHeight;
          finalTop = viewportHeight - totalContentHeightEstimate;
          
          if (finalTop < 0) {
            const maxAvailableHeight = viewportHeight - spacingBetweenMariamAndEngineer - actualSoftwareEngineerHeight;
            const adjustedScale = maxAvailableHeight / mariamHeight;
            scaleFactor = Math.min(widthScaleFactor, adjustedScale, 1.0);
            const adjustedScaledMariamHeight = mariamHeight * scaleFactor;
            const adjustedTotalContentHeight = adjustedScaledMariamHeight + spacingBetweenMariamAndEngineer + actualSoftwareEngineerHeight;
            finalTop = viewportHeight - adjustedTotalContentHeight;
          }
          
          // Calculate current positions
          const currentMariamTop = mariamRect.top - containerRect.top;
          const currentMariamLeft = mariamRect.left - containerRect.left;
          const deltaMariamY = finalTop - currentMariamTop;
          
          // Calculate final SOFTWARE ENGINEER positions (they move with MARIAM)
          const scaledMariamHeightFinal = mariamHeight * scaleFactor;
          const finalMariamBottom = finalTop + scaledMariamHeightFinal;
          const iamCenter = iamRect.left - containerRect.left + (iamRect.width / 2);
          
          // Get SOFTWARE and ENGINEER widths
          let softwareWidth = 0;
          let engineerWidth = 0;
          try {
            softwareWidth = softwareRef.current.getBoundingClientRect().width || 0;
            engineerWidth = engineerRef.current.getBoundingClientRect().width || 0;
          } catch (e) {
            const fontSize = parseFloat(smallFontSize);
            softwareWidth = 8 * fontSize * 0.75;
            engineerWidth = 8 * fontSize * 0.75;
          }
          
          const softwareEngineerSpacing = 10;
          const totalSoftwareEngineerWidth = softwareWidth + softwareEngineerSpacing + engineerWidth;
          const softwareEngineerLeft = iamCenter - (totalSoftwareEngineerWidth / 2);
          const finalSoftwareLeft = softwareEngineerLeft;
          const finalEngineerLeft = finalSoftwareLeft + softwareWidth + softwareEngineerSpacing;
          const finalEngineerTop = finalMariamBottom - containerRect.top + 20;
          
          // Get current SOFTWARE ENGINEER positions
          const currentSoftwareTop = softwareRef.current.getBoundingClientRect().top - containerRect.top;
          const currentEngineerTop = engineerRef.current.getBoundingClientRect().top - containerRect.top;
          const currentSoftwareLeft = softwareRef.current.getBoundingClientRect().left - containerRect.left;
          const currentEngineerLeft = engineerRef.current.getBoundingClientRect().left - containerRect.left;
          
          // Calculate deltas
          const deltaSoftwareY = finalEngineerTop - currentSoftwareTop;
          const deltaEngineerY = finalEngineerTop - currentEngineerTop;
          const deltaSoftwareX = finalSoftwareLeft - currentSoftwareLeft;
          const deltaEngineerX = finalEngineerLeft - currentEngineerLeft;
          
          // Store values for later use (for FATHI and centering)
          const storedFinalTop = finalTop;
          const storedScaleFactor = scaleFactor;
          const storedFinalSoftwareLeft = finalSoftwareLeft;
          const storedFinalEngineerLeft = finalEngineerLeft;
          const storedFinalEngineerTop = finalEngineerTop;
          
          // Move MARIAM and SOFTWARE ENGINEER together to bottom position
          // Show navbar while moving down (partway through the animation for natural feel)
          tl.call(function() {
            window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
          }, [], ">+=0.6"); // Show navbar 0.6s into the downward movement (40% through)
          
          tl.to(mariamFullRef.current, {
            y: deltaMariamY,
            scale: scaleFactor,
            duration: 1.5,
            ease: "power2.out", // Slight bounce for landing feel
            onComplete: function() {
              // MARIAM lands - add a subtle settle effect
              gsap.to(mariamFullRef.current, {
                y: "+=5", // Slight overshoot
                duration: 0.2,
                ease: "power2.out",
                onComplete: function() {
                  // Settle back to final position
                  gsap.to(mariamFullRef.current, {
                    y: "-=5",
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: function() {
                      // After MARIAM settles, finalize positions
                      gsap.set(mariamFullRef.current, {
                        left: `${currentMariamLeft}px`,
                        top: `${storedFinalTop}px`,
                        scale: storedScaleFactor,
                        x: 0,
                        y: 0,
                        clearProps: "transform",
                      });
                      
                      gsap.set(softwareRef.current, {
                        left: `${storedFinalSoftwareLeft}px`,
                        top: `${storedFinalEngineerTop}px`,
                        x: 0,
                        y: 0,
                        clearProps: "transform",
                      });
                      
                      gsap.set(engineerRef.current, {
                        left: `${storedFinalEngineerLeft}px`,
                        top: `${storedFinalEngineerTop}px`,
                        x: 0,
                        y: 0,
                        clearProps: "transform",
                      });
                    } // Close onComplete function (line 571)
                  }); // Close gsap.to from line 567
                } // Close onComplete function (line 565)
              }); // Close gsap.to from line 561
            } // Close onComplete function (line 559)
          }, ">"); // Close tl.to from line 554

          // Stage 8: Write FATHI after MARIAM has landed and settled
          // This happens after MARIAM's landing animation completes
          tl.call(function() {
            if (mariamFullRef.current && fathiRef.current && contentRef.current) {
              // Get MARIAM's final position and font properties
              const mariamRect = mariamFullRef.current.getBoundingClientRect();
              const containerRect = contentRef.current.getBoundingClientRect();
              const mariamStyle = window.getComputedStyle(mariamFullRef.current);
              const mariamFontSize = mariamStyle.fontSize;
              const mariamFontWeight = mariamStyle.fontWeight;
              const mariamLetterSpacing = mariamStyle.letterSpacing;
              const mariamLineHeight = mariamStyle.lineHeight;
              
              // Calculate FATHI position directly beside MARIAM (natural positioning)
              const spacing = 10;
              const mariamRight = mariamRect.right - containerRect.left;
              const mariamTop = mariamRect.top - containerRect.top;
              
              // Position FATHI container beside MARIAM
              gsap.set(fathiRef.current, {
                left: `${mariamRight + spacing}px`,
                top: `${mariamTop}px`,
                x: 0,
                y: 0,
                xPercent: 0,
                yPercent: 0,
                scale: storedScaleFactor,
                fontSize: mariamFontSize,
                fontWeight: mariamFontWeight,
                letterSpacing: mariamLetterSpacing,
                lineHeight: mariamLineHeight,
                textAlign: "left",
                whiteSpace: "nowrap",
                overflow: "visible",
                zIndex: 10,
                opacity: 1,
                visibility: "visible",
                clipPath: "inset(0 100% 0 0%)",
              });
              
              // Reset all letter spans
              const letterSpans = fathiRef.current.querySelectorAll('span');
              letterSpans.forEach((letter) => {
                gsap.set(letter, { opacity: 1, y: 0 });
              });
              
              void fathiRef.current.offsetHeight;
              
              // Write FATHI smoothly
              tl.to(fathiRef.current, {
                clipPath: "inset(0 0% 0 0%)",
                opacity: 1,
                duration: 1.2, // Smooth reveal
                ease: "power2.inOut",
                onComplete: function() {
                  // After FATHI is written, update SOFTWARE ENGINEER positions and center
                  if (mariamFullRef.current && softwareRef.current && engineerRef.current && iamPartRef.current && contentRef.current) {
                    void mariamFullRef.current.offsetHeight;
                    void iamPartRef.current.offsetHeight;
                    
                    const finalMariamRect = mariamFullRef.current.getBoundingClientRect();
                    const finalContainerRect = contentRef.current.getBoundingClientRect();
                    const finalIamRect = iamPartRef.current.getBoundingClientRect();
                    
                    const iamCenter = finalIamRect.left - finalContainerRect.left + (finalIamRect.width / 2);
                    const engineerTop = (finalMariamRect?.bottom || 0) - finalContainerRect.top + 20;
                    
                    const smallFontSize = "1rem";
                    const fontSizeForFallback = parseFloat(smallFontSize);
                    let softwareWidth = 0;
                    let engineerWidth = 0;
                    
                    try {
                      softwareWidth = softwareRef.current.getBoundingClientRect().width || 0;
                      engineerWidth = engineerRef.current.getBoundingClientRect().width || 0;
                    } catch (e) {
                      softwareWidth = 8 * fontSizeForFallback * 0.75;
                      engineerWidth = 8 * fontSizeForFallback * 0.75;
                    }
                    
                    const softwareEngineerSpacing = 10;
                    const totalSoftwareEngineerWidth = softwareWidth + softwareEngineerSpacing + engineerWidth;
                    const softwareEngineerLeft = iamCenter - (totalSoftwareEngineerWidth / 2);
                    const softwareLeft = softwareEngineerLeft;
                    const engineerLeft = softwareLeft + softwareWidth + softwareEngineerSpacing;
                    
                    gsap.set(softwareRef.current, {
                      left: `${softwareLeft}px`,
                      top: `${engineerTop}px`,
                      x: 0,
                      y: 0,
                      clearProps: "transform",
                    });
                    
                    gsap.set(engineerRef.current, {
                      left: `${engineerLeft}px`,
                      top: `${engineerTop}px`,
                      x: 0,
                      y: 0,
                      clearProps: "transform",
                    });
                    
                    // Center MARIAM and FATHI
                    if (fathiRef.current && heroSectionRef.current) {
                      void fathiRef.current.offsetHeight;
                      const fathiRect = fathiRef.current.getBoundingClientRect();
                      const mariamWidth = finalMariamRect.width;
                      const fathiWidth = fathiRect.width;
                      const spacing = 10;
                      const totalContentWidth = mariamWidth + spacing + fathiWidth;
                      
                      const viewportWidth = window.innerWidth;
                      const isMobile = viewportWidth < 768;
                      const navbarWidth = isMobile ? 80 : 48;
                      const availableWidth = viewportWidth - navbarWidth;
                      const remainingSpace = availableWidth - totalContentWidth;
                      const leftPadding = navbarWidth + (remainingSpace / 2);
                      
                      const finalMariamLeft = leftPadding - finalContainerRect.left;
                      const finalFathiLeft = finalMariamLeft + mariamWidth + spacing;
                      
                      const currentMariamLeft = finalMariamRect.left - finalContainerRect.left;
                      const currentFathiLeft = fathiRect.left - finalContainerRect.left;
                      
                      const deltaMariamX = finalMariamLeft - currentMariamLeft;
                      const deltaFathiX = finalFathiLeft - currentFathiLeft;
                      
                      // Natural shifting - MARIAM shifts first, FATHI follows
                      tl.to(mariamFullRef.current, {
                        x: deltaMariamX,
                        duration: 1.2,
                        ease: "power2.inOut",
                      }, ">");
                      
                      tl.to(fathiRef.current, {
                        x: deltaFathiX,
                        duration: 1.3,
                        ease: "power2.inOut",
                        onComplete: function() {
                          // Finalize positions and trigger flip animation
                          const storedFinalTop = finalMariamRect.top - finalContainerRect.top;
                          
                          gsap.set(mariamFullRef.current, {
                            left: `${finalMariamLeft}px`,
                            top: `${storedFinalTop}px`,
                            x: 0,
                            y: 0,
                            clearProps: "transform",
                          });
                          
                          gsap.set(fathiRef.current, {
                            left: `${finalFathiLeft}px`,
                            top: `${storedFinalTop}px`,
                            x: 0,
                            y: 0,
                            clearProps: "transform",
                          });
                          
                          // Update SOFTWARE ENGINEER positions
                          if (mariamFullRef.current && iamPartRef.current && contentRef.current) {
                            void mariamFullRef.current.offsetHeight;
                            const centeredMariamRect = mariamFullRef.current.getBoundingClientRect();
                            const centeredIamRect = iamPartRef.current.getBoundingClientRect();
                            const centeredContainerRect = contentRef.current.getBoundingClientRect();
                          
                          const centeredIamCenter = centeredIamRect.left - centeredContainerRect.left + (centeredIamRect.width / 2);
                          const centeredEngineerTop = (centeredMariamRect?.bottom || 0) - centeredContainerRect.top + 20;
                          const centeredSoftwareLeft = centeredIamCenter - (totalSoftwareEngineerWidth / 2);
                          const centeredEngineerLeft = centeredSoftwareLeft + softwareWidth + softwareEngineerSpacing;
                          
                          gsap.set(softwareRef.current, {
                            left: `${centeredSoftwareLeft}px`,
                            top: `${centeredEngineerTop}px`,
                            x: 0,
                            y: 0,
                            clearProps: "transform",
                          });
                          
                          gsap.set(engineerRef.current, {
                            left: `${centeredEngineerLeft}px`,
                            top: `${centeredEngineerTop}px`,
                            x: 0,
                            y: 0,
                            clearProps: "transform",
                          });
                          
                          gsap.killTweensOf([mariamFullRef.current, softwareRef.current, engineerRef.current, fathiRef.current]);
                          
                          // Stage 10: Flip animation
                          const flipElements = [
                            iamPartRef.current,
                            softwareRef.current,
                            engineerRef.current,
                          ].filter(Boolean) as HTMLElement[];
                          
                          if (flipElements.length > 0) {
                            flipElements.forEach((el) => {
                              if (el) {
                                gsap.set(el, {
                                  rotationY: 90,
                                  opacity: 0.3,
                                  scale: 0.8,
                                  transformPerspective: 1000,
                                  transformStyle: "preserve-3d",
                                  backfaceVisibility: "hidden",
                                });
                              }
                            });
                            
                            tl.to(flipElements, {
                              rotationY: 0,
                              opacity: 1,
                              scale: 1,
                              duration: 1.2,
                              ease: "back.out(1.5)", // Cinematic bounce back
                              stagger: { amount: 0.8, from: "start", ease: "power2.inOut" },
                              transformPerspective: 1000,
                            }, ">+=0.3"); // Start 0.3s after centering completes
                            
                            tl.to(flipElements, {
                              scale: 1.05,
                              duration: 0.3,
                              ease: "power2.out",
                              stagger: { amount: 0.3, from: "start" },
                            }, ">+=0.2");
                            
                            tl.to(flipElements, {
                              scale: 1,
                              duration: 0.4,
                              ease: "power2.inOut",
                              stagger: { amount: 0.2, from: "start" },
                              onComplete: function() {
                                flipElements.forEach((el) => {
                                  if (el) {
                                    gsap.set(el, {
                                      rotationY: 0,
                                      scale: 1,
                                      opacity: 1,
                                      clearProps: "transform",
                                    });
                                  }
                                });
                                
                                if (softwareRef.current && engineerRef.current) {
                                  gsap.set(softwareRef.current, {
                                    left: `${centeredSoftwareLeft}px`,
                                    top: `${centeredEngineerTop}px`,
                                    x: 0,
                                    y: 0,
                                    clearProps: "transform",
                                  });
                                  
                                  gsap.set(engineerRef.current, {
                                    left: `${centeredEngineerLeft}px`,
                                    top: `${centeredEngineerTop}px`,
                                    x: 0,
                                    y: 0,
                                    clearProps: "transform",
                                  });
                                }
                              }
                            }, ">");
                            }
                          }
                        }
                      }, ">");
                    }
                  }
                }
              }, ">");
            }
          }, [], ">");
    
    // Move SOFTWARE and ENGINEER together with MARIAM
    if (softwareRef.current && engineerRef.current) {
      tl.to([softwareRef.current, engineerRef.current], {
        x: (index) => index === 0 ? deltaSoftwareX : deltaEngineerX,
        y: (index) => index === 0 ? deltaSoftwareY : deltaEngineerY,
        duration: 1.5,
        ease: "power2.inOut",
      }, "<"); // Start at same time as MARIAM
    }
  }
}, [], ">"); // Close Stage 7 tl.call - Start immediately after SOFTWARE ENGINEER is written

      // Stage 9: Scroll exit animation - Move horizontally to the right side with stagger when scrolling to projects
      // Wait for projects section to exist before setting up ScrollTrigger
      const setupScrollExit = () => {
        const projectsSection = document.querySelector('#projects');
        if (!projectsSection) {
          // Retry after a short delay if projects section isn't loaded yet
          setTimeout(setupScrollExit, 100);
          return;
        }

        // Collect all hero text elements to animate
        const heroTextElements = [
          mariamFullRef.current,
          fathiRef.current,
          softwareRef.current,
          engineerRef.current,
        ].filter(Boolean) as HTMLElement[]; // Filter out null refs

        if (heroTextElements.length === 0) return;

        // Create timeline for smooth scrubbed horizontal exit animation
        const exitTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: projectsSection,
            start: "top bottom-=300", // Start when projects section is 300px from entering viewport
            end: "top bottom+=100", // End slightly after projects enters viewport
            scrub: 3.0, // Slower scrubbing for smoother, more controlled animation
            toggleActions: "play none reverse none", // Reverse on scroll back
          },
        });

        // Move horizontally to the right side of screen with stagger animation (SLOW)
        const viewportWidth = window.innerWidth;
        exitTimeline.to(heroTextElements, {
          x: viewportWidth, // Move to right side of screen (off-screen)
          opacity: 0,
          duration: 2.5, // Increased duration for slower movement
          ease: "power1.inOut", // Slower easing for more gradual motion
          stagger: {
            amount: 1.5, // Increased stagger over 1.5s - creates slower cascading effect
            from: "start", // Start from first element
            ease: "power1.inOut",
          },
        });
      };

      // Setup scroll exit animation after a short delay to ensure DOM is ready
      setTimeout(setupScrollExit, 500);

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
          style={{
            overflow: "visible", // Ensure FATHI is not cropped
            perspective: "1000px", // Enable 3D transforms for flip animation
            transformStyle: "preserve-3d",
          }}
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
              <span ref={apostropheSRef} style={{ display: 'inline-block' }}>'S</span>
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

            {/* FATHI - appears while ENGINEER erases - letter by letter */}
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
              {'FATHI'.split('').map((letter, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    if (el) fathiLettersRef.current[index] = el;
                  }}
                  style={{ display: 'inline-block', opacity: 0 }}
                >
                  {letter}
                </span>
              ))}
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