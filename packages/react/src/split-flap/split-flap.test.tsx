import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { setReducedMotion } from "../../test/motion.ts";
import { SplitFlap } from "./split-flap.tsx";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("SplitFlap", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <SplitFlap key={size} size={size}>
            {"BETON"}
          </SplitFlap>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] screen readers get the words at once", () => {
    vi.useFakeTimers();
    render(<SplitFlap>{"BETON"}</SplitFlap>);
    expect(screen.getByText("BETON")).toBeInTheDocument();
  });

  it("[motion] the cells flap until they reach their letters", () => {
    vi.useFakeTimers();
    const { container } = render(<SplitFlap interval={5}>{"BE"}</SplitFlap>);
    const cells = () =>
      [...container.querySelectorAll("[aria-hidden='true']")]
        .map((cell) => cell.textContent?.trim())
        .join("");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(cells()).toBe("BE");
  });

  it("[cells] can be wider than the words, padded with blanks", () => {
    vi.useFakeTimers();
    const { container } = render(<SplitFlap cells={6}>{"BE"}</SplitFlap>);
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(6);
  });

  it("[motion] reduced motion shows the words without flapping", () => {
    const restore = setReducedMotion(true);
    const { container } = render(<SplitFlap>{"BETON"}</SplitFlap>);
    const shown = [...container.querySelectorAll("[aria-hidden='true']")]
      .map((cell) => cell.textContent?.trim())
      .join("");
    expect(shown).toBe("BETON");
    restore();
  });
});
