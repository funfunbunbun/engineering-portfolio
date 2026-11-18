import { useEffect, useState } from "react";
export default function FloodMotion() {
  const [level, setLevel] = useState(30),
    [running, setRunning] = useState(false),
    [inflow, setInflow] = useState(0);
  const on = level >= 60,
    speed = on ? Math.round(35 + ((level - 60) * 65) / 40) : 0,
    alarm = level >= 80;
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setLevel((old) =>
          Math.max(
            0,
            Math.min(
              100,
              old +
                inflow / 10 -
                (old >= 60 ? (35 + ((old - 60) * 65) / 40) / 12 : 0),
            ),
          ),
        ),
      500,
    );
    return () => clearInterval(timer);
  }, [running, inflow]);
  return (
    <section className="motion-demo">
      <h3>Water level, alarm and drainage</h3>
      <div className="flood-layout">
        <div className="tank">
          <div className="tank-water" style={{ height: level + "%" }} />
          <span className="tank-readout">{Math.round(level)}%</span>
        </div>
        <div>
          <label>
            Water level{" "}
            <input
              aria-label="Water level"
              type="range"
              min="0"
              max="100"
              value={level}
              onChange={(e) => setLevel(+e.target.value)}
            />
          </label>
          <label>
            Incoming water: {inflow}
            <input
              type="range"
              aria-label="Incoming water"
              min="0"
              max="100"
              value={inflow}
              onChange={(e) => setInflow(+e.target.value)}
            />
          </label>
          <div className="motor-scene">
            <svg viewBox="0 0 180 130" aria-label="Pump motor">
              <circle cx="90" cy="65" r="48" fill="#23485b" />
              <g
                className={on ? "pump-rotor" : ""}
                style={{
                  transformOrigin: "90px 65px",
                  animationDuration: (speed ? (3 / speed) * 35 : 1) + "s",
                }}
                fill="#b5dcef"
              >
                <path d="M90 65Q55 5 90 20Q130 25 90 65M90 65Q155 60 130 95Q105 120 90 65M90 65Q70 130 45 90Q35 60 90 65" />
              </g>
            </svg>
          </div>
          <p role="status">{on ? "Pump on" : "Pump standby"}</p>
          <p>Motor speed: {speed}%</p>
          <p className={alarm ? "alarm-active" : ""}>
            {alarm ? "⚠ High-water alarm active" : "High-water alarm clear"}
          </p>
          <button
            className="button small"
            onClick={() => setRunning((v) => !v)}
          >
            {running ? "Pause drainage" : "Run drainage"}
          </button>
          <button
            className="button small ghost"
            onClick={() => {
              setRunning(false);
              setLevel(30);
              setInflow(0);
            }}
          >
            Reset simulation
          </button>
        </div>
      </div>
      <p>
        As the simulated water level rises above 60%, the motor speeds up; above
        80%, the visual alarm activates. Running drainage reduces water while
        incoming flow adds it. This variable-speed water model is a browser
        explanation; the original circuit used conductive probes and an NE555
        control stage.
      </p>
    </section>
  );
}
