import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  heartRateLabel,
  sampleHeartRate,
  type HeartScenario,
} from "../lib/heartSimulation";

export default function HeartDemo({ engineering }: { engineering: boolean }) {
  const [finger, setFinger] = useState(false);
  const [ready, setReady] = useState(false);
  const [scenario, setScenario] = useState<HeartScenario>("random");
  const [rate, setRate] = useState<number | null>(null);
  const [captured, setCaptured] = useState(false);
  useEffect(() => {
    if (!finger) return;
    const timer = setTimeout(() => {
      setRate(sampleHeartRate(scenario));
      setReady(true);
    }, 650);
    return () => clearTimeout(timer);
  }, [finger, scenario]);
  const clear = () => {
    setFinger(false);
    setReady(false);
    setRate(null);
    setCaptured(false);
  };
  return (
    <div className="extra-demo heart-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">Heartbeat monitor demo</span>
          <h3>Optical pulse measurement</h3>
        </div>
        <button className="button small ghost" onClick={clear}>
          Reset simulation
        </button>
      </div>
      <div className="heart-layout">
        <div
          className="sensor-scene"
          style={{ "--beat-time": `${60 / (rate || 75)}s` } as CSSProperties}
        >
          <svg
            viewBox="0 0 430 265"
            role="img"
            aria-label={
              finger
                ? "A finger placed on an optical sensor"
                : "A finger above an optical sensor"
            }
          >
            <rect
              x="125"
              y="167"
              width="180"
              height="60"
              rx="12"
              fill="#203d4f"
              stroke="#8faab9"
              strokeWidth="2"
            />
            <rect
              x="193"
              y="162"
              width="47"
              height="32"
              rx="6"
              fill={finger ? "#cf5867" : "#6b8590"}
            />
            <circle
              className={
                finger && ready && !captured
                  ? "sensor-led beating"
                  : "sensor-led"
              }
              cx="216"
              cy="178"
              r="8"
              fill={finger ? "#ffadad" : "#b3c3ca"}
            />
            <path
              d="M155 228v17m20-17v17m20-17v17m20-17v17m20-17v17m20-17v17m20-17v17"
              stroke="#b6a67b"
              strokeWidth="5"
            />
            <g className={finger ? "demo-finger placed" : "demo-finger"}>
              <path
                d="M124-20h78c25 0 37 25 37 53v75c0 40-55 40-55 0V60h-60Z"
                fill="#ddb197"
                stroke="#916a58"
                strokeWidth="2"
              />
              <rect
                x="195"
                y="76"
                width="32"
                height="39"
                rx="14"
                fill="#f4d7c5"
              />
            </g>
            <text
              x="216"
              y="259"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
            >
              MAX30102 optical sensor
            </text>
          </svg>
          <div className="optical-trace" aria-hidden="true">
            <svg viewBox="0 0 500 65">
              <path
                className={finger && ready && !captured ? "trace-running" : ""}
                d="M0 52H25C35 52 35 8 47 8S58 25 64 27 72 17 78 28 89 52 106 52H125C135 52 135 8 147 8S158 25 164 27 172 17 178 28 189 52 206 52H225C235 52 235 8 247 8S258 25 264 27 272 17 278 28 289 52 306 52H325C335 52 335 8 347 8S358 25 364 27 372 17 378 28 389 52 406 52H425C435 52 435 8 447 8S458 25 464 27 472 17 478 28 489 52 500 52"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="heart-controls">
          <label htmlFor="heart-scenario">Simulated heartbeat</label>
          <select
            id="heart-scenario"
            value={scenario}
            disabled={finger}
            onChange={(e) => setScenario(e.target.value as HeartScenario)}
          >
            <option value="random">Random range</option>
            <option value="slow">Bradycardia range</option>
            <option value="normal">Normal resting range</option>
            <option value="fast">Tachycardia range</option>
          </select>
          <div className="lcd-display" role="status">
            <span>Simulated BPM</span>
            <strong className="bpm-value">{rate ?? "—"}</strong>
            <p>
              {!finger
                ? "Place a finger to begin"
                : !ready
                  ? "Detecting pulse…"
                  : captured
                    ? "Reading captured"
                    : "Pulse detected — ready to capture"}
            </p>
            {rate !== null && <small>{heartRateLabel(rate)}</small>}
          </div>
          <button
            className="button small"
            onClick={() => {
              if (finger) clear();
              else setFinger(true);
            }}
          >
            {finger ? "Remove finger" : "Place finger"}
          </button>
          <button
            className="button small ghost"
            disabled={!ready || captured}
            onClick={() => setCaptured(true)}
          >
            Capture reading
          </button>
          <p className="muted">
            Random demonstration values and a drawn optical pulse. No real
            sensor or health data is used.
          </p>
        </div>
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Project signal chain</h4>
            <code>MAX30102 → VisionFive 2 → 8051 → LCD</code>
            <p>
              The browser simplifies the interaction to finger placement, a
              pulse sample and a captured reading. It does not reproduce the
              original SpO₂ calculation.
            </p>
          </div>
          <div>
            <h4>Demonstration ranges</h4>
            <p>
              Below 60, 60–100 and above 100 BPM represent common adult
              resting-rate categories. This simulated display is not a health
              assessment.
            </p>
            <a
              className="text-link"
              href="https://www.heart.org/en/health-topics/high-blood-pressure/the-facts-about-high-blood-pressure/all-about-heart-rate-pulse"
              target="_blank"
              rel="noopener noreferrer"
            >
              Heart-rate reference ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
