export function springExtension(force: number, stiffness: number) {
  return force / stiffness;
}
export function idealCircuit(cells: number, resistance: number) {
  const voltage = cells;
  return { voltage, current: voltage / resistance };
}
export function virtualSpeed(distance: number, seconds: number) {
  return (distance / seconds) * 3.6;
}
export function trajectoryPoint(progress: number, lift: number) {
  const t = Math.max(0, Math.min(1, progress));
  const controlY = 220 - 2 * lift;
  return {
    x: 50 + 260 * t,
    y: (1 - t) ** 2 * 205 + 2 * (1 - t) * t * controlY + t * t * 205,
  };
}
export function intersectsObstacle(lift: number) {
  return Array.from({ length: 201 }, (_, i) =>
    trajectoryPoint(i / 200, lift),
  ).some((p) => p.x >= 145 && p.x <= 215 && p.y >= 155 && p.y <= 235);
}
export const wordWeights: Record<string, number> = {
  good: 1,
  great: 2,
  useful: 1,
  reliable: 1,
  clear: 1,
  bad: -1,
  poor: -2,
  slow: -1,
  broken: -2,
};
export function scoreWords(text: string) {
  const tokens = (text.toLowerCase().match(/[a-z]+/g) || []).filter((word) =>
    Object.hasOwn(wordWeights, word),
  );
  const score = tokens.reduce((sum, word) => sum + wordWeights[word], 0);
  return {
    tokens,
    score,
    label:
      score > 0
        ? "Positive cue"
        : score < 0
          ? "Negative cue"
          : "No clear direction",
  };
}
export function transact(
  balance: number,
  amount: number,
  operation: "deposit" | "withdraw",
) {
  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > 10000 ||
    Math.abs(amount * 100 - Math.round(amount * 100)) > 1e-6
  )
    return {
      balance,
      message:
        "Enter a positive amount with at most two decimal places (maximum 10,000 credits).",
    };
  if (operation === "withdraw" && amount > balance)
    return { balance, message: "Insufficient demo credits." };
  return {
    balance:
      Math.round(
        (balance + (operation === "deposit" ? amount : -amount)) * 100,
      ) / 100,
    message:
      operation === "deposit"
        ? "Demo deposit complete."
        : "Demo withdrawal complete.",
  };
}
export type RobotState = { phase: number; metal: number; other: number };
export function robotStep(state: RobotState, isMetal: boolean): RobotState {
  const phase = (state.phase + 1) % 6;
  return {
    phase,
    metal: state.metal + (phase === 4 && isMetal ? 1 : 0),
    other: state.other + (phase === 4 && !isMetal ? 1 : 0),
  };
}
