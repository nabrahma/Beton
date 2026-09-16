import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setReducedMotion } from "../../test/motion.ts";
import { Confetti } from "./confetti.tsx";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Confetti", () => {
  it("[motion] throws nothing until it is fired", () => {
    const { container } = render(<Confetti fire={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("[motion] throws the number of pieces asked for, then clears up", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    const { container } = render(<Confetti fire={1} count={12} duration={500} onDone={onDone} />);
    expect(container.querySelectorAll("span")).toHaveLength(12);

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(container).toBeEmptyDOMElement();
    expect(onDone).toHaveBeenCalledOnce();
  });

  it("[aria] the pieces are decoration and never block a click", () => {
    const { container } = render(<Confetti fire={1} count={4} />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toContain("pointer-events-none");
  });

  it("[motion] reduced motion throws nothing at all", () => {
    const restore = setReducedMotion(true);
    const { container } = render(<Confetti fire={1} />);
    expect(container).toBeEmptyDOMElement();
    restore();
  });
});
