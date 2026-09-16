import { act, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { setReducedMotion } from "../../test/motion.ts";
import { CursorTrail } from "./cursor-trail.tsx";

afterEach(() => {
  vi.unstubAllGlobals();
});

function move(x: number, y: number) {
  act(() => {
    document.dispatchEvent(Object.assign(new Event("pointermove"), { clientX: x, clientY: y }));
  });
}

describe("CursorTrail", () => {
  it("[motion] draws nothing until the pointer moves", () => {
    const { container } = render(<CursorTrail />);
    expect(container).toBeEmptyDOMElement();
  });

  it("[motion] follows the pointer and keeps only the last few marks", () => {
    const { container } = render(<CursorTrail length={3} />);
    for (let i = 0; i < 6; i += 1) move(i * 10, i * 10);
    expect(container.querySelectorAll("span")).toHaveLength(3);
  });

  it("[aria] the trail is decoration and never blocks a click", () => {
    const { container } = render(<CursorTrail />);
    move(10, 10);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toContain("pointer-events-none");
  });

  it("[motion] reduced motion draws nothing at all", () => {
    const restore = setReducedMotion(true);
    const { container } = render(<CursorTrail />);
    move(10, 10);
    expect(container).toBeEmptyDOMElement();
    restore();
  });
});
