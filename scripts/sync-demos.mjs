import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
// Deliberate source allowlist; originals and Git history stay private.
const slugs = ["fpga-pwm-fan-controller", "plc-hmi-sorting-machine"];
const files = ["index.html", "style.css", "demo.js", "model.js"];
for (const slug of slugs) {
  const destination = path.join(root, "public/demos", slug);
  await mkdir(destination, { recursive: true });
  for (const file of files) {
    const source = path.join(root, "projects", slug, file);
    // Fail before copying if a future local edit introduces a source path or secret marker.
    const text = await readFile(source, "utf8");
    if (
      /[A-Z]:[\\/]|(?:api[_-]?key|password|private[_-]?key)\s*[:=]/i.test(text)
    )
      throw new Error(`Review required: ${slug}/${file}`);
    await cp(source, path.join(destination, file));
  }
}
await writeFile(
  path.join(root, "public/demos/README.txt"),
  "Original educational browser demos by Vinay. No academic source documents or media are included.\n",
);
console.log("Synced 8 explicitly allowlisted demo source files.");
