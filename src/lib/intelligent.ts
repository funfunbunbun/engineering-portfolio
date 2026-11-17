export function combineSupport(first: number, second: number): number {
  if (
    !Number.isFinite(first) ||
    !Number.isFinite(second) ||
    first < 0 ||
    first > 1 ||
    second < 0 ||
    second > 1
  )
    throw new RangeError("Support must be between zero and one");
  return first + second * (1 - first);
}
export function andDecision(first: boolean, second: boolean) {
  const sum = Number(first) + Number(second) - 1.5;
  return { sum, output: sum >= 0 ? 1 : 0 };
}
