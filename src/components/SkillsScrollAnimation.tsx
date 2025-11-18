"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useLayoutEffect } from "react";

import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-orange-500", isSpace && "w-4")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};
const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0],
  );

  return (
    <motion.img
      src={char}
      className={cn("inline-block", isSpace && "w-4")}
      style={{
        x,
        scale,
        y,
        transformOrigin: "center",
      }}
    />
  );
};
const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 90, 0],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      className={cn("inline-block", isSpace && "w-4")}
      style={{
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center",
      }}
    />
  );
};

const Skiper31 = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  // Find the scrollable parent container using callback ref
  const setMainRef = (node: HTMLDivElement | null) => {
    mainRef.current = node;
    if (node && !containerRef.current) {
      let parent = node.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll' || 
            style.overflow === 'auto' || style.overflow === 'scroll') {
          containerRef.current = parent as HTMLDivElement;
          break;
        }
        parent = parent.parentElement;
      }
    }
  };

  // Fallback: find container after mount in case callback ref didn't find it
  useLayoutEffect(() => {
    if (!containerRef.current && mainRef.current) {
      let parent = mainRef.current.parentElement;
      while (parent) {
        const style = window.getComputedStyle(parent);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll' || 
            style.overflow === 'auto' || style.overflow === 'scroll') {
          containerRef.current = parent as HTMLDivElement;
          break;
        }
        parent = parent.parentElement;
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
    container: containerRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const text = "see more from gxuri";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const macIcon = [
    "/mac/Discord.png",
    "/mac/figma.png",
    "/mac/Framer.png",
    "/mac/Github.png",
    "/mac/Monog.png",
    "/mac/notion.png",
    "/mac/Pieces.png",
    "/mac/Postman.png",
    "/mac/vsCode.png",
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <main ref={setMainRef} className="w-full bg-[#F5ECE1]">
      <div
        ref={targetRef}
        className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#F5ECE1] p-[2vw]"
      >
        <div
          className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black"
          style={{
            perspective: "500px",
          }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
      <div
        ref={targetRef2}
        className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#F5ECE1] p-[2vw]"
      >
        <p className="font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black">
          <Bracket className="h-12 text-black" />
          <span className="font-geist font-medium">
            intergrate with your fav tech stack
          </span>
          <Bracket className="h-12 scale-x-[-1] text-black" />
        </p>
        <div className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black">
          {macIcon.map((char, index) => (
            <CharacterV2
              key={index}
              char={char}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
      </div>
      <div
        ref={targetRef3}
        className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#F5ECE1] p-[2vw]"
      >
        {" "}
        <p className="font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black">
          <Bracket className="h-12 text-black" />
          <span className="font-geist font-medium">
            intergrate with your fav tech stack
          </span>
          <Bracket className="h-12 scale-x-[-1] text-black" />
        </p>
        <div
          className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black"
          style={{
            perspective: "500px",
          }}
        >
          {macIcon.map((char, index) => (
            <CharacterV3
              key={index}
              char={char}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress3}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="#000"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};

/**
 * Skiper 31 ScrollAnimation_002 — React + framer motion + lenis
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
