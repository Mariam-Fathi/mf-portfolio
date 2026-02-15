"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

const experienceItems = [
  {
    number: "01",
    title: "Frontend Engineer",
    company: "Tarqia",
    type: "Full-time",
    fromDate: "Jan 2024",
    toDate: "Present",
    position: 0.2, // Position along path (0-1) - left side (moved slightly right to avoid edge)
    side: "above", // "above" or "below" the path
    color: "#280B0B", // Light blue color
  },
  {
    number: "02",
    title: "Mobile Engineer",
    company: "Dracode",
    type: "Contract ",
    fromDate: "Sep 2025",
    toDate: "Jan 2026",
    position: 0.55, // Position along path (0-1) - right side (moved slightly left to avoid edge)
    side: "below", // "above" or "below" the path
    color: "#6A0610", // Fire Red from color palette
  },
];

interface ExperienceProps {
  isActive?: boolean;
}

const Experience = ({ isActive = false }: ExperienceProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  // Use scroll progress only for path animation (not for item opacity)
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section
      ref={ref}
      className="mx-auto relative flex h-screen lg:h-screen w-screen flex-col items-center justify-center overflow-visible bg-[#F9E7C9] px-4 text-[#1F3A4B] lg:py-0"
    >
      {/* Mobile: Vertical Timeline Layout */}
      <div className="w-full max-w-2xl lg:hidden">
        {experienceItems.map((item, index) => (
          <motion.div
            key={index}
            className="relative mb-12 last:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Timeline line connector */}
            {index < experienceItems.length - 1 && (
              <div
                className="absolute left-6 top-16 bottom-0 w-0.5"
                style={{ backgroundColor: item.color, opacity: 0.3 }}
              />
            )}
            
            {/* Timeline dot */}
            <div className="absolute left-0 top-2">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: item.color }}
              >
                <span className="text-white text-xs font-bold">{item.number}</span>
              </div>
            </div>

            {/* Content card */}
            <div className="ml-16 pt-2">
              {/* Company Name */}
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ color: item.color }}
              >
                {item.company}
              </h2>

              {/* Title and Type */}
              <div className="mb-3">
                <p className="text-base font-semibold uppercase" style={{ color: item.color }}>
                  {item.title}
                </p>
                <p className="text-sm uppercase opacity-80" style={{ color: item.color }}>
                  {item.type}
                </p>
              </div>

              {/* Dates */}
              <div className="text-sm uppercase" style={{ color: item.color }}>
                <p>{item.fromDate} - {item.toDate}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: Horizontal curved path container - positioned at center with more height for items above/below */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none overflow-visible">
        <LinePath
          ref={pathRef}
          scrollYProgress={scrollYProgress}
        />
        
        {/* Experience items positioned along the path */}
        {experienceItems.map((item, index) => (
          <React.Fragment key={index}>
            <PathItem
              pathRef={pathRef}
              position={item.position}
              side={item.side as "above" | "below"}
              item={item}
              color={item.color}
              isActive={isActive}
            />
            {/* Two pulsing points on the path for each experience item */}
            <PathPoint
              pathRef={pathRef}
              position={item.position}
              color={item.color}
              delay={0}
              isActive={isActive}
            />
            <PathPoint
              pathRef={pathRef}
              position={item.position}
              color={item.color}
              delay={0.3}
              isActive={isActive}
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export { Experience };

const LinePath = React.forwardRef<
  SVGPathElement,
  {
    scrollYProgress: any;
  }
>(({ scrollYProgress }, ref) => {
  // Transform scroll progress to control path drawing horizontally
  // When scroll is at 0, path is not visible (offset = 1)
  // When scroll is at 1, path is fully visible (offset = 0)
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const strokeDashoffset = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0]
  );

  // Horizontal S-curve path that goes across the screen
  // The path starts from left, curves down, then curves up, ending on the right
  // Using a more pronounced curve for better visibility
  // Path goes from left edge to right edge with smooth curves
  const pathD = "M 0,50 C 20,20 30,80 50,50 S 70,20 100,50";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full z-0"
    >
      <motion.path
        ref={ref}
        d={pathD}
        stroke="#8A9EA7"
        strokeWidth="3"
        fill="none"
        pathLength="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          strokeDasharray: "0.08 0.04",
          strokeDashoffset,
        }}
      />
    </svg>
  );
});

LinePath.displayName = "LinePath";

// Component to position items along the path
const PathItem = ({
  pathRef,
  position,
  side,
  item,
  color,
  isActive = false,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  position: number;
  side: "above" | "below";
  item: {
    company: string;
    title: string;
    fromDate: string;
    toDate: string;
    type: string;
  };
  color: string;
  isActive?: boolean;
}) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only calculate position when section is active
    if (!isActive) {
      setPoint({ x: 0, y: 0 });
      return;
    }

    const updatePosition = () => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const svg = path.ownerSVGElement;
      if (!svg) return;

      // Get the point along the path in SVG coordinates
      const totalLength = path.getTotalLength();
      if (totalLength === 0) return; // Path not ready yet
      
      const pathPoint = path.getPointAtLength(totalLength * position);

      // Get SVG dimensions and viewBox
      const svgRect = svg.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;

      // Calculate scale factors from viewBox to actual SVG size
      const scaleX = svgRect.width / viewBox.width;
      const scaleY = svgRect.height / viewBox.height;

      // Convert SVG viewBox coordinates to container-relative pixel coordinates
      const x = pathPoint.x * scaleX;
      let y = pathPoint.y * scaleY;

      // Apply vertical offset based on side (above or below the path)
      // Offset distance in pixels (adjust this value to control spacing from path)
      const offsetDistance = 120; // pixels (reduced to keep items more visible)
      
      // Apply offset based on side
      if (side === "above") {
        y = y - 230; // Move up (above the path)
      } else {
        y = y + 50; // Move down (below the path)
      }
      
      // Ensure items stay within reasonable bounds (prevent extreme positioning)
      // The container is centered, so we want items to be visible
      const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;
      const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
      
      // Vertical bounds - keep items visible
      const minY = 100; // Minimum distance from top (increased for better visibility)
      const maxY = containerHeight - 100; // Minimum distance from bottom (increased for better visibility)
      y = Math.max(minY, Math.min(maxY, y));
      
      // Horizontal bounds - prevent items from going off-screen
      const minX = 150; // Minimum distance from left edge (account for item width)
      const maxX = containerWidth - 150; // Minimum distance from right edge (account for item width)
      const constrainedX = Math.max(minX, Math.min(maxX, x));

      // Update point with constrained coordinates
      setPoint({ x: constrainedX, y });
    };

    // Use multiple attempts to ensure DOM is ready
    const rafId1 = requestAnimationFrame(() => {
      updatePosition();
    });

    const rafId2 = requestAnimationFrame(() => {
      updatePosition();
    });

    // Also update after delays to ensure SVG is rendered
    const timeoutId1 = setTimeout(updatePosition, 50);
    const timeoutId2 = setTimeout(updatePosition, 200);
    const timeoutId3 = setTimeout(updatePosition, 500);

    window.addEventListener("resize", updatePosition);
    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener("resize", updatePosition);
    };
  }, [pathRef, position, side, isActive]); // Add isActive to recalculate when section becomes active

  // Update opacity based on section active state (not scroll, since view is fixed)
  useEffect(() => {
    if (!isActive) {
      setOpacity(0);
      return;
    }
    
    // Once position is calculated, show items immediately when section becomes active
    // Use a small delay to ensure smooth animation
    if (point.x !== 0 || point.y !== 0) {
      // Show immediately with a very short delay for smooth animation
      const timeoutId = setTimeout(() => {
        setOpacity(1);
      }, 100); // Small delay for smooth transition

      return () => clearTimeout(timeoutId);
    } else {
      // Position not calculated yet, keep opacity at 0
      setOpacity(0);
    }
  }, [isActive, position, point]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <motion.div
        className="absolute pointer-events-auto z-10"
        style={{
          left: point.x > 0 ? `${point.x}px` : "50%",
          top: point.y > 0 ? `${point.y}px` : "50%",
          transform: "translate(-50%, -50%)",
          opacity: opacity || 0,
          visibility: (!isActive || (point.x === 0 && point.y === 0)) ? "hidden" : "visible",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: opacity || 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-4xl font-jakarta-sans bg-transparent pb-10 min-w-[300px]">
          {item.company === "Tarqia" ? (
            <>
              <div className="mb-8 flex w-full flex-col items-start gap-5 px-4 font-medium lg:flex-row lg:justify-between">
                <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                  <p className="w-fit text-sm" style={{ color }}>
                    {item.fromDate} <br />
                    {item.toDate}
                  </p>
                  <p className="w-fit text-right text-sm lg:text-left" style={{ color }}>
                    {item.title} <br /> {item.type}
                  </p>
                </div>
              </div>
              <h1 className="text-center text-[8vw] font-bold leading-[0.9] tracking-tighter lg:text-[10vw]" style={{ color }}>
                {item.company}
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-center text-[8vw] font-bold leading-[0.9] tracking-tighter lg:text-[10vw]" style={{ color }}>
                {item.company}
              </h1>
              <div className="mt-8 flex w-full flex-col items-start gap-5 px-4 font-medium lg:flex-row lg:justify-between">
                <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                  <p className="w-fit text-sm" style={{ color }}>
                    {item.fromDate} <br />
                    {item.toDate}
                  </p>
                  <p className="w-fit text-right text-sm lg:text-left" style={{ color }}>
                    {item.title} <br /> {item.type}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Component to render pulsing points on the path
const PathPoint = ({
  pathRef,
  position,
  color,
  delay,
  isActive = false,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  position: number;
  color: string;
  delay: number;
  isActive?: boolean;
}) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only calculate position when section is active
    if (!isActive) {
      setPoint({ x: 0, y: 0 });
      return;
    }

    const updatePosition = () => {
      if (!pathRef.current || !containerRef.current) return;

      const path = pathRef.current;
      const svg = path.ownerSVGElement;
      if (!svg) return;

      // Get the point along the path in SVG coordinates
      const totalLength = path.getTotalLength();
      if (totalLength === 0) return; // Path not ready yet
      
      const pathPoint = path.getPointAtLength(totalLength * position);

      // Get SVG dimensions and viewBox
      const svgRect = svg.getBoundingClientRect();
      const viewBox = svg.viewBox.baseVal;

      // Calculate scale factors from viewBox to actual SVG size
      const scaleX = svgRect.width / viewBox.width;
      const scaleY = svgRect.height / viewBox.height;

      // Convert SVG viewBox coordinates to container-relative pixel coordinates
      // No vertical offset - points stay exactly on the path
      const x = pathPoint.x * scaleX;
      const y = pathPoint.y * scaleY;

      // Update point with coordinates
      setPoint({ x, y });
    };

    // Use multiple attempts to ensure DOM is ready
    const rafId1 = requestAnimationFrame(() => {
      updatePosition();
    });

    const rafId2 = requestAnimationFrame(() => {
      updatePosition();
    });

    // Also update after delays to ensure SVG is rendered
    const timeoutId1 = setTimeout(updatePosition, 50);
    const timeoutId2 = setTimeout(updatePosition, 200);
    const timeoutId3 = setTimeout(updatePosition, 500);

    window.addEventListener("resize", updatePosition);
    return () => {
      cancelAnimationFrame(rafId1);
      cancelAnimationFrame(rafId2);
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
      clearTimeout(timeoutId3);
      window.removeEventListener("resize", updatePosition);
    };
  }, [pathRef, position, isActive]); // Add isActive to recalculate when section becomes active

  // Update opacity based on section active state (not scroll, since view is fixed)
  useEffect(() => {
    if (!isActive) {
      setOpacity(0);
      return;
    }
    
    if (point.x !== 0 || point.y !== 0) {
      // Show immediately with a very short delay for smooth animation
      const timeoutId = setTimeout(() => {
        setOpacity(1);
      }, 100); // Small delay for smooth transition

      return () => clearTimeout(timeoutId);
    } else {
      setOpacity(0);
    }
  }, [isActive, position, point]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <div
        className="absolute z-20"
        style={{
          left: `${point.x}px`,
          top: `${point.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: opacity || 0,
          visibility: (point.x === 0 && point.y === 0 && position > 0.01) ? "hidden" : "visible",
        }}
      >
        {/* Static point on the path */}
        <div
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: "28px",
            height: "28px",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        />
      </div>
    </div>
  );
};

/**
 * Experience Section — React + framer motion
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

