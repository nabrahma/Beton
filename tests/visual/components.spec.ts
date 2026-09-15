import { expect, test } from "@playwright/test";
import { componentSlugs } from "../routes.ts";

for (const slug of componentSlugs) {
  test(`${slug} playground matches the baseline`, async ({ page }) => {
    await page.goto(`/docs/components/${slug}`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const playground = page.getByRole("region", { name: "Live playground" });
    await expect(playground).toHaveScreenshot(`${slug}.png`);
  });
}

test("landing hero matches the baseline", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("main section").first()).toHaveScreenshot("home-hero.png");
});
