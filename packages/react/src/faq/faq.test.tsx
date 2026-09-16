import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/a11y.ts";
import { Faq } from "./faq.tsx";

const items = [
  { question: "Is it free?", answer: "Every component and every block." },
  {
    question: "Can I sell it?",
    answer: "Not the library itself. Anything you build with it, yes.",
  },
];

describe("Faq", () => {
  it("[axe] has no violations, with or without an aside", async () => {
    const { container } = render(
      <div>
        <Faq title="Questions" items={items} />
        <Faq title="More questions" items={items} aside={<p>Ask us anything.</p>} />
      </div>,
    );
    await expectNoAxeViolations(container);
  });

  it("[semantics] every question is a button that opens its answer", async () => {
    const user = userEvent.setup();
    render(<Faq title="Questions" items={items} />);

    const trigger = screen.getByRole("button", { name: "Is it free?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("region", { name: "Is it free?" })).toHaveTextContent(
      "Every component and every block.",
    );
  });

  it("[multiple] can let several answers stay open", async () => {
    const user = userEvent.setup();
    render(<Faq title="Questions" items={items} multiple />);

    await user.click(screen.getByRole("button", { name: "Is it free?" }));
    await user.click(screen.getByRole("button", { name: "Can I sell it?" }));

    expect(screen.getByRole("button", { name: "Is it free?" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
