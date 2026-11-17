import { initialState, nextState } from "./model.js";

let state = initialState();
let timer;
const select = document.querySelector("#category");
function render() {
  document.querySelectorAll("[data-state]").forEach((element) => {
    element.classList.toggle("active", element.dataset.state === state.phase);
    if (element.dataset.state === state.phase)
      element.setAttribute("aria-current", "step");
    else element.removeAttribute("aria-current");
  });
  const sensing = state.phase === "sense";
  document.querySelector("#sensor").textContent =
    `SENSOR: ${sensing ? "DETECTED" : "CLEAR"}`;
  document.querySelector("#sensor").classList.toggle("detected", sensing);
  document
    .querySelector("#sensor-beam")
    .setAttribute("stroke", sensing ? "#b2e4b9" : "#7998ad");
  const destinations = {
    metal: [712, 26],
    plastic: [712, 124],
    other: [712, 189],
  };
  const positions = {
    idle: [100, 110],
    sense: [350, 110],
    route: [560, 110],
    delivered: destinations[state.category],
  };
  const position = positions[state.phase];
  const object = document.querySelector("#object");
  object.setAttribute("transform", `translate(${position[0]} ${position[1]})`);
  object.querySelector("text").textContent = state.category[0].toUpperCase();
  object
    .querySelector("rect")
    .setAttribute(
      "fill",
      { metal: "#a4cfe6", plastic: "#d5c59b", other: "#b8c6b3" }[
        state.category
      ],
    );
  const messages = {
    idle: "Ready. Choose an object and advance the sequence.",
    sense: `Sensor detects the illustrative ${state.category} object.`,
    route: `Routing decision: ${state.category} destination selected.`,
    delivered: `Object delivered to the ${state.category} destination. Next step starts a new cycle.`,
  };
  document.querySelector("#status").textContent = messages[state.phase];
  for (const [category, count] of Object.entries(state.counts))
    document.querySelector(`#count-${category}`).textContent = count;
  select.disabled = state.phase !== "idle" || Boolean(timer);
}
function stop() {
  if (timer) clearInterval(timer);
  timer = undefined;
  document.querySelector("#run").textContent = "Run sequence";
}
function advance() {
  state = nextState(state);
  if (state.phase === "delivered") stop();
  render();
}
document.querySelector("#step").addEventListener("click", () => {
  stop();
  advance();
});
document.querySelector("#run").addEventListener("click", () => {
  if (timer) {
    stop();
    render();
    return;
  }
  document.querySelector("#run").textContent = "Pause sequence";
  timer = setInterval(advance, 900);
  render();
});
select.addEventListener("change", () => {
  state = { ...state, category: select.value };
  render();
});
document.querySelector("#reset").addEventListener("click", () => {
  stop();
  state = initialState();
  select.value = "metal";
  render();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stop();
    render();
  }
});
window.addEventListener("pagehide", stop);
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
