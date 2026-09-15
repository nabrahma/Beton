import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Textarea } from "../textarea/textarea.tsx";
import { Field } from "./field.tsx";

function NameField() {
  return (
    <Field name="name" validationMode="onBlur">
      <Field.Label>Name</Field.Label>
      <Field.Control required />
      <Field.Description>Shown on your profile.</Field.Description>
      <Field.Error match="valueMissing">Enter your name.</Field.Error>
    </Field>
  );
}

describe("Field", () => {
  it("[axe] has no violations, including the error state", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <NameField />
        <Field size="sm">
          <Field.Label>Bio</Field.Label>
          <Textarea />
        </Field>
      </>,
    );
    await expectNoAxeViolations(container);
    await user.click(screen.getByRole("textbox", { name: "Name" }));
    await user.keyboard("A{Backspace}");
    await user.tab();
    await screen.findByText("Enter your name.");
    await expectNoAxeViolations(container);
  });

  it("[name] connects the label and description to the control", () => {
    render(<NameField />);
    const control = screen.getByRole("textbox", { name: "Name" });
    expect(control).toHaveAccessibleDescription("Shown on your profile.");
  });

  it("[keyboard] passing through an untouched field does not flag it", async () => {
    const user = userEvent.setup();
    render(<NameField />);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("textbox", { name: "Name" })).not.toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("[keyboard] validates on blur after editing and marks the control invalid", async () => {
    const user = userEvent.setup();
    render(<NameField />);
    const control = screen.getByRole("textbox", { name: "Name" });

    await user.tab();
    expect(control).toHaveFocus();
    await user.keyboard("A{Backspace}");
    await user.tab();

    await waitFor(() => expect(control).toHaveAttribute("aria-invalid", "true"));
    expect(control).toHaveAttribute("data-invalid");
    expect(screen.getByText("Enter your name.")).toBeInTheDocument();

    await user.click(control);
    await user.keyboard("Ada");
    await user.tab();
    await waitFor(() => expect(control).not.toHaveAttribute("aria-invalid", "true"));
  });

  it("[name] works with a textarea as its control", async () => {
    const user = userEvent.setup();
    render(
      <Field>
        <Field.Label>Message</Field.Label>
        <Textarea />
      </Field>,
    );
    const textarea = screen.getByRole("textbox", { name: "Message" });
    expect(textarea.tagName).toBe("TEXTAREA");
    await user.click(textarea);
    await user.keyboard("Line one{Enter}Line two");
    expect(textarea).toHaveValue("Line one\nLine two");
  });
});
