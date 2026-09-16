import { expect, test } from "@playwright/test";

/**
 * Data display behaviour that needs a real browser: the calendar grid's roving
 * focus, a clipboard that actually exists, and regions that only scroll once
 * there is something to scroll.
 */

test("calendar: arrow keys roam the grid and only one day is a tab stop", async ({ page }) => {
  await page.goto("/docs/components/calendar", { waitUntil: "networkidle" });

  const grid = page.getByRole("grid", { name: "Pour date" });
  await expect(grid).toBeVisible();

  const stops = grid.locator("button[tabindex='0']");
  await expect(stops).toHaveCount(1);

  await stops.first().focus();
  const before = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  await page.keyboard.press("ArrowRight");
  const after = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
  expect(after).not.toBe(before);

  // The focus follows the keyboard, and the grid keeps exactly one tab stop.
  await expect(stops).toHaveCount(1);

  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  await expect(grid.locator("td[aria-selected='true']")).toHaveCount(1);
});

test("calendar: Page Down moves month and keeps the focus on the same day", async ({ page }) => {
  await page.goto("/docs/components/calendar", { waitUntil: "networkidle" });

  const grid = page.getByRole("grid", { name: "Pour date" });
  await grid.locator("button[tabindex='0']").first().focus();
  const day = await page.evaluate(() => document.activeElement?.textContent);

  const heading = page.getByRole("heading", { level: 2 }).filter({ hasText: /\d{4}/ }).first();
  const month = await heading.textContent();

  await page.keyboard.press("PageDown");
  await expect(heading).not.toHaveText(month ?? "");
  expect(await page.evaluate(() => document.activeElement?.textContent)).toBe(day);
});

test("calendar: the month heading is a live region", async ({ page }) => {
  await page.goto("/docs/components/calendar", { waitUntil: "networkidle" });

  const heading = page.getByRole("heading", { level: 2 }).filter({ hasText: /\d{4}/ }).first();
  await expect(heading).toHaveAttribute("aria-live", "polite");

  const before = await heading.textContent();
  await page.getByRole("button", { name: "Next month" }).first().click();
  await expect(heading).not.toHaveText(before ?? "");
});

test("code block: copying puts the code on the clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/docs/components/code-block", { waitUntil: "networkidle" });

  const example = page.getByRole("region", { name: "Live playground" });
  await example.getByRole("button", { name: "Copy" }).first().click();
  await expect(example.getByRole("button", { name: "Copied" })).toBeVisible();

  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("export function Save()");
  // Line numbers are decoration and never reach the clipboard.
  expect(copied).not.toMatch(/^\s*1\s/);
});

test("code block: the code is reachable and scrolls with the keyboard", async ({ page }) => {
  await page.goto("/docs/components/code-block", { waitUntil: "networkidle" });

  const region = page.getByRole("region", { name: "Live playground" }).getByRole("group").first();
  await region.focus();
  await expect(region).toBeFocused();
});

test("table: the table scrolls sideways from the keyboard", async ({ page }) => {
  await page.goto("/docs/components/table", { waitUntil: "networkidle" });

  const scroller = page.getByRole("group", { name: "Recent pours" }).first();
  await scroller.focus();
  await expect(scroller).toBeFocused();
  await expect(scroller).toHaveAttribute("tabindex", "0");
});

test("table: sorting flips the direction it reports", async ({ page }) => {
  await page.goto("/docs/components/table", { waitUntil: "networkidle" });

  // The sortable example, not the playground: its header holds a button.
  const header = page
    .getByRole("columnheader", { name: "Volume" })
    .filter({ has: page.getByRole("button") })
    .first();
  await expect(header).toHaveAttribute("aria-sort", "ascending");

  await header.getByRole("button").click();
  await expect(header).toHaveAttribute("aria-sort", "descending");
});

test("progress: an unknown amount reports no value", async ({ page }) => {
  await page.goto("/docs/components/progress", { waitUntil: "networkidle" });

  const unknown = page.getByRole("progressbar", { name: "Unknown", exact: true });
  await expect(unknown).toHaveAttribute("data-indeterminate", "");
  await expect(unknown).not.toHaveAttribute("aria-valuenow", /.*/);

  const known = page.getByRole("progressbar", { name: "Known", exact: true });
  await expect(known).toHaveAttribute("aria-valuenow", "40");
});

test("list: a linked row and its action are separate targets", async ({ page }) => {
  await page.goto("/docs/components/list", { waitUntil: "networkidle" });

  const row = page.getByRole("link", { name: /Wharf Road/ }).first();
  const action = page.getByRole("button", { name: "Copy" }).first();
  const rowBox = await row.boundingBox();
  const actionBox = await action.boundingBox();

  expect(rowBox).not.toBeNull();
  expect(actionBox).not.toBeNull();
  // The action sits beside the link, not inside it: clicking one is not the other.
  expect(actionBox!.x).toBeGreaterThan(rowBox!.x + rowBox!.width - 1);
});
