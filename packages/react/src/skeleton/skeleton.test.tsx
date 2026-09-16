import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Skeleton } from "./skeleton.tsx";

describe("Skeleton", () => {
  it("[axe] has no violations in any shape", async () => {
    const { container } = render(
      <div>
        {(["line", "title", "block", "avatar", "button"] as const).map((shape) => (
          <Skeleton key={shape} shape={shape} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is hidden from screen readers, which hear the live region instead", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("[motion] only animates when motion is allowed", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstElementChild?.className).toContain("motion-safe:animate-pulse-stepped");
  });
});
