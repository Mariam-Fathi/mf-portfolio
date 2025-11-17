"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import React, { useRef, useEffect, useState, useMemo } from "react";

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const startCircleRef = useRef<HTMLDivElement>(null);
  const tarqiaCircleRef = useRef<HTMLDivElement>(null);
  const dracodeCircleRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useMotionValue(0);
  const [startCircleCenter, setStartCircleCenter] = useState({ x: 1086, y: 210 });
  const [tarqiaCircleCenter, setTarqiaCircleCenter] = useState({ x: 0, y: 0 });
  const [dracodeCircleCenter, setDracodeCircleCenter] = useState({ x: 0, y: 0 });

  // Use callback ref to get container immediately
  const setRef = (node: HTMLDivElement | null) => {
    if (node) {
      ref.current = node;
      // Find the content-section parent immediately
      let parent = node.parentElement;
      while (parent) {
        if (parent.classList.contains('content-section')) {
          containerRef.current = parent;
          break;
        }
        parent = parent.parentElement;
      }
    }
  };

  // TODO: Scroll progress calculation - needs testing
  // This calculates how far through the section the user has scrolled
  // Progress goes from 0 (section entering viewport) to 1 (section leaving viewport)
  // ISSUE: Line animation not syncing with scroll - may need to adjust calculation
  // Possible fixes:
  // 1. Check if scrolling happens on window or container
  // 2. Adjust scrollableRange calculation
  // 3. Verify section height matches actual rendered height
  useEffect(() => {
    const container = containerRef.current;
    const target = ref.current;
    
    if (!container || !target) return;

    const updateScrollProgress = () => {
      // Get the section's position relative to the viewport
      const rect = target.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Section height is 350vh (3.5 * viewport height)
      const sectionHeight = viewportHeight * 3.5;
      
      // Calculate progress: 0 when section top is at viewport bottom, 1 when section bottom is at viewport top
      // When rect.top = viewportHeight: progress = 0 (section just entering)
      // When rect.bottom = 0: progress = 1 (section just leaving)
      const scrollableRange = sectionHeight;
      const scrolled = viewportHeight - rect.top;
      
      // Calculate progress from 0 to 1
      const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
      
      // Debug: Uncomment to see progress values
      // console.log('Scroll progress:', progress, 'scrolled:', scrolled, 'range:', scrollableRange);
      
      scrollProgress.set(progress);
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    // Listen to both container scroll and window scroll
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollProgress]);

  const scrollYProgress = useSpring(scrollProgress, { stiffness: 200, damping: 25 });

  // Calculate all circle center positions for LinePath
  useEffect(() => {
    const updateCircleCenters = () => {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Update START circle center
        if (startCircleRef.current) {
          const rect = startCircleRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const viewBoxX = (centerX / viewportWidth) * 1278;
          const viewBoxY = (centerY / viewportHeight) * 2319;
          setStartCircleCenter({ x: viewBoxX, y: viewBoxY });
        }
        
        // Update Tarqia circle center
        if (tarqiaCircleRef.current) {
          const rect = tarqiaCircleRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const viewBoxX = (centerX / viewportWidth) * 1278;
          const viewBoxY = (centerY / viewportHeight) * 2319;
          setTarqiaCircleCenter({ x: viewBoxX, y: viewBoxY });
        }
        
        // Update Dracode circle center
        if (dracodeCircleRef.current) {
          const rect = dracodeCircleRef.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const viewBoxX = (centerX / viewportWidth) * 1278;
          const viewBoxY = (centerY / viewportHeight) * 2319;
          setDracodeCircleCenter({ x: viewBoxX, y: viewBoxY });
        }
      });
    };

    // Delay initial update to ensure circles are positioned
    const timeoutId = setTimeout(updateCircleCenters, 100);
    window.addEventListener('resize', updateCircleCenters);
    window.addEventListener('scroll', updateCircleCenters);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateCircleCenters);
      window.removeEventListener('scroll', updateCircleCenters);
    };
  }, []);

  return (
    <section
      ref={setRef}
      className="mx-auto h-[350vh] w-screen overflow-x-visible overflow-y-hidden bg-[#F5ECE1] px-4 relative"
    >
      {/* SVG Path Container - Full viewport */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <LinePath
          scrollYProgress={scrollYProgress}
          startX={startCircleCenter.x}
          startY={startCircleCenter.y}
          tarqiaX={tarqiaCircleCenter.x}
          tarqiaY={tarqiaCircleCenter.y}
          dracodeX={dracodeCircleCenter.x}
          dracodeY={dracodeCircleCenter.y}
        />
      </div>

      {/* Top Right Circle - Medium */}
      <div 
        ref={startCircleRef}
        className="fixed top-[100px] sm:top-[120px] right-[5vw] sm:right-[8vw] w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] rounded-full bg-[#F5C2D1] z-20 flex items-center justify-center">
        <div className="text-[#1F3A4B] text-xs sm:text-sm md:text-base font-bold text-center px-2">
          
        </div>
      </div>

      {/* TARQIA Circle - Fixed position for LinePath to track */}
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

      {/* Dracode Circle - Fixed position for LinePath to track */}
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
            <textPath href="#dracode-circle" startOffset="3%" textAnchor="start">
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
            strokeDasharray="150 340.22"
            strokeDashoffset="50"
            transform="rotate(90 100 100)"
          />
          
          {/* Copy of line positioned clockwise and shorter */}
          <path
            d="M 100,22 A 78,78 0 0,1 178,100 A 78,78 0 0,1 100,178"
            fill="none"
            stroke="#1F3A4B"
            strokeWidth="2"
            opacity="0.7"
            strokeLinecap="round"
            strokeDasharray="80 410.22"
            strokeDashoffset="50"
            transform="rotate(-20 100 100)"
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

const LinePath = ({
  scrollYProgress,
  startX = 1086,
  startY = 210,
  tarqiaX = 0,
  tarqiaY = 0,
  dracodeX = 0,
  dracodeY = 0,
}: {
  scrollYProgress: any;
  startX?: number;
  startY?: number;
  tarqiaX?: number;
  tarqiaY?: number;
  dracodeX?: number;
  dracodeY?: number;
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [totalLength, setTotalLength] = useState(0);
  
  // Calculate the path dynamically using useMemo to recalculate when coordinates change
  const pathData = useMemo(() => {
    // Only build path if we have valid coordinates
    if ((tarqiaX === 0 && tarqiaY === 0) || (dracodeX === 0 && dracodeY === 0)) {
      // Fallback to default path if coordinates not ready
      return `M${startX} ${startY} L${startX} ${startY}`;
    }

    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1278;

    // Calculate START circle radius in viewBox coordinates
    // START circle sizes: w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px]
    let startRadiusPx: number;
    if (viewportWidth >= 768) {
      // md and above: 180px / 2 = 90px radius
      startRadiusPx = 90;
    } else if (viewportWidth >= 640) {
      // sm: 150px / 2 = 75px radius
      startRadiusPx = 75;
    } else {
      // mobile: 120px / 2 = 60px radius
      startRadiusPx = 60;
    }
    const startRadius = (startRadiusPx / viewportWidth) * 1278;

    // Calculate Tarqia circle radius in viewBox coordinates
    // Tarqia circle sizes: w-[80vw] h-[80vw] sm:w-[550px] sm:h-[550px] md:w-[650px] md:h-[650px]
    let tarqiaRadiusPx: number;
    if (viewportWidth >= 768) {
      // md and above: 650px / 2 = 325px radius
      tarqiaRadiusPx = 325;
    } else if (viewportWidth >= 640) {
      // sm: 550px / 2 = 275px radius
      tarqiaRadiusPx = 275;
    } else {
      // mobile: 80vw / 2
      tarqiaRadiusPx = viewportWidth * 0.4;
    }
    // Convert to viewBox coordinates
    const tarqiaRadius = (tarqiaRadiusPx / viewportWidth) * 1278;

    // Calculate Dracode circle radius (same size as Tarqia)
    const dracodeRadius = tarqiaRadius;

    // Calculate direction vector from START to Tarqia
    const startToTarqiaDx = tarqiaX - startX;
    const startToTarqiaDy = tarqiaY - startY;
    const startToTarqiaDistance = Math.sqrt(startToTarqiaDx * startToTarqiaDx + startToTarqiaDy * startToTarqiaDy);

    // Calculate direction vector from Tarqia to Dracode
    const tarqiaToDracodeDx = dracodeX - tarqiaX;
    const tarqiaToDracodeDy = dracodeY - tarqiaY;
    const tarqiaToDracodeDistance = Math.sqrt(tarqiaToDracodeDx * tarqiaToDracodeDx + tarqiaToDracodeDy * tarqiaToDracodeDy);

    // Avoid division by zero
    if (startToTarqiaDistance === 0 || tarqiaToDracodeDistance === 0) {
      return `M${startX} ${startY} L${startX} ${startY}`;
    }

    // Calculate exit point from START circle (on the edge, towards Tarqia)
    const startExitX = startX + (startToTarqiaDx / startToTarqiaDistance) * startRadius;
    const startExitY = startY + (startToTarqiaDy / startToTarqiaDistance) * startRadius;

    // Calculate entry point to Tarqia circle (on the edge, from START direction)
    const tarqiaEntryX = tarqiaX - (startToTarqiaDx / startToTarqiaDistance) * tarqiaRadius;
    const tarqiaEntryY = tarqiaY - (startToTarqiaDy / startToTarqiaDistance) * tarqiaRadius;

    // Calculate exit point from Tarqia circle (on the edge, towards Dracode)
    const tarqiaExitX = tarqiaX + (tarqiaToDracodeDx / tarqiaToDracodeDistance) * tarqiaRadius;
    const tarqiaExitY = tarqiaY + (tarqiaToDracodeDy / tarqiaToDracodeDistance) * tarqiaRadius;

    // Calculate entry point to Dracode circle (on the edge, from Tarqia direction)
    const dracodeEntryX = dracodeX - (tarqiaToDracodeDx / tarqiaToDracodeDistance) * dracodeRadius;
    const dracodeEntryY = dracodeY - (tarqiaToDracodeDy / tarqiaToDracodeDistance) * dracodeRadius;

    // Build the path:
    // 1. Start from START circle exit point (on edge)
    // 2. Curve smoothly to Tarqia circle entry point (on edge)
    // 3. Go to Tarqia circle center
    // 4. Exit from Tarqia circle edge (straight line from center to edge)
    // 5. Curve to Dracode circle entry point
    // 6. Go to Dracode circle center

    // Control points for smooth curves
    const startExitToTarqiaEntryControl1X = startExitX + (tarqiaEntryX - startExitX) * 0.4;
    const startExitToTarqiaEntryControl1Y = startExitY + (tarqiaEntryY - startExitY) * 0.4;
    const startExitToTarqiaEntryControl2X = tarqiaEntryX - (tarqiaEntryX - startExitX) * 0.4;
    const startExitToTarqiaEntryControl2Y = tarqiaEntryY - (tarqiaEntryY - startExitY) * 0.4;

    const tarqiaExitToDracodeEntryControl1X = tarqiaExitX + (dracodeEntryX - tarqiaExitX) * 0.5;
    const tarqiaExitToDracodeEntryControl1Y = tarqiaExitY + (dracodeEntryY - tarqiaExitY) * 0.5;
    const tarqiaExitToDracodeEntryControl2X = dracodeEntryX - (dracodeEntryX - tarqiaExitX) * 0.5;
    const tarqiaExitToDracodeEntryControl2Y = dracodeEntryY - (dracodeEntryY - tarqiaExitY) * 0.5;

    const dracodeEntryToCenterControl1X = dracodeEntryX + (dracodeX - dracodeEntryX) * 0.3;
    const dracodeEntryToCenterControl1Y = dracodeEntryY + (dracodeY - dracodeEntryY) * 0.3;
    const dracodeEntryToCenterControl2X = dracodeX - (dracodeX - dracodeEntryX) * 0.3;
    const dracodeEntryToCenterControl2Y = dracodeY - (dracodeY - dracodeEntryY) * 0.3;

    // FIXED: Path direction - ensure it goes START → Tarqia → Dracode
    // If line appears backwards, the coordinates might be swapped
    // Building path from START circle exit point
    const pathString = `M${startExitX} ${startExitY} C${startExitToTarqiaEntryControl1X} ${startExitToTarqiaEntryControl1Y}, ${startExitToTarqiaEntryControl2X} ${startExitToTarqiaEntryControl2Y}, ${tarqiaEntryX} ${tarqiaEntryY} L${tarqiaX} ${tarqiaY} L${tarqiaExitX} ${tarqiaExitY} C${tarqiaExitToDracodeEntryControl1X} ${tarqiaExitToDracodeEntryControl1Y}, ${tarqiaExitToDracodeEntryControl2X} ${tarqiaExitToDracodeEntryControl2Y}, ${dracodeEntryX} ${dracodeEntryY} C${dracodeEntryToCenterControl1X} ${dracodeEntryToCenterControl1Y}, ${dracodeEntryToCenterControl2X} ${dracodeEntryToCenterControl2Y}, ${dracodeX} ${dracodeY}`;
    
    // Debug: Log path to verify direction
    // console.log('Path from START to Tarqia:', { startExitX, startExitY, tarqiaEntryX, tarqiaEntryY });
    
    return pathString;
  }, [startX, startY, tarqiaX, tarqiaY, dracodeX, dracodeY]);

  // TODO: Path length calculation - working but may need optimization
  // Gets the actual SVG path length after rendering
  // This is needed to calculate strokeDashoffset for the drawing animation
  // ISSUE: If totalLength stays 0, the line won't animate
  // Debug: Check if pathData is valid and pathRef.current exists
  useEffect(() => {
    const updateLength = () => {
      if (pathRef.current) {
        const length = pathRef.current.getTotalLength();
        if (length > 0) {
          setTotalLength(length);
          // Debug: Uncomment to see path length
          // console.log('Path length calculated:', length);
        }
      }
    };
    
    // Use requestAnimationFrame to ensure the path is rendered
    const rafId = requestAnimationFrame(() => {
      updateLength();
    });
    
    // Also try after a small delay as backup
    const timeoutId = setTimeout(updateLength, 50);
    
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [pathData]); // Recalculate when path changes

  // TODO: Path animation - strokeDashoffset calculation
  // This controls how much of the path is visible based on scroll progress
  // When scrollProgress = 0: strokeDashoffset = totalLength (path hidden)
  // When scrollProgress = 1: strokeDashoffset = 0 (path fully visible)
  // ISSUE: Animation not working - verify scrollYProgress is updating
  // Debug: Add console.log to see if strokeDashoffset is changing
  const strokeDashoffset = useTransform(
    scrollYProgress,
    (value: number) => {
      if (totalLength === 0) return totalLength;
      const offset = totalLength * (1 - value);
      // Debug: Uncomment to see offset values
      // console.log('strokeDashoffset:', offset, 'progress:', value, 'totalLength:', totalLength);
      return offset;
    }
  );

  return (
    <svg
      viewBox="0 0 1278 2319"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* TODO: Path rendering - verify animation is working */}
      {/* Path starts from START circle edge, curves to Tarqia, then to Dracode */}
      {/* strokeDasharray: total path length */}
      {/* strokeDashoffset: controls how much of path is visible (animated by scroll) */}
      {/* ISSUE: If line not animating, check:
          1. Is totalLength > 0?
          2. Is strokeDashoffset changing?
          3. Is scrollYProgress updating?
          4. Are scroll event listeners firing?
      */}
      {/* FIXED: Path should go from START (top-right) to Tarqia (bottom-left) to Dracode */}
      {/* If line appears backwards, check coordinate calculation in updateCircleCenters */}
      <motion.path
        ref={pathRef}
        d={pathData}
        stroke="#1F3A4B"
        strokeWidth="20"
        fill="none"
        strokeDasharray={totalLength > 0 ? totalLength : undefined}
        style={{
          strokeDashoffset: totalLength > 0 ? strokeDashoffset : totalLength,
        }}
      />
    </svg>
  );
};

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
