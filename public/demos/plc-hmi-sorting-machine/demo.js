import { initialState, nextState } from "./model.js";

let state = initialState();
let running = false;
let motion;
const select = document.querySelector("#category");
const object = document.querySelector("#object");
const runButton = document.querySelector("#run");
const scene = document.querySelector(".conveyor-scene");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const destinations = {
  metal: [712, 62],
  plastic: [712, 160],
  other: [712, 219],
};

function transformFor(item) {
  const [x, y] = {
    idle: [100, 124],
    sense: [350, 124],
    route: [560, 124],
    delivered: destinations[item.category],
  }[item.phase];
  return `translate(${x}px, ${y}px)`;
}

function render() {
  document.querySelectorAll("[data-state]").forEach((element) => {
    const active = element.dataset.state === state.phase;
    element.classList.toggle("active", active);
    if (active) element.setAttribute("aria-current", "step");
    else element.removeAttribute("aria-current");
  });
  const sensing = state.phase === "sense";
  document.querySelector("#sensor").textContent =
    `SENSOR: ${sensing ? "DETECTED" : "CLEAR"}`;
  document.querySelector("#sensor").classList.toggle("detected", sensing);
  document
    .querySelector("#sensor-beam")
    .setAttribute("stroke", sensing ? "#b2e4b9" : "#7998ad");
  object.style.transform = transformFor(state);
  object.querySelector("text").textContent = state.category[0].toUpperCase();
  object.querySelector("rect").setAttribute(
    "fill",
    { metal: "#a4cfe6", plastic: "#d5c59b", other: "#b8c6b3" }[
      state.category
    ],
  );
  const material = state.category[0].toUpperCase() + state.category.slice(1);
  const messages = {
    idle: `${material} item ready.`,
    sense: `${material} detected at the sensor.`,
    route: `Moving to the ${state.category} bin.`,
    delivered: `${material} item delivered.`,
  };
  document.querySelector("#status").textContent = messages[state.phase];
  document.querySelector("#next-material").textContent =
    select.value === state.category
      ? `Repeating ${select.value} items.`
      : `Next item: ${select.value}. Current item: ${state.category}.`;
  for (const [category, count] of Object.entries(state.counts))
    document.querySelector(`#count-${category}`).textContent = count;
  runButton.textContent = running
    ? "Pause sorting"
    : motion
      ? "Resume sorting"
      : "Start sorting";
  runButton.setAttribute("aria-pressed", String(running));
  scene.classList.toggle("running", running);
}

function startMotion() {
  // Re-read the selection for each new item; keep an in-flight material fixed.
  const target = nextState(state, select.value);
  const returning = target.phase === "idle";
  const from = transformFor(state);
  const to = returning ? from : transformFor(target);
  const animation = object.animate(
    [
      { transform: from, opacity: 1 },
      { transform: to, opacity: returning && !reducedMotion.matches ? 0 : 1 },
    ],
    {
      duration: returning ? 500 : target.phase === "sense" ? 1450 : 1100,
      delay: returning ? 450 : 150,
      easing: reducedMotion.matches ? "steps(1, end)" : "linear",
      fill: "forwards",
    },
  );
  motion = animation;
  animation.onfinish = () => {
    if (motion !== animation) return;
    // Use the latest material even if it changed during the brief bin dwell.
    state = returning ? nextState(state, select.value) : target;
    motion = undefined;
    animation.cancel();
    render();
    if (running) startMotion();
  };
}

function pause() {
  running = false;
  motion?.pause();
  render();
}

function cancelMotion() {
  if (!motion) return;
  motion.onfinish = null;
  motion.cancel();
  motion = undefined;
}

document.querySelector("#step").addEventListener("click", () => {
  running = false;
  cancelMotion();
  state = nextState(state, select.value);
  render();
});

runButton.addEventListener("click", () => {
  if (running) {
    pause();
    return;
  }
  running = true;
  if (motion) motion.play();
  else startMotion();
  render();
});

select.addEventListener("change", () => {
  if (state.phase === "idle" && !motion)
    state = { ...state, category: select.value };
  render();
});

document.querySelector("#reset").addEventListener("click", () => {
  running = false;
  cancelMotion();
  state = initialState(select.value);
  render();
});

reducedMotion.addEventListener("change", () => {
  // Change interpolation without advancing a paused simulation or its totals.
  if (!motion) return;
  motion.effect.updateTiming({
    easing: reducedMotion.matches ? "steps(1, end)" : "linear",
  });
  if (reducedMotion.matches)
    motion.effect.setKeyframes(
      motion.effect.getKeyframes().map(({ offset, transform }) => ({
        offset,
        transform,
        opacity: 1,
      })),
    );
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) pause();
});
window.addEventListener("pagehide", pause);
render();

// Share only layout height with the trusted portfolio parent.
function reportHeight() {
  if (window.parent !== window)
    window.parent.postMessage(
      {
        type: "vm-demo-height",
        height:
          Math.ceil(
            document.querySelector("main").getBoundingClientRect().height,
          ) + 2,
      },
      window.location.origin,
    );
}
new ResizeObserver(reportHeight).observe(document.querySelector("main"));
reportHeight();
