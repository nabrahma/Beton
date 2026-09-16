import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { NoiseOverlay } from "./noise-overlay.tsx";

describe("NoiseOverlay", () => {
  it("[axe] has no violations at any weight", async () => {
    const { container } = render(
      <div>
        {(["light", "medium", "heavy"] as const).map((weight) => (
          <NoiseOverlay key={weight} weight={weight} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is decoration: hidden, and never in the way of a pointer", () => {
    const { container } = render(<NoiseOverlay />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toContain("pointer-events-none");
  });

  it("[frequency] the grain is drawn, not downloaded", () => {
    const { container } = render(<NoiseOverlay frequency={1.2} />);
    expect(container.querySelector("feTurbulence")).toHaveAttribute("baseFrequency", "1.2");
  });
});
