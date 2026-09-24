import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseURL = process.env.PLAYWRIGHT_BASE_URL || "http://127.0.0.1:5173";
await mkdir("test-results/chat", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  await page.goto(baseURL);
  await page.getByRole("button", { name: "Ask about Saniya" }).click();
  await page.screenshot({ path: "test-results/chat/desktop-welcome.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "test-results/chat/mobile-welcome.png" });
  if (!process.argv.includes("--welcome-only")) {
    await page.getByRole("button", { name: "Why oral oncology?" }).click();
    await page.locator(".chat-message-assistant").waitFor({ timeout: 30_000 });
    console.log(
      "Live browser answer:",
      await page.locator(".chat-message-assistant p").innerText(),
    );
    await page.screenshot({
      path: "test-results/chat/mobile-conversation.png",
    });
    await page.setViewportSize({ width: 320, height: 740 });
    await page.screenshot({
      path: "test-results/chat/narrow-conversation.png",
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({
      path: "test-results/chat/desktop-conversation.png",
    });
  }
  console.log("Chat screenshots saved to test-results/chat.");
} finally {
  await browser.close();
}
