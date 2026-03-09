/**
 * Shared portfolio animation cache (owned by the page; passed to Hero so
 * production chunk-splitting doesn’t duplicate it on Vercel).
 *
 * Return-to-hero / expand rule (single place to look):
 * - Page sets expandOnReturnToHero = true when: (1) user leaves hero, or
 *   (2) user clicks "home". Hero reads it once on mount and expands the
 *   portfolio if true, then clears it.
 * - lastExpandedWhenLeavingHero = was portfolio expanded when we left (for
 *   same-session restore and resize). Hero expands if expandOnReturnToHero
 *   OR lastExpandedWhenLeavingHero.
 */
import type { PortfolioData } from "./types";

export const portfolioCache = {
  cachedData: null as PortfolioData | null,
  dataCalculated: false,
  everCompleted: false,
  lastExpandedWhenLeavingHero: false,
  /** True = user came back to hero (page or unmount set this); Hero expands and clears. */
  expandOnReturnToHero: false,
};

export function resetPortfolioCache(): void {
  portfolioCache.cachedData = null;
  portfolioCache.dataCalculated = false;
  portfolioCache.everCompleted = false;
  portfolioCache.lastExpandedWhenLeavingHero = false;
  portfolioCache.expandOnReturnToHero = false;
}

export function hasPortfolioEverCompleted(): boolean {
  return portfolioCache.everCompleted;
}
