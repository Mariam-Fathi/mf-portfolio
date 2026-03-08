/**
 * Shared portfolio animation cache that lives in the page chunk.
 * Hero unmounts when navigating away; in production the Hero chunk can be
 * unloaded and re-evaluated when returning, which would reset module-level
 * state. By keeping the cache here and importing it from the page, we ensure
 * it survives Hero unmount and the expanded state is restored on return.
 */
import type { PortfolioData } from "./types";

export const portfolioCache = {
  cachedData: null as PortfolioData | null,
  dataCalculated: false,
  everCompleted: false,
  lastExpandedWhenLeavingHero: false,
  /** Set to true when Hero unmounts (navigate away). Cleared when we restore expanded on return. */
  returnedFromSection: false,
};

export function resetPortfolioCache(): void {
  portfolioCache.cachedData = null;
  portfolioCache.dataCalculated = false;
  portfolioCache.everCompleted = false;
  portfolioCache.lastExpandedWhenLeavingHero = false;
  portfolioCache.returnedFromSection = false;
}

export function hasPortfolioEverCompleted(): boolean {
  return portfolioCache.everCompleted;
}
