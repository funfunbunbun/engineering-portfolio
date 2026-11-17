import { useState } from "react";
import { defaultRoom, decideRoom, type Room } from "../lib/classroom";

export default function Classroom({ engineering }: { engineering: boolean }) {
  const [room, setRoom] = useState<Room>({ ...defaultRoom });
  const [events, setEvents] = useState<string[]>([
    "Simulation ready. Adjust a sensor to begin.",
  ]);
  const decisions = decideRoom(room);
  function update(key: keyof Room, value: number) {
    const next = { ...room, [key]: value };
    const before = decideRoom(room);
    const after = decideRoom(next);
    const changes: string[] = [];
    if (before.fan !== after.fan)
      changes.push(`Fan ${after.fan ? "on" : "off"}`);
    if (before.lights !== after.lights)
      changes.push(`Lights ${after.lights ? "on" : "off"}`);
    if (before.ventilation !== after.ventilation)
      changes.push(
        `Ventilation alert ${after.ventilation ? "active" : "cleared"}`,
      );
    setRoom(next);
    if (changes.length)
      setEvents((old) => [changes.join(" · "), ...old].slice(0, 6));
  }
  const controls: {
    key: keyof Room;
    label: string;
    unit: string;
    min: number;
    max: number;
    step: number;
  }[] = [
    {
      key: "temperature",
      label: "Temperature",
      unit: "°C",
      min: 16,
      max: 40,
      step: 1,
    },
    {
      key: "light",
      label: "Ambient light",
      unit: "lux",
      min: 0,
      max: 1000,
      step: 10,
    },
    {
      key: "occupancy",
      label: "Occupancy",
      unit: "people",
      min: 0,
      max: 40,
      step: 1,
    },
    {
      key: "co2",
      label: "Carbon dioxide",
      unit: "ppm",
      min: 400,
      max: 2000,
      step: 50,
    },
  ];
  return (
    <div className="room-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">CLASSROOM / SENSOR LAB</span>
          <h3>Make yourself at home.</h3>
        </div>
        <button
          className="button small ghost"
          onClick={() => {
            setRoom({ ...defaultRoom });
            setEvents(["Simulation reset to defaults."]);
          }}
        >
          Reset simulation
        </button>
      </div>
      <div className="room-layout">
        <div
          className="room-scene"
          style={
            {
              "--room-light": decisions.lights ? ".22" : ".02",
            } as React.CSSProperties
          }
        >
          <div className={`ceiling-light ${decisions.lights ? "on" : ""}`} />
          <div className="room-window">
            <span />
            <span />
          </div>
          <div className="room-board">
            VM <span>LEARNING LAB</span>
          </div>
          <div
            className={`room-fan ${decisions.fan ? "spinning" : ""}`}
            aria-hidden="true"
          >
            ✣
          </div>
          <div className="desks" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="desk">
                <span
                  className={i < Math.ceil(room.occupancy / 7) ? "person" : ""}
                />
              </div>
            ))}
          </div>
          <div className="room-caption">
            <span className="status-dot" /> SIMULATED ROOM · {room.occupancy}{" "}
            OCCUPANTS
          </div>
        </div>
        <div className="sensor-controls">
          {controls.map((c) => (
            <label
              className="range-field"
              key={c.key}
              htmlFor={`room-${c.key}`}
            >
              <span>
                {c.label}
                <output htmlFor={`room-${c.key}`}>
                  {room[c.key]} <small>{c.unit}</small>
                </output>
              </span>
              <input
                id={`room-${c.key}`}
                type="range"
                min={c.min}
                max={c.max}
                step={c.step}
                value={room[c.key]}
                onChange={(e) => update(c.key, Number(e.target.value))}
              />
              <span className="range-ends">
                <small>
                  {c.min} {c.unit}
                </small>
                <small>
                  {c.max} {c.unit}
                </small>
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="decision-grid" aria-live="polite">
        {[
          ["Fan", decisions.fan, "Running", "Standby"],
          ["Lighting", decisions.lights, "On", "Off"],
          ["Ventilation", decisions.ventilation, "Alert", "Normal"],
        ].map(([label, active, on, off]) => (
          <div
            key={String(label)}
            className={active ? "decision active" : "decision"}
          >
            <span>{label}</span>
            <strong>
              <i />
              {active ? on : off}
            </strong>
          </div>
        ))}
      </div>
      {engineering && (
        <div className="engineering-panel">
          <div>
            <h4>Illustrative control rules</h4>
            <code>
              fan = occupied AND temperature &gt; 27 °C
              <br />
              lights = occupied AND light &lt; 300 lux
              <br />
              ventilation alert = CO₂ &gt; 1,000 ppm
            </code>
            <p>
              Thresholds are educational examples. The alert remains active in
              an empty room if CO₂ is high.
            </p>
          </div>
          <div>
            <h4>Simulation event log</h4>
            <ol className="event-log">
              {events.map((event, i) => (
                <li key={`${i}-${event}`}>{event}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
