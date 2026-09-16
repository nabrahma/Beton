import { expect, test } from "@playwright/test";
import { componentSlugs } from "../routes.ts";

/**
 * The calendar draws the month it is opened on, so its picture changes every
 * day. Its appearance is covered by the component tests instead.
 */
const NOT_STABLE_OVER_TIME = new Set(["calendar"]);

for (const slug of componentSlugs.filter((name) => !NOT_STABLE_OVER_TIME.has(name))) {
  test(`${slug} preview matches the baseline`, async ({ page }) => {
    await page.goto(`/docs/components/${slug}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    // The live playground when the component has one, otherwise its first example.
    const playground = page.getByRole("region", { name: "Live playground" });
    const target = (await playground.count())
      ? playground
      : page.locator("#examples ~ section [role='tabpanel']").first();

    await expect(target).toHaveScreenshot(`${slug}.png`);
  });
}

test("landing hero matches the baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main section").first()).toHaveScreenshot("home-hero.png");
});
