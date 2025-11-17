"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import React, { useRef, useEffect, useState } from "react";

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

  useEffect(() => {
    const container = containerRef.current;
    const target = ref.current;
    
    if (!container || !target) return;

    const updateScrollProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const maxScroll = scrollHeight - clientHeight;
      
      // Calculate progress from 0 to 1 based on scroll position
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      scrollProgress.set(progress);
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress(); // Initial calculation

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollProgress]);

  const scrollYProgress = useSpring(scrollProgress, { stiffness: 100, damping: 30 });

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
          START
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
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Build path starting from the START circle center
  const pathData = `M${startX} ${startY}C${startX - 50} ${startY + 50}, ${startX - 250} ${startY + 150}, 876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89`;

  return (
    <svg
      viewBox="0 0 1278 2319"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ position: 'absolute', inset: 0 }}
    >
      <motion.path
        d={pathData}
        stroke="#1F3A4B"
        strokeWidth="20"
        fill="none"
        strokeDasharray="1"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
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
