import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Marquee } from "./marquee.tsx";

describe("Marquee", () => {
  it("[axe] has no violations in either direction or any gap", async () => {
    const { container } = render(
      <div>
        {(["left", "right"] as const).map((direction) =>
          (["sm", "md", "lg"] as const).map((gap) => (
            <Marquee key={direction + gap} direction={direction} gap={gap} bordered>
              <span>Poured in place</span>
            </Marquee>
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] the words are only read once, however many copies are drawn", () => {
    render(
      <Marquee copies={4}>
        <span>Ready mixed</span>
      </Marquee>,
    );
    const copies = screen.getAllByText("Ready mixed");
    expect(copies).toHaveLength(4);
    expect(copies.filter((copy) => copy.closest("[aria-hidden='true']"))).toHaveLength(3);
  });

  it("[motion] the animation is behind motion-safe, so reduced motion holds it still", () => {
    const { container } = render(
      <Marquee>
        <span>Ready mixed</span>
      </Marquee>,
    );
    const track = container.querySelector("[class*='animate-marquee']");
    expect(track?.className).toContain("motion-safe:animate-marquee");
    expect(track?.className).toContain("motion-reduce:animate-none");
  });

  it("[duration] sets the length of one pass as a custom property", () => {
    const { container } = render(
      <Marquee duration={8}>
        <span>Ready mixed</span>
      </Marquee>,
    );
    expect(container.firstElementChild).toHaveStyle({ "--marquee-duration": "8s" });
  });
});
