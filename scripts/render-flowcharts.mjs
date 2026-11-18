import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { stripTypeScriptTypes } from "node:module";
import { chromium } from "@playwright/test";

const root = new URL("../", import.meta.url);
const source = stripTypeScriptTypes(
  await readFile(new URL("src/data/flowcharts.ts", root), "utf8"),
  { mode: "strip" },
);
const { flows } = await import(
  "data:text/javascript;base64," + Buffer.from(source).toString("base64")
);
const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage();
  await page.setContent("<!doctype html><html><body></body></html>");
  await page.addScriptTag({
    path: fileURLToPath(
      new URL("node_modules/mermaid/dist/mermaid.min.js", root),
    ),
  });
  await page.evaluate(() =>
    globalThis.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "neutral",
      layout: "dagre",
      fontFamily: "Segoe UI, sans-serif",
      flowchart: { htmlLabels: false, useMaxWidth: true },
    }),
  );
  const directory = new URL("public/assets/flows/", root);
  await mkdir(directory, { recursive: true });
  for (const [id, labels] of Object.entries(flows)) {
    const definition = `flowchart TD\n${labels.map((label, i) => `n${i}["${label}"]`).join("\n")}\n${labels
      .slice(1)
      .map((_, i) => `n${i} --> n${i + 1}`)
      .join("\n")}`;
    const svg = await page.evaluate(
      async ({ id, definition }) =>
        (await globalThis.mermaid.render("flow-" + id, definition)).svg,
      { id, definition },
    );
    await writeFile(new URL(id + ".svg", directory), svg + "\n");
  }
  console.log(
    `Rendered ${Object.keys(flows).length} Mermaid project flowcharts.`,
  );
} finally {
  await browser.close();
}
