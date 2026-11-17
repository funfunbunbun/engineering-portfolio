import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import { contentRisks, prohibitedFile } from "./public-policy.mjs";
const root = fileURLToPath(new URL("../", import.meta.url)).replace(
  /[\\/]$/,
  "",
);
const git = (args, extra = {}) =>
  execFileSync("git", ["-c", `safe.directory=${root}`, "-C", root, ...args], {
    maxBuffer: 64 * 1024 * 1024,
    ...extra,
  });
const rows = git(["rev-list", "--objects", "--all"], { encoding: "utf8" })
  .trim()
  .split("\n")
  .filter(Boolean)
  .map((line) => {
    const index = line.indexOf(" ");
    return {
      sha: index < 0 ? line : line.slice(0, index),
      file: index < 0 ? "" : line.slice(index + 1),
    };
  });
const types = git(["cat-file", "--batch-check=%(objectname) %(objecttype)"], {
  input: rows.map((row) => row.sha).join("\n") + "\n",
  encoding: "utf8",
})
  .trim()
  .split("\n");
const blobs = rows.filter((_, i) => types[i]?.endsWith(" blob"));
const bytes = git(["cat-file", "--batch"], {
  input: blobs.map((row) => row.sha).join("\n") + "\n",
});
let offset = 0;
const failures = [];
const manifest = JSON.parse(
  await readFile(new URL("../media-manifest.json", import.meta.url), "utf8"),
);
const hashes = new Set(manifest.assets.map((asset) => asset.sha256));
for (const blob of blobs) {
  const end = bytes.indexOf(10, offset);
  const size = Number(bytes.toString("utf8", offset, end).split(" ")[2]);
  offset = end + 1;
  const data = bytes.subarray(offset, offset + size);
  offset += size + 1;
  if (
    prohibitedFile.test(blob.file) ||
    /(?:^|\/)(?:\.tools|private|node_modules|\.env(?:\..*)?)(?:\/|$)/.test(
      blob.file,
    )
  )
    failures.push(`Prohibited historical file: ${blob.file}`);
  if (blob.file.endsWith(".webp")) {
    if (!hashes.has(createHash("sha256").update(data).digest("hex")))
      failures.push(`Historical image outside review manifest: ${blob.file}`);
    continue;
  }
  for (const risk of contentRisks(data.toString("utf8")))
    failures.push(`${risk}: ${blob.file}`);
}
if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exit(1);
}
console.log(
  `History check passed: ${blobs.length} text/image blobs reviewed; no checked credential patterns, prohibited originals, or unreviewed historical images. Pattern scans complement human review.`,
);
