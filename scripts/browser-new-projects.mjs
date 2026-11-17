import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { mkdir } from "node:fs/promises";
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
const external = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  if (
    new URL(request.url()).origin !== new URL(base).origin &&
    !request.url().startsWith("data:")
  )
    external.push(new URL(request.url()).origin);
});
const projects = [
  "robot-recycling",
  "planting-trajectory",
  "weather-expert",
  "sentiment-analysis",
  "neural-classifiers",
];
async function open(route) {
  await page.goto(`${base}#/${route}`);
  await page.locator("h1").waitFor();
}
try {
  await open("projects");
  assert.equal(await page.locator(".project-card").count(), 16);
  await page.getByRole("button", { name: "Robotics", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 2);
  await page
    .getByRole("button", { name: "Intelligent Systems", exact: true })
    .click();
  assert.equal(await page.locator(".project-card").count(), 3);
  await open("projects/weather-expert");
  await page.getByRole("slider", { name: /Rule A support/ }).press("End");
  assert.equal(
    await page
      .getByRole("status", { name: "Combined certainty factor" })
      .textContent(),
    "1.00",
  );
  await page.getByRole("button", { name: "Reset simulation" }).click();
  assert.equal(
    await page
      .getByRole("status", { name: "Combined certainty factor" })
      .textContent(),
    "0.70",
  );
  await page.getByRole("button", { name: "Engineering Mode" }).click();
  await page
    .getByRole("heading", { name: "Positive supporting evidence" })
    .waitFor();
  await open("projects/neural-classifiers");
  await page.getByRole("button", { name: /Input A/ }).click();
  await page.getByRole("button", { name: /Input B/ }).click();
  assert.equal(
    await page.getByRole("status", { name: "AND output" }).textContent(),
    "1",
  );
  await page.getByRole("button", { name: "Reset simulation" }).click();
  assert.equal(
    await page.getByRole("status", { name: "AND output" }).textContent(),
    "0",
  );
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    for (const id of projects) {
      await open(`projects/${id}`);
      const images = page.locator("main img");
      await images.evaluateAll(async (elements) => {
        elements.forEach((image) => (image.loading = "eager"));
        await Promise.all(elements.map((image) => image.decode()));
      });
      const sizes = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert.ok(
        sizes.scroll <= sizes.width + 1,
        `${id} at ${width}px overflows`,
      );
      const code = await page.locator(".algorithm-block code").textContent();
      assert.ok(
        code &&
          !/https?:|api[_-]?key|access[_-]?token|password|secret/i.test(code),
        `Unexpected integration/configuration in ${id} example`,
      );
    }
    console.log(
      `PASS five new project pages, figures, algorithm examples, and layout at ${width}px`,
    );
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await open("projects/robot-recycling");
  await page
    .getByRole("button", { name: /Enlarge:.*sensing, planning/ })
    .click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await mkdir(new URL("../.tools/qa/", import.meta.url), { recursive: true });
  await open("projects/weather-expert");
  await page.screenshot({
    path: fileURLToPath(
      new URL("../.tools/qa/weather-review.png", import.meta.url),
    ),
    fullPage: true,
  });
  await open("projects/robot-recycling");
  await page.locator("main img").evaluateAll(async (images) => {
    images.forEach((image) => (image.loading = "eager"));
    await Promise.all(images.map((image) => image.decode()));
  });
  await page.screenshot({
    path: fileURLToPath(
      new URL("../.tools/qa/robotics-review.png", import.meta.url),
    ),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "PASS offline weather/AND controls, resets, gallery/Escape, filters, no runtime errors, and no external data requests",
  );
} finally {
  await context.close();
  await browser.close();
}
