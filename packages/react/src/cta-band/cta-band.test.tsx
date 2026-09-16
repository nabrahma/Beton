import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { CtaBand } from "./cta-band.tsx";

describe("CtaBand", () => {
  it("[axe] has no violations on any surface or layout", async () => {
    const { container } = render(
      <div>
        {(["accent", "secondary", "ink", "raised"] as const).map((surface) =>
          (["stacked", "inline"] as const).map((layout) => (
            <CtaBand
              key={surface + layout}
              surface={surface}
              layout={layout}
              title={surface + " " + layout}
              description="One thing to do, said once."
              actions={<Button>Install</Button>}
            />
          )),
        )}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a landmark named by its heading", () => {
    render(<CtaBand title="Start building" actions={<Button>Install</Button>} />);
    expect(screen.getByRole("region", { name: "Start building" })).toBeInTheDocument();
  });

  it("[surface] reports which surface it is on", () => {
    const { container } = render(<CtaBand surface="ink" title="Start" />);
    expect(container.firstElementChild).toHaveAttribute("data-surface", "ink");
  });
});
