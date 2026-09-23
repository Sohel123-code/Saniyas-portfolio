import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("test-results/visual", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const report = [];
for (const [name, viewport] of [
  ["desktop", { width: 1440, height: 1000 }],
  ["mobile", { width: 390, height: 844 }],
]) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  for (const route of [
    "/",
    "/about",
    "/clinical",
    "/focus",
    "/gallery",
    "/contact",
  ]) {
    await page.goto(`http://127.0.0.1:5173${route}`);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
      window.scrollTo(0, 0);
    });
    await page.screenshot({
      path: `test-results/visual/${name}-${route === "/" ? "home" : route.slice(1)}.png`,
      fullPage: true,
    });
    if (route === "/")
      await page.screenshot({ path: `test-results/visual/${name}-hero.png` });
    if (name === "desktop" || name === "mobile") {
      const { violations } = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      report.push({
        viewport: name,
        route,
        violations: violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      });
    }
  }
  await context.close();
}
await writeFile(
  "test-results/visual/accessibility.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
await browser.close();
