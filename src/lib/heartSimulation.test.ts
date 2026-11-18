import { it, expect } from "vitest";
import { sampleHeartRate, heartRateLabel } from "./heartSimulation";
it("keeps simulated ranges separate and handles boundary labels", () => {
  for (const r of [0, 0.2, 0.5, 0.999999, 1]) {
    expect(sampleHeartRate("slow", () => r)).toBeLessThan(60);
    expect(sampleHeartRate("normal", () => r)).toBeGreaterThanOrEqual(60);
    expect(sampleHeartRate("normal", () => r)).toBeLessThanOrEqual(100);
    expect(sampleHeartRate("fast", () => r)).toBeGreaterThan(100);
  }
  expect(heartRateLabel(59)).toBe("Bradycardia range");
  expect(heartRateLabel(60)).toBe("Normal resting range");
  expect(heartRateLabel(100)).toBe("Normal resting range");
  expect(heartRateLabel(101)).toBe("Tachycardia range");
});
