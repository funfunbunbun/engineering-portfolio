import { expect, it } from "vitest";
import {
  transact,
  robotStep,
  trajectoryPoint,
  intersectsObstacle,
  springExtension,
  idealCircuit,
  virtualSpeed,
  scoreWords,
} from "./workbenches";
it("does not change a balance for invalid amounts or insufficient funds", () => {
  for (const amount of [-1, 0, NaN, Infinity, 1.234, 10001])
    expect(transact(100, amount, "deposit").balance).toBe(100);
  expect(transact(100, 101, "withdraw").balance).toBe(100);
  expect(transact(100, 25, "withdraw").balance).toBe(75);
  expect(transact(0.1, 0.2, "deposit").balance).toBe(0.3);
});
it("counts an object only at release and preserves earlier state", () => {
  const start = { phase: 0, metal: 0, other: 0 };
  let state = start;
  for (let i = 0; i < 4; i++) state = robotStep(state, true);
  expect(state.metal).toBe(1);
  state = robotStep(state, true);
  state = robotStep(state, true);
  expect(state).toEqual({ phase: 0, metal: 1, other: 0 });
  expect(start.metal).toBe(0);
});
it("checks the illustrated trajectory against its obstacle and preserves endpoints", () => {
  expect(trajectoryPoint(0, 80)).toEqual({ x: 50, y: 205 });
  expect(trajectoryPoint(1, 80)).toEqual({ x: 310, y: 205 });
  expect(intersectsObstacle(80)).toBe(false);
  expect(intersectsObstacle(10)).toBe(true);
});
it("computes model relationships with consistent units", () => {
  expect(springExtension(4, 40)).toBe(0.1);
  expect(idealCircuit(2, 200)).toEqual({ voltage: 2, current: 0.01 });
  expect(virtualSpeed(20, 2)).toBe(36);
});
it("scores only the published illustrative vocabulary without pretending to run the trained model", () => {
  expect(scoreWords("good useful slow").score).toBe(1);
  expect(scoreWords("broken poor").label).toBe("Negative cue");
  expect(scoreWords("unlisted vocabulary").tokens).toEqual([]);
});
