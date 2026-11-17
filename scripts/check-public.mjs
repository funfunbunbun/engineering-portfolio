import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const failures = [];
async function check(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await check(file);
    else {
      if (!/\.(?:html|css|js|json|svg|txt)$/i.test(entry.name)) {
        failures.push(`Unexpected public file: ${path.relative(root, file)}`);
        continue;
      }
      const content = await readFile(file, "utf8");
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
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(
  "Public build check passed: expected text assets only; no Windows source paths, checked credential patterns, or known tracking references.",
);
