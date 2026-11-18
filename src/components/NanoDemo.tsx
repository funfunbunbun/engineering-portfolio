import { useEffect, useRef, useState } from "react";

export default function NanoDemo() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState("—");
  const [stage, setStage] = useState(0);
  const [lastKey, setLastKey] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stop = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => stop, []);
  const press = (key: string) => {
    if (stage) return;
    setLastKey(key);
    if (key === "Clear") {
      setInput("");
      setDisplay("—");
      return;
    }
    if (key === "Enter") {
      if (!input) return;
      setStage(1);
      timers.current = [
        setTimeout(() => setStage(2), 500),
        setTimeout(() => {
          setDisplay(input);
          setStage(3);
        }, 1100),
        setTimeout(() => {
          setStage(0);
          setInput("");
        }, 1800),
      ];
    } else setInput((value) => (value + key).slice(0, 8));
  };
  return (
    <div className="extra-demo">
      <div className="demo-heading">
        <div>
          <span className="eyebrow">Arduino Nano HMI</span>
          <h3>Touchpad input and PC display</h3>
        </div>
        <button
          className="button small ghost"
          onClick={() => {
            stop();
            setInput("");
            setDisplay("—");
            setStage(0);
            setLastKey("");
          }}
        >
          Reset demo
        </button>
      </div>
      <p>
        Enter a number and press Enter to follow an input through the simulated
        Nano and back to the PC.
      </p>
      <div className="nano-scene">
        <div>
          <div className="nano-touchpad" role="group" aria-label="Touch keypad">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "Clear",
              "0",
              "Enter",
            ].map((key) => (
              <button
                key={key}
                disabled={stage > 0}
                aria-pressed={lastKey === key}
                onClick={() => press(key)}
              >
                {key}
              </button>
            ))}
          </div>
          <p>
            Input: <output>{input || "—"}</output>
          </p>
        </div>
        <span className="nano-link" aria-hidden="true">
          {stage === 1 ? "➜" : "→"}
        </span>
        <div className="nano-board">
          <strong>Arduino Nano</strong>
          <p>
            {stage === 1
              ? "Receiving input"
              : stage === 2
                ? "Processing input"
                : "Ready"}
          </p>
        </div>
        <span className="nano-link" aria-hidden="true">
          {stage === 2 ? "➜" : "→"}
        </span>
        <div className="nano-pc">
          <span>PC display</span>
          <output>{display}</output>
          <small>{stage === 3 ? "Input received" : "Waiting for input"}</small>
        </div>
      </div>
      <p role="status" aria-label="Nano message">
        {
          [
            "Ready for a number.",
            "Sending the input to the Nano…",
            "Returning a response to the PC…",
            "The PC displays the received input.",
          ][stage]
        }
      </p>
      <p className="muted">
        Browser simulation. The original project uses a touchscreen-style
        interface on the host PC, USB serial and a Nano keypad-output
        controller. This simplified return display illustrates the communication
        flow; no hardware is connected.
      </p>
    </div>
  );
}
