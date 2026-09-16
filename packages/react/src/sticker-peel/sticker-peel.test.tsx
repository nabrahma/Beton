import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { StickerPeel } from "./sticker-peel.tsx";

describe("StickerPeel", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <StickerPeel key={size} size={size}>
            <p>Peel me</p>
          </StickerPeel>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] the peeling corner is decoration", () => {
    const { container } = render(
      <StickerPeel>
        <p>Peel me</p>
      </StickerPeel>,
    );
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
    expect(screen.getByText("Peel me")).toBeInTheDocument();
  });

  it("[motion] the lift stops under reduced motion", () => {
    const { container } = render(
      <StickerPeel>
        <p>Peel me</p>
      </StickerPeel>,
    );
    expect(container.firstElementChild?.className).toContain("motion-reduce:transition-none");
  });

  it("[render] can be handed to a link", () => {
    render(
      <StickerPeel render={<a href="#offer" />}>
        <p>Peel me</p>
      </StickerPeel>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", "#offer");
  });
});
