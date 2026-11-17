export function clampDuty(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? Math.min(100, Math.max(0, numeric)) : 0;
}
export function waveform(duty) {
  const fraction = clampDuty(duty) / 100;
  if (fraction === 0) return "M20 80H780";
  if (fraction === 1) return "M20 20H780";
  let path = "M20 20";
  for (let i = 0; i < 4; i++) {
    const start = 20 + i * 190;
    path += `H${start + 190 * fraction}V80H${start + 190}`;
    if (i < 3) path += "V20";
  }
  return path;
}
export function describeDrive(value) {
  const duty = clampDuty(value);
  if (duty === 0) return "Signal off";
  if (duty < 40) return "Low illustrative drive";
  if (duty < 70) return "Medium illustrative drive";
  if (duty < 100) return "High illustrative drive";
  return "Signal continuously high";
}
