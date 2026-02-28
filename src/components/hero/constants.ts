/** Design tokens for the hero section */

// ── Colors (Carmine #91010F — single source for accent and dot) ────
export const COLORS = {
  primary: "#280B0B",
  /** Carmine — "iam" letters, dot, O hover/focus, all accent UI */
  accent: "#91010F",
  heroBackground: "#F9E7C9",
  line: "#280B0B",
  /** Dot animation variants (derived from accent so one change updates all) */
  dotMotion: "#B8221E",   // slightly lighter during arcs
  dotLand: "#6B0109",     // darker on impact
  dotGhost: "#F5D4D2",    // very light when falling off
  dotFallLight: "#E8B4B2", // light when dropping from above
  dotFallMid: "#C94A46",  // mid during bounce
} as const;

// ── Font families ───────────────────────────────────────────────────
export const FONTS = {
  display: '"Momo Trust Display", "Stack Sans", sans-serif',
  body: '"Space Grotesk", "Inter", sans-serif',
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
  /** Touch moment: impact when dot meets "ı" then settle with overshoot */
  dotTouchImpact: 0.04,
  dotTouchSettle: 0.26,
  letterTouchSquash: 0.08,
  letterTouchSpring: 0.4,
  portfolioFade: 0.4,
  portfolioRotate: 1.4,
  portfolioExpand: 3.8,
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
