import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { HalftoneBackground } from "./halftone-background.tsx";

describe("HalftoneBackground", () => {
  it("[axe] has no violations at any weight", async () => {
    const { container } = render(
      <div>
        {(["light", "medium", "heavy"] as const).map((weight) => (
          <HalftoneBackground key={weight} weight={weight} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is decoration: hidden, and never in the way of a pointer", () => {
    const { container } = render(<HalftoneBackground />);
    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.className).toContain("pointer-events-none");
  });

  it("[dot] sizes the dots against the cell", () => {
    const { container } = render(<HalftoneBackground cell={20} dot={0.25} />);
    expect(container.querySelector("circle")).toHaveAttribute("r", "5");
  });
});
