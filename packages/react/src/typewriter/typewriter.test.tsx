import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { setReducedMotion } from "../../test/motion.ts";
import { Typewriter } from "./typewriter.tsx";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("Typewriter", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Typewriter key={size} size={size}>
            Poured in place
          </Typewriter>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the whole text is available however far the typing has got", () => {
    vi.useFakeTimers();
    render(<Typewriter>{["Poured in place", "Cured for weeks"]}</Typewriter>);
    expect(screen.getByText("Poured in place. Cured for weeks")).toBeInTheDocument();
  });

  it("[motion] types one character at a time", () => {
    vi.useFakeTimers();
    const { container } = render(<Typewriter speed={10}>Béton</Typewriter>);
    const typed = () => container.querySelector("[aria-hidden='true']")?.textContent ?? "";

    expect(typed()).toBe("");
    act(() => {
      vi.advanceTimersByTime(35);
    });
    expect(typed().length).toBeGreaterThan(0);
    expect("Béton").toContain(typed());
  });

  it("[motion] reduced motion shows the line at once, with no caret", () => {
    const restore = setReducedMotion(true);
    const { container } = render(<Typewriter>Béton</Typewriter>);
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("Béton");
    expect(container.querySelectorAll("[aria-hidden='true']")).toHaveLength(1);
    restore();
  });
});
