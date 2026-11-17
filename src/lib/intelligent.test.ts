import { expect, it } from "vitest";
import { combineSupport, andDecision } from "./intelligent";
it("combines positive support with the correct identity and saturation", () => {
  expect(combineSupport(0, 0.7)).toBe(0.7);
  expect(combineSupport(0.4, 0.5)).toBeCloseTo(0.7);
  expect(combineSupport(1, 0.2)).toBe(1);
});
it("is symmetric, bounded, and monotone over the support grid", () => {
  for (const a of [0, 0.25, 0.5, 0.75, 1])
    for (const b of [0, 0.25, 0.5, 0.75, 1]) {
      const c = combineSupport(a, b);
      expect(c).toBeGreaterThanOrEqual(Math.max(a, b));
      expect(c).toBeLessThanOrEqual(1);
      expect(c).toBeCloseTo(combineSupport(b, a));
    }
});
it("rejects invalid inputs instead of presenting invalid confidence", () => {
  for (const bad of [-0.1, 1.1, NaN, Infinity])
    expect(() => combineSupport(bad, 0.5)).toThrow(RangeError);
});
it("implements the full AND truth table", () => {
  expect(andDecision(false, false).output).toBe(0);
  expect(andDecision(true, false).output).toBe(0);
  expect(andDecision(false, true).output).toBe(0);
  expect(andDecision(true, true).output).toBe(1);
});
