// Shared module to store navigation Y position from hero section
export let heroNavigationY: number | null = null;

export const setHeroNavigationY = (y: number | null) => {
  heroNavigationY = y;
};

export const getHeroNavigationY = (): number | null => {
  return heroNavigationY;
};

