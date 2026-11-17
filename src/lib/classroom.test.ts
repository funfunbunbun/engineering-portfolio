import { describe, it, expect } from "vitest";
import { decideRoom, defaultRoom } from "./classroom";

describe("classroom decisions", () => {
  it("keeps fan and lights off at the exact thresholds", () => {
    expect(
      decideRoom({ ...defaultRoom, temperature: 27, light: 300, co2: 1000 }),
    ).toEqual({ fan: false, lights: false, ventilation: false });
  });
  it("responds when occupied conditions cross thresholds", () => {
    expect(
      decideRoom({ ...defaultRoom, temperature: 28, light: 290, co2: 1050 }),
    ).toEqual({ fan: true, lights: true, ventilation: true });
  });
  it("disables comfort outputs in an empty room but retains the CO2 alert", () => {
    expect(
      decideRoom({
        ...defaultRoom,
        occupancy: 0,
        temperature: 35,
        light: 0,
        co2: 1500,
      }),
    ).toEqual({ fan: false, lights: false, ventilation: true });
  });
});
