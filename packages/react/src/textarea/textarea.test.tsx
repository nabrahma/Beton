import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Label } from "../label/label.tsx";
import { Textarea } from "./textarea.tsx";

describe("Textarea", () => {
  it("[axe] has no violations in every size and state", async () => {
    const { container } = render(
      <div>
        {(["sm", "md", "lg"] as const).map((size) => (
          <div key={size}>
            <Label htmlFor={`notes-${size}`}>Notes {size}</Label>
            <Textarea id={`notes-${size}`} size={size} />
          </div>
        ))}
        <Label htmlFor="disabled-notes">Disabled</Label>
        <Textarea id="disabled-notes" disabled />
        <Label htmlFor="invalid-notes">Invalid</Label>
        <Textarea id="invalid-notes" aria-invalid="true" />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] is named by its label", () => {
    render(
      <>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Bio" }).tagName).toBe("TEXTAREA");
  });

  it("[keyboard] accepts multi-line input", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Address" />);
    await user.tab();
    await user.keyboard("12 Rue du Béton{Enter}Paris");
    expect(screen.getByRole("textbox")).toHaveValue("12 Rue du Béton\nParis");
  });

  it("[focus] renders the focus ring", () => {
    render(<Textarea aria-label="Ring" />);
    expect(screen.getByRole("textbox").className).toContain("focus-visible:ring-focus-gap");
  });
});
