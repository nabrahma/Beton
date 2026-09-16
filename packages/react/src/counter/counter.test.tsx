import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { setReducedMotion } from "../../test/motion.ts";
import { Counter } from "./counter.tsx";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Counter", () => {
  it("[axe] has no violations in any size", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg", "xl"] as const).map((size) => (
          <Counter key={size} size={size} value={1284} />
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the final number is available from the first frame", () => {
    render(<Counter value={1284} />);
    expect(screen.getByText("1,284")).toBeInTheDocument();
  });

  it("[format] takes a currency or a unit and uses it for both copies", () => {
    render(<Counter value={42} prefix="£" suffix="k" format={{ minimumFractionDigits: 0 }} />);
    expect(screen.getByText("£42k")).toBeInTheDocument();
  });

  it("[motion] reduced motion lands on the number at once", () => {
    const restore = setReducedMotion(true);
    const { container } = render(<Counter value={99} from={0} />);
    expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("99");
    restore();
  });
});
