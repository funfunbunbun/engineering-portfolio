import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const base = process.env.PORTFOLIO_URL || "http://127.0.0.1:4173/";
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  colorScheme: "light",
});
const page = await context.newPage();
const errors = [];
const external = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("request", (request) => {
  if (
    !request.url().startsWith(new URL(base).origin) &&
    /^https?:/.test(request.url())
  )
    external.push(new URL(request.url()).origin);
});
const screenshots = new URL("../.tools/qa/", import.meta.url);
await mkdir(screenshots, { recursive: true });
async function open(route = "") {
  await page.goto(base + "#/" + route);
  await page.locator("main h1").waitFor();
}
async function overflow(label) {
  assert.ok(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
    label + " has horizontal overflow",
  );
}
try {
  await open();
  assert.equal(
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Demos", exact: true })
      .count(),
    0,
  );
  await page
    .getByRole("heading", { name: /Practical.*engineering.*solutions/ })
    .waitFor();
  const deck = page.getByRole("region", { name: "Featured projects" });
  await deck.getByRole("button", { name: "Next featured project" }).click();
  assert.match(await deck.getByRole("heading").innerText(), /Vehicle detection/);
  assert.equal(await deck.getByRole("link", { name: "View project" }).getAttribute("href"), "#/projects/vehicle-velocity");
  await deck.focus();
  await page.keyboard.press("ArrowLeft");
  assert.match(await deck.getByRole("heading").innerText(), /FPGA fan controller/);
  await deck.getByRole("button", { name: "Show Smart classroom" }).click();
  assert.match(await deck.getByRole("heading").innerText(), /Smart classroom/);
  await deck.getByRole("link", { name: "View project" }).click();
  await page.locator(".room-demo").waitFor();
  assert.equal(await page.getByRole("button", { name: "Engineering Mode", exact: true }).count(), 0);
  await open();
  await open("projects/robot-recycling");
  assert.equal(await page.getByRole("group", { name: "Display mode" }).count(), 0);
  await open();
  await page.setViewportSize({ width: 375, height: 850 });
  await overflow("Home carousel on mobile");
  await deck.dispatchEvent("pointerdown", { pointerType: "touch", clientX: 280, clientY: 200 });
  await deck.dispatchEvent("pointerup", { pointerType: "touch", clientX: 150, clientY: 205 });
  assert.match(await deck.getByRole("heading").innerText(), /Vehicle detection/);
  await deck.dispatchEvent("pointerdown", { pointerType: "touch", clientX: 200, clientY: 100 });
  await deck.dispatchEvent("pointerup", { pointerType: "touch", clientX: 210, clientY: 240 });
  assert.match(await deck.getByRole("heading").innerText(), /Vehicle detection/);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await deck.getByRole("button", { name: "Show FPGA fan controller" }).click();
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("data-theme"), "dark");
  await page.screenshot({
    path: fileURLToPath(new URL("home-dark.png", screenshots)),
    fullPage: true,
  });
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  await page.screenshot({
    path: fileURLToPath(new URL("home-light.png", screenshots)),
    fullPage: true,
  });
  await open("projects");
  const cards = page.locator(".project-card");
  assert.equal(await cards.count(), 16);
  assert.equal(await cards.locator(".project-visual").count(), 16);
  const links = await cards.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("href").replace(/^#\//, "")),
  );
  assert.ok(links.includes("projects/nano-hmi"));
  assert.ok(!links.some((link) => link.includes("planting")));
  assert.equal(
    await page
      .locator(".year-group")
      .filter({ hasText: /Year [1-4]/ })
      .count(),
    0,
  );
  await page
    .getByRole("searchbox", { name: "Search projects" })
    .fill("zzzz-no-match");
  await page.getByText("No matching projects.").waitFor();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await open("projects/heart-monitor");
  await page.getByRole("button", { name: "Place finger", exact: true }).click();
  await page.getByRole("button", { name: "Capture reading" }).click();
  await page.getByText("Reading captured", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Remove finger" }).click();
  await open("projects/nano-hmi");
  await page.getByRole("button", { name: "4", exact: true }).click();
  await page.getByRole("button", { name: "2", exact: true }).click();
  await page.getByRole("button", { name: "Enter", exact: true }).click();
  await page.getByText("Input received", { exact: true }).waitFor();
  await open("projects/plc-sorting");
  // A cold hosted iframe may display its HTML before its module installs controls.
  // The initial resize message is sent after the demo has finished starting.
  await page.waitForFunction(() => {
    const frame = document.querySelector(".demo-frame");
    return frame && frame.style.height !== "800px";
  });
  await page.getByRole("button", { name: "Dark mode", exact: true }).click();
  const plc = page.frameLocator(".demo-frame");
  await plc.locator("#category").selectOption("plastic");
  await plc.locator("#run").click();
  await plc.locator("#run").filter({ hasText: "Pause" }).waitFor();
  assert.equal(await plc.locator("html").getAttribute("data-theme"), "dark");
  await plc.locator("#run").click();
  await open("projects/vehicle-velocity");
  const video = page.locator("video");
  await video.evaluate(async (element) => {
    element.load();
    await new Promise((resolve, reject) => {
      if (element.readyState >= 2) return resolve();
      element.addEventListener("loadeddata", resolve, { once: true });
      element.addEventListener("error", reject, { once: true });
    });
    element.currentTime = 4;
  });
  await page.waitForFunction(() => {
    const video = document.querySelector("video");
    return (
      video &&
      !video.seeking &&
      video.readyState >= 2 &&
      Math.abs(video.currentTime - 4) < 0.2
    );
  });
  assert.ok(
    await video.evaluate(
      (element) => element.videoWidth > 0 && element.duration >= 5,
    ),
  );
  assert.equal(await page.getByText("Try vehicle detection on your device", { exact: true }).count(), 0);
  await page.screenshot({
    path: fileURLToPath(new URL("vehicle-demo.png", screenshots)),
    fullPage: true,
  });
  await open("about");
  await page.getByText("Consecutive Dean’s Lists", { exact: true }).waitFor();
  await page.getByText("EICC and CETS", { exact: true }).waitFor();
  assert.ok(
    (await page
      .locator('a[href="https://www.youtube.com/@vinayvyraveraja"]')
      .count()) > 0,
  );
  await page.screenshot({
    path: fileURLToPath(new URL("about-dark.png", screenshots)),
    fullPage: true,
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "",
      "projects",
      "demos",
      "about",
      "about/experience",
      "about/tutoring",
      "contact",
      ...links,
    ]) {
      await open(route);
      await overflow(width + " " + route);
      if (route.startsWith("projects/")) {
        const showcase = page.getByRole("region", { name: "Project photos and outputs" });
        assert.equal(await showcase.count(), 1);
        assert.ok(await showcase.evaluate((element) => Boolean(element.compareDocumentPosition(document.querySelector("#interactive-demo")) & Node.DOCUMENT_POSITION_FOLLOWING)));
        assert.equal(await page.locator(".project-notes").getAttribute("open"), null);
        assert.equal(await page.getByRole("group", { name: "Display mode" }).count(), 0);
        assert.equal(await page.locator(".showcase-thumbnails span").filter({ hasText: /^Image \d+$/ }).count(), 0);
        for (const selector of [
          ".demo-shell",
          ".vehicle-demo",
          ".room-demo",
          ".sensor-controls",
          ".heart-layout",
          ".heart-controls",
          ".evidence-note",
        ]) {
          for (const panel of await page.locator(selector).all()) {
            assert.equal(
              await panel.evaluate(
                (element) => getComputedStyle(element).backgroundColor,
              ),
              "rgb(25, 41, 52)",
              route + " dark panel: " + selector,
            );
          }
        }
        for (const total of await page.locator(".bench-totals b").all()) {
          assert.equal(
            await total.evaluate((element) => getComputedStyle(element).color),
            "rgb(227, 237, 243)",
            "Robot totals must remain readable in dark mode",
          );
        }
        const flow = page.locator(".project-flowchart img");
        await flow.scrollIntoViewIfNeeded();
        await flow.evaluate((image) => image.decode());
        assert.ok(await flow.evaluate((image) => image.naturalWidth > 0));
      }
    }
  }
  await page.screenshot({
    path: fileURLToPath(new URL("mobile-dark.png", screenshots)),
    fullPage: true,
  });
  assert.deepEqual(errors, []);
  assert.deepEqual(external, []);
  console.log(
    "Browser checks passed: theme persistence, 16 projects and flowcharts, heart/Nano/PLC interactions, playable video, mobile layouts, social links and no external network requests.",
  );
} finally {
  await browser.close();
}
