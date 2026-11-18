import { reviewedAssets, isReviewedAsset } from "./reviewed-assets.mjs";
import { readdir, readFile, stat } from "node:fs/promises";
import { contentRisks } from "./public-policy.mjs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const failures = [];
const manifest = JSON.parse(
  await readFile(new URL("../media-manifest.json", import.meta.url), "utf8"),
);
const reviewed = new Map(manifest.assets.map((asset) => [asset.file, asset]));
const seen = new Set();
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await check(file);
    else {
      const relative = path.relative(root, file).split(path.sep).join("/");
      if (reviewedAssets.has(relative)) {
        const data = await readFile(file);
        if (!isReviewedAsset(relative, data))
          failures.push("Unreviewed or modified asset: " + relative);
        else seen.add(relative);
        continue;
      }
      if (!/\.(?:html|css|js|json|svg|txt)$/i.test(entry.name)) {
        failures.push(`Unexpected public file: ${path.relative(root, file)}`);
        continue;
      }
      if ((await stat(file)).size > 2_000_000) {
        failures.push(`Oversized public text asset: ${relative}`);
        continue;
      }
      const content = await readFile(file, "utf8");
      for (const risk of contentRisks(content))
        failures.push(`${risk}: ${relative}`);
      if (
        /[A-Z]:[\\/]|OneDrive|Projects Folder|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/.test(
          content,
        )
      )
        failures.push(`Review required: ${path.relative(root, file)}`);
      if (
        /https?:\/\//.test(content) &&
        /(?:google-analytics|googletagmanager|hotjar|segment\.com)/.test(
          content,
        )
      )
        failures.push(`Tracking reference: ${path.relative(root, file)}`);
    }
  }
}
await check(root);
for (const file of reviewed.keys())
  if (!seen.has(file) && !reviewed.get(file).historical)
    failures.push(`Reviewed asset missing from build: ${file}`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  `Public build check passed: text assets and ${seen.size} checksum-matched reviewed assets; no Windows source paths, checked credential patterns, or known tracking references.`,
);
