import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createHash } from "node:crypto";

const root = fileURLToPath(new URL("../", import.meta.url));
const repos = [root];
if (process.argv.includes("--projects")) {
  const entries = JSON.parse(
    await readFile(
      new URL("../project-repositories.json", import.meta.url),
      "utf8",
    ),
  );
  for (const entry of entries) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug))
      throw new Error("Invalid project slug");
    repos.push(path.join(root, "projects", entry.slug));
  }
}
let count = 0;
const problems = [];
const manifest = JSON.parse(
  await readFile(new URL("../media-manifest.json", import.meta.url), "utf8"),
);
const allowedImageHashes = new Set(
  manifest.assets.map((asset) => asset.sha256),
);
for (const repo of repos) {
  const names = execFileSync(
    "git",
    [
      "-c",
      `safe.directory=${repo.replace(/[\\/]$/, "")}`,
      "-C",
      repo,
      "ls-files",
      "-z",
    ],
    { encoding: "utf8" },
  )
    .split("\0")
    .filter(Boolean);
  for (const name of names) {
    count++;
    if (
      /(?:^|\/)(?:\.env(?:\..*)?|\.tools|node_modules|private|unapproved)(?:\/|$)|\.(?:pdf|mp4|pem|key|log)$/i.test(
        name,
      )
    )
      problems.push(`Unexpected tracked material: ${name}`);
    const data = await readFile(path.join(repo, name));
    if (name.endsWith(".webp")) {
      if (
        !allowedImageHashes.has(createHash("sha256").update(data).digest("hex"))
      )
        problems.push(`Image not in review manifest: ${name}`);
      continue;
    }
    const text = data.toString("utf8");
    if (
      /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}|sk-[A-Za-z0-9_-]{35,}/.test(
        text,
      )
    )
      problems.push(`Credential pattern requires review: ${name}`);
  }
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log(
  `Checked ${count} tracked files across ${repos.length} repositories: no checked credential patterns or prohibited file types. This pattern scan does not replace human publication review.`,
);
