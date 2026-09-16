import { expect, test } from "@playwright/test";

/**
 * The promise this tier makes: everything in it stops for anyone who has asked
 * for less motion, and degrades to a readable, static state.
 *
 * The suite runs with reducedMotion reduce by default, so these tests state
 * both halves explicitly rather than relying on the project setting.
 */

test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("marquee holds still", async ({ page }) => {
    await page.goto("/docs/components/marquee", { waitUntil: "networkidle" });
    const track = page.locator("[class*='animate-marquee']").first();
    // The base layer cuts every animation to a single 0.01ms pass.
    const duration = await track.evaluate((el) => getComputedStyle(el).animationDuration);
    expect(parseFloat(duration)).toBeLessThan(0.1);
  });

  test("the typewriter shows its line at once, with no caret", async ({ page }) => {
    await page.goto("/docs/components/typewriter", { waitUntil: "networkidle" });
    const region = page.getByRole("region", { name: "Live playground" });
    await expect(region).toContainText("Poured in place");
  });

  test("the split flap shows its word without flapping", async ({ page }) => {
    await page.goto("/docs/components/split-flap", { waitUntil: "networkidle" });
    const region = page.getByRole("region", { name: "Live playground" });
    await expect(region).toContainText("POURED");
  });

  test("the counter lands on its number", async ({ page }) => {
    await page.goto("/docs/components/counter", { waitUntil: "networkidle" });
    const region = page.getByRole("region", { name: "Live playground" });
    await expect(region).toContainText("1,284");
  });

  test("the cursor trail draws nothing at all", async ({ page }) => {
    await page.goto("/docs/components/cursor-trail", { waitUntil: "networkidle" });
    const panel = page.getByText("Move the pointer across this panel.");
    const box = await panel.boundingBox();
    await page.mouse.move((box?.x ?? 0) + 10, (box?.y ?? 0) + 10);
    await page.mouse.move((box?.x ?? 0) + 60, (box?.y ?? 0) + 30);
    await expect(page.locator("[class*='fixed'][aria-hidden='true']")).toHaveCount(0);
  });

  test("confetti throws nothing", async ({ page }) => {
    await page.goto("/docs/components/confetti", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Sign the contract" }).click();
    // The message still appears: the words carry the news, not the paper.
    // (The source listing on the page repeats the string, so scope to the alert.)
    await expect(
      page.getByRole("status").filter({ hasText: "The contract is filed." }),
    ).toBeVisible();
    await expect(page.locator("[class*='fixed'][aria-hidden='true'] span")).toHaveCount(0);
  });

  test("the glitch copies disappear", async ({ page }) => {
    await page.goto("/docs/components/glitch-text", { waitUntil: "networkidle" });
    const layers = page.locator("[class*='animate-glitch']");
    const count = await layers.count();
    for (let i = 0; i < count; i += 1) await expect(layers.nth(i)).toBeHidden();
  });
});

test.describe("with motion allowed", () => {
  test.use({ reducedMotion: "no-preference" });

  test("the marquee runs", async ({ page }) => {
    await page.goto("/docs/components/marquee", { waitUntil: "networkidle" });
    const track = page.locator("[class*='animate-marquee']").first();
    const name = await track.evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toContain("marquee");
    const duration = await track.evaluate((el) => getComputedStyle(el).animationDuration);
    expect(parseFloat(duration)).toBeGreaterThan(1);
  });

  test("the marquee stops when you point at it", async ({ page }) => {
    await page.goto("/docs/components/marquee", { waitUntil: "networkidle" });
    const track = page.locator("[class*='animate-marquee']").first();
    // Hovering the track itself is impossible: it is moving. Point at the
    // strip around it, which is what carries the hover in any case.
    const strip = page.locator("[data-direction]").first();
    const box = await strip.boundingBox();
    await page.mouse.move(
      (box?.x ?? 0) + (box?.width ?? 0) / 2,
      (box?.y ?? 0) + (box?.height ?? 0) / 2,
    );
    await expect
      .poll(async () => track.evaluate((el) => getComputedStyle(el).animationPlayState))
      .toBe("paused");
  });

  test("the typewriter types, rather than appearing all at once", async ({ page }) => {
    await page.goto("/docs/components/typewriter", { waitUntil: "networkidle" });
    const typed = page
      .getByRole("region", { name: "Live playground" })
      .locator("[aria-hidden='true']")
      .first();
    const first = await typed.textContent();
    await expect.poll(async () => typed.textContent()).not.toBe(first);
  });

  test("the cursor trail follows the pointer", async ({ page }) => {
    await page.goto("/docs/components/cursor-trail", { waitUntil: "networkidle" });
    const panel = page.getByText("Move the pointer across this panel.");
    const box = await panel.boundingBox();
    for (let i = 0; i < 6; i += 1) {
      await page.mouse.move((box?.x ?? 0) + i * 12, (box?.y ?? 0) + i * 4);
    }
    await expect
      .poll(async () => page.locator("[aria-hidden='true'] > span").count())
      .toBeGreaterThan(0);
  });

  test("confetti is thrown and then clears itself up", async ({ page }) => {
    await page.goto("/docs/components/confetti", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Sign the contract" }).click();
    const pieces = page.locator("[aria-hidden='true'] > span");
    await expect.poll(async () => pieces.count()).toBeGreaterThan(0);
    await expect.poll(async () => pieces.count(), { timeout: 5000 }).toBe(0);
  });
});
