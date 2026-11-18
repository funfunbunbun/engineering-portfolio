export type HeartScenario = "random" | "slow" | "normal" | "fast";
export function sampleHeartRate(
  scenario: HeartScenario,
  random: () => number = Math.random,
) {
  const selected =
    scenario === "random"
      ? (["slow", "normal", "fast"] as const)[
          Math.min(2, Math.floor(random() * 3))
        ]
      : scenario;
  const [min, max] =
    selected === "slow"
      ? [42, 59]
      : selected === "fast"
        ? [101, 145]
        : [60, 100];
  return min + Math.min(max - min, Math.floor(random() * (max - min + 1)));
}
export function heartRateLabel(rate: number) {
  return rate < 60
    ? "Bradycardia range"
    : rate > 100
      ? "Tachycardia range"
      : "Normal resting range";
}
