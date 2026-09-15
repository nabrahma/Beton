import axe, { type AxeResults, type RunOptions } from "axe-core";
import { expect } from "vitest";

const options: RunOptions = {
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"],
  },
  rules: {
    // jsdom has no layout or computed colours; contrast is asserted on tokens
    // by scripts/check-contrast.mjs and in the browser by Playwright.
    "color-contrast": { enabled: false },
    // Components are tested in isolation, not inside a full page.
    region: { enabled: false },
    "landmark-one-main": { enabled: false },
    "page-has-heading-one": { enabled: false },
  },
};

function format(results: AxeResults): string {
  return results.violations
    .map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help}\n` +
        v.nodes.map((n) => `  ${n.target.join(" ")}\n    ${n.failureSummary}`).join("\n"),
    )
    .join("\n\n");
}

/** Runs axe against a rendered container and fails with a readable report. */
export async function expectNoAxeViolations(container: Element): Promise<void> {
  const results = await axe.run(container, options);
  expect(results.violations, format(results)).toHaveLength(0);
}
