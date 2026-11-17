import { clampDuty, waveform, describeDrive } from "./model.js";

const slider = document.querySelector("#duty");
function update(value) {
  const duty = clampDuty(value);
  slider.value = String(duty);
  document.querySelector("#duty-value").textContent = `${duty}%`;
  document.querySelector("#high-time").innerHTML =
    `${(duty / 10).toFixed(1)} <small>ms</small>`;
  document.querySelector("#wave-caption").textContent =
    `${duty}% duty · ${(duty / 10).toFixed(1)} ms high / 10 ms period`;
  document.querySelector("#wave-title").textContent =
    `PWM signal at ${duty} percent duty cycle`;
  document.querySelector("#wave").setAttribute("d", waveform(duty));
  document.querySelector("#response").textContent = describeDrive(duty);
  const blades = document.querySelector("#fan-blades");
  blades.style.animationDuration = `${duty ? 3 - duty * 0.025 : 3}s`;
  blades.style.animationPlayState = duty ? "running" : "paused";
  document
    .querySelectorAll("[data-duty]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(Number(button.dataset.duty) === duty),
      ),
    );
}
slider.addEventListener("input", (event) => update(event.target.value));
document
  .querySelectorAll("[data-duty]")
  .forEach((button) =>
    button.addEventListener("click", () => update(button.dataset.duty)),
  );
document.querySelector("#reset").addEventListener("click", () => update(50));
update(50);
// Resize the portfolio embed to this document's content. Standalone use is unchanged.
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
