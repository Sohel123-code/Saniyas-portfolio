import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/about", "/clinical", "/focus", "/gallery", "/contact"];

test("all pages load, stay inside the viewport, and have working images", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 650) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
    });
    await expect
      .poll(() =>
        page.evaluate(() =>
          [...document.images].every(
            (img) => img.complete && img.naturalWidth > 0,
          ),
        ),
      )
      .toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      `Horizontal overflow at ${route}`,
    ).toBe(true);
    await expect(page).toHaveTitle(/Mohamed Saniya Afreen/);
  }
  expect(errors).toEqual([]);
});

test("page navigation works and mobile menu closes after selection", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open navigation menu" }).click();
    await expect(
      page.getByRole("dialog", { name: "Navigation menu" }),
    ).toBeVisible();
    await page
      .getByRole("navigation", { name: "Mobile navigation" })
      .getByRole("link", { name: "About", exact: false })
      .click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "About", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "A little about Saniya.",
  );
  await expect(page.locator(".chapter-transition")).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "A curious mind.",
  );
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test("clinical cards support search, filtering, expansion, and empty-state reset", async ({
  page,
}) => {
  await page.goto("/clinical");
  await expect(page.locator(".clinical-card")).toHaveCount(16);
  await page.getByRole("button", { name: "Prevention", exact: true }).click();
  await expect(page.locator(".clinical-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Explore this area" }).first().click();
  await expect(page.locator(".card-detail:visible").first()).toContainText(
    "preventive oral care",
  );
  await page.getByRole("button", { name: "A little less" }).click();
  await expect(page.locator(".card-detail:visible")).toHaveCount(0);
  await page.getByRole("searchbox").fill("zzzzzzzz");
  await expect(
    page.getByRole("heading", { name: "No areas found" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show all areas" }).click();
  await expect(page.locator(".clinical-card")).toHaveCount(16);
  await page.getByRole("searchbox").fill("Radiographic");
  await expect(page.locator(".clinical-card")).toHaveCount(1);
  await expect(page.locator(".clinical-card")).toContainText(
    "Dental Radiographic Interpretation",
  );
});

test("skill tabs expose content and support arrow keys", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("tab", { name: "Academic" }).click();
  await expect(page.getByRole("tabpanel")).toContainText("Oral pathology");
  await page.getByRole("tab", { name: "Academic" }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Professional" })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Team collaboration");
});

test("gallery filters, lightbox arrows, escape, and focus restoration work", async ({
  page,
}) => {
  await page.goto("/gallery");
  await page.getByRole("button", { name: "Patient care", exact: true }).click();
  await expect(page.locator(".gallery-card")).toHaveCount(2);
  const opener = page.getByRole("button", {
    name: "View photo: The human side of dentistry",
  });
  await opener.click();
  const viewer = page.getByRole("dialog", {
    name: "Clinical activity photo viewer",
  });
  await expect(viewer).toBeVisible();
  await expect(viewer.getByRole("heading")).toHaveText(
    "The human side of dentistry",
  );
  await viewer.getByRole("button", { name: "Next photo" }).click();
  await expect(viewer.getByRole("heading")).toHaveText(
    "Care is in the details",
  );
  await viewer.press("ArrowRight");
  await expect(viewer.getByRole("heading")).toHaveText(
    "The human side of dentistry",
  );
  await viewer.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("contact requires valid fields and prepares an email draft", async ({
  page,
}) => {
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Let’s start a conversation" })
    .click();
  await expect(page.getByLabel("Your name")).toBeFocused();
  await page.getByLabel("Your name").fill("Portfolio visitor");
  await page
    .getByLabel("Email address", { exact: true })
    .fill("visitor@example.com");
  await page
    .getByLabel("Your message")
    .fill("Hello Saniya, I would like to connect about dental research.");
  await page
    .getByRole("button", { name: "Let’s start a conversation" })
    .click();
  await expect(page.getByRole("status")).toContainText(
    "Your email draft is ready",
  );
  await expect(
    page.locator('.contact-method a[href="tel:+917680042627"]'),
  ).toBeVisible();
});

test("core pages pass automated accessibility checks", async ({ page }) => {
  // Audit the finished design, rather than sampling the middle of a slow fade.
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 550) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 30));
      }
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        description: v.description,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
      route,
    ).toEqual([]);
  }
});

test("small phones have no horizontal overflow and reduced motion is respected", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= 320),
      route,
    ).toBe(true);
  }
  await page.goto("/");
  expect(
    await page
      .locator(".hero-flower")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});
