import { useEffect, useState } from "react";
import Icon from "./Icon";
export default function SpeedCrossing() {
  const [speed, setSpeed] = useState(36),
    [distance, setDistance] = useState(10),
    [running, setRunning] = useState(false),
    [elapsed, setElapsed] = useState(0);
  const pixelsPerSecond = ((speed / 3.6) * 240) / distance,
    cycle = 520 / pixelsPerSecond,
    x = 40 + (elapsed % cycle) * pixelsPerSecond;
  const first = (180 - 40) / pixelsPerSecond,
    second = (420 - 40) / pixelsPerSecond,
    time = elapsed % cycle;
  useEffect(() => {
    if (!running) return;
    let frame: number,
      last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      setElapsed((value) => value + dt);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);
  return (
    <section className="motion-demo">
      <h3>Tracking a vehicle across two reference lines</h3>
      <p>
        The box represents a detector’s vehicle position. A tracker keeps the
        same ID as the vehicle moves. Its bottom-centre point crosses line A,
        starting a timer, then line B, stopping it.
      </p>
      <svg
        viewBox="0 0 600 280"
        role="img"
        aria-label="Simulated tracked car crossing two reference lines"
      >
        <rect width="600" height="280" fill="#16313f" />
        <path d="M0 95h600M0 240h600" stroke="#668b9d" />
        <path d="M0 165h600" stroke="#9cb3bf" strokeDasharray="25 20" />
        {[180, 420].map((line, index) => (
          <g key={line}>
            <path
              d={`M${line} 65v190`}
              stroke={time >= (index ? second : first) ? "#a7dfb4" : "#e8c37c"}
              strokeWidth="3"
            />
            <text x={line + 7} y="55" fill="#e4edf4">
              Line {index ? "B" : "A"}
            </text>
          </g>
        ))}
        <path d={`M40 222H${x}`} stroke="#7bbaa1" strokeDasharray="3 5" />
        <rect
          x={x - 25}
          y="180"
          width="50"
          height="42"
          fill="none"
          stroke="#a5edb5"
          strokeWidth="2"
        />
        <rect x={x - 20} y="186" width="40" height="30" rx="6" fill="#82b9da" />
        <circle cx={x} cy="222" r="4" fill="#ffd180" />
        <text x={Math.min(x - 25, 465)} y="175" fill="#c8f6cf" fontSize="13">
          Track 7
        </text>
        <text x="240" y="270" fill="#e4edf4">
          {distance} m between reference lines
        </text>
      </svg>
      <div className="motion-controls">
        <label>
          Vehicle speed: {speed} km/h
          <input
            type="range"
            min="10"
            max="90"
            value={speed}
            onChange={(e) => {
              setSpeed(+e.target.value);
              setElapsed(0);
            }}
          />
        </label>
        <label>
          Reference distance: {distance} m
          <input
            type="range"
            min="5"
            max="30"
            value={distance}
            onChange={(e) => {
              setDistance(+e.target.value);
              setElapsed(0);
            }}
          />
        </label>
        <button className="button small" onClick={() => setRunning((v) => !v)}>
          <Icon name={running ? "pause" : "play"} />
          {running ? "Pause vehicle" : "Run vehicle"}
        </button>
        <button
          className="button small ghost"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
        >
          <Icon name="reset" />
          Reset vehicle
        </button>
      </div>
      <div className="motion-readouts">
        <p>Line A: {time >= first ? "timer started" : "waiting"}</p>
        <p>Line B: {time >= second ? "timer stopped" : "waiting"}</p>
        <p>
          Crossing time:{" "}
          {time >= second ? (second - first).toFixed(2) + " s" : "—"}
        </p>
        <p>
          Estimated speed:{" "}
          {time >= second
            ? ((distance / (second - first)) * 3.6).toFixed(1) + " km/h"
            : "—"}
        </p>
      </div>
      <code>speed (km/h) = distance (m) ÷ crossing time (s) × 3.6</code>
      <p className="muted">
        Illustrative animation with chosen distance and speed, separate from the
        project recording. A real camera needs road-plane calibration; screen
        pixels alone are not metres. YOLO supplies detections, while tracking
        and geometry provide the motion estimate.
      </p>
    </section>
  );
}
