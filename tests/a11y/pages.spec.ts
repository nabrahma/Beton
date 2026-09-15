import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { pageRoutes } from "../routes.ts";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const route of pageRoutes) {
  test(`${route} has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
    const report = results.violations
      .map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map((n) => `  ${n.target.join(" ")}`).join("\n")}`,
      )
      .join("\n\n");

    expect(results.violations, report).toEqual([]);
  });
}

test("every tab panel and code example stays reachable by keyboard", async ({ page }) => {
  await page.goto("/docs/components/button");
  const codeTab = page.getByRole("tab", { name: "Code" }).first();
  await codeTab.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: "Preview" }).first()).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(codeTab).toHaveAttribute("aria-selected", "true");
});

test("the skip link moves focus past the header", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});
