"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EverythingConnected = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const everythingRef = useRef<HTMLSpanElement>(null);
  const isConnectedRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !everythingRef.current || !isConnectedRef.current) return;

      // Initial states - words positioned off screen
      gsap.set(everythingRef.current, {
        x: window.innerWidth,
        opacity: 0,
      });

      gsap.set(isConnectedRef.current, {
        x: -window.innerWidth,
        opacity: 0,
      });

      // Scroll-triggered animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Interpolate position from off-screen to center (x: 0)
          const everythingX = gsap.utils.interpolate(window.innerWidth, 0, progress);
          const connectedX = gsap.utils.interpolate(-window.innerWidth, 0, progress);
          const opacity = progress;

          gsap.set(everythingRef.current, {
            x: everythingX,
            opacity: opacity,
          });

          gsap.set(isConnectedRef.current, {
            x: connectedX,
            opacity: opacity,
          });
        },
        onLeaveBack: () => {
          // Reset when scrolling back up
          gsap.set(everythingRef.current, {
            x: window.innerWidth,
            opacity: 0,
          });

          gsap.set(isConnectedRef.current, {
            x: -window.innerWidth,
            opacity: 0,
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #000000 100%)",
        }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[10rem] 2xl:text-[11rem] font-light text-white tracking-tight whitespace-nowrap">
              <span
                ref={everythingRef}
                className="inline-block"
                style={{
                  transformOrigin: "center",
                }}
              >
                EVERYTHING
              </span>
              <br />
              <span
                ref={isConnectedRef}
                className="inline-block text-[#d97706]"
                style={{
                  transformOrigin: "center",
                }}
              >
                IS <span className="text-[#d97706]">CONNECTED</span>
              </span>
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EverythingConnected;
