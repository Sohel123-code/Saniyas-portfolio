import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

await mkdir("test-results/motion", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 1000 }],
  ["phone", { width: 320, height: 740 }],
]) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/");
  await page.getByRole("link", { name: "Get to know me", exact: true }).click();
  await page.locator('.chapter-transition[data-phase="cover"]').waitFor();
  await page.waitForTimeout(450);
  await page.screenshot({ path: `test-results/motion/${name}-sweep.png` });
  await page.locator('.chapter-transition[data-phase="hold"]').waitFor();
  const coverage = await page
    .locator(".chapter-curtain-midnight")
    .evaluate((el) => {
      const rect = el.getBoundingClientRect();
      const overlay = el.parentElement.getBoundingClientRect();
      return {
        covered: rect.left <= 0 && rect.top <= 0 && rect.right >= innerWidth - 1 && rect.bottom >= innerHeight - 1 && overlay.right >= innerWidth - 1,
        layer: rect.toJSON(), overlay: overlay.toJSON(),
        viewport: [innerWidth, innerHeight],
        rootWidth: document.documentElement.clientWidth,
        rootBounds: document.documentElement.getBoundingClientRect().toJSON(),
        gutter: getComputedStyle(document.documentElement).scrollbarGutter,
        bodyOverflow: getComputedStyle(document.body).overflow,
        bodyPadding: getComputedStyle(document.body).paddingRight,
      };
    });
  if (!coverage.covered)
    throw new Error(
      `${name}: the curtain did not fully cover the outgoing page ${JSON.stringify(coverage)}`,
    );
  await page.screenshot({ path: `test-results/motion/${name}-chapter.png` });
  await page.locator('.chapter-transition[data-phase="reveal"]').waitFor();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/motion/${name}-reveal.png` });
  await page.locator(".chapter-transition").waitFor({ state: "detached" });
  await page.screenshot({ path: `test-results/motion/${name}-arrived.png` });
  console.log(
    `${name}: full curtain coverage and completed page reveal verified`,
  );
  await context.close();
}
await browser.close();
