import { expect, test } from "@playwright/test";
import { blockSlugs, componentSlugs } from "../routes.ts";

/**
 * The calendar draws the month it is opened on, so its picture changes every
 * day. Its appearance is covered by the component tests instead.
 */
const NOT_STABLE_OVER_TIME = new Set(["calendar"]);

const pages = [
  ...componentSlugs.map((slug) => [slug, `/docs/components/${slug}`] as const),
  ...blockSlugs.map((slug) => [slug, `/docs/blocks/${slug}`] as const),
].filter(([slug]) => !NOT_STABLE_OVER_TIME.has(slug));

for (const [slug, route] of pages) {
  test(`${slug} preview matches the baseline`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // The docs header is sticky and would land on top of a tall preview.
    await page.addStyleTag({ content: "header { visibility: hidden !important; }" });

    // Blocks are drawn in an iframe, so they meet the breakpoints of the frame.
    const preview = page.getByRole("region", { name: "Live preview" });
    if (await preview.count()) {
      const frame = preview.locator("iframe");
      await expect(frame).toBeVisible();
      // The frame grows to fit its content; wait for that to settle.
      await expect
        .poll(async () => {
          const first = (await frame.boundingBox())?.height;
          await page.waitForTimeout(600);
          return (await frame.boundingBox())?.height === first;
        })
        .toBe(true);
      await expect(preview).toHaveScreenshot(`${slug}.png`);
      return;
    }

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
