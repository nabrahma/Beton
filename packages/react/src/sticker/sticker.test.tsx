import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Sticker } from "./sticker.tsx";

describe("Sticker", () => {
  it("[axe] has no violations in any variant or size", async () => {
    const { container } = render(
      <div>
        {(["primary", "secondary", "ghost", "danger"] as const).map((variant) =>
          (["sm", "md", "lg"] as const).map((size) => (
            <Sticker key={variant + size} variant={variant} size={size} text={variant + size}>
              ↗
            </Sticker>
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the circling words are available as plain text", () => {
    render(<Sticker text="New release">↗</Sticker>);
    expect(screen.getByText("New release")).toBeInTheDocument();
  });

  it("[aria] the drawing itself is hidden from screen readers", () => {
    const { container } = render(<Sticker text="New release" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("[motion] the turn stops under reduced motion", () => {
    const { container } = render(<Sticker text="New release" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "motion-reduce:animate-none",
    );
  });

  it("[reverse] can turn the other way", () => {
    const { container } = render(<Sticker text="New release" reverse />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "[animation-direction:reverse]",
    );
  });
});
