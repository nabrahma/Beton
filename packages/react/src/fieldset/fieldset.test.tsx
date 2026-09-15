import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Checkbox } from "../checkbox/checkbox.tsx";
import { Fieldset } from "./fieldset.tsx";

function Toppings() {
  return (
    <Fieldset>
      <Fieldset.Legend>Toppings</Fieldset.Legend>
      <label>
        <Checkbox name="toppings" value="basil" />
        Basil
      </label>
      <label>
        <Checkbox name="toppings" value="chilli" />
        Chilli
      </label>
    </Fieldset>
  );
}

describe("Fieldset", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(<Toppings />);
    await expectNoAxeViolations(container);
  });

  it("[name] the legend names the group", () => {
    render(<Toppings />);
    expect(screen.getByRole("group", { name: "Toppings" })).toBeInTheDocument();
  });

  it("[keyboard] every control in the group is reachable in order", async () => {
    const user = userEvent.setup();
    render(<Toppings />);
    await user.tab();
    expect(screen.getByRole("checkbox", { name: "Basil" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("checkbox", { name: "Chilli" })).toHaveFocus();
  });
});
