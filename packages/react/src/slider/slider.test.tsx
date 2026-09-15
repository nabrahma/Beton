import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Slider } from "./slider.tsx";

describe("Slider", () => {
  it("[axe] has no violations for single and range sliders in every size", async () => {
    const { container } = render(
      <div>
        <Slider label="Volume" defaultValue={40} showValue size="sm" />
        <Slider aria-label="Opacity" defaultValue={70} variant="secondary" />
        <Slider
          label="Price"
          defaultValue={[20, 80]}
          thumbLabels={["Minimum", "Maximum"]}
          size="lg"
        />
        <Slider label="Disabled" defaultValue={10} disabled variant="danger" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] thumbs take their name from the label, aria-label or thumbLabels", () => {
    render(
      <>
        <Slider label="Volume" defaultValue={40} />
        <Slider aria-label="Opacity" defaultValue={70} />
        <Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]} />
      </>,
    );
    expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Opacity" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Minimum" })).toBeInTheDocument();
    expect(screen.getByRole("slider", { name: "Maximum" })).toBeInTheDocument();
  });

  it("[keyboard] arrows step, Shift takes large steps, Home and End jump to the limits", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <Slider
        label="Volume"
        defaultValue={50}
        step={5}
        largeStep={20}
        onValueChange={onValueChange}
      />,
    );

    await user.tab();
    const thumb = screen.getByRole("slider", { name: "Volume" });
    expect(thumb).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(thumb).toHaveAttribute("aria-valuenow", "55");
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(thumb).toHaveAttribute("aria-valuenow", "45");
    await user.keyboard("{Shift>}{ArrowRight}{/Shift}");
    expect(thumb).toHaveAttribute("aria-valuenow", "65");
    await user.keyboard("{End}");
    expect(thumb).toHaveAttribute("aria-valuenow", "100");
    await user.keyboard("{Home}");
    expect(thumb).toHaveAttribute("aria-valuenow", "0");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("[keyboard] each thumb of a range is its own tab stop", async () => {
    const user = userEvent.setup();
    render(<Slider label="Price" defaultValue={[20, 80]} thumbLabels={["Minimum", "Maximum"]} />);
    await user.tab();
    expect(screen.getByRole("slider", { name: "Minimum" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("slider", { name: "Maximum" })).toHaveFocus();
  });

  it("[focus] thumbs render the focus ring and a 44px hit area", () => {
    const { container } = render(<Slider label="Ring" defaultValue={5} size="sm" />);
    const thumb = container.querySelector("[data-index='0']");
    expect(thumb?.className).toContain("has-focus-visible:ring-focus-gap");
    expect(thumb?.className).toContain("after:-inset-3");
  });
});
