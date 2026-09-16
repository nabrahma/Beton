import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
const OVERLAY = "[role='dialog'], [role='alertdialog'], [role='menu'], [role='listbox']";

/** Components whose first example opens an overlay from a button. */
const overlays = [
  { slug: "dialog", trigger: "Invite people", role: "button" },
  { slug: "alert-dialog", trigger: "Delete project", role: "button" },
  { slug: "sheet", trigger: "right", role: "button" },
  { slug: "popover", trigger: "Share", role: "button" },
  { slug: "dropdown-menu", trigger: "Actions", role: "button" },
  { slug: "command-palette", trigger: "Open command palette", role: "button" },
  // The select trigger is a combobox, not a button.
  { slug: "select", trigger: "Typeface", role: "combobox" },
] as const;

for (const overlay of overlays) {
  test(`${overlay.slug}: the open overlay has no WCAG 2.2 AA violations`, async ({ page }) => {
    await page.goto(`/docs/components/${overlay.slug}`, { waitUntil: "networkidle" });

    await page.getByRole(overlay.role, { name: overlay.trigger }).first().click();
    const panel = page.locator(OVERLAY).first();
    await expect(panel).toBeVisible();

    // While a modal is open the rest of the page is inert by design, so the
    // overlay itself is what gets analysed.
    const results = await new AxeBuilder({ page }).include(OVERLAY).withTags(WCAG_TAGS).analyze();
    const report = results.violations
      .map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n${v.nodes.map((n) => n.target.join(" ")).join("\n")}`,
      )
      .join("\n\n");
    expect(results.violations, report).toEqual([]);
  });

  test(`${overlay.slug}: Escape closes it and focus returns to the trigger`, async ({ page }) => {
    await page.goto(`/docs/components/${overlay.slug}`, { waitUntil: "networkidle" });

    const trigger = page.getByRole(overlay.role, { name: overlay.trigger }).first();
    await trigger.click();
    const panel = page.locator(OVERLAY).first();
    await expect(panel).toBeVisible();

    // Focus moved into the overlay, or stayed on the combobox trigger that
    // drives it with aria-activedescendant. Either way it is not left adrift.
    const focusHandled = await panel.evaluate((el) => {
      const active = document.activeElement;
      // Inside the overlay, or on the wrapper that contains it (Select puts
      // focus on its positioner and tracks options with aria-activedescendant).
      return Boolean(active && (el.contains(active) || active.contains(el)));
    });
    expect(focusHandled).toBe(true);

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
  });
}

test("dialog: focus stays inside while tabbing", async ({ page }) => {
  await page.goto("/docs/components/dialog", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Invite people" }).first().click();
  const dialog = page.getByRole("dialog").first();
  await expect(dialog).toBeVisible();

  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  }
});

test("toast: a new toast lands in the notification region", async ({ page }) => {
  await page.goto("/docs/components/toast", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Success" }).first().click();

  const region = page.getByRole("region", { name: "Notifications" }).first();
  await expect(region).toContainText("Project saved");

  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();
  expect(
    results.violations,
    results.violations.map((v) => `${v.id}: ${v.help}`).join("\n"),
  ).toEqual([]);
});
