import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:5173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir(new URL("../.tools/qa/", import.meta.url), { recursive: true });
async function open(route = "") {
  await page.goto(`${base}#/${route}`);
  await page.locator("main > *").first().waitFor();
  // Wait for the embedded document's initial resize before clicking its controls.
  await page.waitForFunction(() => {
    const frame = document.querySelector("iframe");
    return !frame || frame.style.height !== "800px";
  });
}
async function noOverflow(label) {
  const sizes = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  assert.ok(
    sizes.scroll <= sizes.width + 1,
    `${label}: horizontal overflow ${sizes.scroll} > ${sizes.width}`,
  );
}
try {
  await open();
  await page.getByRole("heading", { name: /Ideas are good/ }).waitFor();
  await page.screenshot({
    path: fileURLToPath(
      new URL("../.tools/qa/home-desktop.png", import.meta.url),
    ),
    fullPage: true,
  });
  await page.getByRole("link", { name: "Explore the projects" }).click();
  await page.getByRole("button", { name: "Automation", exact: true }).click();
  assert.equal(await page.locator(".project-card").count(), 1);
  await page.getByRole("button", { name: "All projects", exact: true }).click();
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("zzzz-no-match");
  await page.getByRole("heading", { name: "No matching projects." }).waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  assert.equal(await page.locator(".project-card").count(), 4);
  await open("projects/smart-classroom");
  await page.getByRole("slider", { name: /Temperature/ }).press("End");
  await page.getByText("Running", { exact: true }).waitFor();
  await page.getByRole("slider", { name: /Occupancy/ }).press("Home");
  await page.getByText("Standby", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  assert.equal(
    await page.getByRole("slider", { name: /Temperature/ }).inputValue(),
    "25",
  );
  await page.getByRole("button", { name: "Engineering Mode" }).click();
  await page
    .getByRole("heading", { name: "Illustrative control rules" })
    .waitFor();
  await page.getByRole("button", { name: /Start guided tour/ }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("heading", { name: "Change an input" }).waitFor();
  await page.getByRole("button", { name: /Exit tour/ }).click();
  await open("projects/fpga-fan");
  const fan = page.frameLocator("iframe");
  await fan.getByRole("button", { name: "25%", exact: true }).click();
  assert.equal(await fan.locator("#duty-value").textContent(), "25%");
  assert.ok(
    (await fan.locator("#wave").getAttribute("d")).startsWith(
      "M20 20H67.5V80H210",
    ),
  );
  await fan.getByRole("slider").press("Home");
  assert.equal(await fan.locator("#wave").getAttribute("d"), "M20 80H780");
  await fan.getByRole("button", { name: "Reset simulation" }).click();
  assert.equal(await fan.locator("#duty-value").textContent(), "50%");
  await open("projects/plc-sorting");
  const plc = page.frameLocator("iframe");
  await plc.getByRole("combobox").selectOption("plastic");
  for (let i = 0; i < 3; i++)
    await plc.getByRole("button", { name: /Next step/ }).click();
  assert.equal(await plc.locator("#count-plastic").textContent(), "1");
  assert.match(
    await plc.getByRole("status").textContent(),
    /delivered to the plastic/,
  );
  await plc.getByRole("button", { name: "Reset simulation" }).click();
  assert.equal(await plc.locator("#count-plastic").textContent(), "0");
  await plc.getByRole("button", { name: "Run sequence" }).click();
  await plc
    .getByRole("status")
    .filter({ hasText: "Object delivered" })
    .waitFor();
  assert.equal(await plc.locator("#count-metal").textContent(), "1");
  await open("projects/vehicle-velocity");
  await page
    .getByRole("heading", { name: "Approved footage goes here." })
    .waitFor();
  assert.equal(await page.locator("video").count(), 0);
  await open("contact");
  assert.equal(
    await page.locator(".contact-address").getAttribute("href"),
    "mailto:v.vinayx@outlook.com",
  );
  await open("about");
  await page.getByRole("heading", { name: /Vinay Vyraveraja/ }).waitFor();
  await page.reload();
  await page.getByRole("heading", { name: /Vinay Vyraveraja/ }).waitFor();
  console.log(
    "PASS navigation, filters/search, keyboard sliders, resets, guided tour, embedded fan, PLC stepping/auto-run, FYP placeholder, profile, route refresh",
  );
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    for (const route of [
      "",
      "projects",
      "projects/smart-classroom",
      "projects/fpga-fan",
      "projects/plc-sorting",
      "projects/vehicle-velocity",
      "about",
      "contact",
    ]) {
      await open(route);
      await noOverflow(`${width}px /${route}`);
      if (await page.locator("iframe").count()) {
        const frame = page.frames()[1];
        await frame.locator("main").waitFor();
        const inner = await frame.evaluate(() => ({
          width: innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          height: innerHeight,
          scrollHeight: document.documentElement.scrollHeight,
        }));
        assert.ok(
          inner.scrollWidth <= inner.width + 1,
          `${width}px /${route}: iframe horizontal overflow`,
        );
        assert.ok(
          inner.scrollHeight <= inner.height + 1,
          `${width}px /${route}: iframe too short ${inner.scrollHeight} > ${inner.height}`,
        );
      }
    }
    console.log(`PASS responsive layout at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await open();
  await page.screenshot({
    path: fileURLToPath(
      new URL("../.tools/qa/home-mobile.png", import.meta.url),
    ),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Menu +" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("button", { name: "Menu +" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await open("projects/fpga-fan");
  await fan.locator("#fan-blades").waitFor();
  assert.equal(
    await fan
      .locator("#fan-blades")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  await open("projects/smart-classroom");
  await page.getByRole("slider", { name: /Temperature/ }).press("End");
  assert.equal(
    await page
      .locator(".room-fan")
      .evaluate((element) => getComputedStyle(element).animationName),
    "none",
  );
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(
    "PASS mobile menu, reduced motion, and no browser runtime errors",
  );
} finally {
  await context.close();
  await browser.close();
}
