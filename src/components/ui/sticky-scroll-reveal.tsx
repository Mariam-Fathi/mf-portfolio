"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

export type StickyScrollContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
  gradient?: string;
  backgroundColor?: string;
};

const HIDE_SCROLLBAR_CLASS = "sticky-scroll-hide-scrollbar";
const HIDE_SCROLLBAR_STYLE_ID = "sticky-scroll-hide-scrollbar-style";

export interface StickyScrollProps {
  content: StickyScrollContentItem[];
  contentClassName?: string;
  containerClassName?: string;
  gradientPalette?: string[];
  backgroundPalette?: string[];
  hideScrollbar?: boolean;
  autoFocusOnView?: boolean;
}

const defaultBackgroundPalette = ["#0f172a", "#000000", "#171717"];

const defaultGradientPalette = [
  "linear-gradient(to bottom right, #06b6d4, #10b981)",
  "linear-gradient(to bottom right, #ec4899, #6366f1)",
  "linear-gradient(to bottom right, #f97316, #eab308)",
];

export function StickyScroll({
  content,
  contentClassName,
  containerClassName,
  gradientPalette = defaultGradientPalette,
  backgroundPalette = defaultBackgroundPalette,
  hideScrollbar = false,
  autoFocusOnView = true,
}: StickyScrollProps) {
  const cardLength = content.length;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });

  const [activeCard, setActiveCard] = useState(0);
  const [backgroundGradient, setBackgroundGradient] = useState<string>(() => {
    if (!cardLength) {
      return gradientPalette[0] ?? defaultGradientPalette[0];
    }
    const initialGradient =
      content[0]?.gradient ??
      gradientPalette[0 % gradientPalette.length] ??
      defaultGradientPalette[0];
    return initialGradient;
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardLength) return;

    const cardsBreakpoints = content.map(
      (_, index) => index / Math.max(cardLength, 1),
    );

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        const currentBestDistance = Math.abs(latest - cardsBreakpoints[acc]);

        if (distance < currentBestDistance) {
          return index;
        }
        return acc;
      },
      0,
    );

    setActiveCard(closestBreakpointIndex);
  });

  useEffect(() => {
    if (!cardLength) return;

    const paletteGradient =
      gradientPalette[activeCard % gradientPalette.length] ??
      defaultGradientPalette[activeCard % defaultGradientPalette.length];

    const nextGradient = content[activeCard]?.gradient ?? paletteGradient;
    setBackgroundGradient(nextGradient);
  }, [activeCard, cardLength, content, gradientPalette]);

  useEffect(() => {
    if (!hideScrollbar) return;
    if (typeof window === "undefined") return;

    if (!document.getElementById(HIDE_SCROLLBAR_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = HIDE_SCROLLBAR_STYLE_ID;
      style.innerHTML = `
.${HIDE_SCROLLBAR_CLASS} {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.${HIDE_SCROLLBAR_CLASS}::-webkit-scrollbar {
  display: none;
}
      `;
      document.head.appendChild(style);
    }
  }, [hideScrollbar]);

  useEffect(() => {
    if (!autoFocusOnView) return;
    if (typeof window === "undefined") return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            node.focus({ preventScroll: true });
          }
        });
      },
      {
        root: null,
        threshold: 0.4,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [autoFocusOnView]);

  if (!cardLength) {
    return null;
  }

  const backgroundColor =
    content[activeCard]?.backgroundColor ??
    backgroundPalette[activeCard % backgroundPalette.length] ??
    defaultBackgroundPalette[activeCard % defaultBackgroundPalette.length];

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor,
      }}
      style={
        hideScrollbar
          ? {
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }
          : undefined
      }
      className={cn(
        "relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-3xl p-10 focus:outline-none",
        containerClassName,
        hideScrollbar ? HIDE_SCROLLBAR_CLASS : undefined,
      )}
      tabIndex={autoFocusOnView ? -1 : undefined}
      role="region"
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="mt-10 max-w-sm text-base text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}

          <div className="h-40" />
        </div>
      </div>

      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
          contentClassName,
        )}
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
}

export default StickyScroll;

