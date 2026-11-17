import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const ids = [
  "vehicle-velocity",
  "smart-classroom",
  "fpga-fan",
  "plc-sorting",
  "heart-monitor",
  "traffic-light",
  "flood-control",
  "trolley-cad",
  "atm-interface",
  "spring-study",
  "battery-study",
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
async function slider(name, key) {
  await page.getByRole("slider", { name }).press(key);
}
try {
  await open("demos");
  assert.equal(await page.locator(".demo-index-card").count(), 16);
  await page.getByRole("link", { name: /Robotic recycling cell/ }).click();
  await page.waitForFunction(
    () =>
      Math.abs(
        document.querySelector("#interactive-demo").getBoundingClientRect().top,
      ) < 150,
  );
  await page.getByRole("button", { name: "Next robot step" }).click();
  await page.getByText("Detect object", { exact: true }).waitFor();
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Next robot step" }).click();
  assert.match(
    await page.locator(".bench-totals").textContent(),
    /Metal sorted\s*1/,
  );
  await page.getByRole("button", { name: "Reset simulation" }).click();
  assert.match(
    await page.locator(".bench-totals").textContent(),
    /Metal sorted\s*0/,
  );
  await open("projects/planting-trajectory");
  await slider(/Path lift/, "Home");
  await page
    .getByText("Curve intersects the illustrated obstacle.", { exact: true })
    .waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page
    .getByText("Curve clears the illustrated obstacle.", { exact: true })
    .waitFor();
  await open("projects/trolley-cad");
  await slider(/Explode assembly/, "End");
  await page.getByRole("checkbox", { name: "Basket" }).uncheck();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  assert.ok(await page.getByRole("checkbox", { name: "Basket" }).isChecked());
  await open("projects/atm-interface");
  await page.getByRole("spinbutton").fill("200");
  await page.getByRole("button", { name: "Withdraw credits" }).click();
  await page.getByText("Insufficient demo credits.", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Deposit credits" }).click();
  await page.getByText("300.00", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByText("100.00", { exact: true }).waitFor();
  await open("projects/spring-study");
  await slider(/Applied force/, "Home");
  await page.getByText("0 mm", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByText("100 mm", { exact: true }).waitFor();
  await open("projects/battery-study");
  await slider(/Number of ideal cells/, "End");
  await page.getByText("30.0 mA", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByText("10.0 mA", { exact: true }).waitFor();
  await open("projects/sentiment-analysis");
  await page
    .getByRole("textbox", { name: /fictional sentence/ })
    .fill("broken poor");
  await page.getByText("Negative cue", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByText("No clear direction", { exact: true }).waitFor();
  await open("projects/vehicle-velocity");
  await slider(/Virtual distance/, "End");
  await page.getByText("180.0 km/h", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Reset simulation" }).click();
  await page.getByText("36.0 km/h", { exact: true }).waitFor();
  console.log(
    "PASS demo catalog/deep jump and eight new demos, input validation, state changes, and resets",
  );
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 960 });
    for (const route of ["demos", ...ids.map((id) => `projects/${id}`)]) {
      await open(route);
      if (route !== "demos")
        assert.ok(
          await page
            .locator(
              "#interactive-demo input,#interactive-demo button,#interactive-demo iframe,#interactive-demo textarea",
            )
            .count(),
          `Missing interaction: ${route}`,
        );
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      assert.ok(
        metrics.scroll <= metrics.width + 1,
        `${route} overflows at ${width}px`,
      );
    }
    console.log(`PASS all 16 interactive pages and Demos index at ${width}px`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await open("demos");
  await page.getByRole("button", { name: "Menu +" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Home", exact: true })
    .click();
  await page.getByRole("link", { name: /Try the demos/ }).click();
  await page.getByRole("heading", { name: /Don’t just read it/ }).waitFor();
  await mkdir(new URL("../.tools/qa/", import.meta.url), { recursive: true });
  await page.locator("h1").click();
  await page.screenshot({
    path: fileURLToPath(
      new URL("../.tools/qa/demos-mobile.png", import.meta.url),
    ),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  console.log("PASS mobile navigation and no browser runtime errors");
} finally {
  await browser.close();
}
