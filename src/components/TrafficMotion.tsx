export default function TrafficMotion({
  traffic,
  crossing,
}: {
  traffic: string;
  crossing: boolean;
}) {
  return (
    <svg
      className="traffic-motion"
      viewBox="0 0 520 260"
      role="img"
      aria-label={
        crossing
          ? "Traffic waits while a pedestrian crosses"
          : "Cars approach the stop line"
      }
    >
      <rect width="520" height="260" fill="#1b3543" />
      <path
        d="M0 80h520M0 210h520M0 145h520"
        stroke="#b5c6cf"
        strokeDasharray="20 12"
      />
      <path d="M240 85v120" stroke="white" strokeWidth="5" />
      {[270, 285, 300, 315].map((x) => (
        <path key={x} d={`M${x} 87v115`} stroke="#d8e6ed" strokeWidth="7" />
      ))}
      {[0, 1, 2].map((i) => (
        <g
          key={i}
          className={
            traffic === "Green" ? "traffic-car driving" : "traffic-car"
          }
          style={
            traffic === "Green"
              ? { animationDelay: `${-i * 1.4}s` }
              : { transform: `translateX(${180 - i * 65}px)` }
          }
        >
          <rect
            x="0"
            y="105"
            width="48"
            height="28"
            rx="7"
            fill={["#86bddb", "#d9b683", "#b2cda9"][i]}
          />
          <rect x="12" y="110" width="22" height="18" rx="4" fill="#32566a" />
        </g>
      ))}
      <g
        className={crossing ? "crossing-person walking" : "crossing-person"}
        transform="translate(292 35)"
      >
        <circle r="7" fill="#e9c59b" />
        <path
          d="M0 8v16m0-12-10 8m10-8 10 8m-10 4-8 14m8-14 8 14"
          stroke="#c6e5f7"
          strokeWidth="4"
        />
      </g>
      <text x="15" y="245" fill="#e2edf4">
        {traffic === "Green"
          ? "Traffic moving"
          : "Cars wait behind the stop line"}
      </text>
    </svg>
  );
}
