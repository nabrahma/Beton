import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Button } from "../button/button.tsx";
import { Field } from "../field/field.tsx";
import { Form } from "./form.tsx";

function SignupForm({
  onFormSubmit,
  errors,
}: {
  onFormSubmit?: (values: Record<string, unknown>) => void;
  errors?: Record<string, string>;
}) {
  return (
    <Form aria-label="Sign up" onFormSubmit={onFormSubmit} errors={errors}>
      <Field name="email">
        <Field.Label>Email</Field.Label>
        <Field.Control type="email" required />
        <Field.Error />
      </Field>
      <Field name="studio">
        <Field.Label>Studio</Field.Label>
        <Field.Control required minLength={3} />
        <Field.Error />
      </Field>
      <Button type="submit">Create account</Button>
    </Form>
  );
}

describe("Form", () => {
  it("[axe] has no violations before and after a failed submit", async () => {
    const user = userEvent.setup();
    const { container } = render(<SignupForm />);
    await expectNoAxeViolations(container);
    await user.click(screen.getByRole("button", { name: "Create account" }));
    await waitFor(() =>
      expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute(
        "aria-invalid",
        "true",
      ),
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the form is a named landmark", () => {
    render(<SignupForm />);
    expect(screen.getByRole("form", { name: "Sign up" })).toBeInTheDocument();
  });

  it("[keyboard] submitting with Enter focuses the first invalid field", async () => {
    const user = userEvent.setup();
    const onFormSubmit = vi.fn();
    render(<SignupForm onFormSubmit={onFormSubmit} />);

    await user.tab();
    await user.tab();
    await user.keyboard("ab{Enter}");

    await waitFor(() => expect(screen.getByRole("textbox", { name: "Email" })).toHaveFocus());
    expect(onFormSubmit).not.toHaveBeenCalled();
  });

  it("[keyboard] submits the values when every field is valid", async () => {
    const user = userEvent.setup();
    const onFormSubmit = vi.fn();
    render(<SignupForm onFormSubmit={onFormSubmit} />);

    await user.type(screen.getByRole("textbox", { name: "Email" }), "ada@example.com");
    await user.type(screen.getByRole("textbox", { name: "Studio" }), "Béton");
    await user.keyboard("{Enter}");

    await waitFor(() => expect(onFormSubmit).toHaveBeenCalledOnce());
    expect(onFormSubmit.mock.calls[0]?.[0]).toMatchObject({
      email: "ada@example.com",
      studio: "Béton",
    });
  });

  it("[name] shows server errors passed through errors", async () => {
    render(<SignupForm errors={{ email: "That email is already registered." }} />);
    expect(await screen.findByText("That email is already registered.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAttribute("aria-invalid", "true");
  });
});
