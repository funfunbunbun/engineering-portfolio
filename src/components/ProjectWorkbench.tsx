import SpeedCrossing from "./SpeedCrossing";
import NanoDemo from "./NanoDemo";
import { useEffect, useState } from "react";
import type { ProjectId } from "../data/projects";
import {
  springExtension,
  idealCircuit,
  virtualSpeed,
  scoreWords,
  wordWeights,
  transact,
  robotStep,
} from "../lib/workbenches";

function Range({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  set,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  set: (n: number) => void;
}) {
  return (
    <div className="bench-range">
      <label htmlFor={id}>
        {label}
        <output htmlFor={id}>
          {value} {unit}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => set(Number(event.target.value))}
      />
    </div>
  );
}
function Bench({
  title,
  label,
  reset,
  children,
  note,
}: {
  title: string;
  label: string;
  reset: () => void;
  children: React.ReactNode;
  note: string;
}) {
  return (
    <section className="workbench" aria-label={`${title} interactive demo`}>
      <div className="demo-heading">
        <div>
          <span className="eyebrow">INTERACTIVE / {label}</span>
          <h3>{title}</h3>
        </div>
        <button className="button small ghost" onClick={reset}>
          Reset simulation
        </button>
      </div>
      {children}
      <p className="bench-note">{note}</p>
    </section>
  );
}

function Spring() {
  const [force, setForce] = useState(4);
  const [stiffness, setStiffness] = useState(40);
  const extension = springExtension(force, stiffness);
  const bottom = 120 + extension * 220;
  return (
    <Bench
      title="Spring load and extension"
      label="HOOKE’S LAW"
      reset={() => {
        setForce(4);
        setStiffness(40);
      }}
      note="Ideal linear spring model with illustrative inputs. Elastic limits, material differences, and the report’s measured results are not modeled."
    >
      <div className="bench-layout">
        <div className="bench-graphic">
          <svg
            viewBox="0 0 380 300"
            aria-label="Illustrative spring and load"
            role="img"
          >
            <path d="M100 45h180m-90 0v25" />
            <polyline
              points={`190,70 160,80 220,${80 + (bottom - 80) / 6} 160,${80 + (2 * (bottom - 80)) / 6} 220,${80 + (3 * (bottom - 80)) / 6} 160,${80 + (4 * (bottom - 80)) / 6} 220,${80 + (5 * (bottom - 80)) / 6} 190,${bottom}`}
            />
            <rect x="164" y={bottom} width="52" height="36" rx="3" />
            <text x="245" y={bottom + 23}>
              {force} N
            </text>
          </svg>
          <span>EXTENSION / IDEAL MODEL</span>
        </div>
        <div>
          <Range
            id="spring-force"
            label="Applied force"
            value={force}
            min={0}
            max={10}
            step={0.5}
            unit="N"
            set={setForce}
          />
          <Range
            id="spring-stiffness"
            label="Spring stiffness"
            value={stiffness}
            min={20}
            max={200}
            step={10}
            unit="N/m"
            set={setStiffness}
          />
          <div className="bench-readout">
            <span>Extension = force ÷ stiffness</span>
            <strong role="status">{(extension * 1000).toFixed(0)} mm</strong>
          </div>
        </div>
      </div>
    </Bench>
  );
}

function Battery() {
  const [cells, setCells] = useState(2);
  const [resistance, setResistance] = useState(200);
  const circuit = idealCircuit(cells, resistance);
  return (
    <Bench
      title="Ideal battery circuit"
      label="CIRCUIT CONCEPT"
      reset={() => {
        setCells(2);
        setResistance(200);
      }}
      note="Each idealized cell is assigned 1.0 V as a teaching assumption. This is not the report’s measured cell voltage, an electrochemistry simulation, or a battery construction guide."
    >
      <div className="bench-layout">
        <div className="bench-graphic battery-graphic">
          <div className="cell-row">
            {Array.from({ length: cells }, (_, i) => (
              <div className="ideal-cell" key={i}>
                <b>+</b>
                <span>1 V</span>
                <b>−</b>
              </div>
            ))}
          </div>
          <span>IDEAL CELLS IN SERIES</span>
          <strong>{circuit.voltage.toFixed(1)} V</strong>
        </div>
        <div>
          <Range
            id="circuit-cells"
            label="Number of ideal cells"
            value={cells}
            min={1}
            max={6}
            set={setCells}
          />
          <Range
            id="circuit-resistance"
            label="Load resistance"
            value={resistance}
            min={50}
            max={1000}
            step={50}
            unit="Ω"
            set={setResistance}
          />
          <div className="bench-readout">
            <span>Ideal current = voltage ÷ resistance</span>
            <strong role="status">
              {(circuit.current * 1000).toFixed(1)} mA
            </strong>
          </div>
        </div>
      </div>
    </Bench>
  );
}

function Trolley() {
  const [separation, setSeparation] = useState(0);
  const [parts, setParts] = useState({
    basket: true,
    frame: true,
    wheels: true,
  });
  return (
    <Bench
      title="Trolley assembly"
      label="CAD COMPONENTS"
      reset={() => {
        setSeparation(0);
        setParts({ basket: true, frame: true, wheels: true });
      }}
      note="A conceptual two-dimensional exploded view. It illustrates assembly groups rather than reproducing the original CAD geometry, mates, or manufacturing dimensions."
    >
      <div className="bench-layout">
        <div className="bench-graphic">
          <svg
            viewBox="0 0 380 300"
            role="img"
            aria-label="Conceptual trolley exploded view"
          >
            {parts.basket && (
              <g transform={`translate(0 ${-separation * 0.45})`}>
                <path d="m110 85 185 10-25 80H130Z" />
                <path
                  d="m140 88 10 87m30-84 5 84m30-82-5 82m35-80-10 80M120 120h166m-158 28h150"
                  opacity=".5"
                />
              </g>
            )}
            {parts.frame && (
              <g>
                <path d="m85 55 30 30 35 120h120m-120 0-15 20h140" />
                <path d="M150 175v30m100-30v30" />
              </g>
            )}
            {parts.wheels && (
              <g transform={`translate(0 ${separation * 0.25})`}>
                <circle cx="158" cy="245" r="15" />
                <circle cx="260" cy="245" r="15" />
              </g>
            )}
          </svg>
          <span>ILLUSTRATIVE ASSEMBLY GROUPS</span>
        </div>
        <div>
          <Range
            id="assembly-explode"
            label="Explode assembly"
            value={separation}
            min={0}
            max={100}
            unit="%"
            set={setSeparation}
          />
          <fieldset className="bench-checks">
            <legend>Show components</legend>
            {(["basket", "frame", "wheels"] as const).map((part) => (
              <label key={part}>
                <input
                  type="checkbox"
                  checked={parts[part]}
                  onChange={(event) =>
                    setParts((old) => ({
                      ...old,
                      [part]: event.target.checked,
                    }))
                  }
                />
                {part[0].toUpperCase() + part.slice(1)}
              </label>
            ))}
          </fieldset>
          <p className="bench-help">
            Separate the groups, then hide a component to inspect what remains.
          </p>
        </div>
      </div>
    </Bench>
  );
}

function Terminal() {
  const [balance, setBalance] = useState(100);
  const [amount, setAmount] = useState("25");
  const [message, setMessage] = useState("Ready. Try a deposit or withdrawal.");
  function act(operation: "deposit" | "withdraw") {
    const result = transact(balance, Number(amount), operation);
    setBalance(result.balance);
    setMessage(result.message);
  }
  return (
    <Bench
      title="ATM menu simulation"
      label="IN-MEMORY MENU"
      reset={() => {
        setBalance(100);
        setAmount("25");
        setMessage("Demo reset. Balance restored.");
      }}
      note="Fictional credits stored only in page memory. No account, PIN, identity, real money, bank connection, or persistent records are used."
    >
      <div className="bench-layout">
        <div className="terminal-screen">
          <span>EDUCATIONAL TERMINAL / DEMO CREDITS</span>
          <p>Available balance</p>
          <strong>{balance.toFixed(2)}</strong>
          <code>
            01 DEPOSIT
            <br />
            02 WITHDRAW
            <br />
            03 RESET
          </code>
          <p role="status">{message}</p>
        </div>
        <div className="terminal-controls">
          <label htmlFor="terminal-amount">Amount in demo credits</label>
          <input
            id="terminal-amount"
            type="number"
            min=".01"
            max="10000"
            step=".01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <div>
            <button className="button small" onClick={() => act("deposit")}>
              Deposit credits
            </button>
            <button
              className="button small ghost"
              onClick={() => act("withdraw")}
            >
              Withdraw credits
            </button>
          </div>
          <p className="bench-help">
            Try a withdrawal larger than the balance to see the input
            validation.
          </p>
        </div>
      </div>
    </Bench>
  );
}

function Robot() {
  const [state, setState] = useState({ phase: 0, metal: 0, other: 0 });
  const [category, setCategory] = useState("metal");
  const [activeCategory, setActiveCategory] = useState("metal");
  const [running, setRunning] = useState(false);
  function advance() {
    const material = state.phase === 0 ? category : activeCategory;
    if (state.phase === 0) setActiveCategory(category);
    setState((old) => robotStep(old, material === "metal"));
  }
  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(advance, 850);
    return () => clearTimeout(timer);
  }, [running, state.phase, category, activeCategory]);
  const steps = [
    "Ready",
    "Detect object",
    "Grip object",
    "Move to destination",
    "Release and count",
    "Return",
  ];
  const moving = state.phase >= 3 && state.phase <= 4;
  const target = activeCategory === "metal" ? 270 : 320;
  return (
    <Bench
      title="Robot sorting sequence"
      label="ROBOT SEQUENCE"
      reset={() => {
        setRunning(false);
        setActiveCategory("metal");
        setState({ phase: 0, metal: 0, other: 0 });
        setCategory("metal");
      }}
      note="Looping conceptual sequence with symbolic positions. No physical robot model, calibrated poses, controller commands, or real safety logic is reproduced."
    >
      <div className="bench-layout">
        <div className="bench-graphic">
          <svg
            viewBox="0 0 380 300"
            role="img"
            aria-label="Conceptual robot sorting cell"
          >
            <path d="M40 255h90m-45 0V150l85-70 75 65" />
            <circle cx="85" cy="150" r="10" />
            <circle cx="170" cy="80" r="10" />
            <path d={moving ? `M245 145 ${target} 190` : "M245 145 190 190"} />
            <path
              d={
                moving
                  ? `m${target - 10} 190 10 13 10-13`
                  : "m180 190 10 13 10-13"
              }
            />
            <rect x="245" y="225" width="45" height="45" />
            <rect x="300" y="225" width="45" height="45" />
            {state.phase !== 4 && (
              <rect
                className="robot-object"
                x={state.phase >= 2 ? (moving ? target - 7 : 183) : 170}
                y={state.phase >= 2 ? 202 : 240}
                width="14"
                height="14"
              />
            )}
            <text x="244" y="290">
              METAL
            </text>
            <text x="296" y="290">
              OTHER
            </text>
          </svg>
          <span aria-live="polite">
            PHASE {state.phase + 1} / {steps[state.phase].toUpperCase()}
          </span>
        </div>
        <div>
          <label className="bench-label" htmlFor="robot-category">
            Illustrative object
          </label>
          <select
            id="robot-category"
            value={category}

            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="metal">Metal</option>
            <option value="other">Non-metal</option>
          </select>
          <button
            className="button small"
            onClick={() => {
              setRunning(false);
              advance();
            }}
          >
            Next robot step
          </button>
          <button
            className="button small ghost"
            onClick={() => setRunning((v) => !v)}
          >
            {running ? "Pause robot" : "Run robot loop"}
          </button>
          <p>
            Current item: {activeCategory}. Next item: {category}. A new choice
            takes effect at the next pickup.
          </p>
          <p className="bench-help" role="status">
            {steps[state.phase]}
          </p>
          <div className="bench-totals">
            <span>
              Metal sorted <b>{state.metal}</b>
            </span>
            <span>
              Non-metal sorted <b>{state.other}</b>
            </span>
          </div>
        </div>
      </div>
    </Bench>
  );
}

function Sentiment() {
  const [text, setText] = useState(
    "The design is useful but the setup is slow.",
  );
  const result = scoreWords(text);
  return (
    <Bench
      title="Sentiment feature example"
      label="Simplified text classifier"
      reset={() => setText("The design is useful but the setup is slow.")}
      note="Handwritten word weights illustrate feature extraction. This is not the original TF-IDF/MLP model, does not understand context or negation, and has no trained-model accuracy claim. Text stays in browser memory."
    >
      <div className="bench-layout">
        <div className="word-lab">
          <label htmlFor="sentiment-text">Try a short fictional sentence</label>
          <textarea
            id="sentiment-text"
            maxLength={500}
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
          <div className="word-tokens">
            {result.tokens.length ? (
              result.tokens.map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={
                    wordWeights[word] > 0 ? "positive-word" : "negative-word"
                  }
                >
                  {word} {wordWeights[word] > 0 ? "+" : ""}
                  {wordWeights[word]}
                </span>
              ))
            ) : (
              <small>
                No vocabulary matches. Try “good”, “useful”, “slow”, or
                “broken”.
              </small>
            )}
          </div>
        </div>
        <div className="bench-readout sentiment-result">
          <span>Illustrative weighted sum</span>
          <strong>{result.score}</strong>
          <p role="status">{result.label}</p>
          <small>
            Changing words changes the feature score; the original model uses
            learned parameters.
          </small>
        </div>
      </div>
    </Bench>
  );
}

function Velocity() {
  const [distance, setDistance] = useState(20);
  const [seconds, setSeconds] = useState(2);
  return (
    <Bench
      title="Speed calculation"
      label="VIRTUAL SPEED CALCULATOR"
      reset={() => {
        setDistance(20);
        setSeconds(2);
      }}
      note="Pure arithmetic with fictional inputs, not an estimate from project footage. Real monocular estimates additionally require spatial calibration, reliable timing, and tracking."
    >
      <div className="bench-layout">
        <div>
          <Range
            id="virtual-distance"
            label="Virtual distance"
            value={distance}
            min={5}
            max={100}
            step={5}
            unit="m"
            set={setDistance}
          />
          <Range
            id="virtual-time"
            label="Elapsed time"
            value={seconds}
            min={1}
            max={10}
            step={0.5}
            unit="s"
            set={setSeconds}
          />
        </div>
        <div className="bench-readout velocity-result">
          <span>Speed = distance ÷ time × 3.6</span>
          <strong role="status">
            {virtualSpeed(distance, seconds).toFixed(1)} km/h
          </strong>
          <small>Fictional input · illustrative calculation</small>
        </div>
      </div>
    </Bench>
  );
}

export const workbenchIds: ProjectId[] = [
  "spring-study",
  "battery-study",
  "trolley-cad",
  "atm-interface",
  "robot-recycling",
  "nano-hmi",
  "sentiment-analysis",
  "vehicle-velocity",
];
export default function ProjectWorkbench({ id }: { id: ProjectId }) {
  switch (id) {
    case "spring-study":
      return <Spring />;
    case "battery-study":
      return <Battery />;
    case "trolley-cad":
      return <Trolley />;
    case "atm-interface":
      return <Terminal />;
    case "robot-recycling":
      return <Robot />;
    case "nano-hmi":
      return <NanoDemo />;
    case "sentiment-analysis":
      return <Sentiment />;
    case "vehicle-velocity":
      return <SpeedCrossing />;
    default:
      return null;
  }
}
