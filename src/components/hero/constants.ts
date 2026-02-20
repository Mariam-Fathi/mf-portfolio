/** Design tokens for the hero section */

// ── Colors ──────────────────────────────────────────────────────────
export const COLORS = {
  primary: "#280B0B",
  accent: "#6A0610",
  heroBackground: "#F9E7C9",
  line: "#280B0B",
} as const;

// ── Font families ───────────────────────────────────────────────────
export const FONTS = {
  display: '"Momo Trust Display", "Stack Sans", sans-serif',
  body: '"Space Grotesk", "Inter", sans-serif',
  script: '"Floralis Couture", cursive',
  handwritten: '"Handwritten", cursive',
  priestacy: '"Priestacy", cursive',
} as const;

// ── Z-index layering ────────────────────────────────────────────────
// Single source of truth — never set z-index in JS imperatively.
export const Z_LAYERS = {
  dot: 100,
  frame: 200,
  mariamSvg: 300,
  navigation: 101,
  engineerText: 9999,
} as const;

// ── Animation durations (seconds) ───────────────────────────────────
export const TIMING = {
  dotFall: 0.4,
  dotBounce: 0.15,
  dotSquash: 0.2,
  dotJump: 0.7,
  dotArc: 0.4,
  portfolioFade: 0.3,
  portfolioRotate: 1.4,
  portfolioExpand: 2.5,
  typewriterPerChar: 0.05,
  blurReveal: 1.2,
  blurRevealDelay: 0.3,
} as const;

// ── Breakpoints (px) ───────────────────────────────────────────────
export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
} as const;
