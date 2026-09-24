import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
});

test("chat supports suggestions, follow-ups, navigation, keyboard closing, and reset", async ({
  page,
}) => {
  const requests = [];
  await page.route("**/api/chat", async (route) => {
    requests.push(route.request().postDataJSON());
    await route.fulfill({
      json: {
        answer:
          requests.length === 1
            ? "Saniya is a BDS student at GITAM, Visakhapatnam."
            : "Her email is mdsaniyaafreen@gmail.com.",
      },
    });
  });
  const launcher = page.getByRole("button", { name: "Ask about Saniya" });
  await launcher.click();
  const chat = page.getByRole("dialog", { name: "A little about Saniya" });
  await expect(chat).toBeVisible();
  await chat.getByRole("button", { name: "Meet Saniya", exact: true }).click();
  await expect(chat.getByRole("log")).toContainText("BDS student at GITAM");
  await chat.getByRole("textbox").fill("How can I contact her?");
  await chat.getByRole("textbox").press("Enter");
  await expect(chat.getByRole("log")).toContainText("mdsaniyaafreen@gmail.com");
  expect(requests[1].messages.map((message) => message.role)).toEqual([
    "user",
    "assistant",
    "user",
  ]);
  await page.keyboard.press("Escape");
  await expect(chat).not.toBeVisible();
  await expect(launcher).toBeFocused();
  await launcher.click();
  await expect(chat.getByRole("log")).toContainText("mdsaniyaafreen@gmail.com");
  await chat
    .getByRole("link", { name: /Prefer a personal conversation/ })
    .click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(chat).not.toBeVisible();
  await launcher.click();
  await expect(chat.getByRole("log")).toContainText("BDS student at GITAM");
  await chat.getByRole("button", { name: "Start a new chat" }).click();
  await expect(chat.getByRole("log")).toBeEmpty();
  await expect(
    chat.getByRole("button", { name: "Meet Saniya", exact: true }),
  ).toBeVisible();
});

test("chat displays a pending state and allows retry without duplicating failed messages", async ({
  page,
}) => {
  let attempts = 0;
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  await page.route("**/api/chat", async (route) => {
    attempts++;
    if (attempts === 1) {
      await gate;
      await route.fulfill({
        status: 503,
        json: { error: "The assistant is temporarily unavailable." },
      });
    } else {
      await route.fulfill({
        json: { answer: "The first photo shows Saniya caring for her mother." },
      });
    }
  });
  await page.getByRole("button", { name: "Ask about Saniya" }).click();
  await page.getByRole("button", { name: "A special gallery moment" }).click();
  await expect(page.locator(".chat-thinking")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send message" }),
  ).toBeDisabled();
  release();
  await expect(page.getByRole("alert")).toContainText(
    "temporarily unavailable",
  );
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.getByRole("log")).toContainText("caring for her mother");
  await expect(page.locator(".chat-message-user")).toHaveCount(1);
  await expect(page.getByRole("alert")).toHaveCount(0);
});

test("chat stays accessible and usable on a 320px screen and short viewport", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Ask about Saniya" }).click();
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  for (const viewport of [
    { width: 320, height: 740 },
    { width: 390, height: 400 },
  ]) {
    await page.setViewportSize(viewport);
    const chat = page.getByRole("dialog", { name: "A little about Saniya" });
    // VisualViewport events and dynamic viewport units settle on the next frame.
    await expect
      .poll(async () => {
        const bounds = await chat.boundingBox();
        return (
          bounds.x >= 0 &&
          bounds.y >= 0 &&
          bounds.x + bounds.width <= viewport.width &&
          bounds.y + bounds.height <= viewport.height
        );
      })
      .toBe(true);
    await expect(chat.getByRole("textbox")).toBeVisible();
    await expect(
      chat.getByRole("button", { name: "Close chat" }),
    ).toBeVisible();
    expect(
      await chat.evaluate(
        (element) => element.scrollWidth <= element.clientWidth,
      ),
    ).toBe(true);
  }
});
