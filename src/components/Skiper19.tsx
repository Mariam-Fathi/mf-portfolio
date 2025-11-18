"use client";

import React, { useRef } from "react";

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const startCircleRef = useRef<HTMLDivElement>(null);
  const tarqiaCircleRef = useRef<HTMLDivElement>(null);
  const dracodeCircleRef = useRef<HTMLDivElement>(null);


  return (
    <section
      ref={ref}
      className="mx-auto h-[350vh] w-screen overflow-x-visible overflow-y-hidden bg-[#F5ECE1] px-4 relative"
    >
      {/* Top Right Circle - Medium */}
      <div 
        ref={startCircleRef}
        className="fixed top-[100px] sm:top-[120px] right-[5vw] sm:right-[8vw] w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-full bg-[#F5C2D1] z-20 flex items-center justify-center">
        <div className="text-[#1F3A4B] text-xs sm:text-sm md:text-base font-bold text-center px-2">
          
        </div>
      </div>

      {/* TARQIA Circle */}
      <div ref={tarqiaCircleRef} className="fixed top-[60vh] sm:top-[60vh] left-[5vw] sm:left-[8vw] w-[80vw] h-[80vw] sm:w-[550px] sm:h-[550px] md:w-[650px] md:h-[650px] rounded-full bg-[#1F3A4B] text-[#F5ECE1] relative z-20 flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 overflow-visible">
        {/* SVG with circular text path on outer edge */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid" style={{ overflow: 'visible' }}>
          <defs>
            {/* Circle path: center at 100,100, radius 78 (for text on outer edge) */}
            <path id="tarqia-circle" d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178 A 78,78 0 0,1 22,100 A 78,78 0 0,1 100,22 Z" />
            {/* Arc segment for dashed line - covers the empty space between TARQIA and MOBILE ENGINEER */}
            <path id="dash-arc-segment" d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178" />
          </defs>
          
          {/* TARQIA text following the outer edge path */}
          <text fill="#F5C2D1" fontSize="20" fontWeight="bold" letterSpacing="0.1em">
            <textPath href="#tarqia-circle" startOffset="3%" textAnchor="start">
              TARQIA
            </textPath>
          </text>
          
          {/* Solid line only in the empty arc between TARQIA and MOBILE ENGINEER - rotated clockwise */}
          {/* Path shows only the empty space between texts (from ~15% to ~50% of circle) */}
          <path
            d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178"
            fill="none"
            stroke="#F5C2D1"
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
            strokeDasharray="150 340.22"
            strokeDashoffset="50"
            transform="rotate(90 100 100)"
          />
          
          {/* Copy of line positioned clockwise and shorter */}
          <path
            d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178"
            fill="none"
            stroke="#F5C2D1"
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
            strokeDasharray="80 410.22"
            strokeDashoffset="50"
            transform="rotate(-20 100 100)"
          />
          
          {/* MOBILE ENGINEER text on the arc */}
          <text fill="#F5C2D1" fontSize="18" fontWeight="bold" letterSpacing="0.1em">
            <textPath href="#tarqia-circle" startOffset="52%" textAnchor="start">
              MOBILE ENGINEER
            </textPath>
          </text>
        </svg>
        
        {/* FULL-TIME and Duration in center of most nested circle */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-3 uppercase">
          <p className="text-xs sm:text-sm md:text-base">
            Full-Time
          </p>
          <p className="text-sm sm:text-base md:text-lg text-center">
            Jan 2024 <br />  Present
          </p>
        </div>
      </div>

      {/* Dracode Circle */}
      <div 
        ref={dracodeCircleRef} 
        className="fixed top-[110vh] sm:top-[190vh] w-[80vw] h-[80vw] sm:w-[550px] sm:h-[550px] md:w-[650px] md:h-[650px] rounded-full bg-[#C2F84F] text-[#1F3A4B] relative z-20 flex flex-col items-center justify-center p-8 sm:p-12 md:p-16 overflow-visible" 
        style={{ 
          right: '5vw',
          left: 'auto',
          position: 'fixed',
          transform: 'none'
        }}
      >
        {/* SVG with circular text path on outer edge */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid" style={{ overflow: 'visible' }}>
          <defs>
            {/* Circle path: center at 100,100, radius 78 (for text on outer edge) */}
            <path id="dracode-circle" d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178 A 78,78 0 0,1 22,100 A 78,78 0 0,1 100,22 Z" />
          </defs>
          
          {/* DRACODE text following the outer edge path */}
          <text fill="#1F3A4B" fontSize="20" fontWeight="bold" letterSpacing="0.1em">
            <textPath href="#dracode-circle" startOffset="15%" textAnchor="start">
              DRACODE
            </textPath>
          </text>
          
          {/* Solid line only in the empty arc - rotated clockwise */}
          <path
            d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178"
            fill="none"
            stroke="#1F3A4B"
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
            strokeDasharray="80 410.22"
            strokeDashoffset="50"
            transform="rotate(155 100 100)"
          />
          
          {/* Copy of line positioned clockwise and shorter */}
          <path
            d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178"
            fill="none"
            stroke="#1F3A4B"
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
            strokeDasharray="110 380.22"
            strokeDashoffset="50"
            transform="rotate(3 100 100)"
          />
          
          {/* SOFTWARE ENGINEER text on the arc */}
          <text fill="#1F3A4B" fontSize="18" fontWeight="bold" letterSpacing="0.1em">
            <textPath href="#dracode-circle" startOffset="52%" textAnchor="start">
              SOFTWARE ENGINEER
            </textPath>
          </text>
        </svg>
        
        {/* Freelance and Duration in center */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2 sm:gap-3 uppercase">
          <p className="text-xs sm:text-sm md:text-base">
            Freelance
          </p>
          <p className="text-sm sm:text-base md:text-lg text-center">
            Mar 2025 <br />  Jul 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };


/**
 * Skiper 19 — React + framer motion
 * Inspired by and adapted from https://comgio.ai/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren't associated with the comgio.ai . They're independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */

