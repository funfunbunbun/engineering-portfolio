import type { ProjectId } from "../data/projects";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}

export function ProjectVisual({
  id,
  hero = false,
}: {
  id: ProjectId;
  hero?: boolean;
}) {
  return (
    <svg
      className={`project-visual ${hero ? "hero-visual" : ""}`}
      viewBox="0 0 600 320"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={`grid-${id}-${hero}`}
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0H0v30"
            stroke="currentColor"
            strokeWidth=".5"
            opacity=".13"
          />
        </pattern>
        <linearGradient
          id={`fade-${id}`}
          x1="80"
          y1="0"
          x2="500"
          y2="300"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#88c6fa" />
          <stop offset="1" stopColor="#457faa" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill={`url(#grid-${id}-${hero})`} />
      {id === "vehicle-velocity" && (
        <g>
          <path
            d="m0 300 195-250h210l195 250M260 50l-80 250M340 50l80 250"
            stroke="currentColor"
            opacity=".35"
          />
          <path
            d="m300 70 0 30m0 20v40m0 30v70"
            stroke="currentColor"
            strokeDasharray="12 14"
            opacity=".4"
          />
          <path
            d="m150 211 12-37h59l15 37v41h-86v-41Zm13-1h59l-10-27h-40l-9 27Z"
            fill="#1c3d54"
            stroke="#9ad4ff"
            strokeWidth="2"
          />
          <path
            d="m370 122 8-22h37l10 22v27h-55v-27Z"
            fill="#1c3d54"
            stroke="#9ad4ff"
            strokeWidth="2"
          />
          <path
            d="M133 188v-30h30m-30 83v30h30m91-83v-30h-30m30 83v30h-30M355 108V88h20m66 20V88h-20m-66 48v22h20m66-22v22h-20"
            stroke="#a9d8ff"
            opacity=".7"
          />
          <text
            x="28"
            y="33"
            fill="currentColor"
            fontSize="11"
            fontFamily="monospace"
            letterSpacing="2"
          >
            Vehicle detection and speed estimation
          </text>
          <text
            x="350"
            y="280"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
          >
            YOLO · Raspberry Pi 5
          </text>
        </g>
      )}
      {id === "smart-classroom" && (
        <g stroke="currentColor">
          <path
            d="m120 220 180-100 180 100-180 100-180-100Z"
            fill="#20394a"
            strokeOpacity=".7"
          />
          <path
            d="M120 220V95L300 0v120M300 0l180 95v125"
            strokeOpacity=".35"
          />
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((col) => (
              <g
                key={`${row}-${col}`}
                transform={`translate(${205 + col * 52 - row * 27} ${145 + col * 29 + row * 17})`}
              >
                <path d="m0 0 27-15 33 18-27 15L0 0Z" fill="#4e788e" />
                <path d="M0 0v18m33 0v18m27-33v18" opacity=".6" />
              </g>
            )),
          )}
          <path d="m390 87 45 25v45l-45-25V87Z" fill="#699ab3" />
          <circle cx="150" cy="102" r="7" fill="#acddbf" stroke="none" />
          <path d="M150 84V60h80m-80 60v35" strokeDasharray="4 5" />
          <text
            x="240"
            y="63"
            fill="currentColor"
            stroke="none"
            fontSize="10"
            fontFamily="monospace"
          >
            SIMULATED INPUT
          </text>
        </g>
      )}
      {id === "fpga-fan" && (
        <g>
          <path
            d="M30 235h65v-65h65v65h65v-65h65v65h65v-65h65v65h65v-65h65"
            stroke="#9dd6ff"
            strokeWidth="3"
          />
          <g transform="translate(300 100)">
            <circle r="63" stroke="currentColor" strokeOpacity=".3" />
            <circle r="52" stroke="currentColor" strokeOpacity=".2" />
            {[0, 90, 180, 270].map((a) => (
              <path
                key={a}
                d="M0-6C-15-40 4-59 23-38 44-18 17-2 0-6Z"
                fill="#8db8cf"
                transform={`rotate(${a})`}
              />
            ))}
            <circle r="11" fill="#d6eaff" />
          </g>
          <text
            x="30"
            y="280"
            fill="currentColor"
            fontSize="11"
            fontFamily="monospace"
          >
            HIGH TIME / PERIOD = DUTY CYCLE
          </text>
          <path
            d="M30 40h160m220 0h160M30 45v75m540-75v75"
            stroke="currentColor"
            strokeOpacity=".2"
          />
        </g>
      )}
      {id === "plc-sorting" && (
        <g>
          <rect
            x="70"
            y="180"
            width="390"
            height="55"
            rx="27.5"
            stroke="currentColor"
            strokeWidth="2"
          />
          {[100, 140, 180, 220, 260, 300, 340, 380, 420].map((x) => (
            <circle
              key={x}
              cx={x}
              cy="208"
              r="13"
              stroke="currentColor"
              opacity=".4"
            />
          ))}
          <path
            d="M130 180v-52h48v52m85 0v-35h43v35"
            fill="#81acc6"
            stroke="currentColor"
          />
          <path d="M230 175V80h62v30" stroke="#a9d8ff" strokeWidth="3" />
          <path
            d="m292 117-22 55m22-55 22 55"
            stroke="#a9d8ff"
            strokeDasharray="4 6"
          />
          <path
            d="m450 162 75-70m-65 90h95m-105 40 75 65"
            stroke="currentColor"
            strokeOpacity=".5"
          />
          <text
            x="70"
            y="276"
            fill="currentColor"
            fontSize="11"
            fontFamily="monospace"
          >
            INPUT → SENSE → ROUTE → DELIVER
          </text>
        </g>
      )}
      {id === "heart-monitor" && (
        <g stroke="currentColor">
          <rect
            x="105"
            y="65"
            width="390"
            height="185"
            rx="12"
            fill="#1c3748"
          />
          <path
            d="M130 165h70l18-20 18 20h30l20-65 25 110 25-65 20 20h85"
            stroke="#a9dcce"
            strokeWidth="3"
          />
          <text
            x="130"
            y="95"
            stroke="none"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="10"
          >
            SENSE → PROCESS → DISPLAY
          </text>
          <text
            x="130"
            y="232"
            stroke="none"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="9"
          >
            ILLUSTRATIVE SIGNAL · NOT A READING
          </text>
        </g>
      )}
      {id === "traffic-light" && (
        <g>
          <path d="M0 235h600M0 140h600" stroke="currentColor" opacity=".3" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={240 + i * 24}
              y="145"
              width="15"
              height="85"
              fill="#9fb9c9"
              opacity=".6"
            />
          ))}
          <rect
            x="120"
            y="50"
            width="52"
            height="140"
            rx="10"
            fill="#173144"
            stroke="currentColor"
          />
          <circle cx="146" cy="78" r="13" fill="#c48b85" />
          <circle cx="146" cy="119" r="13" fill="#d4bd85" />
          <circle cx="146" cy="160" r="13" fill="#9aceaf" />
          <path d="M146 190v65" stroke="currentColor" strokeWidth="4" />
          <text
            x="225"
            y="280"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="10"
          >
            REQUEST / WAIT / CROSS
          </text>
        </g>
      )}
      {id === "flood-control" && (
        <g>
          <path d="M165 65v185h230V65" stroke="currentColor" strokeWidth="2" />
          <path
            d="M167 160q40-15 80 0t80 0 66 0v88H167Z"
            fill="#69a3c2"
            opacity=".5"
          />
          <path d="M140 130h280" stroke="#b2d7e9" strokeDasharray="6 6" />
          <path d="M395 225h65v-50h55" stroke="currentColor" strokeWidth="3" />
          <circle
            cx="460"
            cy="225"
            r="20"
            fill="#28485f"
            stroke="currentColor"
          />
          <text
            x="166"
            y="285"
            fill="currentColor"
            fontFamily="monospace"
            fontSize="10"
          >
            LEVEL → DECISION → PUMP
          </text>
        </g>
      )}
      {id === "trolley-cad" && (
        <g stroke="currentColor" strokeWidth="2">
          <path d="m135 100 305 25-45 100H180l-45-125-30-35H70m110 160-15 30h225M180 225l-15-125m65 125-5-120m55 120 5-115m45 115 20-110m30 110 30-105" />
          <path d="m145 135 280 20m-265 20 250 15m-235 20 220 5" opacity=".5" />
          <circle cx="190" cy="270" r="14" />
          <circle cx="365" cy="270" r="14" />
          <text
            x="145"
            y="52"
            fill="currentColor"
            stroke="none"
            fontFamily="monospace"
            fontSize="10"
          >
            PARTS / MATES / ASSEMBLY
          </text>
        </g>
      )}
      {id === "atm-interface" && (
        <g stroke="currentColor">
          <rect x="170" y="45" width="260" height="230" rx="8" fill="#203c50" />
          <rect x="195" y="70" width="210" height="105" fill="#132a39" />
          <path
            d="m215 95 15 12-15 12m30 0h70M205 197h75m-75 18h110m-110 18h70m65-35h55m-55 20h55m-55 20h55"
            stroke="#abd1e7"
            strokeWidth="2"
          />
          <text
            x="217"
            y="153"
            fill="currentColor"
            stroke="none"
            fontFamily="monospace"
            fontSize="10"
          >
            C++ / CONSOLE LOGIC
          </text>
        </g>
      )}
      {id === "spring-study" && (
        <g stroke="currentColor" strokeWidth="2">
          <path d="M230 45h140m-70 0v25l-45 15 90 20-90 20 90 20-90 20 90 20-45 15v20" />
          <rect x="270" y="220" width="60" height="45" fill="#88b0c7" />
          <path
            d="M410 70v190m-10-180 10-10 10 10m-20 170 10 10 10-10"
            opacity=".5"
          />
          <text
            x="90"
            y="160"
            fill="currentColor"
            stroke="none"
            fontSize="26"
            fontFamily="monospace"
          >
            F = kx
          </text>
        </g>
      )}
      {id === "robot-recycling" && (
        <g stroke="currentColor" strokeWidth="3">
          <path d="M95 260h130m-65 0V140l100-70 100 90-35 50" fill="none" />
          <circle cx="160" cy="140" r="17" fill="#24465d" />
          <circle cx="260" cy="70" r="17" fill="#24465d" />
          <circle cx="360" cy="160" r="13" fill="#24465d" />
          <path
            d="m315 205 18 20 24-20m-24 20v18"
            stroke="#a6d2df"
            fill="none"
          />
          <rect x="400" y="210" width="65" height="55" fill="#284b60" />
          <rect x="480" y="210" width="65" height="55" fill="#35584f" />
          <text
            x="75"
            y="36"
            stroke="none"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
          >
            Robotic recycling cell
          </text>
        </g>
      )}
      {id === "nano-hmi" && (
        <g stroke="currentColor" strokeWidth="2">
          <rect x="55" y="100" width="125" height="135" rx="8" fill="#284b60" />
          {[0, 1, 2].flatMap((row) =>
            [0, 1, 2].map((column) => (
              <rect
                key={row + ":" + column}
                x={70 + column * 33}
                y={123 + row * 33}
                width="23"
                height="23"
                rx="3"
                fill="#89afc5"
              />
            )),
          )}
          <path d="M190 165h50m-10-8 10 8-10 8M350 165h45m-10-8 10 8-10 8" />
          <rect
            x="255"
            y="120"
            width="82"
            height="100"
            rx="5"
            fill="#277a7f"
            strokeDasharray="3 4"
          />
          <text x="275" y="174" fill="#e1f0f3" stroke="none" fontSize="16">
            Nano
          </text>
          <rect
            x="410"
            y="100"
            width="145"
            height="118"
            rx="6"
            fill="#19384c"
          />
          <path d="M465 220v20h35v-20m-53 20h70" />
          <text x="453" y="167" fill="#b3d8ed" stroke="none" fontSize="28">
            42
          </text>
          <text x="65" y="275" stroke="none" fill="currentColor" fontSize="12">
            Touch input
          </text>
          <text x="435" y="275" stroke="none" fill="currentColor" fontSize="12">
            PC display
          </text>
        </g>
      )}
      {id === "weather-expert" && (
        <g stroke="currentColor">
          <path
            d="M170 165c-45 0-40-62 4-64 9-55 95-50 103-5 50-25 92 49 47 69H170Z"
            fill="#385b72"
            strokeWidth="2"
          />
          <path
            d="m190 190-13 25m54-25-13 25m54-25-13 25m54-25-13 25"
            stroke="#a6d3e9"
            strokeWidth="3"
          />
          <rect x="390" y="80" width="115" height="150" rx="5" fill="#173144" />
          <path
            d="M407 110h75m-75 26h55m-55 26h70m-70 26h44"
            opacity=".7"
            strokeWidth="2"
          />
          <path d="M340 145h35m-8-8 8 8-8 8" />
          <text
            x="95"
            y="280"
            fill="currentColor"
            stroke="none"
            fontFamily="monospace"
            fontSize="10"
          >
            OFFLINE / EXPLAINABLE RULE SUPPORT
          </text>
        </g>
      )}
      {(id === "sentiment-analysis" || id === "neural-classifiers") && (
        <g stroke="currentColor">
          <g opacity=".4">
            {[80, 160, 240].map((y) =>
              [60, 130, 200, 270].map((end) => (
                <path key={`${y}-${end}`} d={`M175 ${y} 300 ${end}`} />
              )),
            )}
            {[60, 130, 200, 270].map((y) =>
              [110, 220].map((end) => (
                <path key={`${y}-${end}`} d={`M300 ${y} 440 ${end}`} />
              )),
            )}
          </g>
          {[80, 160, 240].map((y) => (
            <circle key={y} cx="175" cy={y} r="16" fill="#6b98b3" />
          ))}
          {[60, 130, 200, 270].map((y) => (
            <circle key={y} cx="300" cy={y} r="17" fill="#82a8bf" />
          ))}
          {[110, 220].map((y) => (
            <circle key={y} cx="440" cy={y} r="20" fill="#91b6a8" />
          ))}
          <text
            x="85"
            y="30"
            fill="currentColor"
            stroke="none"
            fontFamily="monospace"
            fontSize="10"
          >
            {id === "sentiment-analysis"
              ? "TEXT → FEATURES → CLASSIFIER"
              : "INPUTS → WEIGHTS → DECISION"}
          </text>
        </g>
      )}
      {id === "battery-study" && (
        <g stroke="currentColor" strokeWidth="2">
          <rect x="180" y="90" width="240" height="155" rx="9" fill="#1e3b50" />
          <path d="M225 90V60h40v30m70 0V60h40v30" />
          <path
            d="M205 143h40m-20-20v40m130-20h40m-135 65h70"
            stroke="#b8dded"
            strokeWidth="3"
          />
          <path
            d="m290 115-25 55h35l-20 55 55-80h-40l20-30"
            fill="#a5c4b9"
            stroke="none"
          />
          <text
            x="180"
            y="280"
            fill="currentColor"
            stroke="none"
            fontSize="10"
            fontFamily="monospace"
          >
            ELECTROCHEMISTRY / INVESTIGATION
          </text>
        </g>
      )}
    </svg>
  );
}
