"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ReadingSectionProps {
  text?: string;
}

const ReadingSection: React.FC<ReadingSectionProps> = ({ 
  text = "We're sometimes trained—whether intuitively or in school—to isolate knowledge into pockets, where what exists in one pocket has nothing to do with what's in the other. When in reality, it's a web. And the one ingredient that fuels that web..."
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      const words = wordsRef.current.filter(Boolean);
      if (words.length === 0) return;

      // Set initial state - all words dimmed
      gsap.set(words, {
        opacity: 0.2,
        color: "rgba(255, 255, 255, 0.2)",
      });

      // Calculate scroll distance based on number of words
      const scrollDistance = words.length * 60; // Adjust this multiplier for reading speed

      // Pin the section and create scroll trigger
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          
          // Fade out the entire reading section in the last 20% of scroll
          // Allow it to fade back in when scrolling back up
          if (progress > 0.8) {
            const fadeOutProgress = (progress - 0.8) / 0.2; // 0 to 1 when progress is 0.8 to 1.0
            const sectionOpacity = 1 - fadeOutProgress;
            
            gsap.set(containerRef.current, {
              opacity: sectionOpacity,
              pointerEvents: sectionOpacity > 0.1 ? "auto" : "none",
              zIndex: sectionOpacity > 0.1 ? 10 : -1, // Move behind when invisible
              visibility: sectionOpacity > 0.1 ? "visible" : "hidden",
            });
          } else {
            // Show reading section normally
            gsap.set(containerRef.current, {
              opacity: 1,
              pointerEvents: "auto",
              zIndex: 10,
              visibility: "visible",
            });
          }
          
          words.forEach((word, index) => {
            if (!word) return;

            // Calculate when this word should light up
            const wordStart = index / words.length;
            const wordEnd = (index + 1) / words.length;
            const wordCenter = (wordStart + wordEnd) / 2;

            let opacity = 0.2;
            
            // Stop word lighting animation when section is fading out (after 80%)
            if (progress > 0.8) {
              // Words fade out with the section
              const fadeOutProgress = (progress - 0.8) / 0.2;
              opacity = 1 - fadeOutProgress;
              opacity = Math.max(0, opacity); // Never go negative
            } else if (progress < wordStart) {
              // Word hasn't been reached yet - fully dimmed
              opacity = 0.2;
            } else if (progress >= wordEnd) {
              // Word has been read - fully bright
              opacity = 1;
            } else {
              // Word is currently being read - interpolate
              const localProgress = (progress - wordStart) / (wordEnd - wordStart);
              opacity = 0.2 + (localProgress * 0.8); // Smooth transition from 0.2 to 1.0
            }

            // Add smooth easing
            opacity = Math.max(0, Math.min(1, opacity));

            gsap.set(word, {
              opacity: opacity,
              color: `rgba(255, 255, 255, ${opacity})`,
            });
          });
        },
        onLeave: () => {
          // Keep reading section hidden after scroll passes (forward)
          gsap.set(containerRef.current, {
            opacity: 0,
            pointerEvents: "none",
            zIndex: -1,
            visibility: "hidden",
          });
          
          // Hide all words
          words.forEach((word) => {
            if (word) {
              gsap.set(word, {
                opacity: 0,
                visibility: "hidden",
              });
            }
          });
        },
        onEnterBack: () => {
          // Fade reading section back in when scrolling back up
          gsap.set(containerRef.current, {
            opacity: 1,
            pointerEvents: "auto",
            zIndex: 10,
            visibility: "visible",
          });
          
          // Restore words visibility
          words.forEach((word, index) => {
            if (word) {
              gsap.set(word, {
                opacity: 1,
                visibility: "visible",
                color: "rgba(255, 255, 255, 1)",
              });
            }
          });
        },
      });

      return () => {
        pinTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [text] }
  );

  // Split text into words
  const words = text.split(/\s+/);

  return (
    <div ref={containerRef}>
      <section
        ref={sectionRef}
        data-reading-section
        className="relative min-h-screen flex items-center justify-center bg-black"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #000000 100%)",
          marginTop: '-1px',
        }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 xl:px-20">
          <div className="text-white py-12 md:py-20 lg:py-32 flex items-center justify-center min-h-screen">
            <div className="w-full flex justify-center">
              <p 
                className="text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-relaxed font-light tracking-wide text-center max-w-5xl"
                style={{
                  lineHeight: '1.9',
                  letterSpacing: '0.02em',
                }}
              >
              {words.map((word, index) => (
                <span
                  key={index}
                  ref={(el) => {
                    wordsRef.current[index] = el;
                  }}
                  className="inline-block mr-2 md:mr-3 lg:mr-4 transition-all duration-200"
                  style={{
                    opacity: 0.2,
                    color: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  {word}
                </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReadingSection;
