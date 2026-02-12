"use client";

import React, { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { gsap } from "gsap";

// ── Certificate data ─────────────────────────────────────────────────
type Certificate = {
  id: string;
  title: string;
  words: string[];
  platform: string;
  link: string;
  textColor: string;
  bgColor: string;
  infoPosition: "bottom-left" | "bottom-right";
};

const certificates: Certificate[] = [
  {
    id: "time-series",
    title: "TIME SERIES",
    words: ["TIME", "SERIES"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    textColor: "#6A0610",
    bgColor: "#F9E7C9",
    infoPosition: "bottom-right",
  },
  {
    id: "data-engineering",
    title: "DATA ENGINEERING",
    words: ["DATA", "ENGINEERING"],
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
    textColor: "#F9E7C9",
    bgColor: "#6A0610",
    infoPosition: "bottom-left",
  },
  {
    id: "computer-vision",
    title: "COMPUTER VISION",
    words: ["COMPUTER", "VISION"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    bgColor: "#8A9EA7",
    textColor: "#280B0B",
    infoPosition: "bottom-right",
  },
  {
    id: "ai-agents",
    title: "AI AGENTS",
    words: ["AI", "AGENTS"],
    platform: "Kaggle × Google",
    link: "https://www.kaggle.com/certification/badges/mariamfathiamin/105",
    bgColor: "#F5ECE1",
    textColor: "#6A0610",
    infoPosition: "bottom-right",
  },
];

// ── Scatter directions — each piece flies outward from its quadrant ──
const SCATTER = [
  { x: -400, y: 0, rotation: 0 },   // top-left → slides from left
  { x: 400, y: 0, rotation: 0 },    // top-right → slides from right
  { x: -400, y: 0, rotation: 0 },   // bottom-left → slides from left
  { x: 400, y: 0, rotation: 0 },    // bottom-right → slides from right
];

// ── Puzzle geometry ──────────────────────────────────────────────────
// Each grid cell is 50% × 50%. Inner div extends 8% beyond on tab sides,
// making it 54% × 54% of the container. clipPathUnits="objectBoundingBox"
// maps 0–1 to this 54% span.
//
// G = 0.926  grid boundary on the tab side  (50/54)
// S = 0.074  grid boundary on the socket side (4/54)
//
// Tabs protrude outward from G → 1.0.
// Sockets indent inward from S → S + 0.074.
// Both have a narrow neck for the classic jigsaw look.

// Inner-div inset overrides per piece (extends 8% on tab sides)
const EXTENSIONS: React.CSSProperties[] = [
  { top: 0, left: 0, right: "-8%", bottom: "-8%" },   // P0: tabs right + bottom
  { top: 0, left: "-8%", right: 0, bottom: "-8%" },   // P1: socket left, tab bottom
  { top: "-8%", left: 0, right: "-8%", bottom: 0 },   // P2: socket top, tab right
  { top: "-8%", left: "-8%", right: 0, bottom: 0 },   // P3: sockets left + top
];

// z-index per piece — tabs must render behind neighboring sockets
const Z_ORDER = [1, 2, 2, 3];

// ── SVG clip-path data (objectBoundingBox 0–1 coords) ───────────────
// Tab on RIGHT edge (clockwise, going down):
const TAB_R = `
  L 0.926 0.36
  C 0.926 0.40, 0.916 0.42, 0.916 0.44
  C 0.916 0.46, 1.0   0.46, 1.0   0.50
  C 1.0   0.54, 0.916 0.54, 0.916 0.56
  C 0.916 0.58, 0.926 0.60, 0.926 0.64`;

// Tab on BOTTOM edge (clockwise, going left):
const TAB_B = `
  L 0.64 0.926
  C 0.60 0.926, 0.58 0.916, 0.56 0.916
  C 0.54 0.916, 0.54 1.0,   0.50 1.0
  C 0.46 1.0,   0.46 0.916, 0.44 0.916
  C 0.42 0.916, 0.40 0.926, 0.36 0.926`;

// Socket on LEFT edge (clockwise, going up):
const SOCK_L = `
  L 0.074 0.64
  C 0.074 0.60, 0.084 0.58, 0.084 0.56
  C 0.084 0.54, 0.148 0.54, 0.148 0.50
  C 0.148 0.46, 0.084 0.46, 0.084 0.44
  C 0.084 0.42, 0.074 0.40, 0.074 0.36`;

// Socket on TOP edge (clockwise, going right):
const SOCK_T = `
  L 0.36 0.074
  C 0.40 0.074, 0.42 0.084, 0.44 0.084
  C 0.46 0.084, 0.46 0.148, 0.50 0.148
  C 0.54 0.148, 0.54 0.084, 0.56 0.084
  C 0.58 0.084, 0.60 0.074, 0.64 0.074`;

// Full paths per piece
const PATHS = [
  // P0: straight top + left, tab right, tab bottom
  `M 0 0 L 0.926 0 ${TAB_R} L 0.926 0.926 ${TAB_B} L 0 0.926 Z`,
  // P1: straight top + right, tab bottom, socket left
  `M 0.074 0 L 1 0 L 1 0.926 ${TAB_B} L 0.074 0.926 ${SOCK_L} Z`,
  // P2: straight left + bottom, socket top, tab right
  `M 0 0.074 ${SOCK_T} L 0.926 0.074 ${TAB_R} L 0.926 1 L 0 1 Z`,
  // P3: straight right + bottom, socket top, socket left
  `M 0.074 0.074 ${SOCK_T} L 1 0.074 L 1 1 L 0.074 1 ${SOCK_L} Z`,
];

// ── Component ────────────────────────────────────────────────────────
const Certificates: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const piecesRef = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pieces = piecesRef.current.filter(Boolean) as HTMLDivElement[];
    if (pieces.length === 0) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    // ── Set initial scattered state ──────────────────────────────
    pieces.forEach((piece, i) => {
      if (isMobile) {
        gsap.set(piece, { x: i % 2 === 0 ? -200 : 200, opacity: 0 });
      } else {
        const s = SCATTER[i];
        gsap.set(piece, {
          x: s.x,
          y: s.y,
          rotation: s.rotation,
          scale: 0.92,
          opacity: 0,
        });
      }
    });

    const tweens: gsap.core.Tween[] = [];

    // ── Snap animation ───────────────────────────────────────────
    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      if (isMobile) {
        tweens.push(
          gsap.to(pieces, {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
          }),
        );
      } else {
        pieces.forEach((piece, i) => {
          tweens.push(
            gsap.to(piece, {
              x: 0,
              y: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              duration: 0.9,
              delay: i * 0.15,
              ease: "back.out(1.2)",
            }),
          );
        });
      }
    };

    // ── IntersectionObserver — fire once at 15% visible ──────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 w-full overflow-hidden bg-[#F5ECE1]"
      style={{ height: "100vh" }}
    >
      {/* Hidden SVG with clip-path definitions */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {PATHS.map((d, i) => (
            <clipPath key={i} id={`puzzle-${i}`} clipPathUnits="objectBoundingBox">
              <path d={d} />
            </clipPath>
          ))}
        </defs>
      </svg>

      {/* 2×2 desktop / 4×1 mobile grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-4 lg:grid-rows-2 w-full h-full">
        {certificates.map((cert, i) => (
          <div
            key={cert.id}
            ref={(el) => { piecesRef.current[i] = el; }}
            className="relative"
            style={{ overflow: "visible", zIndex: Z_ORDER[i] }}
          >
            {/* Desktop: puzzle-shaped background */}
            <div
              className="absolute hidden lg:block"
              style={{ ...EXTENSIONS[i], backgroundColor: cert.bgColor, clipPath: `url(#puzzle-${i})` }}
            />
            {/* Mobile: plain rectangle background */}
            <div
              className="absolute inset-0 lg:hidden"
              style={{ backgroundColor: cert.bgColor }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col w-full h-full p-4 md:p-6 lg:p-8">
              {/* Platform + Title — centered */}
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-1">
                {cert.platform && (
                  <span
                    className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium opacity-60"
                    style={{ color: cert.textColor }}
                  >
                    {cert.platform}
                  </span>
                )}
                <h3
                  className="font-bold text-2xl sm:text-3xl lg:text-5xl xl:text-6xl uppercase tracking-tighter leading-none"
                  style={{ color: cert.textColor }}
                >
                  {cert.words.join(" ")}
                </h3>
              </div>

              {/* Link — bottom-left for left pieces, bottom-right for right pieces */}
              {cert.link && (
                <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity text-xs md:text-sm"
                    style={{ color: cert.textColor }}
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { Certificates };
