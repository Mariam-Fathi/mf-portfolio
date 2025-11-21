"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  isVisible: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isVisible }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "HELLO";
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const breathingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedTypingRef = useRef(false);
  const isUnmountingRef = useRef(false);
  const currentIndexRef = useRef(0);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
      if (breathingTimeoutRef.current) {
        clearTimeout(breathingTimeoutRef.current);
        breathingTimeoutRef.current = null;
      }
    };
  }, []); // Only run on mount/unmount

  // Reset typing state when component becomes invisible
  useEffect(() => {
    if (!isVisible) {
      hasStartedTypingRef.current = false;
      currentIndexRef.current = 0;
    }
  }, [isVisible]);

  // Handle typing animation - start when visible, continue until complete regardless of isVisible
  useEffect(() => {
    // Only start if visible, hasn't started, and no interval is running
    if (isVisible && !hasStartedTypingRef.current) {
      // Reset text for typing animation
      setDisplayedText("");
      setIsTypingComplete(false);
      setShouldHide(false);
      setShowCursor(true);
      hasStartedTypingRef.current = true;
      currentIndexRef.current = 0;
      
      // Clear any existing intervals first
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
      
      // Typing animation - fast typing, then pause before hero enters
      // Store fullText in a ref to avoid dependency issues
      const textToType = fullText;
      typingIntervalRef.current = setInterval(() => {
        // Use ref to track index so it persists across renders
        if (currentIndexRef.current < textToType.length) {
          const newText = textToType.slice(0, currentIndexRef.current + 1);
          setDisplayedText(newText);
          currentIndexRef.current++;
        } else {
          // Typing complete
          setIsTypingComplete(true);
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
            typingIntervalRef.current = null;
          }
          
          // Pause/breathing effect after typing completes - then hide cursor
          breathingTimeoutRef.current = setTimeout(() => {
            setShowCursor(false);
            // After cursor hides, wait a bit more before allowing fade out
            setTimeout(() => {
              // Ready for hero to enter
            }, 300);
          }, 800); // Shorter pause - 0.8 second
        }
      }, 80); // Faster typing - 80ms per character
    }

    // No cleanup - let the interval complete naturally
    // The interval will clear itself when typing is complete
  }, [isVisible]); // Removed fullText from dependencies to prevent re-runs

  // Cinematic fade in with blur effect
  useEffect(() => {
    if (!preloaderRef.current || !textRef.current || !isVisible) return;

    // Start with blur and fade
    gsap.set([preloaderRef.current, textRef.current], { 
      opacity: 0,
      filter: "blur(10px)",
    });
    
    // Smooth fade in with blur out
    gsap.to([preloaderRef.current, textRef.current], {
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.8,
      ease: "power2.out",
    });
  }, [isVisible]);

  // Handle fade out - only after typing is complete and breathing pause
  useEffect(() => {
    if (!isVisible) {
      setShouldHide(true);
    }
  }, [isVisible]);

  useEffect(() => {
    // Cinematic fade out with blur - smooth transition to hero
    if (shouldHide && isTypingComplete && !showCursor && preloaderRef.current) {
      // Fade out text first
      if (textRef.current) {
        gsap.to(textRef.current, {
          opacity: 0,
          filter: "blur(5px)",
          duration: 0.5,
          ease: "power2.in",
        });
      }
      
      // Then fade out entire preloader with blur
      gsap.to(preloaderRef.current, {
        opacity: 0,
        filter: "blur(15px)",
        duration: 0.6,
        ease: "power2.in",
        delay: 0.2,
      });
    }
  }, [shouldHide, isTypingComplete, showCursor]);

  // Keep visible until typing is complete and breathing pause, even if isVisible becomes false
  const shouldRender = isVisible || (!isTypingComplete && displayedText.length > 0) || (isTypingComplete && showCursor);
  
  if (!shouldRender && shouldHide && isTypingComplete && !showCursor) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#F9E7C9" }}
    >
      <div ref={textRef} className="text-center">
        <div 
          className="text-6xl font-bold"
          style={{
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 700,
            color: "#280B0B",
            letterSpacing: "0.05em",
            display: "inline-block",
          }}
        >
          {displayedText}
          {showCursor && (
            <span 
              ref={cursorRef}
              className="cursor-blink"
              style={{
                display: "inline-block",
                width: "3px",
                height: "1em",
                backgroundColor: "#280B0B",
                marginLeft: "4px",
                verticalAlign: "baseline",
              }}
            />
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes cursor-blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        .cursor-blink {
          animation: cursor-blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Preloader;

