import { expect, test } from "@playwright/test";
import { componentSlugs } from "../routes.ts";

for (const slug of componentSlugs) {
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
