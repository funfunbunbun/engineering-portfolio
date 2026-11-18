import { useState } from "react";
const presets: Record<string, [number, number, number]> = {
  AND: [1, 1, -1.5],
  OR: [1, 1, -0.5],
  NAND: [-1, -1, 1.5],
  NOR: [-1, -1, 0.5],
  "NOT A": [-1, 0, 0.5],
};
export default function GateLab() {
  const [gate, setGate] = useState("AND"),
    [a, setA] = useState(false),
    [b, setB] = useState(false),
    [weights, setWeights] = useState<[number, number, number]>(presets.AND);
  const sum = +a * weights[0] + +b * weights[1] + weights[2],
    output = +(sum >= 0);
  return (
    <section className="motion-demo">
      <h3>Single-layer perceptron</h3>
      <label>
        Gate preset{" "}
        <select
          value={gate}
          onChange={(e) => {
            setGate(e.target.value);
            setWeights([...presets[e.target.value]]);
          }}
        >
          {Object.keys(presets).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <div className="motion-controls">
        {[
          ["Input A", a, setA],
          ["Input B", b, setB],
        ].map(([name, value, set]) => (
          <button
            className="binary-input"
            key={String(name)}
            aria-pressed={Boolean(value)}
            onClick={() => (set as typeof setA)(!value)}
          >
            {String(name)}: {Number(value)}
          </button>
        ))}
        {weights.map((value, index) => (
          <label key={index}>
            {["Weight A", "Weight B", "Bias"][index]}: {value.toFixed(1)}
            <input
              aria-label={["Weight A", "Weight B", "Bias"][index]}
              type="range"
              min="-3"
              max="3"
              step=".1"
              value={value}
              onChange={(e) =>
                setWeights(
                  (old) =>
                    old.map((item, i) =>
                      i === index ? +e.target.value : item,
                    ) as typeof weights,
                )
              }
            />
          </label>
        ))}
      </div>
      <svg
        viewBox="0 0 540 170"
        role="img"
        aria-label="Two inputs feed a weighted sum, bias and threshold output"
      >
        <path
          d="M80 40 270 85 80 130M300 85h160"
          stroke="currentColor"
          fill="none"
        />
        {[
          [80, 40, +a],
          [80, 130, +b],
          [280, 85, "Σ"],
          [470, 85, output],
        ].map(([x, y, t]) => (
          <g key={String(y) + String(x)}>
            <circle cx={+x} cy={+y} r="25" fill="#284c62" />
            <text x={+x} y={+y + 6} textAnchor="middle" fill="#e5f2fa">
              {t}
            </text>
          </g>
        ))}
      </svg>
      <code>z = w₁x₁ + w₂x₂ + b; y = 1 when z ≥ 0, otherwise 0</code>
      <p role="status" aria-label={`${gate} output`}>
        {output}
      </p>
      <p>
        Weighted sum: {sum.toFixed(2)}. Changing bias shifts the decision
        boundary; changing weights changes how each input contributes.
      </p>
      <table>
        <caption>Current weights: truth table</caption>
        <thead>
          <tr>
            <th>A</th>
            <th>B</th>
            <th>Weighted sum</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          {[
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
          ].map(([x, y]) => (
            <tr key={`${x}${y}`}>
              <td>{x}</td>
              <td>{y}</td>
              <td>
                {(x * weights[0] + y * weights[1] + weights[2]).toFixed(1)}
              </td>
              <td>{+(x * weights[0] + y * weights[1] + weights[2] >= 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        XOR is not linearly separable, so a single perceptron cannot represent
        it. It needs an additional layer or transformed features.
      </p>
      <button
        className="button small ghost"
        onClick={() => {
          setGate("AND");
          setWeights([...presets.AND]);
          setA(false);
          setB(false);
        }}
      >
        Reset simulation
      </button>
    </section>
  );
}
