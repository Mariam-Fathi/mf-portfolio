// Shared module to store navigation Y position from hero section
export let heroNavigationY: number | null = null;

// Store line data for use in other sections
export let heroLineData: {
  lineY: number; // Absolute Y position of the line
  lineEndX: number; // X position where line ends (before O)
  lineWidth: number; // Final width of the line in hero
  oPositionX: number; // X position where O is (absolute viewport position)
} | null = null;

export const setHeroNavigationY = (y: number | null) => {
  heroNavigationY = y;
};

export const getHeroNavigationY = (): number | null => {
  return heroNavigationY;
};

export const setHeroLineData = (data: {
  lineY: number;
  lineEndX: number;
  lineWidth: number;
  oPositionX: number;
} | null) => {
  heroLineData = data;
};

export const getHeroLineData = () => {
  return heroLineData;
};

