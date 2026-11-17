import { useState } from "react";
import { combineSupport, andDecision } from "../lib/intelligent";

export function WeatherLab({ engineering }: { engineering: boolean }) {
  const [first, setFirst] = useState(0.4);
  const [second, setSecond] = useState(0.5);
  const combined = combineSupport(first, second);
  return (
    <div className="intelligent-lab">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">OFFLINE / RULE CONFIDENCE LAB</span>
          <h3>Two rules. One hypothesis.</h3>
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
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const { sum, output } = andDecision(first, second);
  return (
    <div className="intelligent-lab">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">ILLUSTRATIVE / AND PERCEPTRON</span>
          <h3>A boundary you can see.</h3>
        </div>
        <button
          className="button small ghost"
          onClick={() => {
            setFirst(false);
            setSecond(false);
          }}
        >
          Reset simulation
        </button>
      </div>
      <div className="neural-layout">
        <div className="binary-inputs">
          {[
            { name: "Input A", value: first, set: setFirst },
            { name: "Input B", value: second, set: setSecond },
          ].map((input) => (
            <button
              className={input.value ? "binary-input on" : "binary-input"}
              key={input.name}
              aria-pressed={input.value}
              onClick={() => input.set(!input.value)}
            >
              <span>{input.name}</span>
              <strong>{Number(input.value)}</strong>
              <small>Click to toggle</small>
            </button>
          ))}
        </div>
        <svg
          className="neural-network"
          viewBox="0 0 450 200"
          role="img"
          aria-label="Two unit-weight inputs feed a weighted sum with bias minus one point five and a threshold output"
        >
          <path
            d="m70 50 135 50-135 50m170-50h140"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
          />
          <circle cx="70" cy="50" r="20" />
          <circle cx="70" cy="150" r="20" />
          <circle cx="220" cy="100" r="35" />
          <circle cx="380" cy="100" r="24" />
          <g
            textAnchor="middle"
            fill="#c1ddef"
            stroke="none"
            fontSize="18"
            fontFamily="monospace"
          >
            <text x="70" y="56">
              {Number(first)}
            </text>
            <text x="70" y="156">
              {Number(second)}
            </text>
            <text x="220" y="107">
              Σ
            </text>
            <text x="380" y="106">
              {output}
            </text>
          </g>
          <g fill="#a9c7db" stroke="none" fontSize="10" fontFamily="monospace">
            <text x="142" y="63">
              w = 1
            </text>
            <text x="142" y="156">
              w = 1
            </text>
            <text x="179" y="165">
              bias = −1.5
            </text>
            <text x="290" y="82">
              ≥ 0 ?
            </text>
          </g>
        </svg>
        <div className="neural-result">
          <span>AND output</span>
          <strong role="status" aria-label="AND output">
            {output}
          </strong>
          <small>Weighted sum: {sum.toFixed(1)}</small>
        </div>
      </div>
      <p className="lab-explanation">
        The output is 1 only when both inputs are 1. These fixed weights are
        teaching values, separate from the trained project model.
      </p>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Decision rule</h4>
            <code>
              sum = 1 × A + 1 × B − 1.5
              <br />
              output = sum ≥ 0 ? 1 : 0
            </code>
            <p>Try all four input pairs to inspect the AND truth table.</p>
          </div>
          <div>
            <h4>From simple to larger models</h4>
            <p>
              The report extends the learning exercise to multilayer classifiers
              and dimensionality reduction. This tiny model illustrates the
              fundamental weighted-sum step.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
