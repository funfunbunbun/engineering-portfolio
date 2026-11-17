import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const repos = [root];
if (process.argv.includes("--projects"))
  repos.push(
    path.join(root, "projects/fpga-pwm-fan-controller"),
    path.join(root, "projects/plc-hmi-sorting-machine"),
  );
let count = 0;
const problems = [];
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
    const text = await readFile(path.join(repo, name), "utf8");
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
