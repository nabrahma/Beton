import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Stepper } from "./stepper.tsx";

function Example(props: { activeStep?: number; orientation?: "horizontal" | "vertical" }) {
  return (
    <Stepper {...props}>
      <Stepper.Step title="Basket" description="What you are buying" />
      <Stepper.Step title="Delivery" description="Where it goes" />
      <Stepper.Step title="Payment" description="How you pay" />
    </Stepper>
  );
}

describe("Stepper", () => {
  it("[axe] has no violations in either orientation or any size", async () => {
    const { container } = render(
      <div>
        <Example activeStep={1} />
        <Example activeStep={1} orientation="vertical" />
        {(["sm", "md", "lg"] as const).map((size) => (
          <Stepper key={size} size={size} activeStep={0} aria-label={`Progress ${size}`}>
            <Stepper.Step title="One" />
            <Stepper.Step title="Two" />
          </Stepper>
        ))}
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[aria] is a labelled ordered list of steps", () => {
    render(<Example activeStep={1} />);
    expect(screen.getByRole("list", { name: "Progress" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("[state] works out what is done, current and still to come", () => {
    render(<Example activeStep={1} />);
    const [basket, delivery, payment] = screen.getAllByRole("listitem");
    expect(basket).toHaveAttribute("data-state", "complete");
    expect(delivery).toHaveAttribute("data-state", "current");
    expect(delivery).toHaveAttribute("aria-current", "step");
    expect(payment).toHaveAttribute("data-state", "upcoming");
    expect(payment).not.toHaveAttribute("aria-current");
  });

  it("[state] says done and current in words, not only in colour", () => {
    render(<Example activeStep={1} />);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent("(done)");
    expect(screen.getAllByRole("listitem")[1]).toHaveTextContent("(current step)");
  });

  it("[state] a step can set its own state", () => {
    render(
      <Stepper activeStep={0}>
        <Stepper.Step title="One" state="complete" />
        <Stepper.Step title="Two" state="current" />
      </Stepper>,
    );
    expect(screen.getAllByRole("listitem")[0]).toHaveAttribute("data-state", "complete");
    expect(screen.getAllByRole("listitem")[1]).toHaveAttribute("data-state", "current");
  });

  it("[marker] numbers upcoming steps and accepts a marker of its own", () => {
    render(
      <Stepper activeStep={0}>
        <Stepper.Step title="One" />
        <Stepper.Step title="Two" />
        <Stepper.Step title="Three" marker="★" />
      </Stepper>,
    );
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveTextContent("2");
    expect(items[2]).toHaveTextContent("★");
  });

  it("[connector] draws a line between steps but not after the last one", () => {
    const { container } = render(<Example activeStep={1} />);
    expect(container.querySelectorAll("span[aria-hidden='true'][data-state]")).toHaveLength(2);
  });
});
