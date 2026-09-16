import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { setReducedMotion } from "../../test/motion.ts";
import { ScrambleText } from "./scramble-text.tsx";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("ScrambleText", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <ScrambleText key={size} size={size}>
            CONCRETE
          </ScrambleText>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] screen readers only ever get the real words", () => {
    vi.useFakeTimers();
    render(<ScrambleText>CONCRETE</ScrambleText>);
    act(() => {
      vi.advanceTimersByTime(80);
    });
    // The churning copy is hidden; the real words sit beside it.
    const real = screen.getByText("CONCRETE");
    expect(real.closest("[aria-hidden='true']")).toBeNull();
  });

  it("[motion] settles on the final words", () => {
    vi.useFakeTimers();
    const { container } = render(<ScrambleText interval={10}>CONCRETE</ScrambleText>);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("CONCRETE");
  });

  it("[motion] reduced motion skips the churn entirely", () => {
    const restore = setReducedMotion(true);
    vi.useFakeTimers();
    const { container } = render(<ScrambleText>CONCRETE</ScrambleText>);
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("CONCRETE");
    restore();
  });
});
