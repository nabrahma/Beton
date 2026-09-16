import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Stat } from "./stat.tsx";

describe("Stat", () => {
  it("[axe] has no violations in any size or trend", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) =>
          (["up", "down", "flat"] as const).map((trend) => (
            <Stat
              key={size + trend}
              size={size}
              trend={trend}
              label={size + " " + trend}
              value="1,284"
              delta="+12%"
              description="Compared with last month"
            />
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[state] says which way the number went, in words as well as an arrow", () => {
    render(<Stat label="Revenue" value="£1,284" delta="+12%" trend="up" />);
    expect(screen.getByText(/\(up\)/)).toBeInTheDocument();
  });

  it("[state] exposes the trend as a data attribute", () => {
    const { container } = render(<Stat label="Revenue" value="0" trend="down" delta="-4%" />);
    expect(container.firstElementChild).toHaveAttribute("data-trend", "down");
  });

  it("[content] shows the label, the number and the context", () => {
    render(<Stat label="Pours" value="42" description="This quarter" />);
    expect(screen.getByText("Pours")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("This quarter")).toBeInTheDocument();
  });
});
