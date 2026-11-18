import FloodMotion from "./FloodMotion";
import TrafficMotion from "./TrafficMotion";
import HeartDemo from "./HeartDemo";
import { useEffect, useState } from "react";
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
  useEffect(() => {
    if (phase === 0) return;
    const timer = setTimeout(
      () => setPhase((p) => (p + 1) % crossingStates.length),
      phase === 3 ? 5000 : 2000,
    );
    return () => clearTimeout(timer);
  }, [phase]);
  return (
    <div className="extra-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">Arduino traffic light</span>
          <h3>Pedestrian crossing sequence</h3>
        </div>
        <button className="button small ghost" onClick={() => setPhase(0)}>
          Reset simulation
        </button>
      </div>
      <TrafficMotion
        traffic={state.traffic}
        crossing={state.pedestrian === "Cross"}
      />
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
export function FloodDemo({ engineering }: { engineering: boolean }) {
  return <FloodMotion />;
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
