/** Shared interfaces for the hero section */

export interface HeroProps {
  onNavigate: (section: string) => void;
  onReady?: () => void;
  isActive?: boolean;
}

export interface DotPositions {
  iScreenX: number;
  iScreenY: number;
  iCenterY: number;
  a2ScreenX: number;
  a2ScreenY: number;
  m2ScreenX: number;
  m2ScreenY: number;
  dotSize: number;
  finalDotSize: number;
  /** Portfolio header "O" position for exact dot landing (desktop) */
  oPortfolioScreenX?: number;
  oPortfolioCenterY?: number;
  oPortfolioWidth?: number;
  oPortfolioHeight?: number;
  oPortfolioTop?: number;
}

export interface PortfolioData {
  portfolWidth: number;
  oFinalX: number;
  lineFinalWidth: number;
  iOriginalPosition: number;
  oStartX: number;
  iWidth: number;
  containerWidth: number;
}

export interface MariamSvgData {
  fontSize: number;
  mariamWidth: number;
  mariamHeight: number;
  portfolBottom: number;
  portfolLeft: number;
  portfolFontSize: number;
  screenWidth: number;
  screenHeight: number;
}

/** Sections the navigation can target */
export type SectionId =
  | "hero"
  | "work"
  | "certificates"
  | "experience"
  | "contact";

export const NAV_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "experience", label: "experience" },
  { id: "work", label: "projects" },
  { id: "certificates", label: "certificates" },
  { id: "contact", label: "contact" },
];
