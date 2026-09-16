import { expect, test } from "@playwright/test";

/**
 * Behaviour that needs real layout or real pointer events, and so cannot be
 * proved in jsdom: roving focus in composite widgets, menus opened with a
 * mouse, and scrollbars that only exist once there is something to scroll.
 */

test("tabs: arrow keys move the focus and Enter shows the panel", async ({ page }) => {
  await page.goto("/docs/components/tabs", { waitUntil: "networkidle" });

  const list = page.getByRole("tablist").first();
  await list.getByRole("tab").first().focus();
  await expect(list.getByRole("tab", { name: "Overview" })).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(list.getByRole("tab", { name: "Specification" })).toBeFocused();
  // Manual activation: moving the focus does not switch the panel on its own.
  await expect(page.getByRole("tabpanel").first()).toContainText("cured for 28 days");

  await page.keyboard.press("Enter");
  await expect(page.getByRole("tabpanel").first()).toContainText("C30/37");

  await page.keyboard.press("End");
  await expect(list.getByRole("tab", { name: "Delivery" })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(list.getByRole("tab", { name: "Overview" })).toBeFocused();
});

test("tabs: the indicator follows the selected tab", async ({ page }) => {
  await page.goto("/docs/components/tabs", { waitUntil: "networkidle" });

  const list = page.getByRole("tablist").first();
  const indicator = list.locator("span").first();
  const before = await indicator.boundingBox();

  await list.getByRole("tab", { name: "Delivery" }).click();
  await expect(list.getByRole("tab", { name: "Delivery" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect.poll(async () => (await indicator.boundingBox())?.x).not.toBe(before?.x);
});

test("accordion: Tab reaches every trigger, and Enter opens the section", async ({ page }) => {
  await page.goto("/docs/components/accordion", { waitUntil: "networkidle" });

  // The ARIA authoring practices dropped roving focus for accordions, so the
  // triggers are ordinary tab stops rather than an arrow-key composite.
  await page.getByRole("button", { name: "When does it arrive?" }).focus();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Can I send it back?" })).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Who do I ask?" })).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.getByRole("region", { name: "Who do I ask?" })).toBeVisible();

  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Can I send it back?" })).toBeFocused();
});

test("accordion: an open panel grows to fit its content", async ({ page }) => {
  await page.goto("/docs/components/accordion", { waitUntil: "networkidle" });

  const trigger = page.getByRole("button", { name: "When does it arrive?" }).first();
  await trigger.click();
  const panel = page.getByRole("region", { name: "When does it arrive?" });
  await expect(panel).toBeVisible();
  const box = await panel.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThan(20);
});

test("menubar: opens with the mouse and walks along the bar", async ({ page }) => {
  await page.goto("/docs/components/menubar", { waitUntil: "networkidle" });

  const bar = page.getByRole("menubar").first();
  await bar.getByRole("menuitem", { name: "File" }).click();
  await expect(page.getByRole("menuitem", { name: "New" })).toBeVisible();

  // With one menu open, moving along the bar opens the next straight away.
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("menuitem", { name: "Undo" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(page.getByRole("menuitem", { name: "Undo" })).toBeHidden();
  await expect(bar.getByRole("menuitem", { name: "Edit" })).toBeFocused();
});

test("scroll area: the region scrolls with the keyboard alone", async ({ page }) => {
  await page.goto("/docs/components/scroll-area", { waitUntil: "networkidle" });

  const region = page.getByRole("group", { name: "Specification" }).first();
  await region.focus();
  await expect(region).toBeFocused();

  const before = await region.evaluate((el) => el.scrollTop);
  await page.keyboard.press("PageDown");
  await expect.poll(async () => region.evaluate((el) => el.scrollTop)).toBeGreaterThan(before);

  // The scrollbar exists only because there is something to scroll.
  const scrollbar = region.locator("xpath=..").locator("[data-orientation='vertical']").first();
  await expect(scrollbar).toBeVisible();
});

test("pagination: the row of pages keeps its width as you move through it", async ({ page }) => {
  await page.goto("/docs/components/pagination", { waitUntil: "networkidle" });

  const nav = page.getByRole("navigation", { name: "Pagination" }).first();
  const list = nav.getByRole("list").first();
  const width = (await list.boundingBox())?.width ?? 0;
  expect(width).toBeGreaterThan(0);

  await nav.getByRole("button", { name: "Next page" }).click();
  await expect(nav.getByRole("button", { name: "Page 5" })).toHaveAttribute("aria-current", "page");
  expect((await list.boundingBox())?.width).toBeCloseTo(width, 0);
});

test("back to top: appears after scrolling and moves focus with the page", async ({ page }) => {
  await page.goto("/docs/components/back-to-top", { waitUntil: "networkidle" });

  // Hidden and out of the tab order until the page has scrolled, so it is not
  // in the accessibility tree at all to begin with.
  const button = page.locator("button[data-demo='scroll']");
  await expect(button).toBeHidden();
  await expect(button).toHaveAttribute("tabindex", "-1");

  await page.mouse.wheel(0, 2000);
  await expect(button).toBeVisible();
  await expect(button).not.toHaveAttribute("tabindex", "-1");

  await button.click();
  await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeLessThan(50);
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeFocused();
});
