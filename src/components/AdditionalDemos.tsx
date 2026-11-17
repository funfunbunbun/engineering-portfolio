import { useState } from "react";
import type { ProjectId } from "../data/projects";

const crossingStates = [
  {
    traffic: "Green",
    pedestrian: "Wait",
    description: "Traffic flows. A pedestrian can request a crossing.",
  },
  {
    traffic: "Amber",
    pedestrian: "Wait",
    description:
      "Crossing requested. The model advances to a traffic warning state.",
  },
  {
    traffic: "Red",
    pedestrian: "Wait",
    description:
      "Traffic is stopped. A separate clearance state comes before crossing.",
  },
  {
    traffic: "Red",
    pedestrian: "Cross",
    description:
      "The model permits the pedestrian crossing while traffic remains stopped.",
  },
  {
    traffic: "Red",
    pedestrian: "Wait",
    description:
      "Crossing closes. A clearance state precedes the return to green.",
  },
];
export function TrafficDemo({ engineering }: { engineering: boolean }) {
  const [phase, setPhase] = useState(0);
  const state = crossingStates[phase];
  return (
    <div className="extra-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">EMBEDDED / CROSSING LAB</span>
          <h3>One request. A clear sequence.</h3>
        </div>
        <button className="button small ghost" onClick={() => setPhase(0)}>
          Reset simulation
        </button>
      </div>
      <div className="crossing-scene">
        <div
          className="traffic-unit"
          aria-label={`Traffic signal: ${state.traffic}`}
        >
          <div className="signal-box">
            {["Red", "Amber", "Green"].map((color) => (
              <span
                key={color}
                className={`signal ${color.toLowerCase()} ${state.traffic === color ? "lit" : ""}`}
              />
            ))}
          </div>
          <strong>{state.traffic}</strong>
        </div>
        <div className="road-model">
          <span className="lane-line" />
          <div className="zebra-crossing">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} />
            ))}
          </div>
          <div className={`model-car ${state.traffic.toLowerCase()}`} />
          <span className="road-label">ILLUSTRATIVE CROSSING</span>
        </div>
        <div
          className={`pedestrian-unit ${state.pedestrian === "Cross" ? "cross" : ""}`}
        >
          <span aria-hidden="true">
            {state.pedestrian === "Cross" ? "↟" : "⊣"}
          </span>
          <strong>Pedestrian: {state.pedestrian}</strong>
        </div>
      </div>
      <div className="extra-controls">
        <button
          className="button"
          onClick={() => setPhase((p) => (p + 1) % crossingStates.length)}
        >
          {phase === 0 ? "Request crossing" : "Next phase"}
        </button>
        <p role="status">{state.description}</p>
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Mutually exclusive permissions</h4>
            <code>pedestrian = CROSS ⇒ traffic = RED</code>
            <p>
              The model includes a stop/clearance state on either side of the
              crossing permission. Manual transitions replace real timings.
            </p>
          </div>
          <div>
            <h4>Current state</h4>
            <p>
              Phase {phase + 1} of {crossingStates.length}. This is an
              educational state diagram with no road-control or safety
              validation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export function HeartDemo({ engineering }: { engineering: boolean }) {
  const [present, setPresent] = useState(false);
  const [finger, setFinger] = useState(false);
  const [captured, setCaptured] = useState(false);
  const message = !present
    ? "Waiting for a visitor"
    : !finger
      ? "Place a finger on the sensor"
      : captured
        ? "Illustrative capture complete"
        : "Finger detected — ready to capture";
  return (
    <div className="extra-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">EMBEDDED / SENSING SEQUENCE</span>
          <h3>From presence to a prompt.</h3>
        </div>
        <button
          className="button small ghost"
          onClick={() => {
            setPresent(false);
            setFinger(false);
            setCaptured(false);
          }}
        >
          Reset simulation
        </button>
      </div>
      <div className="heart-layout">
        <div className="lcd-display">
          <span>ILLUSTRATIVE LCD / NO LIVE SENSOR</span>
          <strong role="status">{message}</strong>
          <div className="pulse-illustration" aria-hidden="true">
            <svg viewBox="0 0 400 90">
              <path
                d="M0 55h80l15-13 12 13h25l15-40 15 65 18-43 15 18h35l15-13 12 13h143"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <small>Signal drawing only · no patient readings</small>
        </div>
        <div className="heart-controls">
          <label>
            <input
              type="checkbox"
              checked={present}
              onChange={(e) => {
                setPresent(e.target.checked);
                setFinger(false);
                setCaptured(false);
              }}
            />{" "}
            Visitor present
          </label>
          <label>
            <input
              type="checkbox"
              checked={finger}
              disabled={!present}
              onChange={(e) => {
                setFinger(e.target.checked);
                setCaptured(false);
              }}
            />{" "}
            Finger on sensor
          </label>
          <button
            className="button small"
            disabled={!present || !finger || captured}
            onClick={() => setCaptured(true)}
          >
            Simulate capture
          </button>
          <p>
            Explore the interaction between sensors and the display. No real
            heart-rate or oxygen values are calculated.
          </p>
        </div>
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Report architecture</h4>
            <code>presence + optical sensing → VisionFive 2 → 8051 → LCD</code>
            <p>
              The original block diagram is shown below. This browser
              interaction is a simplified state model.
            </p>
          </div>
          <div>
            <h4>Scope</h4>
            <p>
              No camera, health-data collection, diagnostic thresholds, or
              clinical interpretation. All inputs are deliberate simulation
              controls.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export function FloodDemo({ engineering }: { engineering: boolean }) {
  const [level, setLevel] = useState(30);
  const pumping = level >= 60;
  return (
    <div className="extra-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">CIRCUITS / LEVEL LAB</span>
          <h3>Watch the level. Follow the rule.</h3>
        </div>
        <button className="button small ghost" onClick={() => setLevel(30)}>
          Reset simulation
        </button>
      </div>
      <div className="flood-layout">
        <div
          className="tank"
          aria-label={`Illustrative water level ${level} percent`}
        >
          <div className="tank-water" style={{ height: `${level}%` }} />
          <div className="tank-threshold" />
          <span className="tank-readout">{level}%</span>
          <span className="tank-threshold-label">MODEL THRESHOLD / 60%</span>
        </div>
        <div className="flood-controls">
          <label htmlFor="water-level">
            Water level <output htmlFor="water-level">{level}%</output>
          </label>
          <input
            id="water-level"
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
          />
          <div className={`pump-status ${pumping ? "on" : ""}`} role="status">
            <i />
            {pumping ? "Pump on" : "Pump standby"}
          </div>
          <p>
            The slider sets the level directly. Pump status illustrates the
            decision; it does not simulate a change in actual water volume.
          </p>
        </div>
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Illustrative browser rule</h4>
            <code>pump = ON when level ≥ 60%</code>
            <p>
              This simple threshold differs from the report’s analog sensing and
              timer-based drive. It is not a reconstruction of the original
              circuit.
            </p>
          </div>
          <div>
            <h4>Original project context</h4>
            <p>
              The university circuit combined conductive water sensing and an
              NE555-based control stage for an underground drainage concept.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
export default function AdditionalDemo({
  id,
  engineering,
}: {
  id: ProjectId;
  engineering: boolean;
}) {
  if (id === "heart-monitor") return <HeartDemo engineering={engineering} />;
  if (id === "traffic-light") return <TrafficDemo engineering={engineering} />;
  if (id === "flood-control") return <FloodDemo engineering={engineering} />;
  return null;
}
