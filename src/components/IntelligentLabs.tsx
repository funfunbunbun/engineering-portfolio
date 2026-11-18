import GateLab from "./GateLab";
import WeatherRules from "./WeatherRules";
import { useState } from "react";
import { combineSupport, andDecision } from "../lib/intelligent";

export function WeatherLab({ engineering }: { engineering: boolean }) {
  const [first, setFirst] = useState(0.4);
  const [second, setSecond] = useState(0.5);
  const combined = combineSupport(first, second);
  return (
    <div className="intelligent-lab">
      <WeatherRules />
      <div className="demo-heading">
        <div>
          <span className="eyebrow">OFFLINE / RULE CONFIDENCE LAB</span>
          <h3>Weather certainty factors</h3>
        </div>
        <button
          className="button small ghost"
          onClick={() => {
            setFirst(0.4);
            setSecond(0.5);
          }}
        >
          Reset simulation
        </button>
      </div>
      <div className="confidence-layout">
        <div className="confidence-inputs">
          {[
            {
              id: "cf-first",
              label: "Rule A support",
              value: first,
              set: setFirst,
            },
            {
              id: "cf-second",
              label: "Rule B support",
              value: second,
              set: setSecond,
            },
          ].map((control) => (
            <div className="confidence-control" key={control.id}>
              <label htmlFor={control.id}>
                {control.label}
                <output htmlFor={control.id}>{control.value.toFixed(2)}</output>
              </label>
              <input
                id={control.id}
                type="range"
                min="0"
                max="1"
                step=".05"
                value={control.value}
                onChange={(event) => control.set(Number(event.target.value))}
              />
              <span>
                0 · no support<span>1 · full rule support</span>
              </span>
            </div>
          ))}
          <p>
            Both illustrative rules support the same “rain” hypothesis. Adjust
            their support to inspect the combination.
          </p>
        </div>
        <div className="confidence-result">
          <span className="eyebrow">COMBINED CERTAINTY FACTOR</span>
          <strong role="status" aria-label="Combined certainty factor">
            {combined.toFixed(2)}
          </strong>
          <div className="confidence-meter" aria-hidden="true">
            <span style={{ width: `${combined * 100}%` }} />
          </div>
          <p>
            Rule confidence, not a rain probability.
            <br />
            No API calls. No live weather data.
          </p>
        </div>
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Positive supporting evidence</h4>
            <code>CF = A + B × (1 − A)</code>
            <p>
              This lab covers two nonnegative supports for the same hypothesis.
              Conflicting evidence and full weather-rule evaluation are outside
              its scope.
            </p>
          </div>
          <div>
            <h4>Interpretable reasoning</h4>
            <p>
              The combination remains in [0, 1], is symmetric, and increases
              with additional positive support. It does not turn heuristic rules
              into calibrated forecast probabilities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export function NeuralLab({ engineering }: { engineering: boolean }) {
  return <GateLab />;
}
