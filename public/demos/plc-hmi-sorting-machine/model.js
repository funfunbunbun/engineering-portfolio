export const categories = ["metal", "plastic", "other"];
export function initialState(category = "metal") {
  return {
    phase: "idle",
    category: categories.includes(category) ? category : "other",
    counts: { metal: 0, plastic: 0, other: 0 },
  };
}
export function nextState(current, selectedCategory = current.category) {
  const phases = ["idle", "sense", "route", "delivered"];
  const index = phases.indexOf(current.phase);
  if (index === -1) throw new Error("Unknown conveyor phase");
  const phase = phases[(index + 1) % phases.length];
  const counts = { ...current.counts };
  if (phase === "delivered") counts[current.category] += 1;
  // Keep an in-flight item attached to its material until it reaches its bin.
  const category =
    phase === "idle"
      ? categories.includes(selectedCategory)
        ? selectedCategory
        : "other"
      : current.category;
  return { ...current, category, phase, counts };
}
