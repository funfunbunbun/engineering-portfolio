import test from "node:test";
import assert from "node:assert/strict";
import { contentRisks, prohibitedFile } from "./public-policy.mjs";
import { readFile } from "node:fs/promises";
import { isReviewedAsset } from "./reviewed-assets.mjs";
test("detects credential-shaped values without returning their contents", () => {
  const sample = "ghp_" + "x".repeat(36);
  assert.deepEqual(contentRisks(sample), ["credential pattern"]);
  assert.ok(!JSON.stringify(contentRisks(sample)).includes(sample));
});
test("detects named sensitive assignments and token-bearing URLs", () => {
  const assignment = [
    "const api",
    'Key = "',
    "synthetic-test-value",
    '";',
  ].join("");
  assert.ok(contentRisks(assignment).includes("sensitive literal assignment"));
  const url = [
    "https://example.invalid/?",
    "app",
    "id=",
    "synthetic-test-value",
  ].join("");
  assert.ok(contentRisks(url).includes("credential in URL"));
});
test("detects local source paths and private network endpoints", () => {
  const local = [
    "C:",
    String.fromCharCode(92),
    "Users",
    String.fromCharCode(92),
    "Example",
  ].join("");
  assert.ok(contentRisks(local).includes("local source path"));
  for (const parts of [
    [10, 0, 0, 1],
    [192, 168, 1, 2],
    [172, 16, 0, 1],
  ])
    assert.ok(
      contentRisks(parts.join(".")).includes("private network address"),
    );
});
test("accepts the public mathematical example without blocking ordinary prose", () => {
  assert.deepEqual(
    contentRisks(
      "function combineSupport(a,b){return a+b*(1-a);} API credentials are omitted.",
    ),
    [],
  );
});
test("rejects model artifacts, datasets, archives, and full source notebooks", () => {
  for (const extension of ["pth", "pkl", "csv", "zip", "rar", "ipynb", "pdf"])
    assert.ok(prohibitedFile.test("original." + extension));
  assert.ok(!prohibitedFile.test("diagram.webp"));
});

test("media exceptions require the reviewed path, exact content and expected signature", async () => {
  const name = "assets/reviewed/vehicle-speed-demo.mp4";
  const data = await readFile(new URL("../public/" + name, import.meta.url));
  assert.ok(isReviewedAsset(name, data));
  assert.equal(isReviewedAsset("assets/reviewed/other.mp4", data), false);
  assert.equal(isReviewedAsset("assets/reviewed/private.onnx", data), false);
  const changed = Buffer.from(data);
  changed[changed.length - 1] ^= 1;
  assert.equal(isReviewedAsset(name, changed), false);
});
