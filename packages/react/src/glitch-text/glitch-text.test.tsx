import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { GlitchText } from "./glitch-text.tsx";

describe("GlitchText", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <GlitchText key={size} size={size}>
            BÉTON
          </GlitchText>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] the coloured copies are hidden, so the words are read once", () => {
    render(<GlitchText>BÉTON</GlitchText>);
    const copies = screen.getAllByText("BÉTON");
    expect(copies).toHaveLength(3);
    expect(copies.filter((copy) => copy.getAttribute("aria-hidden") === "true")).toHaveLength(2);
  });

  it("[motion] the copies disappear under reduced motion", () => {
    const { container } = render(<GlitchText>BÉTON</GlitchText>);
    const layers = container.querySelectorAll("[aria-hidden='true']");
    for (const layer of layers) expect(layer.className).toContain("motion-reduce:hidden");
  });
});
