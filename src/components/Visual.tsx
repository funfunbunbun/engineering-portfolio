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
            CONCEPT / VIDEO → VELOCITY
          </text>
          <text
            x="350"
            y="280"
            fill="currentColor"
            fontSize="10"
            fontFamily="monospace"
          >
            ILLUSTRATION · NO TRACKING DATA
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
    </svg>
  );
}
