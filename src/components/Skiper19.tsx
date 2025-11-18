"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState } from "react";

const experienceItems = [
  {
    number: "01",
    title: "Mobile Engineer",
    company: "Tarqia",
    type: "Full-time",
    fromDate: "Jan 2024",
    toDate: "Present",
    position: 0.2, // Position along path (0-1) - left side (moved slightly right to avoid edge)
    side: "above", // "above" or "below" the path
    color: "#EF4444", // Red
  },
  {
    number: "02",
    title: "Software Engineer",
    company: "Dracode",
    type: "Freelance Project",
    fromDate: "Mar 2025",
    toDate: "Jul 2025",
    position: 0.75, // Position along path (0-1) - right side (moved slightly left to avoid edge)
    side: "below", // "above" or "below" the path
    color: "#3B82F6", // Blue
  },
];

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  return (
    <section
      ref={ref}
      className="mx-auto relative flex h-screen w-screen flex-col items-center overflow-visible bg-[#F5ECE1] px-4 text-[#1F3A4B]"
    >
      {/* Horizontal curved path container - positioned at center with more height for items above/below */}
      <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 pointer-events-none overflow-visible">
        <LinePath
          ref={pathRef}
          scrollYProgress={scrollYProgress}
        />
        
        {/* Experience items positioned along the path */}
        {experienceItems.map((item, index) => (
          <PathItem
            key={index}
            pathRef={pathRef}
            scrollYProgress={scrollYProgress}
            position={item.position}
            side={item.side as "above" | "below"}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export { Skiper19 };

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
        stroke="#C2F84F"
        strokeWidth="4"
        fill="none"
        pathLength="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          pathLength,
          strokeDasharray: "1",
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
  scrollYProgress,
  position,
  side,
  item,
}: {
  pathRef: React.RefObject<SVGPathElement | null>;
  scrollYProgress: any;
  position: number;
  side: "above" | "below";
  item: {
    company: string;
    title: string;
    fromDate: string;
    toDate: string;
    type: string;
  };
}) => {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        y = y - offsetDistance; // Move up (above the path)
      } else {
        y = y + offsetDistance; // Move down (below the path)
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
  }, [pathRef, position, side]);

  // Update opacity based on scroll progress and position
  useEffect(() => {
    // Once position is calculated (check if point has been set, y can be negative if above path)
    // This ensures items appear even if scroll tracking has issues
    if (point.x !== 0 || point.y !== 0) {
      // Set initial opacity - show items earlier for better visibility
      const updateOpacity = () => {
        try {
          const currentProgress = scrollYProgress.get();
          // Show item when scroll reaches 20% of its position (very early)
          const itemProgress = position * 0.2;
          if (currentProgress >= itemProgress) {
            setOpacity(1);
          } else {
            // Still show with reduced opacity if we're close
            const fadeInStart = itemProgress * 0.3;
            if (currentProgress >= fadeInStart) {
              setOpacity(0.3 + (currentProgress - fadeInStart) / (itemProgress - fadeInStart) * 0.7);
            } else {
              // Show with minimal opacity so it's at least visible
              setOpacity(0.3);
            }
          }
        } catch (e) {
          // If scrollYProgress.get() fails, show item anyway
          setOpacity(1);
        }
      };

      // Set initial opacity
      updateOpacity();

      const unsubscribe = scrollYProgress.on("change", (latest: number) => {
        // Show item when scroll reaches 20% of its position
        const itemProgress = position * 0.2;
        if (latest >= itemProgress) {
          setOpacity(1);
        } else {
          // Fade in gradually
          const fadeInStart = itemProgress * 0.3;
          if (latest >= fadeInStart) {
            setOpacity(0.3 + (latest - fadeInStart) / (itemProgress - fadeInStart) * 0.7);
          } else {
            // Show with minimal opacity so it's at least visible
            setOpacity(0.3);
          }
        }
      });

      return () => unsubscribe();
    } else {
      // Position not calculated yet, keep opacity at 0
      setOpacity(0);
    }
  }, [scrollYProgress, position, point]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      <motion.div
        className="absolute pointer-events-auto z-10"
        style={{
          left: `${point.x}px`,
          top: `${point.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: opacity || 0,
          visibility: (point.x === 0 && point.y === 0 && position > 0.01) ? "hidden" : "visible",
          willChange: "transform, opacity",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: opacity || 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-4xl font-jakarta-sans bg-transparent pb-10 text-[#FAFDEE] min-w-[300px]">
          {item.company === "Tarqia" ? (
            <>
              <div className="mb-8 flex w-full flex-col items-start gap-5 px-4 font-medium lg:flex-row lg:justify-between">
                <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                  <p className="w-fit text-sm text-[#1F3A4B]">
                    {item.fromDate} <br />
                    {item.toDate}
                  </p>
                  <p className="w-fit text-right text-sm text-[#1F3A4B] lg:text-left">
                    {item.title} <br /> {item.type}
                  </p>
                </div>
              </div>
              <h1 className="text-center text-[8vw] font-bold leading-[0.9] tracking-tighter lg:text-[10vw]">
                {item.company}
              </h1>
            </>
          ) : (
            <>
              <h1 className="text-center text-[8vw] font-bold leading-[0.9] tracking-tighter lg:text-[10vw]">
                {item.company}
              </h1>
              <div className="mt-8 flex w-full flex-col items-start gap-5 px-4 font-medium lg:flex-row lg:justify-between">
                <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                  <p className="w-fit text-sm text-[#1F3A4B]">
                    {item.fromDate} <br />
                    {item.toDate}
                  </p>
                  <p className="w-fit text-right text-sm text-[#1F3A4B] lg:text-left">
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

/**
 * Skiper 19 — React + framer motion
 * Inspired by and adapted from https://comgio.ai/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the comgio.ai . They’re independent recreations meant to study interaction design
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
