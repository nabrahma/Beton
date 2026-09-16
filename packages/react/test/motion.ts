import { vi } from "vitest";

const REDUCE = "(prefers-reduced-motion: reduce)";

/**
 * Answers matchMedia as though the person had asked for less motion, or not.
 * The default setup file already answers hover and pointer queries, so this
 * keeps those answers and only changes what it needs to.
 */
export function setReducedMotion(reduced: boolean) {
  const previous = window.matchMedia;
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("prefers-reduced-motion")
      ? query === REDUCE
        ? reduced
        : !reduced
      : query.includes("hover: hover") || query.includes("pointer: fine"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
  return () => {
    window.matchMedia = previous;
  };
}
