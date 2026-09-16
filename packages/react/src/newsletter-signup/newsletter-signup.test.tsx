import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { NewsletterSignup } from "./newsletter-signup.tsx";

describe("NewsletterSignup", () => {
  it("[axe] has no violations", async () => {
    const { container } = render(
      <NewsletterSignup
        title="Get the release notes"
        description="One email per release. Nothing else."
        note="Unsubscribe in one click."
      />,
    );
    await expectNoAxeViolations(container);
  });

  it("[name] the field is labelled and asks for an email address", () => {
    render(<NewsletterSignup title="Get the release notes" />);
    const field = screen.getByLabelText("Email address");
    expect(field).toHaveAttribute("type", "email");
    expect(field).toBeRequired();
  });

  it("[keyboard] the field and the button are reachable in order", async () => {
    const user = userEvent.setup();
    render(<NewsletterSignup title="Get the release notes" />);

    await user.tab();
    expect(screen.getByLabelText("Email address")).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Subscribe" })).toHaveFocus();
  });

  it("[submit] reports the address that was entered", async () => {
    const user = userEvent.setup();
    const onSubscribe = vi.fn();
    render(<NewsletterSignup title="Get the release notes" onSubscribe={onSubscribe} />);

    await user.type(screen.getByLabelText("Email address"), "ada@example.com");
    await user.click(screen.getByRole("button", { name: "Subscribe" }));
    expect(onSubscribe).toHaveBeenCalledWith("ada@example.com");
  });

  it("[progressive] posts to an address when no handler is given", () => {
    const { container } = render(
      <NewsletterSignup title="Get the release notes" action="/subscribe" />,
    );
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("action", "/subscribe");
    expect(form).toHaveAttribute("method", "post");
  });
});
