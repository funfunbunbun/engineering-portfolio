import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";

export const manifest = JSON.parse(
  await readFile(new URL("../media-manifest.json", import.meta.url), "utf8"),
);
export const reviewedAssets = new Map(
  manifest.assets.map((asset) => [asset.file, asset]),
);
export function isReviewedAsset(file, data) {
  const asset = reviewedAssets.get(file);
  if (
    !asset ||
    asset.bytes !== data.length ||
    asset.sha256 !== createHash("sha256").update(data).digest("hex")
  )
    return false;
  if (file.endsWith(".webp"))
    return (
      data.toString("ascii", 0, 4) === "RIFF" &&
      data.toString("ascii", 8, 12) === "WEBP"
    );
  if (file.endsWith(".mp4")) return data.toString("ascii", 4, 8) === "ftyp";
  if (file.endsWith(".wasm"))
    return data.subarray(0, 4).equals(Buffer.from([0, 97, 115, 109]));
  return file === "assets/runtime/ort-wasm-simd-threaded.mjs";
}
