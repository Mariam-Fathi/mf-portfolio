// Shared module to store navigation Y position from hero section
export let heroNavigationY: number | null = null;

// Store line data for use in other sections
export let heroLineData: {
  lineY: number; // Absolute Y position of the line
  lineEndX: number; // X position where line ends (where O is)
  lineWidth: number; // Final width of the line in hero
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
} | null) => {
  heroLineData = data;
};

export const getHeroLineData = () => {
  return heroLineData;
};

