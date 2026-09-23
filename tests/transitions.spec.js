import { test, expect } from "@playwright/test";

test("navigation plays a slow chapter curtain before revealing and focusing the next page", async ({
  page,
}) => {
  await page.goto("/");
  const started = Date.now();
  await page.getByRole("link", { name: "Get to know me", exact: true }).click();
  const transition = page.locator(".chapter-transition");
  await expect(transition).toBeVisible();
  await expect(transition).toHaveAttribute("data-direction", "forward");
  await expect(page.locator(".chapter-title")).toHaveText("Meet Saniya");
  await expect(page.locator(".site-shell")).toHaveAttribute("inert", "");
  await expect(page.locator("main h1")).toContainText("A curious mind.");
  await expect(transition).toHaveAttribute("data-phase", "hold");
  await expect(transition).toHaveAttribute("data-phase", "reveal");
  await expect(page.locator("main h1")).toHaveText("A little about Saniya.");
  await expect(transition).toHaveCount(0);
  expect(Date.now() - started).toBeGreaterThanOrEqual(2500);
  await expect(page.locator("main")).toBeFocused();
  await expect(page.locator(".site-shell")).not.toHaveAttribute("inert");
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
  await page.goBack();
  await expect(transition).toHaveAttribute("data-direction", "backward");
  await expect(transition).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A curious mind.",
  );
});

test("browser back during a transition settles on the latest destination", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("link", { name: "Get to know me", exact: true }).click();
  await expect(page.locator(".chapter-transition")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator(".chapter-transition")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A curious mind.",
  );
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await page.goForward();
  await expect(page.locator(".chapter-transition")).toBeVisible();
  await expect(page.locator(".chapter-transition")).toHaveCount(0);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little about Saniya.",
  );
  expect(errors).toEqual([]);
});

test("reduced motion and same-page links bypass the decorative transition", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("link", { name: "Get to know me", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little about Saniya.",
  );
  await expect(page.locator(".chapter-transition")).toHaveCount(0);
  await expect(page.locator("main")).toBeFocused();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page
    .getByRole("banner")
    .getByRole("link", { name: "Saniya Afreen — Home" })
    .click();
  await expect(page.locator(".chapter-transition")).toHaveCount(0);
  await expect(page.locator(".site-shell")).toHaveAttribute(
    "aria-busy",
    "false",
  );
});
