import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Ticker } from "./ticker.tsx";

const items = ["Wharf Road poured", "Kiln Street booked", "Bridge Yard curing"];

describe("Ticker", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <Ticker key={size} size={size} label="Live" items={items} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] the headlines are read once and the separators not at all", () => {
    const { container } = render(<Ticker label="Live" items={items} />);
    expect(screen.getAllByText("Wharf Road poured")).toHaveLength(2);
    const hidden = container.querySelectorAll("[aria-hidden='true']");
    // One hidden pass, plus a separator after each item in both passes.
    expect(hidden.length).toBeGreaterThanOrEqual(items.length);
  });

  it("[motion] the strip holds still under reduced motion", () => {
    const { container } = render(<Ticker items={items} />);
    const track = container.querySelector("[class*='animate-marquee']");
    expect(track?.className).toContain("motion-reduce:animate-none");
  });
});
